# task-manager README
A task manager for tracking workspace tasks.

# Setup Instructions for Task Manager Extension

Follow these steps to set up the Task Manager VS Code extension for development:

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/)

## 1. Clone the Repository
```
git clone <repository-url>
cd task-manager
```

## 2. Install Dependencies
```
npm install
```

## 3. Build the Extension (and Webview UI)
- To build and watch for changes during development:
```
npm run watch
```

## 4. Open in VS Code
- Open the project folder in VS Code:
```
code .
```

## 5. Launch the Extension
- Press `F5` in VS Code to open a new Extension Development Host window with the Task Manager extension loaded.

---

## Testing (Playwright E2E)

This project uses Playwright to drive VS Code for end-to-end tests. Use the provided npm scripts:

- Full E2E flow (runs smoke first, then runs the rest excluding record and smoke tests):
```bash
npm run e2e
```

- Record new steps with VS Code visible (for prototyping tests):
```bash
npm run record
```

Notes:
- The suite includes fixtures and page objects under `src/test/` to automate VS Code and keep tests maintainable.
- Keep adding specs under `src/test/` and they will be picked up by the Playwright runner.


For more details, see the [VS Code Extension documentation](https://code.visualstudio.com/api/get-started/your-first-extension) or the TODO.md for project-specific tasks.
