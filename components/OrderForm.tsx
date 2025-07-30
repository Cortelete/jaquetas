import React from 'react';

interface OrderFormProps {
  theme: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ theme }) => {
  // ATENÇÃO: O ID do formulário agora é lido a partir de uma variável de ambiente.
  // Configure VITE_JOTFORM_ID no seu arquivo .env.local e nas configurações da Vercel.
  const jotformId = import.meta.env?.VITE_JOTFORM_ID;
  const jotformUrl = jotformId ? `https://form.jotform.com/${jotformId}?isdark=${theme === 'dark'}` : '';

  return (
    <section id="order" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_2px_rgba(236,72,153,0.4)]">Faça sua Encomenda</h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">Preencha o formulário abaixo para garantir a sua jaqueta. É rápido e seguro!</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-2 sm:p-4 rounded-lg shadow-2xl shadow-cyan-500/10 dark:shadow-pink-900/50">
           {!jotformId && (
             <div className="bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 mb-6 rounded-r-lg" role="alert">
                <p className="font-bold">Ação Necessária do Desenvolvedor</p>
                <p className="text-sm">Para que este formulário funcione, você precisa criar uma variável de ambiente chamada <strong>`VITE_JOTFORM_ID`</strong>. Crie um arquivo `.env.local` na raiz do projeto com o seu ID do JotForm e também adicione-o às configurações de Environment Variables na Vercel.</p>
            </div>
           )}

            {jotformId && (
              <div className="relative" style={{paddingTop: '120%'}}> {/* Aspect ratio for form height */}
               <iframe
                  key={jotformId + theme} // Force re-render on theme change
                  id="JotFormIFrame"
                  title="Encomenda de Jaqueta"
                  src={jotformUrl}
                  frameBorder="0"
                  style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                  }}
                  scrolling="auto" // Allow scrolling if form is longer than the container
               >
               </iframe>
              </div>
            )}
            <p className="text-xs text-center mt-4 text-slate-500 dark:text-slate-400">
                Powered by <a href="https://www.jotform.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">JotForm</a>.
            </p>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;