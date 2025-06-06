import { SurveySection, SurveyResponse, ScoredResponse } from '../types/survey';
import { surveyData } from '../data/surveyData';

const calculateQuestionScore = (question: any, response: any): number => {
  if (response === undefined || response === null || response === '') return 0;

  switch (question.type) {
    case 'opinionScale':
      // Use response * weight (weight is the max points per question)
      return typeof question.weight === 'number' ? Number(response) * question.weight : 0;
    case 'dropdown': {
      const option = (question.options || []).find((opt: any) => opt.value === response);
      return option && typeof option.points === 'number' ? option.points : 0;
    }
    default:
      return 0;
  }
};

export const calculateSurveyScore = (responses: SurveyResponse): ScoredResponse => {
  const sectionScores: { [key: string]: number } = {};
  let totalScore = 0;

  surveyData.forEach(section => {
    if (section.id === 'onboarding') return;

    let sectionScore = 0;

    section.questions.forEach((question) => {
      const response = responses[`${section.id}-${question.id}`];
      sectionScore += calculateQuestionScore(question, response);
    });

    sectionScores[section.id] = sectionScore;
    totalScore += sectionScore;
  });

  return {
    ...responses,
    totalScore,
    sectionScores
  };
};