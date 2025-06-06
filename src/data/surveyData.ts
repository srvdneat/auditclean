import { SurveySection } from '../types/survey';

export const surveyData: SurveySection[] = [
  // Onboarding (Not scored)
  {
    id: 'onboarding',
    title: 'Onboarding Questions',
    description: 'Let\'s start with some basic information about you and your business.',
    questions: [
      { id: 'first_name', text: 'First Name', type: 'shortText', required: true, backendField: 'first_name' },
      { id: 'last_name', text: 'Last Name', type: 'shortText', required: true, backendField: 'last_name' },
      { id: 'email', text: 'Email', type: 'email', required: true, backendField: 'email' },
      { id: 'company_name', text: 'Company Name', type: 'shortText', required: true, backendField: 'company_name' },
      {
        id: 'industry',
        text: 'Industry',
        type: 'dropdown',
        required: true,
        backendField: 'industry',
        options: [
          { value: 'tech', label: 'Tech / Software' },
          { value: 'professional-services', label: 'Professional Services' },
          { value: 'retail', label: 'Retail / E-commerce' },
          { value: 'health', label: 'Health / Aged Care' },
          { value: 'finance', label: 'Finance / Insurance' },
          { value: 'construction', label: 'Construction / Trades' },
          { value: 'education', label: 'Education / Training' },
          { value: 'manufacturing', label: 'Manufacturing / Logistics' },
          { value: 'real-estate', label: 'Real Estate / Property' },
          { value: 'government', label: 'Government / NFP' },
          { value: 'hospitality', label: 'Hospitality / Tourism' },
          { value: 'admin', label: 'Admin / General' }
        ]
      },
      {
        id: 'company_size',
        text: 'Company Size',
        type: 'dropdown',
        required: true,
        backendField: 'company_size',
        options: [
          { value: 'sole-trader', label: 'Sole trader' },
          { value: '2-10', label: '2–10 employees' },
          { value: '11-25', label: '11–25 employees' },
          { value: '26-50', label: '26–50 employees' },
          { value: '51-100', label: '51–100 employees' },
          { value: '101-250', label: '101–250 employees' },
          { value: '250+', label: '250+ employees' }
        ]
      }
    ]
  },
  // Category 1: Urgency & Problem Clarity (17.5 pts)
  {
    id: 'urgency-problem-clarity',
    title: 'Category 1: Urgency & Problem Clarity',
    description: '',
    questions: [
      {
        id: 'ai_urgency',
        text: 'How urgent is it to solve operational challenges in your business?',
        type: 'opinionScale',
        required: true,
        weight: 1.0,
        scaleMin: 1,
        scaleMax: 10,
        scaleMinLabel: 'Not urgent',
        scaleMaxLabel: 'Critical for growth',
        backendField: 'ai_urgency'
      },
      {
        id: 'problem_clarity',
        text: 'How clearly can you define the problems that AI could help solve?',
        type: 'opinionScale',
        required: true,
        weight: 0.75,
        scaleMin: 1,
        scaleMax: 10,
        scaleMinLabel: 'Not clear',
        scaleMaxLabel: 'Extremely clear and specific',
        backendField: 'problem_clarity'
      }
    ]
  },
  // Category 2: Leadership, Culture & Champions (19 pts)
  {
    id: 'leadership-culture-champions',
    title: 'Category 2: Leadership, Culture & Champions',
    description: '',
    questions: [
      {
        id: 'leadership_buy_in',
        text: 'Do you have an internal leader actively championing technology or AI?',
        type: 'dropdown',
        required: true,
        backendField: 'leadership_buy_in',
        options: [
          { value: 'yes', label: 'Yes', points: 8 },
          { value: 'exploring', label: 'Exploring the possibility', points: 4 },
          { value: 'no', label: 'No', points: 0 }
        ]
      },
      {
        id: 'internal_champions',
        text: 'Are there individuals in your team eager to lead or support AI initiatives?',
        type: 'dropdown',
        required: true,
        backendField: 'internal_champions',
        options: [
          { value: 'several', label: 'Yes, several', points: 5 },
          { value: 'one-or-two', label: 'Yes, one or two', points: 3 },
          { value: 'none', label: 'Not at this time', points: 0 }
        ]
      },
      {
        id: 'appetite_experimentation',
        text: 'How open is your organisation to trying new tools or ways of working?',
        type: 'opinionScale',
        required: true,
        weight: 0.6,
        scaleMin: 1,
        scaleMax: 10,
        scaleMinLabel: 'Risk-averse',
        scaleMaxLabel: 'Eager to experiment',
        backendField: 'appetite_experimentation'
      }
    ]
  },
  // Category 3: Budget, Procurement & Risk (17 pts)
  {
    id: 'budget-procurement-risk',
    title: 'Category 3: Budget, Procurement & Risk',
    description: '',
    questions: [
      {
        id: 'budget_readiness',
        text: 'Have you set a dedicated budget for AI or tech implementation this year?',
        type: 'dropdown',
        required: true,
        backendField: 'budget_readiness',
        options: [
          { value: 'yes', label: 'Yes', points: 7 },
          { value: 'planning', label: 'Planning to', points: 3 },
          { value: 'no', label: 'No', points: 0 }
        ]
      },
      {
        id: 'procurement_speed',
        text: 'How quickly can your business approve funding once there\'s a clear ROI case?',
        type: 'opinionScale',
        required: true,
        weight: 0.5,
        scaleMin: 1,
        scaleMax: 10,
        scaleMinLabel: 'Very slow',
        scaleMaxLabel: 'Very fast',
        backendField: 'procurement_speed'
      },
      {
        id: 'risk_tolerance',
        text: 'How comfortable are you with piloting new tech, even with some risk?',
        type: 'opinionScale',
        required: true,
        weight: 0.5,
        scaleMin: 1,
        scaleMax: 10,
        scaleMinLabel: 'Avoids all risk',
        scaleMaxLabel: 'Embraces calculated bets',
        backendField: 'risk_tolerance'
      }
    ]
  },
  // Category 4: Systems, Tooling & Data (22 pts)
  {
    id: 'systems-tooling-data',
    title: 'Category 4: Systems, Tooling & Data',
    description: '',
    questions: [
      {
        id: 'data_collection',
        text: 'How well-organised and accessible is your business data?',
        type: 'opinionScale',
        required: true,
        weight: 0.75,
        scaleMin: 1,
        scaleMax: 10,
        backendField: 'data_collection'
      },
      {
        id: 'digital_maturity',
        text: 'To what extent does your business use digital tools day-to-day?',
        type: 'opinionScale',
        required: true,
        weight: 0.5,
        scaleMin: 1,
        scaleMax: 10,
        scaleMinLabel: 'Mostly manual',
        scaleMaxLabel: 'Fully digital',
        backendField: 'digital_maturity'
      },
      {
        id: 'integration_complexity',
        text: 'Is your tech stack prepared to integrate new tools or systems?',
        type: 'opinionScale',
        required: true,
        weight: 0.5,
        scaleMin: 1,
        scaleMax: 10,
        scaleMinLabel: 'Difficult',
        scaleMaxLabel: 'Seamless',
        backendField: 'integration_complexity'
      },
      {
        id: 'tooling_landscape',
        text: 'Do you currently use cloud-based tools (e.g., Xero, 365, Slack)?',
        type: 'dropdown',
        required: true,
        backendField: 'tooling_landscape',
        options: [
          { value: 'extensively', label: 'Extensively', points: 3 },
          { value: 'somewhat', label: 'Somewhat', points: 1 },
          { value: 'not_at_all', label: 'Not at all', points: 0 }
        ]
      }
    ]
  },
  // Category 5: Automation, Friction & Experience (15 pts)
  {
    id: 'automation-friction-experience',
    title: 'Category 5: Automation, Friction & Experience',
    description: '',
    questions: [
      {
        id: 'manual_load',
        text: 'How much manual or repetitive work exists in your day-to-day operations?',
        type: 'opinionScale',
        required: true,
        weight: 0.5,
        scaleMin: 1,
        scaleMax: 10,
        scaleMinLabel: 'Minimal',
        scaleMaxLabel: 'Very high',
        backendField: 'manual_load'
      },
      {
        id: 'existing_automation',
        text: 'Have you implemented any form of automation before?',
        type: 'dropdown',
        required: true,
        backendField: 'existing_automation',
        options: [
          { value: 'extensive', label: 'Yes, extensively', points: 6 },
          { value: 'basic', label: 'Yes, basic only', points: 3 },
          { value: 'no', label: 'No', points: 0 }
        ]
      },
      {
        id: 'past_pilot_experience',
        text: 'Have you previously piloted emerging tech (AI, IoT, AR, blockchain)?',
        type: 'dropdown',
        required: true,
        backendField: 'past_pilot_experience',
        options: [
          { value: 'strong', label: 'Yes, with strong results', points: 4 },
          { value: 'mixed', label: 'Yes, mixed results', points: 2 },
          { value: 'open', label: 'Open to it', points: 1 },
          { value: 'no', label: 'No', points: 0 }
        ]
      }
    ]
  },
  // Category 6: Strategy, ROI & Execution (9.5 pts)
  {
    id: 'strategy-roi-execution',
    title: 'Category 6: Strategy, ROI & Execution',
    description: '',
    questions: [
      {
        id: 'outcome_focus',
        text: 'How focused are your tech initiatives on measurable business outcomes?',
        type: 'opinionScale',
        required: true,
        weight: 0.75,
        scaleMin: 1,
        scaleMax: 10,
        scaleMinLabel: 'Activity-focused',
        scaleMaxLabel: 'ROI-focused',
        backendField: 'outcome_focus'
      },
      {
        id: 'use_case_clarity',
        text: 'How clearly defined are your potential AI use cases?',
        type: 'dropdown',
        required: true,
        backendField: 'use_case_clarity',
        options: [
          { value: 'very_clear', label: 'Very clear', points: 6 },
          { value: 'general_idea', label: 'General idea', points: 3 },
          { value: 'exploring', label: 'Still exploring', points: 0 }
        ]
      },
      {
        id: 'execution_timeline',
        text: 'How quickly would you want to see results from an AI deployment?',
        type: 'dropdown',
        required: true,
        backendField: 'execution_timeline',
        options: [
          { value: 'immediate', label: 'Immediately / ASAP', points: 6 },
          { value: '6_months', label: 'Within 6 months', points: 5 },
          { value: '6_12_months', label: '6–12 months', points: 3 },
          { value: '12_24_months', label: '12–24 months', points: 1 },
          { value: 'longer', label: 'Longer', points: 0 }
        ]
      }
    ]
  }
];