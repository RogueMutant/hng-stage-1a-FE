# Stellar Todo Task Card

A high-fidelity, interactive Todo Task Card built with vanilla HTML, CSS, and JavaScript. This project serves as a clean, production-ready component that meets the requirements for the HNG Stage 0 frontend task.

## 🚀 Features

- **Modern UI**: Polished design using Inter typography and a curated color palette.
- **Dynamic Time Logic**: Automatically calculates relative time ("Due in X days", "Overdue by Y hours") and updates every 60 seconds.
- **Interactivity**: Smooth transitions for hover states and completion toggling.
- **Semantic HTML**: Built with accessibility and SEO best practices in mind.
- **Automated Testing Ready**: Full set of `data-testid` attributes for easy integration with testing frameworks.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure.
- **Vanilla CSS**: Custom design system without heavy frameworks.
- **Vanilla JavaScript**: Lightweight logic for time calculations and UI state management.

## 📦 Project Structure

```text
/index.html    - Main entry point and semantic structure
/styles.css    - Modern design system and component styles
/script.js     - Dynamic logic and interactivity
/README.md     - Documentation
```

## 🏗️ Local Development

To run this project locally:

1. Clone or download the repository.
2. Open `index.html` in any modern web browser.
3. No build step or dependencies required!

## 🌐 Deployment (GitHub Pages)

To deploy to GitHub Pages:

1. Create a new repository on GitHub.
2. Push the files (`index.html`, `styles.css`, `script.js`) to the `main` branch.
3. Go to **Settings > Pages**.
4. Select the `main` branch as the source and click **Save**.
5. Your project will be live at `https://<your-username>.github.io/<repo-name>/`.

## 🧠 Key Decisions

- **Vanilla over React**: For a single component, vanilla JS provides the best performance and simplicity while meeting all functional requirements without the overhead of a virtual DOM.
- **Relative Time Logic**: Implemented custom logic to handle days, hours, and minutes for both future and past (overdue) dates to provide the best UX.
- **Design System**: Focused on high-contrast typography and subtle shadows to create a "premium" feel that mimics modern SaaS interfaces.

## ⚖️ Trade-offs

- **Static vs Build Tools**: While build tools (PostCSS, Vite) could optimize the CSS/JS further, they add complexity that isn't necessary for a project of this scope. Keeping it "plain" makes it easier to understand and maintain.
- **Date Libraries**: Avoided `date-fns` or `moment.js` to keep the project dependency-free, opting instead for native JavaScript `Date` math.
