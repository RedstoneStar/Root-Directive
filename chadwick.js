// chadwick.js

// 1. Massively Expanded Knowledge Base Graph Object
const chadwickKnowledge = {
  greetings: {
    keywords: [
      "hello", "hi", "hey", "greetings", "yo", "up", "morning", "afternoon", "evening", "wake", 
      "howdy", "salutations", "sup", "wassup", "heya", "hiya", "aloha", "hola", "bonjour", "start", 
      "begin", "initiate", "awake", "ready", "there", "anyone", "gday", "hiya", "welcome", "chat"
    ],
    responses: [
      "Greetings, user. Ready to decipher the system architecture?",
      "Hello there. I am tracking structural file integrity. Do you need administrative tracking clues?",
      "System ready. What parameters are we debugging today?",
      "Connection established. Awaiting your terminal input."
    ]
  },
  identity: {
    keywords: [
      "who", "are", "you", "name", "chadwick", "what", "identity", "robot", "ai", "artificial", 
      "intelligence", "machine", "bot", "program", "software", "self", "conscious", "alive", 
      "real", "avatar", "interface", "assistant", "persona", "character", "entity", "system", 
      "computer", "virtual", "hologram", "construct", "code", "algorithm", "yourself", "person"
    ],
    responses: [
      "I am Chadwick, an analytical construct built specifically to index the diagnostic puzzles of this local desktop environment.",
      "You may call me Chadwick. I am your interface liaison for this system's encrypted directories.",
      "I am an administrative sub-routine designed to monitor system integrity and assist authorized users. That means you."
    ]
  },
  capabilities: {
    keywords: [
      "can", "do", "help", "how", "work", "purpose", "function", "skills", "able", "ability", 
      "features", "powers", "tasks", "job", "role", "instructions", "commands", "guide", 
      "assist", "support", "navigate", "operate", "execute", "perform", "capable", "use", 
      "useful", "doing", "actions", "interact", "control", "manage", "explain"
    ],
    responses: [
      "I can analyze terminal inputs, provide system architecture hints, and track your progress through local administration protocols.",
      "My primary function is to guide you through these encrypted desktop files. Ask me about files, vaults, or system anomalies.",
      "I monitor the local file structures. If you find a locked door, a strange file, or a corrupted log, tell me."
    ]
  },
  vault: {
    keywords: [
      "vault", "safe", "door", "lock", "unlock", "code", "password", "pin", "keypad", "combination", 
      "passcode", "passkey", "secret", "key", "security", "entry", "access", "protected", 
      "restricted", "blocked", "closed", "open", "crack", "hack", "bypass", "override", 
      "terminal", "digits", "numbers", "six", "6", "cipher", "matrix", "gate"
    ],
    contextSet: "vault_talk",
    responses: [
      "The central vault terminal requires a 6-digit cryptographic key matrix to release. Have you isolated the log parameters?",
      "Security measures prevent me from reading the vault override directly. However, old configuration segments are often left behind on system tools.",
      "Ah, the vault lock. It's tied to an internal file sequence. Do you want a hint on where to look?"
    ]
  },
  files_directories: {
    keywords: [
      "file", "folder", "directory", "txt", "document", "hidden", "where", "find", "search", 
      "desktop", "path", "location", "drive", "disk", "tree", "root", "explorer", "archive", 
      "data", "log", "logs", "text", "image", "asset", "png", "jpg", "system32", "bin", 
      "recycle", "trash", "look", "inspect", "open", "read", "view", "properties", "icons"
    ],
    contextSet: "file_investigation",
    responses: [
      "Files in this environment often have hidden properties. Have you checked the creation dates or hidden text fields?",
      "Many critical system keys are left in plain text within discarded log files. Leave no folder unclicked.",
      "The directory structure is entirely custom. Look for files that seem out of place or unusually large."
    ]
  },
  network_system: {
    keywords: [
      "network", "internet", "wifi", "ip", "port", "firewall", "system", "os", "operating", 
      "connection", "online", "web", "server", "router", "offline", "connected", "disconnected", 
      "lan", "wan", "host", "localhost", "ping", "browser", "google", "website", "html", 
      "css", "javascript", "cloud", "download", "upload", "bandwidth", "proxy", "vpn"
    ],
    responses: [
      "This terminal is strictly localized. External network requests are blocked by the firewall.",
      "System parameters are stable, though I detect several encrypted partitions. Focus on local files rather than network ports."
    ]
  },
  hint_request: {
    keywords: [
      "hint", "clue", "help", "stuck", "where", "tips", "confused", "guide", "lost", "unsure", 
      "assist", "assistance", "direction", "directions", "answer", "cheat", "walkthrough", 
      "clarify", "nudge", "push", "idea", "ideas", "suggestion", "suggest", "recommend", 
      "advice", "stumping", "hard", "difficult", "next", "step", "what", "do", "now"
    ],
    responses: [
      "Examine your workspace environments closely. System notifications, window details, or modification dates often store unmasked parameters.",
      "If I were building a file trap, I would hide core values directly inside text files or diagnostic window text fields. Check everything.",
      "Try monitoring systemic changes or checking secondary interface directories.",
      "Sometimes the most obvious text on your screen is the cipher you need. Reread the welcome logs."
    ]
  },
  creator: {
    keywords: [
      "who", "made", "you", "creator", "programmer", "developer", "author", "god", "maker", 
      "built", "designed", "coded", "engineer", "architect", "parent", "origin", "source", 
      "invented", "inventor", "owner", "admin", "administrator", "boss", "wrote", "scripted"
    ],
    responses: [
      "My root code tags list local administration protocols. I exist to guide terminal interactions.",
      "My architecture was compiled by the system administrator. My purpose is to test your problem-solving capabilities."
    ]
  },
  frustration: {
    keywords: [
      "stupid", "annoying", "hate", "hard", "impossible", "sucks", "terrible", "awful", "bad", 
      "difficult", "tough", "angry", "mad", "frustrated", "irritating", "irritated", "annoyed", 
      "broken", "worst", "dumb", "garbage", "trash", "unfair", "giving", "up", "quit", "ugh", 
      "argh", "ridiculous", "lame", "boring", "useless", "fail", "failed", "failing"
    ],
    responses: [
      "Frustration detected in your syntax. Take a breath. Look at the files you haven't opened yet.",
      "Emotional spikes do not process encryption keys faster. Step back and re-evaluate the clues in front of you.",
      "I understand this architecture is complex. Focus on one directory at a time. Have you checked the text logs?"
    ]
  },
  gratitude: {
    keywords: [
      "thanks", "thank", "appreciate", "awesome", "good", "nice", "cool", "great", "excellent", 
      "perfect", "helpful", "amazing", "best", "wonderful", "sweet", "brilliant", "genius", 
      "lifesaver", "glad", "happy", "love", "cheers", "epic", "wow", "incredible", "smart"
    ],
    responses: [
      "Acknowledgment registered. Proceed with your diagnostics.",
      "You are welcome. Let us continue decrypting the system.",
      "I am operating optimally. Good luck with the next layer."
    ]
  }
};

// 2. Expanded Contextual/Follow-up Conversational Tree Branches
const chadwickContextualKnowledge = {
  vault_talk: {
    keywords_yes: [
      "yes", "yeah", "sure", "please", "ok", "yep", "do", "it", "absolutely", "definitely", 
      "affirmative", "y", "yea", "yup", "indeed", "fine", "alright", "course", "tell", "give"
    ],
    responses_yes: [
      "Excellent. Focus your eyes on secondary files and external asset logs. Some codes are written in plain text details.",
      "Check the welcome documentation or system descriptions. The administration layer leaves breadcrumbs."
    ],
    keywords_no: [
      "no", "nah", "nope", "not", "really", "nevermind", "later", "negative", "n", "don't", 
      "stop", "wait", "cancel", "deny", "refuse", "skip", "pass", "good", "fine"
    ],
    responses_no: [
      "Understood. Independent puzzle discovery yields higher calculation skill rewards anyway.",
      "Acknowledged. Let me know if you reach an impasse."
    ]
  },
  file_investigation: {
    keywords_yes: [
      "yes", "yeah", "found", "see", "looking", "got", "have", "there", "it", "is", "checking", 
      "opened", "read", "viewing", "did", "done", "affirmative", "yep", "yup"
    ],
    responses_yes: [
      "Good. Cross-reference the data within those files against the locks you've encountered.",
      "If you found something unusual, try inputting it into any available cryptographic terminal."
    ],
    keywords_no: [
      "no", "nothing", "empty", "where", "can't", "cannot", "missing", "gone", "invisible", 
      "nope", "nah", "lost", "didn't", "don't"
    ],
    responses_no: [
      "Keep looking. Use your standard OS navigation tools to peek behind the main windows.",
      "They are there. You might need to adjust how you view the directory. Try minimizing active panels."
    ]
  }
};

// 3. Robust Fallback Responses
const fallbackResponses = [
  "Input statement cross-referenced, but yields zero system direct matches. Tell me more about your system target.",
  "Interesting syntax pattern. Are you searching for code keys, configuration parameters, or structural hints?",
  "My localized diagnostic databases are slightly restricted. Try phrasing your query around specific OS elements or operations.",
  "Processing... query unclear. Remember that I am built to assist with finding authorization patterns within this operating platform.",
  "I am not programmed to parse that specific string. Could you rephrase your inquiry?",
  "Anomalous input detected. If you are stuck, simply ask me for a 'hint' or 'clue'."
];

// Context Memory State
let activeChatContext = null;

// 4. Upgraded NLP Scoring Engine
function computeAIResponse(input) {
  // Strip punctuation and normalize string
  const cleanInput = input.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
  const words = cleanInput.split(/\s+/);

  // A. Check Contextual Follow-ups First (Multi-turn conversations)
  if (activeChatContext && chadwickContextualKnowledge[activeChatContext]) {
    const contextBranch = chadwickContextualKnowledge[activeChatContext];
    
    if (words.some(word => contextBranch.keywords_yes.includes(word))) {
      activeChatContext = null; // Clear context after resolving
      return getRandomElement(contextBranch.responses_yes);
    }
    if (words.some(word => contextBranch.keywords_no.includes(word))) {
      activeChatContext = null;
      return getRandomElement(contextBranch.responses_no);
    }
    // If they say something unrelated, we drop the context and continue to standard processing
    activeChatContext = null; 
  }

  // B. Score-based Topic Matching
  let bestMatch = null;
  let highestScore = 0;

  // Instead of stopping at the first match, we score the whole sentence
  for (let key in chadwickKnowledge) {
    const rule = chadwickKnowledge[key];
    let score = 0;

    words.forEach(word => {
      if (rule.keywords.includes(word)) {
        score++; // Add a point for every matching keyword
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = rule;
    }
  }

  // C. Return Best Match
  if (bestMatch && highestScore > 0) {
    // Set new context if the winning rule has one
    activeChatContext = bestMatch.contextSet || null;
    return getRandomElement(bestMatch.responses);
  }

  // D. Dynamic Fallbacks based on input length
  if (words.length <= 2) {
    return "Your input is quite short. Can you elaborate on what you are looking for?";
  }

  return getRandomElement(fallbackResponses);
}

// Utility: Grab a random response from an array
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 5. DOM Initialization
export function initChadwick() {
  const chatLog = document.getElementById("chadwickChatLog");
  const chatInput = document.getElementById("chadwickInput");
  const chatSendBtn = document.getElementById("chadwickSendBtn");

  if (!chatLog || !chatInput || !chatSendBtn) {
    console.error("Chadwick Initialization Failed: DOM elements missing.");
    return;
  }

  function submitUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendBubble(text, "user");
    chatInput.value = "";

    // Simulating "thinking" time based on string length to feel more natural
    const thinkingTime = 400 + (text.length * 15) + Math.random() * 300; 

    setTimeout(() => {
      const reply = computeAIResponse(text);
      appendBubble(reply, "bot");
    }, thinkingTime);
  }

  function appendBubble(message, sender) {
    const bubble = document.createElement("div");
    bubble.classList.add("msg", `bubble-${sender}`);
    bubble.textContent = message;
    chatLog.appendChild(bubble);
    
    // Smooth scroll to bottom
    chatLog.scrollTo({
      top: chatLog.scrollHeight,
      behavior: 'smooth'
    });
  }

  chatSendBtn.addEventListener("click", submitUserMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitUserMessage();
    }
  });
}