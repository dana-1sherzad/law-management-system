
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problems from './components/Problems';
import FeaturesGrid from './components/FeaturesGrid';
import ForWhom from './components/ForWhom';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

type Language = 'ku' | 'ar' | 'en';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ku');
  const [showDashboard, setShowDashboard] = useState(false);

  const enterDashboard = () => {
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <Dashboard setShowDashboard={setShowDashboard} />;
  }


  return (
    <div className="bg-slate-900 text-gray-200">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero onStartClick={enterDashboard} />
        <Problems />
        <ForWhom />
        <FeaturesGrid />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
