import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Loader2, ArrowLeft, Eye, EyeOff, Sparkles, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);
    setLoading(true);

    try {
      const validation = authSchema.safeParse({
        email,
        password,
        fullName: isSignUp ? fullName : undefined
      });

      if (!validation.success) {
        toast.error(validation.error.errors[0].message, {
          icon: <Shield className="w-4 h-4 text-star-red" />
        });
        setLoading(false);
        return;
      }

      const { error } = isSignUp
        ? await signUp(email, password, fullName)
        : await signIn(email, password);

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('Cet email est déjà enregistré. Veuillez vous connecter.', {
            action: {
              label: 'Se connecter',
              onClick: () => setIsSignUp(false)
            }
          });
        } else if (error.message.includes('invalid')) {
          toast.error('Identifiants incorrects. Veuillez réessayer.', {
            icon: <Shield className="w-4 h-4 text-star-red" />
          });
        } else {
          toast.error(error.message, {
            icon: <Shield className="w-4 h-4 text-star-red" />
          });
        }
      } else {
        toast.success(isSignUp ? 'Compte créé avec succès !' : 'Bienvenue !', {
          icon: <Sparkles className="w-4 h-4 text-saffron" />
        });
        navigate('/');
      }
    } catch (err) {
      toast.error('Une erreur inattendue est survenue', {
        icon: <Shield className="w-4 h-4 text-star-red" />
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isSignUp
    ? email && password && fullName && passwordStrength >= 50
    : email && password;

  return (
    <div className="h-screen bg-gradient-royal overflow-hidden relative flex items-center justify-center p-4">
      {/* Enhanced Background Ornaments */}
      <div className="absolute inset-0 zellige-grid opacity-[0.15] animate-float pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 moorish-arch bg-gradient-to-br from-saffron/15 to-transparent -rotate-45 animate-pulse-slow" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 star-8-clip bg-gradient-to-tl from-star-red/15 to-transparent rotate-45 animate-pulse-slow" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-saffron/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-lg relative z-10 flex flex-col max-h-screen">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-white/70 hover:text-saffron mb-6 transition-all font-royal uppercase tracking-widest text-xs self-start hover:-translate-x-1 transition-transform"
        >
          <div className="p-2 bg-white/10 rounded-xl group-hover:bg-saffron/20 group-hover:-translate-x-1 transition-all duration-300">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Retour à l'accueil
        </button>

        <div className="glass-zellige rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group/form flex flex-col justify-center backdrop-blur-sm border border-white/10">
          {/* Form Arch Header */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-transparent via-saffron/60 to-transparent opacity-80" />

          {/* Crown Decoration */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-6 bg-gradient-to-b from-saffron/40 to-transparent rounded-t-full blur-sm" />
          </div>

          <div className="text-center mb-6 shrink-0">
            <div className="relative inline-block mb-3 group-hover/form:scale-105 transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/30 via-star-red/20 to-royal-emerald/30 blur-3xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-1000 rounded-full" />
              <img
                src="/logo-new.png"
                alt="Logo Morocco 2025"
                className="w-32 h-auto object-contain mx-auto drop-shadow-2xl"
              />
            </div>
            <h1 className="font-royal text-3xl text-royal-emerald mb-2 uppercase tracking-tighter text-center">
              {isSignUp ? 'REJOINDRE' : 'ACCÉDER'} <span className="text-star-red relative">
                L'ÉLITE
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-saffron to-transparent opacity-60" />
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="h-0.5 w-4 bg-gradient-to-r from-transparent to-saffron/60 rounded-full" />
              <p className="text-royal-emerald/60 font-black uppercase tracking-[0.2em] text-[10px] bg-white/5 px-3 py-1 rounded-full">
                {isSignUp ? 'Création de compte' : 'Espace Privé'}
              </p>
              <span className="h-0.5 w-4 bg-gradient-to-l from-transparent to-saffron/60 rounded-full" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 shrink-0">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-royal text-royal-emerald/80 uppercase tracking-widest text-[10px] ml-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-saffron rounded-full" />
                  Nom Complet
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VOTRE NOM"
                    className="h-11 bg-white/60 border-royal-emerald/15 rounded-xl font-royal text-royal-emerald focus:ring-2 focus:ring-saffron/30 transition-all placeholder:text-royal-emerald/30 text-sm pl-4 pr-10 shadow-inner"
                  />
                  {fullName && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className={`w-2 h-2 rounded-full ${fullName.length >= 2 ? 'bg-royal-emerald' : 'bg-star-red/50'}`} />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="font-royal text-royal-emerald/80 uppercase tracking-widest text-[10px] ml-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-saffron rounded-full" />
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="VOTRE@EMAIL.COM"
                  className="h-11 bg-white/60 border-royal-emerald/15 rounded-xl font-royal text-royal-emerald focus:ring-2 focus:ring-saffron/30 transition-all placeholder:text-royal-emerald/30 text-sm pl-4 pr-10 shadow-inner"
                />
                {email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className={`w-2 h-2 rounded-full ${isEmailValid ? 'bg-royal-emerald' : 'bg-star-red/50'}`} />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-royal text-royal-emerald/80 uppercase tracking-widest text-[10px] ml-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-saffron rounded-full" />
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 bg-white/60 border-royal-emerald/15 rounded-xl font-royal text-royal-emerald focus:ring-2 focus:ring-saffron/30 transition-all placeholder:text-royal-emerald/30 text-sm pl-4 pr-20 shadow-inner"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {password && (
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-1 h-1 rounded-full ${passwordStrength >= 25 ? 'bg-royal-emerald' : 'bg-star-red/30'}`}
                      />
                      <div
                        className={`w-1 h-1 rounded-full ${passwordStrength >= 50 ? 'bg-royal-emerald' : 'bg-star-red/30'}`}
                      />
                      <div
                        className={`w-1 h-1 rounded-full ${passwordStrength >= 75 ? 'bg-royal-emerald' : 'bg-star-red/30'}`}
                      />
                      <div
                        className={`w-1 h-1 rounded-full ${passwordStrength >= 100 ? 'bg-royal-emerald' : 'bg-star-red/30'}`}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-royal-emerald/40 hover:text-royal-emerald/70 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {password && isSignUp && (
                <div className="text-[10px] text-royal-emerald/60 font-medium mt-1">
                  Sécurité : {passwordStrength >= 75 ? 'Forte' : passwordStrength >= 50 ? 'Moyenne' : 'Faible'}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="btn-royal w-full h-12 text-sm mt-4 shadow-lg shadow-royal-emerald/20 hover:shadow-royal-emerald/40 transition-all duration-300 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || (formTouched && !isFormValid)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {isSignUp ? 'CRÉATION EN COURS...' : 'CONNEXION...'}
                </>
              ) : (
                <>
                  {isSignUp ? 'CRÉER MON DESTIN' : 'SE CONNECTER'}
                  <Sparkles className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-royal-emerald/10 text-center shrink-0">
            <p className="text-xs font-black text-royal-emerald/50 uppercase tracking-widest">
              {isSignUp ? 'Déjà membre de l\'élite ?' : "Pas encore initié ?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormTouched(false);
                }}
                className="text-star-red hover:text-royal-emerald transition-colors ml-1 font-bold relative group"
              >
                {isSignUp ? 'SE CONNECTER' : "S'INSCRIRE"}
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-star-red/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </p>
            <p className="text-[10px] text-royal-emerald/30 mt-2 font-medium">
              Vos données sont sécurisées avec un chiffrement de niveau militaire
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-[9px] text-white/30 uppercase tracking-widest font-royal">
            © 2025 MOROCCO ELITE • TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </div>
    </div>
  );
}