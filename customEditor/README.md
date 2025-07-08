# Decap CMS

Decap CMS is designed to be super easy to use for editing content. It's perfect for folks who aren't familiar with GitHub. So, managing content for projects becomes a breeze!

## Run locally

1. clone the repository [clone](https://github.tools.sap/sapit-cloud-technologies/sapit-cloud-knowledge-base-content/tree/feat/wysiwyg-editor)
2. Switch to docusaurus
3. npm i
4. npm run build
5. [Start the local-approuter as described in the Technical Component Repository ](https://github.tools.sap/sapit-cloud-technologies/sapit-cloud-knowledge-base#local-development-setup)
6. Open your browser and go to [http://localhost:5001/knowledgebase/editor/](http://localhost:5001/knowledgebase/editor/).

## Technical Details

In `editor.tsx`, the core functionality for extending Decap CMS from handling Markdown (`*.md`) to MDX (`*.mdx`) is implemented.

This file defines two crucial components: `CustomMdxWidget` and `CustomPreview`. These components are responsible for processing MDX content within the CMS interface. Notably, `CustomPreview` validates markdown content, converts it into an Abstract Syntax Tree (AST), and applies custom plugins before rendering. This ensures accurate rendering and previewing of MDX content with additional features.

Additionally, custom styles, widgets, and plugins are registered with Decap CMS to extend its capabilities to support MDX. Features like tags, image uploaders, descriptions, and slug controls are integrated to enhance the editing experience. Finally, the CMS is initialized at the file's end, enabling seamless integration of MDX content editing within the Decap CMS interface.

## issue

1. The details tag is not rendering correctly.
2. When attempting to import a Docusaurus component into Netlify CMS, Webpack throws an error.

## Setting up the CMS

For details on how to configure the CMS, take a look at the [decap-cms](https://decapcms.org/docs/intro/)

## common-mdx-problems

Before writing Markdown, please read [this](https://docusaurus.io/docs/migration/v3#common-mdx-problems), as some syntax may not be allowed in MDX v3.
