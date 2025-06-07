import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SurveyIntroProps {
  onStart: () => void;
}

const SurveyIntro: React.FC<SurveyIntroProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white" style={{ minHeight: '100vh', minHeight: '100dvh' }}>
      <div className="max-w-4xl w-full text-center animate-fade-in py-8">
        <div className="mb-20">
          <img 
            src="/CleanShot 2025-06-03 at 14.41.55@2x.png" 
            alt="NeatAudit Logo" 
            className="h-16 mx-auto mb-20"
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
          NeatAudit
        </h1>
        
        <h2 className="text-lg sm:text-xl text-black mb-20 max-w-3xl mx-auto font-normal leading-relaxed">
          Assess your organization's AI readiness with our comprehensive audit framework
        </h2>
        
        <div className="w-full h-px bg-gray-200 mb-20"></div>
        
        <p className="text-sm sm:text-base text-gray-600 mb-20 max-w-2xl mx-auto font-light leading-relaxed">
          Evaluate your business's readiness to adopt AI—across systems, culture, budget, tooling, and execution. This diagnostic contains 5 onboarding questions and 20 scored questions.
        </p>
        
        <button
          onClick={onStart}
          className="inline-flex items-center px-6 py-3 bg-black hover:bg-gray-800 text-white text-sm font-medium transition-all duration-200 ease-out hover:shadow-lg transform hover:-translate-y-0.5 my-4"
        >
          <span>Start Your Assessment</span>
          <ArrowRight className="ml-2" size={16} />
        </button>
        
        <div className="w-full h-px bg-gray-200 mt-20 mb-8"></div>
        
        <div className="text-center">
          <a 
            href="https://www.srvdneat.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            www.srvdneat.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default SurveyIntro;