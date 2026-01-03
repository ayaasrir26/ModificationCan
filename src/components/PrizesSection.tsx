import { Gift, Medal, Star } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

interface PrizesSectionProps {
    winner?: Tables<"teams"> | null;
}

export const PrizesSection = ({ winner }: PrizesSectionProps) => {
    const prizes = [
        {
            rank: "1er Prix",
            title: winner ? `Champion: ${winner.name}` : "Maillot Officiel + VIP",
            description: "Le maillot officiel de l'équipe championne et une place VIP pour un match.",
            icon: <Star className="w-8 h-8 text-yellow-500" />,
            color: "bg-yellow-50 border-yellow-200",
        },
        {
            rank: "2ème Prix",
            title: "Ballon Officiel",
            description: "Le ballon officiel du tournoi dédicacé par les joueurs.",
            icon: <Medal className="w-8 h-8 text-slate-400" />,
            color: "bg-slate-50 border-slate-200",
        },
        {
            rank: "3ème Prix",
            title: "Goodies CAN 2025",
            description: "Un pack exclusif de produits dérivés du tournoi.",
            icon: <Medal className="w-8 h-8 text-amber-700" />,
            color: "bg-orange-50 border-orange-200",
        },
    ];

    return (
        <section className="py-12 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        <Gift className="w-3 h-3" />
                        Récompenses
                    </div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
                        Gagnez des Cadeaux !
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Faites vos meilleures prédictions et tentez de remporter l'un de nos prix exclusifs CAN 2025.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {prizes.map((prize, index) => (
                        <div
                            key={index}
                            className={`relative p-6 rounded-2xl border ${prize.color} flex flex-col items-center text-center transition-transform hover:scale-105 duration-300`}
                        >
                            <div className="p-4 rounded-full bg-white shadow-sm mb-4">
                                {prize.icon}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                                {prize.rank}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {prize.title}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {prize.description}
                            </p>
                            {index === 0 && (
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                                    <Star className="w-4 h-4 text-white fill-current" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
