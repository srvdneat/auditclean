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
          {/* Circular Indicator */}
          <div
            className={`
              w-4 h-4 rounded-full border-2 transition-all duration-500 ease-out
              transform hover:scale-110
              ${
                index === currentSectionIndex
                  ? 'bg-black border-black scale-110 shadow-lg'
                  : index < currentSectionIndex
                  ? 'bg-black border-black shadow-md'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }
            `}
            aria-label={`Section ${index + 1}: ${section.title}`}
            aria-current={index === currentSectionIndex ? 'step' : undefined}
          >
            {/* Inner pulse for current section */}
            {index === currentSectionIndex && (
              <div className="absolute inset-0 rounded-full bg-black opacity-50 animate-ping"></div>
            )}
          </div>
          
          {/* Connecting Line */}
          {index < sections.length - 1 && (
            <div className="flex-1 h-0.5 mx-4 bg-gray-200 relative overflow-hidden rounded-full">
              <div
                className={`
                  h-full transition-all duration-700 ease-out rounded-full
                  ${index < currentSectionIndex ? 'bg-gradient-to-r from-black to-gray-700 w-full' : 'bg-gray-200 w-0'}
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