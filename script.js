document.getElementById('year').textContent = new Date().getFullYear();

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
    'shreevaraha': 'A regional e-commerce storefront for agricultural products, emphasizing local sourcing, pricing tables, and whatsapp order links.',
    'sree-shoba-concretes': 'A professional business page for a building materials manufacturer, showcasing product categories, catalogs, and dynamic maps.',
    'zennuc-deco': 'A minimalist design system showcase for interior decorating, featuring smooth CSS animations and product catalogs.',
    'zepto-hiring': 'An interactive high-performance career application interface mockup built with pixel-perfect responsive layouts.'
};

async function fetchGithubRepos() {
    try {
        const [response, specificResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
            fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/Daily-Market-Prices-Of-Coffee-And-Pepper`)
        ]);

        if (!response.ok) throw new Error('API limit or error');

        let repos = await response.json();

        // Ensure the specific project is always included at the top of our raw repos list
        if (specificResponse.ok) {
            const specificRepo = await specificResponse.json();
            repos = repos.filter(r => r.id !== specificRepo.id); // Prevent duplicates
            repos.unshift(specificRepo);
        }

        // Filter out forks and excluded repositories, and store in global array
        allRepos = repos.filter(repo => {
            if (repo.fork) return false;
            const repoNameLower = repo.name.toLowerCase();
            return !EXCLUDED_REPOS.has(repoNameLower);
        });

        if (allRepos.length === 0) {
            githubContainer.innerHTML = '<p>No public repositories found.</p>';
            return;
        }

        // Render controls and initial filtered list
        generateFilterButtons();
        filterAndRenderRepos();

    } catch (error) {
        console.error('GitHub fetch error:', error);
        githubContainer.innerHTML = `
            <div class="project-card">
                <h3 class="project-title">View All Github Repos</h3>
                <p class="project-desc">Check out all my work directly on GitHub.</p>
                <div class="project-meta">
                    <span>External Link</span>
                    <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="project-link">View GitHub &rarr;</a>
                </div>
            </div>
        `;
    }
}

function generateFilterButtons() {
    if (!filterTagsContainer) return;
    
    // Get unique languages from non-fork repos
    const languages = new Set();
    allRepos.forEach(repo => {
        if (repo.language) {
            languages.add(repo.language);
        }
    });

    // Reset container with default "All" button
    filterTagsContainer.innerHTML = `<button class="filter-btn active" data-filter="all">All</button>`;

    // Add buttons for each language
    languages.forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-filter', lang);
        btn.textContent = lang;
        filterTagsContainer.appendChild(btn);
    });

    // Add click event listeners to filter buttons
    const filterBtns = filterTagsContainer.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
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
        
        // Search query check
        const matchesSearch = name.includes(searchQuery) || 
                              description.includes(searchQuery) || 
                              language.includes(searchQuery);
        
        // Category filter check
        const matchesFilter = activeFilter === 'all' || repo.language === activeFilter;

        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        githubContainer.innerHTML = '<p class="text-center" style="grid-column: 1 / -1; padding: 40px 0; color: var(--text-secondary);">No projects match your criteria.</p>';
        return;
    }

    filtered.forEach((repo) => {
        let projectUrl = repo.homepage;
        if (!projectUrl || projectUrl === "") {
            projectUrl = `https://${GITHUB_USERNAME}.github.io/${repo.name}`;
        }

        const displayName = repo.name
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

        const card = document.createElement('div');
        card.className = 'project-card';

        const descKey = repo.name.toLowerCase();
        const customDesc = CUSTOM_DESCRIPTIONS[descKey];
        const descriptionText = customDesc || repo.description || 'A unique digital experience carefully crafted to solve real-world problems.';

        card.innerHTML = `
            <div>
                <h3 class="project-title">${displayName}</h3>
                <p class="project-desc">${descriptionText}</p>
            </div>
            <div class="project-meta">
                <span>${repo.language || 'Design'}</span>
                <a href="${projectUrl}" target="_blank" class="project-link">View Project &rarr;</a>
            </div>
        `;

        githubContainer.appendChild(card);
    });
}

// Search input listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterAndRenderRepos();
    });
}

fetchGithubRepos();

// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}
