import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Trophy, LogOut, User, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-6 inset-x-4 z-50 flex justify-center">
      <div className="w-full max-w-7xl glass-zellige rounded-[2rem] border-white/20 shadow-2xl overflow-hidden relative group transition-all duration-700 hover:shadow-royal-emerald/10">
        {/* Animated Zellige Ornament */}
        <div className="absolute top-0 right-0 w-32 h-32 zellige-grid opacity-10 -mr-8 -mt-8 rotate-45 transition-transform duration-1000 group-hover:rotate-90" />
        <div className="absolute bottom-0 left-0 w-32 h-32 zellige-grid opacity-10 -ml-8 -mb-8 transition-transform duration-1000 group-hover:scale-110" />

        {/* Structural Arch Top Accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-saffron opacity-60" />

        <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between h-20 relative z-10">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group/logo">
            <div className="relative transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-4">
              <img
                src="/logo-new.png"
                alt="CAN 2025"
                className="h-16 w-auto object-contain drop-shadow-md"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-royal text-2xl text-royal-emerald tracking-tighter leading-none uppercase">
                CAN <span className="text-star-red">2025</span>
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-0.5 w-3 bg-saffron rounded-full" />
                <p className="text-[10px] text-royal-emerald/60 font-black uppercase tracking-[0.3em]">Morocco</p>
              </div>
            </div>
          </Link>

          {/* Premium Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Matches', 'Groups', 'Tableau', 'Chat'].map((item) => (
              <Link
                key={item}
                to={item === 'Matches' ? '/' : (item === 'Tableau' ? '/bracket' : `/${item.toLowerCase()}`)}
                className="text-sm font-black text-royal-emerald/70 hover:text-royal-emerald transition-all duration-300 uppercase tracking-widest relative group/nav"
              >
                {item}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover/nav:w-full rounded-full" />
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="text-sm font-black text-star-red hover:opacity-80 transition-all duration-300 uppercase tracking-widest">
                Admin
              </Link>
            )}
          </nav>

          {/* Premium Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Button variant="ghost" size="sm" onClick={() => navigate('/admin')} className="text-royal-emerald font-bold">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Console
                  </Button>
                )}
                <Button
                  onClick={handleSignOut}
                  className="bg-star-red/10 text-star-red hover:bg-star-red hover:text-white rounded-xl border border-star-red/20 font-bold transition-all"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Quitter
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/auth')}
                  className="text-sm font-black text-royal-emerald/80 hover:text-royal-emerald uppercase tracking-widest px-4 py-2 transition-all"
                >
                  Connexion
                </button>
                <Button
                  onClick={() => navigate('/auth?mode=signup')}
                  className="btn-royal shadow-royal-emerald/20"
                >
                  S'inscrire
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-royal-emerald transition-transform active:scale-90"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Premium Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-royal-emerald/5 bg-white/20 backdrop-blur-3xl animate-in slide-in-from-top duration-500">
            <nav className="flex flex-col gap-3 px-6">
              {['Matches', 'Groups', 'Tableau', 'Chat'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Matches' ? '/' : (item === 'Tableau' ? '/bracket' : `/${item.toLowerCase()}`)}
                  className="px-6 py-3 text-sm font-black text-royal-emerald/80 hover:text-royal-emerald hover:bg-white/40 rounded-2xl transition-all uppercase tracking-widest"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-6 py-3 text-sm font-black text-star-red bg-star-red/5 hover:bg-star-red/10 rounded-2xl transition-all text-left uppercase tracking-widest"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Console
                </Link>
              )}
              <div className="h-px bg-royal-emerald/5 my-2" />
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="px-6 py-3 text-sm font-black text-star-red bg-star-red/5 rounded-2xl transition-all text-left uppercase tracking-widest"
                >
                  Déconnexion
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/auth"
                    className="px-6 py-3 text-sm font-black text-royal-emerald/80 bg-white/40 rounded-2xl transition-all text-center uppercase tracking-widest"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Button
                    onClick={() => {
                      navigate('/auth?mode=signup');
                      setMobileMenuOpen(false);
                    }}
                    className="btn-royal w-full py-6 text-base"
                  >
                    Commencer l'aventure
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
