import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SurveyIntroProps {
  onStart: () => void;
}

const SurveyIntro: React.FC<SurveyIntroProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white" style={{ minHeight: '100vh', minHeight: '100dvh' }}>
      <div className="max-w-4xl w-full text-center animate-fade-in py-8">
        <div className="mb-16">
          <a 
            href="https://www.srvdneat.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
          >
            www.srvdneat.com
          </a>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-black mb-8 leading-tight">
          AI Readiness Diagnostic for Australian SMEs
        </h1>
        
        <p className="text-lg sm:text-xl text-black mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Evaluate your business's readiness to adopt AI—across systems, culture, budget, tooling, and execution. This diagnostic contains 5 onboarding questions and 20 scored questions.
        </p>
        
        <div className="grid grid-cols-2 gap-8 sm:gap-12 max-w-md mx-auto mb-16">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-black mb-4 transition-colors hover:bg-gray-200">
              <span className="text-xl font-light">25</span>
            </div>
            <span className="text-sm text-black font-medium">Questions</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-black mb-4 transition-colors hover:bg-gray-200">
              <span className="text-xl font-light">10</span>
            </div>
            <span className="text-sm text-black font-medium">Minutes</span>
          </div>
        </div>
        
        <button
          onClick={onStart}
          className="inline-flex items-center px-8 py-4 bg-black hover:bg-gray-800 text-white font-light transition-colors text-lg"
        >
          <span>Start the diagnostic</span>
          <ArrowRight className="ml-3" size={20} />
        </button>
      </div>
    </div>
  );
};

export default SurveyIntro;