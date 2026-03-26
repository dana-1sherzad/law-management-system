import React from 'react';
import { cn } from '../lib/utils';

const problems = [
  'کەیسەکانت لەناو دەفتەر و کاغەزدا ون دەبن؟',
  'کاتی دانیشتنەکانی دادگات لەبیر دەچێت؟',
  'نازانیت چەند خەرجی و داهاتت هەیە؟',
  'موکیلەکانت بەردەوام پەیوەندیت پێوە دەکەن بۆ زانیاری؟'
];

const Problems: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 border-y border-surface-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-text-main leading-tight mb-8 uppercase tracking-tight">
                ئایا تۆش ئەم <br />
                <span className="text-red-600">کێشانەت</span> هەیە؟
              </h2>
              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white rounded border border-surface-border shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs">!</div>
                    <p className="text-text-main text-sm font-bold">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 rounded border border-surface-border shadow-2xl">
              <div className="text-center">
                <div className="text-5xl mb-6">💡</div>
                <h3 className="text-xl font-black text-text-main mb-4 uppercase tracking-widest">چارەسەر لای ئێمەیە</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-8 font-medium">
                  سیستەمەکەمان بە تایبەت بۆ پارێزەرانی کوردستان دروستکراوە تا هەموو کارەکانیان بە دیجیتاڵی و بە ئاسانی بەڕێوەببەن.
                </p>
                <div className="h-1 w-20 bg-brand-primary mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
