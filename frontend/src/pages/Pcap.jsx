import React, { useState, useEffect } from 'react';
import PacketSummary from '../components/PacketSummary';
import PcapControls from '../components/PcapControls';
import PcapList from '../components/PcapList';

const Pcap = () => {
  const [packets, setPackets] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [duration, setDuration] = useState(10);
  const [capturing, setCapturing] = useState(false);

  // Helper to download via fetch + blob (works with CRA proxy)
  const downloadEndpoint = async (path, filename) => {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Download failed: ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error', err);
    }
  };

  // Poll live packets every second
  useEffect(() => {
    fetchLive();
    const iv = setInterval(fetchLive, 1000);
    return () => clearInterval(iv);
  }, []);

  const fetchLive = async () => {
    try {
      const res = await fetch('/api/pcap/live');
      const json = await res.json();
      setPackets(json.packets || []);
    } catch {
      // ignore
    }
  };

  // Fetch saved PCAP list initially and after operations
  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await fetch('/api/pcap/list');
      const json = await res.json();
      setFiles(json.files || []);
      setSelectedFiles((sel) => sel.filter((f) => (json.files || []).includes(f)));
    } catch {
      // ignore
    }
  };

  // Start new capture
  const handleStart = async () => {
    setCapturing(true);
    try {
      const res = await fetch('/api/pcap/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration }),
      });
      if (res.ok) await fetchList();
    } catch {
      // ignore
    } finally {
      setCapturing(false);
    }
  };

  // Stop in-progress capture
  const handleStop = async () => {
    try {
      await fetch('/api/pcap/stop', { method: 'POST' });
      setCapturing(false);
      await fetchList();
    } catch {
      // ignore
    }
  };

  // Delete single PCAP
  const deleteSingle = async (filename) => {
    try {
      await fetch(`/api/pcap?files=${filename}`, { method: 'DELETE' });
      setSelectedFiles((sel) => sel.filter((f) => f !== filename));
      await fetchList();
    } catch {
      // ignore
    }
  };

  // Download selected files (1→direct, >1→zip)
  const handleDownloadSelected = () => {
    if (selectedFiles.length === 1) {
      downloadEndpoint(
        `/api/pcap/download/${selectedFiles[0]}`,
        selectedFiles[0]
      );
    } else if (selectedFiles.length > 1) {
      downloadEndpoint(
        `/api/pcap/download?files=${selectedFiles.join(',')}`,
        'pcaps.zip'
      );
    }
  };

  // Download all PCAPs as zip
  const handleDownloadAll = () => {
    downloadEndpoint('/api/pcap/download/all', 'all_pcaps.zip');
  };

  // Delete all PCAPs
  const handleDeleteAll = async () => {
    try {
      await fetch('/api/pcap', { method: 'DELETE' });
      setSelectedFiles([]);
      await fetchList();
    } catch {
      // ignore
    }
  };

  // Toggle selection of one file
  const toggleSelect = (filename) => {
    setSelectedFiles((sel) =>
      sel.includes(filename)
        ? sel.filter((f) => f !== filename)
        : [...sel, filename]
    );
  };

  return (
    <div className="container mt-4">
      <h4>Live Packet Summary</h4>
      <PacketSummary packets={packets} />

      <h4 className="mt-5">Saved PCAPs</h4>
      <PcapControls
        duration={duration}
        setDuration={setDuration}
        capturing={capturing}
        onStart={handleStart}
        onStop={handleStop}
        selectedCount={selectedFiles.length}
        onDownloadSelected={handleDownloadSelected}
        onDownloadAll={handleDownloadAll}
        onDeleteAll={handleDeleteAll}
      />

      <PcapList
        files={files}
        selectedFiles={selectedFiles}
        toggleSelect={toggleSelect}
        deleteSingle={deleteSingle}
      />
    </div>
  );
};

export default Pcap;
