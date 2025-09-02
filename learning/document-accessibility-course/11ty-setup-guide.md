# 11ty Setup for Document Accessibility Course

This document explains how to use 11ty (Eleventy) to create new content for the document-accessibility-course section of the OCS website.

## Overview

11ty has been configured specifically for the `learning/document-accessibility-course` folder to make content creation easier while preserving the existing WET (Web Experience Toolkit) functionality and site structure.

## Directory Structure

```
learning/document-accessibility-course/
├── src/                           # Source files for 11ty
│   ├── _layouts/                  # Template layouts
│   │   ├── base.njk              # Base HTML template
│   │   └── module.njk            # Module content template
│   ├── _data/                     # Data files
│   │   └── courseNavigation.js   # Course navigation structure
│   ├── _includes/                 # Reusable template parts (currently empty)
│   └── module1/                   # Example module content
│       ├── index.md              # Module 1 landing page
│       └── document-accessibility.md  # Sample lesson page
└── module1/                       # Generated HTML files (do not edit directly)
    ├── index.html
    └── document-accessibility.html
```

## Getting Started

### Prerequisites

Ensure you have the dependencies installed:

```bash
npm install
```

### Building Content

To build all 11ty content:

```bash
npm run build:docs
```

To start a development server with live reload:

```bash
npm run serve:docs
```

## Creating New Content

### 1. Module Landing Pages

Create a new module index page at `src/moduleX/index.md`:

```markdown
---
layout: module.njk
title: "Module X – Your Module Title"
description: "Brief description of the module content."
permalink: "moduleX/index.html"
lang: "en"
altLang: "fr"
altLangHref: "index-fr.html"
altLangText: "Français"
relativeToRoot: "../../../"
breadcrumbs:
  - title: "Home"
    href: "../../../index.html"
  - title: "Learning"
    href: "../../index.html"
  - title: "Document accessibility course"
    href: "../index.html"
  - title: "Module X – Your Module Title"
moduleId: "moduleX"
pageId: "index"
---

## Module Overview

Your module introduction content here...

## Learning Objectives

- Objective 1
- Objective 2

## Module Contents

1. [Lesson 1](lesson1.html) - Description
2. [Lesson 2](lesson2.html) - Description
```

### 2. Lesson Pages

Create lesson pages at `src/moduleX/lesson-name.md`:

```markdown
---
layout: module.njk
title: "Your Lesson Title"
description: "Brief description for SEO and accessibility."
permalink: "moduleX/lesson-name.html"
lang: "en"
altLang: "fr"
altLangHref: "lesson-name-fr.html"
altLangText: "Français"
relativeToRoot: "../../../"
breadcrumbs:
  - title: "Home"
    href: "../../../index.html"
  - title: "Learning"
    href: "../../index.html"
  - title: "Document accessibility course"
    href: "../index.html"
  - title: "Module X – Your Module Title"
    href: "index.html"
  - title: "Your Lesson Title"
moduleId: "moduleX"
pageId: "lesson-name"
pageNavigation:
  previous:
    href: "previous-lesson.html"
    title: "Previous Lesson Title"
  next:
    href: "next-lesson.html"
    title: "Next Lesson Title"
---

Your lesson content in Markdown format...

## Section Heading

Regular markdown content including:

- Lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks

```

### 3. Updating Navigation

To add new modules or lessons to the navigation, edit `src/_data/courseNavigation.js`:

```javascript
module.exports = {
  modules: [
    {
      id: "moduleX",
      title: "Module X – Your Module Title",
      href: "moduleX/index.html",
      items: [
        {
          id: "lesson1",
          title: "Lesson 1 Title",
          href: "moduleX/lesson1.html"
        },
        {
          id: "lesson2", 
          title: "Lesson 2 Title",
          href: "moduleX/lesson2.html"
        }
      ]
    }
    // ... other modules
  ]
};
```

## Frontmatter Reference

### Required Fields

- `layout`: Always use `module.njk` for course content
- `title`: Page title (appears in `<title>` and `<h1>`)
- `description`: Meta description for SEO
- `permalink`: Output path (e.g., `moduleX/page-name.html`)
- `moduleId`: Module identifier for navigation
- `pageId`: Page identifier within the module

### Optional Fields

- `lang`: Language code (defaults to "en")
- `altLang`: Alternative language code (defaults to "fr")
- `altLangHref`: Path to alternative language version
- `altLangText`: Text for language switcher
- `relativeToRoot`: Path to site root (usually `"../../../"`)
- `breadcrumbs`: Array of breadcrumb objects
- `pageNavigation`: Previous/next navigation
  - `previous.href` and `previous.title`
  - `next.href` and `next.title`

## Content Guidelines

### 1. Use Semantic Markdown

- Use proper heading hierarchy (`##`, `###`, etc.)
- Use lists for enumerated content
- Use emphasis (`**bold**`, `*italic*`) appropriately
- Include alt text for images: `![Alt text](image.jpg)`

### 2. Maintain Consistency

- Follow the existing naming conventions for files
- Use consistent module and page IDs
- Keep frontmatter structure consistent

### 3. Accessibility Best Practices

- Write descriptive headings
- Use proper list markup
- Include meaningful descriptions
- Test generated HTML with accessibility tools

## Building and Deployment

1. **Development**: Use `npm run serve:docs` for live development
2. **Build**: Use `npm run build:docs` to generate static HTML
3. **Commit**: Only commit the source files in `src/` folder
4. **Deploy**: The generated HTML files are automatically built

## Troubleshooting

### Common Issues

1. **Build fails with "Missing pagination size"**
   - Don't use `pagination` as a frontmatter key
   - Use `pageNavigation` instead

2. **Navigation not showing**
   - Check that `moduleId` matches an entry in `courseNavigation.js`
   - Verify the module structure in the data file

3. **Paths not working**
   - Check `relativeToRoot` setting
   - Verify `permalink` is correct
   - Ensure breadcrumb hrefs are accurate

4. **Styling issues**
   - The WET framework styles should be automatically included
   - Custom styles are in `../../../css/esdc-course.css`

## Integration with Existing Site

The 11ty setup is designed to:

- Generate HTML that matches the existing site structure
- Preserve WET (Web Experience Toolkit) integration
- Maintain existing navigation patterns
- Support bilingual content (English/French)
- Keep the same CSS and JavaScript dependencies

The generated files seamlessly integrate with the rest of the OCS website without requiring changes to other parts of the site.