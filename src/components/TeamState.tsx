import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type TeamStat = {
  id: string;
  name: string;
  goals: number;
  redCards: number;
  yellowCards: number;
};

export function TeamStats() {
  const [teams, setTeams] = useState<TeamStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const { data: teamsData } = await supabase
        .from("teams")
        .select("id, name");

      const { data: matches } = await supabase
        .from("matches")
        .select("home_team_id, away_team_id, home_goals, away_goals");

      const { data: cards } = await supabase
        .from("cards")
        .select("team_id, card_type");

      const stats: TeamStat[] =
        teamsData?.map((team) => {
          const goals =
            matches?.reduce((sum, m) => {
              if (m.home_team_id === team.id) return sum + m.home_goals;
              if (m.away_team_id === team.id) return sum + m.away_goals;
              return sum;
            }, 0) || 0;

          const redCards =
            cards?.filter(
              (c) => c.team_id === team.id && c.card_type === "red"
            ).length || 0;

          const yellowCards =
            cards?.filter(
              (c) => c.team_id === team.id && c.card_type === "yellow"
            ).length || 0;

          return {
            id: team.id,
            name: team.name,
            goals,
            redCards,
            yellowCards,
          };
        }) || [];

      setTeams(stats);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Loading team stats...</p>;
  }

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="bg-gradient-to-br from-green-800 to-black rounded-xl p-5 text-white shadow-lg"
        >
          <h3 className="font-bold text-lg mb-3">{team.name}</h3>

          <div className="flex justify-between text-sm">
            <span>⚽ Goals</span>
            <span className="font-semibold">{team.goals}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span>🟥 Red Cards</span>
            <span>{team.redCards}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span>🟨 Yellow Cards</span>
            <span>{team.yellowCards}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
