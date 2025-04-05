import React from 'react';
import CropCard from '../components/CropCard';

const DashboardPage = () => {
  const mockPlants = [
    { id: 1, name: 'Basil', difficulty: 'Easy' },
    { id: 2, name: 'Tomato', difficulty: 'Medium' },
    { id: 3, name: 'Lavender', difficulty: 'Hard' }
  ];

  return (
    <div>
      <h2>Recommended Plants</h2>
      <div className="card-grid">
        {mockPlants.map((plant) => (
          <CropCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;