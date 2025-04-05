import React from 'react';

const ProgressBar = ({ step, totalSteps }) => {
  const percent = Math.round((step / totalSteps) * 100);
  return (
    <div className="questionnaire-progress-container">
      <div className="questionnaire-progress-bar-bg">
        <div
          className="questionnaire-progress-bar-fill"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="questionnaire-progress-label">{percent}% complete</p>
    </div>
  );
};

export default ProgressBar;