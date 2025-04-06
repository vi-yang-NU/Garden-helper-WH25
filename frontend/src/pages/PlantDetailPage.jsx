// Code with placeholders

import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../styling/PlantDetail.css';
import placeholderImage from '../assets/plant_images/Abutilon_hybridum.png';

const PlantDetailPage = () => {
  const { plantId } = useParams();
  const location = useLocation();
  const plantData = {
    id: plantId,
    name: 'Abutilon hybridum',
    latinName: 'Abutilon hybridum',
    type: 'Flowering Shrub (Indoor/Outdoor)',
    soilType: 'Rich, well-drained soil with organic matter',
    upcomingTasks: [
      'Water thoroughly this Friday',
      'Trim dead leaves and flowers',
      'Apply balanced fertilizer this weekend'
    ],
    lastWatered: '2 days ago',
    wateringFrequency: 'Once every 3–4 days, more in hot weather',
    lastRepotted: '3 months ago',
    fertilizerAdvice: 'Feed every 2 weeks with a liquid fertilizer during growing season',
    geminiSoilTip: 'Mix compost with peat moss and perlite for ideal drainage and nutrition.'
  };
  
//   location.state?.plant;

  // Placeholder fallback if no state was passed
//   const plantData = plant || {
//     id: plantId,
//     name: 'Abutilon hybridum',
//     latinName: 'Abutilon hybridum',
//     type: 'Flowering Shrub (Indoor/Outdoor)',
//     soilType: 'Rich, well-drained soil with organic matter',
//     upcomingTasks: [
//       'Water thoroughly this Friday',
//       'Trim dead leaves and flowers',
//       'Apply balanced fertilizer this weekend'
//     ],
//     lastWatered: '2 days ago',
//     wateringFrequency: 'Once every 3–4 days, more in hot weather',
//     lastRepotted: '3 months ago',
//     fertilizerAdvice: 'Feed every 2 weeks with a liquid fertilizer during growing season',
//     geminiSoilTip: 'Mix compost with peat moss and perlite for ideal drainage and nutrition.'
//   };

  return (
    <div className="plant-detail-container">
      <h2>{plantData.name} <span className="latin-name">({plantData.latinName})</span></h2>
      <img src={placeholderImage} alt={plantData.name} className="plant-image" />

      <div className="plant-section">
        <h3>Plant Type</h3>
        <p>{plantData.type}</p>
      </div>

      <div className="plant-section">
        <h3>Upcoming Care Tasks</h3>
        {/* <ul>
          {plantData.upcomingTasks.map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul> */}
      </div>

      <div className="plant-section">
        <h3>Soil Recommendation</h3>
        <p>{plantData.soilType}</p>
        <p className="ai-tip">Gemini Suggests: {plantData.geminiSoilTip}</p>
      </div>

      <div className="plant-section">
        <h3>Care Predictions</h3>
        <p><strong>Last Watered:</strong> {plantData.lastWatered}</p>
        <p><strong>Watering Frequency:</strong> {plantData.wateringFrequency}</p>
        <p><strong>Last Repotted:</strong> {plantData.lastRepotted}</p>
        <p><strong>Fertilizer Tip:</strong> {plantData.fertilizerAdvice}</p>
      </div>
    </div>
  );
};

export default PlantDetailPage;