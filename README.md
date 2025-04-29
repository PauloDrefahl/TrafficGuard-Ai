# TrafficGuard-Ai

**TrafficGuard-Ai** is an integrated network monitoring solution that combines a Python Flask backend with a React-based frontend. 
In a closed test environment, the backend connects to a router via SSH to fetch system data, 
while the frontend presents information about network traffic, device lists, CPU/memory usage, logs, and more.

---

## Table of Contents

- [Project Overview](#project-overview)
- [File Structure](#file-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup & Running](#backend-setup--running)
- [Frontend Setup & Running](#frontend-setup--running)
- [Usage](#usage)
- [Future Development](#future-development)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

TrafficGuard-Ai consists of two integrated parts:

- **Backend:** A Flask server that executes SSH commands on a router to retrieve data (logs, bandwidth, device list, CPU/memory usage, etc.) 
and saves snapshots to an SQLite database.
- **Frontend:** A React application created with Create React App that consumes the backend API and displays the data
using Bootstrap for layout and Chart.js for visualizations.

This architecture was built for a closed test environment and currently uses hardcoded router credentials and a simple table-recreation strategy for caching data. 
Future iterations will focus on enhanced data management, state handling, and security improvements.

---

## File Structure

```
TrafficGuard-Ai/
├── backend/
│   ├── db/
│   │   └── router_data.db
│   ├── app.py
│   ├── config.py
│   ├── getRouterData.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── components/
│       │   ├── BandwidthUsage.jsx
│       │   ├── console.jsx
│       │   ├── cpuMemoryUsage.jsx
│       │   ├── DeviceList.jsx
│       │   ├── fetchData.jsx
│       │   ├── Navbar.jsx
│       │   ├── SecurityCard.jsx
│       │   ├── systemData.jsx
│       │   └── TrafficMonitoring.jsx
│       ├── styles/
│       │   ├── App.css
│       │   ├── index.css
│       │   └── styles.css
│       ├── App.js
│       ├── App.test.js
│       ├── fetchData.js
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       └── setupTests.js
├── .gitignore
└── README.md
```

---

## Prerequisites

- **Python 3.12**
- **Node.js**
- **Package Managers:**  
  - For Python: `pip`
  - For Node.js: `npm`

---

# Setup Guide

This guide covers setup and running instructions for both Windows and macOS environments.

## Backend

### Windows

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```
2. **Create virtual environment**
   ```bash
   py -3.12 -m venv venv
   ```
3. **Activate the virtual environment**
   ```bash
   venv\Scripts\activate
   ```
4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
5. **Run the Flask app**
   ```bash
   python app.py
   ```
   The backend will start on http://127.0.0.1:5000.

#### Subsequent starts
```bash
venv\Scripts\activate
python app.py
```

---

### macOS

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```
2. **Create virtual environment**
   ```bash
   py -3.12 -m venv venv
   ```
3. **Activate the virtual environment**
   ```bash
   source venv/bin/activate
   ```
4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
5. **Run the Flask app**
   ```bash
   python3 app.py
   ```
   The backend will start on http://127.0.0.1:5000.

#### Subsequent starts
```bash
source venv/bin/activate
python3 app.py
```

---

## Frontend

### Windows & macOS

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Install packages**
   ```bash
   npm install styled-components
   npm install react-router-dom
   ```
4. **Start the React app**
   ```bash
   npm start
   ```
   The frontend will launch at http://localhost:3000.

#### Subsequent starts
```bash
cd frontend
npm start
```

---

## Usage

### Backend API Endpoints
- **/api/data** – Fetch router data (log, device list, network config) and save to SQLite.
- **/api/logs** – Retrieve router log output.
- **/api/devices** – Return device lease data (lease time, MAC, IP, hostname).
- **/api/cpu_memory** – Return CPU usage and memory stats.
- **/api/wireless_clients** – Return wireless client associations (placeholder).
- **/api/firewall_rules** – Return firewall rules.
- **/api/uptime_load** – Return system uptime and load averages.
- **/api/network_config** – Return network configuration details.
- **/api/bandwidth** – Return bandwidth statistics per interface (received and transmitted bytes).

### Frontend Components
- **Navbar.jsx** – Render responsive navigation bar.
- **SecurityCard.jsx** – Display static network security status.
- **BandwidthUsage.jsx** – Fetch and display bandwidth usage in table.
- **ConsoleOutput.jsx** – Fetch and display router logs in scrollable card.
- **CpuMemoryUsage.jsx** – Fetch and display CPU and memory usage in tables.
- **DeviceList.jsx** – Fetch and display list of devices in table.
- **TrafficMonitoring.jsx** – Display sample network traffic charts and suspicious traffic table.
- **SystemData.jsx** – Aggregate and display various system metrics (CPU/memory, wireless, firewall, uptime, network config).
- **FetchData.jsx** – Fetch data from backend and POST to save endpoint (placeholder).

---

## Future Development

- **Backend Enhancements:**
  - Enhance data persistence by logging timestamped records instead of recreating database on each call.
  - Move sensitive data to environment variables.
  - Log using Python’s logging module.

- **Frontend Improvements:**
  - Replace sample data in charting components with live backend data.
  - Modularize large aggregator components into smaller, reusable parts.
  - Consolidate recurring fetch logic into custom hooks.

---

## Contributing

Please follow these steps if you’d like to contribute:

1. Fork the repository.
2. Create a new branch (e.g., `feature/update-component`).
3. Commit your changes with detailed messages.
4. Submit a pull request describing your changes and the rationale behind them.

---

## License

This project is [License].
