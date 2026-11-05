# My World asset production checkpoint

Status: **work in progress; not submitted for asset approval.** This directory is an isolated asset collection and review study. It does not change the portfolio application. The ten images in the user-supplied `portfolio_idea.zip` were inspected as design references; the two commercial book-cover screenshots are identification evidence only and are not copied into these assets.

## Reproduce

From the repository root with Blender 4.3 and Python, NumPy, SciPy, FFmpeg, Inkscape and ImageMagick available:

```sh
blender -b -t 4 --python assets/my-world/source/build_characters.py
blender -b -t 4 --python assets/my-world/source/build_world.py
blender -b -t 4 --python assets/my-world/source/render_interactions.py
python3 assets/my-world/audio/generate_audio.py
python3 assets/my-world/illustrations/make_project_diagrams.py
python3 assets/my-world/illustrations/make_contact_icons.py
python3 assets/my-world/illustrations/make_framing.py
python3 assets/my-world/source/generate_manifest.py
```

Editable Blender scenes and scripts are in `source/`. GLB files are in `exports/`. The two original book illustrations, six truthful conceptual project diagrams, four contact pictograms and identity mark are SVG. Audio WAV masters and compact OGG exports are in `audio/`. Rendered PNG/MP4 evidence is in `review/`; optimized posters and favicon are in `web/`.

## Present asset contract

- `my_world_island.glb`: floating island, My World gate, six exterior destinations, circulation and props. Static meshes are grouped by material in the GLB; the editable scene keeps the separate pieces. Three named skill-tile motion channels are included.
- `avatar.glb`: skinned navy-hoodie/regular-jeans character with eight named actions. Walking only.
- `golden_dog.glb`: skinned golden dog with amber collar and eight named actions. Running and a small hop included.
- `pet_together.mp4`, `fetch_together.mp4` and `cascade_motion.mp4` are actual renders of the exported 3D assets. Other MP4s show individual clips.
- `framing_desktop.png`, `framing_pixel9.png` and `framing_pixel9_panel.png` are composition studies, **not live application screenshots**. The poster crops derive from the rendered world.

## Reference comparison and current defects

The user-supplied boards show denser flowers and vegetation, more developed building exteriors, richer material texture, deeper sculpted elevation and more atmospheric lighting than the current rendered island. This checkpoint preserves the agreed placement and palette but does **not yet meet the final visual bar**.

The pet preview has approximate hand-to-dog alignment; it needs a stronger crouch/contact polish pass. The fetch preview shows ball travel and dog movement, but convincing pickup, mouth attachment and return/release choreography are still pending. The waterfall preview proves tile motion; the water surface itself needs visible looping flow. Book art and contact pictograms need final visual approval. Audio is original synthesized sound and must be auditioned in context. Lora/Inter packaging, real Pixel 9 testing and browser performance are pending. No application build or production integration is implied.

Runtime policy for later integration: audio starts muted and loads only after opt-in, decorative motion stops for reduced-motion/offscreen states, and page content remains complete without exploration. Keep the current public portfolio intact until the separately authorized build is complete.
