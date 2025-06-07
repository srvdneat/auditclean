import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SurveyIntroProps {
  onStart: () => void;
}

const SurveyIntro: React.FC<SurveyIntroProps> = ({ onStart }) => {
  return (
    <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl w-full text-center animate-fade-in">
        {/* Logo and Brand Name - Stacked Vertically */}
        <div className="mb-8 flex flex-col items-center">
          <img 
            src="/CleanShot 2025-06-03 at 14.41.55@2x.png" 
            alt="NeatAudit Logo" 
            className="h-24 mb-4"
          />
          <h1 className="text-3xl font-black text-black" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
            NEATAUDIT
          </h1>
        </div>
        
        {/* Subtitle */}
        <h2 className="text-lg sm:text-xl text-black mb-6 font-medium">
          Assess your organization's AI readiness with our comprehensive audit framework
        </h2>
        
        {/* Description */}
        <p className="text-sm text-black mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
          Evaluate your business's readiness to adopt AI—across systems, culture, budget, tooling, and execution. This diagnostic audit contains 25 questions and will take 5-10 minutes.
        </p>
        
        {/* CTA Button */}
        <button
          onClick={onStart}
          className="inline-flex items-center px-6 py-3 bg-black hover:bg-gray-800 text-white text-sm font-medium transition-all duration-200 ease-out hover:shadow-lg transform hover:-translate-y-0.5 mb-8"
        >
          <span>Start Your Assessment</span>
          <ArrowRight className="ml-2" size={16} />
        </button>
        
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

export default SurveyIntro;