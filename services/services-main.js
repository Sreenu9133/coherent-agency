
// ===========================
// TIMELINE PROGRESS
// ============================

const timeline = document.querySelector(".timeline");
const progress = document.querySelector(".timeline-progress");

function updateProgress() {

    const rect = timeline.getBoundingClientRect();

    const windowHeight = window.innerHeight;

    const start = windowHeight * 0.2;

    const end = rect.height + windowHeight * 0.2;

    let percent = ((start - rect.top) / end) * 100;

    percent = Math.max(0, Math.min(percent, 100));

    progress.style.height = percent + "%";

}

window.addEventListener("scroll", updateProgress);
window.addEventListener("resize", updateProgress);
updateProgress();


// ============================
// CARD REVEAL
// ============================

const cards = document.querySelectorAll(".timeline-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.3
});

cards.forEach(card => {
    observer.observe(card);
});


// ============================
// DOT ACTIVE
// ============================

const dots = document.querySelectorAll(".timeline-dot");

const dotObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        const dot = entry.target.parentElement.querySelector(".timeline-dot");

        if (entry.isIntersecting) {

            dot.classList.add("active");

        } else {

            dot.classList.remove("active");

        }

    });

}, {
    threshold: 0.5
});

cards.forEach(card => {
    dotObserver.observe(card);
});


// ============================
// PARALLAX EFFECT
// ============================

window.addEventListener("scroll", () => {

    cards.forEach(card => {

        const rect = card.getBoundingClientRect();

        const speed = (window.innerHeight / 2 - rect.top) * 0.03;

        card.style.transform =
            card.classList.contains("show")
                ? `translateY(${speed}px)`
                : "translateY(80px)";

    });

});


// ============================
// HOVER GLOW
// ============================

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const x = e.offsetX;
        const y = e.offsetY;

        card.style.background =
            `radial-gradient(circle at ${x}px ${y}px,
        rgba(255,213,0,.12),
        #111 45%)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background = "#111";

    });

});
