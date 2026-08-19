// =============================================
// INIT
// =============================================
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// =============================================
// NAVBAR — scroll class & active section spy
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, { passive: true });

// Section Scroll-Spy for Nav Links
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (currentSectionId && anchor.getAttribute('href') === `#${currentSectionId}`) {
            anchor.classList.add('active');
        }
    });
}, { passive: true });

// =============================================
// MOBILE MENU
// =============================================
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// =============================================
// TYPEWRITER EFFECT
// =============================================
const roles = [
    'for Startups.',
    'as a Product Designer.',
    'as a UI/UX Expert.',
    'as a Vibe Coder.',
    'for the Future.',
];

const typewriterEl = document.getElementById('typewriter-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

function type() {
    if (!typewriterEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 55 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2200; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400; // pause before typing next
    }

    typewriterTimeout = setTimeout(type, speed);
}

if (typewriterEl) {
    setTimeout(type, 800);
}

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// =============================================
// GITHUB PROJECTS & FALLBACK DATA
// =============================================
const GITHUB_USERNAME = 'preethamamin22';
const githubContainer = document.getElementById('github-projects');
const searchInput = document.getElementById('project-search');
const filterTagsContainer = document.getElementById('filter-tags');

let allRepos = [];
let activeFilter = 'all';
let searchQuery = '';

const EXCLUDED_REPOS = new Set([
    'wedding-invitation',
    'preethamamin',
    'mohan',
    'food-recommends-based-on-your-mood',
    'preethamamin22',
    'hii',
    'hello',
    'preetham-portfolio',
    'preetham-portfolieo',
    'webdesign',
    'portfolio-2022-next.js',
    'portfolio-2022-nextjs',
    'portfolio--2022-next.js',
    'preetham.com',
    'hiiiii',
    'portfolio-2022',
    'preetham',
    'website'
]);

const CUSTOM_DESCRIPTIONS = {
    '-code-generator': 'An automated Python script designed to generate clean, boilerplate code templates for standard design patterns and frontend layout blocks.',
    'alankaram': 'A premium responsive web landing page styled with clean aesthetics and smooth typography, showcasing architectural or interior design concepts.',
    'ananyahomestay': 'A fully responsive homestay booking platform featuring dynamic date picking, room selections, and visual catalogs.',
    'blockdevs': 'A landing platform for blockchain developers, featuring modern neon gradients, clean layout components, and resource links.',
    'bluecohortmanagement': 'A student cohort dashboard interface providing clean progress bars, module tracking, and schedule visualizers for online courses.',
    'daily-market-prices-of-coffee-and-pepper': 'A live commodity pricing tracker providing real-time data insights and visual graphs for coffee and pepper market changes.',
    'legal-document-simplifier': 'An AI-powered legal text simplifier translating complex agreements into readable bullet points using automated language pipelines.',
    'outvox-solution': 'A corporate service landing page optimized for fast loading speeds, SEO headers, and user registration flows.',
    'outvoxsolution-hr': 'An HR administration dashboard facilitating employee attendance tracking, payroll overview, and team organization hierarchies.',
    'shreevaraha': 'A regional e-commerce storefront for agricultural products, emphasizing local sourcing, pricing tables, and WhatsApp order links.',
    'sree-shoba-concretes': 'A professional business page for a building materials manufacturer, showcasing product categories, catalogs, and dynamic maps.',
    'zennuc-deco': 'A minimalist design system showcase for interior decorating, featuring smooth CSS animations and product catalogs.',
    'zepto-hiring': 'An interactive high-performance career application interface mockup built with pixel-perfect responsive layouts.'
};

// Curated Fallback Projects list to guarantee project rendering even when GitHub API rate-limits
const FALLBACK_PROJECTS = [
    {
        name: 'Daily-Market-Prices-Of-Coffee-And-Pepper',
        language: 'TypeScript',
        homepage: 'https://daily-market-prices-of-coffee-and-p.vercel.app',
        html_url: 'https://github.com/preethamamin22/Daily-Market-Prices-Of-Coffee-And-Pepper',
        description: CUSTOM_DESCRIPTIONS['daily-market-prices-of-coffee-and-pepper']
    },
    {
        name: 'LEGAL-DOCUMENT-SIMPLIFIER',
        language: 'JavaScript',
        homepage: 'https://legal-document-simplifier-gilt.vercel.app',
        html_url: 'https://github.com/preethamamin22/LEGAL-DOCUMENT-SIMPLIFIER',
        description: CUSTOM_DESCRIPTIONS['legal-document-simplifier']
    },
    {
        name: 'Outvox-solution',
        language: 'JavaScript',
        homepage: 'https://outvox-solution.vercel.app',
        html_url: 'https://github.com/preethamamin22/Outvox-solution',
        description: CUSTOM_DESCRIPTIONS['outvox-solution']
    },
    {
        name: 'outvoxsolution-hr',
        language: 'JavaScript',
        homepage: null,
        html_url: 'https://github.com/preethamamin22/outvoxsolution-hr',
        description: CUSTOM_DESCRIPTIONS['outvoxsolution-hr']
    },
    {
        name: 'Ananyahomestay',
        language: 'TypeScript',
        homepage: 'https://ananyahomestay.vercel.app',
        html_url: 'https://github.com/preethamamin22/Ananyahomestay',
        description: CUSTOM_DESCRIPTIONS['ananyahomestay']
    },
    {
        name: 'blockdevs',
        language: 'HTML',
        homepage: 'https://blockdevs-nine.vercel.app',
        html_url: 'https://github.com/preethamamin22/blockdevs',
        description: CUSTOM_DESCRIPTIONS['blockdevs']
    },
    {
        name: 'Bluecohortmanagement',
        language: 'HTML',
        homepage: 'https://bluecohortmanagement.vercel.app',
        html_url: 'https://github.com/preethamamin22/Bluecohortmanagement',
        description: CUSTOM_DESCRIPTIONS['bluecohortmanagement']
    },
    {
        name: 'Alankaram',
        language: 'HTML',
        homepage: 'https://alankaram.vercel.app',
        html_url: 'https://github.com/preethamamin22/Alankaram',
        description: CUSTOM_DESCRIPTIONS['alankaram']
    },
    {
        name: 'shreevaraha',
        language: 'HTML',
        homepage: 'https://shreevaraha.vercel.app',
        html_url: 'https://github.com/preethamamin22/shreevaraha',
        description: CUSTOM_DESCRIPTIONS['shreevaraha']
    },
    {
        name: 'SREE-SHOBA-CONCRETES',
        language: 'TypeScript',
        homepage: null,
        html_url: 'https://github.com/preethamamin22/SREE-SHOBA-CONCRETES',
        description: CUSTOM_DESCRIPTIONS['sree-shoba-concretes']
    },
    {
        name: 'ZenNuc-Deco',
        language: 'HTML',
        homepage: 'https://zen-nuc-deco.vercel.app',
        html_url: 'https://github.com/preethamamin22/ZenNuc-Deco',
        description: CUSTOM_DESCRIPTIONS['zennuc-deco']
    },
    {
        name: 'Zepto-Hiring',
        language: 'CSS',
        homepage: 'https://zepto-hiring.vercel.app',
        html_url: 'https://github.com/preethamamin22/Zepto-Hiring',
        description: CUSTOM_DESCRIPTIONS['zepto-hiring']
    },
    {
        name: '-Code-Generator',
        language: 'Python',
        homepage: 'https://code-generator-tan.vercel.app',
        html_url: 'https://github.com/preethamamin22/-Code-Generator',
        description: CUSTOM_DESCRIPTIONS['-code-generator']
    }
];

const LANG_COLORS = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Vue': '#42b883',
    'React': '#61dafb',
    'Shell': '#89e051',
    'Design': '#6366f1',
};

function formatUrl(url) {
    if (!url) return null;
    url = url.trim();
    if (url === '' || url === 'null') return null;
    if (!/^https?:\/\//i.test(url)) {
        return 'https://' + url;
    }
    return url;
}

async function fetchGithubRepos() {
    try {
        const [response, specificResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
            fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/Daily-Market-Prices-Of-Coffee-And-Pepper`).catch(() => null)
        ]);

        if (!response.ok) {
            throw new Error(`GitHub API HTTP ${response.status}`);
        }

        let repos = await response.json();

        if (specificResponse && specificResponse.ok) {
            const specificRepo = await specificResponse.json();
            repos = repos.filter(r => r.id !== specificRepo.id);
            repos.unshift(specificRepo);
        }

        allRepos = repos.filter(repo => {
            if (repo.fork) return false;
            const repoNameLower = repo.name.toLowerCase();
            return !EXCLUDED_REPOS.has(repoNameLower);
        });

        if (allRepos.length === 0) {
            allRepos = FALLBACK_PROJECTS;
        }

    } catch (error) {
        console.warn('Using curated fallback projects due to GitHub API limit/error:', error.message);
        allRepos = FALLBACK_PROJECTS;
    }

    generateFilterButtons();
    filterAndRenderRepos();
}

function generateFilterButtons() {
    if (!filterTagsContainer) return;

    const languages = new Set();
    allRepos.forEach(repo => {
        const lang = repo.language || 'Design';
        if (lang) languages.add(lang);
    });

    filterTagsContainer.innerHTML = `<button class="filter-btn active" data-filter="all">All</button>`;

    languages.forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-filter', lang);
        btn.textContent = lang;
        filterTagsContainer.appendChild(btn);
    });

    filterTagsContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterTagsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeFilter = e.target.getAttribute('data-filter');
            filterAndRenderRepos();
        });
    });
}

function filterAndRenderRepos() {
    if (!githubContainer) return;

    githubContainer.innerHTML = '';

    const filtered = allRepos.filter(repo => {
        const name = repo.name.toLowerCase();
        const description = (repo.description || '').toLowerCase();
        const language = (repo.language || 'design').toLowerCase();

        const matchesSearch = name.includes(searchQuery) ||
            description.includes(searchQuery) ||
            language.includes(searchQuery);

        const matchesFilter = activeFilter === 'all' || (repo.language || 'Design') === activeFilter;

        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        githubContainer.innerHTML = '<p class="text-center" style="grid-column: 1 / -1; padding: 60px 0; color: var(--text-secondary);">No projects match your criteria.</p>';
        return;
    }

    filtered.forEach((repo, index) => {
        const displayName = repo.name
            .replace(/^-/, '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

        const descKey = repo.name.toLowerCase();
        const customDesc = CUSTOM_DESCRIPTIONS[descKey];
        const descriptionText = customDesc || repo.description || 'A unique digital experience carefully crafted to solve real-world problems.';

        const lang = repo.language || 'Design';
        const langColor = LANG_COLORS[lang] || '#6366f1';

        const demoUrl = formatUrl(repo.homepage);
        const repoUrl = formatUrl(repo.html_url) || `https://github.com/${GITHUB_USERNAME}/${repo.name}`;

        const card = document.createElement('div');
        card.className = 'project-card reveal';
        const delayClass = `reveal-delay-${(index % 4) + 1}`;
        card.classList.add(delayClass);

        let linksHtml = '';
        if (demoUrl && demoUrl !== repoUrl) {
            linksHtml += `<a href="${demoUrl}" target="_blank" class="project-link demo-link">Live Demo ↗</a>`;
        }
        linksHtml += `<a href="${repoUrl}" target="_blank" class="project-link">Code ↗</a>`;

        card.innerHTML = `
            <div>
                <h3 class="project-title">${displayName}</h3>
                <p class="project-desc">${descriptionText}</p>
            </div>
            <div class="project-meta">
                <span class="project-lang-badge">
                    <span class="project-lang-dot" style="background: ${langColor};"></span>
                    ${lang}
                </span>
                <div class="project-links">
                    ${linksHtml}
                </div>
            </div>
        `;

        githubContainer.appendChild(card);
        revealObserver.observe(card);
    });
}

// Search listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterAndRenderRepos();
    });
}

fetchGithubRepos();
