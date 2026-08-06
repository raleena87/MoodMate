/* Display, search, and filter all activities. */
document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("activitiesGrid");
    const summary = document.getElementById("resultsSummary");
    const noResults = document.getElementById("noResults");
    const searchInput = document.getElementById("activitySearch");
    const categoryFilters = document.getElementById("categoryFilters");
    const locationFilters = document.getElementById("locationFilters");

    if (!grid) return;

    let activities = [];
    const filters = { search: "", category: "all", location: "all" };

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
            return matchesSearch && matchesCategory && matchesLocation;
        });

        renderActivities(results);
        summary.textContent = `Showing ${results.length} of ${activities.length} activities`;
    }

    function renderActivities(results) {
        grid.innerHTML = "";
        grid.classList.toggle("hidden", results.length === 0);
        noResults.classList.toggle("hidden", results.length > 0);

        results.forEach(activity => {
            const card = document.createElement("article");
            card.className = "activity-card";
            card.innerHTML = `
                <div class="activity-card-id">${escapeHtml(activity.id)}</div>
                <h3 class="activity-card-title">${escapeHtml(activity.name)}</h3>
                <p class="activity-card-description">${escapeHtml(activity.description)}</p>
                <div class="activity-card-details">
                    <span class="activity-tag">${escapeHtml(activity.mood)}</span>
                    <span class="activity-tag">${escapeHtml(activity.category)}</span>
                    <span class="activity-tag">${escapeHtml(activity.location)}</span>
                    <span class="activity-tag">${escapeHtml(activity.energy)}</span>
                    <span class="activity-tag">${escapeHtml(activity.duration)}</span>
                </div>`;
            grid.appendChild(card);
        });
    }
});
