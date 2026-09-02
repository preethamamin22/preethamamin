// ==========================================================================
// PREETHAM B R — PRODUCT DESIGNER × VIBE CODER
// Master JavaScript (Theme Toggle, Custom Cursor, Scroll Spy, Projects Grid)
// ==========================================================================

// --------------------------------------------------------------------------
// 1. Theme Toggle & LocalStorage Persistence
// --------------------------------------------------------------------------
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function initTheme() {
    const savedTheme = localStorage.getItem('preetham_theme');
    if (savedTheme) {
        htmlEl.className = savedTheme;
    } else {
        htmlEl.className = 'light';
    }
}

initTheme();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlEl.classList.contains('dark') ? 'light' : 'dark';
        htmlEl.className = newTheme;
        localStorage.setItem('preetham_theme', newTheme);
    });
}

// --------------------------------------------------------------------------
// 2. Desktop Custom Cursor
// --------------------------------------------------------------------------
const cursorRing = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('cursor-dot');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

if (cursorRing && cursorDot && window.innerWidth > 768) {
    document.body.classList.add('cursor-active');

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover effect for clickable project cards
    document.querySelectorAll('.clickable-card').forEach(card => {
        card.addEventListener('mouseenter', () => cursorRing.classList.add('hovering-card'));
        card.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering-card'));
    });
}

// --------------------------------------------------------------------------
// 3. Clickable Featured Cards Navigation
// --------------------------------------------------------------------------
document.querySelectorAll('.clickable-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const href = card.getAttribute('data-href');
        if (href && !e.target.closest('a')) {
            window.location.href = href;
        }
    });
});

// --------------------------------------------------------------------------
// 4. Sticky Navbar Scroll & Active Section Spy
// --------------------------------------------------------------------------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            currentId = sec.getAttribute('id');
        }
    });

    navAnchors.forEach(a => {
        a.classList.remove('active');
        if (currentId && a.getAttribute('href') === `#${currentId}`) {
            a.classList.add('active');
        }
    });
}, { passive: true });

// Mobile Menu Drawer
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}

// --------------------------------------------------------------------------
// 5. Scroll Reveal Intersection Observer
// --------------------------------------------------------------------------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --------------------------------------------------------------------------
// 6. Other Projects Grid & GitHub Sync
// --------------------------------------------------------------------------
const GITHUB_USERNAME = 'preethamamin22';
const otherProjectsGrid = document.getElementById('other-projects-grid');
const filterTabsContainer = document.getElementById('filter-tabs');

const REAL_PROJECTS = [
    {
        name: 'Daily Market Prices Of Coffee And Pepper',
        category: 'Vibe Coding',
        lang: 'TypeScript',
        desc: 'A live commodity pricing tracker providing real-time data insights and visual graphs for coffee and pepper market changes.',
        demo: 'https://daily-market-prices-of-coffee-and-p.vercel.app',
        code: 'https://github.com/preethamamin22/Daily-Market-Prices-Of-Coffee-And-Pepper'
    },
    {
        name: 'Legal Document Simplifier',
        category: 'UI/UX',
        lang: 'JavaScript',
        desc: 'An AI-powered legal text simplifier translating complex agreements into readable bullet points using automated language pipelines.',
        demo: 'https://legal-document-simplifier-gilt.vercel.app',
        code: 'https://github.com/preethamamin22/LEGAL-DOCUMENT-SIMPLIFIER'
    },
    {
        name: 'Ananya Homestay',
        category: 'Product Design',
        lang: 'TypeScript',
        desc: 'A fully responsive homestay booking platform featuring dynamic date picking, room selections, and visual catalogs.',
        demo: 'https://ananyahomestay.vercel.app',
        code: 'https://github.com/preethamamin22/Ananyahomestay'
    },
    {
        name: 'BlockDevs Platform',
        category: 'UI/UX',
        lang: 'HTML',
        desc: 'A landing platform for blockchain developers, featuring modern neon accents, clean layout components, and resource links.',
        demo: 'https://blockdevs-nine.vercel.app',
        code: 'https://github.com/preethamamin22/blockdevs'
    },
    {
        name: 'Blue Cohort Management',
        category: 'Product Design',
        lang: 'HTML',
        desc: 'A student cohort dashboard interface providing clean progress bars, module tracking, and schedule visualizers for online courses.',
        demo: 'https://bluecohortmanagement.vercel.app',
        code: 'https://github.com/preethamamin22/Bluecohortmanagement'
    },
    {
        name: 'Alankaram',
        category: 'Web Design',
        lang: 'HTML',
        desc: 'A premium responsive web landing page styled with clean aesthetics and smooth typography showcasing interior design concepts.',
        demo: 'https://alankaram.vercel.app',
        code: 'https://github.com/preethamamin22/Alankaram'
    },
    {
        name: 'Shreevaraha Store',
        category: 'Web Design',
        lang: 'HTML',
        desc: 'A regional storefront for agricultural products, emphasizing local sourcing, pricing tables, and WhatsApp order links.',
        demo: 'https://shreevaraha.vercel.app',
        code: 'https://github.com/preethamamin22/shreevaraha'
    },
    {
        name: 'Sree Shoba Concretes',
        category: 'Web Design',
        lang: 'TypeScript',
        desc: 'A professional business page for a building materials manufacturer, showcasing product categories, catalogs, and dynamic maps.',
        demo: null,
        code: 'https://github.com/preethamamin22/SREE-SHOBA-CONCRETES'
    },
    {
        name: 'ZenNuc Deco',
        category: 'Product Design',
        lang: 'HTML',
        desc: 'A minimalist design system showcase for interior decorating, featuring smooth CSS animations and product catalogs.',
        demo: 'https://zen-nuc-deco.vercel.app',
        code: 'https://github.com/preethamamin22/ZenNuc-Deco'
    },
    {
        name: 'Zepto Hiring Mockup',
        category: 'Experiments',
        lang: 'CSS',
        desc: 'An interactive high-performance career application interface mockup built with pixel-perfect responsive layouts.',
        demo: 'https://zepto-hiring.vercel.app',
        code: 'https://github.com/preethamamin22/Zepto-Hiring'
    },
    {
        name: 'Code Generator Tool',
        category: 'Experiments',
        lang: 'Python',
        desc: 'An automated script designed to generate clean boilerplate code templates for standard design patterns and layout blocks.',
        demo: 'https://code-generator-tan.vercel.app',
        code: 'https://github.com/preethamamin22/-Code-Generator'
    }
];

let activeFilterCategory = 'all';

function renderOtherProjects() {
    if (!otherProjectsGrid) return;
    otherProjectsGrid.innerHTML = '';

    const filtered = REAL_PROJECTS.filter(p => {
        if (activeFilterCategory === 'all') return true;
        return p.category === activeFilterCategory;
    });

    if (filtered.length === 0) {
        otherProjectsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">No projects in this category.</p>`;
        return;
    }

    filtered.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-grid-card reveal';

        const demoBtn = proj.demo ? `<a href="${proj.demo}" target="_blank">Live Demo ↗</a>` : '';
        const codeBtn = proj.code ? `<a href="${proj.code}" target="_blank">Code ↗</a>` : '';

        card.innerHTML = `
            <div>
                <span class="tag-pill" style="margin-bottom: 12px; display: inline-block;">${proj.category}</span>
                <h3 class="grid-card-title">${proj.name}</h3>
                <p class="grid-card-desc">${proj.desc}</p>
            </div>
            <div class="grid-card-footer">
                <span class="grid-card-lang">
                    <span class="lang-dot" style="background: var(--accent);"></span>
                    ${proj.lang}
                </span>
                <div class="grid-card-links">
                    ${demoBtn} ${codeBtn}
                </div>
            </div>
        `;

        otherProjectsGrid.appendChild(card);
        revealObserver.observe(card);
    });
}

if (filterTabsContainer) {
    filterTabsContainer.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            filterTabsContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            activeFilterCategory = e.target.getAttribute('data-filter');
            renderOtherProjects();
        });
    });
}

renderOtherProjects();
