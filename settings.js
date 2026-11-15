// ১. মেনুবারের HTML ও CSS তৈরি করে পেজে বসিয়ে দেওয়া
document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .settings-wrapper { position: relative; display: inline-block; }
        .settings-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid var(--gold, #eab308);
            color: var(--gold, #eab308);
            padding: 7px 13px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            transition: 0.3s;
        }
        .settings-btn:hover { background: var(--gold, #eab308); color: #000; }
        .settings-dropdown {
            display: none;
            position: absolute;
            right: 0;
            top: 42px;
            background: #161826;
            border: 1px solid var(--gold, #eab308);
            border-radius: 10px;
            padding: 15px;
            width: 230px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
            z-index: 999;
            text-align: left;
        }
        .settings-dropdown.show { display: block; }
        .setting-item { margin-bottom: 14px; }
        .setting-item:last-child { margin-bottom: 0; }
        .setting-item label {
            display: block;
            font-size: 0.8rem;
            color: #94a3b8;
            margin-bottom: 6px;
            font-weight: 600;
        }
        .setting-item select, .theme-toggle-btn {
            width: 100%;
            padding: 8px;
            border-radius: 6px;
            background: #252942;
            color: #fff;
            border: 1px solid #3c4266;
            cursor: pointer;
            font-size: 0.85rem;
        }
        .color-dots { display: flex; gap: 10px; }
        .dot {
            width: 26px; height: 26px; border-radius: 50%; cursor: pointer;
            border: 2px solid #fff; transition: transform 0.2s;
        }
        .dot:hover { transform: scale(1.15); }

        /* Light Theme Overrides */
        body.light-mode {
            --bg-dark: #f1f5f9 !important;
            --card-bg: #ffffff !important;
            --text-main: #0f172a !important;
            --text-muted: #475569 !important;
            background-image: none !important;
            background-color: #f1f5f9 !important;
        }
        body.light-mode header { background: rgba(255, 255, 255, 0.92) !important; }
        body.light-mode .hero h1, body.light-mode h3, body.light-mode h4 { color: #0f172a !important; }
    `;
    document.head.appendChild(style);

    // মেনুবারে বাটন যুক্ত করা
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const wrapper = document.createElement('div');
        wrapper.className = 'settings-wrapper';
        wrapper.innerHTML = `
            <button class="settings-btn" id="gearBtn">⚙️ Menu</button>
            <div class="settings-dropdown" id="settingsMenu">
                <div class="setting-item">
                    <label>Theme (থিম)</label>
                    <button class="theme-toggle-btn" id="themeBtn">☀️ Light / 🌙 Dark</button>
                </div>
                <div class="setting-item">
                    <label>Language (ভাষা)</label>
                    <select id="langSelect">
                        <option value="en">English</option>
                        <option value="bn">বাংলা (Bengali)</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Accent Style (কালার)</label>
                    <div class="color-dots">
                        <div class="dot" style="background:#eab308;" onclick="setAccent('#eab308', 'rgba(234, 179, 8, 0.35)')"></div>
                        <div class="dot" style="background:#38bdf8;" onclick="setAccent('#38bdf8', 'rgba(56, 189, 248, 0.35)')"></div>
                        <div class="dot" style="background:#f43f5e;" onclick="setAccent('#f43f5e', 'rgba(244, 63, 94, 0.35)')"></div>
                        <div class="dot" style="background:#a855f7;" onclick="setAccent('#a855f7', 'rgba(168, 85, 247, 0.35)')"></div>
                    </div>
                </div>
            </div>
        `;
        navMenu.appendChild(wrapper);

        // ড্রপডাউন খোলা ও বন্ধ করা
        document.getElementById('gearBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('settingsMenu').classList.toggle('show');
        });
        document.addEventListener('click', () => {
            document.getElementById('settingsMenu').classList.remove('show');
        });
        document.getElementById('settingsMenu').addEventListener('click', (e) => e.stopPropagation());

        // থিম টগল
        document.getElementById('themeBtn').addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('vr_theme', isLight ? 'light' : 'dark');
        });

        // ভাষা পরিবর্তন
        const langSelect = document.getElementById('langSelect');
        langSelect.value = localStorage.getItem('vr_lang') || 'en';
        langSelect.addEventListener('change', (e) => {
            localStorage.setItem('vr_lang', e.target.value);
            applyLanguage(e.target.value);
        });
    }

    // আগে সেভ করা সেটিংস লোড করা
    if (localStorage.getItem('vr_theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    const savedColor = localStorage.getItem('vr_accent');
    const savedGlow = localStorage.getItem('vr_glow');
    if (savedColor) setAccent(savedColor, savedGlow);

    const savedLang = localStorage.getItem('vr_lang');
    if (savedLang) applyLanguage(savedLang);
});

// কালার স্টাইল পরিবর্তনের ফাংশন
function setAccent(color, glow) {
    document.documentElement.style.setProperty('--gold', color);
    document.documentElement.style.setProperty('--gold-glow', glow);
    localStorage.setItem('vr_accent', color);
    localStorage.setItem('vr_glow', glow);
}

// সহজ বাংলা/ইংরেজি অনুবাদ ফাংশন
function applyLanguage(lang) {
    const heroTitle = document.querySelector('.hero h1');
    const heroDesc = document.querySelector('.hero p');
    if (lang === 'bn') {
        if (heroTitle) heroTitle.innerHTML = 'আল্টিমেট <span>ম্যাজিক র‍্যাম্পেজ</span> আর্কাইভ';
        if (heroDesc) heroDesc.innerText = 'সেরা ক্যারেক্টার বিল্ড, গোপন ডানজন লোকেশন, এলিমেন্টাল গিয়ার কম্বিনেশন এবং ডুয়েল স্ট্র্যাটেজি খুঁজে নিন।';
    } else {
        if (heroTitle) heroTitle.innerHTML = 'Ultimate <span>Magic Rampage</span> Archive';
        if (heroDesc) heroDesc.innerText = 'Discover best character builds, secret dungeon locations, elemental gear combinations, and competitive duel strategies.';
    }
}
