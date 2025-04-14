// "Network Trafficking" Card

import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensures Chart.js is automatically registered


// Network Graphs
const TrafficMonitoring = () => {

  // Line Chart
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],

    datasets: [
      {
        label: 'Network Traffic (MB)',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
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
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
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
          <h5 className="mt-2 me-3">📈 Network Trafficking: </h5>
          <button type="button" className="btn btn-outline-dark" onClick={() => showChart('networkTrafficChart')}>Network Traffic</button>
          <button type="button" className="btn btn-outline-dark" onClick={() => showChart('suspiciousTrafficTable')}>Suspicious Traffic</button>
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

          {/* "Suspicious Traffic" Button Link */}
          {visibleChart === 'suspiciousTrafficTable' && (
            <div id="suspiciousTrafficTable">
              <p>Sample data for suspicious traffic (replace with your actual table):</p>
              <table className="table table-striped">

                {/* Table Header */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>IP Address</th>
                    <th>Time Detected</th>
                    <th>Reason</th>
                  </tr>
                </thead>

                {/* Sample Data */}
                <tbody>

                  <tr>
                    <td>1</td>
                    <td>192.168.0.10</td>
                    <td>2024-11-05 14:32</td>
                    <td>Suspicious Data Spike</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>10.0.0.15</td>
                    <td>2024-11-05 15:20</td>
                    <td>Unusual Port Activity</td>
                  </tr>

                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrafficMonitoring;
