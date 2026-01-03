import { Trophy } from "lucide-react";
import { InteractiveBracketMatch } from "../pages/InteractiveBracketMatch";
import { FinalMatch } from "./FinalMatch";
import { Tables } from "@/integrations/supabase/types";
import { useContext, useRef, useEffect, useState } from "react";
import { PredictionContext } from "../contexts/PredictionContext";

interface TournamentBracketProps {
  teams: Tables<"teams">[];
}

export const TournamentBracket = ({ teams }: TournamentBracketProps) => {
  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Scale logic to fit screen
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = window.innerHeight - 200; // Account for header and padding

        // Base width of the bracket content (approx 2000px to fit R16)
        const contentWidth = 3000; // Increased from 2400 to fit even wider cards (360px)
        const contentHeight = 1400;

        // Calculate scale needed to fit width
        const widthScale = containerWidth / contentWidth;
        // Calculate scale needed to fit height (optional, but good for large screens)
        const heightScale = containerHeight / contentHeight;

        // Use width-based scale with a safer range
        if (containerWidth > 0) {
          // Allow smaller scale on mobile (down to 0.3) and desktop (down to 0.1)
          const newScale = Math.max(Math.min(widthScale, 1.2), containerWidth < 768 ? 0.3 : 0.1);
          setScale(newScale);
        }
      }
    };

    // Initial calculation
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Center scroll on mount / resize if content overflows
  useEffect(() => {
    const centerBracket = () => {
      if (containerRef.current && !isMobile) {
        const container = containerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        // Only scroll if we haven't scrolled yet or explicitly reset
        if (scrollWidth > clientWidth) {
          container.scrollTo({
            left: (scrollWidth - clientWidth) / 2,
            behavior: 'smooth'
          });
        }
      }
    };

    // Calculate scale first, then center
    const timer = setTimeout(centerBracket, 100);

    return () => clearTimeout(timer);
  }, [teams, scale, isMobile]);

  // Fallback data for teams that might be missing from Supabase due to RLS
  const fallbackTeams: Record<string, Partial<Tables<"teams">>> = {
    MAR: { name: "Morocco", code: "MAR", flag_url: "https://flagcdn.com/w80/ma.png", group_name: "A" },
    SEN: { name: "Senegal", code: "SEN", flag_url: "https://flagcdn.com/w80/sn.png", group_name: "A" },
    EGY: { name: "Egypt", code: "EGY", flag_url: "https://flagcdn.com/w80/eg.png", group_name: "A" },
    CIV: { name: "Ivory Coast", code: "CIV", flag_url: "https://flagcdn.com/w80/ci.png", group_name: "A" },
    NGA: { name: "Nigeria", code: "NGA", flag_url: "https://flagcdn.com/w80/ng.png", group_name: "B" },
    ZAF: { name: "South Africa", code: "ZAF", flag_url: "https://flagcdn.com/w80/za.png", group_name: "B" },
    ALG: { name: "Algeria", code: "ALG", flag_url: "https://flagcdn.com/w80/dz.png", group_name: "B" },
    CMR: { name: "Cameroon", code: "CMR", flag_url: "https://flagcdn.com/w80/cm.png", group_name: "B" },
    MLI: { name: "Mali", code: "MLI", flag_url: "https://flagcdn.com/w80/ml.png", group_name: "C" },
    TUN: { name: "Tunisia", code: "TUN", flag_url: "https://flagcdn.com/w80/tn.png", group_name: "C" },
    COD: { name: "DR Congo", code: "COD", flag_url: "https://flagcdn.com/w80/cd.png", group_name: "C" },
    BFA: { name: "Burkina Faso", code: "BFA", flag_url: "https://flagcdn.com/w80/bf.png", group_name: "C" },
    SUD: { name: "Sudan", code: "SUD", flag_url: "https://flagcdn.com/w80/sd.png", group_name: "D" },
    BEN: { name: "Benin", code: "BEN", flag_url: "https://flagcdn.com/w80/bj.png", group_name: "D" },
    TAN: { name: "Tanzania", code: "TAN", flag_url: "https://flagcdn.com/w80/tz.png", group_name: "D" },
    MOZ: { name: "Mozambique", code: "MOZ", flag_url: "https://flagcdn.com/w80/mz.png", group_name: "D" },
  };

  // Helper to get team by code
  const getTeam = (code: string) => {
    const dbTeam = teams.find(t => t.code === code);
    if (dbTeam) return dbTeam;

    // Use fallback if not found in database
    const fallback = fallbackTeams[code];
    if (fallback) {
      return {
        id: `fallback-${code}`,
        created_at: new Date().toISOString(),
        name: fallback.name || code,
        code: fallback.code || code,
        flag_url: fallback.flag_url || null,
        group_name: fallback.group_name || "",
        points: 0,
        goal_difference: 0
      } as Tables<"teams">;
    }

    return null;
  };

  // Round of 16 pairings from the user's latest image
  const roundOf16 = [
    // Left Bracket
    { team1: getTeam("MLI"), team2: getTeam("TUN"), score1: null, score2: null }, // Match 1
    { team1: getTeam("SEN"), team2: getTeam("SUD"), score1: null, score2: null }, // Match 2
    { team1: getTeam("EGY"), team2: getTeam("BEN"), score1: null, score2: null }, // Match 3
    { team1: getTeam("CIV"), team2: getTeam("BFA"), score1: null, score2: null }, // Match 4
    // Right Bracket
    { team1: getTeam("ZAF"), team2: getTeam("CMR"), score1: null, score2: null }, // Match 5
    { team1: getTeam("MAR"), team2: getTeam("TAN"), score1: null, score2: null }, // Match 6
    { team1: getTeam("ALG"), team2: getTeam("COD"), score1: null, score2: null }, // Match 7
    { team1: getTeam("NGA"), team2: getTeam("MOZ"), score1: null, score2: null }, // Match 8
  ];

  const predictionContext = useContext(PredictionContext);
  if (!predictionContext) return null;

  const { predictions, setPrediction, setScore, getWinner } = predictionContext;

  const qfTeams = [
    { team1: getWinner("r16-0", roundOf16[0].team1, roundOf16[0].team2), team2: getWinner("r16-1", roundOf16[1].team1, roundOf16[1].team2) },
    { team1: getWinner("r16-2", roundOf16[2].team1, roundOf16[2].team2), team2: getWinner("r16-3", roundOf16[3].team1, roundOf16[3].team2) },
    { team1: getWinner("r16-4", roundOf16[4].team1, roundOf16[4].team2), team2: getWinner("r16-5", roundOf16[5].team1, roundOf16[5].team2) },
    { team1: getWinner("r16-6", roundOf16[6].team1, roundOf16[6].team2), team2: getWinner("r16-7", roundOf16[7].team1, roundOf16[7].team2) },
  ];

  const sfTeams = [
    { team1: getWinner("qf-0", qfTeams[0].team1, qfTeams[0].team2), team2: getWinner("qf-1", qfTeams[1].team1, qfTeams[1].team2) },
    { team1: getWinner("qf-2", qfTeams[2].team1, qfTeams[2].team2), team2: getWinner("qf-3", qfTeams[3].team1, qfTeams[3].team2) },
  ];

  const finalTeams = {
    team1: getWinner("sf-0", sfTeams[0].team1, sfTeams[0].team2),
    team2: getWinner("sf-1", sfTeams[1].team1, sfTeams[1].team2)
  };

  const champion = getWinner("final", finalTeams.team1, finalTeams.team2);

  const getMatchData = (id: string, round: 'roundOf16' | 'quarterFinals' | 'semiFinals' | 'final', team1: Tables<"teams"> | null, team2: Tables<"teams"> | null) => {
    const match = predictions[id];
    return {
      team1,
      team2,
      score1: match?.score1 ?? null,
      score2: match?.score2 ?? null,
      matchId: id,
      round,
      predictedWinner: match?.predictedWinner,
      onPredict: (winner: Tables<"teams">) => setPrediction(id, winner),
      onScore1Change: (score: number) => setScore(id, score, match?.score2 ?? null),
      onScore2Change: (score: number) => setScore(id, match?.score1 ?? null, score),
    };
  };


  return (
    <div
      ref={containerRef}
      className="w-full min-h-[500px] md:min-h-[800px] overflow-x-auto overflow-y-visible py-6 md:py-12 relative bg-white scrollbar-hide"
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none !important;
        }
        .scrollbar-hide {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
      `}</style>
      {/* Clean minimal background */}

      <div
        ref={contentRef}
        style={{
          transform: isMobile ? 'none' : `scale(${scale})`,
          transformOrigin: 'top center',
          width: isMobile ? '1400px' : '3200px', // Increased to ensure fit
          minWidth: isMobile ? '1400px' : '3200px',
        }}
        className={`pb-10 relative z-10 block ${!isMobile ? 'mx-auto' : ''}`}
      >
        <div className="px-4">
          {/* Clean Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
              Final Bracket
            </h2>
            <p className="text-sm text-gray-500 uppercase tracking-widest">
              CAN 2025 Knockout Stage
            </p>
          </div>

          {/* Bracket Container */}
          <div className="flex items-center justify-center gap-2 md:gap-8">
            {/* Left Side - Round of 16 */}
            <div className="flex flex-col gap-4">
              <div className="text-center text-xs text-gray-600 mb-6 uppercase tracking-wider font-semibold">
                8èmes de finale
              </div>
              <div className="flex flex-col gap-6">
                {roundOf16.slice(0, 4).map((match, i) => (
                  <InteractiveBracketMatch key={`l16-${i}`} {...getMatchData(`r16-${i}`, 'roundOf16', match.team1, match.team2)} />
                ))}
              </div>
            </div>

            {/* Left Side Connectors */}
            <div className="relative w-16 h-[800px]">
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                {/* Simple Connectors */}
                {[0, 1].map((i) => (
                  <path
                    key={`l-conn-${i}`}
                    d={`M 0 ${116 + i * 400} L 32 ${116 + i * 400} L 32 ${216 + i * 200} L 64 ${216 + i * 200}`}
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>

            {/* Left Quarter Finals */}
            <div className="flex flex-col gap-4">
              <div className="text-center text-xs text-gray-600 mb-6 uppercase tracking-wider font-semibold">
                Quarts
              </div>
              <div className="flex flex-col gap-[72px]">
                {qfTeams.slice(0, 2).map((match, i) => (
                  <InteractiveBracketMatch
                    key={`qf-l-${i}`}
                    {...getMatchData(`qf-${i}`, 'quarterFinals', match.team1, match.team2)}
                    team1={match.team1}
                    team2={match.team2}
                  />
                ))}
              </div>
            </div>

            {/* Connectors Left to Semi */}
            <div className="flex items-center px-4">
              <div className="w-8 h-[144px] border-r-2 border-t-2 border-b-2 border-gray-300 rounded-r-xl" />
            </div>

            {/* Left Semi Final */}
            <div className="flex flex-col gap-4">
              <div className="text-center text-xs text-gray-600 mb-6 uppercase tracking-wider font-semibold">
                Demies
              </div>
              <InteractiveBracketMatch
                {...getMatchData('sf-0', 'semiFinals', sfTeams[0].team1, sfTeams[0].team2)}
                team1={sfTeams[0].team1}
                team2={sfTeams[0].team2}
              />
            </div>

            {/* Final */}
            {/* Final Section Wrapper */}
            <div className="flex flex-col items-center gap-6 mx-4">
              {/* Champion Display - Clean Modern Style */}
              {champion && (
                <div className="mb-8 relative z-20 animate-in fade-in zoom-in duration-700">
                  <div className="relative flex flex-col items-center">
                    {/* Large Golden Trophy Circle */}
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl">
                        <Trophy className="w-24 h-24 text-white" strokeWidth={2} />
                      </div>
                      {/* Small label above */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                          Finale
                        </span>
                      </div>
                    </div>

                    {/* Champion Label */}
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-2">
                        Champion 2025
                      </p>
                      <h2 className="text-5xl font-bold text-amber-600 uppercase tracking-tight">
                        {champion.name}
                      </h2>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Final Match Component */}
              <FinalMatch
                {...getMatchData('final', 'final', finalTeams.team1, finalTeams.team2)}
                team1={finalTeams.team1}
                team2={finalTeams.team2}
              />
            </div>

            {/* Right Semi Final */}
            <div className="flex flex-col gap-4">
              <div className="text-center text-xs text-gray-600 mb-6 uppercase tracking-wider font-semibold">
                Demies
              </div>
              <InteractiveBracketMatch
                {...getMatchData('sf-1', 'semiFinals', sfTeams[1].team1, sfTeams[1].team2)}
                team1={sfTeams[1].team1}
                team2={sfTeams[1].team2}
              />
            </div>

            {/* Connectors Right from Semi */}
            <div className="flex items-center px-4">
              <div className="w-8 h-[144px] border-l-2 border-t-2 border-b-2 border-royal-emerald/20 rounded-l-2xl" />
            </div>

            {/* Right Quarter Finals */}
            <div className="flex flex-col gap-4">
              <div className="text-center text-xs text-gray-600 mb-6 uppercase tracking-wider font-semibold">
                Quarts
              </div>
              <div className="flex flex-col gap-[72px]">
                {qfTeams.slice(2, 4).map((match, i) => (
                  <InteractiveBracketMatch
                    key={`qf-r-${i}`}
                    {...getMatchData(`qf-${i + 2}`, 'quarterFinals', match.team1, match.team2)}
                    team1={match.team1}
                    team2={match.team2}
                  />
                ))}
              </div>
            </div>

            {/* Connectors Right */}
            <div className="flex flex-col gap-[88px] py-8">
              {[0, 1].map((i) => (
                <div key={`conn-r1-${i}`} className="flex items-center">
                  <div className="w-4 h-[72px] border-l-2 border-t-2 border-b-2 border-gray-300 rounded-l-lg" />
                </div>
              ))}
            </div>

            {/* Right Side - Round of 16 */}
            <div className="flex flex-col gap-4">
              <div className="text-center text-xs text-gray-600 mb-6 uppercase tracking-wider font-semibold">
                8èmes de finale
              </div>
              <div className="flex flex-col gap-6">
                {roundOf16.slice(4, 8).map((match, i) => (
                  <InteractiveBracketMatch key={`r16-${i + 4}`} {...getMatchData(`r16-${i + 4}`, 'roundOf16', match.team1, match.team2)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
