import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionnairePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Questionnaire</h2>
      <input type="text" placeholder="City" required /><br/>
      <input type="text" placeholder="Sunlight access" required /><br/>
      <input type="text" placeholder="Plant type" required /><br/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionnairePage;