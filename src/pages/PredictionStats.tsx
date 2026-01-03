// file name: PredictionStats.tsx
import { useBracketPredictions } from '../hooks/useBracketPredictions';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const PredictionStats = () => {
  const { predictions } = useBracketPredictions();

  const totalMatches = 15; // Round of 16 (8) + Quarter (4) + Semi (2) + Final (1)
  const predictedMatches = Object.keys(predictions).length;
  const completionPercentage = (predictedMatches / totalMatches) * 100;

  const getRoundProgress = (round: string) => {
    const roundMatches = Object.values(predictions).filter(p => p.round === round);
    const roundTotal = {
      roundOf16: 8,
      quarterFinals: 4,
      semiFinals: 2,
      final: 1,
    }[round];
    
    return {
      predicted: roundMatches.length,
      total: roundTotal,
      percentage: (roundMatches.length / roundTotal) * 100,
    };
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-display text-lg text-foreground mb-4">Prediction Progress</h3>
      
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Completion</span>
          <span className="text-sm text-muted-foreground">
            {predictedMatches}/{totalMatches} matches
          </span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
        <div className="flex items-center gap-2 mt-2">
          {completionPercentage === 100 ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">All predictions complete!</span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-600">
                {totalMatches - predictedMatches} matches remaining
              </span>
            </>
          )}
        </div>
      </div>

      {/* Round-by-round Progress */}
      <div className="space-y-4">
        {(['roundOf16', 'quarterFinals', 'semiFinals', 'final'] as const).map((round) => {
          const progress = getRoundProgress(round);
          const roundLabels = {
            roundOf16: 'Round of 16',
            quarterFinals: 'Quarter Finals',
            semiFinals: 'Semi Finals',
            final: 'Final',
          };

          return (
            <div key={round} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{roundLabels[round]}</span>
                <span className="text-sm text-muted-foreground">
                  {progress.predicted}/{progress.total}
                </span>
              </div>
              <Progress value={progress.percentage} className="h-1.5" />
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Tip: Complete all predictions to see your full path to the final!
        </p>
      </div>
    </div>
  );
};
