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
              w-3 h-3 rounded-full border transition-all duration-300
              ${
                index === currentSectionIndex
                  ? 'bg-black border-black'
                  : index < currentSectionIndex
                  ? 'bg-black border-black'
                  : 'bg-white border-gray-300'
              }
            `}
            aria-label={`Section ${index + 1}: ${section.title}`}
            aria-current={index === currentSectionIndex ? 'step' : undefined}
          />
          
          {/* Connecting Line */}
          {index < sections.length - 1 && (
            <div className="flex-1 h-px mx-4 bg-gray-200 relative overflow-hidden">
              <div
                className={`
                  h-full transition-all duration-500 ease-out
                  ${index < currentSectionIndex ? 'bg-black w-full' : 'bg-gray-200 w-0'}
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