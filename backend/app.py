from flask import Flask, jsonify, request
from flask_cors import CORS
from getRouterData import get_router_data_via_ssh
import sqlite3
import time
from config import ROUTER_CONFIGS, DEFAULT_ROUTER, DATABASE

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Global state for selected router
current_router = DEFAULT_ROUTER

def get_active_config():
    """Return the config dict for the currently selected router."""
    return ROUTER_CONFIGS[current_router]

# API Endpoint: /api/set_router
@app.route('/api/set_router', methods=['POST'])
def set_router():
    data = request.get_json() or {}
    router = data.get('router')
    if router not in ROUTER_CONFIGS:
        return jsonify({'error': 'Invalid router selected'}), 400
    global current_router
    current_router = router
    return jsonify({'message': f'Router set to {router}'}), 200

# API Endpoint: /api/data
@app.route('/api/data', methods=['GET'])
def get_data():
    cfg = get_active_config()
    try:
        time.sleep(1)
        log = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['log_output'])
        time.sleep(1)
        devices = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['device_list'])
        time.sleep(1)
        info = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['network_config'])
        data = {
            'message': 'Data fetched from the router!',
            'status': 'Success',
            'network_log': log,
            'device_list': devices,
            'general_info': info
        }
        recreate_database()
        save_data_to_db(data)
    except Exception as e:
        data = {'message': 'Failed to fetch router data.', 'status': 'Error', 'error': str(e)}
    return jsonify(data)

# API Endpoint: /api/logs
@app.route('/api/logs', methods=['GET'])
def get_logs():
    cfg = get_active_config()
    try:
        time.sleep(1)
        logs = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['log_output'])
        return jsonify({'status': 'Success', 'logs': logs})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

# API Endpoint: /api/devices
@app.route('/api/devices', methods=['GET'])
def get_devices():
    cfg = get_active_config()
    try:
        dl = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['device_list'])
        devices = []
        for line in dl.strip().split('\n'):
            parts = line.split()
            if len(parts) >= 4:
                devices.append({
                    'lease_time': parts[0],
                    'mac_address': parts[1],
                    'ip_address': parts[2],
                    'hostname': parts[3]
                })
        return jsonify({'status': 'Success', 'devices': devices})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

# API Endpoint: /api/cpu_memory
@app.route('/api/cpu_memory', methods=['GET'])
def get_cpu_memory():
    cfg = get_active_config()
    try:
        cpu_out = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['cpu_usage'])
        time.sleep(1)
        mem_out = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['memory_usage'])
        # Parse CPU
        cpu_data = {}
        for part in cpu_out.split():
            if '%' in part:
                k, v = part.split('%')
                cpu_data[k] = v
        # Parse Memory
        lines = mem_out.strip().split('\n')
        mem_data = {}
        if len(lines) >= 2:
            headers = lines[0].split()
            values = lines[1].split()
            mem_data = dict(zip(headers, values))
        return jsonify({'status': 'Success', 'cpu': cpu_data, 'memory': mem_data})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

# API Endpoint: /api/wireless_clients
@app.route('/api/wireless_clients', methods=['GET'])
def get_wireless_clients():
    cfg = get_active_config()
    try:
        wc = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['wireless_clients'])
        return jsonify({'status': 'Success', 'wireless_clients': wc})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

# API Endpoint: /api/firewall_rules
@app.route('/api/firewall_rules', methods=['GET'])
def get_firewall_rules():
    cfg = get_active_config()
    try:
        fr = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['firewall_rules'])
        return jsonify({'status': 'Success', 'firewall_rules': fr})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

# API Endpoint: /api/uptime_load
@app.route('/api/uptime_load', methods=['GET'])
def get_uptime_load():
    cfg = get_active_config()
    try:
        ul = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['uptime_load'])
        return jsonify({'status': 'Success', 'uptime_load': ul})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

# API Endpoint: /api/network_config
@app.route('/api/network_config', methods=['GET'])
def get_network_config():
    cfg = get_active_config()
    try:
        nc = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['network_config'])
        return jsonify({'status': 'Success', 'network_config': nc})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

# API Endpoint: /api/bandwidth
@app.route('/api/bandwidth', methods=['GET'])
def get_bandwidth():
    cfg = get_active_config()
    try:
        bw = get_router_data_via_ssh(cfg['router_ip'], cfg['username'], cfg['password'], cfg['commands']['bandwidth'])
        lines = bw.strip().split('\n')[2:]
        data = []
        for line in lines:
            parts = line.split()
            if len(parts) >= 10:
                data.append({
                    'interface': parts[0].strip(':'),
                    'receive_bytes': int(parts[1]),
                    'transmit_bytes': int(parts[9])
                })
        return jsonify({'status': 'Success', 'bandwidth': data})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

# Database Operations: drop & recreate table, then save data
def recreate_database():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("DROP TABLE IF EXISTS router_info")
    c.execute("""
        CREATE TABLE router_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT,
            value TEXT
        )
    """)
    conn.commit()
    conn.close()

def save_data_to_db(data):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    for k, v in data.items():
        c.execute("INSERT INTO router_info (key, value) VALUES (?, ?)", (k, str(v)))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    app.run(debug=False)
