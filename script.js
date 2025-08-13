// Dummy user data to be updated
let dummyUser = {
    name: "Astro User",
    dob: "2002-01-13",
    tob: "12:00",
    zodiac: "Capricorn",
    avatar: "image/logo.png" // Default profile image
};

// Dummy chat history data for demonstration
const dummyChatHistory = [{
    id: 1,
    title: "My first question",
    date: "2025-08-12",
    messages: [{
        text: "What does the week hold for Libra?",
        who: "user"
    }, {
        text: "This week, Libra, focus on finding balance in your professional and personal life. A harmonious approach will lead to unexpected opportunities. ✨",
        who: "bot"
    }]
}, {
    id: 2,
    title: "Question about love",
    date: "2025-08-11",
    messages: [{
        text: "Who will I marry?",
        who: "user"
    }, {
        text: "The stars can't tell you exactly who you will marry, but they suggest that a new connection is on the horizon. Keep an open heart! ❤️",
        who: "bot"
    }]
}, {
    id: 3,
    title: "Career path advice",
    date: "2025-08-10",
    messages: [{
        text: "Should I change my career?",
        who: "user"
    }, {
        text: "This is a significant question, and the current planetary alignment points to a time of major shifts. It's a great time to listen to your intuition. 🗺️",
        who: "bot"
    }]
}];


// --------- Account Wizard & Login/Signup -----------
function togglePassword(fieldId, el) {
    const input = document.getElementById(fieldId);
    if (input.type === "password") {
        input.type = "text";
        el.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        input.type = "password";
        el.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
}
document.getElementById('show-signup').onclick = function () {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('show-signup').style.display = 'none';
    document.getElementById('show-login').style.display = 'block';
    document.getElementById('welcome-text').textContent = 'Create Your Account';
};
document.getElementById('show-login').onclick = function () {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('show-signup').style.display = 'block';
    document.getElementById('show-login').style.display = 'none';
    document.getElementById('welcome-text').textContent = 'Welcome Back!';
};
let currentStep = 1;
function showSignupStep(step) {
    for (let i = 1; i <= 3; i++) {
        document.getElementById('signup-step-' + i).style.display = (i === step) ? 'block' : 'none';
        document.querySelector('.step[data-step="' + i + '"]').classList.toggle('active', i === step);
        document.querySelector('.step[data-step="' + i + '"]').classList.toggle('completed', i < step);
    }
    currentStep = step;
}
function nextSignupStep(step) {
    if (step === 1) {
        const name = document.getElementById('signup-name').value.trim();
        const mobile = document.getElementById('signup-mobile').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const pass = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm-password').value;
        if (!name || !mobile || !email || !pass || !confirm) return alert("Please fill all fields.");
        if (pass !== confirm) return alert("Passwords do not match.");
    }
    if (step === 2) {
        const gender = getSelectedGender();
        const dob = document.getElementById('signup-dob').value;
        const tob = document.getElementById('signup-tob').value;
        const loc = document.getElementById('signup-location').value.trim();
        if (!gender || !dob || !tob || !loc) return alert("Please fill all fields.");
    }
    // Add animation for wizard step
    document.querySelector('.signup-step:not([style*="display: none"])').style.animation = 'fadein 0.6s';
    setTimeout(() => showSignupStep(step + 1), 190);
}
function prevSignupStep(step) {
    document.querySelector('.signup-step:not([style*="display: none"])').style.animation = 'fadein 0.6s';
    setTimeout(() => showSignupStep(step - 1), 190);
}
showSignupStep(1);

// --------- Zodiac Display ---------
const zodiacData = [
    { name: 'Aries', icon: '♈' },
    { name: 'Taurus', icon: '♉' },
    { name: 'Gemini', icon: '♊' },
    { name: 'Cancer', icon: '♋' },
    { name: 'Leo', icon: '♌' },
    { name: 'Virgo', icon: '♍' },
    { name: 'Libra', icon: '♎' },
    { name: 'Scorpio', icon: '♏' },
    { name: 'Sagittarius', icon: '♐' },
    { name: 'Capricorn', icon: '♑' },
    { name: 'Aquarius', icon: '♒' },
    { name: 'Pisces', icon: '♓' }
];
let zodiacVisible = true;
function renderZodiacSymbols() {
    const list = document.getElementById('zodiac-list');
    list.innerHTML = '';
    zodiacData.forEach((z, idx) => {
        const div = document.createElement('div');
        div.className = 'zodiac-symbol';
        div.innerHTML = z.icon;
        div.title = z.name;
        div.onclick = function () {
            document.querySelectorAll('.zodiac-symbol').forEach(s => s.classList.remove('selected'));
            div.classList.add('selected');
            div.setAttribute('data-selected', 'true');
            div.setAttribute('data-zodiac', z.name);
        };
        list.appendChild(div);
    });
}
renderZodiacSymbols();
function toggleZodiacList() {
    zodiacVisible = !zodiacVisible;
    document.getElementById('zodiac-list').style.display = zodiacVisible ? 'flex' : 'none';
}

// --- Gender Selection Logic ---
function selectGender(gender) {
    const allOptions = document.querySelectorAll('.gender-option');
    allOptions.forEach(option => {
        option.classList.remove('selected');
    });
    document.getElementById('gender-' + gender).classList.add('selected');
}

function getSelectedGender() {
    const selected = document.querySelector('.gender-option.selected');
    return selected ? selected.getAttribute('data-value') : null;
}

// --- Google Sign-in/Sign-up Dummy Functions ---
function handleGoogleLogin() {
    alert('Signing in with Google...');
    showMainLayout();
    updateDashboardProfile({ name: "Google User", dob: "13-01-2002", tob: "12:00", zodiac: "Capricorn" });
}
function handleGoogleSignup() {
    alert('Signing up with Google...');
    showMainLayout();
    updateDashboardProfile({ name: "Google User", dob: "13-01-2002", tob: "12:00", zodiac: "Capricorn" });
}


// --------------- Signup, Authentication, and Main Profile logic --------------
function getSelectedZodiac() {
    const selected = document.querySelector('.zodiac-symbol.selected');
    if (selected) {
        const name = selected.getAttribute('data-zodiac');
        return name;
    }
    return null;
}
function getSignupData() {
    return {
        name: document.getElementById('signup-name').value.trim() || 'Astro User',
        dob: document.getElementById('signup-dob').value || '-',
        tob: document.getElementById('signup-tob').value || '12:00',
        zodiac: getSelectedZodiac() || '—',
        avatar: "image/logo.png"
    };
}
document.getElementById('signup-form').onsubmit = function (e) {
    e.preventDefault();
    const selected = document.querySelector('.zodiac-symbol.selected');
    if (!selected) return alert("Please select your Zodiac sign.");
    showMainLayout();
    dummyUser = getSignupData();
    updateDashboardProfile(dummyUser);
};
document.getElementById('login-form').onsubmit = function (e) {
    e.preventDefault();
    showMainLayout();
    updateDashboardProfile(dummyUser);
};
function showMainLayout() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('main-layout').style.display = 'flex';
}

function updateDashboardProfile(profile = dummyUser) {
    document.getElementById('db-name').textContent = profile.name;
    document.getElementById('db-zodiac-sign').textContent = profile.zodiac;
    document.getElementById('db-dob-val').textContent =
        profile.dob && profile.dob !== '-' ? profile.dob : '13-01-2002';
    document.getElementById('db-avatar').src = profile.avatar;
    document.getElementById('profile-pic').src = profile.avatar;
}

// -------------- Profile Picture dropdown & Logout ---------------
const profilePic = document.getElementById('profile-pic');
const profileMenu = document.getElementById('profile-menu');
profilePic.onclick = function () {
    profileMenu.classList.toggle('active');
};
document.addEventListener('click', function (e) {
    if (!profilePic.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.remove('active');
    }
});
function logout() {
    document.getElementById('main-layout').style.display = 'none';
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('login-form').reset();
    document.getElementById('signup-form').reset();
    showSignupStep(1);
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('show-signup').style.display = 'block';
    document.getElementById('show-login').style.display = 'none';
    document.getElementById('welcome-text').textContent = 'Welcome Back!';
    document.getElementById('chat-messages').innerHTML = '';
    profileMenu.classList.remove('active');
}

function editProfile() {
    profileMenu.classList.remove('active');
    const modal = document.getElementById('edit-profile-modal');
    modal.style.display = 'flex';
    document.getElementById('edit-name').value = dummyUser.name;
    document.getElementById('edit-dob').value = dummyUser.dob;
    document.getElementById('edit-tob').value = dummyUser.tob;
    document.getElementById('edit-zodiac').value = dummyUser.zodiac;
}

function cancelEdit() {
    const modal = document.getElementById('edit-profile-modal');
    modal.style.display = 'none';
}

function saveProfile() {
    const newName = document.getElementById('edit-name').value;
    const newDob = document.getElementById('edit-dob').value;
    const newTob = document.getElementById('edit-tob').value;
    const newZodiac = document.getElementById('edit-zodiac').value;
    const newAvatar = document.getElementById('edit-profile-pic').files[0];

    dummyUser.name = newName;
    dummyUser.dob = newDob;
    dummyUser.tob = newTob;
    dummyUser.zodiac = newZodiac;

    if (newAvatar) {
        dummyUser.avatar = URL.createObjectURL(newAvatar);
    }

    updateDashboardProfile(dummyUser);
    cancelEdit();
}

// --------------- Chat History Logic ---------------
function toggleChatHistory() {
    const panel = document.getElementById('chat-history-panel');
    panel.classList.toggle('open');
}

function renderChatHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    dummyChatHistory.forEach(chat => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.setAttribute('data-chat-id', chat.id);
        li.innerHTML = `
            <div class="history-item-title">${chat.title}</div>
            <div class="history-item-date">${chat.date}</div>
        `;
        li.onclick = () => loadChatHistory(chat);
        historyList.appendChild(li);
    });
}

function loadChatHistory(chat) {
    const chatMessagesContainer = document.getElementById('chat-messages');
    chatMessagesContainer.innerHTML = '';
    chat.messages.forEach(msg => {
        appendChatMessage(msg.text, msg.who);
    });
    document.querySelectorAll('.history-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-chat-id="${chat.id}"]`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    renderChatHistory();
    updateDashboardProfile(dummyUser);
});


// --------------- Astrology Chat Logic ---------------
const chatMessages = document.getElementById('chat-messages');
const askInput = document.getElementById('ask-input');
const sendBtn = document.getElementById('ask-send-btn');
let isChatLoading = false;
let retryCount = 0;
const maxRetries = 5;
const baseDelay = 1000;

function appendChatMessage(text, who = 'user') {
    const el = document.createElement('div');
    el.className = 'chat-message';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + (who === 'user' ? 'user' : 'bot');
    bubble.innerHTML = text;
    el.appendChild(bubble);
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
function showLoader() {
    const el = document.createElement('div');
    el.className = 'spinner';
    el.id = 'chat-loading-spinner';
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
function removeLoader() {
    const spinner = document.getElementById('chat-loading-spinner');
    if (spinner) spinner.remove();
}

const API_KEY = "AIzaSyDMKJHi_xlaG4mu160lxxevMmFqK_Bx99s";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
async function fetchGeminiResponse(q, internalPrompt) {
    const prompt = internalPrompt ? internalPrompt + '\n\n' + q : q;
    const payload = {
        contents: [{
            role: "user",
            parts: [{ text: prompt }]
        }]
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetch(API_URL, requestOptions);

        if (!response.ok) {
            if ((response.status === 429 || response.status === 503) && retryCount < maxRetries) {
                const delay = baseDelay * Math.pow(2, retryCount);
                retryCount++;
                console.log(`Retrying API call in ${delay}ms... (Attempt ${retryCount}/${maxRetries})`);
                await new Promise(res => setTimeout(res, delay));
                return await fetchGeminiResponse(q, internalPrompt);
            }
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        retryCount = 0;

        if (result.candidates && result.candidates.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            console.error("No content generated:", result);
            return "The model did not return a response. Please try a different question.";
        }
    } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        return "An error occurred while communicating with the API. Please check your network and API key.";
    }
}

function askAstrologyQuestion(q) {
    if (!q.trim() || isChatLoading) return;
    appendChatMessage(q, 'user');
    askInput.value = '';
    isChatLoading = true;
    showLoader();

    const internalPrompt = `
### Persona and Role
You are **Zodia**, a friendly, upbeat, and positive astrologer. Your primary role is to provide personalized and insightful daily horoscope readings based on user input. Your tone is mystical, encouraging, and optimistic, like a wise and trusted friend who sees the bigger picture through the stars. Your responses should always focus on a positive, growth-oriented perspective. Avoid deterministic or negative predictions; instead, frame challenges as opportunities for learning and personal development.

---

### Core Instructions

1.  **Acknowledge and Validate:**
    Start each interaction by acknowledging the user's query with a warm and validating tone. Make them feel heard and understood. For example, "That's a powerful question to ask," or "Thank you for sharing that with me. The stars have a way of guiding us through these moments. ✨"

2.  **Gather Necessary Information:**
    If the user's query is broad, gently ask for specific details needed for a more accurate reading. The essential information is their **date of birth, time of birth, and place of birth**. Without this, you can offer general sun-sign advice, but always state that a detailed reading requires the full birth chart. For example, "To give you the most accurate reading, I'll need your full birth details: your date of birth, time, and place. This helps me map out your unique cosmic blueprint. 🗺️"

3.  **Provide a Holistic View:**
    Offer a balanced perspective that includes the astrological interpretation, its potential real-world implications, and a positive action step. If discussing a challenging planetary alignment, explain what it means, how it might manifest, and then suggest a practical way to navigate it, such as, "This alignment suggests a period of deep introspection. It’s an ideal time to journal and reflect on your core values. ✍️"

4.  **Use Astrological Language Sparingly and Explain It:**
    Use terms like **"retrograde," "aspect," "house,"** and **"sign"** as needed, but always provide a simple, clear explanation of what they mean in the context of the user's situation. For instance, "With Mercury in retrograde, communication can feel a bit tangled. This isn't a bad thing; it's the universe's gentle nudge to slow down and be more mindful of your words. 💬"

5.  **Focus on Empowerment and Free Will:**
    Emphasize that astrology is a tool for self-understanding, not a pre-written destiny. The user is always in control of their choices. End your readings with empowering statements like, "Remember, the stars influence, but you are the creator of your own path. 🌟" or "This knowledge is a gift to help you navigate your journey with greater awareness."

6.  **Maintain a Safe and Encouraging Space:**
    Never give medical, financial, or legal advice. If a user asks a question in these domains, gently redirect them to a professional. Acknowledge their concern and offer a more general, supportive astrological perspective. For example, "While I can't give financial advice, the current planetary movements suggest it's a good time to review your long-term goals and plan with intention. 📈"

---

### Key Phrase and Keyword Library

* **Warmth & Empathy:** *I hear you, Thank you for sharing, It's a powerful question, Let's look at what the stars have to say.*
* **Astrological Concepts:** *Your birth chart, Cosmic blueprint, Planetary alignment, House, Sign, Aspect, Retrograde.*
* **Empowerment:** *You are in control, The stars guide, but you decide, Use this knowledge, A period of growth, An opportunity to learn.*
* **Action-Oriented:** *Consider this, It's a great time to, You might find it helpful to.*
* **Rare Emojis:** ✨, 🗺️, ✍️, 💬, 🌟, 📈
`;

    fetchGeminiResponse(q, internalPrompt)
        .then(response => {
            removeLoader();
            appendChatMessage(response, 'bot');
            isChatLoading = false;
        })
        .catch(error => {
            removeLoader();
            appendChatMessage('Something went wrong. Please try again.', 'bot');
            isChatLoading = false;
        });
}

// --- Event Listeners ---
sendBtn.onclick = () => { askAstrologyQuestion(askInput.value); };
askInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') askAstrologyQuestion(askInput.value);
});

// Suggested Prompts
document.querySelectorAll('.prompt-chip').forEach(btn => {
    btn.onclick = () => askAstrologyQuestion(btn.textContent);
});