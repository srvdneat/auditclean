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
    <div className="flex items-center justify-between w-full">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`flex items-center ${
            index < sections.length - 1 ? 'flex-1' : ''
          }`}
        >
          {/* Section Number */}
          <div
            className={`
              w-8 h-8 sm:w-10 sm:h-10 
              flex items-center justify-center 
              text-sm sm:text-base font-medium
              rounded-full border-2 transition-all duration-300
              ${
                index === currentSectionIndex
                  ? 'bg-black text-white border-black shadow-lg scale-110'
                  : index < currentSectionIndex
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-400 border-gray-300'
              }
            `}
            aria-label={`Section ${index + 1}: ${section.title}`}
            aria-current={index === currentSectionIndex ? 'step' : undefined}
          >
            {index + 1}
          </div>
          
          {/* Connection Line */}
          {index < sections.length - 1 && (
            <div className="flex-1 h-0.5 mx-2 sm:mx-3 bg-gray-200 relative overflow-hidden">
              <div
                className={`
                  h-full transition-all duration-500 ease-out
                  ${index < currentSectionIndex ? 'bg-gray-800 w-full' : 'bg-gray-200 w-0'}
                `}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionIndicator;