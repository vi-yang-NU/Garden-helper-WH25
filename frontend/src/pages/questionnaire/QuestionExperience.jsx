import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import '../../styling/QuestionPage.css';

const QuestionExperience = () => {
  const navigate = useNavigate();
  const { responses, updateResponse } = useQuestionnaire();
  const [selected, setSelected] = useState(responses.experience || '');

  const handleSelect = (value) => {
    setSelected(value);
    updateResponse('experience', value);
  };

  const handleNext = () => {
    if (selected) navigate('/questionnaire/plant-type');
  };

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-card">
        <h2 className="questionnaire-heading">Have you grown plants before?</h2>
        <div className="questionnaire-option-group">
          {['Yes', 'No'].map((option) => (
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
          onClick={handleNext}
          className="questionnaire-next-btn"
          disabled={!selected}
        >
          Next
        </button>
      </div>
      <ProgressBar step={3} totalSteps={4} />
    </div>
  );
};

export default QuestionExperience;