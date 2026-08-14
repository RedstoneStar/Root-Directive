import { vfs, getDirectory, addFileToVFS, subscribeToVFS } from './filesystem.js';

export function initFilesApp() {
  const fileGrid = document.getElementById("fileAppGrid");
  const pathBar = document.getElementById("filesAppPath");
  const contextMenu = document.getElementById("filesContextMenu");
  const backButton = document.getElementById("filesBackButton");
  let uiCurrentPath = [];

  // Back Button Logic
  backButton.addEventListener("click", () => {
    if (uiCurrentPath.length > 0) {
      uiCurrentPath.pop();
      renderFiles();
    }
  });

  function renderFiles() {
    fileGrid.innerHTML = "";
    pathBar.textContent = "C:\\" + uiCurrentPath.join("\\");
    
    // Toggle back button visibility based on path depth
    backButton.style.display = uiCurrentPath.length > 0 ? "inline-block" : "none";
    
    const dir = getDirectory(uiCurrentPath);

    for (const key in dir.contents) {
      const item = dir.contents[key];
      
      // FIX: Only render if the item is explicitly visible
      if (item.isVisible === false) continue;

      createIconDOM(item.name, item.type, () => {
        if (item.type === "folder") {
          uiCurrentPath.push(item.name);
          renderFiles();
        } else {
          window.dispatchEvent(new CustomEvent('openFileRequest', { detail: { file: item, path: [...uiCurrentPath] } }));
        }
      });
    }
  }

  function createIconDOM(name, type, onDoubleClick) {
    const el = document.createElement("div");
    el.className = "file-app-icon";
    el.innerHTML = `
      <div class="file-icon-symbol">${type === 'folder' ? '📁' : '📄'}</div>
      <div class="file-icon-name">${name}</div>
    `;
    el.addEventListener("dblclick", onDoubleClick);
    fileGrid.appendChild(el);
  }

  fileGrid.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenu.style.display = "block";
    const rect = fileGrid.getBoundingClientRect();
    contextMenu.style.left = (e.clientX - rect.left) + "px";
    contextMenu.style.top = (e.clientY - rect.top) + "px";
  });

  document.addEventListener("click", () => {
    contextMenu.style.display = "none";
  });

  document.getElementById("ctxNewFolder").addEventListener("click", () => {
    const name = prompt("Enter folder name:");
    if (name) addFileToVFS([...uiCurrentPath], name, "folder");
  });

  document.getElementById("ctxNewFile").addEventListener("click", () => {
    const name = prompt("Enter file name:");
    if (name) addFileToVFS([...uiCurrentPath], name, "file");
  });

  subscribeToVFS(renderFiles);
  renderFiles();
}