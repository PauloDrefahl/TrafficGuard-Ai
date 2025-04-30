import React from 'react';

const ScrollBoxRouter = ({ routers, selectedIndex, onSelect, onDelete }) => {
  return (
    <div style={{ position: 'relative', height: '200px', width: '100%', overflow: 'hidden' }}>
      <div
        className="custom-scroll-router"
        style={{ height: '100%', overflowY: 'auto', padding: '0' }}
      >
        {routers.map((r, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(idx)}
            style={{
              padding: '8px',
              cursor: 'pointer',
              backgroundColor: idx === selectedIndex ? '#cce5ff' : 'transparent',
              color: idx === selectedIndex ? '#004085' : 'inherit',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ddd'
            }}
          >
            <span>{r.brand} {r.model.toUpperCase()} @ {r.ip}</span>
            <span
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={e => { e.stopPropagation(); onDelete(idx); }}
            >&times;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollBoxRouter;
