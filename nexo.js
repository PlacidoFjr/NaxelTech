// pages/index.tsx (Next.js)

import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>NexoTech Consultoria: TI Estratégica para Novos Escritórios</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="#" className="text-2xl font-bold text-blue-600">Nexo<span className="text-slate-700">Tech</span></Link>
          <div className="hidden md:flex space-x-8">
            <a href="#desafio" className="text-slate-600 hover:text-blue-600 font-medium">O Desafio</a>
            <a href="#servicos" className="text-slate-600 hover:text-blue-600 font-medium">Nossos Serviços</a>
            <a href="#beneficios" className="text-slate-600 hover:text-blue-600 font-medium">Benefícios</a>
            <a href="#contato" className="text-slate-600 hover:text-blue-600 font-medium">Contato</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-600">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-full">
            <a href="#desafio" className="block px-6 py-3 text-slate-600 hover:text-blue-600">O Desafio</a>
            <a href="#servicos" className="block px-6 py-3 text-slate-600 hover:text-blue-600">Nossos Serviços</a>
            <a href="#beneficios" className="block px-6 py-3 text-slate-600 hover:text-blue-600">Benefícios</a>
            <a href="#contato" className="block px-6 py-3 text-slate-600 hover:text-blue-600">Contato</a>
          </div>
        )}
      </header>

      <main className="container mx-auto px-6">
        <section id="hero" className="text-center py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-100 rounded-b-3xl -mx-6 px-6 animate-on-scroll">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Potencialize Seu Novo Escritório com a <span className="text-blue-600">NexoTech</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Transformamos a tecnologia numa vantagem competitiva para o seu negócio, com soluções de TI estratégicas, seguras e sob medida.
          </p>
          <a href="#servicos" className="bg-blue-600 text-white font-semibold py-3 px-10 rounded-lg text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
            Descubra Nossas Soluções
          </a>
        </section>
        {/* Adicione seções futuras aqui: desafio, serviços, benefícios, contato */}
      </main>

      <footer className="bg-slate-800 text-slate-300 mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
          <p>&copy; 2025 NexoTech Consultoria. Todos os direitos reservados.</p>
          <p className="text-sm mt-1">Construindo o futuro tecnológico do seu negócio.</p>
        </div>
      </footer>
    </>
  );
}
// pages/index.tsx (Next.js)

import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>NexoTech Consultoria: TI Estratégica para Novos Escritórios</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="#" className="text-2xl font-bold text-blue-600">Nexo<span className="text-slate-700">Tech</span></Link>
          <div className="hidden md:flex space-x-8">
            <a href="#desafio" className="text-slate-600 hover:text-blue-600 font-medium">O Desafio</a>
            <a href="#servicos" className="text-slate-600 hover:text-blue-600 font-medium">Nossos Serviços</a>
            <a href="#beneficios" className="text-slate-600 hover:text-blue-600 font-medium">Benefícios</a>
            <a href="#contato" className="text-slate-600 hover:text-blue-600 font-medium">Contato</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-600">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-full">
            <a href="#desafio" className="block px-6 py-3 text-slate-600 hover:text-blue-600">O Desafio</a>
            <a href="#servicos" className="block px-6 py-3 text-slate-600 hover:text-blue-600">Nossos Serviços</a>
            <a href="#beneficios" className="block px-6 py-3 text-slate-600 hover:text-blue-600">Benefícios</a>
            <a href="#contato" className="block px-6 py-3 text-slate-600 hover:text-blue-600">Contato</a>
          </div>
        )}
      </header>

      <main className="container mx-auto px-6">
        <section id="hero" className="text-center py-20 md:py-32 bg-gradient-to-br from-slate-50 to-blue-100 rounded-b-3xl -mx-6 px-6 animate-on-scroll">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Potencialize Seu Novo Escritório com a <span className="text-blue-600">NexoTech</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Transformamos a tecnologia numa vantagem competitiva para o seu negócio, com soluções de TI estratégicas, seguras e sob medida.
          </p>
          <a href="#servicos" className="bg-blue-600 text-white font-semibold py-3 px-10 rounded-lg text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
            Descubra Nossas Soluções
          </a>
        </section>
        {/* Adicione seções futuras aqui: desafio, serviços, benefícios, contato */}
      </main>

      <footer className="bg-slate-800 text-slate-300 mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
          <p>&copy; 2025 NexoTech Consultoria. Todos os direitos reservados.</p>
          <p className="text-sm mt-1">Construindo o futuro tecnológico do seu negócio.</p>
        </div>
      </footer>
    </>
  );
}
