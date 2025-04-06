import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CropCard from '../components/CropCard';
import '../styling/Dashboard.css';
import logo from '../assets/catnip_logo.png';

const DashboardPage = () => {
  const [plants, setPlants] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Replace with actual API calls
    setPlants([
      { id: 1, name: 'Ben', image: '', status: 'Needs watering' },
      { id: 2, name: 'Venussy', image: '', status: 'Add fertilizer' },
      { id: 3, name: 'Succulent Boi', image: '', status: 'Thriving!' },
    ]);

    setTasks([
      'Water Ben',
      'Add fertilizer to Venussy',
      'Repot Succulent Boi'
    ]);
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <img src={logo} alt="Urban Grower Logo" className="sidebar-logo" />
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