/* Shared helper: load activity data from the XML file. */
async function loadActivities() {
    const response = await fetch("xml/activities.xml");

    if (!response.ok) {
        throw new Error("Could not load activities.xml");
    }

    const xmlText = await response.text();
    const xml = new DOMParser().parseFromString(xmlText, "application/xml");

    return Array.from(xml.querySelectorAll("activity")).map(activity => ({
        id: getText(activity, "id"),
        name: getText(activity, "name"),
        mood: getText(activity, "mood"),
        duration: getText(activity, "duration"),
        location: getText(activity, "location"),
        category: getText(activity, "category"),
        energy: getText(activity, "energy"),
        description: getText(activity, "description")
    }));
}

function getText(parent, tagName) {
    return parent.querySelector(tagName)?.textContent.trim() || "";
}

function escapeHtml(value) {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
}
