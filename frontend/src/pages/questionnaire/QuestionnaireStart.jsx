import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionnaireStart = () => {
  const navigate = useNavigate();

  return (
    <div className="questionnaire-page">
      <h2 className="questionnaire-heading">Let’s get started 🌿</h2>
      <p className="mb-6 text-gray-600">We’ll ask you a few quick questions to personalize your plant recommendations.</p>
      <button
        onClick={() => navigate('/questionnaire/city')}
        className="questionnaire-next-btn"
      >
        Start Questionnaire
      </button>
    </div>
  );
};

export default QuestionnaireStart;