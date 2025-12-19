#!/usr/bin/env node

/**
 * Comprehensive Accessibility Verification Script
 * 
 * This script verifies:
 * 1. Script loading status (esdc-course.js and others)
 * 2. Relative and absolute link path validity
 * 3. goToLink JavaScript functionality
 * 4. Dynamic content loading (data-wb-ajax)
 * 5. Accessibility markers compatibility
 */

const fs = require('fs');
const path = require('path');

// Configuration constants
const CONFIG = {
  MAX_FILES_TO_TEST: 50,
  MAX_LINK_ISSUES_TO_DISPLAY: 10,
  MAX_CATEGORY_ISSUES_TO_DISPLAY: 5,
  IMPORTANT_SCRIPTS: ['refTop.min.js', 'appFooter.min.js', 'bati-itao.min.js'],
  ACCESSIBILITY_MARKERS: {
    'aria-label': 0,
    'aria-labelledby': 0,
    'aria-describedby': 0,
    'role': 0,
    'alt': 0,
    'sr-only': 0,
    'wb-inv': 0,
  }
};

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Test results tracking
const results = {
  scriptLoading: { passed: 0, failed: 0, warnings: 0, issues: [] },
  linkPaths: { passed: 0, failed: 0, warnings: 0, issues: [] },
  goToLink: { passed: 0, failed: 0, warnings: 0, issues: [] },
  dataWbAjax: { passed: 0, failed: 0, warnings: 0, issues: [] },
  accessibilityMarkers: { passed: 0, failed: 0, warnings: 0, issues: [] },
};

// Utility functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function findFiles(dir, pattern, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
      findFiles(filePath, pattern, fileList);
    } else if (pattern.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    return null;
  }
}

// Test 1: Verify script loading status
function testScriptLoading() {
  log('\n=== Test 1: Script Loading Status ===', 'cyan');
  
  const htmlFiles = findFiles('.', /\.html$/);
  const scriptReferences = {};
  
  htmlFiles.forEach((file) => {
    const content = readFile(file);
    if (!content) return;
    
    // Find all script references
    const scriptMatches = content.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi);
    if (scriptMatches) {
      scriptMatches.forEach((match) => {
        const srcMatch = match.match(/src=["']([^"']+)["']/);
        if (srcMatch) {
          const src = srcMatch[1];
          if (!scriptReferences[src]) {
            scriptReferences[src] = [];
          }
          scriptReferences[src].push(file);
        }
      });
    }
  });
  
  // Check esdc-course.js specifically
  const esdcCourseRefs = Object.keys(scriptReferences).filter(src => src.includes('esdc-course.js'));
  
  if (esdcCourseRefs.length > 0) {
    log(`✓ Found esdc-course.js referenced in ${scriptReferences[esdcCourseRefs[0]].length} files`, 'green');
    results.scriptLoading.passed++;
    
    // Verify the script file exists
    esdcCourseRefs.forEach((ref) => {
      const testFiles = scriptReferences[ref].slice(0, 3); // Test first 3 references
      testFiles.forEach((htmlFile) => {
        const htmlDir = path.dirname(htmlFile);
        const scriptPath = path.resolve(htmlDir, ref);
        
        if (fs.existsSync(scriptPath)) {
          results.scriptLoading.passed++;
        } else {
          results.scriptLoading.failed++;
          results.scriptLoading.issues.push(`Script not found: ${ref} (referenced in ${htmlFile})`);
          log(`✗ Script not found: ${scriptPath}`, 'red');
        }
      });
    });
  } else {
    results.scriptLoading.failed++;
    results.scriptLoading.issues.push('esdc-course.js not found in any HTML file');
    log('✗ esdc-course.js not found in any HTML file', 'red');
  }
  
  // Check for other common scripts
  CONFIG.IMPORTANT_SCRIPTS.forEach((script) => {
    const refs = Object.keys(scriptReferences).filter(src => src.includes(script));
    if (refs.length > 0) {
      log(`✓ Found ${script} referenced in ${scriptReferences[refs[0]].length} files`, 'green');
      results.scriptLoading.passed++;
    } else {
      results.scriptLoading.warnings++;
      log(`⚠ ${script} not found in HTML files`, 'yellow');
    }
  });
}

// Test 2: Verify link paths
function testLinkPaths() {
  log('\n=== Test 2: Link Path Verification ===', 'cyan');
  
  const htmlFiles = findFiles('.', /\.html$/).slice(0, CONFIG.MAX_FILES_TO_TEST);
  let totalLinks = 0;
  
  htmlFiles.forEach((file) => {
    const content = readFile(file);
    if (!content) return;
    
    // Find all href links
    const linkMatches = content.match(/href=["']([^"']+)["']/gi);
    if (linkMatches) {
      linkMatches.forEach((match) => {
        const hrefMatch = match.match(/href=["']([^"']+)["']/);
        if (hrefMatch) {
          totalLinks++;
          const href = hrefMatch[1];
          
          // Check relative paths (not http/https or anchors)
          if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
            const htmlDir = path.dirname(file);
            const linkPath = path.resolve(htmlDir, href.split('#')[0]);
            
            if (fs.existsSync(linkPath)) {
              results.linkPaths.passed++;
            } else {
              results.linkPaths.failed++;
              results.linkPaths.issues.push(`Broken link: ${href} (in ${file})`);
              if (results.linkPaths.issues.length <= CONFIG.MAX_LINK_ISSUES_TO_DISPLAY) {
                log(`✗ Broken link: ${href} in ${file}`, 'red');
              }
            }
          } else if (href.startsWith('http')) {
            // External links are assumed valid for this test
            results.linkPaths.passed++;
          }
        }
      });
    }
  });
  
  log(`✓ Checked ${totalLinks} links in ${htmlFiles.length} files`, 'green');
  log(`✓ Passed: ${results.linkPaths.passed}, Failed: ${results.linkPaths.failed}`, 
      results.linkPaths.failed > 0 ? 'yellow' : 'green');
}

// Test 3: Debug goToLink functionality
function testGoToLink() {
  log('\n=== Test 3: goToLink JavaScript Functionality ===', 'cyan');
  
  const htmlFiles = findFiles('.', /\.html$/);
  let goToLinkUsage = 0;
  let goToLinkDefinitions = 0;
  
  htmlFiles.forEach((file) => {
    const content = readFile(file);
    if (!content) return;
    
    // Check for goToLink function definition
    if (content.includes('function goToLink')) {
      goToLinkDefinitions++;
      results.goToLink.passed++;
      
      // Verify proper implementation
      if (content.includes('event.type') && 
          content.includes('event.keyCode') && 
          content.includes('window.location.href')) {
        results.goToLink.passed++;
      } else {
        results.goToLink.warnings++;
        results.goToLink.issues.push(`goToLink may be incomplete in ${file}`);
      }
    }
    
    // Check for goToLink usage
    if (content.includes('goToLink(')) {
      goToLinkUsage++;
    }
  });
  
  log(`✓ Found ${goToLinkDefinitions} goToLink definitions`, 'green');
  log(`✓ Found ${goToLinkUsage} files using goToLink`, 'green');
  
  if (goToLinkDefinitions === 0) {
    results.goToLink.failed++;
    results.goToLink.issues.push('No goToLink function definitions found');
    log('✗ No goToLink function definitions found', 'red');
  }
}

// Test 4: Inspect data-wb-ajax
function testDataWbAjax() {
  log('\n=== Test 4: Dynamic Content Loading (data-wb-ajax) ===', 'cyan');
  
  const htmlFiles = findFiles('.', /\.html$/);
  let ajaxUsage = 0;
  
  htmlFiles.forEach((file) => {
    const content = readFile(file);
    if (!content) return;
    
    if (content.includes('data-wb-ajax')) {
      ajaxUsage++;
      results.dataWbAjax.passed++;
    }
  });
  
  log(`✓ Found data-wb-ajax in ${ajaxUsage} files`, 'green');
}

// Test 5: Evaluate accessibility markers
function testAccessibilityMarkers() {
  log('\n=== Test 5: Accessibility Markers ===', 'cyan');
  
  const htmlFiles = findFiles('.', /\.html$/).slice(0, CONFIG.MAX_FILES_TO_TEST);
  const markers = {...CONFIG.ACCESSIBILITY_MARKERS};
  
  htmlFiles.forEach((file) => {
    const content = readFile(file);
    if (!content) return;
    
    // Count accessibility markers
    Object.keys(markers).forEach((marker) => {
      const regex = new RegExp(marker, 'gi');
      const matches = content.match(regex);
      if (matches) {
        markers[marker] += matches.length;
      }
    });
    
    // Images without alt text
    const imgMatches = content.match(/<img[^>]*>/gi);
    if (imgMatches) {
      imgMatches.forEach((img) => {
        if (!img.includes('alt=')) {
          results.accessibilityMarkers.failed++;
        } else {
          results.accessibilityMarkers.passed++;
        }
      });
    }
  });
  
  log('\nAccessibility Markers Found:', 'blue');
  Object.keys(markers).forEach((marker) => {
    if (markers[marker] > 0) {
      log(`  ${marker}: ${markers[marker]}`, 'green');
    }
  });
}

// Main execution
function main() {
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║  Accessibility Verification Test Suite                ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝', 'cyan');
  
  try {
    testScriptLoading();
    testLinkPaths();
    testGoToLink();
    testDataWbAjax();
    testAccessibilityMarkers();
    
    // Summary
    log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
    log('║  Test Summary                                          ║', 'cyan');
    log('╚════════════════════════════════════════════════════════╝', 'cyan');
    
    Object.keys(results).forEach((category) => {
      const { passed, failed, warnings } = results[category];
      const total = passed + failed + warnings;
      const status = failed > 0 ? 'red' : warnings > 0 ? 'yellow' : 'green';
      
      log(`\n${category}:`, 'blue');
      log(`  Passed: ${passed}, Failed: ${failed}, Warnings: ${warnings} (Total: ${total})`, status);
      
      if (results[category].issues.length > 0 && results[category].issues.length <= CONFIG.MAX_CATEGORY_ISSUES_TO_DISPLAY) {
        log(`  Issues:`, 'yellow');
        results[category].issues.forEach((issue) => {
          log(`    - ${issue}`, 'yellow');
        });
      }
    });
    
    const totalFailed = Object.values(results).reduce((sum, r) => sum + r.failed, 0);
    const totalWarnings = Object.values(results).reduce((sum, r) => sum + r.warnings, 0);
    
    log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
    if (totalFailed === 0) {
      log('║  ✓ All tests passed!                                  ║', 'green');
    } else {
      log(`║  ✗ ${totalFailed} test(s) failed, ${totalWarnings} warning(s)            ║`, 'red');
    }
    log('╚════════════════════════════════════════════════════════╝\n', 'cyan');
    
    process.exit(totalFailed > 0 ? 1 : 0);
  } catch (error) {
    log(`\n✗ Error during test execution: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

main();
