const speles = [
    {
        karta: "1. karta",
        datums: "2026-11-15 | 15:00",
        vieta: "Aizputes stadions",
        rezultats: "3 : 1",
        pretinieks: "FK Grobina-2",
        logo: "away-crest-1.png"
    },
    {
        karta: "2. karta",
        datums: "2026-11-22 | 18:00",
        vieta: "Kuldigas stadions",
        rezultats: "1 : 1",
        pretinieks: "FK Kuldiga",
        logo: "away-crest-2.png"
    },
    {
        karta: "3. karta",
        datums: "2026-11-29 | 16:30",
        vieta: "Aizputes stadions",
        rezultats: "vs",
        pretinieks: "JFK Saldus",
        logo: "away-crest-3.png"
    }
];

let pasreizejaSpele = 0;
const spelesInfo = document.querySelector(".speles-info");
const spelesRezultats = document.querySelector(".speles-rezultats");

function atjaunotSpeli(virziens) {
    if (!spelesInfo || !spelesRezultats) return;

    const izejasKlase = virziens === "nakama" ? "spele-animacija-pa-kreisi" : "spele-animacija-pa-labi";
    const ieejasKlase = virziens === "nakama" ? "spele-animacija-pa-labi" : "spele-animacija-pa-kreisi";

    spelesInfo.classList.add(izejasKlase);
    spelesRezultats.classList.add(izejasKlase);

    setTimeout(() => {
        const spele = speles[pasreizejaSpele];
        const kartaEl = document.getElementById("speles-karta");
        const datumsEl = document.getElementById("speles-datums");
        const vietaEl = document.getElementById("speles-vieta");
        const rezultatsEl = document.getElementById("rezultats-teksts");
        const pretinieksEl = document.getElementById("pretinieka-nosaukums");
        const logoEl = document.getElementById("pretinieka-logo");

        if (kartaEl) kartaEl.textContent = spele.karta;
        if (datumsEl) datumsEl.textContent = spele.datums;
        if (vietaEl) vietaEl.textContent = spele.vieta;
        if (rezultatsEl) rezultatsEl.textContent = spele.rezultats;
        if (pretinieksEl) pretinieksEl.textContent = spele.pretinieks;
        if (logoEl) {
            logoEl.src = spele.logo;
            logoEl.alt = spele.pretinieks;
        }

        spelesInfo.style.transition = "none";
        spelesRezultats.style.transition = "none";
        spelesInfo.classList.remove(izejasKlase);
        spelesRezultats.classList.remove(izejasKlase);
        spelesInfo.classList.add(ieejasKlase);
        spelesRezultats.classList.add(ieejasKlase);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                spelesInfo.style.transition = "";
                spelesRezultats.style.transition = "";
                spelesInfo.classList.remove(ieejasKlase);
                spelesRezultats.classList.remove(ieejasKlase);
            });
        });
    }, 200);
}

function nakamaSpele() {
    pasreizejaSpele = (pasreizejaSpele + 1) % speles.length;
    atjaunotSpeli("nakama");
}

function ieprieksejaSpele() {
    pasreizejaSpele = (pasreizejaSpele - 1 + speles.length) % speles.length;
    atjaunotSpeli("iepriekseja");
}

const nakamaBtn = document.getElementById("nakama-spele");
const ieprieksejaBtn = document.getElementById("iepriekseja-spele");

if (nakamaBtn) nakamaBtn.addEventListener("click", nakamaSpele);
if (ieprieksejaBtn) ieprieksejaBtn.addEventListener("click", ieprieksejaSpele);

const spelesJosla = document.querySelector(".speles-josla");
let sakumaX = 0;

if (spelesJosla) {
    spelesJosla.addEventListener("pointerdown", (e) => {
        sakumaX = e.clientX;
        spelesJosla.setPointerCapture(e.pointerId);
    });

    spelesJosla.addEventListener("pointerup", (e) => {
        const starpiba = e.clientX - sakumaX;
        if (starpiba < -50) {
            nakamaSpele();
        } else if (starpiba > 50) {
            ieprieksejaSpele();
        }
    });
}

const tabMap = {
    "#sakums": ["sakums", "sakums-bloki"],
    "#jaunumi": ["jaunumi"],
    "#speles": ["speles"],
    "#komanda": ["komanda"],
    "#uzbruceji": ["komanda"],
    "#aizsargi": ["komanda"],
    "#vartsargi": ["komanda"],
    "#treneri": ["komanda"],
    "#futbols": ["futbols"],
    "#vesture": ["futbols"],
    "#noteikumi": ["futbols"],
    "#inventars": ["futbols"],
    "#par-mums": ["par-mums"],
    "#kontakti": ["kontakti"]
};

function atvertCilni(hash) {
    const targetHash = tabMap[hash] ? hash : "#sakums";
    const activeIds = tabMap[targetHash];

    document.querySelectorAll(".tab-section").forEach((el) => {
        el.classList.remove("active-tab");
    });

    activeIds.forEach((id) => {
        const sec = document.getElementById(id);
        if (sec) sec.classList.add("active-tab");
    });

    const subTarget = document.querySelector(targetHash);
    if (subTarget && !activeIds.includes(subTarget.id)) {
        subTarget.scrollIntoView({ behavior: "smooth" });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const hash = link.getAttribute("href");
        if (tabMap[hash]) {
            e.preventDefault();
            history.pushState(null, "", hash);
            atvertCilni(hash);
        }
    });
});

window.addEventListener("hashchange", () => {
    atvertCilni(window.location.hash);
});

atvertCilni(window.location.hash || "#sakums");