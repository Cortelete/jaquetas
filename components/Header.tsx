import React from 'react';

interface HeaderProps {
  onOrderClick: () => void;
  theme: string;
  toggleTheme: () => void;
}

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onOrderClick, theme, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 shadow-lg shadow-cyan-500/10 dark:shadow-pink-500/10">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 hover:animate-pulse">
          Jaqueta Eng. Software
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={onOrderClick}
            className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:shadow-cyan-400/40 dark:hover:shadow-pink-500/40 transform hover:scale-105 transition-all duration-300"
          >
            Pedir a Minha
          </button>
           <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;