# Brandon Kimutai Kiplangat — Portfolio

A modern, minimalist personal portfolio for Brandon Kimutai Kiplangat.

## Features
- Clean, responsive layout (mobile-first)
- Light/Dark mode with toggle and persistence
- Smooth reveal animations via IntersectionObserver
- Projects auto-loaded from GitHub (`brandonkkip000-web`), highlighting security/automation CLIs
- Simple contact form using `mailto:` (replace email in `js/main.js`)

## Quick Start
1. Open `index.html` in a modern browser.
2. Update the contact email in `js/main.js` (search for `yourEmail`).
3. Optionally add your LinkedIn URL in the Contact section.

## Customize
- Update text in `index.html` sections: `#home`, `#about`, `#projects`, `#skills`, `#contact`.
- Colors and spacing via CSS custom properties in `css/styles.css`.
- Highlighted GitHub projects list in `js/main.js` (`highlight` array).

## Deploy
- GitHub Pages: push this folder to a repo and enable Pages (root). 
- Netlify/Vercel: drag-and-drop the folder or connect your repo; output directory is project root.

## Notes
- GitHub API rate limits unauthenticated requests. If projects fail to load temporarily, a fallback message and a link to your GitHub profile are shown.
- For a real backend contact form, use Formspree, Netlify Forms, or your own API.
