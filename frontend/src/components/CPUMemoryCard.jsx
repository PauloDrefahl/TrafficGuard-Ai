// FIND LOCATION

import React, { useState, useEffect } from 'react';
import CardHeader from './CardHeader';

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
      
      setData({

        cpuMemory,


      });
      setLoading(false);

    };

    loadData();
  }, []);


  if (loading) {
    return <p>Loading system data...</p>;
  }


  return (

    <div>
      {/* CPU and Memory Usage Section */}
      <div className="card mb-3"
        style={{

            maxWidth: '100%',
            minWidth: '80%', /* Prevents the box from collapsing */
            width: '100px',
            height: 'auto',
    
        }}> {/* className = "card mb-3" */}
    
        <div className="card-body"

            style = {{

                marginLeft: '10px',
                display: 'flex', /* This and flexDir and gap allow for a vertical stack */
                flexDirection: 'column',
                gap: '10px'

        }}>

          {/* CPU Usage Table */}
          <h11>CPU Usage</h11>

          <div
            style = {{

                marginLeft: '30px',
                display: 'flex', /* This, flexDir, and gap allow for a vertical stack */
                flexDirection: 'column',
                gap: '10px'

            }}>

            <h10>Type:</h10>
            <h10>Percentage:</h10>
          </div>
          


          {/* Memory Usage Table */}
          <h11>Memory Usage</h11>
            <div
                style = {{

                    marginLeft: '30px',
                    display: 'flex', /* This, flexDir, and gap allow for a vertical stack */
                    flexDirection: 'column',
                    gap: '10px'

                }}>

                <h10>Type:</h10>
                <h10>Value (KB):</h10>
            </div>
            
              

            <tbody>

              {data.cpuMemory?.memory &&
                Object.entries(data.cpuMemory.memory).map(([key, value], index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{parseInt(value).toLocaleString()}</td>
                  </tr>
                ))}

            </tbody>
        </div>
      </div>
    </div>
    );
};

export default CPUMemory;