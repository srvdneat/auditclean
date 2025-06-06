import React from 'react';
import { Check } from 'lucide-react';

interface SurveyCompletionProps {
  onRestart: () => void;
  responses: any;
}

const SurveyCompletion: React.FC<SurveyCompletionProps> = ({ onRestart, responses }) => {
  const firstName = responses['onboarding-first-name'] || '';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 sm:p-12 animate-fade-in border border-black">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-black mb-6">
            <Check size={32} />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-light text-black mb-4">
            {firstName ? `Thank you, ${firstName}!` : 'Thank you!'}
          </h1>
          
          <p className="text-lg text-black mb-8 max-w-2xl mx-auto font-light">
            Your AI readiness diagnostic has been submitted successfully. We'll analyze your responses and send you a detailed assessment via email.
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Please check your email for your results and next steps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurveyCompletion;