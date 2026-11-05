"""Reproducible My World island kit. Run: blender -b -t 4 --python build_world.py"""
import bpy, math, random, os
from mathutils import Vector

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXPORT = os.path.join(ROOT, "exports")
REVIEW = os.path.join(ROOT, "review")
os.makedirs(EXPORT, exist_ok=True)
os.makedirs(REVIEW, exist_ok=True)
random.seed(19)
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)

def mat(name, color, rough=.78, metallic=0, emission=None, strength=0):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    p=m.node_tree.nodes.get("Principled BSDF")
    p.inputs["Base Color"].default_value=(*color,1)
    p.inputs["Roughness"].default_value=rough
    p.inputs["Metallic"].default_value=metallic
    if emission:
        p.inputs["Emission Color"].default_value=(*emission,1)
        p.inputs["Emission Strength"].default_value=strength
    return m

sapphire=mat("Sapphire stone",(.047,.095,.22))
deep=mat("Deep indigo",(.024,.044,.112))
blue=mat("Slate blue",(.17,.27,.39))
cream=mat("Ivory stone",(.8,.75,.63))
pathmat=mat("Warm flagstone",(.55,.51,.47))
grass=mat("Blue hour grass",(.16,.29,.25))
grass_light=mat("Moss green",(.28,.4,.29))
leaf=mat("Sage foliage",(.3,.47,.38))
leaf_dark=mat("Deep foliage",(.12,.27,.25))
flower=mat("Buttercup",(.95,.68,.29))
pink=mat("Dusky pink",(.72,.41,.52))
wood=mat("Warm cedar",(.39,.22,.15))
roof=mat("Cabin roof",(.16,.23,.35))
water=mat("Cascade water",(.16,.58,.76),.2,0,(.07,.4,.72),.3)
glow=mat("Amber lantern",(.98,.56,.15),.28,0,(1,.48,.09),2.5)
gold=mat("Warm brass",(.72,.43,.17),.32,.55)
glass=mat("Telescope glass",(.09,.19,.29),.12,.25)

def uv(name,loc,scale,material,seg=16,rings=8):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg,ring_count=rings,location=loc)
    o=bpy.context.object; o.name=name; o.scale=scale; o.data.materials.append(material); return o
def cube(name,loc,scale,material,bevel=0):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc)
    o=bpy.context.object; o.name=name; o.dimensions=scale; bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(material)
    if bevel:
        mod=o.modifiers.new("Soft carved edges","BEVEL");mod.width=bevel;mod.segments=2
        o.modifiers.new("Weighted normals","WEIGHTED_NORMAL")
    return o
def cyl(name,loc,radius,depth,material,vertices=16):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=radius,depth=depth,location=loc)
    o=bpy.context.object;o.name=name;o.data.materials.append(material);return o
def cone(name,loc,r1,r2,depth,material,vertices=12):
    bpy.ops.mesh.primitive_cone_add(vertices=vertices,radius1=r1,radius2=r2,depth=depth,location=loc)
    o=bpy.context.object;o.name=name;o.data.materials.append(material);return o
def path(name,pts,radius,material,bevel=3):
    c=bpy.data.curves.new(name,"CURVE");c.dimensions="3D";c.bevel_depth=radius;c.bevel_resolution=bevel
    s=c.splines.new("BEZIER");s.bezier_points.add(len(pts)-1)
    for b,p in zip(s.bezier_points,pts): b.co=p;b.handle_left_type="AUTO";b.handle_right_type="AUTO"
    o=bpy.data.objects.new(name,c);bpy.context.collection.objects.link(o);o.data.materials.append(material);return o
def text(name,string,loc,size,material,rotation=(math.pi/2,0,0),align="CENTER"):
    c=bpy.data.curves.new(name,"FONT");c.body=string;c.size=size;c.align_x=align;c.extrude=.012;c.bevel_depth=.003
    o=bpy.data.objects.new(name,c);bpy.context.collection.objects.link(o);o.location=loc;o.rotation_euler=rotation;c.materials.append(material);return o
def beam(name,a,b,r,material,verts=10):
    a,b=Vector(a),Vector(b); mid=(a+b)/2
    o=cyl(name,mid,r,(b-a).length,material,verts)
    o.rotation_euler=(b-a).to_track_quat("Z","Y").to_euler()
    return o

# Tapered, layered floating landmass with an open, walkable upper surface.
for i,(z,rx,ry,ma) in enumerate([(-2.25,1.2,.8,deep),(-1.55,4.0,2.7,sapphire),(-.85,7.1,4.5,blue),(-.25,8.6,5.65,cream),(0,8.35,5.4,grass)]):
    n=40; verts=[];faces=[]
    for j in range(n):
        t=2*math.pi*j/n
        wobble=1+.025*math.sin(5*t)+.018*math.cos(11*t)
        verts.append((rx*math.cos(t)*wobble,ry*math.sin(t)*wobble,z+random.uniform(-.045,.045)))
    verts.append((0,0,z))
    for j in range(n): faces.append((n,j,(j+1)%n))
    mesh=bpy.data.meshes.new("island_layer");mesh.from_pydata(verts,[],faces);mesh.materials.append(ma)
    o=bpy.data.objects.new("Island / layer %02d"%i,mesh);bpy.context.collection.objects.link(o)
    if i<4:
        for j in range(14):
            t=2*math.pi*j/14+random.uniform(-.12,.12)
            uv("Cliff facet",((rx+.1)*math.cos(t),(ry+.1)*math.sin(t),z-.13),(.42,.34,.3),ma,8,4)

# Continuous faceted cliff skin makes the miniature world visibly float.
profiles=[(-2.25,1.2,.8),(-1.55,4.0,2.7),(-.85,7.1,4.5),(-.25,8.6,5.65),(0,8.35,5.4)]
N=48; vv=[];ff=[]
for k,(z,rx,ry) in enumerate(profiles):
    for j in range(N):
        t=math.tau*j/N;w=1+.018*math.sin(7*t)+.012*math.cos(13*t)
        vv.append((rx*math.cos(t)*w,ry*math.sin(t)*w,z+.025*math.sin(9*t+k)))
for k in range(len(profiles)-1):
    for j in range(N):
        a=k*N+j;b=k*N+(j+1)%N;c=(k+1)*N+(j+1)%N;d=(k+1)*N+j
        ff.append((a,b,c,d))
mesh=bpy.data.meshes.new("Faceted floating cliff");mesh.from_pydata(vv,[],ff);mesh.materials.append(sapphire)
obj=bpy.data.objects.new("Floating island cliff skin",mesh);bpy.context.collection.objects.link(obj)

# Carved winding path network, assembled from soft flagstone strips.
routes=[
    [(0,-5.15,.07),(-.3,-3.6,.07),(-1,-1.7,.07),(-2.2,.2,.07)],
    [(-1,-1.7,.07),(-3.2,-2.4,.07),(-4.25,-3.2,.07)],
    [(-2.2,.2,.07),(-4.4,.8,.07),(-5.75,1.65,.07)],
    [(-2.2,.2,.07),(-.9,2,.07),(.15,3.45,.07)],
    [(-.9,2,.07),(2.25,2.15,.07),(4.65,2.0,.07)],
    [(1,-1.55,.07),(3,-2.2,.07),(5,-2.1,.07)],
    [(-1,-1.7,.07),(1,-1.55,.07),(2.25,2.15,.07)]
]
for i,pts in enumerate(routes):
    path("Flagstone route %d"%i,pts,.27,pathmat,4)
    for p in pts[1:-1]: uv("Path junction stone",(p[0],p[1],.075),(.31,.28,.045),cream,12,5)

def lantern(x,y,h=.65):
    cyl("Lantern post",(x,y,h/2),.045,h,wood,8)
    cube("Lantern housing",(x,y,h+.1),(.23,.23,.25),gold,.03)
    uv("Lantern light",(x,y,h+.11),(.095,.095,.11),glow,12,6)
    cone("Lantern crown",(x,y,h+.29),.18,.02,.16,roof,8)
def tree(x,y,s=1):
    beam("Tree trunk",(x,y,0),(x,y,1.2*s),.12*s,wood,8)
    for dx,dy,dz,k,ma in [(-.33,0,1.37,.55,leaf),(0,.15,1.68,.67,leaf_dark),(.36,.08,1.32,.54,leaf)]:
        uv("Sculpted canopy",(x+dx*s,y+dy*s,dz*s),(.52*k/.55*s,.48*k/.55*s,.53*k/.55*s),ma,12,6)
def flowers(x,y,n=5):
    for j in range(n):
        dx=random.uniform(-.3,.3);dy=random.uniform(-.25,.25);h=random.uniform(.13,.24)
        beam("Flower stem",(x+dx,y+dy,.04),(x+dx,y+dy,h),.012,leaf_dark,6)
        uv("Flower head",(x+dx,y+dy,h),(.055,.055,.045),random.choice([flower,pink,cream]),8,4)

# Arrival arch. The outward face is the canonical world title.
for x in (-.98,.98):
    cube("Gate foot",(x,-5.05,.32),(.58,.64,.65),sapphire,.12)
    cube("Gate pier",(x,-5.05,1.3),(.38,.4,1.75),cream,.12)
    cube("Gate finial",(x,-5.05,2.22),(.49,.51,.19),gold,.055)
cube("Gate lintel",(0,-5.05,2.23),(2.45,.46,.47),sapphire,.13)
cube("Gate title inlay",(0,-5.305,2.23),(1.85,.055,.36),deep,.055)
text("My World gate letters","MY WORLD",(0,-5.34,2.125),.29,glow)
for x in (-1.38,1.38): lantern(x,-5.15,.76)

# Project Launchpad: radial dais, layered platform and slender signal tower.
px,py=-2.25,.35
cyl("Launchpad plinth",(px,py,.19),1.2,.32,sapphire,12)
cyl("Launchpad top",(px,py,.4),1.04,.14,cream,12)
cyl("Launchpad stage",(px,py,.51),.76,.1,blue,12)
for j in range(8):
    t=2*math.pi*j/8
    uv("Launchpad beacon",(px+.9*math.cos(t),py+.9*math.sin(t),.53),(.06,.06,.07),glow,8,4)
for j in range(3):
    xx=px+(-.4+j*.4)
    cube("Project slab",(xx,py+.05,.7),(.28,.36,.26),sapphire,.06)
    cube("Project display",(xx,py-.17,.72),(.22,.025,.16),water,.015)
beam("Launch mast",(px,py+.75,.48),(px,py+.75,2.25),.07,gold)
uv("Launch signal",(px,py+.75,2.37),(.17,.17,.22),glow,12,6)
text("Launchpad label","PROJECTS",(px,py-1.08,.58),.22,cream,(0,0,0))

# Experience Observatory: layered circular tower and warm telescope.
ox,oy=.15,3.47
cyl("Observatory base",(ox,oy,.22),1.05,.42,sapphire,16)
cyl("Observatory body",(ox,oy,1.08),.73,1.38,cream,16)
for a in range(8):
    t=a*math.tau/8
    cube("Observatory window",(ox+.73*math.cos(t),oy+.73*math.sin(t),1.22),(.13,.07,.52),glass,.02).rotation_euler[2]=t
uv("Observatory dome",(ox,oy,1.91),(.85,.85,.5),roof,16,8)
cyl("Dome cap",(ox,oy,2.36),.14,.15,gold)
beam("Telescope barrel",(ox-.27,oy-.1,2.07),(ox-.96,oy-.6,2.5),.16,gold)
cyl("Telescope eye",(ox-.96,oy-.6,2.5),.21,.08,glass)
for x in (-.85,.85): lantern(ox+x,oy-1.05,.62)

# Skills Cascade: elevated rocks, visible turquoise course, sparse skill tiles.
sx,sy=-5.75,1.48
for x,y,z,s in [(-.7,.3,.2,.85),(.35,.3,.4,1.0),(-.18,.6,.8,.85),(.1,.76,1.22,.75)]:
    uv("Cascade sculpted rock",(sx+x,sy+y,z),(.78*s,.56*s,.6*s),blue,10,6)
path("Water lip",[(sx-.2,sy+.9,1.56),(sx-.13,sy+.6,1.19),(sx+.2,sy+.3,.7),(sx+.32,sy-.08,.12)],.24,water,4)
uv("Cascade pool",(sx+.45,sy-.38,.09),(.92,.59,.11),water,16,6)
path("Watercourse",[(sx+.5,sy-.48,.08),(sx+1.8,sy-.68,.07),(px-.75,py+.7,.07)],.13,water,3)
for j,label in enumerate(("JS","PY","3D")):
    o=cube("Flowing skill tile "+label,(sx+.27+j*.05,sy+.5,1.78-j*.28),(.44,.09,.26),sapphire,.045)
    o.keyframe_insert("location",frame=1+j*12)
    o.location.z-=.62;o.location.y-=.55;o.keyframe_insert("location",frame=25+j*12)
    o.location.z-=.68;o.location.y-=.4;o.keyframe_insert("location",frame=48+j*12)
    glyph=text("Tile glyph "+label,label,(0,-.045,-.07),.12,cream)
    glyph.parent=o

# Reading Garden: stacked books, pergola, bench and butterfly flowers.
rx,ry=4.55,1.75
uv("Garden paving",(rx,ry,.08),(1.72,1.36,.1),grass_light,24,8)
for xx in (rx-1.05,rx+1.05):
    beam("Pergola post",(xx,ry-.4,.1),(xx,ry-.4,1.9),.07,wood,8)
    beam("Pergola post",(xx,ry+.55,.1),(xx,ry+.55,1.9),.07,wood,8)
for y in (ry-.44,ry+.56): beam("Pergola rail",(rx-1.12,y,1.94),(rx+1.12,y,1.94),.085,wood)
for x in (rx-.85,rx,rx+.85):beam("Pergola crosspiece",(x,ry-.65,1.99),(x,ry+.78,1.99),.045,wood)
cube("Garden bench seat",(rx,ry-.57,.48),(1.45,.42,.15),wood,.08)
cube("Garden bench back",(rx,ry-.31,.79),(1.45,.14,.62),wood,.06)
for x in (rx-.54,rx+.54):cube("Bench leg",(x,ry-.57,.25),(.11,.23,.5),sapphire,.04)
for j,(ma,angle) in enumerate([(deep,-.1),(pink,.12)]):
    o=cube("Original book prop",(rx-.28+j*.24,ry+.2,.31+j*.07),(.36,.49,.07),ma,.015);o.rotation_euler[2]=angle
for x,y in [(3.45,2.1),(5.4,2.95),(5.9,1.22),(3.8,.7)]: flowers(x,y,8)
for j in range(2):
    cx,cy=3.55+j*2.2,2.55-j*.45
    beam("Butterfly body",(cx,cy,.95),(cx,cy,1.08),.017,wood,6)
    for sign in (-1,1):
        uv("Butterfly wing",(cx+sign*.12,cy,1.05),(.13,.04,.1),flower if j==0 else pink,8,4)

# Contact Cabin: warm porch, windows, steep sculpted roof and chimney.
cx,cy=4.75,-2.05
cube("Cabin foundation",(cx,cy,.2),(2.45,1.9,.38),sapphire,.18)
cube("Cabin walls",(cx,cy,1.08),(2.14,1.63,1.45),cream,.15)
for side in (-1,1):
    o=cube("Cabin roof slope",(cx+side*.62,cy,2.03),(1.5,2.14,.18),roof,.04)
    o.rotation_euler[1]=side*.52
cube("Cabin ridge",(cx,cy,2.44),(.24,2.15,.18),gold,.04)
cube("Cabin door",(cx,cy- .845,.91),(.66,.07,1.18),wood,.06)
uv("Cabin door handle",(cx+.22,cy-.9,.9),(.05,.04,.05),gold,8,4)
for x in (cx-.77,cx+.77):
    cube("Cabin window",(x,cy-.855,1.32),(.38,.04,.48),water,.04)
    beam("Window mullion",(x,cy-.88,1.09),(x,cy-.88,1.55),.018,gold,6)
lantern(cx-1.36,cy-.75,.76); lantern(cx+1.36,cy-.75,.76)
cube("Cabin chimney",(cx+.65,cy+.25,2.5),(.28,.29,.7),sapphire,.05)

# Play Meadow: open circular patch, ball, low stones, no obstacles in fetch area.
mx,my=-4.35,-3.1
uv("Play meadow",(mx,my,.06),(1.48,1.17,.13),grass_light,24,8)
for j in range(8):
    t=j*math.tau/8
    if j in (0,1,4):continue
    uv("Meadow boundary stone",(mx+1.5*math.cos(t),my+1.2*math.sin(t),.13),(.18,.16,.13),cream,10,5)
uv("Fetch ball",(mx+.17,my-.12,.22),(.13,.13,.13),flower,16,8)
flowers(mx-1.05,my+.25,7)
flowers(mx+.95,my+.55,5)

# Environmental kit: keep central routes clear.
for x,y,s in [(-7,-.6,1),(-6.9,3.7,.85),(-4.4,3.6,.95),(-2.3,4.1,.78),(2.2,4.4,.77),
              (7.05,2.4,.85),(6.7,-.1,.75),(6.8,-3.3,.83),(2.7,-4.55,.68),
              (-6.9,-3.1,.7),(-2.5,-4.8,.5)]:
    tree(x,y,s)
for x,y in [(-7,1),(-6,-4.1),(-4.7,4.4),(-1.7,4.9),(1.9,4.5),(7.2,1.1),(6.3,-4.4),(.8,-4.3),(-3.2,-4.65)]:
    flowers(x,y,6)
for x,y in [(-.8,-4.1),(-2.65,-1.17),(-4.55,-1.8),(-3.75,.2),(-1.25,1.7),(2.85,.85),(3.1,-1.9)]:
    lantern(x,y,.52)

# Export geometry and authored waterfall tile motion before adding review-only cameras/lights.
bpy.context.scene.frame_start=1;bpy.context.scene.frame_end=72
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,"source","my_world_island.blend"))
# Collapse static kit by material for the browser; the saved .blend retains every part.
animated={o for o in bpy.data.objects if o.animation_data and o.animation_data.action}
bpy.ops.object.select_all(action="DESELECT")
convertible=[o for o in bpy.data.objects if o not in animated and o.type in {"MESH","CURVE","FONT"}]
for o in convertible:o.select_set(True)
if convertible:
    bpy.context.view_layer.objects.active=convertible[0]
    bpy.ops.object.convert(target="MESH")
bpy.ops.object.select_all(action="DESELECT")
static=[o for o in bpy.data.objects if o.type=="MESH" and o not in animated and o.parent not in animated]
groups={}
for o in static:
    key=o.data.materials[0].name if o.data.materials else "No material"
    groups.setdefault(key,[]).append(o)
for key,parts in groups.items():
    if len(parts)<2:continue
    for o in parts:o.select_set(True)
    bpy.context.view_layer.objects.active=parts[0]
    bpy.ops.object.join()
    parts[0].name="Kit / "+key
    bpy.ops.object.select_all(action="DESELECT")
bpy.ops.export_scene.gltf(filepath=os.path.join(EXPORT,"my_world_island.glb"),export_format="GLB",
    export_apply=True,export_animations=True,export_lights=False,export_cameras=False)

# The review composition includes the exported companions; runtime keeps separate GLBs.
for filename,location,scale in [
    ("avatar.glb",(-.13,-3.85,.1),.75),
    ("golden_dog.glb",(.65,-3.8,.1),.78),
]:
    candidate=os.path.join(EXPORT,filename)
    if os.path.exists(candidate):
        before=set(bpy.data.objects)
        bpy.ops.import_scene.gltf(filepath=candidate)
        for item in set(bpy.data.objects)-before:
            if item.parent is None:
                item.location=location;item.scale=(scale,)*3

world=bpy.context.scene.world or bpy.data.worlds.new("Blue hour");bpy.context.scene.world=world
world.use_nodes=True;world.node_tree.nodes.get("Background").inputs["Color"].default_value=(.018,.032,.085,1)
world.node_tree.nodes.get("Background").inputs["Strength"].default_value=.6
def area(name,loc,power,color,size):
    d=bpy.data.lights.new(name,"AREA");d.energy=power;d.color=color;d.shape="DISK";d.size=size
    o=bpy.data.objects.new(name,d);bpy.context.collection.objects.link(o);o.location=loc
    o.rotation_euler=(Vector((0,0,0))-o.location).to_track_quat("-Z","Y").to_euler()
area("Soft dusk key",(-3,-4,10),1700,(.65,.77,1),9)
area("Amber rim",(5,3,9),1000,(1,.68,.38),8)
area("Sky fill",(0,6,7),650,(.4,.6,1),9)
bpy.ops.object.camera_add(location=(15,-20,17))
cam=bpy.context.object;cam.name="Desktop composition camera"
cam.rotation_euler=(Vector((0,0,.1))-cam.location).to_track_quat("-Z","Y").to_euler()
cam.data.type="ORTHO";cam.data.ortho_scale=22
bpy.context.scene.camera=cam
sc=bpy.context.scene;sc.render.engine="CYCLES";sc.cycles.device="CPU";sc.cycles.samples=12
bpy.context.view_layer.cycles.use_denoising=False
sc.render.resolution_x=1440;sc.render.resolution_y=900;sc.render.resolution_percentage=75
sc.render.image_settings.file_format="PNG";sc.render.filepath=os.path.join(REVIEW,"world_desktop.png")
sc.view_settings.view_transform="AgX"
sc.render.film_transparent=False
sc.frame_set(1)
bpy.ops.render.render(write_still=True)
cam.location=(13,-18,18);cam.rotation_euler=(Vector((0,0,.35))-cam.location).to_track_quat("-Z","Y").to_euler()
cam.data.ortho_scale=23
sc.render.resolution_x=1080;sc.render.resolution_y=1440;sc.render.resolution_percentage=65
sc.render.filepath=os.path.join(REVIEW,"world_pixel9_portrait.png")
bpy.ops.render.render(write_still=True)
print("WORLD_ASSET_DONE")
