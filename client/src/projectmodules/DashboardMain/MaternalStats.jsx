import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MaternalHealthStats() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    async function fetchMaternalHealthData() {
      try {
        const response = await axios.get('https://public-maternal-health-api.com/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching maternal health data", error);
      }
    }
    fetchMaternalHealthData();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Maternal Health Statistics</h2>
      {stats ? (
        <ul className="text-gray-700 dark:text-gray-300">
          <li>Total Births: {stats.totalBirths}</li>
          <li>Mortality Rate: {stats.mortalityRate}</li>
          <li>Healthcare Access: {stats.healthcareAccess}%</li>
          <li>Trained Midwives: {stats.trainedMidwives}%</li>
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default MaternalHealthStats;
