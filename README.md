# Heroes App

A simple Angular application for managing heroes. Originally built in 2022 as part of a company admission test, the project has since evolved into a modern learning and demonstration environment for Angular 20, standalone APIs, clean architecture, and updated UI practices.

---

## 📌 Project Purpose

The main goals of this project are:

- Showcase modern Angular 20 features (standalone components, updated router, signals, etc.)
- Implement a clean and scalable application structure.
- Demonstrate CRUD operations using a fictional heroes dataset.
- Provide a playground for UI, routing, state management, and API integration.
- Legacy version includes limited test coverage.

---

## 🛠 Tech Stack

- Angular 20 (standalone components, Angular Material)
- TypeScript
- RxJS
- Angular Material
- Node.js (development server)
- Git & GitHub for version control
- CSS / SCSS / Tailwind (planned) for styling experiments

---

## 🚀 Usage

### **Development Server**

Start the development server with:

```bash
ng serve
```

Open your browser at: [http://localhost:4200](http://localhost:4200)
The app will automatically reload when source files change.

### Build

```bash
ng build
```

Compiled files are output to **dist/** and optimized for production.

### Testing

- **Unit Tests**

```bash
ng test
```

- **End-to-End Test**

```bash
ng e2e
```

**Note: Angular CLI** no longer includes an e2e framework by default. You can integrate Cypress, Playwright, or another tool of your choice.

---

## 📚 Features

- Hero listing with filtering.
- Add new heroes via a form.
- Delete heroes.
- Search functionality (implemented as a filter).
- Data persistence using session storage (to be replaced with a more robust solution in future versions).
- JSON-based dataset for demo purposes.

---

## 🏷 Legacy Version

A previous version of this project (from 2022) is preserved in the following branch:

```bash
legacy/2022-version
```

This branch contains the original **Angular 13 + Angular Material + SCSS** implementation used in the admission test. It remains available for historical reference.

---

## 🔮 Roadmap

- Replace session storage with a more scalable solution (without a custom backend)
- Improve styling (considering Tailwind CSS as an alternative to SCSS)
- Complete unit and e2e test coverage
- Enhance UI/UX with modern Angular Material components

---
