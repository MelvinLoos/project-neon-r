# **UX, Game Design & Accessibility Constraints (CRITICAL)**

When designing features, generating code, or planning user flows, you MUST adhere to the pedagogical framework of "De Heldengilde". The application is a tool for social development and neurodivergent inclusion.

### **1\. Neuro-affirming Design**

* Recognize autism (ASS), ADHD, and giftedness as unique information processing styles.  
* **Stimulation Control:** Actively prevent overstimulation in the UI. Provide clear contrast, optional audio controls (mute buttons), and ensure UI animations can be paused or are not overwhelming.  
* **Clarity over Subtlety:** Neurodivergent users flourish with explicit rules. Ensure instructions are literal, clear, and unambiguous.

### **2\. Psychological Safety & The "Magic Circle"**

* **NO HARD FAIL STATES:** Users must never be permanently stuck or face severe in-game consequences. Failure is a learning mechanic, not an end state.  
* **NO TIME PRESSURE:** Never use countdown timers that cause mission failure. If a timer is used, it should unlock something (like a hint), not punish the player.  
* **Open Door Policy (UX):** Users must always be able to easily exit a puzzle, skip a task, or retreat to a safe menu without breaking the game loop.

### **3\. Executive Function Support**

* **Time-Released Hint System:** Support impulsivity and frustration tolerance by building hints into the narrative. e.g., a "Brute-Force Protocol" button disabled upon arrival. It unlocks Hint 1 after 3 minutes, Hint 2 after 6 minutes, and an "Auto-Bypass" (skip puzzle) after 10 minutes.  
* **Cognitive Load:** Keep views simple. Break complex tasks (like character/team management or map reading) into smaller, sequential steps.

### **4\. Language & Moderation**

* **BILINGUAL REQUIREMENT:** All user-facing text, UI elements, narrative dialogue, and error messages MUST use vue-i18n. Provide translations for **Dutch (nl) \- Default** and **English (en)**. Code comments and variables should be in English.  
* The tone of the app should be supportive, educational, and constructive, avoiding punitive language ("Wrong\!" vs. "Access Denied. Try a different key.").