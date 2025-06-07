import React from 'react';
import { SurveyProvider } from './context/SurveyContext';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <SurveyProvider>
        <SurveyForm />
      </SurveyProvider>
    </div>
  );
}

export default App;