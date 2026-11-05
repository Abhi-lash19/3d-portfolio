# Approved models, animation and asset production

Approved by the user on 2026-11-05. This document records approval of all nine recommendations from the model-planning discussion, with the clarifications below. It governs asset production alongside CURRENT_DECISIONS.md. Production assets have not yet been built or approved. This checkpoint records decisions only.

## Scope and sequence
1. Create the complete production asset collection and an isolated preview scene before implementing the portfolio redesign.
2. Present one consolidated asset review with actual rendered models and motion evidence. Fix asset defects within that phase; do not repeatedly reopen settled product choices.
3. Obtain user approval of the produced assets and explicit application-build kickoff. Then integrate them in a continuous implementation pass with testing and fixes.
4. Stay on portfolio-v2. Preserve main and the current public site. No merge, deployment or repository-visibility change is authorized by this asset approval.

The immediate request is documentation, commit, push and handover. Asset creation starts in the next chat. An isolated asset preview is part of asset preparation, not authorization to rebuild the application now.

## Creation method and visual identity
- Use Blender for custom softly sculpted models and authored skeletal animation; Three.js/React Three Fiber supplies browser interaction and procedural environmental movement. Blender was available at /usr/bin/blender in this environment; verify tools again after reconnecting.
- Suitable free assets may supplement custom work only after licence review and visual adaptation. Record source URL, author, licence, attribution and modifications. Paid tools/services are excluded. Tripo/ElevenLabs skill defaults do not grant API credits or override the zero-budget constraint.
- Preserve sapphire/amber colour direction, blue-hour setting, warm lanterns, rounded sculpted forms, readable mostly solid sapphire panels with subtle glass, and minimal controls.
- Simplify surface detail for browser use: shaped fur rather than individual hairs, reusable vegetation rather than dense simulated grass. Preserve silhouette, character, composition and colour. Reference art is visual guidance, not a guarantee of identical real-time rendering.
- My World appears on the physical entrance gate. Abhilash Giri remains in the professional introduction. Older image titles are superseded.

## Asset inventory and production contract
| Asset | Deliverable and requirements |
| --- | --- |
| Island and circulation | Sculpted floating island, entrance gate, paths, safe boundaries, meadow, channel and destination placement; clear navigation from the elevated camera. |
| Six destinations | Project Launchpad, Experience Observatory, Skills Cascade, Reading Garden, Contact Cabin and Play Meadow. Detailed exteriors only; no walkable indoor rooms. |
| Avatar | Friendly fictional male, navy hoodie, regular-fit straight-leg blue jeans, sneakers, no backpack/glasses. Rig with joints suitable for walk, crouch/reach, throw and seated reading. Same identity for the optional fine-pointer cursor companion. |
| Dog | Matching stylized golden dog with amber collar; rigged legs, head, jaw, ears and tail. Expressive petting and fetch motion. |
| Reusable environment | Trees, flowers, rocks, lanterns, clouds, butterflies, bench, ball and simple book props. Reuse geometry/materials with varied scale and placement. |
| Waterfall | Rock and water meshes; procedural flow, restrained splashes and repeating skill tiles. No expensive fluid simulation required. |
| Books | Original coordinated illustrations, correct titles/authors: Deep Work — Cal Newport; Chanakya Neeti — Radhakrishnan Pillai. No copied retailer/commercial cover imagery. |
| Contact marks | Suitable licensed SVG platform icons plus labels: GitHub, LinkedIn, Email and Instagram (Beyond work). Retain existing form. |
| Project graphics | Verified screenshots or accurate original diagrams; no generated screen presented as a functioning project screenshot. Follow PROJECT_COPY_REVIEW.md. |
| Poster and sharing assets | Desktop/mobile poster crops, 1200×630 social image, favicon/identity mark. Derive from the produced world; refresh after final integration if appearance changes. |
| Audio | Freely licensed natural recordings and original synthesized effects where appropriate. Keep editable sources/licence evidence and optimized web exports. |

## Camera, destinations and movement
- Elevated third-person camera, bounded rotation and modest zoom; prevent underground views and losing the avatar. Include reset view.
- Desktop keyboard walking plus drag-look; mobile thumbstick walking plus swipe-look. Click/tap destinations remains available. Mobile exploration is optional.
- Destination selection gently reframes the exterior and opens readable information promptly. Never wait for travel/animation to finish before showing content. Travel starts at the current position; no teleport.
- Desktop details use panels; mobile uses expandable/scrollable bottom sheets with movement controls hidden while open. Restore input and focus on dismissal.
- Petting/reading may use a slightly closer view with easy return. Reduced motion removes camera glides.
- Human walks only: no running or jumping. Dog may run and perform small playful hops/jumps within safe bounds. This does not add a jumping game or obstacles to complete.

## Animation states and interaction rules
| Subject | States/motion | Trigger and completion |
| --- | --- | --- |
| Avatar | Gentle idle breathing, walk, turn and stop | Blend to motion on input, settle on stop; avoid sliding feet and abrupt orientation snaps. |
| Avatar pet | Approach, crouch, reach toward dog head, recover | Accessible Pet action; align hand/dog contact. Movement input cancels and returns control promptly. |
| Avatar fetch | Face target and short throw | Valid target plus Throw; coordinate ball release with hand motion. |
| Avatar reading | Sit on bench and hold book; stand | Reading selection may initiate pose; content appears immediately. Movement cancels optional pose safely. |
| Dog companion | Idle, walk/follow, turn, sit | Follow at comfortable distance; stop nearby rather than overlap avatar or block paths. |
| Dog pet reaction | Head tilt/lean, tail wag, happy sound | Pet action, synchronized with reach. No draggable brush or rubbing gesture. |
| Dog fetch | Run/chase, pick up, carry back, return/release | One throw at a time; return ball before allowing another. Keep ball attached convincingly during carry. |
| Dog garden play | Brief butterfly pursuit, possible small playful hop, return | Bounded Reading Garden activity, not continuous distraction. |
| Skills Cascade | Continuous water and sparse descending skill tiles | Tiles disappear into pool and restart at top; clicking opens grouped skills only, no related-project filter. |
| Observatory | Slow telescope movement, warm light | Restrained ambient motion, not essential to reading experience. |
| Launchpad/Contact | Subtle lights and selection response | No constant attention-grabbing effects; no new launch mini-game implied. |
| Environment | Gentle foliage/cloud movement and small butterfly flights | Pause offscreen/hidden; respect reduced motion. |
| Panels | Short open/close, hover/focus/pressed feedback | Accessible controls; never hover-only; retain readable content without transforms. |

Selecting the dog offers Pet and Play actions accessible by mouse, keyboard and touch. Pet is a simple action, explicitly not a draggable brush.

Fetch preserves the approved aim workflow: pause walking in aim mode; choose reachable ground in any direction within finite meadow range; show arc/landing ring; press Throw. Keyboard arrows aim, Enter throws, Escape cancels. Water, buildings, edges and unreachable spots are invalid. No score or leaderboard. Define safe cancellation/reset handling so interrupted activities cannot strand the ball or dog. Routine timing, rig/clip names and distances are engineering choices to record during production, not new product approvals.

## Lighting and audio
Fixed blue-hour atmosphere with warm amber lanterns; no day/night cycle. Subtle ambience supports the content rather than competing with it.

Approved sounds: quiet waterfall/garden ambience, soft footsteps, dog happy reactions, occasional barks and subtle interaction effects. No background music or narration. Use cooldowns for dog sounds. Default muted, visible explicit sound toggle, no automatic audio download before opt-in, pause when tab is hidden. All sounds follow the same setting; blocked audio must not affect usability. Audition actual exported clips and loops; do not claim quality from filenames alone.

## Mobile, accessibility and performance
- User's reference phone: **Google Pixel 9**. Real-device validation is pending; emulation does not establish Pixel 9 performance. Continue broad browser support including Chrome, Brave, Edge and other supported browsers; do not restrict the site to the user's devices.
- Same destinations and interactions across quality levels. Reduce decorative vegetation, particles, shadows and rendering resolution as necessary on slower devices.
- Reduced motion stops decorative loops and camera glides; keep navigation and content available, with minimal necessary action feedback. Poster plus complete scrolling portfolio is the fallback when 3D is unavailable.
- Approved indicative performance goals: approximately 60 fps on suitable desktops and 30 fps on a representative midrange phone, subject to measurement. Pixel 9 is the user's reference device, not proof of performance on lower-end devices.
- Existing engineering targets remain: initial compressed JS excluding lazy 3D <=250KB; poster <=250KB mobile/500KB desktop; first world download <=5MB; textures normally <=1024px with reuse. These are unverified targets, not achieved measurements. Record actual asset/download sizes and performance; optimize before proposing scope changes.

## Required consolidated review before application build
Produce the asset collection first, then present:
1. Avatar and dog front/side/back views and material palettes.
2. Island composition with all six destinations, gate text and circulation visible.
3. Original book artwork and relevant image/icon assets.
4. Actual 3D motion previews for walking, petting, fetching and waterfall flow, plus reading/dog garden behaviour where produced. Generated storyboards alone do not qualify.
5. Desktop/mobile camera framing and panel-space examples.
6. Auditionable sound samples, licence inventory and measured export sizes.

Check character proportions from multiple views, joints during motion, foot contact, hand-to-dog alignment, ball pickup/return, loop continuity, destination visibility and mobile framing. Review world materials under actual planned lighting. Save evidence with explicit descriptions of what is rendered, interactive, tested or still pending. Approval of this plan is not approval of assets that do not yet exist.

## Storage and next-agent instructions
Preserve editable Blender sources or reproducible generation scripts, exported GLB models/clips, original illustrations, audio, licence records and review renders/videos. Keep a manifest mapping each runtime asset to its source, revision, dimensions/size and clip inventory. Use repo-relative portable paths. Do not rely on temporary preview URLs or this chat as storage. Assess binary size before adding files; Git LFS may be used if needed, with remote object availability verified after push.

Read AGENTS.md and the pinned Three.js director, graphics, model and audio skills plus applicable references before production. Skill defaults cannot change approved style, budget or scope. Integration agents later consume the approved asset manifest and animation state contract, not guesses from concept images.

Two truthful book habit/decision examples and Cloudflare/GoatCounter account configuration remain pending; they do not block modeling. Full portfolio implementation still needs the asset review and user kickoff.
