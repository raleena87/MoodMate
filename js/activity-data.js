/* Static activity data, previously stored in xml/activities.xml (removed).
   ACTIVITIES_DATA holds the same fields the XML used to; loadActivities()
   is kept async so existing callers don't need to change. */
const ACTIVITIES_DATA = [
    { id: 'ACT001', name: 'Read a Book', mood: 'Bored', duration: '20 minutes', location: 'Indoor', category: 'Learning', energy: 'Low', description: 'Read your favourite book for twenty minutes.' },
    { id: 'ACT002', name: 'Go for a Walk', mood: 'Stressed', duration: '30 minutes', location: 'Outdoor', category: 'Exercise', energy: 'Medium', description: 'Take a calm walk around your neighbourhood to clear your head.' },
    { id: 'ACT003', name: 'Practice Deep Breathing', mood: 'Anxious', duration: '5 minutes', location: 'Indoor', category: 'Mindfulness', energy: 'Low', description: 'Sit comfortably and follow slow, deep breaths to settle your nerves.' },
    { id: 'ACT004', name: 'Dance to Your Favourite Song', mood: 'Happy', duration: '10 minutes', location: 'Indoor', category: 'Fun', energy: 'High', description: 'Put on an upbeat track and dance around the room.' },
    { id: 'ACT005', name: 'Journal Your Thoughts', mood: 'Sad', duration: '15 minutes', location: 'Indoor', category: 'Mindfulness', energy: 'Low', description: 'Write down how you are feeling to help process your emotions.' },
    { id: 'ACT006', name: 'Go for a Run', mood: 'Energetic', duration: '25 minutes', location: 'Outdoor', category: 'Exercise', energy: 'High', description: 'Head outside for a light jog to burn off extra energy.' },
    { id: 'ACT007', name: 'Try a New Recipe', mood: 'Bored', duration: '45 minutes', location: 'Indoor', category: 'Creative', energy: 'Medium', description: 'Cook something you have never made before.' },
    { id: 'ACT008', name: 'Call a Friend', mood: 'Lonely', duration: '20 minutes', location: 'Indoor', category: 'Social', energy: 'Low', description: 'Catch up with someone you have not spoken to in a while.' },
    { id: 'ACT009', name: 'Stretching Routine', mood: 'Tired', duration: '10 minutes', location: 'Indoor', category: 'Exercise', energy: 'Low', description: 'Loosen up tight muscles with a gentle stretching sequence.' },
    { id: 'ACT010', name: 'Sketch or Doodle', mood: 'Bored', duration: '15 minutes', location: 'Indoor', category: 'Creative', energy: 'Low', description: 'Grab a pencil and doodle whatever comes to mind.' },
    { id: 'ACT011', name: 'Visit a Park', mood: 'Happy', duration: '40 minutes', location: 'Outdoor', category: 'Fun', energy: 'Medium', description: 'Spend time outdoors enjoying nature and fresh air.' },
    { id: 'ACT012', name: 'Listen to a Podcast', mood: 'Bored', duration: '30 minutes', location: 'Indoor', category: 'Learning', energy: 'Low', description: 'Discover a new topic through an interesting podcast episode.' },
    { id: 'ACT013', name: 'Meditate', mood: 'Anxious', duration: '10 minutes', location: 'Indoor', category: 'Mindfulness', energy: 'Low', description: 'Quiet your mind with a short guided meditation session.' },
    { id: 'ACT014', name: 'Play a Board Game', mood: 'Bored', duration: '45 minutes', location: 'Indoor', category: 'Social', energy: 'Medium', description: 'Gather friends or family for a fun board game night.' },
    { id: 'ACT015', name: 'Ride a Bicycle', mood: 'Energetic', duration: '35 minutes', location: 'Outdoor', category: 'Exercise', energy: 'High', description: 'Explore your area on two wheels for an energy boost.' },
    { id: 'ACT016', name: 'Watch the Sunset', mood: 'Calm', duration: '15 minutes', location: 'Outdoor', category: 'Mindfulness', energy: 'Low', description: 'Find a quiet spot outdoors and watch the sky change colour.' },
    { id: 'ACT017', name: 'Organise Your Space', mood: 'Stressed', duration: '25 minutes', location: 'Indoor', category: 'Productivity', energy: 'Medium', description: 'Tidy a small area to create a sense of calm and control.' },
    { id: 'ACT018', name: 'Learn a Few Words in a New Language', mood: 'Bored', duration: '20 minutes', location: 'Indoor', category: 'Learning', energy: 'Low', description: 'Use an app or book to pick up some new vocabulary.' },
    { id: 'ACT019', name: 'Do a Puzzle', mood: 'Bored', duration: '30 minutes', location: 'Indoor', category: 'Learning', energy: 'Low', description: 'Challenge your brain with a jigsaw or logic puzzle.' },
    { id: 'ACT020', name: 'Yoga Session', mood: 'Stressed', duration: '20 minutes', location: 'Indoor', category: 'Exercise', energy: 'Medium', description: 'Follow a beginner yoga flow to release tension in your body.' },
    { id: 'ACT021', name: 'Write a Gratitude List', mood: 'Sad', duration: '10 minutes', location: 'Indoor', category: 'Mindfulness', energy: 'Low', description: 'List three things you are grateful for today.' },
    { id: 'ACT022', name: 'Play a Musical Instrument', mood: 'Happy', duration: '25 minutes', location: 'Indoor', category: 'Creative', energy: 'Medium', description: 'Pick up an instrument and play something you enjoy.' },
    { id: 'ACT023', name: 'Go Bird Watching', mood: 'Calm', duration: '30 minutes', location: 'Outdoor', category: 'Mindfulness', energy: 'Low', description: 'Spend time quietly observing birds in a nearby green space.' },
    { id: 'ACT024', name: 'Take a Power Nap', mood: 'Tired', duration: '20 minutes', location: 'Indoor', category: 'Rest', energy: 'Low', description: 'Rest your eyes with a short nap to restore your energy.' },
    { id: 'ACT025', name: 'Plan a Weekend Trip', mood: 'Excited', duration: '30 minutes', location: 'Indoor', category: 'Productivity', energy: 'Medium', description: 'Research and plan a fun outing for the upcoming weekend.' },
    { id: 'ACT026', name: 'Play Basketball', mood: 'Energetic', duration: '40 minutes', location: 'Outdoor', category: 'Exercise', energy: 'High', description: 'Shoot some hoops at a nearby court to release energy.' },
    { id: 'ACT027', name: 'Write a Short Story', mood: 'Bored', duration: '35 minutes', location: 'Indoor', category: 'Creative', energy: 'Medium', description: 'Let your imagination run wild and write a short piece of fiction.' },
    { id: 'ACT028', name: 'Have a Picnic', mood: 'Happy', duration: '60 minutes', location: 'Outdoor', category: 'Social', energy: 'Medium', description: 'Pack some snacks and enjoy a relaxed picnic outdoors.' },
    { id: 'ACT029', name: 'Practice Gratitude Meditation', mood: 'Anxious', duration: '12 minutes', location: 'Indoor', category: 'Mindfulness', energy: 'Low', description: 'Combine breathing with gratitude to ease anxious thoughts.' },
    { id: 'ACT030', name: 'Declutter a Drawer', mood: 'Stressed', duration: '15 minutes', location: 'Indoor', category: 'Productivity', energy: 'Low', description: 'Clear out one small drawer or shelf for a quick sense of achievement.' },
    { id: 'ACT031', name: 'Watch a Comedy Show', mood: 'Sad', duration: '30 minutes', location: 'Indoor', category: 'Fun', energy: 'Low', description: 'Lift your mood with a lighthearted comedy episode or clip.' },
    { id: 'ACT032', name: 'Go Swimming', mood: 'Energetic', duration: '40 minutes', location: 'Outdoor', category: 'Exercise', energy: 'High', description: 'Cool off and get active with a swim at your local pool.' },
    { id: 'ACT033', name: 'Volunteer Locally', mood: 'Lonely', duration: '60 minutes', location: 'Outdoor', category: 'Social', energy: 'Medium', description: 'Connect with your community by helping out at a local event.' },
    { id: 'ACT034', name: 'Try a Colouring Book', mood: 'Anxious', duration: '20 minutes', location: 'Indoor', category: 'Creative', energy: 'Low', description: 'Focus your mind with calming, repetitive colouring patterns.' },
    { id: 'ACT035', name: 'Set Small Goals for the Day', mood: 'Unmotivated', duration: '10 minutes', location: 'Indoor', category: 'Productivity', energy: 'Low', description: 'Write three achievable goals to build momentum for the day.' },
    { id: 'ACT036', name: 'Hike a Local Trail', mood: 'Excited', duration: '50 minutes', location: 'Outdoor', category: 'Exercise', energy: 'High', description: 'Explore nature with a scenic hike on a nearby trail.' },
    { id: 'ACT037', name: 'Practice Gratitude Journaling', mood: 'Calm', duration: '10 minutes', location: 'Indoor', category: 'Mindfulness', energy: 'Low', description: 'Reflect quietly and note down peaceful moments from your day.' },
    { id: 'ACT038', name: 'Bake Something Sweet', mood: 'Happy', duration: '50 minutes', location: 'Indoor', category: 'Creative', energy: 'Medium', description: 'Bake a favourite treat to share with family or friends.' },
];

/* Shared helper: load activity data. Kept async so existing callers (mood-checker.js, activities.js) do not need to change. */
async function loadActivities() {
    return ACTIVITIES_DATA.map(activity => ({ ...activity }));
}

function escapeHtml(value) {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
}
