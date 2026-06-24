import glob
for f in glob.glob('C:/Kuliah/VPS_Repo/Frontend/*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if 'i18n.js' not in content:
        content = content.replace('<link rel="stylesheet" href="app-theme.css" />', '<link rel="stylesheet" href="app-theme.css" />\n  <script src="i18n.js"></script>')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
