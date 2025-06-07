import React from 'react';
import { Check } from 'lucide-react';

interface SurveyCompletionProps {
  onRestart: () => void;
  responses: any;
}

const SurveyCompletion: React.FC<SurveyCompletionProps> = ({ onRestart, responses }) => {
  const firstName = responses['onboarding-first_name'] || '';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl w-full text-center animate-fade-in">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-black mb-8 rounded-full">
          <Check size={32} />
        </div>
        
        {/* Thank You Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6 leading-tight">
          {firstName ? `Thank you, ${firstName}!` : 'Thank you!'}
        </h1>
        
        {/* Description */}
        <p className="text-lg text-black mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          Your AI readiness diagnostic has been submitted successfully. We'll analyze your responses and send you a detailed assessment via email.
        </p>
        
        {/* Additional Info */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 font-medium">
            Please check your email for your results and next steps.
          </p>
        </div>

        {/* Website Link */}
        <div className="text-center mb-4">
          <a 
            href="https://www.srvdneat.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-black hover:text-gray-600 transition-colors"
          >
            www.srvdneat.com
          </a>
        </div>
        
        {/* Bottom Spacer Line */}
        <div className="w-full h-px bg-gray-200"></div>
      </div>
    </div>
  );
};

export default SurveyCompletion;