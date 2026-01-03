import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AvenirBall = () => {
    const location = useLocation();

    // Dynamic link: If on portfolios, link back to bracket. Otherwise, link to portfolios.
    const isPortfolios = location.pathname === '/portfolios';
    const destination = isPortfolios ? '/bracket' : '/portfolios';

    return (
        <div className="fixed bottom-10 left-0 w-full pointer-events-none z-[9999] overflow-hidden h-24">
            <Link
                to={destination}
                className="pointer-events-auto absolute left-[-150px] flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 hover:scale-110 animate-roll-right group"
            >
                {/* User's Custom Ball Asset */}
                <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                        src="/cora.avif"
                        alt="Soccer Ball"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Sporty Darker Green Text - Bolder and Larger */}
                <span className="relative z-10 font-black text-[16px] text-[#00C853] tracking-wider uppercase [text-shadow:_0_2px_4px_rgba(0,0,0,0.8),_0_0_10px_rgba(0,0,0,0.5)] group-hover:text-white transition-colors">
                    CLICK
                </span>

                {/* Rolling Rotation */}
                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes roll-right {
            0% { transform: translateX(0) rotate(0deg); left: -150px; }
            100% { transform: translateX(calc(100vw + 300px)) rotate(1080deg); left: -150px; }
          }
          .animate-roll-right {
            animation: roll-right 18s linear infinite;
          }
          .animate-roll-right:hover {
            animation-play-state: paused;
          }
        `}} />
            </Link>
        </div>
    );
};

export default AvenirBall;
