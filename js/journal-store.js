/* Shared helper: read and write Mood Journal entries in localStorage. */
const JOURNAL_STORAGE_KEY = "moodmateJournalEntries";

function getJournalEntries() {
    try {
        const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        return [];
    }
}

function saveJournalEntry(entry) {
    const entries = getJournalEntries();

    entries.unshift({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mood: entry.mood,
        location: entry.location,
        energy: entry.energy,
        activityName: entry.activityName || ""
    });

    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
}

function deleteJournalEntry(id) {
    const entries = getJournalEntries().filter(entry => entry.id !== id);
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
}

function clearJournalEntries() {
    localStorage.removeItem(JOURNAL_STORAGE_KEY);
}

function escapeHtml(value) {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
}
