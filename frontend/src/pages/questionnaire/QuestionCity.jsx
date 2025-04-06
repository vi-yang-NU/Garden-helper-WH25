import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import '../../styling/QuestionPage.css';

const QuestionCity = () => {
  const navigate = useNavigate();
  const { responses, updateResponse } = useQuestionnaire();
  const [city, setCity] = useState(responses.city || '');

  const handleNext = () => {
    if (city) {
      updateResponse('city', city);
      navigate('/questionnaire/sunlight');
    }
  };

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-card">
        <h2 className="questionnaire-heading">Which city do you live in?</h2>
        <input
          type="text"
          className="questionnaire-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
        />
        <button
          onClick={handleNext}
          className="questionnaire-next-btn"
          disabled={!city.trim()}
        >
          Next
        </button>
      </div>
      <ProgressBar step={1} totalSteps={4} />
    </div>
  );
};

export default QuestionCity;