import os
import re

# The new "All modules" section to insert
new_section = '''
<section class="list-group menu list-unstyled">
    <h3 class="wb-navcurr">All modules</h3>
    <ul class="list-group menu list-unstyled">
        <li><a class="list-group-item active" href="web-accessibility.html">Module 1 – Accessibility Fundamentals</a></li>
        <li><a class="list-group-item" href="../module2/landmarks.html">Module 2 – Global Document Accessibility</a></li>
        <li><a class="list-group-item" href="../module3/links.html">Module 3 – PowerPoint Accessibility</a></li>
        <li><a class="list-group-item" href="../module4/tables-concepts.html">Module 4 – Word Accessibility Techniques</a></li>
        <li><a class="list-group-item" href="../module5/text-alternatives.html">Module 5 – Outlook Email Accessibility Techniques</a></li>
        <li><a class="list-group-item" href="../module6/forms-concepts.html">Module 6 – Introduction to Accessible PDFs</a></li>
        <li><a class="list-group-item" href="../module7/introduction.html">Module 7 – Exporting Word to PDF</a></li>
        <li><a class="list-group-item" href="../module8/introduction.html">Module 8 – Exporting PowerPoint to PDF</a></li>
        <li><a class="list-group-item" href="../module9/introduction.html">Module 9 – Foxit PDF Editor for Accessibility</a></li>
        <li><a class="list-group-item" href="../module10/introduction.html">Module 10 – Fixing Inaccessible PDFs with Foxit</a></li>
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
    module1_dir = './learning/document-accessibility-course/module1'
    for filename in os.listdir(module1_dir):
        if filename.endswith('.html'):
            filepath = os.path.join(module1_dir, filename)
            update_file(filepath)

if __name__ == '__main__':
    main()