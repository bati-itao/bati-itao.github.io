import os
import re

def update_internal_links(directory):
    # Pattern to match href="/something" but not already starting with /ocs/
    pattern = re.compile(r'href=\"/(?!ocs/)([^\"]+)\"')

    # Walk through all files in the directory
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)

                # Read the file content
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Replace internal links
                updated_content = pattern.sub(r'href=\"/ocs/\\1\"', content)

                # Write the updated content back to the file
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)

                print(f"Updated internal links in: {file_path}")

# Specify the directory containing HTML files
html_directory = "./"  # Change this to your actual directory path
update_internal_links(html_directory)
