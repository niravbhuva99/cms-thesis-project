# 🧠 Decap CMS + Docusaurus Extension (Bachelor Thesis)

This repository extends **Decap CMS** to support **MDX, internal linking**, and **folder-scoped image management**, integrated with a **Docusaurus v3** static site.

## 🚀 Getting Started

### Prerequisites

- Node.js v18+

### Installation

```bash
git clone https://github.com/niravbhuva99/cms-thesis-project
cd cms-thesis-project
npm install
```

---

## 🏗️ Development Workflow

### Local Development

```bash
# Start Docusaurus dev server
npm run build

# In separate terminal: Start Decap CMS server
npx decap-server

# Access CMS at: http://localhost:3000/editor/
```

---

## 🛠 Project Structure

```
cms-thesis-project/
├── customEditor/               # CMS Extension Code
│   ├── src/
│   │   ├── editor.tsx          # CMS integration core
│   │   ├── api/                # Media handling APIs
│   │   ├── components/         # Custom UI components
│   │   └── custom-widget/      # CMS editor widgets
│   └── build/                  # Compiled output
│
├── docs/                       # Content directory
│   ├── thesis/                 # MDX content files
│   └── technical/
│
├── src/                        # Docusaurus components
│   └── components/             # Custom React components
│
├── static/                     # Static assets
│   └── editor/                 # CMS admin panel
│
├── docusaurus.config.ts        # Site config
└── webpack.config.js           # Build configuration
```

### Key Directories

1. **customEditor/src**

   - `editor.tsx `: CMS integration core
   - `modifyLinksPlugin.js`: Processes internal links
   - `UploadImage.tsx`: Folder-scoped image widget
   - `ReactComponents.tsx`: MDX component scope

2. **src/components**
   - Custom Docusaurus components (buttons, layouts, etc)
3. **static/admin**
   - `config.yml`: CMS configuration
   - `bundle.js`: Compiled editor bundle
4. **webpack.config.js**
   - Custom Webpack config for compiling editor.tsx into bundle.js, includes TypeScript, MDX, dotenv, and GitHub-compatible polyfills

---

### Hosting

1. **Netlify**: Automatic CI/CD from GitHub

---

## � Troubleshooting

| Issue                  | Solution                                       |
| ---------------------- | ---------------------------------------------- |
| CMS not loading        | Verify decap-server is running                 |
| MDX components missing | Check component scope in `ReactComponents.tsx` |
| Image upload fails     | Verify GitHub repo permissions                 |
| Broken internal links  | Run link transformation plugin                 |

---

## 🧰 Tech Stack

- **Framework**: [Docusaurus v3](https://docusaurus.io)
- **CMS**: [Decap CMS](https://decapcms.org)
- **Rendering**: [MDX v2](https://mdxjs.com)
- **Language**: TypeScript
- **CI/CD**: GitHub Actions

---

## 📚 Thesis Scope

1. MDX support in headless CMS
2. Folder-based media management
3. internal linking
4. Docusaurus integration architecture
5. Custom CMS widget development

---

## 👨‍💻 Author

**Nirav Bhuva**  
Computer Science BSc  
Hochschule Merseburg  
[GitHub](https://github.com/niravbhuva99) | [LinkedIn](https://linkedin.com/in/niravbhuva)

```


```
