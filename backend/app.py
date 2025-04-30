import os
import io
import time
import re
import zipfile
import sqlite3

from flask import (
    Flask, jsonify, request,
    send_from_directory, send_file
)
from flask_cors import CORS

from getRouterData import (
    get_router_data_via_ssh,
    download_file_via_sftp,
    ssh_exec_with_errors
)
from config import (
    ROUTER_CONFIGS,
    DEFAULT_ROUTER,
    DATABASE,
    PCAP_DIR,
    PCAP_REMOTE_PATH
)

app = Flask(__name__)
CORS(app)

# Base script directory
BASE_DIR = os.path.dirname(__file__)
# PCAP storage absolute path
PCAP_PATH = os.path.join(BASE_DIR, PCAP_DIR)
os.makedirs(PCAP_PATH, exist_ok=True)

# Global state for selected router
current_router = DEFAULT_ROUTER


def get_active_config():
    """Return the config dict for the currently selected router."""
    return ROUTER_CONFIGS[current_router]


# ----------------------
# Core API Endpoints
# ----------------------

@app.route('/api/set_router', methods=['POST'])
def set_router():
    data = request.get_json() or {}
    router = (data.get('router') or '').strip().lower()
    if router not in ROUTER_CONFIGS:
        return jsonify({'error': 'Invalid router selected'}), 400

    # override connection params if provided
    for key in ('router_ip', 'username', 'password'):
        if data.get(key):
            ROUTER_CONFIGS[router][key] = data[key]

    global current_router
    current_router = router
    return jsonify({'message': f'Router set to {router}'}), 200


@app.route('/api/data', methods=['GET'])
def get_data():
    cfg = get_active_config()
    try:
        time.sleep(1)
        log = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['log_output']
        )
        time.sleep(1)
        devices = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['device_list']
        )
        time.sleep(1)
        info = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['network_config']
        )
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
        data = {
            'message': 'Failed to fetch router data.',
            'status': 'Error',
            'error': str(e)
        }
    return jsonify(data)


@app.route('/api/logs', methods=['GET'])
def get_logs():
    cfg = get_active_config()
    try:
        time.sleep(1)
        logs = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['log_output']
        )
        return jsonify({'status': 'Success', 'logs': logs})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})


@app.route('/api/devices', methods=['GET'])
def get_devices():
    cfg = get_active_config()
    try:
        raw = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['device_list']
        )
        devices = []
        for line in raw.strip().split('\n'):
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

@app.route('/api/cpu_memory', methods=['GET'])
def get_cpu_memory():
    cfg = get_active_config()
    try:
        cpu_out = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['cpu_usage']
        )
        time.sleep(1)
        mem_out = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['memory_usage']
        )

        cpu_data = {}
        for part in cpu_out.split():
            if '%' in part:
                k, v = part.split('%')
                cpu_data[k] = v

        lines = mem_out.strip().split('\n')
        mem_data = {}
        if len(lines) >= 2:
            headers = lines[0].split()
            values = lines[1].split()
            mem_data = dict(zip(headers, values))

        return jsonify({'status': 'Success', 'cpu': cpu_data, 'memory': mem_data})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

@app.route('/api/wireless_clients', methods=['GET'])
def get_wireless_clients():
    cfg = get_active_config()
    try:
        wc = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['wireless_clients']
        )
        return jsonify({'status': 'Success', 'wireless_clients': wc})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

@app.route('/api/firewall_rules', methods=['GET'])
def get_firewall_rules():
    cfg = get_active_config()
    try:
        fr = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['firewall_rules']
        )
        return jsonify({'status': 'Success', 'firewall_rules': fr})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

@app.route('/api/uptime_load', methods=['GET'])
def get_uptime_load():
    cfg = get_active_config()
    try:
        ul = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['uptime_load']
        )
        return jsonify({'status': 'Success', 'uptime_load': ul})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

@app.route('/api/network_config', methods=['GET'])
def get_network_config():
    cfg = get_active_config()
    try:
        nc = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['network_config']
        )
        return jsonify({'status': 'Success', 'network_config': nc})
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)})

@app.route('/api/bandwidth', methods=['GET'])
def get_bandwidth():
    cfg = get_active_config()
    try:
        bw = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'],
            cfg['commands']['bandwidth']
        )
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

# ----------------------
# PCAP Endpoints
# ----------------------

@app.route('/api/pcap/capture', methods=['POST'])
def pcap_capture():
    data = request.get_json() or {}
    duration = int(data.get('duration', 10))
    cfg = get_active_config()
    try:
        iface = cfg.get('pcap_interface', 'any')
        cmd = f"timeout {duration}s tcpdump -i {iface} -s 0 -w {PCAP_REMOTE_PATH}"
        code, err = ssh_exec_with_errors(
            cfg['router_ip'], cfg['username'], cfg['password'], cmd
        )
        if code not in (0, 124):
            raise Exception(f"tcpdump failed (exit {code}): {err}")

        timestamp = time.strftime('%Y%m%d-%H%M%S')
        fname = f"{current_router}-{timestamp}.pcap"
        local_path = os.path.join(PCAP_PATH, fname)
        download_file_via_sftp(
            cfg['router_ip'], cfg['username'], cfg['password'],
            PCAP_REMOTE_PATH, local_path
        )

        cleanup_cmd = f"rm -f {PCAP_REMOTE_PATH}"
        _, cleanup_err = ssh_exec_with_errors(
            cfg['router_ip'], cfg['username'], cfg['password'], cleanup_cmd
        )
        if cleanup_err:
            app.logger.warning(f"Failed to remove remote pcap: {cleanup_err}")

        return jsonify({'status': 'Success', 'filename': fname}), 200
    except Exception as e:
        app.logger.error('PCAP capture failed', exc_info=e)
        return jsonify({'status': 'Error', 'error': str(e)}), 500

@app.route('/api/pcap/stop', methods=['POST'])
def pcap_stop():
    """Stop ongoing tcpdump capture on router."""
    cfg = get_active_config()
    try:
        ssh_exec_with_errors(
            cfg['router_ip'], cfg['username'], cfg['password'],
            "killall tcpdump"
        )
        return jsonify({'status': 'Stopped'}), 200
    except Exception as e:
        return jsonify({'status': 'Error', 'error': str(e)}), 500

@app.route('/api/pcap/live', methods=['GET'])
def pcap_live():
    """Return most recent 20 packets from live tcpdump -n -c 20."""
    cfg = get_active_config()
    try:
        cmd = "tcpdump -l -n -c 20"
        raw = get_router_data_via_ssh(
            cfg['router_ip'], cfg['username'], cfg['password'], cmd
        )
        packets = []
        for line in raw.strip().split('\n'):
            parts = line.split()
            if len(parts) < 5:
                continue
            timestamp = parts[0]
            proto = parts[1]
            # src > dst :
            if '>' in parts:
                idx = parts.index('>')
                src = parts[idx-1]
                dst = parts[idx+1].rstrip(':')
            else:
                src, dst = '', ''
            length = ''
            m = re.search(r'length (\d+)', line)
            if m:
                length = m.group(1)
            packets.append({
                'timestamp': timestamp,
                'src': src,
                'dst': dst,
                'proto': proto,
                'len': length
            })
        return jsonify({'packets': packets}), 200
    except Exception as e:
        return jsonify({'packets': [], 'error': str(e)}), 500

@app.route('/api/pcap/list', methods=['GET'])
def pcap_list():
    files = sorted(os.listdir(PCAP_PATH))
    return jsonify({'files': files}), 200

@app.route('/api/pcap/download/<filename>', methods=['GET'])
def pcap_download_one(filename):
    return send_from_directory(PCAP_PATH, filename, as_attachment=True)

@app.route('/api/pcap/download', methods=['GET'])
def pcap_download_multiple():
    names = request.args.get('files', '')
    sel = [n for n in names.split(',') if n]
    mem_zip = io.BytesIO()
    with zipfile.ZipFile(mem_zip, 'w') as zf:
        for fname in sel:
            path = os.path.join(PCAP_PATH, fname)
            if os.path.isfile(path):
                zf.write(path, arcname=fname)
    mem_zip.seek(0)
    return send_file(mem_zip, download_name='pcaps.zip', as_attachment=True)

@app.route('/api/pcap/download/all', methods=['GET'])
def pcap_download_all():
    files = os.listdir(PCAP_PATH)
    mem_zip = io.BytesIO()
    with zipfile.ZipFile(mem_zip, 'w') as zf:
        for fname in files:
            zf.write(os.path.join(PCAP_PATH, fname), arcname=fname)
    mem_zip.seek(0)
    return send_file(mem_zip, download_name='all_pcaps.zip', as_attachment=True)

@app.route('/api/pcap', methods=['DELETE'])
def pcap_delete():
    files_param = request.args.get('files')
    deleted = 0
    if files_param:
        to_del = [n for n in files_param.split(',') if n]
    else:
        to_del = os.listdir(PCAP_PATH)
    for fname in to_del:
        path = os.path.join(PCAP_PATH, fname)
        if os.path.isfile(path):
            os.remove(path)
            deleted += 1
    return jsonify({'status': 'Success', 'deleted': deleted}), 200

# ----------------------
# Database Helpers
# ----------------------

def recreate_database():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('DROP TABLE IF EXISTS router_info')
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
        c.execute(
            'INSERT INTO router_info (key, value) VALUES (?, ?)',
            (k, str(v))
        )
    conn.commit()
    conn.close()


if __name__ == '__main__':
    app.run(debug=False)
