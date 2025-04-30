import React from 'react';

const PcapListItem = ({ filename, selected, onToggle, onDelete }) => {
  return (
    <div
      className="d-flex align-items-center px-3 py-2"
      style={{
        backgroundColor: selected ? '#e9ecef' : 'transparent',
        cursor: 'pointer',
        borderBottom: '1px solid #ddd'
      }}
      onClick={onToggle}
    >
      <input
        type="checkbox"
        checked={selected}
        readOnly
        style={{ marginRight: '10px' }}
      />
      <span style={{ flexGrow: 1, fontFamily: 'monospace' }}>
        {filename}
      </span>
      <span
        style={{ color: 'red', cursor: 'pointer', padding: '0 8px' }}
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
      >
        &times;
      </span>
    </div>
  );
};

export default PcapListItem;
