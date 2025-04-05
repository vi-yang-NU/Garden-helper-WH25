import React from 'react';

const CropCard = ({ plant }) => {
  return (
    <div className="card">
      <h3>{plant.name}</h3>
      <p>Difficulty: {plant.difficulty}</p>
    </div>
  );
};

export default CropCard;