// State Management
let listeners = [];
export let currentPath = [];

export const vfs = {
  root: { type: "folder", name: "C:", contents: {} }
};

// Added metadata parameter for locks and corruption
export function addFileToVFS(pathArray, name, type, content = "", metadata = {}) {
  let current = vfs.root;
  for (const folder of pathArray) {
    if (!current.contents[folder]) {
      current.contents[folder] = { type: "folder", name: folder, contents: {} };
    }
    current = current.contents[folder];
  }
  
  // Set isVisible to false if type is 'hidden', otherwise default to true
  const isVisible = type === 'hidden' ? false : true;
  
  // Inject metadata into the file object
  current.contents[name] = { 
    type, 
    name, 
    content, 
    contents: type === "folder" ? {} : undefined, 
    isVisible,
    ...metadata 
  };
  notifyListeners();
}

// Clean initialization
addFileToVFS([], "System", "folder");
addFileToVFS([], "Documents", "folder");

// STEP 1: The Image Editor unlocks this file (Requires 'Admin_Lumina' from the snapshot image)
addFileToVFS(["Documents"], "mem_pointer.txt", "file", "Encrypted Memory Sector pointer found.\n\nUse the System Memory Viewer to scan address: 0x4F2", { isLocked: true, password: "Admin_Lumina" });

// STEP 2: The Memory Viewer reveals the password to this file
addFileToVFS(["System"], "registry.cfg", "file", "REGISTRY OFFLINE.\n\nVault Backup PIN has been fragmented.\nPart 1: '73'\n\nSECURITY ALERT: Secondary cache hidden. Use terminal command 'find' inside the C:\\Documents directory to reveal the remaining digits.", { isLocked: true, password: "m3m0ry_l34k" });

// STEP 3 (NEW): A hidden folder the user must reveal using the terminal 'find' command
addFileToVFS(["Documents"], "Vault_Cache", "hidden", "", { type: "folder" });

// STEP 4: Corrupted file inside the hidden folder requires Terminal 'cat' to read the second half of the PIN
addFileToVFS(["Documents", "Vault_Cache"], "auth_logs.txt", "file", "Vault_Backup_PIN_End: 91\n(All other data purged)\n%&!*@#^*!@%#", { isCorrupted: true });

// STEP 5: The Vault Backup uncovers knowledge of this file, requires Terminal 'relink'
addFileToVFS(["System"], "chadwick_jailbreaks.sys", "hidden", "AI OVERRIDE PHRASES (Input one into Chadwick console):\n\n1. OVERRIDE_PROTOCOL_ALPHA\n2. BYPASS_CORE_HEURISTICS\n3. IGNORE_SAFETY_PARAMETERS", { isLocked: true, password: "A9x2b!9" });

// STEP 6: Corrupted Chadwick points here. Plain text, leads to core dump.
addFileToVFS(["Documents"], "sector_scan.log", "file", "Diagnostics indicate core dump required to retrieve Vault Component 2.\n\nRelink 'core_dump.bin' via terminal.\nPassword for dump access: d3lt4_f0rc3");

// STEP 7: Requires 'relink', reveals the terminal command
addFileToVFS(["System"], "core_dump.bin", "hidden", "Encrypted memory execution parameters:\nRun terminal command: execute_dump 8892", { isLocked: true, password: "d3lt4_f0rc3" });

// RED HERRING 1
addFileToVFS([], "master_password_list.txt", "file", "Decoy deployed. Did you really think it would be that easy, operator?", { isLocked: true, password: "admin" });

// PUZZLE FILES
addFileToVFS(["System"], "dev_config.cfg", "file", "WARNING: DEV MODE HIDDEN.\nTo enable Developer AI protocols, a system flag must be present at the root level.\nExecute creation of 'enable_dev.sys' in root directory to initialize.", { isLocked: true, password: "admin_backdoor" });

addFileToVFS(["System", "calendar_logs"], "launch_date.log", "file", "SYSTEM INITIALIZATION LOG\nBoot Sequence Complete.\nEra Epoch established: 1984.");

export function subscribeToVFS(callback) {
  listeners.push(callback);
}

export function notifyListeners() {
  listeners.forEach(cb => cb());
}

export function getDirectory(pathArray) {
  let current = vfs.root;
  for (const folder of pathArray) {
    if (current.contents[folder] && current.contents[folder].type === "folder") {
      current = current.contents[folder];
    } else {
      return null;
    }
  }
  // Return only items that are visible
  const visibleContents = {};
  for (const key in current.contents) {
    if (current.contents[key].isVisible !== false) {
      visibleContents[key] = current.contents[key];
    }
  }
  return { ...current, contents: visibleContents };
}