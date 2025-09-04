#!/usr/bin/env python3
"""
Script to remove modules 7-10 navigation references from all HTML files
in the document-accessibility-course directory.
"""

import os
import re

def update_file(filepath):
    """Remove module 7-10 navigation entries from a single HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Patterns to match module 7-10 navigation entries
    # These patterns match the exact lines that need to be removed, including multi-line formats
    patterns = [
        # Module 7 - Various formats including multi-line
        re.compile(r'\s*<li>\s*<a\s+class="list-group-item"[^>]*href="[^"]*module7[^"]*"[^>]*>[^<]*Module 7[^<]*</a[^>]*>\s*</li>\s*\n?', re.IGNORECASE | re.DOTALL),
        re.compile(r'\s*<li><a\s+class="list-group-item"[^>]*href="[^"]*module7[^"]*"[^>]*>Module 7[^<]*</a></li>\s*\n?', re.IGNORECASE),
        # Module 8 - Various formats including multi-line
        re.compile(r'\s*<li>\s*<a\s+class="list-group-item"[^>]*href="[^"]*module8[^"]*"[^>]*>[^<]*Module 8[^<]*</a[^>]*>\s*</li>\s*\n?', re.IGNORECASE | re.DOTALL),
        re.compile(r'\s*<li><a\s+class="list-group-item"[^>]*href="[^"]*module8[^"]*"[^>]*>Module 8[^<]*</a></li>\s*\n?', re.IGNORECASE),
        # Module 9 - Various formats including multi-line
        re.compile(r'\s*<li>\s*<a\s+class="list-group-item"[^>]*href="[^"]*module9[^"]*"[^>]*>[^<]*Module 9[^<]*</a[^>]*>\s*</li>\s*\n?', re.IGNORECASE | re.DOTALL),
        re.compile(r'\s*<li><a\s+class="list-group-item"[^>]*href="[^"]*module9[^"]*"[^>]*>Module 9[^<]*</a></li>\s*\n?', re.IGNORECASE),
        # Module 10 - Various formats including multi-line
        re.compile(r'\s*<li>\s*<a\s+class="list-group-item"[^>]*href="[^"]*module10[^"]*"[^>]*>[^<]*Module 10[^<]*</a[^>]*>\s*</li>\s*\n?', re.IGNORECASE | re.DOTALL),
        re.compile(r'\s*<li><a\s+class="list-group-item"[^>]*href="[^"]*module10[^"]*"[^>]*>Module 10[^<]*</a></li>\s*\n?', re.IGNORECASE),
    ]
    
    # Apply all patterns to remove the navigation entries
    for pattern in patterns:
        content = pattern.sub('', content)
    
    # Write back only if content changed
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {filepath}')
        return True
    else:
        print(f'No change: {filepath}')
        return False

def main():
    """Update all HTML files in the document-accessibility-course directory."""
    base_dir = './learning/document-accessibility-course'
    updated_count = 0
    total_count = 0
    
    # Walk through all subdirectories and find HTML files
    for root, dirs, files in os.walk(base_dir):
        for filename in files:
            if filename.endswith('.html'):
                filepath = os.path.join(root, filename)
                total_count += 1
                if update_file(filepath):
                    updated_count += 1
    
    print(f'\nSummary: Updated {updated_count} out of {total_count} HTML files')

if __name__ == '__main__':
    main()