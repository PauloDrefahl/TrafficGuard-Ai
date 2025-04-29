import paramiko

def get_router_data_via_ssh(router_ip, username, password, command):
    """
    SSH into router and execute command; return stdout as string.
    """
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(router_ip, username=username, password=password)
    stdin, stdout, stderr = ssh.exec_command(command)
    output = stdout.read().decode()
    ssh.close()
    return output

def ssh_exec_with_errors(router_ip, username, password, command):
    """
    Execute command via SSH, return (exit_code, stderr_str).
    """
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(router_ip, username=username, password=password)
    stdin, stdout, stderr = ssh.exec_command(command)
    exit_code = stdout.channel.recv_exit_status()
    err = stderr.read().decode().strip()
    ssh.close()
    return exit_code, err

def download_file_via_sftp(router_ip, username, password, remote_path, local_path):
    """
    Fetch remote file by streaming over SSH (via 'cat'), then write to local_path.
    """
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(router_ip, username=username, password=password)

    # Stream binary file via 'cat'
    stdin, stdout, stderr = ssh.exec_command(f"cat {remote_path}")
    raw = stdout.read()           # bytes
    err = stderr.read().decode()  # error messages
    ssh.close()

    if not raw:
        raise Exception(f"No data from {remote_path}: {err}")

    # Write raw bytes to local file
    with open(local_path, "wb") as f:
        f.write(raw)
