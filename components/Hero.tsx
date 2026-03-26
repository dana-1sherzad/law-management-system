import React from 'react';
import { CheckCircleIcon } from './IconComponents';

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-32 bg-surface-bg overflow-hidden text-center">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse"></span>
          <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em]">بەرهەمێکی کوردی مۆدێرن</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-text-main leading-[0.9] tracking-tighter mb-8">
          یاسا بە <br />
          <span className="text-brand-primary">شێوازێکی نوێ</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mb-12 font-medium">
          سیستەمێکی زیرەک بۆ بەڕێوەبردنی کەیس، موکیل و دارایی. هەموو شتێک بە یەک کلیک و بە پارێزراوترین تەکنەلۆژیا لەژێر دەستی تۆدایە.
        </p>
        
        <div className="flex flex-col sm:flex-row-reverse gap-4 mb-20">
          <button
            onClick={onStartClick}
            className="px-10 py-5 bg-brand-primary text-white font-bold text-sm rounded hover:bg-blue-700 transition-all shadow-xl shadow-brand-primary/20 uppercase tracking-widest"
          >
            ئێستا تاقی بکەرەوە
          </button>
          <button className="px-10 py-5 bg-white text-text-main font-bold text-sm rounded border border-surface-border hover:bg-gray-50 transition-all uppercase tracking-widest">
            نموونەی سیستەمەکە
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
           <div className="flex items-center gap-3 text-text-muted font-bold text-[10px] tracking-widest uppercase">
              <CheckCircleIcon className="w-4 h-4 text-brand-primary" />
              ئەمنیەتی بەرز
           </div>
           <div className="flex items-center gap-3 text-text-muted font-bold text-[10px] tracking-widest uppercase">
              <CheckCircleIcon className="w-4 h-4 text-brand-primary" />
              هەوری پارێزراو
           </div>
           <div className="flex items-center gap-3 text-text-muted font-bold text-[10px] tracking-widest uppercase">
              <CheckCircleIcon className="w-4 h-4 text-brand-primary" />
              باکئەپی ڕۆژانە
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
