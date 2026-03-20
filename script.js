document.getElementById('year').textContent = new Date().getFullYear();

const GITHUB_USERNAME = 'preethamamin22';
const githubContainer = document.getElementById('github-projects');

async function fetchGithubRepos() {
    try {
        const [response, specificResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`),
            fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/Daily-Market-Prices-Of-Coffee-And-Pepper`)
        ]);

        if (!response.ok) throw new Error('API limit or error');

        let repos = await response.json();

        // Ensure the specific project is always included at the top
        if (specificResponse.ok) {
            const specificRepo = await specificResponse.json();
            repos = repos.filter(r => r.id !== specificRepo.id); // Prevent duplicates
            repos.unshift(specificRepo);
        }
        githubContainer.innerHTML = '';

        if (repos.length === 0) {
            githubContainer.innerHTML = '<p>No public repositories found.</p>';
            return;
        }

        repos.forEach((repo) => {
            if (repo.fork) return;

            let projectUrl = repo.homepage;
            if (!projectUrl || projectUrl === "") {
                projectUrl = `https://${GITHUB_USERNAME}.github.io/${repo.name}`;
            }

            const card = document.createElement('div');
            card.className = 'project-card';

            card.innerHTML = `
                <div>
                    <h3 class="project-title">${repo.name.replace(/-/g, ' ')}</h3>
                    <p class="project-desc">${repo.description || 'A unique digital experience carefully crafted to solve real-world problems.'}</p>
                </div>
                <div class="project-meta">
                    <span>${repo.language || 'Design'}</span>
                    <a href="${projectUrl}" target="_blank" class="project-link">View Project &rarr;</a>
                </div>
            `;

            githubContainer.appendChild(card);
        });

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
