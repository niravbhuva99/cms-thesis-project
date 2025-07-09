# Knowledge Base - API Documentation

This document provides comprehensive documentation for all public APIs, functions, and components in the Knowledge Base project.

## Table of Contents

1. [React Components](#react-components)
2. [Custom Hooks](#custom-hooks)
3. [Utility Functions](#utility-functions)
4. [Custom Editor](#custom-editor)
5. [Plugins](#plugins)
6. [Configuration](#configuration)

---

## React Components

### Button Component

**Location:** `src/components/button/button.tsx`

A reusable button component with customizable styling and behavior.

#### Props

```typescript
export type Props = {
    text: string            // Button text content
    href: string           // Link destination
    fitWidth?: boolean     // Optional: Allows non-full-width size (default: false)
    newWindow?: boolean    // Optional: Open link in new window (default: false)
}
```

#### Usage

```jsx
import Button from '@src/components/button/button'

// Basic usage
<Button text="Click Me" href="/docs/intro" />

// Open in new window with fitted width
<Button 
    text="External Link" 
    href="https://example.com" 
    newWindow={true} 
    fitWidth={true} 
/>
```

#### Features

- Tailwind CSS styling with hover effects
- Full-width or fitted width options
- Target window control
- Blue theme with white hover state

---

### Counter Component

**Location:** `src/components/counter/Counter.tsx`

An interactive counter component for demonstrations.

#### Props

No props required.

#### Usage

```jsx
import Counter from '@src/components/counter/Counter'

<Counter />
```

#### Features

- State management with React hooks
- Increment button with styled appearance
- Count display

---

### FloatingImage Component

**Location:** `src/components/floatingImage/floatingImage.tsx`

A sophisticated image component with zoom functionality and flexible positioning.

#### Props

```typescript
export interface Props {
    img: any               // Required: Image import (must use require())
    type?: 'left' | 'right' | 'center'  // Optional: Image alignment (default: 'center')
    width?: string         // Optional: Image width (default: '50%')
    alt?: string          // Optional: Alt text
    disableZoom?: boolean  // Optional: Disable zoom functionality (default: false)
}
```

#### Usage

```jsx
import FloatingImage from '@src/components/floatingImage/floatingImage'

// Basic centered image
<FloatingImage img={require('./image.png')} alt="Example image" />

// Left-aligned with custom width
<FloatingImage 
    img={require('./image.png')} 
    type="left" 
    width="30%" 
    alt="Left aligned image" 
/>

// Image without zoom functionality
<FloatingImage 
    img={require('./image.png')} 
    disableZoom={true} 
    alt="Non-zoomable image" 
/>
```

#### Features

- Three alignment options: left, right, center
- Click-to-zoom functionality with portal overlay
- Support for both regular images and SVG components
- Responsive design with customizable dimensions
- Error handling for improperly imported images

---

### Image Component

**Location:** `src/components/image/image.tsx`

A simple image component with dimension controls.

#### Props

```typescript
type Props = {
    src: string           // Required: Image source URL
    alt?: string          // Optional: Alt text
    height?: string       // Optional: Height (default: '100%')
    maxHeight?: string    // Optional: Maximum height
    width?: string        // Optional: Width (default: '100%')
    maxWidth?: string     // Optional: Maximum width
}
```

#### Usage

```jsx
import Image from '@src/components/image/image'

// Basic usage
<Image src="/path/to/image.jpg" alt="Description" />

// With custom dimensions
<Image 
    src="/path/to/image.jpg" 
    alt="Custom sized image"
    width="300px"
    maxHeight="200px"
/>
```

---

### LayoutWrapper Component

**Location:** `src/components/layoutWrapper.tsx`

A wrapper component that applies Docusaurus layout with metadata.

#### Props

```typescript
export type Props = {
    children: ReactNode | ReactNode[]  // Required: Content to wrap
    title: string                      // Required: Page title
    description: string                // Required: Page description
}
```

#### Usage

```jsx
import LayoutWrapper from '@src/components/layoutWrapper'

<LayoutWrapper 
    title="My Page" 
    description="This is my page description"
>
    <div>Your content here</div>
</LayoutWrapper>
```

#### Features

- Integrates with Docusaurus theme
- SEO metadata support
- Global JSX element declarations for custom elements

---

### HomepageFeatures Component

**Location:** `src/components/HomepageFeatures/index.tsx`

A feature showcase component for the homepage.

#### Props

No props required.

#### Usage

```jsx
import HomepageFeatures from '@src/components/HomepageFeatures'

<HomepageFeatures />
```

#### Features

- Displays three main features with icons
- Uses HeroIcons for visual elements
- Responsive grid layout
- Pre-configured feature list for MDX integration, live preview, and GitHub deployment

---

## Custom Hooks

### useUser Hook

**Location:** `src/components/hooks.tsx`

A custom hook for fetching and managing user information.

#### Interface

```typescript
interface IUserAPIUser {
  firstname: string
  lastname: string
  email: string
  name: string
  displayName: string
  scopes: string
}
```

#### Usage

```jsx
import { useUser } from '@src/components/hooks'

function MyComponent() {
    const user = useUser()
    
    return (
        <div>
            <h1>Welcome, {user.displayName}</h1>
            <p>Email: {user.email}</p>
        </div>
    )
}
```

#### Features

- Fetches user data from `/user-api/currentUser` endpoint
- Provides default user data during loading
- Automatic data fetching on component mount

---

## Utility Functions

### FrontendUtils

**Location:** `src/utils/frontendUtils.ts`

Utility class with helper functions for frontend operations.

#### Methods

##### serializeClasses

Combines multiple CSS class names, filtering out falsy values.

```typescript
static serializeClasses(...classes: any[]): string
```

#### Usage

```javascript
import FrontendUtils from '@src/utils/frontendUtils'

// Combine classes, filtering out undefined/null values
const className = FrontendUtils.serializeClasses(
    'base-class',
    isActive && 'active',
    isDisabled && 'disabled',
    null, // This will be filtered out
    'another-class'
)
// Result: "base-class active another-class"
```

---

## Custom Editor

The custom editor is built on Decap CMS and provides MDX editing capabilities with live preview.

### Main Editor Component

**Location:** `customEditor/src/editor.tsx`

#### Features

- MDX content editing with live preview
- Link modification and validation
- React component integration
- HTML table processing
- Automatic AST generation and manipulation

### Custom Widgets

#### TagsWidget

**Location:** `customEditor/src/custom-widget/TagsWidget.tsx`

Widget for managing comma-separated tags.

```typescript
// Control Props
{
    field: any
    onChange: any
    forID: any
    classNameWrapper: any
    value: any
}

// Preview Props
{
    value: string[]
}
```

#### SlugWidget

**Location:** `customEditor/src/custom-widget/SlugWidget.tsx`

Widget for URL slug input.

```typescript
{
    onChange: any
    forID: any
    classNameWrapper: any
    value: any
}
```

#### DescriptionWidget

**Location:** `customEditor/src/custom-widget/DescriptionWidget.tsx`

Widget for page descriptions with character counting.

#### SidebarPositionWidget

**Location:** `customEditor/src/custom-widget/SidebarPositionWidget.tsx`

Widget for configuring sidebar position.

#### ImageUploadWidget

**Location:** `customEditor/src/custom-widget/UploadImage.tsx`

Widget for base64 image uploads with preview.

### API Functions

#### fetchImage

**Location:** `customEditor/src/api/fetchImage.js`

Fetches images from GitHub repository and converts them to blob URLs.

```javascript
const fetchImage = async (img, setSrc) => {
    // Implementation handles relative paths and GitHub API integration
}
```

**Parameters:**
- `img`: Image path (supports relative paths with ../)
- `setSrc`: Callback function to set the image source

**Features:**
- GitHub API integration
- Relative path resolution
- Base64 to blob conversion
- Support for multiple image formats (PNG, SVG, JPEG)

### Editor Components

#### ReactComponents Scope

**Location:** `customEditor/src/components/ReactComponents.tsx`

Defines available React components for use in MDX content.

```typescript
const scope = {
    Button: (props: ButtonProps) => <Button {...props} />,
    FloatingImage: (props: FloatingImageProps) => <ModifyImage {...props} />,
    Counter: (props: any) => <Counter {...props} />,
    require: (url: string) => url
}
```

#### Available Components in MDX

- `<Button>` - Interactive button component
- `<FloatingImage>` - Image component with zoom functionality
- `<Counter>` - Interactive counter demonstration

### Plugins

#### modifyLinksPlugin

**Location:** `customEditor/src/plugin/modifyLinksPlugin.js`

Processes and modifies links in MDX content for proper routing.

#### processHTML

**Location:** `customEditor/src/plugin/processHTML.js`

Processes HTML content, particularly for table elements.

---

## Plugins

### Tailwind Plugin

**Location:** `src/plugins/tailwind/index.js`

Docusaurus plugin that configures PostCSS for Tailwind CSS processing.

#### Configuration

```javascript
module.exports = function (context, options) {
    return {
        name: 'tailwind-plugin',
        configurePostCss(postcssOptions) {
            postcssOptions.plugins = [
                require('postcss-import'),
                require('tailwindcss'),
                require('autoprefixer'),
            ]
            return postcssOptions
        },
    }
}
```

#### Usage

Add to `docusaurus.config.ts`:

```typescript
plugins: [
    require.resolve('./src/plugins/tailwind')
]
```

---

## Configuration

### Docusaurus Configuration

**Location:** `docusaurus.config.ts`

Main configuration for the Docusaurus site.

#### Key Configuration Options

```typescript
const config: Config = {
  title: "My Site",
  tagline: "Dinosaurs are cool",
  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",
  
  // GitHub integration
  organizationName: "facebook",
  projectName: "docusaurus",
  
  // Content configuration
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }
    ],
  ],
}
```

### Sidebar Configuration

**Location:** `sidebars.ts`

Configures the documentation sidebar structure.

```typescript
const sidebars: SidebarsConfig = {
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
}
```

---

## Development Workflow

### Available Scripts

```bash
# Start development server
npm run start

# Build for production
npm run build

# Build with webpack and create CF bundle
npm run build:cf

# Development server with webpack
npm run dev

# Format code
npm run format

# Type checking
npm run typecheck
```

### Environment Setup

1. **Dependencies**: Install with `npm install`
2. **Environment Variables**: Configure GitHub token for image fetching
3. **Development**: Use `npm run dev` for webpack development or `npm start` for Docusaurus

### Best Practices

1. **Component Development**:
   - Use TypeScript for type safety
   - Include proper prop interfaces
   - Add error handling for edge cases

2. **Image Handling**:
   - Use `require()` for local image imports
   - Provide meaningful alt text
   - Consider using FloatingImage for better UX

3. **MDX Content**:
   - Leverage available React components
   - Use proper markdown syntax
   - Test content in the editor preview

4. **Styling**:
   - Use Tailwind CSS classes
   - Follow existing design patterns
   - Ensure responsive design

This documentation covers all public APIs, components, and utilities available in the Knowledge Base project. Each section includes practical examples and usage patterns to help developers effectively use and extend the codebase.