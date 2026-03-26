import React from 'react';
import { cn } from '../lib/utils';
import { 
  BriefcaseIcon, 
  UsersIcon, 
  DollarSignIcon, 
  ClockIcon, 
  FileTextIcon, 
  GavelIcon 
} from './IconComponents';

const features = [
  {
    title: 'بەڕێوەبردنی کەیسەکان',
    description: 'هەموو زانیارییەکانی کەیسەکانت لە یەک شوێندا کۆبکەرەوە و بە ئاسانی بەدواداچوونیان بۆ بکە.',
    icon: BriefcaseIcon,
    color: 'text-blue-600 bg-blue-50 border-blue-100'
  },
  {
    title: 'بەڕێوەبردنی موکیلەکان',
    description: 'زانیارییە کەسییەکان و پەیوەندییەکانی موکیلەکانت بە ڕێکوپێکی بپارێزە.',
    icon: UsersIcon,
    color: 'text-purple-600 bg-purple-50 border-purple-100'
  },
  {
    title: 'سیستەمی دارایی',
    description: 'کۆنترۆڵی خەرجی و داهاتەکانت بکە و پسوولەکان بە ئاسانی دروست بکە.',
    icon: DollarSignIcon,
    color: 'text-green-600 bg-green-50 border-green-100'
  },
  {
    title: 'ئاگادارکەرەوەی دانیشتنەکان',
    description: 'هیچ دانیشتنێکی دادگا لەدەست مەدە لەگەڵ سیستەمی ئاگادارکەرەوەی زیرەک.',
    icon: ClockIcon,
    color: 'text-amber-600 bg-amber-50 border-amber-100'
  },
  {
    title: 'ئەرشیفکردنی بەڵگەنامەکان',
    description: 'هەموو بەڵگەنامە و وێنەکانی کەیسەکانت بە شێوەیەکی دیجیتاڵی ئەرشیف بکە.',
    icon: FileTextIcon,
    color: 'text-red-600 bg-red-50 border-red-100'
  },
  {
    title: 'ڕاپۆرتی گشتگیر',
    description: 'ڕاپۆرتی ورد و خێرا دەربارەی کارەکانت و دۆخی دارایی نووسینگەکەت وەربگرە.',
    icon: GavelIcon,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
  }
];

const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-text-main mb-6 tracking-tight uppercase">🚀 تایبەتمەندییەکان</h2>
          <p className="text-text-muted font-medium max-w-2xl mx-auto">هەموو ئەو ئامرازانەی کە پێویستتە بۆ بەڕێوەبردنی نووسینگەیەکی یاسایی مۆدێرن لە یەک شوێندا.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-10 bg-white rounded border border-surface-border shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all duration-300">
              <div className={cn("w-14 h-14 rounded flex items-center justify-center border mb-8 group-hover:scale-110 transition-transform duration-300", feature.color)}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-black text-text-main mb-4 uppercase tracking-widest">{feature.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
