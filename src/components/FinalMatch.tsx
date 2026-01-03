import { Tables } from "@/integrations/supabase/types";
import { Trophy } from "lucide-react";

interface FinalMatchProps {
    team1: Tables<"teams"> | null;
    team2: Tables<"teams"> | null;
    score1: number | null;
    score2: number | null;
    matchId: string;
    round: 'roundOf16' | 'quarterFinals' | 'semiFinals' | 'final';
    predictedWinner?: Tables<"teams">;
    onPredict: (winner: Tables<"teams">) => void;
    onScore1Change: (score: number) => void;
    onScore2Change: (score: number) => void;
}

export const FinalMatch = ({
    team1,
    team2,
    score1,
    score2,
    onPredict,
    onScore1Change,
    onScore2Change,
    predictedWinner
}: FinalMatchProps) => {
    const handleTeamClick = (team: Tables<"teams"> | null) => {
        if (team) {
            onPredict(team);
        }
    };

    return (
        <div className="relative">
            {/* Clean Modern Card */}
            <div className="relative bg-white/95 backdrop-blur-sm p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-lg overflow-hidden">

                {/* Simple Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 sm:gap-3 mb-2">
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                        <h3 className="font-bold text-lg sm:text-xl uppercase tracking-wider text-gray-800">
                            Finale
                        </h3>
                    </div>
                </div>

                {/* Match Container */}
                <div className="space-y-2 sm:space-y-3">
                    {/* Team 1 */}
                    <div
                        onClick={() => handleTeamClick(team1)}
                        className={`
              relative p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200
              border-2
              ${predictedWinner?.id === team1?.id
                                ? 'bg-amber-50 border-amber-400'
                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                            }
            `}
                    >
                        <div className="flex items-center justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4 flex-1">
                                {team1?.flag_url && (
                                    <div className="relative">
                                        <img
                                            src={team1.flag_url}
                                            alt={team1.name}
                                            className="w-12 h-8 sm:w-16 sm:h-11 object-cover rounded-lg border border-gray-200"
                                        />
                                        {predictedWinner?.id === team1?.id && (
                                            <div className="absolute -top-1.5 -right-1.5 bg-amber-500 rounded-full p-1">
                                                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-bold text-xl sm:text-2xl text-gray-900 uppercase">
                                        {team1?.code || "TBD"}
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-medium">
                                        {team1?.name || "À déterminer"}
                                    </span>
                                </div>
                            </div>

                            <input
                                type="number"
                                min="0"
                                value={score1 ?? ""}
                                onChange={(e) => onScore1Change(parseInt(e.target.value) || 0)}
                                onClick={(e) => e.stopPropagation()}
                                placeholder="0"
                                className="w-16 h-14 sm:w-20 sm:h-16 text-center text-2xl sm:text-3xl font-bold bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-amber-400 transition-all"
                                disabled={!team1}
                            />
                        </div>
                    </div>

                    {/* Simple VS Divider */}
                    <div className="flex items-center justify-center py-1 sm:py-2">
                        <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold">
                            VS
                        </span>
                    </div>

                    {/* Team 2 */}
                    <div
                        onClick={() => handleTeamClick(team2)}
                        className={`
              relative p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200
              border-2
              ${predictedWinner?.id === team2?.id
                                ? 'bg-amber-50 border-amber-400'
                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                            }
            `}
                    >
                        <div className="flex items-center justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4 flex-1">
                                {team2?.flag_url && (
                                    <div className="relative">
                                        <img
                                            src={team2.flag_url}
                                            alt={team2.name}
                                            className="w-12 h-8 sm:w-16 sm:h-11 object-cover rounded-lg border border-gray-200"
                                        />
                                        {predictedWinner?.id === team2?.id && (
                                            <div className="absolute -top-1.5 -right-1.5 bg-amber-500 rounded-full p-1">
                                                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-bold text-xl sm:text-2xl text-gray-900 uppercase">
                                        {team2?.code || "TBD"}
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-medium">
                                        {team2?.name || "À déterminer"}
                                    </span>
                                </div>
                            </div>

                            <input
                                type="number"
                                min="0"
                                value={score2 ?? ""}
                                onChange={(e) => onScore2Change(parseInt(e.target.value) || 0)}
                                onClick={(e) => e.stopPropagation()}
                                placeholder="0"
                                className="w-16 h-14 sm:w-20 sm:h-16 text-center text-2xl sm:text-3xl font-bold bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-amber-400 transition-all"
                                disabled={!team2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
