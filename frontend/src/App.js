import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// import QuestionnairePage from './pages/questionnaire';
import DashboardPage from './pages/DashboardPage';
import QuestionnaireStart from './pages/questionnaire/QuestionnaireStart';
import QuestionCity from './pages/questionnaire/QuestionCity';
import QuestionSunlight from './pages/questionnaire/QuestionSunlight';
import QuestionExperience from './pages/questionnaire/QuestionExperience';
import QuestionPlantType from './pages/questionnaire/QuestionPlantType';
import PlantDetailPage from './pages/PlantDetailPage';
import './styling/questionnaire.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/questionnaire/start" element={<QuestionnaireStart />} />
      <Route path="/questionnaire/city" element={<QuestionCity />} />
      <Route path="/questionnaire/sunlight" element={<QuestionSunlight />} />
      <Route path="/questionnaire/experience" element={<QuestionExperience />} />
      <Route path="/questionnaire/plant-type" element={<QuestionPlantType />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/plant/:plantId" element={<PlantDetailPage />} />
    </Routes>
  );
}

export default App;

