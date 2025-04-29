# Per-router connection info and commands
ROUTER_CONFIGS = {
    "mango": {
        "router_ip": "192.168.8.1",
        "username": "root",
        "password": "goodlife",
        "commands": {
            "cpu_usage": "top -bn1 | grep 'CPU:'",
            "memory_usage": "free",
            "wireless_clients": "iw dev wlan0 station dump",
            "firewall_rules": "iptables -L -v",
            "uptime_load": "uptime",
            "network_config": "ifconfig",
            "device_list": "cat /tmp/dhcp.leases",
            "log_output": "logread",
            "bandwidth": "cat /proc/net/dev"
        },
        "pcap_interface": "br-lan"
    },
    "berylAX": {
        "router_ip": "192.168.8.1",
        "username": "root",
        "password": "goodlife",
        "commands": {
            "cpu_usage": "top -bn1 | grep 'CPU:'",
            "memory_usage": "free",
            "wireless_clients": "iw dev phy1-ap0 station dump",
            "firewall_rules": "iptables -L -v",
            "uptime_load": "uptime",
            "network_config": "ifconfig",
            "device_list": "cat /tmp/dhcp.leases",
            "log_output": "logread",
            "bandwidth": "cat /proc/net/dev"
        },
        "pcap_interface": "br-lan"
    }
}

# Default router
DEFAULT_ROUTER = "mango"

# SQLite database
DATABASE = "db/router_data.db"

# PCAP directory
PCAP_DIR = "pcaps"

# Router remote path for tcpdump
PCAP_REMOTE_PATH = "/tmp/capture.pcap"
