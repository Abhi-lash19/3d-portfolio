"""Build skinned, editable character rigs and authored action clips for My World."""
import bpy, math, os
from mathutils import Vector
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for folder in ("exports","review","source"):os.makedirs(os.path.join(ROOT,folder),exist_ok=True)

def mat(name,c,rough=.82):
    m=bpy.data.materials.new(name);m.diffuse_color=(*c,1);m.use_nodes=True
    p=m.node_tree.nodes.get("Principled BSDF");p.inputs["Base Color"].default_value=(*c,1)
    p.inputs["Roughness"].default_value=rough;return m
navy=mat("Navy hoodie",(.055,.13,.27)); navyshade=mat("Hood fold",(.025,.075,.16))
denim=mat("Regular blue denim",(.16,.26,.43));denimshade=mat("Denim seam",(.1,.18,.32))
skin=mat("Warm skin",(.67,.43,.31));hair=mat("Dark hair",(.07,.055,.06))
shoe=mat("Slate sneakers",(.1,.16,.23));sole=mat("Ivory sole",(.76,.73,.65))
cream=mat("Cream",(.86,.77,.58));gold=mat("Golden fur",(.78,.48,.21));lightgold=mat("Chest gold",(.96,.71,.38))
earmat=mat("Ear amber",(.55,.29,.14));collar=mat("Amber collar",(.95,.43,.12));nose=mat("Dog nose",(.11,.085,.08))
eye=mat("Eyes",(.055,.045,.052));white=mat("White detail",(.98,.91,.8))

def reset():
    bpy.ops.object.select_all(action="SELECT");bpy.ops.object.delete(use_global=False)
    for a in list(bpy.data.actions):bpy.data.actions.remove(a)
def armature(name,bones):
    arm=bpy.data.armatures.new(name+" skeleton");obj=bpy.data.objects.new(name+" rig",arm)
    bpy.context.collection.objects.link(obj);bpy.context.view_layer.objects.active=obj;obj.select_set(True)
    bpy.ops.object.mode_set(mode="EDIT")
    for name,head,tail,parent in bones:
        b=arm.edit_bones.new(name);b.head=head;b.tail=tail
        if parent:b.parent=arm.edit_bones[parent];b.use_connect=False
    bpy.ops.object.mode_set(mode="OBJECT")
    for b in obj.pose.bones:b.rotation_mode="XYZ"
    obj.select_set(False);return obj
def bind(o,rig,bone):
    vg=o.vertex_groups.new(name=bone);vg.add(list(range(len(o.data.vertices))),1,"REPLACE")
    a=o.modifiers.new("Skin","ARMATURE");a.object=rig;o.parent=rig
def ball(name,p,s,ma,rig,bone,seg=16,rings=8):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg,ring_count=rings,location=p)
    o=bpy.context.object;o.name=name;o.scale=s
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(ma);bind(o,rig,bone);return o
def box(name,p,s,ma,rig,bone,bev=.03):
    bpy.ops.mesh.primitive_cube_add(size=1,location=p);o=bpy.context.object;o.name=name;o.dimensions=s
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(ma)
    if bev:
        m=o.modifiers.new("Sculpted corners","BEVEL");m.width=bev;m.segments=2
        o.modifiers.new("Normals","WEIGHTED_NORMAL")
    bind(o,rig,bone);return o
def link(name,a,b,r,ma,rig,bone):
    a,b=Vector(a),Vector(b)
    bpy.ops.mesh.primitive_cone_add(vertices=12,radius1=r*1.05,radius2=r*.82,depth=(b-a).length,location=(a+b)/2)
    o=bpy.context.object;o.name=name;o.rotation_euler=(b-a).to_track_quat("Z","Y").to_euler()
    bpy.ops.object.transform_apply(location=False,rotation=True,scale=True)
    o.data.materials.append(ma);bind(o,rig,bone);return o
def key(rig,frame,rots=None,loc=None):
    for name,pb in rig.pose.bones.items():
        pb.rotation_euler=rots.get(name,(0,0,0)) if rots else (0,0,0)
        pb.keyframe_insert(data_path="rotation_euler",frame=frame,group=name)
    rig.location=loc or (0,0,0);rig.keyframe_insert(data_path="location",frame=frame)
def action(rig,name,poses):
    for b in rig.pose.bones:b.rotation_euler=(0,0,0)
    a=bpy.data.actions.new(name);rig.animation_data_create();rig.animation_data.action=a
    for frame,rots,loc in poses:key(rig,frame,rots,loc)
    a.use_fake_user=True
    return a
def export(rig,name):
    bpy.ops.object.select_all(action="DESELECT")
    rig.select_set(True)
    for o in bpy.data.objects:
        if o.parent==rig:o.select_set(True)
    bpy.context.view_layer.objects.active=rig
    bpy.ops.export_scene.gltf(filepath=os.path.join(ROOT,"exports",name+".glb"),export_format="GLB",
        use_selection=True,export_apply=False,export_animations=True,export_animation_mode="ACTIONS",
        export_lights=False,export_cameras=False)
    bpy.ops.object.select_all(action="DESELECT")
def setup_review(rig,target,height=2):
    w=bpy.context.scene.world or bpy.data.worlds.new("Review blue hour");bpy.context.scene.world=w
    w.use_nodes=True;w.node_tree.nodes.get("Background").inputs["Color"].default_value=(.12,.16,.25,1)
    w.node_tree.nodes.get("Background").inputs["Strength"].default_value=.8
    d=bpy.data.lights.new("Softbox","AREA");d.energy=550;d.size=4
    o=bpy.data.objects.new("Softbox",d);bpy.context.collection.objects.link(o);o.location=(2,-4,5)
    o.rotation_euler=(Vector(target)-o.location).to_track_quat("-Z","Y").to_euler()
    bpy.ops.object.camera_add(location=(3,-6,2.6))
    c=bpy.context.object;c.name="Review camera";c.rotation_euler=(Vector(target)-c.location).to_track_quat("-Z","Y").to_euler()
    c.data.type="ORTHO";c.data.ortho_scale=height;bpy.context.scene.camera=c
    sc=bpy.context.scene;sc.render.engine="CYCLES";sc.cycles.device="CPU";sc.cycles.samples=8
    bpy.context.view_layer.cycles.use_denoising=False
    sc.render.image_settings.file_format="PNG";sc.view_settings.view_transform="AgX"
    sc.render.resolution_x=400;sc.render.resolution_y=600;sc.render.resolution_percentage=80
    return c
def views(rig,name,target,dist,scale):
    c=setup_review(rig,target,scale)
    rig.animation_data.action=bpy.data.actions.get(name+"__idle")
    bpy.context.scene.frame_set(1)
    for view,loc in [("front",(0,-dist,target[2]+.2)),("side",(dist,0,target[2]+.2)),("back",(0,dist,target[2]+.2))]:
        c.location=loc;c.rotation_euler=(Vector(target)-c.location).to_track_quat("-Z","Y").to_euler()
        bpy.context.scene.render.filepath=os.path.join(ROOT,"review",name+"_"+view+".png")
        bpy.ops.render.render(write_still=True)
def motion(rig,name,clip,frames,target,dist,scale):
    c=bpy.context.scene.camera
    c.location=(dist*.65,-dist,target[2]+.35)
    c.rotation_euler=(Vector(target)-c.location).to_track_quat("-Z","Y").to_euler()
    c.data.ortho_scale=scale
    sc=bpy.context.scene;sc.render.resolution_x=360;sc.render.resolution_y=360;sc.render.resolution_percentage=60
    sc.cycles.samples=3
    rig.animation_data.action=bpy.data.actions.get(name+"__"+clip)
    sc.frame_start=1;sc.frame_end=frames;sc.render.fps=16
    sc.render.image_settings.file_format="FFMPEG";sc.render.ffmpeg.format="MPEG4";sc.render.ffmpeg.codec="H264"
    sc.render.ffmpeg.constant_rate_factor="HIGH"
    sc.render.filepath=os.path.join(ROOT,"review",name+"_"+clip+".mp4")
    bpy.ops.render.render(animation=True)

reset()
avatar_bones=[
 ("root",(0,0,.1),(0,0,.8),None),("pelvis",(0,0,.8),(0,0,1.05),"root"),
 ("spine",(0,0,1.05),(0,0,1.62),"pelvis"),("neck",(0,0,1.62),(0,0,1.78),"spine"),
 ("head",(0,0,1.78),(0,0,2.08),"neck"),
 ("arm.L",(-.28,0,1.52),(-.57,0,1.18),"spine"),("forearm.L",(-.57,0,1.18),(-.64,0,.9),"arm.L"),
 ("arm.R",(.28,0,1.52),(.57,0,1.18),"spine"),("forearm.R",(.57,0,1.18),(.64,0,.9),"arm.R"),
 ("thigh.L",(-.17,0,.88),(-.17,0,.49),"pelvis"),("shin.L",(-.17,0,.49),(-.17,0,.12),"thigh.L"),
 ("thigh.R",(.17,0,.88),(.17,0,.49),"pelvis"),("shin.R",(.17,0,.49),(.17,0,.12),"thigh.R")]
rig=armature("Avatar",avatar_bones)
ball("Hoodie torso",(0,0,1.33),(.37,.24,.39),navy,rig,"spine")
ball("Hoodie hem",(0,0,1.05),(.36,.24,.12),navyshade,rig,"spine")
ball("Hood rim",(0,.12,1.62),(.28,.18,.24),navyshade,rig,"spine")
ball("Pelvis denim",(0,0,.9),(.31,.21,.19),denim,rig,"pelvis")
ball("Head",(0,-.01,1.9),(.205,.185,.245),skin,rig,"head")
ball("Hair cap",(0,.01,2.055),(.21,.19,.12),hair,rig,"head")
for x in (-.071,.071):
    ball("Eye",(x,-.177,1.92),(.018,.012,.018),eye,rig,"head",8,4)
    ball("Eyebrow",(x,-.183,1.956),(.035,.008,.009),hair,rig,"head",8,4)
ball("Nose",(0,-.184,1.86),(.026,.028,.034),skin,rig,"head",8,4)
for side in ("L","R"):
    sign=-1 if side=="L" else 1
    link("Hoodie sleeve "+side,(sign*.31,0,1.52),(sign*.56,0,1.18),.13,navy,rig,"arm."+side)
    ball("Sleeve elbow "+side,(sign*.56,0,1.18),(.13,.13,.13),navy,rig,"arm."+side)
    link("Forearm "+side,(sign*.56,0,1.18),(sign*.64,0,.94),.11,navy,rig,"forearm."+side)
    ball("Hand "+side,(sign*.64,-.015,.91),(.085,.07,.12),skin,rig,"forearm."+side)
    link("Regular thigh "+side,(sign*.17,0,.84),(sign*.17,0,.5),.19,denim,rig,"thigh."+side)
    ball("Jean knee "+side,(sign*.17,0,.48),(.185,.17,.1),denim,rig,"thigh."+side)
    link("Straight jean leg "+side,(sign*.17,0,.48),(sign*.17,0,.16),.177,denim,rig,"shin."+side)
    box("Sneaker "+side,(sign*.17,-.085,.1),(.26,.42,.16),shoe,rig,"shin."+side,.06)
    box("Sneaker sole "+side,(sign*.17,-.085,.035),(.27,.43,.055),sole,rig,"shin."+side,.025)
for x in (-.12,.12):
    link("Hoodie drawcord",(x,-.21,1.57),(x,-.22,1.34),.008,cream,rig,"spine")
action(rig,"avatar__idle",[(1,{},None),(16,{"spine":(.015,0,0)},None),(32,{},None)])
action(rig,"avatar__walk",[(1,{"thigh.L":(.4,0,0),"thigh.R":(-.4,0,0),"arm.L":(-.25,0,0),"arm.R":(.25,0,0)},None),
 (9,{"thigh.L":(-.4,0,0),"thigh.R":(.4,0,0),"arm.L":(.25,0,0),"arm.R":(-.25,0,0)},(0,0,.035)),
 (17,{"thigh.L":(.4,0,0),"thigh.R":(-.4,0,0),"arm.L":(-.25,0,0),"arm.R":(.25,0,0)},None)])
action(rig,"avatar__turn",[(1,{},None),(16,{"root":(0,0,.55)},None),(32,{"root":(0,0,1.05)},None)])
action(rig,"avatar__stop",[(1,{"thigh.L":(.26,0,0),"thigh.R":(-.26,0,0)},None),(18,{},None)])
action(rig,"avatar__pet",[(1,{},None),(12,{"pelvis":(.26,0,0),"thigh.L":(-.55,0,0),"thigh.R":(-.55,0,0),"spine":(.35,0,0),"arm.R":(-.75,0,-.25),"forearm.R":(-.65,0,0)},(0,0,-.24)),
 (23,{"pelvis":(.26,0,0),"thigh.L":(-.55,0,0),"thigh.R":(-.55,0,0),"spine":(.39,0,0),"arm.R":(-.93,0,-.25),"forearm.R":(-.65,0,0)},(0,0,-.24)),
 (40,{},None)])
action(rig,"avatar__throw",[(1,{},None),(9,{"arm.R":(1.0,0,-.25),"forearm.R":(.6,0,0),"spine":(-.13,0,0)},None),
 (17,{"arm.R":(-1.0,0,-.12),"forearm.R":(-.4,0,0),"spine":(.15,0,0)},None),(30,{},None)])
action(rig,"avatar__read",[(1,{},None),(14,{"pelvis":(.13,0,0),"thigh.L":(-1.25,0,0),"thigh.R":(-1.25,0,0),"shin.L":(1.15,0,0),"shin.R":(1.15,0,0),"arm.L":(-.65,0,-.25),"arm.R":(-.65,0,.25)},(0,0,-.37)),
 (32,{"pelvis":(.13,0,0),"thigh.L":(-1.25,0,0),"thigh.R":(-1.25,0,0),"shin.L":(1.15,0,0),"shin.R":(1.15,0,0),"arm.L":(-.65,0,-.25),"arm.R":(-.65,0,.25),"head":(.1,0,0)},(0,0,-.37))])
action(rig,"avatar__stand",[(1,{"pelvis":(.13,0,0),"thigh.L":(-1.25,0,0),"thigh.R":(-1.25,0,0),"shin.L":(1.15,0,0),"shin.R":(1.15,0,0)},(0,0,-.37)),(22,{},None)])
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,"source","avatar.blend"))
export(rig,"avatar")
views(rig,"avatar",(0,0,1.12),5,2.7)
motion(rig,"avatar","walk",17,(0,0,1.05),5,2.7)
motion(rig,"avatar","pet",40,(0,0,1.05),5,2.7)
motion(rig,"avatar","throw",30,(0,0,1.05),5,2.7)
motion(rig,"avatar","read",32,(0,0,1.05),5,2.7)

reset()
dog_bones=[
 ("root",(0,0,.2),(0,0,.55),None),("body",(0,.03,.55),(0,-.3,.62),"root"),
 ("neck",(0,-.34,.6),(0,-.57,.77),"body"),("head",(0,-.57,.77),(0,-.72,.8),"neck"),
 ("jaw",(0,-.74,.7),(0,-.84,.65),"head"),("ear.L",(-.18,-.65,.85),(-.28,-.65,.68),"head"),
 ("ear.R",(.18,-.65,.85),(.28,-.65,.68),"head"),
 ("tail",(0,.48,.64),(0,.78,.78),"body"),
 ("front.L",(-.23,-.3,.5),(-.25,-.33,.16),"body"),("front.R",(.23,-.3,.5),(.25,-.33,.16),"body"),
 ("back.L",(-.23,.32,.5),(-.26,.38,.16),"body"),("back.R",(.23,.32,.5),(.26,.38,.16),"body")]
rig=armature("Golden dog",dog_bones)
ball("Golden body",(0,.08,.54),(.38,.65,.36),gold,rig,"body")
ball("Chest ruff",(0,-.39,.54),(.3,.23,.36),lightgold,rig,"neck")
ball("Dog head",(0,-.66,.79),(.29,.31,.27),gold,rig,"head")
ball("Muzzle",(0,-.89,.67),(.22,.19,.14),lightgold,rig,"head")
ball("Nose",(0,-1.04,.72),(.09,.055,.06),nose,rig,"head",12,6)
for side in ("L","R"):
    s=-1 if side=="L" else 1
    ball("Eye "+side,(s*.14,-.899,.85),(.028,.025,.028),eye,rig,"head",8,4)
    ball("Eye glint "+side,(s*.132,-.919,.86),(.009,.009,.009),white,rig,"head",8,4)
    ball("Floppy ear "+side,(s*.27,-.65,.72),(.13,.14,.22),earmat,rig,"ear."+side)
    for place,y in (("front",-.32),("back",.35)):
        name=place+"."+side
        ball("Leg "+name,(s*.25,y,.31),(.125,.13,.28),gold,rig,name)
        ball("Paw "+name,(s*.25,y-.07,.105),(.14,.2,.09),lightgold,rig,name)
ball("Tail plume",(0,.7,.76),(.16,.29,.13),lightgold,rig,"tail")
ball("Amber collar",(0,-.45,.63),(.31,.1,.09),collar,rig,"neck")
ball("Collar tag",(0,-.485,.48),(.07,.04,.09),cream,rig,"neck",8,4)
action(rig,"dog__idle",[(1,{},None),(16,{"head":(.055,0,0),"tail":(0,.27,0)},None),(32,{},None)])
action(rig,"dog__walk",[(1,{"front.L":(.4,0,0),"front.R":(-.4,0,0),"back.L":(-.3,0,0),"back.R":(.3,0,0)},None),
 (9,{"front.L":(-.4,0,0),"front.R":(.4,0,0),"back.L":(.3,0,0),"back.R":(-.3,0,0),"tail":(0,.25,0)},(0,0,.035)),
 (17,{"front.L":(.4,0,0),"front.R":(-.4,0,0),"back.L":(-.3,0,0),"back.R":(.3,0,0)},None)])
action(rig,"dog__run",[(1,{"front.L":(.58,0,0),"front.R":(.4,0,0),"back.L":(-.55,0,0),"back.R":(-.45,0,0)},(0,0,.12)),
 (7,{"front.L":(-.5,0,0),"front.R":(-.48,0,0),"back.L":(.55,0,0),"back.R":(.48,0,0)},(0,0,0)),
 (13,{"front.L":(.58,0,0),"front.R":(.4,0,0),"back.L":(-.55,0,0),"back.R":(-.45,0,0)},(0,0,.12))])
action(rig,"dog__sit",[(1,{},None),(18,{"body":(-.18,0,0),"back.L":(-.8,0,0),"back.R":(-.8,0,0),"front.L":(.2,0,0),"front.R":(.2,0,0)},(0,0,-.19))])
action(rig,"dog__pet_reaction",[(1,{},None),(12,{"head":(0,.3,-.2),"tail":(0,.5,0),"ear.L":(.2,0,0),"ear.R":(-.2,0,0)},None),
 (22,{"head":(-.08,-.18,.25),"tail":(0,-.5,0)},None),(34,{},None)])
action(rig,"dog__fetch_pickup",[(1,{},None),(12,{"neck":(.42,0,0),"head":(.35,0,0),"jaw":(.27,0,0)},(0,0,-.08)),
 (20,{"neck":(.38,0,0),"head":(.2,0,0),"jaw":(-.1,0,0)},(0,0,-.04)),(32,{},None)])
action(rig,"dog__carry_return",[(1,{"head":(-.1,0,0),"tail":(0,.3,0)},None),
 (9,{"front.L":(-.3,0,0),"front.R":(.3,0,0),"back.L":(.3,0,0),"back.R":(-.3,0,0),"tail":(0,-.3,0)},(0,0,.04)),
 (17,{"head":(-.1,0,0),"tail":(0,.3,0)},None)])
action(rig,"dog__hop",[(1,{},None),(8,{"front.L":(-.35,0,0),"front.R":(-.35,0,0),"back.L":(.35,0,0),"back.R":(.35,0,0)},(0,0,.24)),
 (15,{"front.L":(.25,0,0),"front.R":(.25,0,0)},(0,0,0)),(26,{},None)])
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ROOT,"source","golden_dog.blend"))
export(rig,"golden_dog")
views(rig,"dog",(0,-.1,.52),4,1.9)
motion(rig,"dog","run",13,(0,-.1,.5),4,1.9)
motion(rig,"dog","pet_reaction",34,(0,-.1,.5),4,1.9)
motion(rig,"dog","fetch_pickup",32,(0,-.1,.5),4,1.9)
motion(rig,"dog","hop",26,(0,-.1,.5),4,1.9)
print("CHARACTER_ASSETS_DONE")
