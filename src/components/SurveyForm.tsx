import React, { useEffect, useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import QuestionDisplay from './QuestionDisplay';
import ProgressBar from './ProgressBar';
import SectionIndicator from './SectionIndicator';
import SurveyIntro from './SurveyIntro';
import SurveyCompletion from './SurveyCompletion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
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
        handleNext();
      } else if (e.key === 'ArrowUp') {
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

  // Validate all required questions before submission
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

      // Validate all required questions before submission
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
    }, 300);
  };

  const handlePrevious = () => {
    if (isFirstQuestion()) return;
    
    setTransition(true);
    setTimeout(() => {
      goToPreviousQuestion();
      setTransition(false);
    }, 300);
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
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <img 
          src="/CleanShot 2025-06-03 at 14.41.55@2x.png" 
          alt="NeatAudit Logo" 
          className="h-12 mb-8"
        />
        <ProgressBar percentage={progressPercentage} />
        <SectionIndicator 
          sections={sections} 
          currentSectionIndex={currentSectionIndex} 
        />
      </div>
      
      <div className={`flex-grow flex flex-col ${transition ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="mb-4">
          <h2 className="text-xl font-light text-black">{currentSection.title}</h2>
          {currentSection.description && (
            <p className="text-gray-500 font-light mt-1">{currentSection.description}</p>
          )}
        </div>
        
        <div
          className={`flex-grow flex flex-col items-stretch justify-start transition-all duration-500 ${transition ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          style={{ minHeight: '340px' }}
        >
          <div className="flex-grow flex flex-col justify-center">
            <QuestionDisplay 
              question={currentQuestion}
              response={response}
              sectionIndex={currentSectionIndex}
              questionIndex={currentQuestionIndex}
            />
            {validationError && (
              <p className="mt-2 text-sm text-red-500">{validationError}</p>
            )}
            {submitError && (
              <p className="mt-2 text-sm text-red-500 whitespace-pre-line">{submitError}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={isFirstQuestion()}
          className={`flex items-center space-x-2 px-4 py-2 transition-colors ${
            isFirstQuestion() 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-black hover:text-accent'
          }`}
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canContinue || submitting}
          className={`flex items-center space-x-2 px-6 py-3 font-light transition-all ${
            canContinue && !submitting
              ? 'bg-black text-white hover:bg-accent'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>{isLastQuestion() ? (submitting ? 'Submitting...' : 'Complete') : 'Continue'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Question {answeredQuestions} of {totalQuestions}</p>
      </div>
    </div>
  );
};

export default SurveyForm;