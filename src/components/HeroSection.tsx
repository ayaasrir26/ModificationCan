import { Trophy, Users, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

export function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative gradient-hero pattern-overlay overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in shadow-lg">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white tracking-wide">Africa Cup of Nations</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white mb-4 animate-fade-in drop-shadow-2xl" style={{ animationDelay: '0.1s' }}>
            CAN <span className="text-amber-400 text-glow-saffron">2025</span>
          </h1>

          <h2 className="font-display text-3xl md:text-4xl text-white/90 mb-6 tracking-wide animate-fade-in drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
            Morocco
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in leading-relaxed drop-shadow-md" style={{ animationDelay: '0.3s' }}>
            Follow all 52 matches, 24 teams, and 6 groups. Get live scores, standings, and schedules for Africa's biggest football tournament.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl" onClick={() => navigate('/groups')} className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-emerald-900/50 shadow-lg">
              <Users className="w-5 h-5 mr-2" />
              View Groups
            </Button>
            {!user && (
              <Button
                variant="glass"
                size="xl"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md"
                onClick={() => navigate('/auth')}
              >
                Sign Up Free
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children bg-black/30 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                <Users className="w-6 h-6 text-amber-400" />
              </div>
              <p className="font-display text-3xl text-white">24</p>
              <p className="text-sm text-white/60 uppercase tracking-wider">Teams</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <p className="font-display text-3xl text-white">6</p>
              <p className="text-sm text-white/60 uppercase tracking-wider">Groups</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                <Calendar className="w-6 h-6 text-amber-400" />
              </div>
              <p className="font-display text-3xl text-white">52</p>
              <p className="text-sm text-white/60 uppercase tracking-wider">Matches</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                <MapPin className="w-6 h-6 text-amber-400" />
              </div>
              <p className="font-display text-3xl text-white">5</p>
              <p className="text-sm text-white/60 uppercase tracking-wider">Host Cities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
