## Description

An error occurs when attempting to import a Docusaurus Swizzle component into Netlify CMS. Webpack throws an error for each Docusaurus client API component used within the Swizzle component.

## Steps to Reproduce

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Go to the static/admin/customEditor/editor.tsx file.
5. Import any Swizzle component from the src/theme directory that uses Docusaurus client API components.
6. Run the development server using `npm start`.
7. Observe the error thrown by webpack when trying to import the Swizzle component

## Expected Behavior

Upon importing a Docusaurus Swizzle component into Netlify CMS, webpack should successfully resolve the imports of Docusaurus client API components within the Swizzle component without throwing any errors.
