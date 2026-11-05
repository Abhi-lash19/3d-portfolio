# Assets and pre-build visual approval

## Required before application implementation
| Item | Deliverable | Current status |
| --- | --- | --- |
| Desktop composition | Hero plus full page mockup, 1440px wide | Original missing; recover or replace |
| Mobile composition | Scroll view and active exploration view, 390px wide | Needed |
| Avatar sheet | Front/side/back, palette, hoodie/jeans/sneakers, idle/walk poses | Specified, artwork needed |
| Island kit sheet | Island silhouette, arrival plaza, launchpad, observatory, reading garden, paths/props | Specified, artwork needed |
| UI state sheet | Desktop panel, mobile sheet, thumbstick, sound/reset/exit controls, loading/fallback | Specified, artwork needed |
| Project imagery | Existing local images reviewed; clean screenshots or accurate diagrams for new featured work | Existing images present; new captures pending |
| Book imagery | Confirm edition; licensed cover or original typographic book art | Title confirmed; edition pending |
| Resume | Current PDF with working download and accessible file name | Awaiting user file |

The concept sheets establish the design before coding. They are not runtime 3D models. During the approved build, construct or source actual models and animation, then derive the hero poster from the final scene so the poster and interactive view match. Do not advertise a generated mockup as a screenshot of a working project.

## Runtime deliverables planned
- Optimized island/landmark kit and avatar with idle/walk/turn behavior; real meshes and authored materials, not a single image mapped on a plane.
- Responsive hero poster (desktop/mobile crops), social preview 1200×630, favicon and original identity mark consistent with the final scene.
- Project images with fixed aspect ratio, responsive WebP/AVIF where supported and sensible fallback.
- Original or freely licensed short footsteps, garden ambience and subtle station ambience; clean loops, volume limits and no surprise autoplay.
- Every externally sourced asset has source URL, author, licence, attribution requirements and modifications recorded in docs/ASSET_LICENSES.md during sourcing. Do not invent a licence from availability online.

## Proposed delivery budgets
Initial page compressed JS excluding lazy 3D: target <=250KB; hero poster <=250KB mobile/500KB desktop; first 3D scene download target <=5MB; textures normally <=1024px with reuse; no automatic audio downloads before opting in. Measure before treating budgets as met. Reduce geometry, draw calls and texture footprint before compromising readability. Budget acceptance accompanies the chosen target device measurements.

User input needed: old approved mockup (if recoverable), resume PDF, book edition. Asset production can supply the other sheets; no need to find every image manually. No image generation was performed in this reconstruction pass.
