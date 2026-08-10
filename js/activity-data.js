
const ACTIVITIES_XML_PATH = "activities.xml";

let cachedActivities = null;

async function loadActivities() {
    if (cachedActivities) {
        return cachedActivities.map(activity => ({ ...activity }));
    }

    const response = await fetch(ACTIVITIES_XML_PATH);
    if (!response.ok) {
        throw new Error(`Failed to load ${ACTIVITIES_XML_PATH}: ${response.status}`);
    }

    const xmlText = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");

    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
        throw new Error("Failed to parse activities.xml");
    }

    const fields = ["id", "name", "mood", "duration", "location", "category", "energy", "description"];

    cachedActivities = Array.from(xmlDoc.getElementsByTagName("activity")).map(node => {
        const activity = {};
        fields.forEach(field => {
            activity[field] = node.getElementsByTagName(field)[0]?.textContent.trim() ?? "";
        });
        return activity;
    });

    return cachedActivities.map(activity => ({ ...activity }));
}

function escapeHtml(value) {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
}
