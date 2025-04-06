import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import '../../styling/QuestionPage.css';

const plantOptions = ['Herbs', 'Vegetables', 'Flowers'];

const QuestionPlantType = () => {
  const navigate = useNavigate();
  const { responses, updateResponse, submitResponses } = useQuestionnaire();
  const [selected, setSelected] = useState(responses.plantType || '');

  const handleSelect = (option) => {
    setSelected(option);
    updateResponse('plantType', option);
  };

  const handleFinish = async () => {
    if (selected) {
      await submitResponses();
      navigate('/dashboard');
    }
  };

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-card">
        <h2 className="questionnaire-heading">What type of plant do you want to grow?</h2>
        <div className="questionnaire-option-group">
          {plantOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`questionnaire-option-btn ${selected === option ? 'selected' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleFinish}
          className="questionnaire-next-btn"
          disabled={!selected}
        >
          Finish
        </button>
      </div>
      <ProgressBar step={4} totalSteps={4} />
    </div>
  );
};

export default QuestionPlantType;