import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';

interface FaqItemProps {
  item: { question: string; answer: React.ReactNode };
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200 dark:border-gray-700">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-2"
      >
        <span className="text-lg font-medium text-slate-800 dark:text-gray-100">{item.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg className="w-6 h-6 text-cyan-500 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="text-slate-700 dark:text-gray-300 pb-5 px-2">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_2px_rgba(236,72,153,0.4)]">Dúvidas Frequentes</h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">Respostas para as perguntas mais comuns. Se ainda tiver dúvidas, fale conosco!</p>
        </div>
        <div>
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;