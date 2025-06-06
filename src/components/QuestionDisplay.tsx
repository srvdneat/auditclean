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
    <div className="py-6 animate-fade-in">
      <h3 className="text-2xl sm:text-3xl font-light text-black mb-2 flex items-start">
        {question.text}
        {question.required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </h3>
      
      <div className="mt-8">
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