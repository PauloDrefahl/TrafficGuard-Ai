# TrafficGuard-Ai

**TrafficGuard-Ai** is a full-stack network monitoring toolkit combining a Flask backend and a React frontend. 
In a controlled test setup, the backend connects to one or more routers over SSH 
to collect live data - logs, bandwidth, device leases, CPU/memory stats, and packet captures - 
while the frontend presents dashboards for real-time and historical insights.


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

- **Backend (Flask + Paramiko):**  
  - Executes SSH commands on selected router profiles to fetch system metrics.  
  - Supports dynamic router selection and credential overrides via `/api/set_router`.  
  - Supports persistent snapshots in SQLite and archives of full PCAP recordings.  
  - Supports REST API for data endpoints (logs, devices, CPU/memory, bandwidth, firewall, uptime, network config) and PCAP management.

- **Frontend (React + Bootstrap + Chart.js):**  
  - Consumes the backend API and displays metrics in cards, tables, and charts.  
  - Provides a Settings page to add routers, enter credentials, and select the active device.  
  - Provides a PCAP page for live packet previews and saved-file management (capture controls, multi-select, download, delete).  
  - Provides custom hooks and context for state and fetch logic, with plans to modularize and enhance accessibility.

This development build uses in-memory ZIP streams and hardcoded command sets. 
Future versions will employ secure credential management, data persistence, and eventually optional on-prem AI threat detection.

---

## File Structure

```
TrafficGuard-Ai/
├── backend/
│   ├── db/
│   │   └── router_data.db
│   ├── pcaps
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
│   ├── src/
│   │   ├── components/
│   │   │   ├── BandwidthUsage.jsx
│   │   │   ├── CardHeader.jsx
│   │   │   ├── ChangeRouter.jsx
│   │   │   ├── ConsoleOutput.jsx
│   │   │   ├── CpuMemoryUsage.jsx
│   │   │   ├── DeviceList.jsx
│   │   │   ├── fetchData.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PacketSummary.jsx
│   │   │   ├── PcapControls.jsx
│   │   │   ├── PcapList.jsx
│   │   │   ├── PcapListItem.jsx
│   │   │   ├── ScrollBoxRouter.jsx
│   │   │   ├── SecurityCard.jsx
│   │   │   ├── SystemData.jsx
│   │   │   ├── ThemeCard.jsx
│   │   │   ├── TrafficMonitoring.jsx
│   │   │   └── UserLogin.jsx
│   │   ├── context/
│   │   │   └── RouterContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── NetworkStatus.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── Pcap.jsx
│   │   │   └── Settings.jsx
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── index.css
│   │   │   └── styles.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── fetchData.js
│   │   ├── index.js
│   │   ├── Layout.jsx
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── package.json
│   └── package-lock.json
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

## OpenWRT Router Prerequisites

Before running TrafficGuard-Ai against an OpenWRT router, 
SSH into the router and install the packet-capture tools if PCAP recording is desired:

```bash
ssh root@<router_ip>
opkg update
opkg install libpcap tcpdump
exit
````

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

### Backend API Endpoints

- **POST /api/set_router** – Select active router and optionally override its `router_ip`, `username`, and `password`.  
- **GET /api/data** – Fetch router data (log, device list, network config) and save to SQLite.  
- **GET /api/logs** – Retrieve router log output.  
- **GET /api/devices** – Return device lease data (lease time, MAC, IP, hostname).  
- **GET /api/cpu_memory** – Return CPU usage and memory stats.  
- **GET /api/wireless_clients** – Return wireless client associations.  
- **GET /api/firewall_rules** – Return firewall rules.  
- **GET /api/uptime_load** – Return system uptime and load averages.  
- **GET /api/network_config** – Return network configuration details.  
- **GET /api/bandwidth** – Return bandwidth stats per interface (received/transmitted bytes).  


- **POST /api/pcap/capture** – Start a timed capture, download the resulting `.pcap` and store it.  
- **POST /api/pcap/stop** – Stop any in-progress `tcpdump` capture.  
- **GET /api/pcap/live** – Return JSON array of the most recent 20 packets.  
- **GET /api/pcap/list** – List saved PCAP filenames.  
- **GET /api/pcap/download/<filename>** – Download a single PCAP file.  
- **GET /api/pcap/download?files=<f1,f2>** – Download multiple PCAPs as a ZIP.  
- **GET /api/pcap/download/all** – Download all PCAPs as a ZIP.  
- **DELETE /api/pcap?files=<f1,f2>** – Delete selected PCAPs.  
- **DELETE /api/pcap** – Delete all PCAPs.

### Frontend Components

- **Navbar.jsx** – Responsive navigation bar.  
- **CardHeader.jsx** – Section header card.  
- **SecurityCard.jsx** – Display static network security status.  
- **BandwidthUsage.jsx** – Fetch and display bandwidth usage table.  
- **ConsoleOutput.jsx** – Fetch and display router logs.  
- **CpuMemoryUsage.jsx** – Fetch and display CPU and memory usage tables.  
- **DeviceList.jsx** – Fetch and display list of devices table.  
- **TrafficMonitoring.jsx** – Sample network traffic charts and table (PLACEHOLDER).  
- **SystemData.jsx** – Aggregate and display various system metrics.  
- **fetchData.jsx** – Fetch & save example (PLACEHOLDER).  
- **ChangeRouter.jsx** – Form to add new router definitions.  
- **ScrollBoxRouter.jsx** – Scrollable list for router selection/deletion.  
- **UserLogin.jsx** – Username/password input to log in to selected router.  
- **PacketSummary.jsx** – Live view of the most recent 20 packets.  
- **PcapControls.jsx** – Capture duration selector and Start/Stop/Download/Delete controls.  
- **PcapList.jsx** – Infinite-scroll list of saved PCAP files with multi-select.  
- **PcapListItem.jsx** – Single PCAP row with checkbox and delete “×”.  
- **ThemeCard.jsx** – Theme settings (PLACEHOLDER).  


- **context/RouterContext.jsx** – React context for router profiles.  
- **pages/Home.jsx** – Home page.  
- **pages/NetworkStatus.jsx** – Network status dashboard.  
- **pages/Notifications.jsx** – Notifications page.  
- **pages/Settings.jsx** – Settings page with UserLogin, ChangeRouter, etc.  
- **pages/Pcap.jsx** – PCAP live summary and file management.  


---

## Future Development

- **Backend Enhancements:**
  - Implement persistent historical data in a timestamped table instead of recreating the database on each fetch.
  - Implement externalization of all secrets (router credentials, IPs) into environment variables.
  - Implement loading router profiles (commands, interfaces) from configuration files (JSON/YAML) for easy extension.
  - Implement SSH connection pooling to reduce overhead on frequent requests.
  - Implement input validation, authentication, and error-handling.

- **Frontend Improvements:**
  - Implement real backend data for placeholder charts in `TrafficMonitoring` and `SystemData`.
  - Refactor common fetch logic into custom hooks (e.g. `useRouterData`, `usePcap`).
  - Improve accessibility (Accessibility section, Day/Night Mode) and add global error/toast handling.

- **Infrastructure:**
  - Dockerize backend and frontend; orchestrate with Docker Compose for consistent environments.
  - Implement persist client-side state (router configs, past results) using Electron.

- **Long-Term Objective:**
  - Implement on-prem AI module (e.g. “DeepSeek”) for local threat/anomaly detection.

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
