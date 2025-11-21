const roleImages = {
  researcher: "assets/researcher.png",
  artist: "assets/artist.png",
  memelord: "assets/memelord.png",
  club: "assets/club.png"
};

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const cardOutput = document.getElementById("cardOutput");

generateBtn.addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const role = document.getElementById("roleSelect").value;

  if (!name || !role) {
    alert("Please enter your name and choose a role.");
    return;
  }

  const imgSrc = roleImages[role];
  if (!imgSrc) return;

  // Render card
  cardOutput.innerHTML = `
    <div class="card-box" id="cardBox">
      <img src="${imgSrc}" alt="${role} card">
      <div class="card-name">${name}</div>
    </div>
  `;

  const cardBox = document.getElementById("cardBox");

  // trigger animasi (class .show)
  requestAnimationFrame(() => {
    cardBox.classList.add("show");
  });

  // enable tombol download
  downloadBtn.disabled = false;
});

// DOWNLOAD PNG
downloadBtn.addEventListener("click", () => {
  const cardBox = document.getElementById("cardBox");
  if (!cardBox) return;

  // pakai html2canvas
  html2canvas(cardBox, {
    useCORS: true,
    scale: 2   // biar hasilnya tajam
  }).then(canvas => {
    const link = document.createElement("a");
    const name = document.getElementById("nameInput").value.trim() || "rialo-card";
    link.download = `rialo-card-${name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});
