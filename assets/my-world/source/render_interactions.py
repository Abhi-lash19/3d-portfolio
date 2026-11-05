"""Render actual GLB animation interactions together, separate from application code."""
import bpy,math,os
from mathutils import Vector
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXP=os.path.join(ROOT,"exports");REV=os.path.join(ROOT,"review")
def clear():
    bpy.ops.object.select_all(action="SELECT");bpy.ops.object.delete(use_global=False)
def mat(name,color):
    m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
    m.node_tree.nodes.get("Principled BSDF").inputs["Base Color"].default_value=(*color,1)
    return m
def import_rig(filename,rig_name):
    bpy.ops.import_scene.gltf(filepath=os.path.join(EXP,filename))
    return next(o for o in bpy.data.objects if o.type=="ARMATURE" and o.name==rig_name)
def set_action(rig,prefix):
    a=next(a for a in bpy.data.actions if a.name.startswith(prefix))
    rig.animation_data_create();rig.animation_data.action=a
def place(rig,name,pos):
    p=bpy.data.objects.new(name,None);bpy.context.collection.objects.link(p)
    rig.parent=p;p.location=pos;return p
def light(name,loc,power,color,size):
    d=bpy.data.lights.new(name,"AREA");d.energy=power;d.size=size;d.color=color
    o=bpy.data.objects.new(name,d);bpy.context.collection.objects.link(o);o.location=loc
    o.rotation_euler=(Vector((0,0,.6))-o.location).to_track_quat("-Z","Y").to_euler()
def setup(target=(0,-.2,.85),camera=(3,-5,3),scale=3.7):
    sc=bpy.context.scene;sc.render.engine="CYCLES";sc.cycles.device="CPU";sc.cycles.samples=4
    bpy.context.view_layer.cycles.use_denoising=False
    w=bpy.data.worlds.new("Blue hour");sc.world=w;w.use_nodes=True
    w.node_tree.nodes.get("Background").inputs["Color"].default_value=(.08,.13,.25,1)
    w.node_tree.nodes.get("Background").inputs["Strength"].default_value=.7
    light("Warm key",(2,-4,5),580,(1,.8,.62),4)
    light("Blue fill",(-4,1,4),350,(.6,.76,1),5)
    bpy.ops.object.camera_add(location=camera)
    c=bpy.context.object;c.rotation_euler=(Vector(target)-c.location).to_track_quat("-Z","Y").to_euler()
    c.data.type="ORTHO";c.data.ortho_scale=scale;sc.camera=c
    sc.render.resolution_x=480;sc.render.resolution_y=360;sc.render.resolution_percentage=70
    sc.view_settings.view_transform="AgX";sc.render.fps=16
    sc.render.image_settings.file_format="FFMPEG";sc.render.ffmpeg.format="MPEG4";sc.render.ffmpeg.codec="H264"
    sc.render.ffmpeg.constant_rate_factor="HIGH"
    return sc
def render(name,stop):
    sc=bpy.context.scene;sc.frame_start=1;sc.frame_end=stop
    sc.render.filepath=os.path.join(REV,name+".mp4")
    bpy.ops.render.render(animation=True)

# Synchronized accessible Pet action.
clear()
avatar=import_rig("avatar.glb","Avatar rig")
dog=import_rig("golden_dog.glb","Golden dog rig")
place(avatar,"Avatar position",(0,0,0))
place(dog,"Companion position",(.2,.1,-.07))
set_action(avatar,"avatar__pet_");set_action(dog,"dog__pet_reaction_")
bpy.ops.mesh.primitive_cylinder_add(vertices=32,radius=2,depth=.07,location=(0,-.1,-.055))
bpy.context.object.data.materials.append(mat("Meadow ground",(.19,.31,.29)))
setup(camera=(2.7,-4.5,2.65),scale=3.15)
render("pet_together",40)

# Bounded fetch demonstration: thrown ball, dog chase, pickup, return.
clear()
avatar=import_rig("avatar.glb","Avatar rig")
dog=import_rig("golden_dog.glb","Golden dog rig")
place(avatar,"Avatar position",(-.95,.8,0))
dog_pos=place(dog,"Dog fetch path",(-.2,.65,0))
set_action(avatar,"avatar__throw_")
set_action(dog,"dog__run_")
for frame,loc in [(1,(-.2,.65,0)),(17,(.5,-1.9,0)),(25,(.7,-2.15,0)),(47,(-.1,.05,0)),(64,(-.55,.45,0))]:
    dog_pos.location=loc;dog_pos.keyframe_insert("location",frame=frame)
bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=8,radius=.12,location=(-.4,.05,1.05))
ball=bpy.context.object;ball.name="Fetch ball";ball.data.materials.append(mat("Amber ball",(.9,.5,.15)))
for frame,loc in [(1,(-.5,.4,.8)),(11,(-.2,-.75,1.48)),(20,(.7,-2.2,.13)),
                  (29,(.7,-2.2,.15)),(45,(-.1,-.12,.53)),(58,(-.55,.35,.14))]:
    ball.location=loc;ball.keyframe_insert("location",frame=frame)
bpy.ops.mesh.primitive_cylinder_add(vertices=40,radius=3,depth=.05,location=(0,-.7,-.045))
bpy.context.object.data.materials.append(mat("Play meadow",(.18,.31,.29)))
setup(target=(-.15,-.65,.7),camera=(4,-6,4),scale=5.7)
render("fetch_together",64)

# Waterfall and authored descending skill-tile keys from the actual island export.
clear()
bpy.ops.import_scene.gltf(filepath=os.path.join(EXP,"my_world_island.glb"))
setup(target=(-5.4,1.25,.72),camera=(-2,-5,5),scale=4.2)
render("cascade_motion",48)
print("INTERACTION_PREVIEWS_DONE")
