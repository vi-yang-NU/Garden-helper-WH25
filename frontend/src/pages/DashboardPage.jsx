import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CropCard from '../components/CropCard';
import '../styling/Dashboard.css';
import logo from '../assets/catnip_logo.png';
import { getUserPlants } from '../services/api.js';
import abutilonImage from '../assets/plant_images/Abutilon_hybridum.png';

const DashboardPage = () => {
  const [plants, setPlants] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const userId = 1;
        // const userId = localStorage.getItem('user_id'); // or however you're storing it
  
        const userPlants = await getUserPlants(userId);
  
        // Transform data if needed
        const formattedPlants = userPlants.map((plant) => ({
          id: plant.plant_id,
          name: plant.plant_name || 'Unnamed Plant',
          image: abutilonImage, // use plant.image_url if available
          status: plant.progress_stage || 'No status',
        }));
  
        setPlants(formattedPlants);
  
        // Set mock tasks for now — replace with backend logic later
        setTasks([
          `Water ${formattedPlants[0]?.name}`,
          `Add fertilizer to ${formattedPlants[1]?.name || 'plant'}`,
        ]);
      } catch (err) {
        console.error('Failed to load user plants:', err);
      }
    };
  
    fetchPlants();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <img src={logo} alt="CatNip Logo" className="sidebar-logo" />
        <h2 className="sidebar-title">Upcoming Plant Care</h2>
        <ul className="task-list">
          {tasks.map((task, idx) => (
            <li key={idx} className="task-item">• {task}</li>
          ))}
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1 className="dashboard-heading">Your Plants</h1>
        <div className="crop-grid">
          {plants.map((plant) => (
            <Link key={plant.id} to={`/plant/${plant.id}`} state={{ plant }}>
              <CropCard plant={plant} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;