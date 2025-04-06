// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import '../styling/PlantDetail.css';
// import placeholderImage from '../assets/placeholder-plant.png'; // Replace with actual image per plant

// const PlantDetailPage = () => {
//   const { plantId } = useParams();
//   const [plantData, setPlantData] = useState(null);
//   const [recommendation, setRecommendation] = useState('');

//   useEffect(() => {
//     // Mock fetch from backend using plantId
//     const fetchPlantDetails = async () => {
//       try {
//         // TODO: Replace with actual API call
//         const mockResponse = {
//           latinName: 'Ocimum basilicum',
//           commonName: 'Basil',
//           type: 'Herb',
//           soilType: 'Well-draining loamy soil',
//           upcomingTasks: ['Water on Wednesday', 'Fertilize next week'],
//           lastWatered: '2025-04-01',
//           wateringFrequency: 'every 3 days',
//           lastRepotted: '2025-03-15',
//           fertilizerAdvice: 'Add compost every 3 weeks',
//         };
//         setPlantData(mockResponse);

//         // Call Gemini recommendation engine (placeholder)
//         const geminiAdvice = await getGeminiSoilAdvice(mockResponse.commonName);
//         setRecommendation(geminiAdvice);
//       } catch (err) {
//         console.error('Error fetching plant details:', err);
//       }
//     };

//     fetchPlantDetails();
//   }, [plantId]);

//   const getGeminiSoilAdvice = async (plantName) => {
//     // Placeholder for calling Gemini model. Replace with real Gemini API integration.
//     return `For ${plantName}, consider adding coconut coir for improved water retention.`;
//   };

//   if (!plantData) return <p>Loading plant info...</p>;

//   return (
//     <div className="plant-detail-container">
//       <h2>{plantData.commonName} <span className="latin-name">({plantData.latinName})</span></h2>
//       <img src={placeholderImage} alt={`${plantData.commonName}`} className="plant-image" />

//       <div className="plant-section">
//         <h3>Plant Type</h3>
//         <p>{plantData.type}</p>
//       </div>

//       <div className="plant-section">
//         <h3>Upcoming Care Tasks</h3>
//         <ul>
//           {plantData.upcomingTasks.map((task, index) => (
//             <li key={index}>{task}</li>
//           ))}
//         </ul>
//       </div>

//       <div className="plant-section">
//         <h3>Soil Recommendation</h3>
//         <p>{plantData.soilType}</p>
//         <p className="ai-tip">Gemini Suggests: {recommendation}</p>
//       </div>

//       <div className="plant-section">
//         <h3>Care Predictions</h3>
//         <p><strong>Last Watered:</strong> {plantData.lastWatered}</p>
//         <p><strong>Watering Frequency:</strong> {plantData.wateringFrequency}</p>
//         <p><strong>Last Repotted:</strong> {plantData.lastRepotted}</p>
//         <p><strong>Fertilizer Tip:</strong> {plantData.fertilizerAdvice}</p>
//       </div>
//     </div>
//   );
// };

// export default PlantDetailPage;


// Code with placeholders

import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../styling/PlantDetail.css';
import placeholderImage from '../assets/plant_images/Abutilon_hybridum.png';

const PlantDetailPage = () => {
  const { plantId } = useParams();
  const location = useLocation();
  const plant = location.state?.plant;

  // Placeholder fallback if no state was passed
  const plantData = plant || {
    id: plantId,
    name: 'Placeholder Plant',
    latinName: 'Plantae fictitious',
    type: 'Herb',
    soilType: 'Well-draining loamy soil',
    upcomingTasks: [],
    lastWatered: '2025-04-01',
    wateringFrequency: 'Every 3 days',
    lastRepotted: '2025-03-01',
    fertilizerAdvice: 'Add organic compost once a month',
    geminiSoilTip: 'Consider using perlite for improved drainage.',
  };

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