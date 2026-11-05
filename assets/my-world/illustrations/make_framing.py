"""Create labeled asset framing studies and web posters from the rendered world."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageFilter
ROOT=Path(__file__).resolve().parents[1]
REV=ROOT/"review";WEB=ROOT/"web";WEB.mkdir(exist_ok=True)
desktop=Image.open(REV/"world_desktop.png").convert("RGB")
portrait=Image.open(REV/"world_pixel9_portrait.png").convert("RGB")
serif="/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
sans="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def font(path,size):return ImageFont.truetype(path,size)
def rounded(d,box,r,fill,outline=None,width=1):d.rounded_rectangle(box,radius=r,fill=fill,outline=outline,width=width)

# Desktop: island beside complete, readable introduction area.
canvas=Image.new("RGB",(1440,900),"#102242")
d=ImageDraw.Draw(canvas)
d.rectangle((0,0,1440,900),fill="#101d3d")
render=desktop.resize((940,588),Image.Resampling.LANCZOS)
canvas.paste(render,(490,115))
d.text((72,58),"MY WORLD",font=font(sans,19),fill="#dcb06d",stroke_width=0)
d.text((72,205),"Abhilash",font=font(serif,58),fill="#f1e4d2")
d.text((72,272),"Giri",font=font(serif,58),fill="#f1e4d2")
d.text((76,374),"Engineer • builder • learner",font=font(sans,23),fill="#b3c6d2")
d.text((76,435),"Explore the work and ideas that",font=font(sans,18),fill="#dae3df")
d.text((76,466),"shape my journey.",font=font(sans,18),fill="#dae3df")
rounded(d,(75,544,361,604),17,"#d7a463")
d.text((106,561),"Explore My World",font=font(sans,19),fill="#142440")
d.text((76,839),"ASSET FRAMING STUDY • NOT A LIVE SCREEN",font=font(sans,13),fill="#7792a8")
canvas.save(REV/"framing_desktop.png")
canvas.save(WEB/"poster_desktop.webp","WEBP",quality=76,method=6)

# Pixel 9 reference proportions, with poster and explicit optional exploration CTA.
w,h=412,915
mobile=Image.new("RGB",(w,h),"#10203c")
p=portrait.crop((0,150,portrait.width,min(900,portrait.height))).resize((w,600),Image.Resampling.LANCZOS)
mobile.paste(p,(0,280))
d=ImageDraw.Draw(mobile)
d.text((25,28),"ABHILASH GIRI",font=font(sans,15),fill="#e3bb78")
d.text((25,96),"A world of",font=font(serif,34),fill="#f1e4d2")
d.text((25,145),"work and wonder",font=font(serif,33),fill="#f1e4d2")
d.text((26,212),"A portfolio you can read or explore.",font=font(sans,16),fill="#c1d1da")
rounded(d,(25,820,387,880),17,"#dfac6b")
d.text((91,837),"Explore My World",font=font(sans,18),fill="#172848")
mobile.save(REV/"framing_pixel9.png")
mobile.save(WEB/"poster_pixel9.webp","WEBP",quality=73,method=6)

# Content space example: readable sheet over a world view, documented as a study.
panel=mobile.copy();d=ImageDraw.Draw(panel)
rounded(d,(13,440,399,900),26,"#1b3153",outline="#9c835d",width=2)
d.rounded_rectangle((184,453,228,458),radius=3,fill="#a6b9c4")
d.text((35,484),"PROJECT LAUNCHPAD",font=font(sans,14),fill="#e3b66f")
d.text((35,529),"VERA",font=font(serif,38),fill="#f4e6d2")
lines=["A knowledge assistant that searches","technical documents and source code","to help answer engineering questions."]
for i,line in enumerate(lines):d.text((35,591+i*31),line,font=font(sans,15),fill="#d0dde1")
d.text((35,737),"Explore details in a readable sheet",font=font(sans,14),fill="#bdcdd2")
rounded(d,(35,810,377,866),15,"#dca65f")
d.text((140,826),"Close details",font=font(sans,16),fill="#172848")
panel.save(REV/"framing_pixel9_panel.png")

# Social share art is derived from the world, with a distinct editorial crop.
social=Image.new("RGB",(1200,630),"#10203e")
crop=desktop.resize((840,525),Image.Resampling.LANCZOS)
social.paste(crop,(370,50))
d=ImageDraw.Draw(social)
d.text((58,90),"ABHILASH GIRI",font=font(sans,20),fill="#deb473")
d.text((58,196),"My World",font=font(serif,60),fill="#f2e7d6")
d.text((61,282),"Projects, experience,",font=font(sans,21),fill="#ccdbe0")
d.text((61,317),"skills and curiosity.",font=font(sans,21),fill="#ccdbe0")
d.line((60,510,1125,510),fill="#a9855b",width=2)
social.save(WEB/"social_1200x630.webp","WEBP",quality=80,method=6)
social.save(REV/"social_1200x630.png")
print("FRAMING_DONE")
