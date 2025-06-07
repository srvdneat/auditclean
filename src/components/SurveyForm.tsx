import React, { useEffect, useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import QuestionDisplay from './QuestionDisplay';
import ProgressBar from './ProgressBar';
import SectionIndicator from './SectionIndicator';
import SurveyIntro from './SurveyIntro';
import SurveyCompletion from './SurveyCompletion';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { calculateSurveyScore } from '../utils/scoring';
import { supabase } from '../lib/supabase';

const SurveyForm: React.FC = () => {
  const { 
    currentSectionIndex, 
    currentQuestionIndex,
    sections,
    responses,
    goToNextQuestion,
    goToPreviousQuestion,
    isLastQuestion,
    isFirstQuestion,
    totalQuestions,
    answeredQuestions
  } = useSurvey();

  const [showIntro, setShowIntro] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [transition, setTransition] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntro || showCompletion) return;
      
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, showCompletion, currentSectionIndex, currentQuestionIndex, responses]);

  const validateCurrentQuestion = () => {
    const currentSection = sections[currentSectionIndex];
    const currentQuestion = currentSection.questions[currentQuestionIndex];
    const questionKey = `${currentSection.id}-${currentQuestion.id}`;
    const response = responses[questionKey];

    if (currentQuestion.required) {
      if (response === undefined || response === '' || 
         (Array.isArray(response) && response.length === 0)) {
        setValidationError('This field is required');
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const validateAllRequiredQuestions = () => {
    const missing: string[] = [];
    sections.forEach(section => {
      section.questions.forEach(question => {
        if (question.required) {
          const key = `${section.id}-${question.id}`;
          const value = responses[key];
          if (
            value === undefined ||
            value === '' ||
            (Array.isArray(value) && value.length === 0)
          ) {
            missing.push(`${section.title}: ${question.text}`);
          }
        }
      });
    });
    return missing;
  };

  const handleNext = async () => {
    if (!validateCurrentQuestion()) return;

    if (isLastQuestion()) {
      if (submitting) return;
      setSubmitting(true);
      setSubmitError(null);

      const missing = validateAllRequiredQuestions();
      if (missing.length > 0) {
        setSubmitError(
          'Please answer all required questions before submitting.\nMissing: ' + missing.join(', ')
        );
        setSubmitting(false);
        return;
      }

      try {
        const scored = calculateSurveyScore(responses);
        const { error } = await supabase
          .from('survey_responses')
          .insert({
            first_name: responses['onboarding-first_name'],
            last_name: responses['onboarding-last_name'],
            email: responses['onboarding-email'],
            company_name: responses['onboarding-company_name'],
            industry: responses['onboarding-industry'],
            company_size: responses['onboarding-company_size'],
            responses: responses,
            scores: scored.sectionScores,
            total_score: scored.totalScore
          });

        if (error) throw error;
        setShowCompletion(true);
      } catch (error) {
        console.error('Error submitting survey:', error);
        setSubmitError('There was an error submitting your responses. Please try again.');
      } finally {
        setSubmitting(false);
      }
      return;
    }
    
    setTransition(true);
    setTimeout(() => {
      goToNextQuestion();
      setTransition(false);
      setValidationError(null);
    }, 200);
  };

  const handlePrevious = () => {
    if (isFirstQuestion()) return;
    
    setTransition(true);
    setTimeout(() => {
      goToPreviousQuestion();
      setTransition(false);
      setValidationError(null);
    }, 200);
  };

  const startSurvey = () => {
    setShowIntro(false);
  };

  const restartSurvey = () => {
    window.location.reload();
  };

  if (showIntro) {
    return <SurveyIntro onStart={startSurvey} />;
  }

  if (showCompletion) {
    return <SurveyCompletion onRestart={restartSurvey} responses={responses} />;
  }

  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  const questionKey = `${currentSection.id}-${currentQuestion.id}`;
  const response = responses[questionKey];

  const canContinue = !currentQuestion.required || 
    (response !== undefined && 
     response !== '' && 
     (Array.isArray(response) ? response.length > 0 : true));

  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="flex flex-col bg-white" style={{ minHeight: '100vh', minHeight: '100dvh' }}>
      {/* Header Section - Fixed Height */}
      <header className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Brand Name */}
          <div className="flex items-center justify-between mb-6">
            <img 
              src="/CleanShot 2025-06-03 at 14.41.55@2x.png" 
              alt="NeatAudit Logo" 
              className="h-24 transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-black text-black transition-colors duration-300 hover:text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
              NEATAUDIT
            </h1>
          </div>
          
          <div className="mb-6">
            <ProgressBar percentage={progressPercentage} />
          </div>
          <SectionIndicator 
            sections={sections} 
            currentSectionIndex={currentSectionIndex} 
          />
        </div>
      </header>
      
      {/* Main Content - Flexible Height with Even Vertical Distribution */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-center min-h-0">
          {/* Section Header */}
          <div className="mb-8 text-center">
            <h2 className="text-lg sm:text-xl font-medium text-black mb-2 transition-colors duration-300">
              {currentSection.title}
            </h2>
            {currentSection.description && (
              <p className="text-sm text-gray-600 font-light">
                {currentSection.description}
              </p>
            )}
          </div>
          
          {/* Question Content - Centered */}
          <div className={`flex flex-col items-center justify-center transition-all duration-300 ease-out ${
            transition ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}>
            <QuestionDisplay 
              question={currentQuestion}
              response={response}
              sectionIndex={currentSectionIndex}
              questionIndex={currentQuestionIndex}
            />
            
            {/* Error Messages */}
            {validationError && (
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg max-w-2xl w-full animate-slide-down\" role="alert">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3"></div>
                  <p className="text-sm text-red-700 font-medium">{validationError}</p>
                </div>
              </div>
            )}
            {submitError && (
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg max-w-2xl w-full animate-slide-down" role="alert">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3"></div>
                  <p className="text-sm text-red-700 font-medium whitespace-pre-line">{submitError}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer Navigation - Fixed Height */}
      <footer className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-8 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion()}
              className={`flex items-center space-x-2 px-4 py-3 transition-all duration-300 ease-out rounded-lg
                min-h-[48px] touch-manipulation transform hover:scale-105 active:scale-95 ${
                isFirstQuestion() 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-black hover:text-gray-600 hover:bg-gray-50'
              }`}
              aria-label="Go to previous question"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">Previous</span>
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canContinue || submitting}
              className={`flex items-center space-x-2 px-6 py-3 transition-all duration-300 ease-out rounded-lg
                min-h-[48px] touch-manipulation transform hover:scale-105 active:scale-95 ${
                canContinue && !submitting
                  ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              aria-label={isLastQuestion() ? 'Submit survey' : 'Go to next question'}
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              <span className="text-sm font-medium">
                {isLastQuestion() ? (submitting ? 'Submitting...' : 'Complete') : 'Continue'}
              </span>
              {!submitting && <ArrowRight size={16} />}
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="text-center">
            <p className="text-xs text-gray-600 transition-colors duration-300">
              Question {answeredQuestions} of {totalQuestions}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SurveyForm;