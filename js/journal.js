/* Display saved mood check-ins on the Journal page. */
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("journalList");
    const emptyState = document.getElementById("journalEmpty");
    const statsRow = document.getElementById("journalStats");
    const clearButton = document.getElementById("clearJournal");

    if (!list) return;

    render();

    clearButton?.addEventListener("click", () => {
        if (confirm("Clear your entire mood journal? This cannot be undone.")) {
            clearJournalEntries();
            render();
        }
    });

    list.addEventListener("click", event => {
        const button = event.target.closest(".journal-delete");
        if (!button) return;

        deleteJournalEntry(button.dataset.id);
        render();
    });

    function render() {
        const entries = getJournalEntries();

        list.classList.toggle("hidden", entries.length === 0);
        emptyState.classList.toggle("hidden", entries.length > 0);
        clearButton.classList.toggle("hidden", entries.length === 0);

        renderStats(entries);
        renderList(entries);
    }

    function renderStats(entries) {
        const topMood = mostFrequent(entries.map(entry => entry.mood));
        const weekCount = entries.filter(entry => isWithinDays(entry.date, 7)).length;

        statsRow.innerHTML = `
            <div class="info-card">
                <span class="info-card-number">${entries.length}</span>
                <span class="info-card-label">Entries logged</span>
            </div>
            <div class="info-card">
                <span class="info-card-number">${weekCount}</span>
                <span class="info-card-label">This week</span>
            </div>
            <div class="info-card">
                <span class="info-card-number">${topMood || "—"}</span>
                <span class="info-card-label">Most common mood</span>
            </div>`;
    }

    function renderList(entries) {
        list.innerHTML = "";

        entries.forEach(entry => {
            const item = document.createElement("article");
            item.className = "journal-entry";
            item.innerHTML = `
                <div class="journal-entry-main">
                    <div class="journal-entry-date">${formatDate(entry.date)}</div>
                    <h3 class="journal-entry-title">${escapeHtml(entry.mood)}</h3>
                    ${entry.activityName ? `<p class="journal-entry-activity">Recommended: ${escapeHtml(entry.activityName)}</p>` : ""}
                    <div class="journal-entry-tags">
                        <span class="activity-tag">${escapeHtml(entry.location)}</span>
                        <span class="activity-tag">${escapeHtml(entry.energy)} energy</span>
                    </div>
                </div>
                <button type="button" class="journal-delete" data-id="${entry.id}" aria-label="Delete this entry">✕</button>`;
            list.appendChild(item);
        });
    }

    function mostFrequent(values) {
        if (values.length === 0) return "";

        const counts = {};
        values.forEach(value => { counts[value] = (counts[value] || 0) + 1; });

        return Object.keys(counts).reduce((a, b) => (counts[a] >= counts[b] ? a : b));
    }

    function isWithinDays(isoDate, days) {
        const diff = Date.now() - new Date(isoDate).getTime();
        return diff <= days * 24 * 60 * 60 * 1000;
    }

    function formatDate(isoDate) {
        return new Date(isoDate).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });
    }
});
