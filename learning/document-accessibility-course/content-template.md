---
layout: module.njk
title: "Template - Lesson Title"
description: "Template description for new lesson pages."
permalink: "moduleX/template-lesson.html"
lang: "en"
altLang: "fr"
altLangHref: "template-lesson-fr.html"
altLangText: "Français"
relativeToRoot: "../../../"
breadcrumbs:
  - title: "Home"
    href: "../../../index.html"
  - title: "Learning"
    href: "../../index.html"
  - title: "Document accessibility course"
    href: "../index.html"
  - title: "Module X – Module Title"
    href: "index.html"
  - title: "Template - Lesson Title"
moduleId: "moduleX"  # Change to your module (module1, module2, etc.)
pageId: "template-lesson"  # Change to unique page identifier
pageNavigation:
  previous:
    href: "previous-lesson.html"
    title: "Previous Lesson Title"
  next:
    href: "next-lesson.html"
    title: "Next Lesson Title"
---

<!-- 
Instructions for using this template:

1. Copy this file to src/moduleX/your-lesson-name.md
2. Update the frontmatter:
   - Change title and description
   - Update permalink to match your file name
   - Set correct moduleId (module1, module2, etc.)
   - Set unique pageId
   - Update breadcrumbs as needed
   - Set up pageNavigation links
3. Replace this content with your lesson content
4. Run 'npm run build:docs' to generate the HTML
-->

## Overview

Brief introduction to the lesson topic. Explain what users will learn and why it's important.

## Learning Objectives

By the end of this lesson, you will be able to:

- Objective 1: Describe the main concept
- Objective 2: Apply the techniques learned
- Objective 3: Identify best practices

## Main Content

### Section 1: Key Concepts

Explain the fundamental concepts using clear, accessible language. Use examples where helpful.

**Important tip:** Use proper heading hierarchy and semantic markup for accessibility.

### Section 2: Practical Application

Show how to apply the concepts in real scenarios:

1. Step one: Description
2. Step two: Description  
3. Step three: Description

### Code Examples (if applicable)

Use code blocks for technical content:

```html
<example>
  <!-- Your HTML example here -->
</example>
```

### Lists and Emphasis

Use markdown formatting for:

- **Important concepts** (bold)
- *Emphasized points* (italic)
- [Relevant links](https://example.com)
- Bulleted lists for key points

## Best Practices

Summarize the key takeaways:

- Practice tip 1
- Practice tip 2
- Common mistake to avoid

## Additional Resources

- [Resource 1](https://example.com) - Description
- [Resource 2](https://example.com) - Description

## Knowledge Check

Consider adding questions or activities to reinforce learning:

1. Question 1: What is the main benefit of...?
2. Question 2: How would you...?
3. Activity: Try implementing...