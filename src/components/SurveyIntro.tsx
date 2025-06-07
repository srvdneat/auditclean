import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SurveyIntroProps {
  onStart: () => void;
}

const SurveyIntro: React.FC<SurveyIntroProps> = ({ onStart }) => {
  return (
    <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl w-full text-center animate-fade-in">
        <div className="mb-12">
          <img 
            src="/CleanShot 2025-06-03 at 14.41.55@2x.png" 
            alt="NeatAudit Logo" 
            className="h-16 mx-auto mb-12"
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-12 leading-tight">
          NeatAudit
        </h1>
        
        <div className="w-full h-px bg-gray-200 mb-12"></div>
        
        <p className="text-sm sm:text-base text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Evaluate your business's readiness to adopt AI—across systems, culture, budget, tooling, and execution. This diagnostic contains 5 onboarding questions and 20 scored questions.
        </p>
        
        <button
          onClick={onStart}
          className="inline-flex items-center px-6 py-3 bg-black hover:bg-gray-800 text-white text-sm font-medium transition-all duration-200 ease-out hover:shadow-lg transform hover:-translate-y-0.5 my-4"
        >
          <span>Start Your Assessment</span>
          <ArrowRight className="ml-2" size={16} />
        </button>
        
        <div className="w-full h-px bg-gray-200 mt-12 mb-8"></div>
        
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