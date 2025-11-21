const vibes = [
  "Chill contributor",
  "DeFi degen (responsible)",
  "Quiet builder",
  "Lore enjoyer",
  "Automation enjoyer",
  "Points optimizer",
  "Data-driven yapper",
];

const affinities = [
  "On-chain automation",
  "Cross-chain workflows",
  "Community experiments",
  "Game-like incentives",
  "Alignment over hype",
  "Long-term participation",
];

function pickRandom(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function generateIdentity() {
  const nameInput = document.getElementById("nameInput");
  const roleInput = document.getElementById("roleInput");

  const nameValue = document.getElementById("nameValue");
  const roleValue = document.getElementById("roleValue");
  const vibeValue = document.getElementById("vibeValue");
  const affinityValue = document.getElementById("affinityValue");

  const name = nameInput.value.trim();
  const role = roleInput.value.trim();

  // Kalau nama kosong, kita tetap isi sesuatu biar kartunya nggak kosong banget
  const finalName = name || "Unnamed Rialo Member";
  const finalRole = role || "Member";

  nameValue.textContent = finalName;
  roleValue.textContent = finalRole;
  vibeValue.textContent = pickRandom(vibes);
  affinityValue.textContent = pickRandom(affinities);
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("generateButton");
  button.addEventListener("click", generateIdentity);

  // Tidak auto-generate, jadi awalnya benar-benar kosong (tanpa "-")
});
