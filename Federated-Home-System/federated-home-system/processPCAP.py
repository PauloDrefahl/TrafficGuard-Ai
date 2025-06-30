# Open the PCAP file
with open('smallFlows.pcap', 'r') as f:
    # Use the csv module to read the file
    reader = csv.reader(f, delimiter='\t')

    # Initialize a dictionary to store the protocol counts
    protocols = {'Protocol Type': 0,
                 'Duration': 0.0,
                 'Rate': 0.0,
                 'Drate': 0.0,
                 'fin_flag_number': 0.0,
                 'syn_flag_number': 0.0,
                 'psh_flag_number': 0.0,
                 'HTTP': 0.0,
                 'HTTPS': 0.0,
                 'DNS': 0.0,
                 'Telnet': 0.0,
                 'SMTP': 0.0,
                 'SSH': 0.0,
                 'IRC': 0.0,
                 'TCP': 0.0,
                 'UDP': 0.0,
                 'DHCP': 0.0,
                 'ARP': 0.0,
                 'ICMP': 0.0,
                 'IPv': 0.0}

    # Process each row in the file
    for row in reader:
        time = float(row[1])
        source = row[2]
        destination = row[3]
        protocol = row[4]
        length_info = row[5]

        # Update the protocol counts
        if protocol == 'tcp':
            protocols['TCP'] += 1
        elif protocol == 'udp':
            protocols['UDP'] += 1
        elif protocol in ['http', 'https']:
            protocols[protocol] += 1
        elif protocol == 'dns':
            protocols['DNS'] += 1
        elif protocol in ['telnet', 'smtp', 'ssh', 'irc']:
            protocols[protocol] += 1

    # Calculate the duration, rate, and drate
    total_time = sum([float(row[1]) for row in reader])
    protocols['Duration'] = total_time
    protocols['Rate'] = len(reader) / total_time
    protocols['Drate'] = 0.0

# Print the output
for key, value in protocols.items():
    print(f"{key}                  {value:.6f}")
