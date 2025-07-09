# Implementation Documentation: Extending Decap CMS with MDX Support

**Bachelor Thesis Project**  
**Author:** Nirav Babubhai Bhuva  
**Institution:** Hochschule Merseburg  
**Program:** Bachelor of Computer Science

---

## 1. Introduction

### 1.1 Project Overview

This project extends **Decap CMS** (formerly Netlify CMS), an open-source headless content management system, to support **MDX (Markdown + JSX)** content authoring with live preview capabilities. The system addresses critical limitations in modern content management workflows by providing:

- **MDX Support**: Enable content editors to write JSX components directly within the CMS editor
- **Live JSX Preview**: Real-time rendering of React components in the CMS preview pane
- **GitHub-based Link Validation**: Automatic internal link processing and validation using GitHub API
- **Folder-scoped Image Management**: Support for decentralized image storage with relative path resolution

### 1.2 Problem Statement

Traditional content management systems, including the standard Decap CMS, face several limitations when dealing with modern documentation workflows:

1. **No JSX Component Support**: Editors cannot insert interactive React components within content
2. **Broken Internal Linking**: Links between content files are not properly resolved or validated
3. **Limited Image Management**: Images must be centrally stored, limiting folder-based organization
4. **Poor Preview Experience**: No live rendering of dynamic content elements

### 1.3 Solution Approach

The project solves these problems by:

- **Extending Decap CMS** with custom widgets and preview components
- **Implementing MDX parsing** using unified/remark ecosystem
- **Creating GitHub API integration** for file validation and image handling
- **Building a plugin system** for modular content processing
- **Providing fallback mechanisms** for unknown components

---

## 2. System Design

### 2.1 Core Architecture Overview

The system follows a **plugin-based architecture** that extends Decap CMS without modifying its core functionality. The main processing flow consists of:

```
User Input (MDX) → AST Generation → Validation → Link Processing → Component Resolution → Live Preview
```

### 2.2 MDX Content Processing Pipeline

#### 2.2.1 Parsing and AST Generation
- **Input**: Raw MDX content from the CMS editor
- **Process**: Uses `mdast-util-from-markdown` with MDX JSX extensions to generate an Abstract Syntax Tree (AST)
- **Output**: Structured AST representing both Markdown and JSX elements

#### 2.2.2 Link Validation and Modification
- **Detection**: Identifies internal links within the AST using `unist-util-visit`
- **GitHub API Integration**: Validates link targets against repository structure
- **Transformation**: Converts relative links to absolute URLs for the live site

#### 2.2.3 Component Scope Mapping
- **Component Detection**: Extracts JSX component names from the AST
- **Scope Resolution**: Maps components to available React components or fallback handlers
- **Dynamic Loading**: Allows runtime addition of new components to the scope

### 2.3 GitHub API Integration

The system leverages GitHub's API for two main purposes:

#### 2.3.1 File Validation
```javascript
const query = `repo:${repo} filename:${filename} path:${path} extension:mdx`;
const response = await fetch(`https://api.github.com/search/code?q=${query}`, {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});
```

#### 2.3.2 Image Processing
- **Base64 Retrieval**: Fetches images from GitHub as base64-encoded content
- **Path Resolution**: Handles relative paths (./image.png, ../assets/image.png)
- **Content Type Detection**: Automatically determines image MIME types
- **Blob Creation**: Converts base64 to browser-displayable URLs

---

## 3. Architecture Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CMS Editor    │───▶│  MDX Processing  │───▶│  Live Preview   │
│  (User Input)   │    │     Pipeline     │    │   (Rendered)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub API    │◀───│  Validation &    │───▶│ Component Scope │
│ (Files/Images)  │    │ Link Processing  │    │    Mapping      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                    ┌──────────────────┐
                    │ Fallback Handler │
                    │ (Unknown Comps)  │
                    └──────────────────┘
```

**Flow Description:**
1. User enters MDX content in CMS editor
2. Content is parsed into an AST using unified/remark
3. Links and images are validated against GitHub repository
4. JSX components are mapped to available React components
5. Unknown components are handled with fallback components
6. Final content is rendered in live preview

---

## 4. Main Functional Modules

### 4.1 `editor.tsx` - Core CMS Integration

**Location**: `customEditor/src/editor.tsx`  
**Responsibility**: Main orchestrator that integrates all functionality with Decap CMS

**Key Features:**
- Registers custom MDX widget with Decap CMS
- Manages state for content processing and preview
- Coordinates AST generation and modification
- Handles component scope management

**Critical Functions:**
```typescript
const generateAST = (markdown: string) =>
  fromMarkdown(markdown, {
    extensions: [mdxJsx({ acorn, addResult: true })],
    mdastExtensions: [mdxJsxFromMarkdown()],
  });

const validateMarkdown = async (markdownContent: string) => {
  // Extracts JSX components and validates content structure
};

const modifyMarkdownContent = async (markdownContent: string) => {
  // Processes links and applies transformations
};
```

### 4.2 `modifyLinksPlugin.js` - Link Processing Engine

**Location**: `customEditor/src/plugin/modifyLinksPlugin.js`  
**Responsibility**: Transforms internal links into valid URLs using GitHub API

**Core Functionality:**
- **Link Detection**: Identifies different link types (external, internal, anchors, relative)
- **GitHub Search**: Validates file existence using GitHub Code Search API
- **URL Transformation**: Converts internal references to production URLs
- **External Link Marking**: Adds visual indicators (⎋) to external links

**Example Transformation:**
```javascript
// Input:  ./intro.mdx#overview
// Output: https://site-url.netlify.app/thesis/intro#overview
```

### 4.3 `processHTML.js` - HTML Content Handler

**Location**: `customEditor/src/plugin/processHTML.js`  
**Responsibility**: Processes HTML elements within MDX content, particularly tables with embedded links

**Process Flow:**
1. Parses HTML using `rehype-parse`
2. Visits all anchor elements in the HTML structure
3. Applies link processing to HTML-embedded links
4. Converts modified structure back to HTML string

### 4.4 `fetchImage.js` - GitHub Image API

**Location**: `customEditor/src/api/fetchImage.js`  
**Responsibility**: Retrieves and processes images from GitHub repository

**Path Resolution Logic:**
```javascript
// Handles relative paths like:
// ./image.png     → same folder
// ../assets/img.png → parent folder
// ../../shared/logo.png → grandparent folder
```

**Processing Steps:**
1. Extract current content folder from URL hash
2. Resolve relative image paths based on folder structure
3. Construct GitHub API URL for image retrieval
4. Fetch base64 content and convert to blob URL
5. Set appropriate MIME type based on file extension

### 4.5 `ModifyImage.tsx` - Image Component

**Location**: `customEditor/src/components/ModifyImage.tsx`  
**Responsibility**: React component that renders images with GitHub API integration

**Features:**
- Automatic image fetching using `fetchImage.js`
- Support for floating layouts (left, right, center)
- Configurable zoom functionality
- Responsive image handling

### 4.6 `scope.ts` / `ReactComponents.tsx` - Component Scope Management

**Location**: `customEditor/src/components/ReactComponents.tsx`  
**Responsibility**: Defines available React components for MDX rendering

**Component Mapping:**
```typescript
const scope = {
  Button: (props: ButtonProps) => <Button {...props} />,
  FloatingImage: (props: FloatingImageProps) => <ModifyImage {...props} />,
  Counter: (props: any) => <Counter {...props} />,
  // Dynamic components added at runtime
};
```

**Dynamic Component Handling:**
```typescript
// Unknown components get fallback treatment
if (!componentNames.has(component)) {
  scope[component] = () => (
    <NotFoundComponent componentName={component} />
  );
}
```

---

## 5. Preview Rendering Flow

### 5.1 Component Resolution Process

The system handles JSX components through a multi-step resolution process:

1. **Component Extraction**: Parse MDX AST to identify JSX component names
2. **Scope Lookup**: Check if component exists in predefined scope
3. **Fallback Assignment**: Create `NotFoundComponent` for unknown components
4. **Rendering**: Pass resolved scope to MDX renderer

### 5.2 Fallback Component System

**`NotFoundComponent`** provides graceful degradation for unsupported components:

```typescript
const NotFoundComponent: React.FC<{ componentName: string }> = ({ componentName }) => {
  return (
    <div className='bg-red-50 border border-red-200 text-red-500 px-4 py-2 rounded-md'>
      component <span className='font-bold'>{componentName}</span> is not supported.
    </div>
  );
};
```

This approach ensures the preview never breaks due to unknown components while providing clear feedback to content editors.

### 5.3 HTML Component Modification

**`ModifiedHtmlComponents.tsx`** customizes standard HTML rendering:

- **Code Blocks**: Enhanced syntax highlighting with language detection
- **Images**: Automatic routing through GitHub API for local images
- **Tables**: Special handling for embedded JSX components
- **Lists**: Proper styling for ordered and unordered lists

---

## 6. GitHub API Usage

### 6.1 Authentication

The system uses GitHub Personal Access Tokens for API authentication:

```javascript
headers: {
  Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
}
```

### 6.2 File Validation Workflow

**Search Query Construction:**
```javascript
const query = `repo:niravbhuva99/cms-thesis-project filename:${filename} path:docs extension:mdx`;
```

**Response Processing:**
- Validates file existence in repository
- Extracts correct file path for URL construction
- Handles cases where files don't exist (fallback URLs)

### 6.3 Image Handling Example

**Input**: `<FloatingImage img="./usecase.svg" type="center" />`

**Process:**
1. Extract current folder: `/thesis/` (from URL hash)
2. Resolve path: `/docs/thesis/usecase.svg`
3. GitHub API call: `GET /repos/owner/repo/contents/docs/thesis/usecase.svg`
4. Base64 decode and create blob URL
5. Render image component with fetched URL

**Transformed Output**: Live-rendered image in preview pane

---

## 7. Technologies Used

### 7.1 Core Technologies

- **React 18.2.0**: UI framework for component rendering
- **TypeScript 5.3.3**: Type-safe development
- **Decap CMS 3.1.10**: Base CMS platform
- **MDX 3.0.1**: Markdown + JSX processing
- **Docusaurus 3.1.1**: Static site generation

### 7.2 MDX Processing Stack

- **`@mdx-js/mdx`**: Core MDX compiler
- **`mdast-util-from-markdown`**: Markdown AST generation
- **`mdast-util-mdx-jsx`**: JSX element handling
- **`micromark-extension-mdx-jsx`**: JSX syntax parsing
- **`unified`**: Universal syntax tree processing

### 7.3 Build and Development Tools

- **Webpack 5.90.0**: Module bundling and build process
- **Babel**: JavaScript/TypeScript transpilation
- **TailwindCSS**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization

### 7.4 API and Networking

- **Octokit 3.1.2**: GitHub API client
- **Fetch API**: HTTP requests for GitHub integration
- **Buffer**: Base64 encoding/decoding for images

---

## 8. Folder Structure

```
cms-thesis-project/
│
├── customEditor/                  # CMS Extension Code
│   └── src/
│       ├── editor.tsx            # Main CMS integration
│       ├── plugin/
│       │   ├── modifyLinksPlugin.js  # Link processing
│       │   └── processHTML.js        # HTML handling
│       ├── api/
│       │   └── fetchImage.js         # GitHub image API
│       ├── components/
│       │   ├── ReactComponents.tsx   # Component scope
│       │   ├── ModifyImage.tsx       # Image component
│       │   ├── NotFound.tsx          # Fallback component
│       │   └── ModifiedHtmlComponents.tsx
│       └── custom-widget/
│           ├── TagsWidget.tsx        # Custom CMS widgets
│           ├── SlugWidget.tsx
│           └── UploadImage.tsx
│
├── docs/                          # Content Directory
│   ├── thesis/                    # Thesis documentation
│   │   ├── intro.mdx
│   │   ├── requirements.mdx
│   │   └── design.mdx
│   └── technical/                 # Technical documentation
│
├── src/                           # Docusaurus Components
│   └── components/
│       ├── button/
│       ├── floatingImage/
│       └── counter/
│
├── static/                        # Static Assets
│   └── editor/
│       └── bundle.js             # Compiled CMS editor
│
├── webpack.config.js              # Build configuration
├── package.json                   # Dependencies
├── docusaurus.config.ts           # Site configuration
└── README.md                      # Project documentation
```

---

## 9. Key Implementation Details

### 9.1 AST-based Content Processing

The system uses Abstract Syntax Trees (AST) for robust content manipulation:

```typescript
// Generate AST from MDX content
const tree = fromMarkdown(markdown, {
  extensions: [mdxJsx({ acorn, addResult: true })],
  mdastExtensions: [mdxJsxFromMarkdown()],
});

// Process AST nodes
visit(tree, "link", (node: any) => {
  // Handle link processing
});
```

### 9.2 Asynchronous Link Processing

Link validation happens asynchronously to maintain responsive UI:

```typescript
await Promise.all(rehypePlugins.map((plugin) => plugin(tree)));
```

### 9.3 State Management Strategy

The system uses React hooks for state management:

- `markdownContent`: Current editor content
- `out`: Processed content for preview
- `linksModified`: Flag for triggering reprocessing
- `isLoading`: Loading state for async operations
- `ReactComponents`: List of detected JSX components

### 9.4 Error Handling

Comprehensive error handling ensures system stability:

```typescript
try {
  // Process content
} catch (error) {
  console.error("Error modifying Markdown:", error);
} finally {
  setIsLoading(false);
}
```

---

## 10. Conclusion

This implementation successfully extends Decap CMS to support modern content authoring workflows through:

### 10.1 Key Achievements

1. **Full MDX Support**: Complete integration of MDX parsing and rendering
2. **Live Preview**: Real-time component rendering in CMS interface  
3. **GitHub Integration**: Robust file validation and image handling
4. **Extensible Architecture**: Plugin-based system for future enhancements
5. **Graceful Degradation**: Fallback handling for unknown components

### 10.2 Technical Innovation

- **AST-based Processing**: Reliable content transformation using unified ecosystem
- **API-driven Validation**: Dynamic link checking using GitHub's search capabilities
- **Component Scoping**: Runtime component resolution with fallback mechanisms
- **Path Resolution**: Intelligent relative path handling for decentralized assets

### 10.3 Impact on Content Workflows

The system transforms Decap CMS from a basic markdown editor into a powerful authoring platform that supports:

- Interactive content creation with JSX components
- Reliable internal linking across document collections  
- Folder-based asset organization
- Real-time preview of dynamic content elements

This implementation demonstrates that open-source CMS platforms can be extended to compete with enterprise solutions while maintaining simplicity and developer-friendly architecture.

---

**Repository**: [https://github.com/niravbhuva99/cms-thesis-project](https://github.com/niravbhuva99/cms-thesis-project)  
**Live Demo**: [https://celebrated-maamoul-edd9d7.netlify.app/](https://celebrated-maamoul-edd9d7.netlify.app/)