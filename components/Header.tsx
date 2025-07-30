
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onModelsClick: () => void;
  onPricingClick: () => void;
  onFaqClick: () => void;
  onOrderClick: () => void;
  theme: string;
  toggleTheme: () => void;
}

// Icons for theme toggle
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

// Icons for mobile menu
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onModelsClick, onPricingClick, onFaqClick, onOrderClick, theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const NavLink: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => {
    const handleClick = () => {
        onClick();
        setIsMenuOpen(false);
    }
    return (
        <button onClick={handleClick} className="py-2 text-lg md:text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-pink-400 transition-colors">
            {children}
        </button>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 shadow-lg shadow-cyan-500/10 dark:shadow-pink-500/10">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 hover:animate-pulse">
            VetJaqs
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink onClick={onModelsClick}>Modelos</NavLink>
            <NavLink onClick={onPricingClick}>Preços</NavLink>
            <NavLink onClick={onFaqClick}>FAQ</NavLink>
            <button
              onClick={onOrderClick}
              className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:shadow-cyan-400/40 dark:hover:shadow-pink-500/40 transform hover:scale-105 transition-all duration-300"
            >
              Encomendar Agora
            </button>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
              <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                  aria-label="Abrir menu"
              >
                  <MenuIcon />
              </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="container mx-auto px-6 py-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  Navegação
               </h2>
               <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                  aria-label="Fechar menu"
               >
                   <CloseIcon />
               </button>
            </div>
            <nav className="flex flex-col items-center justify-center gap-6 text-center flex-grow -mt-16">
                <NavLink onClick={onModelsClick}>Modelos</NavLink>
                <NavLink onClick={onPricingClick}>Preços</NavLink>
                <NavLink onClick={onFaqClick}>FAQ</NavLink>
                <div className="my-4 border-b border-slate-200 dark:border-slate-700 w-1/2"></div>
                <button
                  onClick={() => { onOrderClick(); setIsMenuOpen(false); }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-cyan-400/50 dark:hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  Encomendar Agora
                </button>
            </nav>
            <div className="flex justify-center items-center pb-8">
                 <button
                    onClick={toggleTheme}
                    className="p-3 flex items-center gap-2 rounded-full text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    <span className="font-semibold">{theme === 'dark' ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}</span>
                </button>
            </div>
          </div>
      </div>
    </>
  );
};

export default Header;
