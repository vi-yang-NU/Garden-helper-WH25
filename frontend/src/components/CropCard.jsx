import React from 'react';
import '../styling/cropcard.css';

const CropCard = ({ plant }) => {
  return (
    <div className="crop-card">
      <div className="crop-image-wrapper">
        <img
          src={plant.image || '/placeholder-plant.png'}
          alt={plant.name}
          className="crop-image"
        />
      </div>
      <div className="crop-info">
        <h3 className="crop-name">{plant.name}</h3>
        <p className="crop-status">{plant.status}</p>
      </div>
    </div>
  );
};

export default CropCard;