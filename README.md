
# 🧠 Decap CMS + Docusaurus Extension (Bachelor Thesis)

This repository contains the bachelor thesis project.
It extends **Decap CMS** to support **MDX, internal linking**, and **folder-scoped image management**, integrated with a **Docusaurus** static site.


## 🚀 Getting Started

These instructions will get your local development environment set up to run the project.

### 1. Clone the Repository

```bash
git clone https://github.com/niravbhuva99/cms-thesis-project
cd my-website
````

### 2. Install Dependencies

```bash
npm install
```

> Uses Docusaurus v3, React, and TypeScript.

---

## 🏗️ Local Development

```bash
npm run start
```

This starts the Docusaurus dev server at `http://localhost:3000`.


---

## 🛠 Project Structure

```bash
docs/                 # Thesis content in MDX
├── thesis/           
│   └── intro.mdx     # Project overview and motivation
static/               # Images and other static assets
src/                  # React components like <FloatingImage />
docusaurus.config.ts  # Site config (title, navbar, footer, themes)
sidebars.ts           # Sidebar layout for documentation
```

---

## 🧪 Build for Production

To build a static version of the site:

```bash
npm run build
```

Output goes to `build/`, ready for GitHub Pages or Vercel/Netlify deployment.

---

## 🧰 Technologies Used

* [Docusaurus v3](https://docusaurus.io/)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Decap CMS](https://decapcms.org/)
* [MDX](https://mdxjs.com/)
* GitHub CI/CD (manual deployment via push or PR)

---

## 📚 Thesis Scope

This project includes:

* Extending Decap CMS to support `.mdx` files with JSX components
* Live preview rendering of JSX content
* Support for folder-scoped media (images)
* Seamless integration with a Docusaurus static site

---

## 🧑‍💻 Author

**Nirav Babubhai Bhuva**
Bachelor of Computer Science
Hochschule Merseburg

---
