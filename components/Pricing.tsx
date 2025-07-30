import React, { useState } from 'react';
import { FIRST_BATCH_PRICE, REGULAR_PRICE, INSTALLMENTS_2X_PRICE, INSTALLMENTS_3X_PRICE } from '../constants';
import Modal from './Modal';
import InfoIcon from './icons/InfoIcon';

interface PricingCardProps {
    title: string;
    price?: number;
    features: string[];
    bestValue?: boolean;
    paymentInfo: string;
    onInfoClick: () => void;
    children?: React.ReactNode;
}

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={`w-6 h-6 ${className} mr-3 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, bestValue, paymentInfo, onInfoClick, children }) => {
    const wrapperClasses = bestValue ? "relative transform md:scale-110 z-10" : "relative";
    const cardClasses = `relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl flex flex-col h-full light-sweep ${bestValue ? 'glowing-border' : ''}`;

    return (
        <div className={wrapperClasses}>
            {bestValue && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold text-sm py-1 px-4 rounded-lg uppercase tracking-wider shadow-lg z-20">Vantajoso</div>}
            <div className={cardClasses}>
                <button onClick={onInfoClick} className="absolute top-4 right-4 text-slate-400 hover:text-cyan-500 dark:hover:text-pink-400 transition-colors z-10" aria-label="Mais informações">
                    <InfoIcon />
                </button>
                <h3 className={`text-2xl font-bold text-slate-900 dark:text-white text-center ${bestValue ? 'mt-4' : ''}`}>{title}</h3>
                <div className="my-6 text-center">
                    {price !== undefined ? (
                        <span className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">R${price.toFixed(2).replace('.', ',')}</span>
                    ) : (
                        children
                    )}
                </div>
                <p className="text-center text-cyan-600 dark:text-cyan-400 font-semibold mb-6 h-10 flex items-center justify-center">{paymentInfo}</p>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300 flex-grow">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <CheckIcon className={bestValue ? 'text-pink-500 dark:text-pink-400' : 'text-cyan-500 dark:text-cyan-400'} />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ModalInfoItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start py-2">
        <CheckIcon className="text-cyan-500 dark:text-pink-400 mt-1" />
        <span className="text-slate-700 dark:text-slate-300">{children}</span>
    </li>
);


const Pricing: React.FC<{onFaqClick: () => void}> = ({onFaqClick}) => {
    const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
    
    const firstBatchModal = (
        <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
                A melhor opção para quem quer garantir a jaqueta com o <strong>preço mais baixo e recebê-la o quanto antes</strong>. Uma oportunidade única de lançamento!
            </p>
            <ul className="list-none space-y-3">
                <ModalInfoItem><strong>Desconto Exclusivo:</strong> Pague apenas <strong className="text-cyan-600 dark:text-pink-400">R${FIRST_BATCH_PRICE.toFixed(2).replace('.', ',')}</strong>, o menor valor que teremos.</ModalInfoItem>
                <ModalInfoItem><strong>Pagamento Facilitado:</strong> Sinal de apenas <strong>50% (<strong className="text-cyan-600 dark:text-pink-400">R${(FIRST_BATCH_PRICE/2).toFixed(2).replace('.', ',')}</strong>)</strong> para reservar, e o restante só quando a jaqueta chegar em suas mãos.</ModalInfoItem>
                <ModalInfoItem><strong>Prioridade Total:</strong> Sua jaqueta será uma das primeiras a serem produzidas e entregues.</ModalInfoItem>
            </ul>
            <p className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500">
                <strong>Atenção:</strong> Esta condição é válida apenas por tempo limitado para os primeiros pedidos. Não perca!
            </p>
        </div>
    );
    const regularModal = (
        <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
                Perdeu o prazo do primeiro lote? Não se preocupe! Você ainda pode fazer parte da turma e garantir sua jaqueta.
            </p>
            <ul className="list-none space-y-3">
                <ModalInfoItem><strong>Valor Padrão:</strong> O valor da jaqueta é de <strong className="text-cyan-600 dark:text-pink-400">R${REGULAR_PRICE.toFixed(2).replace('.', ',')}</strong>.</ModalInfoItem>
                <ModalInfoItem><strong>Pagamento Único:</strong> O pagamento do valor total é feito no momento da encomenda.</ModalInfoItem>
                <ModalInfoItem><strong>Qualidade Garantida:</strong> A mesma jaqueta incrível, com a mesma qualidade premium.</ModalInfoItem>
            </ul>
            <p className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500">
                Esta opção é para quem decidir mais tarde. A produção ocorrerá após a finalização do primeiro lote.
            </p>
        </div>
    );
    const installmentsModal = (
        <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
                Prefere mais flexibilidade? Parcele sua jaqueta no cartão de crédito e pague com tranquilidade.
            </p>
            <ul className="list-none space-y-3">
                <ModalInfoItem><strong>Conveniência:</strong> Use seu cartão de crédito e pague em parcelas mensais.</ModalInfoItem>
                <ModalInfoItem><strong>Plano 2X:</strong> Fica em <strong>2 parcelas de <strong className="text-cyan-600 dark:text-pink-400">R${INSTALLMENTS_2X_PRICE.toFixed(2).replace('.', ',')}</strong></strong>, totalizando R$${(INSTALLMENTS_2X_PRICE * 2).toFixed(2).replace('.', ',')}.</ModalInfoItem>
                <ModalInfoItem><strong>Plano 3X:</strong> Fica em <strong>3 parcelas de <strong className="text-cyan-600 dark:text-pink-400">R${INSTALLMENTS_3X_PRICE.toFixed(2).replace('.', ',')}</strong></strong>, totalizando R$${(INSTALLMENTS_3X_PRICE * 3).toFixed(2).replace('.', ',')}.</ModalInfoItem>
            </ul>
            <p className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500">
                O valor total inclui uma pequena taxa da operadora do cartão. Para mais detalhes, 
                consulte nosso <button onClick={() => { setModalContent(null); onFaqClick(); }} className="font-semibold text-cyan-600 dark:text-pink-400 hover:underline">FAQ</button>.
            </p>
        </div>
    );

    return (
        <section id="pricing" className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_2px_rgba(236,72,153,0.4)]">
                        Condições Especiais
                    </h2>
                    <p className="mt-4 text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Quem chega primeiro, garante o melhor preço! Escolha o plano ideal para você.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-center pt-12 md:pt-16">
                    <PricingCard
                        title="PREÇO NORMAL"
                        price={REGULAR_PRICE}
                        paymentInfo="Pagamento 100% à vista"
                        features={["Para pedidos feitos após o período de lançamento.", "Sujeito à disponibilidade da segunda leva.", "Oportunidade para quem decidiu depois."]}
                        onInfoClick={() => setModalContent({ title: "Sobre o Preço Normal", content: regularModal })}
                    />
                    <PricingCard
                        title="PRIMEIRO LOTE"
                        price={FIRST_BATCH_PRICE}
                        paymentInfo={`50% na encomenda (R$${(FIRST_BATCH_PRICE / 2).toFixed(2)}) + 50% na entrega`}
                        features={["Preço com desconto máximo.", "Prioridade na lista de produção.", "Garante sua jaqueta na primeira leva."]}
                        bestValue={true}
                        onInfoClick={() => setModalContent({ title: "Sobre o Primeiro Lote", content: firstBatchModal })}
                    />
                    <PricingCard
                        title="PARCELADO"
                        paymentInfo="Pagamento facilitado no cartão"
                        features={["Flexibilidade para pagar.", "Pequeno acréscimo de juros.", "Ideal para quem precisa diluir o custo."]}
                        onInfoClick={() => setModalContent({ title: "Sobre o Parcelamento", content: installmentsModal })}
                    >
                        <div className="text-slate-800 dark:text-slate-200">
                            <p className="text-3xl font-bold">2x de <span className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">R${INSTALLMENTS_2X_PRICE.toFixed(2).replace('.', ',')}</span></p>
                            <p className="text-lg font-bold text-slate-600 dark:text-slate-400 my-2">ou</p>
                            <p className="text-3xl font-bold">3x de <span className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">R${INSTALLMENTS_3X_PRICE.toFixed(2).replace('.', ',')}</span></p>
                        </div>
                    </PricingCard>
                </div>
            </div>
            {modalContent && (
                <Modal title={modalContent.title} onClose={() => setModalContent(null)}>
                    {modalContent.content}
                </Modal>
            )}
        </section>
    );
};

export default Pricing;