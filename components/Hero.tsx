import React from 'react';

interface HeroProps {
  onOrderClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
              A Jaqueta Oficial da nossa turma de <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Engenharia de Software</span>.
            </h2>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-300">
              Garanta a sua e faça parte da história. Design exclusivo by Davi Cortelete, com modelos para todos e uma versão especial para veteranos. Preço de lançamento para os primeiros!
            </p>
            <div className="mt-8">
              <button
                onClick={onOrderClick}
                className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-cyan-400/50 dark:hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300"
              >
                EU QUERO!
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
             <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gray-100 dark:bg-slate-800 shadow-2xl shadow-cyan-500/20 dark:shadow-pink-500/20 overflow-hidden flex items-center justify-center">
                <img 
                    src="https://placehold.co/800x800/1e293b/ec4899?text=Design%20em%20Breve" 
                    alt="Mockup da Jaqueta" 
                    className="object-cover w-full h-full opacity-60 dark:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                <span className="absolute text-2xl font-bold text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-lg">DESIGN EM BREVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;