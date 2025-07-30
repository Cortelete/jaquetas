import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import InstagramIcon from './icons/InstagramIcon';

const Contact: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-800">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_2px_rgba(236,72,153,0.4)]">
                    Fale Conosco
                </h2>
                <p className="mt-4 text-xl text-slate-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
                    Ficou com alguma dúvida? Entre em contato conosco diretamente. Estamos aqui para ajudar!
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <a
                        href="https://wa.me/5541988710303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full sm:w-auto text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-300 bg-[#25D366] hover:bg-[#1DAE50] shadow-green-500/30"
                    >
                        <WhatsAppIcon className="w-7 h-7" />
                        <span>WhatsApp</span>
                    </a>
                    <a
                        href="https://www.instagram.com/InteligenciArte.IA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full sm:w-auto text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:shadow-pink-500/40"
                    >
                        <InstagramIcon className="w-7 h-7" />
                        <span>Instagram</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;