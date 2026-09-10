// ===== Config =====
const GITHUB_USER = "kevinnjoroge-w";
const HIDE_REPOS = new Set(["kevinnjoroge-w", "skills-github-pages"]);

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile nav =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// ===== Nav background on scroll =====
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Reveal + animate skill bars on scroll =====
const revealEls = document.querySelectorAll("section");
revealEls.forEach((el) => el.setAttribute("data-reveal", ""));

function fillBars(scope) {
  scope.querySelectorAll(".bar").forEach((bar) => {
    const fill = bar.querySelector(".bar__fill");
    if (fill) fill.style.width = (bar.dataset.level || 0) + "%";
  });
}

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fillBars(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
  fillBars(document);
}

// ===== Contact form -> mailto =====
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = encodeURIComponent(data.get("name") || "");
    const email = encodeURIComponent(data.get("email") || "");
    const message = encodeURIComponent(data.get("message") || "");
    const body = `Name: ${decodeURIComponent(name)}%0AEmail: ${decodeURIComponent(
      email
    )}%0A%0A${message}`;
    window.location.href = `mailto:kevinnjorogewanjiku@gmail.com?subject=${encodeURIComponent(
      "Portfolio message from " + decodeURIComponent(name)
    )}&body=${body}`;
  });
}

// ===== Helpers =====
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

// ===== GitHub repos (live) =====
const reposEl = document.getElementById("repos");

function repoCard(repo) {
  const desc = repo.description ? escapeHtml(repo.description) : "No description provided.";
  const lang = repo.language
    ? `<span class="repo__lang"><span class="repo__dot"></span>${escapeHtml(repo.language)}</span>`
    : "";
  const stars = repo.stargazers_count > 0 ? `<span>★ ${repo.stargazers_count}</span>` : "";
  const homepage =
    repo.homepage && repo.homepage.trim()
      ? `<a href="${escapeHtml(repo.homepage)}" target="_blank" rel="noopener">Live ↗</a>`
      : "";
  return `
    <article class="glass-card project">
      <h4 class="project__title">${escapeHtml(repo.name)}</h4>
      <p class="project__desc">${desc}</p>
      <div class="repo__meta">${lang}${stars}</div>
      <div class="project__links">
        <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener">Code ↗</a>
        ${homepage}
      </div>
    </article>`;
}

async function loadRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const data = await res.json();
    const repos = data
      .filter((r) => !r.fork && !r.archived && !HIDE_REPOS.has(r.name))
      .sort((a, b) =>
        b.stargazers_count !== a.stargazers_count
          ? b.stargazers_count - a.stargazers_count
          : new Date(b.pushed_at) - new Date(a.pushed_at)
      );
    reposEl.innerHTML = repos.length
      ? repos.map(repoCard).join("")
      : `<p class="repos__error">No public repositories to show right now.</p>`;
  } catch (err) {
    reposEl.innerHTML = `<p class="repos__error">
      Couldn't load repositories live (${escapeHtml(err.message)}). Browse them on
      <a href="https://github.com/${GITHUB_USER}?tab=repositories" target="_blank" rel="noopener">GitHub</a>.</p>`;
  }
}
loadRepos();

// ===== Commit activity heatmap (tokenless) =====
const heatmapEl = document.getElementById("heatmap");

function levelClass(level) {
  return level > 0 ? "l" + level : "";
}

async function loadHeatmap() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`
    );
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    const days = (data.contributions || []).slice(-371); // ~53 weeks
    if (!days.length) throw new Error("no data");
    heatmapEl.innerHTML = days
      .map((d) => {
        const cls = levelClass(d.level);
        const title = `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`;
        return `<span class="day ${cls}" title="${title}"></span>`;
      })
      .join("");
  } catch (err) {
    heatmapEl.innerHTML = `<p class="heatmap__loading">Commit graph unavailable — see it on
      <a class="commits__link" href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">GitHub</a>.</p>`;
  }
}
loadHeatmap();
