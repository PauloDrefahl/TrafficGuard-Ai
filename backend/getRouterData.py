import paramiko
from config import ROUTER_IP, USERNAME, PASSWORD


def get_router_data_via_ssh(command, router_ip=ROUTER_IP, username=USERNAME, password=PASSWORD):
    """
    Connects to the router via SSH and executes given command.

    Parameters:
        command (str): Shell command to execute on the router.
        router_ip (str): IP address of the router.
        username (str): SSH username.
        password (str): SSH password.

    Returns:
        str: SSH command output, or error message if exception occurs.
    """
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(router_ip, username=username, password=password)
        stdin, stdout, stderr = ssh.exec_command(command)
        output = stdout.read().decode()
        ssh.close()
        return output
    except Exception as e:
        return f"Error: {e}"

# Optional test code
# if __name__ == "__main__":
#     sample_command = "logread"  # Or use COMMANDS["log_output"]
#     result = get_router_data_via_ssh(sample_command)
#     print("Command Output:", result)
