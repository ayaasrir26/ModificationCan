import { UserPlus, Edit3, Trophy, BarChart3 } from "lucide-react";

const steps = [
  {
    title: "Create an account",
    description: "Sign up or log in to start making your CAN 2025 predictions.",
    icon: UserPlus,
  },
  {
    title: "Predict matches",
    description: "Choose match winners and scores for each game.",
    icon: Edit3,
  },
  {
    title: "Earn points",
    description: "Get points for correct predictions and results.",
    icon: Trophy,
  },
  {
    title: "Check rankings",
    description: "See your position on the leaderboard and compare scores.",
    icon: BarChart3,
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 bg-black/40 backdrop-blur-md">
      <h2 className="text-center text-4xl md:text-5xl font-display text-white mb-12">
        How it works
      </h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center shadow-xl transition-transform duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-emerald-400" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
