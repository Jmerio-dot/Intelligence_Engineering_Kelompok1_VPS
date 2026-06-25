import paramiko

def run_remote_command(client, desc, cmd):
    print(f"\nExecuting: {desc}")
    try:
        stdin, stdout, stderr = client.exec_command(cmd)
        out = stdout.read().decode('utf-8', errors='replace').strip()
        err = stderr.read().decode('utf-8', errors='replace').strip()
        if out:
            print(out)
        if err:
            print(f"Error: {err}")
    except Exception as e:
        print(f"Failed to run command '{cmd}': {e}")

def main():
    host = "72.61.215.222"
    port = 22
    username = "root"
    password = "Sn+g?#827j52IKLjtf)0"
    
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        client.connect(host, port=port, username=username, password=password, timeout=10)
        
        # 1. Start Kelompok Creation
        run_remote_command(client, "Starting kelompok_creation", 
            "cd /root/ws2024/kelompok_creation && docker compose up -d")
            
        # 2. Start Datago
        run_remote_command(client, "Starting Datago", 
            "cd /root/ws2024/Datago/datago && docker compose up -d")
            
        # 3. Start Project Anti Gravity
        run_remote_command(client, "Starting Project Anti Gravity", 
            "cd /root/ws2024/pemrograman-web-/Project_anti_gravity && docker compose up -d")
            
        # 4. Start Intelligence Engineering
        run_remote_command(client, "Starting Intelligence Engineering", 
            "cd /root/ws2024/Intelligence_Engineering_Kelompok1_VPS && docker compose up -d")
            
    except Exception as e:
        print(f"Connection failed: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    main()
