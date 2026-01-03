import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Project debugging
const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
console.log('App connecting to Supabase Project:', PROJECT_ID);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminRole = async (userId: string) => {
    try {
      // Trying RPC first as it's more reliable and bypasses RLS issues
      const { data: rpcIsAdmin, error: rpcError } = await supabase.rpc('check_is_admin' as any);

      if (!rpcError) {
        console.log('--- RPC ADMIN CHECK SUCCESS ---');
        console.log('User ID:', userId);
        console.log('RPC result:', rpcIsAdmin);
        return !!rpcIsAdmin;
      }

      console.warn('--- RPC ADMIN CHECK FAILED ---');
      console.warn('Error:', rpcError);
      console.log('Falling back to table query...');

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      console.log('--- DEBUG ROLE CHECK ---');
      console.log('User ID:', userId);
      console.log('Data found:', data);

      if (error) {
        console.error('Supabase Error:', error);
        return false;
      }

      const tableIsAdmin = data?.role === 'admin';
      console.log('Is Admin (Table) Result:', tableIsAdmin);
      return tableIsAdmin;
    } catch (err) {
      console.error('Error in checkAdminRole:', err);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          console.log('--- AUTH STATE CHANGE ---');
          console.log('User Email:', session.user.email);
          console.log('User ID:', session.user.id);
          setTimeout(() => {
            checkAdminRole(session.user.id).then((result) => {
              console.log('Final isAdmin status set to:', result);
              setIsAdmin(result);
            });
          }, 0);
        } else {
          setIsAdmin(false);
        }

        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        checkAdminRole(session.user.id).then(setIsAdmin);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
