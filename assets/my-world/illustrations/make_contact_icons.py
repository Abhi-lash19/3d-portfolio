"""Original, simple platform pictograms paired with text labels in the future UI."""
from pathlib import Path
OUT=Path(__file__).resolve().parent/"contact"
OUT.mkdir(exist_ok=True)
glyphs={
 "github":'<circle cx="32" cy="32" r="22"/><circle cx="23" cy="25" r="3" fill="#172b4b"/><circle cx="41" cy="25" r="3" fill="#172b4b"/><path d="M21 39q11 10 22 0M20 12l5 6M44 12l-5 6"/>',
 "linkedin":'<rect x="11" y="11" width="42" height="42" rx="8"/><circle cx="22" cy="25" r="2.5" fill="#172b4b"/><path d="M22 32v13M32 45V32m0 6q0-7 6-7t6 7v7"/>',
 "email":'<rect x="9" y="17" width="46" height="31" rx="4"/><path d="m10 20 22 17 22-17"/>',
 "instagram":'<rect x="11" y="11" width="42" height="42" rx="12"/><circle cx="32" cy="32" r="10"/><circle cx="45" cy="20" r="2.5" fill="#e6b775" stroke="none"/>',
}
for name,path in glyphs.items():
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="{name} pictogram"><g fill="none" stroke="#e6b775" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">{path}</g></svg>'
    (OUT/(name+".svg")).write_text(svg)
    print(name)
