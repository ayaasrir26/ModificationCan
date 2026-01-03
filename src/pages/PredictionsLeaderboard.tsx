// file name: PredictionsLeaderboard.tsx
import { Trophy, Users, Target, Award } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

interface UserPrediction {
  id: string;
  username: string;
  champion: Tables<'teams'>;
  points: number;
  accuracy: number;
}

interface PredictionsLeaderboardProps {
  predictions: UserPrediction[];
}

export const PredictionsLeaderboard = ({ predictions }: PredictionsLeaderboardProps) => {
  const sortedPredictions = [...predictions].sort((a, b) => b.points - a.points);

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="font-display text-xl text-foreground">Predictions Leaderboard</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          See how your predictions stack up against others
        </p>
      </div>

      <div className="divide-y divide-border">
        {sortedPredictions.map((prediction, index) => (
          <div
            key={prediction.id}
            className={`px-6 py-4 flex items-center gap-4 transition-colors ${
              index === 0 ? 'bg-gradient-to-r from-yellow-50 to-transparent' : ''
            }`}
          >
            <div className="flex items-center justify-center w-8">
              {index < 3 ? (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {index + 1}
                </div>
              ) : (
                <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{prediction.username}</span>
                </div>
                {index === 0 && (
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                    Leader
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  {prediction.champion.flag_url && (
                    <img
                      src={prediction.champion.flag_url}
                      alt={prediction.champion.name}
                      className="w-5 h-3 object-cover rounded"
                    />
                  )}
                  <span className="text-sm text-muted-foreground">
                    Champion: <span className="font-medium">{prediction.champion.name}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="font-display text-xl text-foreground">{prediction.points}</span>
                </div>
                <span className="text-xs text-muted-foreground">Points</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="font-display text-xl text-foreground">{prediction.accuracy}%</span>
                </div>
                <span className="text-xs text-muted-foreground">Accuracy</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Total predictions: <span className="font-medium text-foreground">{predictions.length}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Most popular champion:{' '}
            <span className="font-medium text-foreground">
              {getMostPopularChampion(predictions)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function getMostPopularChampion(predictions: UserPrediction[]): string {
  const championCounts: Record<string, number> = {};
  
  predictions.forEach(prediction => {
    const championName = prediction.champion.name;
    championCounts[championName] = (championCounts[championName] || 0) + 1;
  });

  const mostPopular = Object.entries(championCounts).reduce((a, b) => 
    a[1] > b[1] ? a : b
  );

  return mostPopular[0];
}
