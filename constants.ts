
import React from 'react';

export const FIRST_BATCH_PRICE = 180.00;
export const REGULAR_PRICE = 220.00;
export const INSTALLMENTS_2X_PRICE = 120.00;
export const INSTALLMENTS_3X_PRICE = 85.00;

export const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG'];

export const FAQ_ITEMS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Qual o tecido da jaqueta?",
    answer: "A jaqueta será no estilo 'college' ou 'bomber', feita com moletom de alta qualidade, forro interno e detalhes bordados, garantindo conforto e durabilidade."
  },
  {
    question: "Como funciona o pagamento do 'Primeiro Lote'?",
    answer: React.createElement(React.Fragment, null,
      'Você paga 50% do valor (',
      React.createElement('strong', { className: "font-semibold text-cyan-600 dark:text-pink-400" }, `R$${(FIRST_BATCH_PRICE / 2).toFixed(2).replace('.', ',')}`),
      ') agora para garantir o desconto e o restante na entrega da jaqueta. O contato para pagamento será feito via e-mail ou WhatsApp.'
    )
  },
  {
    question: "Qual a diferença da jaqueta de veterano?",
    answer: "A jaqueta de veterano terá um design exclusivo, com detalhes que homenageiam a jornada dos formandos. Apenas alunos do último ano ou já formados no curso podem adquiri-la."
  },
  {
    question: "Posso parcelar a compra?",
    answer: "Sim! Oferecemos parcelamento em 2x ou 3x (via link de pagamento), com um pequeno acréscimo. Consulte os valores na seção de preços. Esta opção é ideal para quem precisa de mais flexibilidade."
  },
  {
    question: "Posso ver o design final antes de pagar?",
    answer: "Sim! O design finalizado pelo Davi será enviado no grupo da turma para aprovação de todos antes da produção em massa ser iniciada."
  },
  {
    question: "Qual o prazo de entrega?",
    answer: "A estimativa é de 30-45 dias após a confirmação dos pedidos e o pagamento da primeira parcela. Manteremos todos atualizados sobre o processo."
  },
  {
    question: "E se eu quiser um tamanho que não está na lista?",
    answer: "Entre em contato diretamente conosco para verificar a possibilidade de tamanhos especiais."
  },
];
