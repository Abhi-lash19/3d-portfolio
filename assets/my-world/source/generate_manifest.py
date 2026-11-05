"""Record reproducible asset bytes, dimensions, clips and measured file sizes."""
from pathlib import Path
import hashlib,json,struct,subprocess
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT.parents[1]
files=[]
for p in sorted(ROOT.rglob("*")):
    if not p.is_file() or p.name.endswith(".blend1") or p.name=="asset-manifest.json":
        continue
    rel=p.relative_to(ROOT).as_posix()
    item={"path":rel,"bytes":p.stat().st_size,"sha256":hashlib.sha256(p.read_bytes()).hexdigest()}
    if p.suffix==".glb":
        with p.open("rb") as f:
            header=f.read(12);length,kind=struct.unpack("<II",f.read(8))
            gltf=json.loads(f.read(length))
        item["glb"]={"meshes":len(gltf.get("meshes",[])),"nodes":len(gltf.get("nodes",[])),
                     "animations":[a["name"] for a in gltf.get("animations",[])]}
    if p.suffix.lower() in (".png",".webp"):
        with Image.open(p) as image:item["dimensions"]=list(image.size)
    if p.suffix in (".mp4",".ogg",".wav"):
        run=subprocess.run(["ffprobe","-v","error","-show_entries","format=duration",
            "-of","default=noprint_wrappers=1:nokey=1",str(p)],capture_output=True,text=True)
        if run.returncode==0:
            try:item["duration_seconds"]=round(float(run.stdout.strip()),3)
            except ValueError:pass
    files.append(item)
manifest={"project":"My World","stage":"production checkpoint, not approved",
          "asset_root":"assets/my-world","entries":files,
          "runtime_glb_bytes":sum(x["bytes"] for x in files if x["path"].startswith("exports/")),
          "references":"User ZIP inspected for visual direction; not redistributed."}
(ROOT/"asset-manifest.json").write_text(json.dumps(manifest,indent=2)+"\n")
print("entries",len(files),"runtime GLB bytes",manifest["runtime_glb_bytes"])
