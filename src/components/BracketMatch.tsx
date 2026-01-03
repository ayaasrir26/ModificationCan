import { Tables } from "@/integrations/supabase/types";

interface BracketMatchProps {
  team1?: Tables<"teams"> | null;
  team2?: Tables<"teams"> | null;
  score1?: number | null;
  score2?: number | null;
  isWinner1?: boolean;
  isWinner2?: boolean;
  onScore1Change?: (score: number) => void;
  onScore2Change?: (score: number) => void;
  onTeam1Click?: () => void;
  onTeam2Click?: () => void;
  isPredicted1?: boolean;
  isPredicted2?: boolean;
}

export const BracketMatch = ({
  team1,
  team2,
  score1,
  score2,
  isWinner1,
  isWinner2,
  onScore1Change,
  onScore2Change,
  onTeam1Click,
  onTeam2Click,
  isPredicted1,
  isPredicted2
}: BracketMatchProps) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm min-w-[160px] sm:min-w-[220px] md:min-w-[280px] rounded-xl sm:rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300">

      {/* Team 1 */}
      <div
        className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 transition-all duration-200 ${isPredicted1 ? 'bg-amber-50' : ''
          } ${onTeam1Click ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={onTeam1Click}
      >
        {team1 ? (
          <>
            <div className="relative">
              <img
                src={team1.flag_url || ''}
                alt={team1.name}
                className="w-10 h-7 sm:w-12 sm:h-8 object-cover rounded border border-gray-200"
              />
              {isPredicted1 && (
                <div className="absolute -inset-1 border-2 border-amber-400 rounded" />
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className={`font-bold text-base sm:text-lg leading-none ${isPredicted1 ? 'text-gray-900' : 'text-gray-700'
                }`}>
                {team1.code}
              </span>
              <span className="text-[11px] text-gray-500 uppercase tracking-wide font-medium truncate">
                {team1.name}
              </span>
            </div>
            {onScore1Change ? (
              <input
                type="number"
                min="0"
                value={score1 ?? 0}
                onChange={(e) => {
                  e.stopPropagation();
                  onScore1Change(parseInt(e.target.value) || 0);
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-9 sm:w-12 sm:h-10 bg-white border-2 border-gray-200 rounded-lg text-center font-bold text-base sm:text-lg text-gray-900 focus:outline-none focus:border-amber-400 transition-all"
              />
            ) : (
              <span className={`font-bold text-lg ${isWinner1 ? 'text-gray-900' : 'text-gray-400'
                }`}>
                {score1 ?? 0}
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 py-2">
            <span className="text-xs text-gray-300 uppercase tracking-wider font-medium">TBD</span>
          </div>
        )}
      </div>

      {/* Simple Divider */}
      <div className="h-px bg-gray-200" />

      {/* Team 2 */}
      <div
        className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 transition-all duration-200 ${isPredicted2 ? 'bg-amber-50' : ''
          } ${onTeam2Click ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={onTeam2Click}
      >
        {team2 ? (
          <>
            <div className="relative">
              <img
                src={team2.flag_url || ''}
                alt={team2.name}
                className="w-10 h-7 sm:w-12 sm:h-8 object-cover rounded border border-gray-200"
              />
              {isPredicted2 && (
                <div className="absolute -inset-1 border-2 border-amber-400 rounded" />
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className={`font-bold text-base sm:text-lg leading-none ${isPredicted2 ? 'text-gray-900' : 'text-gray-700'
                }`}>
                {team2.code}
              </span>
              <span className="text-[11px] text-gray-500 uppercase tracking-wide font-medium truncate">
                {team2.name}
              </span>
            </div>
            {onScore2Change ? (
              <input
                type="number"
                min="0"
                value={score2 ?? 0}
                onChange={(e) => {
                  e.stopPropagation();
                  onScore2Change(parseInt(e.target.value) || 0);
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-9 sm:w-12 sm:h-10 bg-white border-2 border-gray-200 rounded-lg text-center font-bold text-base sm:text-lg text-gray-900 focus:outline-none focus:border-amber-400 transition-all"
              />
            ) : (
              <span className={`font-bold text-lg ${isWinner2 ? 'text-gray-900' : 'text-gray-400'
                }`}>
                {score2 ?? 0}
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 py-2">
            <span className="text-xs text-gray-300 uppercase tracking-wider font-medium">TBD</span>
          </div>
        )}
      </div>
    </div>
  );
};
