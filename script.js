document.getElementById("generateBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const role = document.getElementById("roleSelect").value;

  if (!name || !role) {
    alert("Please enter your name and choose a role.");
    return;
  }

  const roleImages = {
    researcher: "assets/researcher.png",
    artist: "assets/artist.png",
    memelord: "assets/memelord.png",
    club: "assets/club.png"
  };

  const cardOutput = document.getElementById("cardOutput");

  cardOutput.innerHTML = `
    <div class="card-box">
      <img src="${roleImages[role]}" alt="${role} card">
      <div class="card-name">${name}</div>
    </div>
  `;
});
