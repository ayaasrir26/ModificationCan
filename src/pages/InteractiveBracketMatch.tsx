// file name: InteractiveBracketMatch.tsx

import { useState } from 'react';
import { Tables } from '@/integrations/supabase/types';
import { BracketMatch } from '@/components/BracketMatch';
import { Trophy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractiveBracketMatchProps {
  team1?: Tables<'teams'> | null;
  team2?: Tables<'teams'> | null;
  score1?: number | null;
  score2?: number | null;
  isWinner1?: boolean;
  isWinner2?: boolean;
  matchId: string;
  onPredict?: (winner: Tables<'teams'>) => void;
  onScore1Change?: (score: number) => void;
  onScore2Change?: (score: number) => void;
  predictedWinner?: Tables<'teams'> | null;
  isLocked?: boolean;
  round: 'roundOf16' | 'quarterFinals' | 'semiFinals' | 'final';
}

export const InteractiveBracketMatch = ({
  team1,
  team2,
  score1,
  score2,
  isWinner1,
  isWinner2,
  matchId,
  onPredict,
  onScore1Change,
  onScore2Change,
  predictedWinner,
  isLocked = false,
  round,
}: InteractiveBracketMatchProps) => {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  const handleTeamClick = (team: Tables<'teams'>) => {
    if (!isLocked && onPredict) {
      onPredict(team);
    }
  };

  const isPredictedTeam1 = predictedWinner?.id === team1?.id;
  const isPredictedTeam2 = predictedWinner?.id === team2?.id;

  return (
    <div className="relative group">
      <BracketMatch
        team1={team1}
        team2={team2}
        score1={score1}
        score2={score2}
        isWinner1={isWinner1}
        isWinner2={isWinner2}
        onScore1Change={onScore1Change}
        onScore2Change={onScore2Change}
        onTeam1Click={team1 ? () => handleTeamClick(team1) : undefined}
        onTeam2Click={team2 ? () => handleTeamClick(team2) : undefined}
        isPredicted1={isPredictedTeam1}
        isPredicted2={isPredictedTeam2}
      />

      {/* Prediction overlay */}
      {/* Prediction overlay removed to allow score inputs */}
    </div>
  );
};
