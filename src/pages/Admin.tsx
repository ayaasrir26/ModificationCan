import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Save, RefreshCw, AlertTriangle, CheckCircle2, Loader2, ShieldCheck, Gamepad2 } from "lucide-react";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";
import { fetchAndSyncMatches } from "@/services/apiSports";

export default function Admin() {
    const { isAdmin, loading: authLoading } = useAuth();
    const [matches, setMatches] = useState<Tables<'matches'>[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingMatchId, setUpdatingMatchId] = useState<string | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        if (isAdmin) {
            fetchMatches();
        }
    }, [isAdmin]);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const result = await fetchAndSyncMatches();
            toast.success(result.message);
            fetchMatches();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSyncing(false);
        }
    };

    const fetchMatches = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('matches')
                .select('*')
                .order('match_date', { ascending: true });

            if (error) throw error;
            setMatches(data || []);
        } catch (error: any) {
            console.error('Error fetching matches:', error);
            toast.error("Erreur lors du chargement des matchs");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateScore = async (matchId: string, homeScore: number | null, awayScore: number | null, status: string) => {
        setUpdatingMatchId(matchId);
        try {
            const { error } = await supabase
                .from('matches')
                .update({
                    home_score: homeScore,
                    away_score: awayScore,
                    status: status,
                    updated_at: new Date().toISOString()
                })
                .eq('id', matchId);

            if (error) throw error;

            toast.success("Score mis à jour avec succès");
            fetchMatches(); // Refresh list
        } catch (error: any) {
            console.error('Error updating match:', error);
            toast.error("Erreur lors de la mise à jour du match");
        } finally {
            setUpdatingMatchId(null);
        }
    };

    const runScoringEngine = async () => {
        setIsCalculating(true);
        try {
            const { error } = await supabase.rpc('calculate_user_points' as any);
            if (error) throw error;
            toast.success("Points calculation completed for all users!");
        } catch (error: any) {
            console.error('Error running scoring engine:', error);
            toast.error("Erreur lors du calcul des points : " + error.message);
        } finally {
            setIsCalculating(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-royal-emerald/5">
                <Loader2 className="w-12 h-12 animate-spin text-royal-emerald" />
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-star-red/20 shadow-2xl overflow-hidden">
                    <div className="h-2 bg-star-red" />
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto w-16 h-16 bg-star-red/10 rounded-full flex items-center justify-center mb-4">
                            <AlertTriangle className="w-8 h-8 text-star-red" />
                        </div>
                        <CardTitle className="text-2xl font-royal text-royal-emerald uppercase">Accès Refusé</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6 pb-8">
                        <p className="text-royal-emerald/60">
                            Cette zone est strictement réservée au commandement supérieur de la CAN 2025.
                        </p>
                        <Button
                            onClick={() => window.location.href = '/'}
                            className="w-full btn-royal"
                        >
                            Retourner à l'arène
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent">
            <Header />
            <main className="container mx-auto px-4 py-32">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldCheck className="w-6 h-6 text-saffron" />
                            <span className="text-xs font-black text-saffron uppercase tracking-[0.3em]">Mode Administrateur</span>
                        </div>
                        <h1 className="font-royal text-6xl text-royal-emerald uppercase tracking-tighter leading-none">
                            CENTRE DE <span className="text-star-red">COMMANDEMENT</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            onClick={handleSync}
                            disabled={isSyncing}
                            className="h-16 px-8 bg-white text-royal-emerald border-2 border-royal-emerald/10 shadow-lg hover:shadow-xl hover:scale-105 transition-all group rounded-2xl"
                        >
                            {isSyncing ? (
                                <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                            ) : (
                                <RefreshCw className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-700" />
                            )}
                            <div className="text-left">
                                <div className="text-[10px] font-black uppercase opacity-70 leading-none mb-1">API Sports</div>
                                <div className="text-lg font-royal leading-none">SYNC DATA</div>
                            </div>
                        </Button>

                        <Button
                            onClick={runScoringEngine}
                            disabled={isCalculating}
                            className="h-16 px-8 bg-gradient-saffron text-white border-0 shadow-lg shadow-saffron/20 hover:scale-105 transition-all group rounded-2xl"
                        >
                            {isCalculating ? (
                                <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                            ) : (
                                <Trophy className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                            )}
                            <div className="text-left">
                                <div className="text-[10px] font-black uppercase opacity-70 leading-none mb-1">Action Globale</div>
                                <div className="text-lg font-royal leading-none">CALCULER LES POINTS</div>
                            </div>
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-royal-emerald opacity-20" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {matches.length === 0 && (
                            <div className="glass-zellige p-12 text-center rounded-[2rem]">
                                <AlertTriangle className="w-12 h-12 text-saffron mx-auto mb-4" />
                                <p className="text-royal-emerald/60 font-medium">Aucun match trouvé. Assurez-vous d'avoir exécuté le script SQL setup.</p>
                            </div>
                        )}

                        {matches.map((match) => (
                            <MatchControlCard
                                key={match.id}
                                match={match}
                                onUpdate={handleUpdateScore}
                                isUpdating={updatingMatchId === match.id}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

function MatchControlCard({ match, onUpdate, isUpdating }: { match: any, onUpdate: any, isUpdating: boolean }) {
    const [homeScore, setHomeScore] = useState<string>(match.home_score?.toString() || "");
    const [awayScore, setAwayScore] = useState<string>(match.away_score?.toString() || "");
    const [status, setStatus] = useState(match.status || 'scheduled');

    const handleSave = () => {
        onUpdate(
            match.id,
            homeScore === "" ? null : parseInt(homeScore),
            awayScore === "" ? null : parseInt(awayScore),
            status
        );
    };

    return (
        <Card className="glass-card overflow-hidden border-white/40 shadow-xl group hover:border-royal-emerald/20 transition-all rounded-[2rem]">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                    {/* Info Side */}
                    <div className="p-6 md:p-8 md:w-1/3 bg-royal-emerald/5 flex flex-col justify-center border-b md:border-b-0 md:border-r border-royal-emerald/10">
                        <div className="text-[10px] font-black text-royal-emerald/40 uppercase tracking-[0.2em] mb-2">{match.stage}</div>
                        <div className="flex items-center gap-3 mb-1">
                            <Gamepad2 className="w-4 h-4 text-royal-emerald/30" />
                            <span className="font-royal text-xl text-royal-emerald">{match.match_key}</span>
                        </div>
                        <div className="text-xs text-royal-emerald/60 italic">
                            {new Date(match.match_date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>

                    {/* Score Control */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm">
                        <div className="flex items-center gap-6 md:gap-12 w-full justify-center">
                            {/* Home */}
                            <div className="text-center flex-1">
                                <div className="text-xs font-black text-royal-emerald/40 uppercase mb-3 tracking-widest">Home</div>
                                <div className="flex flex-col items-center">
                                    <Input
                                        type="number"
                                        value={homeScore}
                                        onChange={(e) => setHomeScore(e.target.value)}
                                        className="w-20 h-20 text-center text-3xl font-royal bg-white border-2 border-royal-emerald/10 rounded-2xl focus:ring-4 focus:ring-royal-emerald/10 focus:border-royal-emerald/30 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="text-4xl font-black text-royal-emerald/10">-</div>

                            {/* Away */}
                            <div className="text-center flex-1">
                                <div className="text-xs font-black text-royal-emerald/40 uppercase mb-3 tracking-widest">Away</div>
                                <div className="flex flex-col items-center">
                                    <Input
                                        type="number"
                                        value={awayScore}
                                        onChange={(e) => setAwayScore(e.target.value)}
                                        className="w-20 h-20 text-center text-3xl font-royal bg-white border-2 border-royal-emerald/10 rounded-2xl focus:ring-4 focus:ring-royal-emerald/10 focus:border-royal-emerald/30 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-8 w-full max-w-md">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="h-12 flex-1 rounded-xl bg-white border-2 border-royal-emerald/10 px-4 text-sm font-bold text-royal-emerald focus:ring-4 focus:ring-royal-emerald/10 focus:border-royal-emerald/30 outline-none transition-all"
                            >
                                <option value="scheduled">Scheduled</option>
                                <option value="live">Live</option>
                                <option value="finished">Finished</option>
                            </select>

                            <Button
                                onClick={handleSave}
                                disabled={isUpdating}
                                className="h-12 px-6 btn-royal rounded-xl shadow-lg relative overflow-hidden"
                            >
                                {isUpdating ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5 mr-2" />
                                        <span className="uppercase tracking-widest text-xs font-black">Save</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
