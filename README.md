# 💼 Kevin Njoroge — Personal Portfolio

> A fast, responsive personal portfolio showcasing my skills, experience, and projects — with a Projects section that pulls **live from my GitHub** so it never goes stale.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🧐 About

My personal portfolio website — built with plain HTML, CSS, and JavaScript (no framework, no build step). The **Projects** section fetches my public repositories straight from the GitHub REST API at page load, so featured work stays in sync with my GitHub automatically. A curated "Featured" row highlights projects with live deployments.

- **Live:** https://kevinnjoroge-w.github.io/portfolio/
- **GitHub:** https://github.com/kevinnjoroge-w

---

## ✨ Features

- ⚡ **No build step** — pure HTML, CSS, and vanilla JS
- 🔄 **Live GitHub sync** — repositories are fetched from the GitHub API at runtime
- 📱 **Fully responsive** — mobile, tablet, and desktop
- 🎨 **Modern dark UI** — glassmorphism cards and gradient accents
- 🧭 **Single-page** with smooth scrolling and a mobile menu

---

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic structure and content |
| **CSS3** | Styling, layout (Grid/Flexbox), responsive design |
| **JavaScript (ES6+)** | Mobile nav, scroll reveal, live GitHub repo fetch |

---

## 📁 Project Structure

```
portfolio/
├── index.html      # Markup and content
├── css/
│   └── style.css   # Theme, layout, responsive styles
├── js/
│   └── main.js     # Nav, scroll behavior, GitHub API fetch
├── Kevin-Njoroge-CV.pdf
└── README.md
```

To change which repos are hidden from the auto-generated list, edit the `HIDE_REPOS` set at the top of `js/main.js`.

---

## 🚀 Getting Started

No tooling required — it's a static site.

```bash
git clone https://github.com/kevinnjoroge-w/portfolio
cd portfolio
# Open index.html directly, or serve locally:
python3 -m http.server 8000   # then visit http://localhost:8000
```

> Tip: open via a local server (not `file://`) so the GitHub API fetch works without CORS issues.

---

## 👨‍💻 Author

**Kevin Njoroge Wanjiku** — Computer Science student & full-stack developer · Ruaka, Kenya

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/kevin-njoroge-560674279/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/kevinnjoroge-w)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=flat-square&logo=gmail)](mailto:kevinnjorogewanjiku@gmail.com)

---

*Just keep coding. 🚀*
