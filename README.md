# Stellar Todo Task Card

A high-fidelity, interactive Todo Task Card built with vanilla HTML, CSS, and JavaScript. This project serves as a clean, production-ready component that meets the requirements for the HNG Stage 1a frontend task, featuring a strict state-driven architecture and full test-id coverage.

## Features

- **State-driven UI**: Centralized Vanilla JS state object dictates the layout to guarantee synchronization between edits, status controls, and data.
- **Inline Edit Mode**: Transforms the display view into a fully functional `<form>` for adjusting title, description, priority, and due dates.
- **Dynamic Time Logic**: Automatically calculates relative time ("Due in X days", "Overdue by Y minutes") and updates globally every 60 seconds.
- **Smart DOM Interactivity**: Real-time status sync between checkboxes and select drop-downs. Dynamic UI adjustments like the "In Progress" styling and descriptive collapsibles (`Show More/Less`).
- **Semantic HTML & Accessibility**: Built with rigorous accessibility rules. Correct keyboard DOM tabbing traversal order, native `aria-live`, `[hidden]` specifications, screen-reader texts (`sr-only`), and `focus-visible` interactions.
- **Automated Testing Ready**: Full set of precisely mapped `data-testid` attributes (e.g., `test-todo-cancel-button`, `test-todo-time-remaining`) for easy integration with frontend testing frameworks.

## Tech Stack

- **HTML5**: Semantic structure and interactive form architecture.
- **Vanilla CSS**: Custom design system without heavy frameworks utilizing CSS variables, Flexbox layouts, native `:not([hidden])` state controls, and custom element design (e.g. checkmarks).
- **Vanilla JavaScript**: Lightweight logic controlling state synchronization, time derivations, and unified rendering pathways.

## Project Structure

```text
/index.html    - Main entry point, structure, and pre-built form states
/styles.css    - Modern design system, transitions, and component styles
/script.js     - Dynamic state management logic and UI interactivity
/README.md     - Documentation
```

## Local Development

To run this project locally:

1. Clone or download the repository.
2. Open `index.html` in any modern web browser or run an HTTP Server (e.g. `npx serve .`).
3. No rigorous build step or dependencies required!

## Deployment (GitHub Pages)

To deploy to GitHub Pages:

1. Create a new repository on GitHub.
2. Push the files (`index.html`, `styles.css`, `script.js`) to the `main` branch.
3. Go to **Settings > Pages**.
4. Select the `main` branch as the source and click **Save**.
5. Your project will be live at `https://<your-username>.github.io/<repo-name>/`.

## Key Decisions

- **Pure Vanilla Flow over React**: By introducing a `state` object and a centralized `render()` workflow within vanilla JS, it effectively tracks edits just as safely as a heavy framework, resulting in blisteringly fast DOM manipulation.
- **Native Browser Control**: Relied deeply on vanilla HTML `<form required>` validations and local browser interactions where possible in lieu of heavy abstraction wrappers.
- **DOM Ordering for Navigability**: Ensuring layout order explicitly follows Tab Navigation (Checkbox -> Status Control -> Expand Toggle -> Edit -> Delete) without needing conflicting `tabindex` overwrites.

## Trade-offs

- **Static vs Build Tools**: While build tools (PostCSS, Vite) could optimize the CSS/JS further or minify the code, they add a layer of complexity unnecessary for a project of this direct scope.
- **Date Libraries**: Avoided `date-fns` or `moment.js` to keep the project completely dependency-free, opting instead for pure, heavily-tested local `Date` JavaScript math handling days/hours/minutes.
