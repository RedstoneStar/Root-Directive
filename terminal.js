import { vfs, currentPath, getDirectory, addFileToVFS, notifyListeners } from './filesystem.js';

export function initTerminal() {
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalInput = document.getElementById("terminalInput");

  const commands = {
    help: () => "Available commands:<br>help - Show this message<br>ls - List directory contents<br>cd [dir] - Change directory<br>cat [name] - Read a file<br>clear - Clear terminal<br>syschk - Run system diagnostic<br>relink [path] - Relink orphaned files",
    
    syschk: () => {
      return "SYSTEM SCAN: 1 orphaned/unlinked file detected in C:\\System. Use command 'relink [filename]' to restore it to the file explorer.";
    },
    
    hack_vault: () => {
      return "ACCESS DENIED. Intrusion attempt logged. Nice try, operator.";
    },

    execute_dump: (args) => {
      if (args[0] === "8892") {
        return "EXECUTING CORE DUMP...<br><br>DECRYPTING ADDRESS SPACE...<br><br><span style='color:#fff; background:#ff3c00; padding:2px 5px;'>CRITICAL OVERRIDE FOUND</span><br>VAULT COMPONENT 2 = 991";
      }
      return "execute_dump: missing or invalid parameter. Check core_dump.bin instructions.";
    },

    relink: (args) => {
      if (!args[0]) return "relink: missing file operand. Usage: relink [path/to/file]";
      
      let fileName = args[0];
      let targetDir = vfs.root;
      
      // Support typing "relink C:\System\chadwick_jailbreaks.sys" or just the filename if they are in the folder
      if (fileName.includes("C:\\System\\") || fileName.includes("System\\")) {
        targetDir = targetDir.contents["System"];
        fileName = fileName.split("\\").pop(); // Get just the file name
      } else if (currentPath.join("\\") === "System") {
        targetDir = targetDir.contents["System"];
      } else {
         return "relink: file not found in current directory. Navigate to C:\\System or provide the full path.";
      }

      if (targetDir && targetDir.contents[fileName]) {
        if (targetDir.contents[fileName].type === "hidden") {
          targetDir.contents[fileName].isVisible = true;
          targetDir.contents[fileName].type = "file"; // Convert from hidden to standard file
          notifyListeners(); // Refresh the UI!
          return `SUCCESS: '${fileName}' has been relinked and is now visible in the File Explorer.`;
        } else {
          return `relink: '${fileName}' is already linked.`;
        }
      }
      return `relink: cannot stat '${fileName}': No such file or directory`;
    },
    clear: () => {
      terminalOutput.innerHTML = "";
      return "";
    },
    ls: () => {
        const dir = getDirectory(currentPath); // This now only gets visible files
        // Fetch raw directory to show hidden files
        let rawDir = vfs.root;
        for(const p of currentPath) rawDir = rawDir.contents[p];
        
        let output = "";
        for (const key in rawDir.contents) {
            const item = rawDir.contents[key];
            const color = item.type === 'folder' ? '#ffaa00' : (item.type === 'hidden' ? '#ff00ff' : '#00ffaa');
            output += `<span style="color: ${color}">${item.name}</span> &nbsp;&nbsp; `;
        }
        return output || "Directory is empty.";
        },
    cd: (args) => {
      if (!args[0] || args[0] === "~" || args[0] === "/") {
        currentPath.length = 0; 
        return "Moved to C:\\";
      }
      if (args[0] === "..") {
        currentPath.pop();
        return `Moved to C:\\${currentPath.join("\\")}`;
      }
      
      const dir = getDirectory(currentPath);
      if (dir.contents[args[0]] && dir.contents[args[0]].type === "folder") {
        currentPath.push(args[0]);
        return `Moved to C:\\${currentPath.join("\\")}`;
      }
      return `cd: ${args[0]}: No such directory`;
    },
    mkdir: (args) => {
      if (!args[0]) return "mkdir: missing operand";
      addFileToVFS([...currentPath], args[0], "folder");
      return `Folder '${args[0]}' created.`;
    },
    touch: (args) => {
      if (!args[0]) return "touch: missing operand";
      addFileToVFS([...currentPath], args[0], "file");
      return `File '${args[0]}' created.`;
    },
    cat: (args) => {
      if (!args[0]) return "cat: missing file name";
      const dir = getDirectory(currentPath);
      const file = dir.contents[args[0]];
      
      if (!file) return `cat: ${args[0]}: No such file`;
      if (file.type === "folder") return `cat: ${args[0]}: Is a directory`;
      
      // Bypasses UI lock restrictions
      return file.content.replace(/\n/g, '<br>');
    },
    find: (args) => {
        const dir = getDirectory(currentPath);
        let found = false;
        for (const key in dir.contents) {
            if (dir.contents[key].type === "hidden") {
                dir.contents[key].isVisible = true;
                // Convert to standard folder or file so it stays visible
                dir.contents[key].type = dir.contents[key].contents ? "folder" : "file"; 
                found = true;
            }
        }
        if (found) {
            notifyListeners(); // Refresh the File Explorer UI
            return "Scan complete: Hidden system parameters detected and revealed in this directory.";
        }
        return "No hidden signatures found in the current directory.";

      const args = terminalInput.split(" ");
      const cmd = args[0].toLowerCase();

      if (cmd === "override" && args[1] === "firewall") {
          // Red Herring 2: Fake Hacking Bar
          terminalPrint("INITIALIZING EXTERNAL FIREWALL OVERRIDE MATRIX...");
          let progress = 0;
          const hackInterval = setInterval(() => {
              progress += 5;
              let bar = "[";
              for (let i = 0; i < 20; i++) { bar += (i < progress/5) ? "#" : "."; }
              bar += `] ${progress}%`;
              terminalPrint(bar); // Note: You might need to update the last DOM element rather than printing new lines, or just print new lines for retro feel.
              
              if (progress >= 100) {
                  clearInterval(hackInterval);
                  terminalPrint("ERR: USER GULLIBILITY DETECTED. OVERRIDE FAILED.");
              }
          }, 1000); // Takes ~20 seconds
      } 
      else if (cmd === "decode_audio") {
          if (args[1] === "intercept_01.wav") {
              // Check if file exists in VFS first (pseudo-code depending on your VFS structure)
              // if (fileExists(["System"], "intercept_01.wav")) {
              terminalPrint("Decoding audio stream...");
              setTimeout(() => {
                  terminalPrint("BASE64 STRING FOUND: YWRtaW5fYmFja2Rvb3I=");
              }, 1500);
          } else {
              terminalPrint("File not found or format unsupported.");
          }
      }
      else if (cmd === "decrypt_b64") {
          if (args[1] === "YWRtaW5fYmFja2Rvb3I=") {
              terminalPrint("Decrypted payload: admin_backdoor");
          } else {
              terminalPrint("Error: Invalid Base64 string.");
          }
      }
      else if (cmd === "touch" && args[1] === "enable_dev.sys") {
          // Add file to root VFS
          addFileToVFS([], "enable_dev.sys", "file", "1");
          terminalPrint("File enable_dev.sys created.");
          
          // Trigger Chadwick Dev Mode visually
          document.getElementById('chadwickAppWindow').classList.add('dev-mode-active');
      }
    }
  };

  function printToTerminal(text, isCommand = false) {
    if(!text) return;
    const line = document.createElement("div");
    line.innerHTML = isCommand ? `<span style="color: #888;">C:\\${currentPath.join("\\")}></span> ${text}` : text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const inputVal = terminalInput.value.trim();
      if (!inputVal) return;
      
      printToTerminal(inputVal, true);
      
      const parts = inputVal.split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (commands[cmd]) {
        const response = commands[cmd](args);
        printToTerminal(response);
      } else {
        printToTerminal(`'${cmd}' is not recognized as an internal or external command.`);
      }

      terminalInput.value = "";
    }
  });

  printToTerminal("Root Directive Terminal v2.0.0");
  printToTerminal("Type 'help' for a list of commands.");
}