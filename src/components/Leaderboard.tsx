import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Medal, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LeaderboardEntry {
    user_id: string;
    full_name: string | null;
    avatar_url: string | null;
    score: number;
    is_winner: boolean;
    predicted_champion: string | null;
}

// Global state to prevent re-fetching if table is missing (persists across re-mounts)
let isLeaderboardTableMissing = false;

export const Leaderboard = () => {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            if (isLeaderboardTableMissing) {
                setLoading(false);
                return true; // Stop polling
            }

            const { data, error } = await supabase
                .from('leaderboard' as any)
                .select('*')
                .limit(10);

            if (error) {
                // If table is missing (404/PGRST205), stop polling to avoid spam
                const isTableMissing =
                    error.code === 'PGRST205' ||
                    error.code === '42P01' ||
                    error.message?.includes('schema cache') ||
                    error.message?.includes('Could not find the table');

                if (isTableMissing) {
                    console.log('Leaderboard table missing. Updates disabled.');
                    isLeaderboardTableMissing = true;
                    setLoading(false);
                    return true;
                }
                console.error('Error fetching leaderboard:', error);
            } else {
                setEntries((data as any) || []);
            }
            setLoading(false);
            return false;
        };

        fetchLeaderboard().then(shouldStop => {
            if (!shouldStop) {
                const interval = setInterval(async () => {
                    const stop = await fetchLeaderboard();
                    if (stop) clearInterval(interval);
                }, 30000);

                // Store interval for cleanup
                return () => clearInterval(interval);
            }
        });

    }, []);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-secondary" />
                    Classement
                </h2>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                    Top 10 Participants
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rang</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Utilisateur</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Champion</th>
                            <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {entries.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center">
                                    <p className="text-slate-400 italic text-sm">Aucune donnée disponible</p>
                                </td>
                            </tr>
                        ) : (
                            entries.map((entry, index) => (
                                <tr key={entry.user_id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border border-slate-200">
                                                <AvatarImage src={entry.avatar_url || ''} />
                                                <AvatarFallback>
                                                    <User className="w-4 h-4 text-slate-400" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium text-slate-900">{entry.full_name || 'Anonymous'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {entry.predicted_champion ? (
                                            <span className="text-xs font-semibold px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded">
                                                {entry.predicted_champion}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-bold text-primary">{entry.score} pts</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Last updated: {new Date().toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
};
