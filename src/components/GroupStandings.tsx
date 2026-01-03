import { useState } from 'react';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { getPlayersByTeam } from '@/data/players';

interface Team {
  id: string;
  name: string;
  code: string;
  flag_url: string | null;
  group_name: string;
  points?: number;
  goal_difference?: number;
}

interface GroupStandingsProps {
  groupName: string;
  teams: Team[];
}

function TeamRow({ team, index }: { team: Team; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const teamPlayers = getPlayersByTeam(team.code);

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center gap-2 md:gap-4 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          {index + 1}
        </span>
        {team.flag_url && (
          <img
            src={team.flag_url}
            alt={team.name}
            className="w-8 h-5 object-cover rounded shadow-sm shrink-0"
          />
        )}
        <div className="flex-1 flex flex-col min-w-0">
          <span className="text-sm font-semibold text-foreground truncate">{team.name}</span>
          <span className="text-[10px] font-mono text-muted-foreground">{team.code}</span>
        </div>

        {/* Stats Columns */}
        <div className="flex items-center gap-4 text-center mr-2">
          <div className="w-8">
            <span className={`text-xs font-medium ${team.goal_difference && team.goal_difference > 0 ? 'text-green-500' : team.goal_difference && team.goal_difference < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {team.goal_difference && team.goal_difference > 0 ? `+${team.goal_difference}` : team.goal_difference}
            </span>
          </div>
          <div className="w-8">
            <span className="text-sm font-bold text-foreground">
              {team.points || 0}
            </span>
          </div>
        </div>

        <div className="text-muted-foreground group-hover:text-primary transition-colors">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Players List (Expandable) */}
      {isExpanded && (
        <div className="bg-muted/30 px-4 py-3 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Key Players</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {teamPlayers.map((player) => (
                <div key={player.id} className="flex items-center gap-3 bg-card p-2 rounded-lg border border-border/40 shadow-sm">
                  <User className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-foreground leading-tight truncate">{player.name}</span>
                    <span className="text-[10px] text-muted-foreground truncate">{player.position}</span>
                  </div>
                </div>
              ))}
              {teamPlayers.length === 0 && (
                <p className="text-[10px] text-muted-foreground italic">No player data available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function GroupStandings({ groupName, teams }: GroupStandingsProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
      {/* Group Header */}
      <div className="bg-black px-4 py-3 flex items-center justify-between">
        <h3 className="font-display text-xl text-white tracking-wide">
          {groupName.toLowerCase().startsWith('group') ? groupName : `Group ${groupName}`}
        </h3>
        <div className="flex gap-4 text-[10px] font-bold text-white/50 uppercase tracking-widest mr-8">
          <div className="w-8 text-center">GD</div>
          <div className="w-8 text-center">Pts</div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {teams.map((team, index) => (
          <TeamRow key={team.id} team={team} index={index} />
        ))}
      </div>
    </div>
  );
}
