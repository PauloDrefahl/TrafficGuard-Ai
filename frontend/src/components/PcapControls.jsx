import React from 'react';

const PcapControls = ({
  duration,
  setDuration,
  capturing,
  onStart,
  onStop,
  selectedCount,
  onDownloadSelected,
  onDownloadAll,
  onDeleteAll
}) => {
  const options = [
    { label: '5 s', value: 5 },
    { label: '10 s', value: 10 },
    { label: '30 s', value: 30 },
    { label: '60 s', value: 60 },
  ];

  // Download button label
  const downloadLabel = selectedCount === 0
    ? 'Download'
    : `Download ${selectedCount}`;

  return (
    <div className="d-flex align-items-center mb-3" style={{ gap: '10px', flexWrap: 'wrap' }}>

      {/* Duration Selector */}
      <div>
        <label className="me-2">Time</label>
        <select
          className="custom-input"
          style={{ width: '80px', display: 'inline-block' }}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          disabled={capturing}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Start / Stop Buttons */}
      {!capturing ? (
        <div className="button" onClick={onStart}>Start</div>
      ) : (
        <div className="button" onClick={onStop}>Stop</div>
      )}

      {/* Download Selected */}
      <div
        className={`button ${selectedCount === 0 ? 'disabled' : ''}`}
        onClick={selectedCount > 0 ? onDownloadSelected : null}
      >
        {downloadLabel}
      </div>

      {/* Download All */}
      <div className="button" onClick={onDownloadAll}>Download All</div>

      {/* Delete All */}
      <div className="button" onClick={onDeleteAll}>Delete All</div>
    </div>
  );
};

export default PcapControls;
