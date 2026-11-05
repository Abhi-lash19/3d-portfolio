# New-chat handoff — My World asset production

Checkpoint: 2026-11-05. Branch: portfolio-v2. Repository: https://github.com/Abhi-lash19/3d-portfolio. Base application revision: ddd06472b9fce28967d907024d84f5cd15976220. Prior planning backup: ba4ca314ee93bb1a719e66f557c9f4a03e668cc4. The commit containing this file records the model/animation approvals; use Git history for its exact hash.

## Start here
Read AGENTS.md, docs/CURRENT_DECISIONS.md, docs/MODELS_AND_ANIMATION.md, docs/PROJECT_COPY_REVIEW.md, docs/BOOKS_AND_LAYOUT.md, docs/ANALYTICS_PLANNING.md, docs/ASSETS.md and docs/design/README.md. Inspect the actual saved images, not only their filenames. Check branch/status before editing. Do not restart the design questionnaire.

## Current scope
All nine model/animation recommendations were approved. Next chat should create production models, animation, illustrations and audio, with an isolated preview scene and one consolidated review. User explicitly wants these assets created and approved BEFORE the main portfolio implementation. The documentation checkpoint created no models or application features. Asset approval and explicit application kickoff remain future steps. Do not merge main, publish, alter repository visibility or buy services.

## Approved model/animation decisions
- Custom softly sculpted Blender models and skeletal animation; Three.js browser interactions/environment motion. Free licensed assets may supplement custom work. Zero budget; generator skills do not provide paid API credits.
- Sapphire/amber miniature floating world, fixed blue-hour lighting, warm lanterns. Simplify fur/vegetation detail for performance while retaining approved character and silhouette.
- My World name on physical entrance gate; professional introduction uses Abhilash Giri.
- Six exterior destinations: Project Launchpad, Experience Observatory, Skills Cascade, Reading Garden, Contact Cabin and Play Meadow. No walkable interiors; readable panels open promptly.
- Elevated bounded third-person camera, modest zoom, reset; keyboard walk/drag-look desktop, thumbstick walk/swipe-look mobile. Destination focus never delays information. Optional mobile exploration and complete scrolling portfolio.
- Fictional male avatar: navy hoodie, regular-fit straight-leg blue jeans, sneakers, no backpack/glasses. Idle/walk/turn/stop, crouch/reach to pet, throw, sit/read and recover. No human running/jumping.
- Golden dog with amber collar: follow/idle/sit, expressive head lean/tilt and tail wag, fetch, occasional sound and bounded butterfly play. Dog can run and make small playful hops. Pet is a simple accessible action, not a draggable brush.
- Fetch: choose reachable ground in any direction within meadow bounds, preview arc/ring, Throw; keyboard alternative. One ball/throw until return. Avoid water/buildings/edges; no score.
- Continuous waterfall and sparse descending skill tiles; click opens grouped skills only. No skill-to-project filtering.
- Gentle foliage/cloud/butterfly motion, restrained landmark lighting/telescope movement. Stop decorative loops/camera glides for reduced motion.
- Sound starts muted: quiet garden/water ambience, footsteps, dog reactions, subtle effects; no music/narration. Download after opt-in, pause hidden tab, cooldown for barks.
- Adaptive decorative quality preserves content/interactions. Google Pixel 9 is user's reference phone. Broad browser support remains required. Indicative 60fps desktop/30fps representative phone targets are not measured results; emulation is not real-device evidence.

## Production and review deliverables
Follow the detailed asset and animation tables in MODELS_AND_ANIMATION.md. Preserve editable sources/reproducible scripts, GLB models and clips, illustrations, audio, licence inventory and export manifest. Produce avatar/dog front/side/back views, all-six-destination composition, original books, desktop/mobile framing and actual 3D motion clips (walking, petting, fetch, waterfall, plus other produced behaviours). Include sound samples and actual file sizes. Generated stills are not proof of animation. Present one consolidated review before application build; fix routine asset defects without reopening settled decisions. Final posters/share art should derive from the produced world and be refreshed if integration changes appearance. Check Git LFS needs before committing large binaries and verify remote objects if used.

## Saved reference map
All under docs/design/:
- world-v3-gate-reference.png: world/gate; change Sky Garden text to My World.
- animation-v3-storyboard.png: dog pet/fetch, butterflies and skills waterfall.
- contact-skills-v4-reference.png: cabin icons and grouped skills without related-project filter.
- fetch-v4-controls-reference.png: desktop/mobile bounded aiming controls.
- mobile-v3-detail-reference.png: readable project/experience details; related-project action in old Skills art is superseded.
- destinations-v2-proposal.png: destination panel style.
- mobile-v2-corrected-proposal.png: corrected mobile controls.
There are ten preserved generated images including historical alternatives; docs/design/README.md identifies them. Old names, book spelling and placeholder copy inside images are not authoritative. checksums.json records preserved reference media and resume hashes.

## Other approved content and services to preserve
- Scroll order: intro, projects, experience, skills, reading, contact; optional play invitation low down. Lora headings, Inter body; spacious layout, two project columns on wide screens, one on mobile; keyboard/touch discoverability.
- Featured projects: VERA, Renzo, ScribeAI, GitInsight Engine, AWS Deployment Automation, CoreGPT. Use exact approved descriptions/problem/Skills demonstrated in PROJECT_COPY_REVIEW.md. Selected files were inspected across 14 repos, not exhaustively audited or live-tested. Private Chitragupta/BountyDesk: sanitized descriptions, In progress, no repo links. Preserve internal technical caveats; no fabricated capabilities or metrics.
- Books: Deep Work by Cal Newport and Chanakya Neeti by Radhakrishnan Pillai. Original coordinated illustrations, not commercial cover photos. Reflections approved in BOOKS_AND_LAYOUT.md; two specific real habit/decision examples remain missing. Do not invent them.
- Resume: docs/content/Abhilash_Resume.pdf. Existing experience/social/email retained; Instagram Beyond work is planned and its exact URL should be checked before implementation. Contact uses icons AND labels plus existing form.
- Cloudflare Pages Free with new public address; source intended private later. Keep current public site available until accepted migration. No setup/deployment/visibility change performed.
- GoatCounter: private dashboard/provider DB, standard aggregate breakdowns retained privately. Events: visits, active exploration, project opens, resume-link activations, contact-link activations. Tiny public footer Visits total only; not unique people. Use server-held credentials/aggregate-only cached endpoint; route/permissions need verification. No tokens or analytics records in Git. Read ANALYTICS_PLANNING.md for actual contract.

## Skills and execution
Pinned nine Three.js skills are under .agents/skills; source revision 8286774b22a2566bf894dbc825825c16921866af. Read director and affected graphics/model/audio skills and their required references before production. Follow their quality checks while preserving zero-budget and approved scope. Blender was available in the previous environment; verify current tooling. Do not replace the React app with a skill starter template. No need to ask again about settled product choices. Routine rig names, dimensions, timing and optimization are implementation choices to document, not a new questionnaire.

## Pending items and truthfulness
Production assets and review evidence do not exist yet. Asset approval, final build kickoff, two real book habits, Cloudflare/GoatCounter setup, exact address/identifiers, private counter validation, final link checks and actual browser/device measurements remain pending. Book habits/accounts do not block model creation. Preserve sources and progress in Git so reconnection does not depend on chat memory. Report precisely which commits are pushed and which checks were actually run.
