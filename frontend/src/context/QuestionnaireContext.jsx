import React, { createContext, useContext, useState } from 'react';

const QuestionnaireContext = createContext();

export const QuestionnaireProvider = ({ children }) => {
  const [responses, setResponses] = useState({});

  const updateResponse = (questionKey, answer) => {
    setResponses(prev => ({ ...prev, [questionKey]: answer }));
  };

  const resetResponses = () => setResponses({});

  const submitResponses = async () => {
    try {
      console.log('Submitting questionnaire responses:', responses);
      // Placeholder API call
      await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses)
      });
    } catch (error) {
      console.error('Failed to submit responses:', error);
    }
  };

  return (
    <QuestionnaireContext.Provider value={{ responses, updateResponse, resetResponses, submitResponses }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => useContext(QuestionnaireContext);