module.exports = function(eleventyConfig) {
  // Set input and output directories specifically for document-accessibility-course
  return {
    dir: {
      input: "learning/document-accessibility-course/src",
      output: "learning/document-accessibility-course",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    // Use .html extension for output files to match existing structure
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    
    // Copy static assets
    passthroughFileCopy: true
  };
};