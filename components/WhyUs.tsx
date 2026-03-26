import React from 'react';
import { cn } from '../lib/utils';

const reasons = [
    {
        emoji: '🎯',
        title: 'ئەوپەڕی وردبینی',
        description: 'کەمترین هەڵە و زۆرترین وردبینی لە کارەکانتدا',
        color: 'bg-blue-50 border-blue-100 text-brand-accent'
    },
    {
        emoji: '📱',
        title: 'بەردەوامی',
        description: 'لە هەموو شوێنێک و بە هەموو ئامێرێک دەستت پێدەگات',
        color: 'bg-amber-50 border-amber-100 text-amber-600'
    },
    {
        emoji: '⚡️',
        title: 'خێرایی بێوێنە',
        description: 'ئیشەکانت بە کەمترین کات ئەنجام بدە',
        color: 'bg-green-50 border-green-100 text-green-600'
    },
    {
        emoji: '🎨',
        title: 'مۆدێرن و ئاسان',
        description: 'دیزاینێکی ناوازە کە هەمووان دەتوانن بەکاری بێنن',
        color: 'bg-purple-50 border-purple-100 text-purple-600'
    },
    {
        emoji: '🛡️',
        title: 'ئەمنیەتی بەرز',
        description: 'داتاکانت لای ئێمە لە هەموو کاتێک پارێزراوترن',
        color: 'bg-red-50 border-red-100 text-red-600'
    },
];

const WhyUs: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
             {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-20"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black text-text-main mb-6 tracking-tight uppercase">💎 جیاوازی ئێمە چییە؟</h2>
                    <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {reasons.map((reason, index) => (
                         <div key={index} className="group relative p-8 rounded-2xl border border-surface-border bg-white shadow-sm hover:shadow-md hover:border-brand-accent/30 transition-all duration-500 hover:-translate-y-1">
                            <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center border mb-8 text-3xl group-hover:scale-110 transition-transform duration-500", reason.color)}>
                                {reason.emoji}
                            </div>
                            <h3 className="text-sm font-black text-text-main mb-4 uppercase tracking-widest leading-tight">{reason.title}</h3>
                            <p className="text-text-muted text-xs leading-relaxed font-medium">{reason.description}</p>
                            
                            <div className="absolute bottom-4 right-8 text-gray-100 font-black text-5xl group-hover:text-brand-accent/5 transition-colors font-mono">0{index+1}</div>
                         </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
