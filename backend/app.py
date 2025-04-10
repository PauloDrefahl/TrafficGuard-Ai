from flask import Flask, jsonify
from flask_cors import CORS
from getRouterData import get_router_data_via_ssh
import sqlite3
from config import ROUTER_IP, USERNAME, PASSWORD, COMMANDS, DATABASE

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the React app

# API Endpoint: /api/data
@app.route('/api/data', methods=['GET'])
def get_data():
    print('Request received!')
    try:
        # Fetch router data using commands from config
        network_log = get_router_data_via_ssh(COMMANDS["log_output"])
        device_list = get_router_data_via_ssh(COMMANDS["device_list"])
        general_info = get_router_data_via_ssh(COMMANDS["network_config"])

        # Format the data to send as a JSON response
        data = {
            "message": "Data fetched from the router!",
            "status": "Success",
            "network_log": network_log,
            "device_list": device_list,
            "general_info": general_info,
        }

        # Recreate the database and save data
        recreate_database()
        save_data_to_db(data)
    except Exception as e:
        data = {
            "message": "Failed to fetch router data.",
            "status": "Error",
            "error": str(e)
        }
    return jsonify(data)

# API Endpoint: /api/logs
@app.route('/api/logs', methods=['GET'])
def get_logs():
    print('Fetching logs...')
    try:
        log_output = get_router_data_via_ssh(COMMANDS["log_output"])
        return jsonify({"status": "Success", "logs": log_output})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)})

# API Endpoint: /api/devices
@app.route('/api/devices', methods=['GET'])
def get_devices():
    print('Fetching device list...')
    try:
        device_list = get_router_data_via_ssh(COMMANDS["device_list"])
        devices = []
        for line in device_list.strip().split("\n"):
            parts = line.split()
            if len(parts) >= 4:
                devices.append({
                    "lease_time": parts[0],
                    "mac_address": parts[1],
                    "ip_address": parts[2],
                    "hostname": parts[3] if len(parts) > 3 else "Unknown",
                })
        return jsonify({"status": "Success", "devices": devices})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)})

# API Endpoint: /api/cpu_memory
@app.route('/api/cpu_memory', methods=['GET'])
def get_cpu_memory():
    print('Fetching CPU and memory usage...')
    try:
        cpu_output = get_router_data_via_ssh(COMMANDS["cpu_usage"])
        memory_output = get_router_data_via_ssh(COMMANDS["memory_usage"])

        # Parse CPU usage data
        cpu_data = {}
        for part in cpu_output.split():
            if "%" in part:
                key, value = part.split("%")
                cpu_data[key] = value

        # Parse Memory usage data
        memory_lines = memory_output.strip().split("\n")
        mem_data = {}
        if len(memory_lines) >= 2:
            headers = memory_lines[0].split()
            values = memory_lines[1].split()
            mem_data = dict(zip(headers, values))

        return jsonify({"status": "Success", "cpu": cpu_data, "memory": mem_data})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)})

# API Endpoint: /api/wireless_clients
@app.route('/api/wireless_clients', methods=['GET'])
def get_wireless_clients():
    print('Fetching wireless clients...')
    try:
        # Try iwinfo as primary, fallback to default command if empty
        wireless_clients = get_router_data_via_ssh("iwinfo wlan0 assoclist")
        if not wireless_clients.strip():
            wireless_clients = get_router_data_via_ssh(COMMANDS["wireless_clients"])
        return jsonify({"status": "Success", "wireless_clients": wireless_clients})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)})

# API Endpoint: /api/firewall_rules
@app.route('/api/firewall_rules', methods=['GET'])
def get_firewall_rules():
    print('Fetching firewall rules...')
    try:
        firewall_rules = get_router_data_via_ssh(COMMANDS["firewall_rules"])
        if not firewall_rules.strip():
            firewall_rules = get_router_data_via_ssh("cat /etc/config/firewall")
        return jsonify({"status": "Success", "firewall_rules": firewall_rules})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)})

# API Endpoint: /api/uptime_load
@app.route('/api/uptime_load', methods=['GET'])
def get_uptime_load():
    print('Fetching uptime and load...')
    try:
        uptime_load = get_router_data_via_ssh(COMMANDS["uptime_load"])
        return jsonify({"status": "Success", "uptime_load": uptime_load})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)})

# API Endpoint: /api/network_config
@app.route('/api/network_config', methods=['GET'])
def get_network_config():
    print('Fetching network configuration...')
    try:
        network_config = get_router_data_via_ssh(COMMANDS["network_config"])
        return jsonify({"status": "Success", "network_config": network_config})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)})

# API Endpoint: /api/bandwidth
@app.route('/api/bandwidth', methods=['GET'])
def get_bandwidth():
    print('Fetching bandwidth data...')
    try:
        bandwidth_output = get_router_data_via_ssh(COMMANDS["bandwidth"])
        # Parse and format the output from /proc/net/dev (skip first 2 header lines)
        lines = bandwidth_output.strip().split("\n")[2:]
        bandwidth_data = []
        for line in lines:
            parts = line.split()
            if len(parts) >= 10:
                bandwidth_data.append({
                    "interface": parts[0].strip(':'),
                    "receive_bytes": int(parts[1]),
                    "transmit_bytes": int(parts[9])
                })
        return jsonify({"status": "Success", "bandwidth": bandwidth_data})
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)})

# Database Operations: drop & recreate table, then save data
def recreate_database():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("DROP TABLE IF EXISTS router_info")
        cursor.execute("""
            CREATE TABLE router_info (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT,
                value TEXT
            )
        """)
        conn.commit()
        conn.close()
    except sqlite3.Error as e:
        raise e

def save_data_to_db(data):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        for key, value in data.items():
            cursor.execute("INSERT INTO router_info (key, value) VALUES (?, ?)", (key, str(value)))
        conn.commit()
        conn.close()
    except sqlite3.Error as e:
        raise e

if __name__ == '__main__':
    app.run(debug=False)
