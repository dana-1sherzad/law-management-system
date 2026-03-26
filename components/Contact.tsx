import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight uppercase">
          پەیوەندی بکە
        </h2>
        <p className="mt-4 text-text-muted font-medium max-w-2xl mx-auto">
          بۆ بینینی نموونەی سیستەمەکە یان بۆ هەر پرسیارێک، پەیوەندیمان پێوە بکە.
        </p>
        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6">
            <a href="tel:07517083849" className="group flex items-center justify-center w-full md:w-auto text-sm font-bold bg-white text-text-main px-8 py-4 rounded border border-surface-border hover:border-brand-accent hover:bg-gray-50 transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 text-brand-accent group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="uppercase tracking-widest">تەلەفۆن: 07517083849</span>
            </a>
            <a href="https://wa.me/9647517083849" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center w-full md:w-auto text-sm font-bold bg-green-600 text-white px-8 py-4 rounded hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.905 6.344l.229.352-1.233 4.485 4.629-1.21.342.215z" />
                </svg>
                <span className="uppercase tracking-widest">واتساپ: 07517083849</span>
            </a>
        </div>
        <div className="mt-20">
            <h3 className="text-2xl md:text-3xl font-black text-text-main uppercase tracking-tight">🚀 کاتت گرانبەهایە... ئێستا دەست پێبکە!</h3>
        </div>
      </div>
    </section>
  );
};

export default Contact;
