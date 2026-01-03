import { format } from 'date-fns';
import { MapPin, Calendar } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  code: string;
  flag_url: string | null;
}

interface Match {
  id: string;
  home_team: Team;
  away_team: Team;
  home_score: number | null;
  away_score: number | null;
  match_date: string;
  stadium: string | null;
  city: string | null;
  stage: string;
  status: string;
}

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';
  const matchDate = new Date(match.match_date);

  return (
    <div className="match-card bg-card rounded-xl border border-border shadow-soft overflow-hidden">
      {/* Stage Badge */}
      <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {match.stage}
        </span>
        {isLive && (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-destructive rounded-full animate-pulse-slow" />
            <span className="text-xs font-bold text-destructive uppercase">Live</span>
          </span>
        )}
        {isCompleted && (
          <span className="text-xs font-medium text-pitch uppercase">Completed</span>
        )}
      </div>

      {/* Match Content */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center gap-2">
            {match.home_team.flag_url && (
              <img
                src={match.home_team.flag_url}
                alt={match.home_team.name}
                className="w-12 h-8 object-cover rounded shadow-sm"
              />
            )}
            <span className="text-sm font-semibold text-foreground text-center">
              {match.home_team.name}
            </span>
            <span className="text-xs text-muted-foreground">{match.home_team.code}</span>
          </div>

          {/* Score / Time */}
          <div className="flex flex-col items-center gap-1 min-w-[80px]">
            {isCompleted || isLive ? (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isLive ? 'bg-destructive/10 score-live' : 'bg-muted'}`}>
                <span className="text-2xl font-display text-foreground">
                  {match.home_score ?? 0}
                </span>
                <span className="text-muted-foreground">-</span>
                <span className="text-2xl font-display text-foreground">
                  {match.away_score ?? 0}
                </span>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg font-display text-foreground">
                  {format(matchDate, 'HH:mm')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(matchDate, 'dd MMM')}
                </p>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center gap-2">
            {match.away_team.flag_url && (
              <img
                src={match.away_team.flag_url}
                alt={match.away_team.name}
                className="w-12 h-8 object-cover rounded shadow-sm"
              />
            )}
            <span className="text-sm font-semibold text-foreground text-center">
              {match.away_team.name}
            </span>
            <span className="text-xs text-muted-foreground">{match.away_team.code}</span>
          </div>
        </div>

        {/* Venue Info */}
        {(match.stadium || match.city) && (
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-center gap-4 text-xs text-muted-foreground">
            {match.stadium && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{match.stadium}</span>
              </div>
            )}
            {match.city && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{match.city}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
