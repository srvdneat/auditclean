import React from 'react';
import { useSurvey } from '../context/SurveyContext';
import { SurveyQuestion } from '../types/survey';
import ShortTextInput from './inputs/ShortTextInput';
import EmailInput from './inputs/EmailInput';
import DropdownInput from './inputs/DropdownInput';
import MultiSelectInput from './inputs/MultiSelectInput';
import OpinionScaleInput from './inputs/OpinionScaleInput';
import { HelpCircle } from 'lucide-react';

interface QuestionDisplayProps {
  question: SurveyQuestion;
  response: any;
  sectionIndex: number;
  questionIndex: number;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  response,
  sectionIndex,
  questionIndex,
}) => {
  const { updateResponse } = useSurvey();

  const handleChange = (value: any) => {
    updateResponse(sectionIndex, questionIndex, value);
  };

  return (
    <div className="w-full max-w-3xl animate-fade-in">
      {/* Question Header - Centered */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3">
          <h3 className="text-xl sm:text-2xl font-light text-black leading-tight">
            {question.text}
            {question.required && (
              <span className="text-red-500 ml-2\" aria-label="Required field">*</span>
            )}
          </h3>
          {question.tooltip && (
            <div className="relative group">
              <HelpCircle 
                size={20} 
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-help" 
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap max-w-xs text-center z-50">
                {question.tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Input Component - Centered */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-2xl">
          {question.type === 'shortText' && (
            <ShortTextInput
              value={response || ''}
              onChange={handleChange}
              required={question.required}
            />
          )}
          
          {question.type === 'email' && (
            <EmailInput
              value={response || ''}
              onChange={handleChange}
              required={question.required}
            />
          )}
          
          {question.type === 'dropdown' && question.options && (
            <DropdownInput
              value={response || ''}
              options={question.options}
              onChange={handleChange}
              required={question.required}
            />
          )}
          
          {question.type === 'multiSelect' && question.options && (
            <MultiSelectInput
              value={response || []}
              options={question.options}
              onChange={handleChange}
              limit={question.limit}
              required={question.required}
            />
          )}
          
          {question.type === 'opinionScale' && (
            <OpinionScaleInput
              value={response || 0}
              min={question.scaleMin || 1}
              max={question.scaleMax || 10}
              minLabel={question.scaleMinLabel}
              maxLabel={question.scaleMaxLabel}
              onChange={handleChange}
              required={question.required}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;