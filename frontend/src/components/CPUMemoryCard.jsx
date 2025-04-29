// CPU & Memory Usage CARD

import React, { useState, useEffect } from 'react';


const CPUMemory = () => {

  const [data, setData] = useState({

    cpuMemory: null,

  });

  const [loading, setLoading] = useState(true);

  const fetchData = async (endpoint) => {

    try {

      const response = await fetch(`http://127.0.0.1:5000/api/${endpoint}`);
      const result = await response.json();

      if (result.status === 'Success') {

        return result;

      } 
      else {

        console.error(`Error fetching ${endpoint}:`, result.error);
        return { error: result.error };

      }
    } 
    catch (error) {

      console.error(`Error fetching ${endpoint}:`, error);
      return { error: error.message };

    }
  };

  useEffect(() => {

    const loadData = async () => {

      setLoading(true);
      const cpuMemory = await fetchData('cpu_memory');
      setData({ cpuMemory });
      setLoading(false);

    };

    loadData();

  }, []);

  if (loading) {

    return <p>Loading system data...</p>;

  }

  const cpu = data.cpuMemory?.cpu || {};
  const memory = data.cpuMemory?.memory || {};


  return (

    <div>
    
      <div className="card mb-3"

        style={{

          maxWidth: '100%',
          minWidth: '80%',
          width: '100px',
          height: 'auto',

        }}>

        <div className="card-body"

          style={{

            marginLeft: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',

          }}>

          {/* CPU Section */}
          <h11>CPU Usage</h11>

          <table

            style={{

              marginLeft: '30px',
              width: 'auto',

            }}>

            {/* Start of CPU Table */}
            <thead>
              <tr>

                <th><h10>Type</h10></th>
                <th><h10>Percentage</h10></th>

              </tr>
            </thead>
            <tbody>


              {Object.entries(cpu).map(([key, value], index) => (

                <tr key={index}>

                  <td><h10>{key}</h10></td>
                  <td><h10>{parseFloat(value).toFixed(2)}%</h10></td>

                </tr>

              ))}

            </tbody>
          </table>


          {/* Memory Section */}
          <h11>Memory Usage</h11>

          {/* Start of Memory Table */}
          <table

            style={{

              marginLeft: '30px',
              width: 'auto',

            }}>

            <thead>
              <tr>

                <th><h10>Type</h10></th>
                <th><h10>Value (KB)</h10></th>

              </tr>
            </thead>

            <tbody>
              {Object.entries(memory).map(([key, value], index) => (

                <tr key={index}>

                  <td><h10>{key}</h10></td>
                  <td><h10>{parseInt(value).toLocaleString()}</h10></td>

                </tr>

              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
};

export default CPUMemory;
