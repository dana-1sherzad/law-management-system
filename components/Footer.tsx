import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-surface-border py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">
          &copy; {currentYear} سیستەمی بەڕێوەبردنی کەیسەکان. هەموو مافێکی پارێزراوە.
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="text-text-muted hover:text-brand-accent text-[10px] font-bold uppercase tracking-widest transition-colors">مەرجەکان</a>
          <a href="#" className="text-text-muted hover:text-brand-accent text-[10px] font-bold uppercase tracking-widest transition-colors">پاراستنی داتا</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
