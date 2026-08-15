document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("page-loaded");

    updateTime();

    /* ==========================================
       SCROLLSPY — highlight menu sesuai section aktif
       ========================================== */
    const navLinks = document.querySelectorAll(".menu a[data-nav]");
    const sections = [...navLinks]
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const setActive = (id) => {
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
    };

    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(sec => spy.observe(sec));

    /* ==========================================
       MENU MOBILE
       ========================================== */
    const navToggle = document.getElementById("navToggle");
    const menu = document.getElementById("menu");

    if (navToggle && menu) {
        navToggle.addEventListener("click", () => {
            menu.classList.toggle("open");
            navToggle.classList.toggle("open");
        });

        menu.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", () => {
                menu.classList.remove("open");
                navToggle.classList.remove("open");
            });
        });
    }

    /* ==========================================
       BACK TO TOP BUTTON
       ========================================== */
    const btn = document.createElement("button");
    btn.innerHTML = "↑";
    btn.className = "top-btn";
    btn.setAttribute("aria-label", "Kembali ke atas");
    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 250 ? "flex" : "none";
    });

    btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

    /* ==========================================
       REVEAL ANIMATION UNTUK CARD
       ========================================== */
    const cards = document.querySelectorAll(".card");
    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    });

    cards.forEach(card => cardObserver.observe(card));

    /* ==========================================
       LIGHTBOX GAMBAR
       ========================================== */
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    const lightboxImg = document.createElement("img");
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    document.querySelectorAll(".card img").forEach(i => {
        i.addEventListener("click", () => {
            lightboxImg.src = i.src;
            lightboxImg.alt = i.alt;
            lightbox.style.display = "flex";
        });
    });

    lightbox.onclick = () => lightbox.style.display = "none";

    /* ==========================================
       FILTER TAB: HASIL DESAIN / HASIL CODING
       ========================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetId = btn.dataset.target;
            document.querySelectorAll(".project-section .portfolio").forEach(gallery => {
                if (gallery.id === "designGallery" || gallery.id === "codingGallery") {
                    gallery.style.display = gallery.id === targetId ? "grid" : "none";
                }
            });
        });
    });

});

function updateTime() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2, "0");

    let greet = "";
    if (h < 12) greet = "Selamat Pagi ☀️";
    else if (h < 15) greet = "Selamat Siang 🌤";
    else if (h < 18) greet = "Selamat Sore 🌇";
    else greet = "Selamat Malam 🌙";

    const timeText = document.getElementById("timeText");
    if (timeText) timeText.innerHTML = greet + " — " + h + ":" + m;

    const timeBox = document.getElementById("timeBox");
    if (timeBox) timeBox.innerHTML = now.toLocaleDateString("id-ID", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
}

setInterval(updateTime, 1000);
