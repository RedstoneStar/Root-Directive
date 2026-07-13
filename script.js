import { initChadwick } from './chadwick.js';

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
  const windowsToDrag = ["welcomeWindow", "chadwickAppWindow", "vaultAppWindow", "imageEditorWindow"];
  windowsToDrag.forEach(id => {
    const el = document.getElementById(id);
    if(el) dragElement(el);
  });

  function dragElement(element) {
    var initialX = 0, initialY = 0, currentX = 0, currentY = 0;
    const header = document.getElementById(element.id + "Header");
    
    if (header) {
      header.onmousedown = startDragging;
    } else {
      element.onmousedown = startDragging;
    }

    function startDragging(e) {
      e = e || window.event;
      // Don't drag if clicking the close button
      if(e.target.classList.contains('closeButton')) return;
      
      e.preventDefault();
      initialX = e.clientX;
      initialY = e.clientY;
      document.onmouseup = stopDragging;
      document.onmousemove = elementDrag; 
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      currentX = initialX - e.clientX;
      currentY = initialY - e.clientY;
      initialX = e.clientX;
      initialY = e.clientY;
      
      element.style.top = (element.offsetTop - currentY) + "px";
      element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
      document.onmouseup = null;
      document.onmousemove = null;
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
  
  // Custom close hook for Welcome Window (since button isn't an icon)
  document.getElementById("closeWelcomeWindow").addEventListener("click", () => {
    closeWindow(document.getElementById("welcomeWindow"));
  });
  document.getElementById("openWelcomeWindow").addEventListener("click", () => {
    openWindow(document.getElementById("welcomeWindow"));
  });
  
  // Custom close for Image Editor
  document.getElementById("closeImageEditorWindow").addEventListener("click", () => {
    closeWindow(document.getElementById("imageEditorWindow"));
  });

  // --- Vault Code Input Logic ---
  const vaultInputs = document.querySelectorAll('.vault-digit');
  const vaultMsg = document.getElementById('vaultStatusMessage');
  
  vaultInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      // Auto-advance to next box
      if (e.target.value.length === 1 && index < vaultInputs.length - 1) {
        vaultInputs[index + 1].focus();
      }
      checkVaultCode();
    });
    
    input.addEventListener('keydown', (e) => {
      // Backspace moves to previous box
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        vaultInputs[index - 1].focus();
      }
    });
  });

  function checkVaultCode() {
    const code = Array.from(vaultInputs).map(i => i.value).join('');
    if (code.length === 6) {
      if (code === '000000') {
        vaultMsg.textContent = 'ACCESS GRANTED. OVERRIDE SUCCESSFUL.';
        vaultMsg.style.color = '#00ffaa'; // Green
      } else {
        vaultMsg.textContent = 'ERROR: INVALID OVERRIDE CODE';
        vaultMsg.style.color = '#ff3c00'; // Red
      }
    } else {
      vaultMsg.textContent = 'AWAITING INPUT...';
      vaultMsg.style.color = '#ffaa00'; // Orange
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
          <div style="width: 100px; height: 100px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8));">
            <img src="./CodeSymbol.png" style="width: 100%; height: 100%; object-fit: contain;" />
          </div>
          <p class="iconText">Clue_01.png</p>
        `;
        
        document.getElementById("desktopIcons").appendChild(iconDiv);

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
    // We want opacity to be 1 when total is 0, and 0 when total is 200.
    const total = parseInt(br) + parseInt(ct);
    const revealProgress = 1 - (total / 200); 
    
    hiddenText.style.opacity = revealProgress;
  }

  brSlider.addEventListener("input", updateEditorFilter);
  ctSlider.addEventListener("input", updateEditorFilter);

  // Initialize Chadwick AI Console
  initChadwick();
});