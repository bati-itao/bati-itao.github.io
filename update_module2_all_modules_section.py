import os
import re

# The new "All modules" section to insert for Module 2 pages
new_section = '''
<section class="list-group menu list-unstyled">
    <h3 class="wb-navcurr">All modules</h3>
    <ul class="list-group menu list-unstyled">
        <li><a class="list-group-item" href="../module1/index.html">Module 1 - Accessibility fundamentals</a></li>
        <li><a class="list-group-item active" href="index.html">Module 2 – Global Accessibility Techniques</a></li>
        <li><a class="list-group-item" href="../module3/index.html">Module 3 – Accessible PowerPoint Techniques</a></li>
        <li><a class="list-group-item" href="../module4/index.html">Module 4 – Accessible Word Techniques</a></li>
        <li><a class="list-group-item" href="../module5/index.html">Module 5 – Accessible Outlook (Email) Techniques</a></li>
        <li><a class="list-group-item" href="../module6/index.html">Module 6 – Introduction to Accessible PDFs</a></li>
    </ul>
</section>
'''

# Regex to match the "All modules" section
pattern = re.compile(
    r'<section class="list-group menu list-unstyled">\s*<h3 class="wb-navcurr">All modules</h3>.*?</section>',
    re.DOTALL
)

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content, count = pattern.subn(new_section, content)
    if count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated: {filepath}')
    else:
        print(f'No change: {filepath}')

def main():
    module2_dir = './learning/document-accessibility-course/module2'
    for filename in os.listdir(module2_dir):
        if filename.endswith('.html') and not filename.endswith('-fr.html'):
            filepath = os.path.join(module2_dir, filename)
            update_file(filepath)

if __name__ == '__main__':
    main()