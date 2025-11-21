// Arrays kemungkinan nilai untuk tiap field
const roles = [
  "Explorer",
  "Builder",
  "Strategist",
  "Archivist",
  "Yapper",
  "Observer",
];

const vibes = [
  "Chill contributor",
  "DeFi degen (responsible version)",
  "Quiet builder",
  "Lore enjoyer",
  "Automation nerd",
  "Points optimizer",
];

const affinities = [
  "On-chain automation",
  "Cross-chain workflows",
  "Community experiments",
  "Data-driven decisions",
  "Game-like incentives",
  "Long-term alignment",
];

// Util simple untuk ambil random element
function pickRandom(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function generateIdentity() {
  const nameInput = document.getElementById("nameInput");
  const identityValue = document.getElementById("identityValue");
  const roleValue = document.getElementById("roleValue");
  const vibeValue = document.getElementById("vibeValue");
  const affinityValue = document.getElementById("affinityValue");

  const rawName = nameInput.value.trim();

  // Kalau user isi nama, pakai. Kalau tidak, generate alias simple
  let identity;
  if (rawName) {
    identity = rawName;
  } else {
    const randomAliasPrefixes = ["Orb", "Node", "Signal", "Relay", "Echo"];
    const randomAliasSuffixes = ["_rialo", "_orca", "_phase2", "_bot", "_yap"];

    identity =
      pickRandom(randomAliasPrefixes) +
      pickRandom(randomAliasSuffixes) +
      "#" +
      Math.floor(Math.random() * 999).toString().padStart(3, "0");
  }

  identityValue.textContent = identity;
  roleValue.textContent = pickRandom(roles);
  vibeValue.textContent = pickRandom(vibes);
  affinityValue.textContent = pickRandom(affinities);
}

// Pas tombol di klik
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("generateButton");
  button.addEventListener("click", generateIdentity);

  // Generate awal sekali biar nggak kosong
  generateIdentity();
});
