from pathlib import Path
import re
import shutil

# === CONFIG ===
# Adjust this to your Module 2 folder path relative to this script.
MODULE_DIR = Path("Module 2")  # e.g., "module2" or "content/Module 2"

# Your standardized sidebar block (without the "active" class).
# The script will add the "active" class and aria-current="page" to the matching link per file.
BASE_SIDEBAR = '''<section class="list-group menu list-unstyled">
  <h3 class="wb-navcurr">
    Module 2 – Global Accessibility Techniques
  </h3>
  <ul class="list-group menu list-unstyled">
    <li>
      <a class="list-group-item" href="infoPane.html">Info Pane</a>
    </li>
    <li>
      <a class="list-group-item" href="language.html">Language</a>
    </li>
    <li>
      <a class="list-group-item" href="accessibleTemplates.html">Accessible Templates</a>
    </li>
    <li>
      <a class="list-group-item" href="textAndFonts.html">Text and Fonts</a>
    </li>
    <li>
      <a class="list-group-item" href="altText.html">Alt Text</a>
    </li>
    <li>
      <a class="list-group-item" href="contrast.html">Contrast</a>
    </li>
    <li>
      <a class="list-group-item" href="acronyms.html">Acronyms</a>
    </li>
    <li>
      <a class="list-group-item" href="multimedia.html">Multimedia</a>
    </li>
    <li>
      <a class="list-group-item" href="plainLanguage.html">Plain Language</a>
    </li>
  </ul>
</section>'''

# === Implementation ===

# Regex to find the existing Module 2 sidebar section.
# Looks for a <section ...> that contains an <h3> with "Module 2".
SECTION_PATTERN = re.compile(
    r'(?s)<section\b[^>]*>\s*?(?:(?!</section>).)*?<h3\b[^>]*>\s*Module\s*2\b.*?</h3>.*?</section>',
    re.IGNORECASE
)

def add_active_to_block(block_html: str, current_filename: str) -> str:
    """
    Adds 'active' to the class of the <a> whose href matches current_filename.
    Also adds aria-current="page" to that <a>.
    """
    # Build a pattern that finds the <a ... href="current_filename" ...>
    href_pat = re.compile(
        rf'(<a\b)([^>]*\bhref="{re.escape(current_filename)}"[^>]*)(>)',
        flags=re.IGNORECASE
    )

    def ensure_class_and_aria(a_tag_inner: str) -> str:
        # Ensure class includes 'active'
        if re.search(r'\bclass\s*=\s*"', a_tag_inner, flags=re.IGNORECASE):
            a_tag_inner = re.sub(
                r'(\bclass\s*=\s*")([^"]*)(")',
                lambda m: f'{m.group(1)}{m.group(2)}{" " if m.group(2).strip() else ""}active{m.group(3)}',
                a_tag_inner,
                flags=re.IGNORECASE
            )
        else:
            # Insert class="active" at the start of the attributes
            a_tag_inner = ' class="active"' + a_tag_inner

        # Ensure aria-current="page"
        if not re.search(r'\baria-current\s*=\s*"page"', a_tag_inner, flags=re.IGNORECASE):
            a_tag_inner = a_tag_inner + ' aria-current="page"'
        return a_tag_inner

    def replacer(match: re.Match) -> str:
        start, inner, end = match.groups()
        return start + ensure_class_and_aria(inner) + end

    new_block, n = href_pat.subn(replacer, block_html, count=1)  # only one match expected
    return new_block

def replace_module2_section(html_text: str, new_section_html: str) -> tuple[str, int]:
    """
    Replaces the first Module 2 sidebar section found with new_section_html.
    Returns (updated_text, number_of_replacements).
    """
    return SECTION_PATTERN.subn(new_section_html, html_text, count=1)

def process_file(html_path: Path) -> tuple[bool, str]:
    """
    Processes a single HTML file. Returns (changed?, message).
    """
    filename = html_path.name
    if filename.endswith("-fr.html"):
        return (False, f"Skipped (FR): {filename}")

    text = html_path.read_text(encoding="utf-8", errors="ignore")

    # Prepare a block with the right "active" link for this file.
    active_block = add_active_to_block(BASE_SIDEBAR, filename)

    # Replace the existing Module 2 section (if present).
    new_text, count = replace_module2_section(text, active_block)

    if count == 0:
        return (False, f"No Module 2 section found: {filename}")

    # Backup once (filename.bak) if no backup exists.
    bak = html_path.with_suffix(html_path.suffix + ".bak")
    if not bak.exists():
        shutil.copyfile(html_path, bak)

    html_path.write_text(new_text, encoding="utf-8")
    return (True, f"Updated: {filename}")

def main():
    if not MODULE_DIR.exists():
        print(f"[ERROR] Folder not found: {MODULE_DIR.resolve()}")
        return

    html_files = sorted(MODULE_DIR.rglob("*.html"))
    if not html_files:
        print(f"[INFO] No HTML files under {MODULE_DIR}")
        return

    updated = 0
    skipped = 0
    missing = 0

    for p in html_files:
        changed, msg = process_file(p)
        print(msg)
        if msg.startswith("Updated:"):
            updated += 1
        elif msg.startswith("Skipped"):
            skipped += 1
        else:
            missing += 1

    print("\n=== Summary ===")
    print(f"Updated files: {updated}")
    print(f"Skipped (-fr): {skipped}")
    print(f"No Module 2 section found: {missing}")

if __name__ == "__main__":
    main()
