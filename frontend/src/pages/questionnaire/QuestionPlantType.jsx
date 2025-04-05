import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';

const QuestionPlantType = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/dashboard');
  };

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-card">
        <h2 className="questionnaire-heading">What type of plant do you want to grow?</h2>
        <div className="questionnaire-option-group">
          <button className="questionnaire-option-btn">Herbs</button>
          <button className="questionnaire-option-btn">Vegetables</button>
          <button className="questionnaire-option-btn">Flowers</button>
        </div>
        <button onClick={handleFinish} className="questionnaire-next-btn">
          Finish
        </button>
      </div>
      <ProgressBar step={4} totalSteps={4} />
    </div>
  );
};

export default QuestionPlantType;