window.addEventListener("DOMContentLoaded", () => {
  // ====== GAMBAR CARD PER ROLE ======
  const roleImages = {
    researcher: "assets/researcher.png",
    artist: "assets/artist.png",
    memelord: "assets/memelord.png",
    club: "assets/club.png",
  };

  // ====== CLASS POSISI NAMA PER ROLE ======
  const roleClassMap = {
    researcher: "role-researcher",
    artist: "role-artist",
    memelord: "role-memelord",
    club: "role-club",
  };

  // ====== ELEMENT DOM ======
  const generateBtn = document.getElementById("generateBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const twitterBtn = document.getElementById("twitterBtn");
  const cardOutput = document.getElementById("cardOutput");

  if (!generateBtn || !cardOutput) {
    console.error("generateBtn atau cardOutput tidak ditemukan.");
    return;
  }

  // pastikan tombol extra hidden di awal
  downloadBtn.classList.add("hidden");
  twitterBtn.classList.add("hidden");

  // ====== ANIMASI REVEAL ======
  function playRevealAnimation(cardBox) {
    cardBox.classList.remove("show");
    void cardBox.offsetWidth;   // force reflow
    setTimeout(() => {
      cardBox.classList.add("show");
    }, 20);
  }

  // ====== GENERATE CARD ======
  generateBtn.addEventListener("click", () => {
    const nameInput = document.getElementById("nameInput");
    const roleSelect = document.getElementById("roleSelect");

    const rawName = nameInput.value.trim();
    const roleValue = roleSelect.value;

    if (!rawName || !roleValue) {
      alert("Please enter your name and choose a role.");
      return;
    }

    // kapital semua
    const upperName = rawName.toUpperCase();
    const roleLabel =
      roleSelect.options[roleSelect.selectedIndex].text.toUpperCase();

    const imgSrc = roleImages[roleValue];
    if (!imgSrc) {
      alert("Image untuk role ini tidak ditemukan. Cek path di script.js.");
      return;
    }

    // simpan buat Twitter & nama file
    cardOutput.dataset.currentName = upperName;
    cardOutput.dataset.currentRole = roleLabel;

    const roleClass = roleClassMap[roleValue] || "default-pos";

    // render card
    cardOutput.innerHTML = "";
    const cardBox = document.createElement("div");
    cardBox.className = "card-box";
    cardBox.id = "cardBox";

    cardBox.innerHTML = `
      <img src="${imgSrc}" alt="${roleValue} card">
      <div class="card-name ${roleClass}">${upperName}</div>
    `;

    cardOutput.appendChild(cardBox);

    // animasi reveal
    playRevealAnimation(cardBox);

    // munculkan tombol download & twitter
    downloadBtn.classList.remove("hidden");
    twitterBtn.classList.remove("hidden");
  });

  // ====== DOWNLOAD PNG ======
  downloadBtn.addEventListener("click", () => {
    const cardBox = document.getElementById("cardBox");
    if (!cardBox) {
      alert("Generate card dulu sebelum download.");
      return;
    }

    if (typeof html2canvas === "undefined") {
      alert("html2canvas belum dimuat. Cek script CDN di index.html.");
      return;
    }

    html2canvas(cardBox, {
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      const link = document.createElement("a");
      const name =
        (cardOutput.dataset.currentName || "rialo-card").replace(/\s+/g, "_");
      link.download = `rialo-card-${name}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });

  // ====== SHARE TO TWITTER ======
twitterBtn.addEventListener("click", async () => {
  const cardBox = document.getElementById("cardBox");
  const name = cardOutput.dataset.currentName;
  const role = cardOutput.dataset.currentRole;

  if (!cardBox || !name || !role) {
    alert("Generate card dulu sebelum share ke Twitter.");
    return;
  }

  const tweetText = `My Role Card Rialo\nNAME: ${name}\nROLE: ${role}\n\n#Rialo`;
  const intentUrl =
    "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);

  try {
    // Pastikan html2canvas ada
    if (typeof html2canvas !== "undefined" &&
        navigator.clipboard &&
        navigator.clipboard.write) {

      // capture card jadi canvas
      const canvas = await html2canvas(cardBox, {
        useCORS: true,
        scale: 2,
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      // copy gambar ke clipboard (kalau browser ngizinin)
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      alert(
        "The card has been copied to the clipboard.\nOnce the Twitter tab opens, press Ctrl+V in the tweet box to paste the image."
      );
    } else {
      // fallback: download file supaya bisa di-attach manual
      const canvas = await html2canvas(cardBox, {
        useCORS: true,
        scale: 2,
      });

      const link = document.createElement("a");
      const safeName = (name || "rialo-card").replace(/\s+/g, "_");
      link.download = `rialo-card-${safeName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      alert(
        "The browser does not support copying images to the clipboard.\nThe card has been downloaded, please attach the PNG to Twitter."
      );
    }
  } catch (err) {
    console.error(err);
    alert(
      "Failed to process image for Twitter. Please attach the card manually later."
    );
  }

  // buka compose tweet
  window.open(intentUrl, "_blank");
});
});
