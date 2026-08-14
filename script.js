import { initChadwick } from './chadwick.js';
import { initTerminal } from './terminal.js';
import { initFilesApp } from './filesApp.js';
window.dynamicVaultKey = Math.floor(1000 + Math.random() * 9000).toString();

document.addEventListener("DOMContentLoaded", () => {
  var biggestIndex = 1; 
  const topBar = document.querySelector("#topBar");
  
  // --- Clock Logic ---
  const timeElement = document.querySelector("#timeElement");
  function updateTime() {
    timeElement.innerHTML = new Date().toLocaleString();
  }
  updateTime();
  setInterval(updateTime, 1000);

  // --- Draggable Logic ---

  // List of window IDs to make draggable (update every time new window is added)
  const windowsToDrag = [
    "welcomeWindow", "chadwickAppWindow", "vaultAppWindow", "imageEditorWindow", 
    "terminalAppWindow", "filesAppWindow", "textEditorWindow", "vaultBackupAuthWindow", 
    "corruptFileWindow", "filePasswordWindow", "memoryAppWindow", "commLinkWindow"
  ];
  windowsToDrag.forEach(id => {
    const el = document.getElementById(id);
    if(el) dragElement(el);
  });

  function dragElement(element) {
    var shiftX = 0, shiftY = 0;
    const header = document.getElementById(element.id + "Header");
    
    if (header) {
      header.onmousedown = startDragging;
    } else {
      element.onmousedown = startDragging;
    }

    function startDragging(e) {
      e = e || window.event;
      // Don't drag if clicking a close button or typing in an input
      if (e.target.classList.contains('closeButton') || e.target.tagName === 'INPUT') return;
      
      e.preventDefault();
      
      // Calculate exactly where inside the element the user clicked
      // so it doesn't snap its top-left corner to the cursor
      shiftX = e.clientX - element.getBoundingClientRect().left;
      shiftY = e.clientY - element.getBoundingClientRect().top;
      
      // Attach listeners globally to the window so fast mouse movements don't break tracking
      window.addEventListener('mousemove', elementDrag);
      window.addEventListener('mouseup', stopDragging);
    }

    function elementDrag(e) {
      e = e || window.event;
      
      // Directly map the absolute top/left placement coordinates 
      let leftPos = e.clientX - shiftX;
      let topPos = e.clientY - shiftY;
      
      // Bound the window roughly to the viewable desktop arena
      // This prevents players from dragging elements completely off-screen
      topPos = Math.max(40, topPos); // Keep below your topBar height
      
      element.style.left = leftPos + "px";
      element.style.top = topPos + "px";
    }

    function stopDragging() {
      window.removeEventListener('mousemove', elementDrag);
      window.removeEventListener('mouseup', stopDragging);
    }
  }

  // --- Window Z-Index Management ---
  function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () => {
      biggestIndex++;
      element.style.zIndex = biggestIndex;
      topBar.style.zIndex = biggestIndex + 1;
    });
  }

  function openWindow(element) {
    element.style.display = "flex";
    biggestIndex++;  
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
  }

  function closeWindow(element) {
    element.style.display = "none";
  }

  // Bind all windows
  windowsToDrag.forEach(id => {
    const el = document.getElementById(id);
    if(el) addWindowTapHandling(el);
  });

  // --- Icon Tap Logic Framework ---
  function setupAppIcon(iconId, windowId) {
    const iconEl = document.getElementById(iconId);
    const windowEl = document.getElementById(windowId);
    const closeBtn = document.getElementById("close" + windowId.charAt(0).toUpperCase() + windowId.slice(1));
    
    if(!iconEl || !windowEl) return;

    iconEl.addEventListener("click", function(e) {
      e.stopPropagation(); 
      if (iconEl.classList.contains("selected")) {
        openWindow(windowEl);
        iconEl.classList.remove("selected");
      } else {
        // Deselect others first
        document.querySelectorAll('.modalAppIcon').forEach(i => i.classList.remove('selected'));
        iconEl.classList.add("selected");
      }
    });

    if(closeBtn) {
      closeBtn.addEventListener("click", () => closeWindow(windowEl));
    }
  }

  // Desktop click deselects all icons
  document.addEventListener("click", function() {
    document.querySelectorAll('.modalAppIcon').forEach(i => i.classList.remove('selected'));
  });

  // Initialize standard apps
  setupAppIcon("openWelcomeWindow", "welcomeWindow"); // From top bar
  setupAppIcon("openChadwickAppWindow", "chadwickAppWindow");
  setupAppIcon("openVaultAppWindow", "vaultAppWindow");
  setupAppIcon("openTerminalAppWindow", "terminalAppWindow");
  setupAppIcon("openFilesAppWindow", "filesAppWindow");
  setupAppIcon("openMemoryAppWindow", "memoryAppWindow");
  setupAppIcon("openCommLinkWindow", "commLinkWindow");


  document.getElementById("closeMemoryAppWindow").addEventListener("click", () => {
    closeWindow(document.getElementById("memoryAppWindow"));
  });

  document.getElementById("closeWelcomeWindow").addEventListener("click", () => {
    closeWindow(document.getElementById("welcomeWindow"));
  });
  document.getElementById("openWelcomeWindow").addEventListener("click", () => {
    openWindow(document.getElementById("welcomeWindow"));
  });
  

  document.getElementById("closeImageEditorWindow").addEventListener("click", () => {
    closeWindow(document.getElementById("imageEditorWindow"));
  });

// --- Vault Code Input Logic ---
  const vaultInputs = document.querySelectorAll('#vaultAppWindow .vault-digit'); // FIX: Isolate the 6 main vault boxes
  const vaultMsg = document.getElementById('vaultStatusMessage');
  
  vaultInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < vaultInputs.length - 1) {
        vaultInputs[index + 1].focus();
      }
      checkVaultCode();
    });
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        vaultInputs[index - 1].focus();
      }
    });
  });

  function checkVaultCode() {
    const code = Array.from(vaultInputs).map(i => i.value).join('');
    if (code.length === 6) {
      if (code === '824991') { 
        vaultMsg.textContent = `ACCESS DENIED. REDIRECTING NODE...<br>REMOTE SERVER IP: <span style='color:#00ffcc;'>192.168.4.88</span>`;
        vaultMsg.style.color = '#00ffaa'; 
      } else {
        vaultMsg.textContent = 'ERROR: INVALID OVERRIDE CODE';
        vaultMsg.style.color = '#ff3c00'; 
      }
    } else {
      vaultMsg.textContent = 'AWAITING INPUT...';
      vaultMsg.style.color = '#ffaa00';
    }
  }


  // Drag-and-Drop Logic for image - Clue #1

  const dragImg = document.getElementById("welcomeDragImage");
  const desktop = document.body;

  dragImg.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "clueImage");
  });

  desktop.addEventListener("dragover", (e) => {
    e.preventDefault(); // Required to allow dropping
  });

  desktop.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    
    if (data === "clueImage") {
      // Prevent duplicates if they drag it again
      if (document.getElementById("clueDesktopIcon")) return; 

      // Grid Snapping Math (100px increments)
      const snap = 100;
      let gridX = Math.floor(e.clientX / snap) * snap;
      let gridY = Math.floor(e.clientY / snap) * snap;

      // Keep it within screen bounds roughly
      gridX = Math.max(10, Math.min(gridX, window.innerWidth - 120));
      gridY = Math.max(60, Math.min(gridY, window.innerHeight - 150));

      // 1. Show Downloading Animation
      const loadingSign = document.createElement("div");
      loadingSign.className = "downloading-sign";
      loadingSign.textContent = "Downloading...";
      loadingSign.style.left = gridX + "px";
      loadingSign.style.top = gridY + "px";
      desktop.appendChild(loadingSign);

      // 2. Wait 2 seconds, remove animation, and spawn icon
      setTimeout(() => {
        loadingSign.remove();

        // Create Icon Element
        const iconDiv = document.createElement("div");
        iconDiv.id = "clueDesktopIcon";
        iconDiv.className = "modalAppIcon";
        iconDiv.style.position = "absolute";
        iconDiv.style.left = gridX + "px";
        iconDiv.style.top = gridY + "px";
        iconDiv.style.width = "max-content";
        iconDiv.style.textAlign = "center";
        iconDiv.innerHTML = `
          <div id="clueDesktopIconHeader" style="width: 100px; height: 100px; background-image: url('./CodeSymbol.png'); background-size: contain; background-repeat: no-repeat; background-position: center; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8)); cursor: move;"></div>
          <p class="iconText">sys_snapshot.png</p>
        `;
        
        document.getElementById("desktopIcons").appendChild(iconDiv);
        
        // Make the icon draggable
        dragElement(iconDiv);

        // Bind Icon click/double-click logic
        iconDiv.addEventListener("click", (ev) => {
          ev.stopPropagation();
          if (iconDiv.classList.contains("selected")) {
            openWindow(document.getElementById("imageEditorWindow"));
            iconDiv.classList.remove("selected");
          } else {
            document.querySelectorAll('.modalAppIcon').forEach(i => i.classList.remove('selected'));
            iconDiv.classList.add("selected");
          }
        });

      }, 1800); // 1.8 second download time
    }
  });


  // IMAGE EDITOR LOGIC
  const brSlider = document.getElementById("brightnessSlider");
  const ctSlider = document.getElementById("contrastSlider");
  const canvasImg = document.getElementById("editorCanvasImage");
  const hiddenText = document.getElementById("hiddenClueText");

  function updateEditorFilter() {
    const br = brSlider.value; // 0 to 100
    const ct = ctSlider.value; // 0 to 100

    // Apply CSS filters to the image
    canvasImg.style.filter = `brightness(${br}%) contrast(${ct}%)`;

    // Reveal Logic: 
    // Max values = 200 total (100 br + 100 ct). Min values = 0 total.
    // Want opacity to be 1 when total is 0, and 0 when total is 200.
    const total = parseInt(br) + parseInt(ct);
    const revealProgress = 1 - (total / 200); 
    
    hiddenText.style.opacity = revealProgress;
  }

  brSlider.addEventListener("input", updateEditorFilter);
  ctSlider.addEventListener("input", updateEditorFilter);

  // --- New Modal Close Hooks ---
  document.getElementById("closeTextEditorWindow").addEventListener("click", () => closeWindow(document.getElementById("textEditorWindow")));
  document.getElementById("closeVaultBackupAuthWindow").addEventListener("click", () => closeWindow(document.getElementById("vaultBackupAuthWindow")));
  document.getElementById("closeCorruptFileWindow").addEventListener("click", () => closeWindow(document.getElementById("corruptFileWindow")));
  document.getElementById("closeFilePasswordWindow").addEventListener("click", () => closeWindow(document.getElementById("filePasswordWindow")));

  // --- Vault Backups Tab Logic ---
  const vaultTab = document.getElementById("vaultBackupsTab");
  if(vaultTab) {
    vaultTab.addEventListener("click", () => {
      openWindow(document.getElementById("vaultBackupAuthWindow"));
    });
  }

  // --- 4-Digit Backup Vault Auth ---
  const backupInputs = document.querySelectorAll('.backup-digit');
  const backupMsg = document.getElementById('backupStatusMessage');
  
  backupInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < backupInputs.length - 1) {
        backupInputs[index + 1].focus();
      }
      checkBackupCode();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        backupInputs[index - 1].focus();
      }
    });
  });

  function checkBackupCode() {
    const code = Array.from(backupInputs).map(i => i.value).join('');
    if (code.length === 4) {
      if (code === '7391') { 
        backupMsg.textContent = "SUCCESS. DECRYPTING NEXT TARGET...";
        backupMsg.style.color = '#00ffaa';
        setTimeout(() => {
          backupMsg.innerHTML = "CLUE GENERATED:<br/>Use terminal to run: 'relink chadwick_jailbreaks.sys'<br/>Encryption Key: A9x2b!9";
          backupMsg.style.color = '#ffaa00';
        }, 3000);
      } else {
        backupMsg.textContent = 'ERROR: INVALID PIN';
        backupMsg.style.color = '#ff3c00';
      }
    } else {
      backupMsg.textContent = '';
    }
  }

  // --- File Opening System & Text Editor ---
  let activeEditingFile = null;
  let activeEditingPath = null;
  const textEditorContent = document.getElementById("textEditorContent");
  const textEditorTitle = document.getElementById("textEditorTitle");
  let fileToUnlock = null;

  window.addEventListener('openFileRequest', (e) => {
    const file = e.detail.file;
    const path = e.detail.path;

    if (file.isCorrupted) {
      openWindow(document.getElementById("corruptFileWindow"));
      return;
    }

    if (file.isLocked) {
      fileToUnlock = file;
      document.getElementById("filePasswordInput").value = "";
      openWindow(document.getElementById("filePasswordWindow"));
      return;
    }

    // Normal Text File Execution
    openTextEditor(file, path);
  });

  // Password Unlock Logic
  document.getElementById("submitFilePassword").addEventListener("click", () => {
    const passInput = document.getElementById("filePasswordInput").value;
    if (fileToUnlock && passInput === fileToUnlock.password) {
      // Temporarily unlock for this session
      fileToUnlock.isLocked = false; 
      closeWindow(document.getElementById("filePasswordWindow"));
      openTextEditor(fileToUnlock, [...currentPath]); // Or pass the correct path if strictly required
    } else {
      document.getElementById("filePasswordInput").style.borderColor = "#ff3c00";
    }
  });

  function openTextEditor(file, path) {
    activeEditingFile = file;
    activeEditingPath = path;
    textEditorTitle.textContent = file.name;
    textEditorContent.value = file.content;
    openWindow(document.getElementById("textEditorWindow"));
  }

  // Save functionality
  document.getElementById("saveTextEditor").addEventListener("click", () => {
    if (activeEditingFile) {
      activeEditingFile.content = textEditorContent.value;
      const btn = document.getElementById("saveTextEditor");
      btn.textContent = "Saved!";
      setTimeout(() => { btn.textContent = "Save"; }, 1500);
    }
  });

  // --- Memory Viewer Logic ---
  const memBtn = document.getElementById("memoryGoBtn");
  const memInput = document.getElementById("memoryAddressInput");
  const memOutput = document.getElementById("memoryOutput");

  memBtn.addEventListener("click", () => {
    const address = memInput.value.trim().toLowerCase();
    memOutput.innerHTML = "Scanning memory registers...\n\n";
    
    setTimeout(() => {
      if (address === "0x4f2") {
        memOutput.innerHTML += `0x4F2: 6D 33 6D 30 72 79 5F 6C | m3m0ry_l34k\n`;
        memOutput.innerHTML += `0x4FA: 33 34 6B 00 00 00 00 00 | 34k.....\n`;
        memOutput.innerHTML += `0x502: 00 00 00 00 00 00 00 00 | ........\n`;
        memOutput.innerHTML += `\n> TARGET LOCATED.\n> USE PASSWORD TO UNLOCK: C:\\System\\registry.cfg`;
      } else {
        // Generate fake hex dump
        let dump = "";
        for(let i=0; i<10; i++) {
          dump += `0x${(Math.random()*0xFFFF).toString(16).toUpperCase().padStart(4, '0')}: `;
          for(let j=0; j<8; j++) dump += `${(Math.random()*255).toString(16).toUpperCase().padStart(2, '0')} `;
          dump += `| ........\n`;
        }
        memOutput.innerHTML += dump + "\n> NO READABLE FRAGMENTS FOUND.";
      }
    }, 800);
  });

  document.getElementById('commInterceptBtn').addEventListener('click', () => {
    const ip = document.getElementById('commInput').value.trim();
    const output = document.getElementById('commOutput');
    
    if (ip === "192.168.4.88") {
        output.innerText = "Intercepting packets... SUCCESS.\nFile downloaded to C:\\System\\intercept_01.wav";
        
        // Add the corrupted audio file to the VFS
        addFileToVFS(["System"], "intercept_01.wav", "file", "ERR_RAW_AUDIO_UNREADABLE");
        
        // Refresh your file explorer UI here if you have a function for it (e.g., renderFiles())
    } else {
        output.innerText = "Connection timed out. No packets intercepted.";
    }
    // Memory Viewer Logic
    document.getElementById('memoryViewerBtn').addEventListener('click', () => { // adjust IDs to match yours
        const memInput = document.getElementById('memoryInput').value.trim();
        if (memInput === "1984") {
            document.getElementById('memoryOutput').innerHTML = "FRAGMENT 1: #3A<br>FRAGMENT 2: #F2<br>FRAGMENT 3: #9C<br>AWAITING VISUAL ALIGNMENT.";
        }
    });

    // Image Editor Hex Logic
    document.getElementById('alignHexBtn').addEventListener('click', () => {
        const h1 = document.getElementById('hex1').value.trim().toUpperCase();
        const h2 = document.getElementById('hex2').value.trim().toUpperCase();
        const h3 = document.getElementById('hex3').value.trim().toUpperCase();
        
        if (h1 === "#3A" && h2 === "#F2" && h3 === "#9C") {
            document.getElementById('hexResultDisplay').innerText = "ALIGNMENT SUCCESSFUL. FINAL VAULT CODE: 84920173";
        } else {
            document.getElementById('hexResultDisplay').innerText = "ERR: SHAPES MISALIGNED.";
        }
    });
  });

  
  // Initialize Applications
  initChadwick();
  initTerminal();
  initFilesApp();
});
