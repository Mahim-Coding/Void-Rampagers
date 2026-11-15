document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .settings-wrapper { position: relative; display: inline-block; }
        .settings-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid var(--gold, #eab308);
            color: var(--gold, #eab308);
            padding: 6px 12px;
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
            top: 40px;
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
        body.light-mode .hero h1, body.light-mode .page-header h1, body.light-mode h3, body.light-mode h4 { color: #0f172a !important; }
    `;
    document.head.appendChild(style);

    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const wrapper = document.createElement('div');
        wrapper.className = 'settings-wrapper';
        wrapper.innerHTML = `
            <button class="settings-btn" id="gearBtn">⚙️ Settings</button>
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
                        <option value="es">Español (Spanish)</option>
                        <option value="fr">Français (French)</option>
                        <option value="de">Deutsch (German)</option>
                        <option value="ar">العربية (Arabic)</option>
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

        document.getElementById('gearBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('settingsMenu').classList.toggle('show');
        });
        document.addEventListener('click', () => {
            document.getElementById('settingsMenu').classList.remove('show');
        });
        document.getElementById('settingsMenu').addEventListener('click', (e) => e.stopPropagation());

        document.getElementById('themeBtn').addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('vr_theme', isLight ? 'light' : 'dark');
        });

        const langSelect = document.getElementById('langSelect');
        langSelect.value = localStorage.getItem('vr_lang') || 'en';
        langSelect.addEventListener('change', (e) => {
            localStorage.setItem('vr_lang', e.target.value);
            applyLanguage(e.target.value);
        });
    }

    if (localStorage.getItem('vr_theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    const savedColor = localStorage.getItem('vr_accent');
    const savedGlow = localStorage.getItem('vr_glow');
    if (savedColor) setAccent(savedColor, savedGlow);

    const savedLang = localStorage.getItem('vr_lang');
    if (savedLang) applyLanguage(savedLang);
});

function setAccent(color, glow) {
    document.documentElement.style.setProperty('--gold', color);
    document.documentElement.style.setProperty('--gold-glow', glow);
    localStorage.setItem('vr_accent', color);
    localStorage.setItem('vr_glow', glow);
}

function applyLanguage(lang) {
    const heroTitle = document.querySelector('.hero h1');
    const heroDesc = document.querySelector('.hero p');
    const pageTitle = document.querySelector('.page-header h1');
    const pageDesc = document.querySelector('.page-header p');

    const translations = {
        en: {
            homeTitle: "Ultimate <span>Magic Rampage</span> Archive",
            homeDesc: "Discover best character builds, secret dungeon locations, elemental gear combinations, and competitive duel strategies.",
            arsenalTitle: "Magic Rampage <span>Arsenal</span>",
            arsenalDesc: "Complete collection of Suits, Weapons, Potions, and Skill Tree upgrades."
        },
        bn: {
            homeTitle: "আল্টিমেট <span>ম্যাজিক র‍্যাম্পেজ</span> আর্কাইভ",
            homeDesc: "সেরা ক্যারেক্টার বিল্ড, গোপন ডানজন লোকেশন, এলিমেন্টাল গিয়ার কম্বিনেশন এবং ডুয়েল স্ট্র্যাটেজি খুঁজে নিন।",
            arsenalTitle: "ম্যাজিক র‍্যাম্পেজ <span>আর্সেনাল</span>",
            arsenalDesc: "স্যুট, অস্ত্র, পোশন এবং স্কিল ট্রি আপগ্রেডের সম্পূর্ণ সংগ্রহ।"
        },
        es: {
            homeTitle: "Archivo Definitivo de <span>Magic Rampage</span>",
            homeDesc: "Descubre las mejores builds de personajes, ubicaciones de mazmorras secretas y combinaciones de equipos.",
            arsenalTitle: "Arsenal de <span>Magic Rampage</span>",
            arsenalDesc: "Colección completa de trajes, armas, pociones y mejoras del árbol de habilidades."
        },
        fr: {
            homeTitle: "Archive Ultime de <span>Magic Rampage</span>",
            homeDesc: "Découvrez les meilleures configurations de personnages, donjons secrets et combinaisons d'équipements.",
            arsenalTitle: "Arsenal de <span>Magic Rampage</span>",
            arsenalDesc: "Collection complète de tenues, armes, potions et améliorations."
        },
        de: {
            homeTitle: "Ultimatives <span>Magic Rampage</span> Archiv",
            homeDesc: "Entdecke die besten Charakter-Builds, geheime Dungeons und Ausrüstungskombinationen.",
            arsenalTitle: "<span>Magic Rampage</span> Arsenal",
            arsenalDesc: "Vollständige Sammlung von Anzügen, Waffen, Tränken und Fähigkeiten."
        },
        ar: {
            homeTitle: "أرشيف <span>ماجيك رامبيج</span> الشامل",
            homeDesc: "اكتشف أفضل تصميمات الشخصيات، وأماكن الزنزانات السرية، ومجموعات المعدات.",
            arsenalTitle: "ترسانة <span>ماجيك رامبيج</span>",
            arsenalDesc: "المجموعة الكاملة من البدلات والأسلحة والجرع وترقيات مهارات الشجرة."
        }
    };

    if (translations[lang]) {
        if (heroTitle) heroTitle.innerHTML = translations[lang].homeTitle;
        if (heroDesc) heroDesc.innerText = translations[lang].homeDesc;
        if (pageTitle) pageTitle.innerHTML = translations[lang].arsenalTitle;
        if (pageDesc) pageDesc.innerText = translations[lang].arsenalDesc;
    }
}
