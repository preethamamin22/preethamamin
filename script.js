// =============================================
// INIT
// =============================================
document.getElementById('year').textContent = new Date().getFullYear();

// =============================================
// NAVBAR — scroll class
// =============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// =============================================
// MOBILE MENU
// =============================================
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
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

// Start typewriter after a brief delay for a polished feel
setTimeout(type, 800);

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // only animate once
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// =============================================
// GITHUB PROJECTS
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

// Language → accent color mapping for visual variety
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

async function fetchGithubRepos() {
    try {
        const [response, specificResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
            fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/Daily-Market-Prices-Of-Coffee-And-Pepper`)
        ]);

        if (!response.ok) throw new Error('API limit or error');

        let repos = await response.json();

        if (specificResponse.ok) {
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
            githubContainer.innerHTML = '<p>No public repositories found.</p>';
            return;
        }

        generateFilterButtons();
        filterAndRenderRepos();

    } catch (error) {
        console.error('GitHub fetch error:', error);
        githubContainer.innerHTML = `
            <div class="project-card">
                <h3 class="project-title">View All GitHub Repos</h3>
                <p class="project-desc">Check out all my work directly on GitHub.</p>
                <div class="project-meta">
                    <span class="project-lang-badge"><span class="project-lang-dot"></span>External</span>
                    <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="project-link">View GitHub →</a>
                </div>
            </div>
        `;
    }
}

function generateFilterButtons() {
    if (!filterTagsContainer) return;

    const languages = new Set();
    allRepos.forEach(repo => {
        if (repo.language) languages.add(repo.language);
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

        const matchesFilter = activeFilter === 'all' || repo.language === activeFilter;

        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        githubContainer.innerHTML = '<p class="text-center" style="grid-column: 1 / -1; padding: 60px 0; color: var(--text-secondary);">No projects match your criteria.</p>';
        return;
    }

    filtered.forEach((repo, index) => {
        let projectUrl = repo.homepage;
        if (!projectUrl || projectUrl === '') {
            projectUrl = `https://${GITHUB_USERNAME}.github.io/${repo.name}`;
        }

        const displayName = repo.name
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

        const card = document.createElement('div');
        card.className = 'project-card reveal';
        // Stagger reveal for project cards
        const delayClass = `reveal-delay-${(index % 4) + 1}`;
        card.classList.add(delayClass);

        const descKey = repo.name.toLowerCase();
        const customDesc = CUSTOM_DESCRIPTIONS[descKey];
        const descriptionText = customDesc || repo.description || 'A unique digital experience carefully crafted to solve real-world problems.';

        const lang = repo.language || 'Design';
        const langColor = LANG_COLORS[lang] || '#6366f1';

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
                <a href="${projectUrl}" target="_blank" class="project-link">View Project →</a>
            </div>
        `;

        githubContainer.appendChild(card);

        // Observe newly added cards for reveal
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
