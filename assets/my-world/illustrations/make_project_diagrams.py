"""Create truthful, original conceptual graphics from approved project summaries."""
from pathlib import Path
from html import escape
HERE=Path(__file__).resolve().parent
OUT=HERE/"projects";OUT.mkdir(exist_ok=True)
projects={
 "vera":("VERA","Knowledge assistant",["Technical docs + code","Hybrid search","Source grounded answer"],"FAISS + BM25"),
 "renzo":("Renzo","Job matching backend",["Vacancies + profile","Deduplicate + rank","Matching + missing skills"],"EXPLAINABLE RANKING"),
 "scribeai":("ScribeAI","Writing assistant",["Chat event","Express webhook + Groq","Reply + conversation record"],"GROQ INTEGRATION"),
 "gitinsight":("GitInsight Engine","GitHub activity reports",["GitHub API","Retry + cache + aggregate","Visual cards"],"API AGGREGATION"),
 "aws-deployment":("AWS Deployment Automation","Repeatable delivery workflow",["Terraform + EC2","Docker image + ECR","GitHub Actions deploy"],"INFRASTRUCTURE AS CODE"),
 "coregpt":("CoreGPT","Educational language model",["Tokenization","Causal attention","Output layer + sampling"],"SIMPLIFIED TRAINING LOOP"),
}
for slug,(title,subtitle,nodes,tag) in projects.items():
    cards=[]
    for i,node in enumerate(nodes):
        x=77+i*360
        cards.append(f'<rect x="{x}" y="293" width="305" height="156" rx="24" fill="#203857" stroke="#46657a" stroke-width="2"/>')
        cards.append(f'<circle cx="{x+42}" cy="333" r="15" fill="#d6a15d"/>')
        cards.append(f'<text x="{x+42}" y="339" text-anchor="middle" fill="#152747" font-size="16" font-family="sans-serif" font-weight="bold">{i+1}</text>')
        cards.append(f'<text x="{x+153}" y="394" text-anchor="middle" fill="#f4e8d1" font-size="21" font-family="sans-serif">{escape(node)}</text>')
        if i<2:cards.append(f'<path d="M{x+314} 370H{x+350}m-11-9 11 9-11 9" fill="none" stroke="#d8a765" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>')
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="Conceptual diagram of {escape(title)}">
<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#101c3e"/><stop offset="1" stop-color="#1c3558"/></linearGradient></defs>
<rect width="1200" height="675" fill="url(#bg)"/>
<path d="M40 40H1160V635H40Z" fill="none" stroke="#ae8857" stroke-width="2"/>
<text x="76" y="105" fill="#d6a15d" font-size="15" font-family="sans-serif" letter-spacing="5">PROJECT SYSTEM / ORIGINAL DIAGRAM</text>
<text x="75" y="202" fill="#f3e6cd" font-size="64" font-family="Georgia,serif">{escape(title)}</text>
<text x="78" y="244" fill="#adc5d0" font-size="24" font-family="sans-serif">{escape(subtitle)}</text>
{''.join(cards)}
<rect x="78" y="525" width="1044" height="67" rx="15" fill="#182c4b"/>
<circle cx="106" cy="558" r="7" fill="#efbd78"/>
<text x="127" y="566" fill="#e7c590" font-size="18" font-family="sans-serif" letter-spacing="2">{escape(tag)}</text>
<text x="1119" y="620" text-anchor="end" fill="#839db0" font-size="15" font-family="sans-serif">CONCEPTUAL • NOT A PRODUCT SCREENSHOT</text>
</svg>'''
    (OUT/(slug+".svg")).write_text(svg)
    print(slug)
