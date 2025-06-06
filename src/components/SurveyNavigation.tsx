import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SurveyNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canContinue: boolean;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

const SurveyNavigation: React.FC<SurveyNavigationProps> = ({
  onPrevious,
  onNext,
  canContinue,
  isFirstQuestion,
  isLastQuestion,
}) => {
  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
          isFirstQuestion 
            ? 'text-gray-300 cursor-not-allowed' 
            : 'text-gray-600 hover:text-blue-500'
        }`}
      >
        <ArrowLeft size={16} />
        <span>Previous</span>
      </button>
      
      <button
        onClick={onNext}
        disabled={!canContinue}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all transform ${
          canContinue
            ? 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <span>{isLastQuestion ? 'Complete' : 'Continue'}</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default SurveyNavigation;