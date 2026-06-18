# Aphelion Systems

Affordable, full-stack web & software studio for small businesses — built and run by [Jack Little](https://github.com/jacklittle4).

**Live site:** https://aphelionsystems.dev/

Aphelion Systems designs and builds websites, web apps, databases, and servers, plus quick touch-ups and maintenance — all priced for small businesses that need real, working software without enterprise overhead.

## What this is

This repository contains the Aphelion Systems marketing site: a static, multi-page website built with plain HTML, CSS, and JavaScript. No frameworks, no build step — just files you can open in a browser.

The studio offers:

- **Websites** — marketing sites, landing pages, and brochure sites.
- **Web apps** — custom application front-ends and interactive tools.
- **Databases** — schema design, data modeling, and storage setup.
- **Servers** — backend APIs, hosting, and deployment.
- **Touch-ups** — fixes, refreshes, and ongoing maintenance for existing sites.

## Design

The site uses a **cosmic / constellation theme**:

- An **animated canvas background** (`#space`) driven by `script.js` renders a drifting field of stars and connecting constellation lines behind the content.
- **Scroll-reveal animations** use an `IntersectionObserver` that watches every element marked with the `[data-reveal]` attribute, fading and sliding content into view as it enters the viewport.

Styling lives entirely in `styles.css`, and all interactivity lives in `script.js`.

## Files & pages

| Path | Purpose |
| --- | --- |
| `index.html` | Home / landing page |
| `services.html` | Services overview |
| `pricing.html` | Pricing tiers |
| `about.html` | About the studio |
| `faq.html` | Frequently asked questions |
| `process.html` | How projects are run, step by step |
| `contact.html` | Contact form |
| `thank-you.html` | Post-submission confirmation page |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `styles.css` | All site styling |
| `script.js` | Animated `#space` canvas + scroll-reveal logic |
| `assets/` | Images, icons, and other static media |
| `sitemap.xml` | Sitemap for search engines |
| `robots.txt` | Crawler directives |

## Preview locally

Because the site is fully static, you have two options:

1. **Just open it.** Double-click `index.html`, or open it in your browser.
2. **Serve the folder** with any static server (recommended, so relative paths and forms behave like production):

   ```bash
   # Python 3
   python3 -m http.server 8000

   # or Node (no install)
   npx serve .
   ```

   Then visit http://localhost:8000.

## Deploy

The site is deployed with **GitHub Pages** from the **`main` branch root**:

1. Push to `main`.
2. In the repo, go to **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**.
4. GitHub publishes to https://aphelionsystems.dev/.

## Launch checklist

Before sharing the site with prospects:

- [ ] Use **aphelionsystems.dev@gmail.com** as the contact address until a domain and a matching email are owned.
- [ ] **Submit one test form** so FormSubmit confirms the Gmail destination address (the first submission triggers the activation email).
- [ ] If the Pages URL ever changes, **update the page titles, meta descriptions, and `sitemap.xml`** to match.
- [ ] **Do not add a `CNAME` file** until a real domain is actually purchased.
- [ ] **Add analytics later** once the site is live and stable.
- [ ] **Review pricing and policies** (pricing tiers, privacy, terms) before sending the site to prospects.
- [ ] **Keep case studies current** as new client work ships.

## License

[MIT](LICENSE) © 2026 Jack Little (Aphelion Systems).
