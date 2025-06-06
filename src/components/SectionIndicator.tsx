import React from 'react';
import { SurveySection } from '../types/survey';

interface SectionIndicatorProps {
  sections: SurveySection[];
  currentSectionIndex: number;
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  sections,
  currentSectionIndex,
}) => {
  return (
    <div className="flex justify-between mt-4">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`flex items-center ${
            index < sections.length - 1 ? 'flex-1' : ''
          }`}
        >
          <div
            className={`w-6 h-6 flex items-center justify-center text-xs ${
              index === currentSectionIndex
                ? 'bg-black text-white'
                : index < currentSectionIndex
                ? 'bg-gray-200 text-black'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {index + 1}
          </div>
          
          {index < sections.length - 1 && (
            <div className="flex-1 h-px mx-2 bg-gray-200">
              <div
                className={`h-full bg-gray-200 transition-all duration-300 ${
                  index < currentSectionIndex ? 'w-full' : 'w-0'
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionIndicator