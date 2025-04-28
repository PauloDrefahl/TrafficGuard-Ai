import paramiko


def get_router_data_via_ssh(router_ip, username, password, command):
    """
    SSH into router and execute command.
    Returns stdout as string or raises exception.
    """
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(router_ip, username=username, password=password)
    stdin, stdout, stderr = ssh.exec_command(command)
    output = stdout.read().decode()
    ssh.close()
    return output
