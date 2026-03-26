import React from 'react';

const TargetAudience = [
    {
        emoji: '👨‍⚖️',
        title: 'پارێزەران',
        description: 'کەیسەکانت بە ڕێکوپێکی بەڕێوەببە',
    },
    {
        emoji: '🏢',
        title: 'نووسینگە یاساییەکان',
        description: 'هەموو تیمەکەت لە یەک شوێندا',
    },
    {
        emoji: '🏛',
        title: 'کۆمپانیاکان',
        description: 'کاری یاسایی بە ئاسانی',
    }
];

const ForWhom: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 border-y border-surface-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:30px_30px] opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight uppercase">👥 بۆ کێ دروستکراوە؟</h2>
          <div className="mt-4 h-1 w-20 bg-brand-accent mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {TargetAudience.map((item, index) => (
             <div key={index} className="p-10 bg-white rounded border border-surface-border shadow-sm hover:shadow-md hover:border-brand-accent/30 transition-all duration-300 group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                <h3 className="text-lg font-black text-text-main uppercase tracking-widest mb-3">{item.title}</h3>
                <p className="text-text-muted text-sm font-medium leading-relaxed">{item.description}</p>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhom;
