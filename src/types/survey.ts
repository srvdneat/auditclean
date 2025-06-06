export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'shortText' | 'email' | 'dropdown' | 'multiSelect' | 'opinionScale';
  options?: { value: string; label: string; points?: number }[];
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  limit?: number;
  required?: boolean;
  backendField?: string;
  weight?: number;
}

export interface SurveySection {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
}

export interface SurveyResponse {
  [key: string]: any;
}

export interface ScoredResponse extends SurveyResponse {
  totalScore: number;
  sectionScores: {
    [key: string]: number;
  };
}