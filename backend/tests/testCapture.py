import requests

BASE = "http://127.0.0.1:5000"

def main():
    # 5-second capture
    res = requests.post(f"{BASE}/api/pcap/capture", json={'duration': 5})
    print("Status Code:", res.status_code)
    print("Content-Type:", res.headers.get('Content-Type'))

    try:
        data = res.json()
        print("JSON Response:", data)
    except ValueError:
        print("Non-JSON response body:\n", res.text)
        return

    # List files
    res2 = requests.get(f"{BASE}/api/pcap/list")
    try:
        print("Available PCAPs:", res2.json())
    except ValueError:
        print("List endpoint returned non-JSON:\n", res2.text)

if __name__ == "__main__":
    main()
