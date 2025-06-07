import React from 'react';
import { useSurvey } from '../context/SurveyContext';
import { SurveyQuestion } from '../types/survey';
import ShortTextInput from './inputs/ShortTextInput';
import EmailInput from './inputs/EmailInput';
import DropdownInput from './inputs/DropdownInput';
import MultiSelectInput from './inputs/MultiSelectInput';
import OpinionScaleInput from './inputs/OpinionScaleInput';

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
    <div className="w-full animate-fade-in">
      {/* Question Header */}
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-light text-black leading-tight">
          {question.text}
          {question.required && (
            <span className="text-red-500 ml-2" aria-label="Required field">*</span>
          )}
        </h3>
      </div>
      
      {/* Input Component */}
      <div className="w-full">
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
  );
};

export default QuestionDisplay;