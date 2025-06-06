import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SurveyIntroProps {
  onStart: () => void;
}

const SurveyIntro: React.FC<SurveyIntroProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 sm:p-16 animate-fade-in border border-black">
        <div className="text-center">
          <img 
            src="/CleanShot 2025-06-03 at 14.41.55@2x.png" 
            alt="NeatAudit Logo" 
            className="h-16 mx-auto mb-12"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-black mb-8 leading-tight">
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
            className="inline-flex items-center px-8 py-4 bg-black hover:bg-accent text-white font-light transition-colors text-lg"
          >
            <span>Start the diagnostic</span>
            <ArrowRight className="ml-3" size={20} />
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-12 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            Your responses will help us assess your organization's AI readiness and provide tailored recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurveyIntro;