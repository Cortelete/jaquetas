
import React, { useState } from 'react';
import { OrderFormData } from '../types';
import { SIZES, FIRST_BATCH_PRICE, REGULAR_PRICE, INSTALLMENTS_2X_PRICE, INSTALLMENTS_3X_PRICE, PERIOD_OPTIONS } from '../constants';
import Modal from './Modal';

// Sub-componentes para clareza
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="w-full bg-gray-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-pink-500 transition-all outline-none" />;
const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} className="w-full bg-gray-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-pink-500 transition-all outline-none appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }} />;
const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} className="w-full bg-gray-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-pink-500 transition-all outline-none" rows={4} />;
const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent pb-2 border-b-2 border-cyan-200 dark:border-pink-800">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);
const RadioCard: React.FC<{ id: string, name: string, value: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, title: string, description: React.ReactNode }> = ({ id, name, value, checked, onChange, title, description }) => (
    <label htmlFor={id} className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${checked ? 'border-cyan-500 dark:border-pink-500 bg-cyan-50 dark:bg-slate-700' : 'border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
        <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
        <p className="font-bold text-slate-800 dark:text-white">{title}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </label>
);

const OrderForm: React.FC = () => {
    const [formData, setFormData] = useState<OrderFormData>({
        name: '', email: '', phone: '', faculty: 'Engenharia de Software', period: '', class: '',
        jacketModel: 'normal', veteranConfirmation: false, size: 'M',
        paymentOption: 'first_batch', installmentsPlan: '', extras: '',
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    const formatPhoneNumber = (value: string) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 3) return `(${phoneNumber}`;
        if (phoneNumberLength < 8) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        setFormData(prev => ({ ...prev, [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setFormData(prev => ({ ...prev, phone: formattedPhoneNumber }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(formData.jacketModel === 'veteran' && !formData.veteranConfirmation) {
            alert('Por favor, confirme que você é um veterano para selecionar este modelo.');
            return;
        }
        if(formData.paymentOption === 'installments' && !formData.installmentsPlan) {
            alert('Por favor, selecione um plano de parcelamento.');
            return;
        }
        setShowConfirmation(true);
    };

    const generateWhatsAppMessage = () => {
        let paymentDetails = '';
        switch(formData.paymentOption) {
            case 'first_batch': paymentDetails = `Primeiro Lote (R$${FIRST_BATCH_PRICE.toFixed(2)})`; break;
            case 'regular': paymentDetails = `Preço Normal (R$${REGULAR_PRICE.toFixed(2)})`; break;
            case 'installments':
                if (formData.installmentsPlan === '2x') paymentDetails = `Parcelado 2x de R$${INSTALLMENTS_2X_PRICE.toFixed(2)}`;
                if (formData.installmentsPlan === '3x') paymentDetails = `Parcelado 3x de R$${INSTALLMENTS_3X_PRICE.toFixed(2)}`;
                break;
        }

        const message = `
        *-- NOVA ENCOMENDA DE JAQUETA --*
        
        *DADOS PESSOAIS:*
        - *Nome:* ${formData.name}
        - *Email:* ${formData.email}
        - *Celular:* ${formData.phone}
        
        *DADOS ACADÊMICOS:*
        - *Faculdade:* ${formData.faculty}
        - *Período:* ${formData.period}
        - *Turma:* ${formData.class}
        
        *DETALHES DO PEDIDO:*
        - *Modelo:* ${formData.jacketModel === 'veteran' ? 'Veterano' : 'Normal'}
        - *Tamanho:* ${formData.size}
        - *Plano de Pagamento:* ${paymentDetails}
        
        *SUGESTÕES/EXTRAS:*
        ${formData.extras || 'Nenhuma'}
        
        *------------------------------------*
        Aguardando contato para prosseguir com o pagamento.
        `.trim().replace(/ /g, '%20').replace(/\n/g, '%0A');

        return message;
    };
    
    const confirmAndSend = () => {
      const phoneNumber = "5541988710303";
      const message = generateWhatsAppMessage();
      const url = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setShowConfirmation(false);
    };

    const OrderSummary = () => (
        <div className="space-y-3 text-sm">
            <p><strong>Nome:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Celular:</strong> {formData.phone}</p>
            <p><strong>Curso:</strong> {formData.faculty}, {formData.period}, Turma {formData.class}</p>
            <hr className="border-slate-200 dark:border-slate-600" />
            <p><strong>Modelo:</strong> {formData.jacketModel === 'veteran' ? 'Veterano' : 'Normal'}</p>
            <p><strong>Tamanho:</strong> {formData.size}</p>
            <p><strong>Pagamento:</strong> 
                {formData.paymentOption === 'first_batch' && `Primeiro Lote (R$${FIRST_BATCH_PRICE.toFixed(2)})`}
                {formData.paymentOption === 'regular' && `Preço Normal (R$${REGULAR_PRICE.toFixed(2)})`}
                {formData.paymentOption === 'installments' && `Parcelado ${formData.installmentsPlan}`}
            </p>
            <p><strong>Sugestões:</strong> {formData.extras || "Nenhuma"}</p>
        </div>
    );

    return (
        <section id="order" className="py-20 bg-gray-50 dark:bg-slate-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_2px_rgba(236,72,153,0.4)]">Faça sua Encomenda</h2>
                    <p className="mt-4 text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">Preencha o formulário abaixo para garantir a sua jaqueta. É rápido e seguro!</p>
                </div>
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white dark:bg-slate-800 rounded-lg shadow-2xl shadow-cyan-500/10 dark:shadow-pink-900/50 space-y-8">
                    <FormSection title="Seus Dados">
                        <Input name="name" placeholder="Nome Completo" value={formData.name} onChange={handleChange} required />
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input name="email" type="email" placeholder="Seu melhor e-mail" value={formData.email} onChange={handleChange} required />
                            <Input name="phone" type="tel" placeholder="(00) 00000-0000" value={formData.phone} onChange={handlePhoneChange} maxLength={15} required />
                        </div>
                    </FormSection>
                    
                    <FormSection title="Dados Acadêmicos">
                        <div className="grid md:grid-cols-3 gap-4">
                            <Input name="faculty" placeholder="Faculdade" value={formData.faculty} onChange={handleChange} required />
                            <Select name="period" value={formData.period} onChange={handleChange} required>
                                <option value="" disabled>Selecione seu nível...</option>
                                {PERIOD_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                            </Select>
                            <Input name="class" placeholder="Turma" value={formData.class} onChange={handleChange} required />
                        </div>
                    </FormSection>

                    <FormSection title="Detalhes do Pedido">
                        <Select name="size" value={formData.size} onChange={handleChange} required>
                            <option value="" disabled>Selecione o Tamanho</option>
                            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                        </Select>
                        <RadioCard id="model_normal" name="jacketModel" value="normal" checked={formData.jacketModel === 'normal'} onChange={handleChange} title="Jaqueta Normal" description="O design padrão da turma." />
                        <RadioCard id="model_veteran" name="jacketModel" value="veteran" checked={formData.jacketModel === 'veteran'} onChange={handleChange} title="Jaqueta de Veterano" description="Design exclusivo para formandos." />
                        {formData.jacketModel === 'veteran' && (
                            <label className="flex items-center gap-2 p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                                <input type="checkbox" name="veteranConfirmation" checked={formData.veteranConfirmation} onChange={handleChange} className="h-5 w-5 rounded text-cyan-600 focus:ring-cyan-500" />
                                <span className="text-sm text-yellow-800 dark:text-yellow-200">Confirmo que sou formando/veterano e elegível para este modelo.</span>
                            </label>
                        )}
                    </FormSection>

                     <FormSection title="Plano de Pagamento">
                        <RadioCard id="pay_first_batch" name="paymentOption" value="first_batch" checked={formData.paymentOption === 'first_batch'} onChange={handleChange} title="Primeiro Lote" description={<>Valor: <strong className="text-cyan-600 dark:text-pink-400">R${FIRST_BATCH_PRICE.toFixed(2)}</strong> (50% no pedido, 50% na entrega)</>} />
                        <RadioCard id="pay_regular" name="paymentOption" value="regular" checked={formData.paymentOption === 'regular'} onChange={handleChange} title="Preço Normal" description={<>Valor: <strong className="text-cyan-600 dark:text-pink-400">R${REGULAR_PRICE.toFixed(2)}</strong> (100% no pedido)</>} />
                        <RadioCard id="pay_installments" name="paymentOption" value="installments" checked={formData.paymentOption === 'installments'} onChange={handleChange} title="Parcelado no Cartão" description="Pague com mais flexibilidade." />
                        {formData.paymentOption === 'installments' && (
                            <div className="pl-6 space-y-2">
                                <RadioCard id="plan_2x" name="installmentsPlan" value="2x" checked={formData.installmentsPlan === '2x'} onChange={handleChange} title="2 Parcelas" description={<>2x de <strong className="text-cyan-600 dark:text-pink-400">R${INSTALLMENTS_2X_PRICE.toFixed(2)}</strong></>} />
                                <RadioCard id="plan_3x" name="installmentsPlan" value="3x" checked={formData.installmentsPlan === '3x'} onChange={handleChange} title="3 Parcelas" description={<>3x de <strong className="text-cyan-600 dark:text-pink-400">R${INSTALLMENTS_3X_PRICE.toFixed(2)}</strong></>} />
                            </div>
                        )}
                    </FormSection>
                    
                    <FormSection title="Extras e Sugestões">
                        <TextArea name="extras" placeholder="Algum detalhe extra? Bordado de nome/nickname? Deixe sua sugestão aqui." value={formData.extras} onChange={handleChange} />
                    </FormSection>

                    <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-cyan-400/50 dark:hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300">
                        Revisar e Encomendar
                    </button>
                </form>
            </div>
             {showConfirmation && (
                <Modal title="Confirme Seu Pedido" onClose={() => setShowConfirmation(false)}>
                    <div className="space-y-4">
                        <p>Por favor, revise os detalhes do seu pedido abaixo. Se tudo estiver correto, clique no botão para enviar sua encomenda via WhatsApp.</p>
                        <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                            <OrderSummary />
                        </div>
                        <button onClick={confirmAndSend} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.846 6.075l-1.117 4.082 4.162-1.085z"/></svg>
                            Confirmar e Enviar para o WhatsApp
                        </button>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default OrderForm;