/* Display, search, and filter all activities. */
document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("activitiesGrid");
    const summary = document.getElementById("resultsSummary");
    const noResults = document.getElementById("noResults");
    const searchInput = document.getElementById("activitySearch");
    const categoryFilters = document.getElementById("categoryFilters");
    const locationFilters = document.getElementById("locationFilters");
    const favoritesOnlyToggle = document.getElementById("favoritesOnlyToggle");
    const surpriseMeButton = document.getElementById("surpriseMeButton");

    if (!grid) return;

    const FAVORITES_KEY = "moodmateFavorites";
    const DONE_KEY = "moodmateDoneActivities";

    let activities = [];
    let currentResults = [];
    const filters = { search: "", category: "all", location: "all", favoritesOnly: false };

    try {
        activities = await loadActivities();
        addCategoryButtons();
        applyFilters();
    } catch (error) {
        summary.textContent = "Activities could not be loaded.";
    }

    searchInput?.addEventListener("input", () => {
        filters.search = searchInput.value.trim().toLowerCase();
        applyFilters();
    });

    setupFilterGroup(categoryFilters, "category");
    setupFilterGroup(locationFilters, "location");

    favoritesOnlyToggle?.addEventListener("click", () => {
        filters.favoritesOnly = !filters.favoritesOnly;
        favoritesOnlyToggle.classList.toggle("active", filters.favoritesOnly);
        applyFilters();
    });

    surpriseMeButton?.addEventListener("click", () => {
        if (currentResults.length === 0) return;

        const pick = currentResults[Math.floor(Math.random() * currentResults.length)];
        const card = grid.querySelector(`[data-id="${pick.id}"]`);
        if (!card) return;

        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add("activity-highlight");
        window.setTimeout(() => card.classList.remove("activity-highlight"), 1600);
    });

    grid.addEventListener("click", event => {
        const favoriteButton = event.target.closest(".favorite-btn");
        if (favoriteButton) {
            toggleFavorite(favoriteButton.dataset.id);
            return;
        }

        const doneButton = event.target.closest(".done-btn");
        if (doneButton) {
            toggleDone(doneButton.dataset.id);
        }
    });

    function setupFilterGroup(container, filterName) {
        container?.addEventListener("click", event => {
            const button = event.target.closest(".filter-button");
            if (!button) return;

            container.querySelectorAll(".filter-button").forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            filters[filterName] = button.dataset.value;
            applyFilters();
        });
    }

    function addCategoryButtons() {
        const categories = [...new Set(activities.map(activity => activity.category))].sort();

        categories.forEach(category => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "filter-button";
            button.dataset.value = category;
            button.textContent = category;
            categoryFilters.appendChild(button);
        });
    }

    function applyFilters() {
        const results = activities.filter(activity => {
            const text = `${activity.name} ${activity.description}`.toLowerCase();
            const matchesSearch = !filters.search || text.includes(filters.search);
            const matchesCategory = filters.category === "all" || activity.category === filters.category;
            const matchesLocation = filters.location === "all" || activity.location === filters.location;
            const matchesFavorite = !filters.favoritesOnly || isFavorite(activity.id);
            return matchesSearch && matchesCategory && matchesLocation && matchesFavorite;
        });

        currentResults = results;
        renderActivities(results);

        const favoriteCount = getFavorites().length;
        summary.textContent = `Showing ${results.length} of ${activities.length} activities`
            + (favoriteCount > 0 ? ` · ${favoriteCount} favorited` : "");
    }

    function renderActivities(results) {
        grid.innerHTML = "";
        grid.classList.toggle("hidden", results.length === 0);
        noResults.classList.toggle("hidden", results.length > 0);

        results.forEach(activity => {
            const favorited = isFavorite(activity.id);
            const done = isDone(activity.id);

            const card = document.createElement("article");
            card.className = "activity-card" + (done ? " activity-done" : "");
            card.dataset.id = activity.id;
            card.innerHTML = `
                <button type="button" class="favorite-btn${favorited ? " active" : ""}" data-id="${escapeHtml(activity.id)}" aria-label="Toggle favorite">
                    ${favorited ? "♥" : "♡"}
                </button>
                <div class="activity-card-id">${escapeHtml(activity.id)}</div>
                <h3 class="activity-card-title">${escapeHtml(activity.name)}</h3>
                <p class="activity-card-description">${escapeHtml(activity.description)}</p>
                <div class="activity-card-details">
                    <span class="activity-tag">${escapeHtml(activity.mood)}</span>
                    <span class="activity-tag">${escapeHtml(activity.category)}</span>
                    <span class="activity-tag">${escapeHtml(activity.location)}</span>
                    <span class="activity-tag">${escapeHtml(activity.energy)}</span>
                    <span class="activity-tag">${escapeHtml(activity.duration)}</span>
                </div>
                <div class="activity-card-actions">
                    <button type="button" class="button button-outline button-small done-btn" data-id="${escapeHtml(activity.id)}">
                        ${done ? "✓ Done — Undo" : "Mark as Done"}
                    </button>
                </div>`;
            grid.appendChild(card);
        });
    }

    /* Favorites: an array of activity ids saved in localStorage. */
    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    function isFavorite(id) {
        return getFavorites().includes(id);
    }

    function toggleFavorite(id) {
        let favorites = getFavorites();

        if (favorites.includes(id)) {
            favorites = favorites.filter(favoriteId => favoriteId !== id);
        } else {
            favorites.push(id);
        }

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        applyFilters();
    }

    /* Done: same array-in-localStorage pattern as favorites. */
    function getDone() {
        try {
            return JSON.parse(localStorage.getItem(DONE_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    function isDone(id) {
        return getDone().includes(id);
    }

    function toggleDone(id) {
        let done = getDone();

        if (done.includes(id)) {
            done = done.filter(doneId => doneId !== id);
        } else {
            done.push(id);
        }

        localStorage.setItem(DONE_KEY, JSON.stringify(done));
        applyFilters();
    }
});
