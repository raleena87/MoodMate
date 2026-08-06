/* Common features used on every MoodMate page. */
document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupSmoothScrolling();
    showDailyQuote();
    showCurrentYear();
});

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
