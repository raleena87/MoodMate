/* Common features used on every MoodMate page. */
document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupSmoothScrolling();
    showDailyQuote();
    showCurrentYear();
    showRecentlyViewedActivity();
    setupBackToTop();
});

/* Recently Viewed: show the last activity saved by the Mood Checker (Home page only). */
function showRecentlyViewedActivity() {
    const section = document.getElementById("recentActivitySection");
    const card = document.getElementById("recentActivityCard");
    if (!section || !card) return;

    const saved = localStorage.getItem("moodmateRecentActivity");
    if (!saved) return;

    const activity = JSON.parse(saved);

    card.innerHTML = `
        <div class="result-card-heading">Recently viewed</div>
        <h3 class="result-card-title">${activity.name}</h3>
        <p class="result-card-description">${activity.description}</p>
        <a class="button button-outline button-small" href="activities.html">Browse more activities</a>`;

    section.classList.remove("hidden");
}

/* Back to Top: appears after scrolling down, scrolls smoothly back up. */
function setupBackToTop() {
    const button = document.createElement("button");
    button.id = "backToTopButton";
    button.className = "back-to-top hidden";
    button.type = "button";
    button.setAttribute("aria-label", "Back to top");
    button.textContent = "↑";
    document.body.appendChild(button);

    window.addEventListener("scroll", () => {
        button.classList.toggle("hidden", window.scrollY < 400);
    });

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function setupMobileMenu() {
    const button = document.getElementById("mobileMenuButton");
    const navigation = document.getElementById("mainNavigation");

    if (!button || !navigation) return;

    button.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        button.classList.toggle("active", isOpen);
        button.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            button.classList.remove("active");
            button.setAttribute("aria-expanded", "false");
        });
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function showDailyQuote() {
    const quoteElement = document.getElementById("dailyQuote");
    if (!quoteElement) return;

    const quotes = [
        "Small steps every day add up to big change.",
        "Your mood is a signal, not a life sentence.",
        "Progress, not perfection.",
        "A short walk can change the shape of your day.",
        "Rest and movement are both forms of self-care.",
        "You only need a helpful next step."
    ];

    const index = new Date().getDate() % quotes.length;
    quoteElement.textContent = `“${quotes[index]}”`;
}

function showCurrentYear() {
    document.querySelectorAll("#currentYear").forEach(element => {
        element.textContent = new Date().getFullYear();
    });
}
