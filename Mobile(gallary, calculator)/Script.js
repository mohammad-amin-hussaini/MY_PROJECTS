

const apps = [
  {name: "YouTube",      icon: "Youtube.jpg"},
  {name: "WhatsApp",     icon: "WhatsApp.jpg"},
  {name: "Instagram",    icon: "Insta.jpg"},
  {name: "Calculator", icon: "calc.jpg", url: "Assets/calculate/index.html" },
  {name: "X",            icon: "X.jpg"         },
  {name: "Tik Tok",      icon: "Tik Tok.jpg"   },
  {name: "Translator",   icon: "Translator.jpg"},
  {name: "Telegram",     icon: "Telegram.jpg"  },
  {name: "Setting",      icon: "Setting.jpg"   },
  {name: "Perplexity",   icon: "Preplex.jpg"   },
  {name: "Premier",      icon: "Premier.jpg"   },
  {name: "PlayStore",    icon: "PlayStore.jpg" },
  {name: "Photoshop",    icon: "Photoshop.jpg" },
  {name: "Phone",        icon: "Phone.jpg"     },
  {name: "Notes",        icon: "Note.jpg"      },
  {name: "Music Player", icon: "Music.jpg"     },
  {name: "Messenger",    icon: "Massenger.jpg" },
  {name: "Imo",          icon: "Imo.jpg"       },
  {name: "Google",       icon: "Google.jpg"    },
  {name: "Gmail",        icon: "Gmail.jpg"     },
  {name: "Gallery", icon: "galary.jpg", action: "gallery" },
  {name: "Files",        icon: "File.jpg"      },
  {name: "Facebook",     icon: "Facebook.jpg"  },
  {name: "CapCut",       icon: "CupCut.jpg"    },
  {name: "Claude",       icon: "Claude.jpg"    },
  {name: "ChatGPT",      icon: "ChatGpt.jpg"   },
  {name: "Camera",       icon: "Camera.jpg"    },
];

const allAppsContainer = document.querySelector("#All-apps");
const searchBar = document.querySelector("#Search-Bar");
const galleryScreen = document.querySelector("#gallery-screen");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const lightboxVid = document.querySelector("#lightbox-vid");

// = Rendering Aps =
function renderApps(list) {
  allAppsContainer.innerHTML = "";
  list.forEach(app => {
    const el = document.createElement("div");
    el.classList.add("Icon");
    el.innerHTML = `
      <img src="Assets/Icons/${app.icon}" alt="${app.name}"
           onerror="this.style.background='#2a2a3e';this.style.borderRadius='14px';this.removeAttribute('src')">
      <h6>${app.name}</h6>
    `;
   el.addEventListener("click", () => {
  if (app.action === "gallery") {
    openGallery();
  } else if (app.url) {
    closeGallery(); // ← ADD THIS LINE
    openApp(app.url);
  }
});
    allAppsContainer.appendChild(el);
  });
}

renderApps(apps);

// ===== APP IFRAME =====
const appScreen  = document.querySelector("#app-screen");
const appIframe  = document.querySelector("#app-iframe");

function openApp(url) {
  appIframe.src = url;
  appScreen.classList.add("active");
}

function closeApp() {
  appScreen.classList.remove("active");
  appIframe.src = "";
}

document.querySelector("#app-back").addEventListener("click", closeApp);

// Search
searchBar.addEventListener("input", () => {
  const container = searchBar.value.toLowerCase();
  renderApps(apps.filter(a => a.name.toLowerCase().includes(container)));
});

// ===== GALLERY =====
function openGallery() {
  galleryScreen.classList.add("active");
}
function closeGallery() {
  galleryScreen.classList.remove("active");
}

document.querySelector("#gallery-back").addEventListener("click", closeGallery);

// Tabs
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".media-grid").forEach(g => g.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab + "-grid").classList.add("active");
  });
});

// =Media Click Light Box=
document.querySelectorAll(".media-item").forEach(item => {
  item.addEventListener("click", () => {
    const type = item.dataset.type;
    const src  = item.dataset.src;
    openLightbox(type, src);
  });
});

function openLightbox(type, src) {
  lightbox.classList.add("active");
  if (type === "photo") {
    lightboxImg.src = src;
    lightboxImg.style.display = "block";
    lightboxVid.style.display = "none";
    lightboxVid.pause();
    lightboxVid.src = "";
  } else {
    lightboxVid.src = src;
    lightboxVid.style.display = "block";
    lightboxImg.style.display = "none";
    lightboxVid.play();
  }
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxVid.pause();
  lightboxVid.src = "";
  lightboxImg.src = "";
  lightboxImg.style.display = "none";
  lightboxVid.style.display = "none";
}

document.querySelector("#lightbox-back").addEventListener("click", closeLightbox);

// ===== CLOCK =====
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").textContent = h + ":" + m;

  const days   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  document.getElementById("date-display").textContent =
    `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
}
updateClock();
setInterval(updateClock, 10000);

