import React, { createContext, useContext, useState, useEffect } from 'react';
import { surveyData } from '../data/surveyData';
import { SurveySection, SurveyQuestion, SurveyResponse } from '../types/survey';

interface SurveyContextType {
  currentSectionIndex: number;
  currentQuestionIndex: number;
  responses: SurveyResponse;
  sections: SurveySection[];
  totalQuestions: number;
  answeredQuestions: number;
  setCurrentSectionIndex: (index: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  updateResponse: (sectionIndex: number, questionIndex: number, value: any) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  getCurrentQuestion: () => SurveyQuestion | null;
  getSectionProgress: (sectionIndex: number) => number;
  isCurrentSectionComplete: () => boolean;
  isLastQuestion: () => boolean;
  isFirstQuestion: () => boolean;
}

const SurveyContext = createContext<SurveyContextType | null>(null);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sections] = useState<SurveySection[]>(surveyData);
  const [responses, setResponses] = useState<SurveyResponse>({});
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  // Calculate total questions across all sections
  useEffect(() => {
    let total = 0;
    sections.forEach((section) => {
      total += section.questions.length;
    });
    setTotalQuestions(total);
  }, [sections]);

  // Calculate answered questions
  useEffect(() => {
    let answered = 0;
    sections.forEach((section) => {
      section.questions.forEach((question) => {
        const questionKey = `${section.id}-${question.id}`;
        if (responses[questionKey] !== undefined && 
            responses[questionKey] !== '' && 
            (Array.isArray(responses[questionKey]) ? responses[questionKey].length > 0 : true)) {
          answered++;
        }
      });
    });
    setAnsweredQuestions(answered);
  }, [responses, sections]);

  const updateResponse = (sectionIndex: number, questionIndex: number, value: any) => {
    const section = sections[sectionIndex];
    const question = section.questions[questionIndex];
    const questionKey = `${section.id}-${question.id}`;
    
    setResponses((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const getCurrentQuestion = (): SurveyQuestion | null => {
    if (
      currentSectionIndex < sections.length &&
      currentQuestionIndex < sections[currentSectionIndex].questions.length
    ) {
      return sections[currentSectionIndex].questions[currentQuestionIndex];
    }
    return null;
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < sections[currentSectionIndex].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const getSectionProgress = (sectionIndex: number): number => {
    let answered = 0;
    const section = sections[sectionIndex];
    
    section.questions.forEach((question) => {
      const questionKey = `${section.id}-${question.id}`;
      if (responses[questionKey] !== undefined && 
          responses[questionKey] !== '' && 
          (Array.isArray(responses[questionKey]) ? responses[questionKey].length > 0 : true)) {
        answered++;
      }
    });
    
    return (answered / section.questions.length) * 100;
  };

  const isCurrentSectionComplete = (): boolean => {
    return getSectionProgress(currentSectionIndex) === 100;
  };

  const isLastQuestion = (): boolean => {
    return (
      currentSectionIndex === sections.length - 1 &&
      currentQuestionIndex === sections[currentSectionIndex].questions.length - 1
    );
  };

  const isFirstQuestion = (): boolean => {
    return currentSectionIndex === 0 && currentQuestionIndex === 0;
  };

  return (
    <SurveyContext.Provider
      value={{
        currentSectionIndex,
        currentQuestionIndex,
        responses,
        sections,
        totalQuestions,
        answeredQuestions,
        setCurrentSectionIndex,
        setCurrentQuestionIndex,
        updateResponse,
        goToNextQuestion,
        goToPreviousQuestion,
        getCurrentQuestion,
        getSectionProgress,
        isCurrentSectionComplete,
        isLastQuestion,
        isFirstQuestion,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};