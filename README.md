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

For more details, see the [VS Code Extension documentation](https://code.visualstudio.com/api/get-started/your-first-extension) or the TODO.md for project-specific tasks.
