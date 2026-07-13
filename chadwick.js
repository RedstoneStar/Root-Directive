// chadwick.js

// 1. Knowledge Base Graph Object
const chadwickKnowledge = {
  greetings: {
    keywords: ["hello", "hi", "hey", "greetings", "yo", "up"],
    responses: [
      "Greetings, user. Ready to decipher the system architecture?",
      "Hello there. I am tracking structural file integrity. Do you need administrative tracking clues?",
      "System ready. What parameters are we debugging today?"
    ]
  },
  vault: {
    keywords: ["vault", "safe", "door", "lock", "unlock", "code", "password"],
    contextSet: "vault_talk",
    responses: [
      "The central vault terminal requires a 6-digit cryptographic key matrix to release. Have you isolated the log parameters?",
      "Security measures prevent me from reading the vault override directly. However, old configuration segments are often left behind on system tools.",
      "Ah, the lock. It's tied to an internal file sequence. Do you want a hint on where to look?"
    ]
  },
  hint_request: {
    keywords: ["hint", "clue", "help", "stuck", "where", "tips"],
    responses: [
      "Examine your workspace environments closely. System notifications, window details, or modification dates often store unmasked parameters.",
      "If I were building a file trap, I would hide core values directly inside text files or diagnostic window text fields. Check everything.",
      "Try monitoring systemic changes or checking secondary interface directories."
    ]
  },
  creator: {
    keywords: ["who made you", "creator", "programmer", "developer", "author"],
    responses: [
      "I am an analytical construct built specifically to index the diagnostic puzzles of this local desktop environment.",
      "My root code tags list local administration protocols. I exist to guide terminal interactions."
    ]
  }
};

// 2. Contextual/Follow-up Conversational Tree Branches
const chadwickContextualKnowledge = {
  vault_talk: {
    keywords_yes: ["yes", "yeah", "sure", "please", "ok", "yep"],
    responses_yes: [
      "Excellent. Focus your eyes on secondary files and external asset logs. Some codes are written in plain text details.",
      "Check the welcome documentation or system descriptions. The administration layer leaves breadcrumbs."
    ],
    keywords_no: ["no", "nah", "nope", "not really"],
    responses_no: [
      "Understood. Independent puzzle discovery yields higher calculation skill rewards anyway.",
      "Acknowledged. Let me know if you reach an impasse."
    ]
  }
};

// 3. Fallback Responses
const fallbackResponses = [
  "Input statement cross-referenced, but yields zero system direct matches. Tell me more about your system target.",
  "Interesting syntax pattern. Are you searching for code keys, configuration parameters, or structural hints?",
  "My localized diagnostic databases are slightly restricted. Try phrasing your query around specific OS elements or operations.",
  "Processing... query unclear. Remember that I am built to assist with finding authorization patterns within this operating platform."
];

let activeChatContext = null;

function computeAIResponse(input) {
  const cleanInput = input.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
  const words = cleanInput.split(/\s+/);

  if (activeChatContext && chadwickContextualKnowledge[activeChatContext]) {
    const contextBranch = chadwickContextualKnowledge[activeChatContext];
    if (words.some(word => contextBranch.keywords_yes.includes(word))) {
      activeChatContext = null;
      return getRandomElement(contextBranch.responses_yes);
    }
    if (words.some(word => contextBranch.keywords_no.includes(word))) {
      activeChatContext = null;
      return getRandomElement(contextBranch.responses_no);
    }
  }

  for (let key in chadwickKnowledge) {
    const rule = chadwickKnowledge[key];
    if (words.some(word => rule.keywords.includes(word))) {
      if (rule.contextSet) {
        activeChatContext = rule.contextSet;
      } else {
        activeChatContext = null;
      }
      return getRandomElement(rule.responses);
    }
  }

  return getRandomElement(fallbackResponses);
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Wrap the DOM setup code in an exported function so script.js can boot it up
export function initChadwick() {
  const chatLog = document.getElementById("chadwickChatLog");
  const chatInput = document.getElementById("chadwickInput");
  const chatSendBtn = document.getElementById("chadwickSendBtn");

  if (!chatLog || !chatInput || !chatSendBtn) return;

  function submitUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendBubble(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      const reply = computeAIResponse(text);
      appendBubble(reply, "bot");
    }, 550 + Math.random() * 400);
  }

  function appendBubble(message, sender) {
    const bubble = document.createElement("div");
    bubble.classList.add("msg", `bubble-${sender}`);
    bubble.textContent = message;
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  chatSendBtn.addEventListener("click", submitUserMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      submitUserMessage();
    }
  });
}