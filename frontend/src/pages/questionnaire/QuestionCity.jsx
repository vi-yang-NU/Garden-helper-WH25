import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';

const QuestionCity = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/questionnaire/sunlight');
  };

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-card">
        <h2 className="questionnaire-heading">Which city do you live in?</h2>
        <input
          type="text"
          id="city-input"
          placeholder="Enter your city"
          className="questionnaire-input"
        />
        <button onClick={handleNext} className="questionnaire-next-btn">
          Next
        </button>
      </div>
      <ProgressBar step={1} totalSteps={4} />
    </div>
  );
};

export default QuestionCity;
