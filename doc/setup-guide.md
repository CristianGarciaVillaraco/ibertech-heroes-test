# Setup Guide

This document provides step-by-step instructions to set up and run the **Heroes App** locally.

---

## 📦 Prerequisites

Before starting, make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- **Angular CLI** (v20 or higher)

Install Angular CLI globally:

```bash
npm install -g @angular/cli
```

---

## 🚀 Installation

1. Clone the repository

```bash
git clone https://github.com/<your-username>/heroes-app.git
cd heroes-app
```

2. Install dependencies

```bash
npm install
```

---

## 🖥 Development Server

Start the local development server

```bash
ng serve
```

Open your browser at [http://localhost:4200](http://localhost:4200).
The app will automatically reload when source files change.

---

## 🛠 Build

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the **dist/** directory.

---

## 🧪 Testing

### Unit Tests

Run unit tests with:

```bash
ng test
```

### End-to-End Tests

Run e2e tests with:

```bash
ng e2e
```

> Note: Angular CLI no longer includes an e2e framework by default. You can integrate Cypress, Playwright, or another tool of your choice.

---

## ⚙️ Configuration Notes

- Data persistence: Currently handled via session storage and JSON dataset.
- Styling: Default setup uses Angular Material with CSS/SCSS. Tailwind CSS integration is under review.
- Legacy version: The 2022 Angular 13 implementation is available in the branch **legacy/2022-version**.

---

## ✅ Quick Checklist

- [] Node.js installed
- [] Angular CLI installed
- [] Dependencies installed (npm install)
- [] Development server running (ng serve)
