import React from 'react';

const InfoCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-cyan-500/20 dark:hover:shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-1 light-sweep">
        <div className="flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full text-white">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-700 dark:text-slate-300">{description}</p>
    </div>
);

const JacketInfo: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_2px_rgba(236,72,153,0.4)]">
                        Qualidade e Estilo Garantidos
                    </h2>
                    <p className="mt-4 text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Feita por nós, para nós. Cada detalhe pensado para representar nossa jornada.
                    </p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    <InfoCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
                        title="Design Exclusivo"
                        description="Criado pelo nosso colega Davi Cortelete, pensando na identidade do nosso curso. Uma peça única que ninguém mais terá."
                    />
                     <InfoCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                        title="Modelo para Veteranos"
                        description="Uma versão especial com design diferenciado, exclusiva para os formandos, como uma marca de sua conquista e jornada."
                    />
                    <InfoCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        title="Material Premium"
                        description="Moletom grosso e confortável, com forro interno e bordados de alta definição para garantir um acabamento impecável e duradouro."
                    />
                    <InfoCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        title="Símbolo da Turma"
                        description="Mais que uma roupa, uma lembrança dos nossos anos de faculdade. Vista o orgulho de ser Engenharia de Software!"
                    />
                </div>
            </div>
        </section>
    );
};

export default JacketInfo;