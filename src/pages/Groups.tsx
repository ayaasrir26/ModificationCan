import { Header } from '@/components/Header';
import { GroupStandings } from '@/components/GroupStandings';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { TeamStats } from '@/components/TeamState';

export default function Groups() {
  const { data: teams, isLoading, error: queryError, refetch } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      console.log('Fetching teams from Supabase...');
      try {
        const { data, error } = await supabase.from('teams').select('*').order('group_name').order('name');
        if (error) {
          console.error('Supabase error fetching teams:', error);
          throw error;
        }
        console.log('Teams fetched successfully:', data?.length, 'teams found.');
        return data;
      } catch (err) {
        console.error('Unexpected error in queryFn:', err);
        throw err;
      }
    },
    retry: 1, // Don't retry too many times
  });

  const groupedTeams = teams?.reduce((acc, team) => {
    if (!acc[team.group_name]) acc[team.group_name] = [];
    acc[team.group_name].push(team);
    return acc;
  }, {} as Record<string, typeof teams>);

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-10 mt-20">
          <h1 className="font-display text-5xl text-white mb-2">All Groups</h1>
          <p className="text-muted-foreground  text-white">CAN 2025 Morocco • 24 Teams</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground animate-pulse">Loading data...</p>
          </div>
        ) : queryError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-star-red/20 shadow-xl">
            <div className="p-4 bg-star-red/10 rounded-full">
              <Shield className="w-8 h-8 text-star-red" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-royal-emerald mb-1">Connection error</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                We couldn't load the tournament data. Please check your connection or database settings.
              </p>
              {queryError instanceof Error && (
                <p className="text-[10px] font-mono text-star-red/60 mt-2 bg-black/5 p-2 rounded">
                  {queryError.message}
                </p>
              )}
            </div>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="mt-2 border-royal-emerald/20 text-royal-emerald hover:bg-royal-emerald hover:text-white transition-all"
            >
              Retry connection
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedTeams && Object.entries(groupedTeams).map(([groupName, groupTeams]) => (
              <GroupStandings key={groupName} groupName={groupName} teams={groupTeams || []} />
            ))}
          </div>
        )}
        <br/>
        <hr />
        <br/>
            <h1 className="text-center font-display text-5xl text-white mb-2">Goals/Red Cards/Yellow Cards</h1>
<TeamStats/>
      </main>
    </div>
  );
}
