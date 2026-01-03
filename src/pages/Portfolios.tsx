import React from 'react';
import { Badge } from "@/components/ui/badge";

const Portfolios = () => {
  const players = [
    {
      id: 1,
      name: "Rawâa M'chaâbat",
      role: "Full Stack Developer",
      status: "Coding Champion",
      image: "/portfolios/rawaa.png",
      link: "https://portfoliomch-3foa.vercel.app/",
      color: "from-green-500/20 to-emerald-900/40"
    },
    {
      id: 2,
      name: "Hassania El-falah",
      role: "Web Developer",
      status: "Fullstack Legend",
      image: "/portfolios/hassania.png",
      link: "https://myportfolio1-hia1.vercel.app/",
      color: "from-blue-500/20 to-indigo-900/40"
    },
    {
      id: 3,
      name: "Aya Asrir",
      role: "Web Developer",
      status: "Creative Artisan",
      image: "/portfolios/aya.png",
      link: "https://portfolioaya-git-main-ayas-projects-1623d1c3.vercel.app/",
      color: "from-orange-500/20 to-red-900/40"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent uppercase tracking-tighter">
          Our Champions
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
          Meet the legends of the game. Click on their cards to explore their professional portfolios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {players.map((player) => (
          <a
            key={player.id}
            href={player.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[3/4.5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition-all duration-500 hover:scale-105 hover:border-yellow-500/30 hover:shadow-[0_0_50px_rgba(234,179,8,0.15)]"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${player.color} opacity-40 transition-opacity duration-500`} />

            {/* Player Image */}
            <img
              src={player.image}
              alt={player.name}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Card Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent z-20">
              <Badge className="mb-4 bg-yellow-500 text-black border-none font-black px-4 py-1 text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/20">
                {player.role}
              </Badge>
              <h2 className="text-3xl font-black mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                {player.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="h-1 w-8 bg-yellow-500 rounded-full" />
                <p className="text-xs text-gray-400 uppercase font-bold tracking-[0.2em]">
                  {player.status}
                </p>
              </div>
            </div>

            {/* Premium Border Effect */}
            <div className="absolute inset-4 border-2 border-white/5 rounded-[1.5rem] pointer-events-none transition-all duration-500 group-hover:inset-0 group-hover:border-yellow-500/20 group-hover:rounded-[2rem]" />
          </a>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-center gap-4 animate-bounce">
        <span className="text-4xl">☝️</span>
        <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent uppercase tracking-widest drop-shadow-sm">
          Click a card to enter the portfolio
        </div>
      </div>
    </div>
  );
};

export default Portfolios;
