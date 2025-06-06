import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SurveyIntroProps {
  onStart: () => void;
}

const SurveyIntro: React.FC<SurveyIntroProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 sm:p-12 animate-fade-in border border-black">
        <div className="text-center mb-8">
          <img 
            src="/CleanShot 2025-06-03 at 14.41.55@2x.png" 
            alt="NeatAudit Logo" 
            className="h-16 mx-auto mb-8"
          />
          <h1 className="text-3xl sm:text-4xl font-light text-black mb-6">
            AI Readiness Diagnostic for Australian SMEs
          </h1>
          <p className="text-lg text-black mb-8 max-w-2xl mx-auto font-light">
            Evaluate your business's readiness to adopt AI—across systems, culture, budget, tooling, and execution. This diagnostic contains 5 onboarding questions and 20 scored questions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-black mb-2">
                <span className="text-lg font-light">5</span>
              </div>
              <span className="text-sm text-black">Onboarding Questions</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-black mb-2">
                <span className="text-lg font-light">20</span>
              </div>
              <span className="text-sm text-black">Scored Questions</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-black mb-2">
                <span className="text-lg font-light">10</span>
              </div>
              <span className="text-sm text-black">Minutes</span>
            </div>
          </div>
          
          <button
            onClick={onStart}
            className="inline-flex items-center px-6 py-3 bg-black hover:bg-accent text-white font-light transition-colors"
          >
            <span>Start the diagnostic</span>
            <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Your responses will help us assess your organization's AI readiness and provide tailored recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurveyIntro;