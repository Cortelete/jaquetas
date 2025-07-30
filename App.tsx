
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import JacketInfo from './components/JacketInfo';
import Pricing from './components/Pricing';
import OrderForm from './components/OrderForm';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Footer from './components/Footer';

function App() {
  const orderFormRef = React.useRef<HTMLDivElement>(null);
  const faqRef = React.useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }
    return localStorage.getItem('theme') || 'dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToOrderForm = () => {
    orderFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToFaq = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-sans antialiased">
      <Header onOrderClick={scrollToOrderForm} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero onOrderClick={scrollToOrderForm} />
        <JacketInfo />
        <Pricing onFaqClick={scrollToFaq} />
        <div ref={orderFormRef}>
          <OrderForm />
        </div>
        <Contact />
        <div ref={faqRef}>
          <Faq />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
