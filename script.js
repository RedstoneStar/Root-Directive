// Ensure DOM is fully loaded before attaching events
import { initChadwick } from './chadwick.js';
document.addEventListener("DOMContentLoaded", () => {

  var biggestIndex = 1; // Initialize the biggest z-index
  
  // --- Clock Logic ---
  const timeElement = document.querySelector("#timeElement");
  
  function updateTime() {
    timeElement.innerHTML = new Date().toLocaleString();
  }
  // Set initial time and update every second
  updateTime();
  setInterval(updateTime, 1000);

  // --- Draggable Logic ---
  dragElement(document.getElementById("welcomeWindow"));
  dragElement(document.getElementById("chadwickAppWindow"));

  function dragElement(element) {
    var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

    if (document.getElementById(element.id + "Header")) {
      document.getElementById(element.id + "Header").onmousedown = startDragging;
    } else {
      element.onmousedown = startDragging;
    }

    function startDragging(e) {
      e = e || window.event;
      e.preventDefault();
      initialX = e.clientX;
      initialY = e.clientY;
      document.onmouseup = stopDragging;
      document.onmousemove = elementDrag; // Fixed function call matching original intent
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

  // --- Selected Icon Logic ---
  var selectedIcon = undefined;

  function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}

  // --- Window Open/Close Logic ---

  function closeWindow(element) {
    element.style.display = "none";
  }

  function openWindow(element) {
    element.style.display = "flex";
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
  }

  // --- Welcome App Window Logic ---
  const welcomeWindow = document.querySelector("#welcomeWindow");
  const closeWelcomeWindow = document.querySelector("#closeWelcomeWindow");
  const openWelcomeWindow = document.querySelector("#openWelcomeWindow");

  openWelcomeWindow.addEventListener("click", function() {
    openWindow(welcomeWindow); 
  });

  closeWelcomeWindow.addEventListener("click", function() {
    closeWindow(welcomeWindow); 
  });

  
  // --- Chadwick App Window Logic ---
  const chadwickAppWindow = document.querySelector("#chadwickAppWindow");
  const closeChadwickAppWindow = document.querySelector("#closeChadwickAppWindow");
  const openChadwickAppWindow = document.querySelector("#openChadwickAppWindow");

  openChadwickAppWindow.addEventListener("click", function(e) {
    // Prevents the desktop click listener from instantly deselecting this icon
    e.stopPropagation(); 

    // If it's already selected, open the window and clear the selection
    if (openChadwickAppWindow.classList.contains("selected")) {
      openWindow(chadwickAppWindow);
      openChadwickAppWindow.classList.remove("selected");
    } else {
      // If it's not selected yet, select it
      openChadwickAppWindow.classList.add("selected");
    }
  });

  closeChadwickAppWindow.addEventListener("click", function() {
    closeWindow(chadwickAppWindow); 
  });

  // Click anywhere on the wallpaper/desktop to deselect the icon
  document.addEventListener("click", function() {
    openChadwickAppWindow.classList.remove("selected");
  });

  // -- Move the clicked window to the front by updating its z-index -- 
  function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
      handleWindowTap(element)
    )
  }
  function handleWindowTap(element) {
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
  }

  // Update list with every new window
  var topBar = document.querySelector("#top")
  addWindowTapHandling(welcomeWindow);
  addWindowTapHandling(chadwickAppWindow);

  // Initialize Chadwick AI Console
  initChadwick();

});

