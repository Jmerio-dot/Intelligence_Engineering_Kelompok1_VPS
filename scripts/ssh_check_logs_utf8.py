import paramiko
import codecs

def run_remote_command(client, desc, cmd, outfile):
    outfile.write("\n==================================================\n")
    outfile.write(f"Executing: {desc}\n")
    outfile.write("==================================================\n")
    try:
        stdin, stdout, stderr = client.exec_command(cmd)
        out = stdout.read().decode('utf-8', errors='replace')
        err = stderr.read().decode('utf-8', errors='replace')
        if out:
            outfile.write(out + "\n")
        else:
            outfile.write("[No Output]\n")
        if err:
            outfile.write(f"\n[stderr]:\n{err}\n")
    except Exception as e:
        outfile.write(f"Failed to run command '{cmd}': {e}\n")

def main():
    host = "72.61.215.222"
    port = 22
    username = "root"
    password = "Sn+g?#827j52IKLjtf)0"
    
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        client.connect(host, port=port, username=username, password=password, timeout=10)
        
        with codecs.open("debug_logs.txt", "w", "utf-8") as f:
            # Mengambil log docker daemon saat pemadaman
            run_remote_command(client, "Docker service logs around 22:56 UTC", 
                "journalctl -u docker --since '2026-06-24 22:53:00' --until '2026-06-24 22:58:00' --no-pager", f)
            
            # Memfilter shutdown kontainer
            run_remote_command(client, "System journal messages about container stops/exits",
                "journalctl --since '2026-06-24 22:53:00' --until '2026-06-24 22:58:00' --no-pager | grep -E -i 'containerd|dockerd|exit|stop|kill' | grep -E -i 'kelompok_creation|datago|project_anti_gravity|postgres'", f)
            
        print("Investigation logs written to debug_logs.txt successfully.")
    except Exception as e:
        print(f"Connection failed: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    main()
