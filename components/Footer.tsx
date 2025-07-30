import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-6 py-8 text-center text-slate-600 dark:text-gray-400">
        <p className="mb-2">Uma iniciativa de Davi Cortelete para a turma de Engenharia de Software.</p>
        <p className="mb-2">
          Dúvidas ou sugestões? Fale conosco: 
          <a href="https://wa.me/5541988710303" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline mx-1">
            (41) 98871-0303
          </a> 
          ou 
          <a href="https://www.instagram.com/inteligenciarte.ia" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline ml-1">
            @inteligenciarte.ia
          </a>
        </p>
        <p className="text-sm mt-4">&copy; {new Date().getFullYear()} Encomenda Jaqueta Eng. Software. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;