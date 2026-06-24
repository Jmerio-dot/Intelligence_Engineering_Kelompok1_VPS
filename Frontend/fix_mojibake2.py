import os, glob

# These are the utf-8 encoded bytes of the mojibake as read directly from the corrupted file
# The corrupted file has utf-8 bytes representing the mojibake characters.
mojibake_map = {
    "Dashboard â€“ Intelligence": "Dashboard – Intelligence",
    "ðŸ‘¥": "&#x1F465;",   # Users
    "ðŸ” ": "&#x1F50D;",   # Search
    "ðŸ—‚ï¸ ": "&#x1F5C2;&#xFE0F;", # Folder
    "ðŸŽ‰": "&#x1F389;",   # Tada
    "ðŸ”´": "&#x1F534;",   # Red
    "ðŸŸ ": "&#x1F7E0;",   # Orange
    "ðŸŸ¡": "&#x1F7E1;",   # Yellow
    "ðŸŸ¢": "&#x1F7E2;",   # Green
    "â†’": "&#x2192;",     # Right Arrow
    "Â·": "&#xB7;",       # Middle Dot
    "âœ ï¸ ": "Edit",      # Edit Pencil (Replace with text)
    "âœ•": "&#x2715;",     # Cross
    "ðŸ“ ": "&#x1F4C1;",   # File Folder
    "ðŸ“·": "&#x1F4F7;",   # Camera
    "ðŸ‘¨â€ ðŸ’»": "&#x1F468;&#x200D;&#x1F4BB;", # Man Technologist
    "â˜€ï¸ ": "&#x2600;&#xFE0F;", # Sun
    "ðŸŒ™": "&#x1F319;",    # Moon
}

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original = content
        for k, v in mojibake_map.items():
            content = content.replace(k, v)
            
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

for ext in ['*.html', '*.js']:
    for f in glob.glob(f'C:/Kuliah/VPS_Repo/Frontend/{ext}'):
        fix_file(f)
