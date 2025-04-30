import React from 'react';

const PacketSummary = ({ packets }) => {
  return (
    <div className="card mb-4">
      <div className="card-body p-2" style={{ fontFamily: 'monospace', maxHeight: '300px', overflowY: 'auto' }}>
        <table className="table table-sm mb-0">
          <thead>
            <tr>
              <th>Time</th>
              <th>Src</th>
              <th>Dst</th>
              <th>Proto</th>
              <th>Len</th>
            </tr>
          </thead>
          <tbody>
            {packets.map((p, i) => (
              <tr key={i}>
                <td>{p.timestamp}</td>
                <td>{p.src}</td>
                <td>{p.dst}</td>
                <td>{p.proto}</td>
                <td>{p.len}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PacketSummary;
