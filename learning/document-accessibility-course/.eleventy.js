module.exports = function(eleventyConfig) {
    // Copy the scripts folder to the output folder
eleventyConfig.addPassthroughCopy("../scripts");

  return {
    dir: {
      input: "src",
      output: "docs", // or "docs" for GitHub Pages
      includes: "_includes",
      layouts: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}