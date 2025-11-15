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

## 📂 Project Structure

For the complete and updated folder organization, please refer to the [Architecture Overview](./doc/architecture-overview.md).

## 🔄 Data Flow

This section describes the data flow based on the current architecture after the refactor.

## 🚀 Usage

For setup instructions and how to run the project, see the **[Setup Guide](./docs/setup-guide.md)**.

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

## 📖 Documentation

Additional documentation is available in the `/docs` folder:

- **architecture-overview.md** → Explains the project’s structure and design decisions
- **setup-guide.md** → Step-by-step instructions to set up and run the project
- **changelog.md** → (Optional) Tracks major changes and updates across versions
