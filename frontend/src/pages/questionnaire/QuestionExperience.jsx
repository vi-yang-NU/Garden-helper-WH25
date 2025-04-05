import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';

const QuestionExperience = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/questionnaire/plant-type');
  };

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-card">
        <h2 className="questionnaire-heading">Have you grown plants before?</h2>
        <div className="questionnaire-option-group">
          <button className="questionnaire-option-btn">Yes</button>
          <button className="questionnaire-option-btn">No</button>
        </div>
        <button onClick={handleNext} className="questionnaire-next-btn">
          Next
        </button>
      </div>
      <ProgressBar step={3} totalSteps={4} />
    </div>
  );
};

export default QuestionExperience;