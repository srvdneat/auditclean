import React from 'react';
import { SurveyProvider } from './context/SurveyContext';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SurveyProvider>
        <SurveyForm />
      </SurveyProvider>
    </div>
  );
}

export default App;