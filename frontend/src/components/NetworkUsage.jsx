// Network Usage Graph found on the Home page and Network Status Page

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensures Chart.js is automatically registered


// Network Graphs
const NetworkUsage = () => {

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

  return (
    
    <div className="card">
      <div className="card-body">
       
        {/* Consistent chart container */}
        <div id="chartContainer" style={{ minHeight: '600px', height: 'auto' }}>

            <Bar data={barChartData} />
        
        </div>
      </div>
    </div>
  );
};

export default NetworkUsage;
