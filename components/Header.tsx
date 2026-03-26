import React, { useState } from 'react';
import { ScaleIcon } from './IconComponents';

type Language = 'ku' | 'ar' | 'en';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const languageOptions: { key: Language; label: string; flag: string }[] = [
  { key: 'ku', label: 'کوردی', flag: '☀️' },
  { key: 'ar', label: 'عربي', flag: '🇸🇦' },
  { key: 'en', label: 'English', flag: '🇬🇧' },
];

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLanguage = languageOptions.find(opt => opt.key === language);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <ScaleIcon className="h-8 w-8 text-brand-primary" />
          <span className="font-black text-xl mr-3 text-text-main tracking-tight uppercase">بەڕێوەبەری یاسایی</span>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              <a href="#features" className="hover:text-brand-primary transition-colors">تایبەتمەندییەکان</a>
              <a href="#contact" className="hover:text-brand-primary transition-colors">پشتیوانی</a>
          </nav>

          <div className="h-4 w-px bg-surface-border hidden md:block"></div>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center px-4 py-2 text-[10px] font-bold text-text-main bg-white border border-surface-border rounded hover:bg-gray-50 transition-all focus:outline-none"
            >
              <span className="ml-2">{selectedLanguage?.flag}</span>
              <span className="uppercase tracking-widest">{selectedLanguage?.label}</span>
              <svg className="mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute left-0 mt-2 w-40 rounded border border-surface-border shadow-xl bg-white overflow-hidden">
                <div className="py-1">
                  {languageOptions.map(option => (
                    <button
                      key={option.key}
                      onClick={() => {
                        setLanguage(option.key);
                        setIsOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 text-xs text-right transition-colors ${language === option.key ? 'bg-gray-50 text-brand-primary font-bold' : 'text-text-muted hover:bg-gray-50 hover:text-text-main'}`}
                    >
                      <span className="ml-3 text-base">{option.flag}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
