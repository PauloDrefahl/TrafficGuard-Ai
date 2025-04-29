// "Network Monitoring" Card Graph

import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensures Chart.js is automatically registered
import SystemData from './systemData';


// Network Graphs
const NetworkMonitoring = () => {

  // Line Chart
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],

    datasets: [
      {
        label: 'Network Traffic (MB)',
        data: [65, 59, 80, 81, 56, 55],
        fill: true,
        backgroundColor:'rgb(190, 207, 239, 0.5)',
        borderColor: '#A4C4FF',
        tension: 0.1,
      },
    ],
  }; // Sample data for charts

  // Bar Chart
  const barChartData = {

    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Network Usage (MB)',
        data: [120, 150, 180, 170, 200, 230],
        backgroundColor:'rgb(190, 207, 239, 0.5)',
        borderColor: '#A4C4FF',
        borderWidth: 1,
      },
    ],
  }; // Sample Data

  // State to handle which chart is displayed
  const [visibleChart, setVisibleChart] = useState('networkTrafficChart');

  // Function to show charts or tables
  const showChart = (chartId) => {
    setVisibleChart(chartId);
  };


  return (
    
    <div className="card">
      <div className="card-body">
        <div className="d-flex gap-1 mb-3 border-bottom border-dark pb-3" role="group" aria-label="Traffic Monitoring Options">
         
         {/* Network Traffic Card Buttons */}
          <button type="button" className="btn btn-outline-dark" onClick={() => showChart('networkTrafficChart')}>Network Traffic</button>
          <button type="button" className="btn btn-outline-dark" onClick={() => showChart('networkUsageChart')}>Network Usage</button>
        </div>

        {/* Consistent chart container */}
        <div id="chartContainer" style={{ minHeight: '600px', height: 'auto' }}>

          {/* "Network Traffic" Button Link */}
          {visibleChart === 'networkTrafficChart' && (
            <Line data={lineChartData} />
          )}

          {/* "Network Usage" Button Link */}
          {visibleChart === 'networkUsageChart' && (
            <Bar data={barChartData} />
          )}
        </div>
      </div>

      <div className='card'>
          <SystemData/>
      </div>

    </div>

    

  );
};

export default NetworkMonitoring;
