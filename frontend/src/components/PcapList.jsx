import React from 'react';
import PcapListItem from './PcapListItem';

const PcapList = ({ files, selectedFiles, toggleSelect, deleteSingle }) => {
  return (
    <div className="card">
      <div className="card-body p-0">
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {files.map((f) => (
            <PcapListItem
              key={f}
              filename={f}
              selected={selectedFiles.includes(f)}
              onToggle={() => toggleSelect(f)}
              onDelete={() => deleteSingle(f)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PcapList;
