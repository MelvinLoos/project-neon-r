const fs = require('fs');

const addHints = (file, hints) => {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.hints = hints;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

const enHints = {
  "bruteForceTitle": "Brute-Force Protocol",
  "noTimePressure": "Take your time. No time limit or penalties.",
  "analyzing1": "Decrypting Hint 1...",
  "revealHint1": "Access Hint 1",
  "analyzing2": "Decrypting Hint 2...",
  "revealHint2": "Access Hint 2",
  "analyzingBypass": "Generating Auto-Bypass...",
  "triggerBypass": "Execute Auto-Bypass",
  "hint1Label": "Hint 1",
  "hint2Label": "Hint 2"
};

const nlHints = {
  "bruteForceTitle": "Brute-Force Protocol",
  "noTimePressure": "Neem je tijd. Geen tijdslimiet of minpunten.",
  "analyzing1": "Hint 1 ontsleutelen...",
  "revealHint1": "Toon Hint 1",
  "analyzing2": "Hint 2 ontsleutelen...",
  "revealHint2": "Toon Hint 2",
  "analyzingBypass": "Auto-Bypass genereren...",
  "triggerBypass": "Auto-Bypass Uitvoeren",
  "hint1Label": "Hint 1",
  "hint2Label": "Hint 2"
};

addHints('src/locales/en.json', enHints);
addHints('src/locales/nl.json', nlHints);
console.log('Locales updated.');
