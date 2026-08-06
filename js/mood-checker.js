/* Recommend one activity using the user's selections. */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("moodCheckerForm");
    const resultArea = document.getElementById("resultArea");

    if (!form || !resultArea) return;

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const mood = document.getElementById("mood").value;
        const location = document.getElementById("location").value;
        const energy = document.getElementById("energy").value;

        if (!mood || !location || !energy) {
            resultArea.innerHTML = '<div class="error-message">Please complete all three selections.</div>';
            return;
        }

        resultArea.innerHTML = '<p class="loading-message">Finding your activity...</p>';

        try {
            const activities = await loadActivities();
            const match = findBestMatch(activities, mood, location, energy);
            showResult(match);
        } catch (error) {
            resultArea.innerHTML = '<div class="error-message">Activities could not be loaded. Open the project through a local server.</div>';
        }
    });

    form.addEventListener("reset", () => {
        resultArea.innerHTML = "";
    });

    function findBestMatch(activities, mood, location, energy) {
        const matchLevels = [
            activity => activity.mood === mood && activity.location === location && activity.energy === energy,
            activity => activity.mood === mood && activity.location === location,
            activity => activity.mood === mood && activity.energy === energy,
            activity => activity.mood === mood
        ];

        for (const matches of matchLevels) {
            const results = activities.filter(matches);
            if (results.length > 0) {
                return results[Math.floor(Math.random() * results.length)];
            }
        }

        return null;
    }

    function showResult(activity) {
        if (!activity) {
            resultArea.innerHTML = `
                <div class="no-results">
                    <img src="images/no-results.png" alt="No matching activity" class="no-results-image">
                    <h3 class="no-results-title">No activity found</h3>
                    <p class="no-results-text">Try another mood, location, or energy level.</p>
                </div>`;
            return;
        }

        resultArea.innerHTML = `
            <div class="result-card">
                <div class="result-card-heading">Recommended for you</div>
                <h3 class="result-card-title">${escapeHtml(activity.name)}</h3>
                <p class="result-card-description">${escapeHtml(activity.description)}</p>
                <div class="result-details">
                    <span class="detail-badge">Mood: ${escapeHtml(activity.mood)}</span>
                    <span class="detail-badge">Category: ${escapeHtml(activity.category)}</span>
                    <span class="detail-badge">Duration: ${escapeHtml(activity.duration)}</span>
                    <span class="detail-badge">Location: ${escapeHtml(activity.location)}</span>
                    <span class="detail-badge">Energy: ${escapeHtml(activity.energy)}</span>
                </div>
            </div>`;
    }
});
