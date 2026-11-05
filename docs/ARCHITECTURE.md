# Architecture

Keep React 18, Vite and React Three Fiber as the baseline. Audit the existing dependency combination before changing versions; do not assume skill examples targeting newer libraries apply unchanged. Keep the normal portfolio functional independently of scene initialization.

## Planned modules and ownership
- src/content/: curated projects, experience, books, profile; one source for page and panels.
- src/components/sections/: semantic DOM hero/work/experience/books/contact.
- src/world/: Canvas, island/landmarks, avatar, input, camera, collision/path routing, quality and audio.
- src/components/exploration/: DOM controls, destination buttons, panel/sheet and fallback.
- src/utils/analytics.js: optional aggregate event adapter; never block navigation on a request.
- scripts/: project metadata proposal generation and schema/private-link validation.

## Shared interface to freeze before delegation
DestinationId = projects | experience | reading.
App state: sceneStatus (poster/loading/ready/failed), explorationEnabled, activeDestination|null, audioEnabled, reducedMotion, qualityTier. DOM content does not depend on sceneStatus.
Intents: enterWorld, exitWorld, selectDestination(id), closePanel, resetView, setAudio(enabled), move(x,z), look(dx,dy). Continuous movement/look belongs in refs or the simulation, not React state every frame.
World emits ready, failed(reason), destinationReached(id). Selection opens DOM content immediately; arrival is visual feedback, not permission to read. Audio listens to locomotion/zone events.

Use a stable walkable ground boundary and simple obstacle colliders. Auto-walk follows a small explicit waypoint graph connecting public paths. Frame time is capped; movement uses delta time and collision substeps if needed. Never let a resumed hidden tab jump the avatar across the island. Camera collision/limits prevent clipping. No need for gravity, jumping, rigid bodies or external physics in the planned scope.

## Loading, quality and failure
Lazy-load the 3D module. Mobile starts with a poster; desktop attempts loading after core content is visible when WebGL/resources permit. Respect reduced motion/data saving when available without depending on those APIs. Use measured runtime performance to lower DPR/effects; no user-agent browser whitelist. Start conservative on touch devices. Pause canvas/audio when hidden or offscreen. Dispose resources on teardown; handle context loss and asset failure with poster, retry and readable content.

## Contact and analytics
Retain EmailJS and existing environment variable names. Ensure loading/errors prevent accidental duplicate sends and offer email fallback. Do not print config values in docs.
Analytics requires service selection before build freeze. Define page_view once per navigation, explore_enter once per visit, destination_open with fixed ID and standard_content_view. Scrolling and 3D may overlap: derive 3D-engaged visits vs standard-only visits per service session semantics. No names, contact text, private URLs, fingerprinting or user IDs. Counts are approximate because blockers and privacy settings can suppress events. Do not create a homemade public counting endpoint without rate limits and an approved host.

## Project update automation
Maintain an explicit public repo allowlist and a curated content overlay. A manual workflow reads repository metadata without executing source repos, generates a deterministic proposal, validates schema/links/private exclusions and opens an update PR. Preserve manually edited descriptions and images. Private project descriptions stay manually curated. Review/merge content updates; a separate deliberate publish action deploys accepted content. No secret in the browser bundle; use least-privilege workflow credentials. Never make unfinished public repos automatically featured.

## Latest checkpoint — 2026-11-05 design revision and backup
Read [design review checkpoint](design/README.md) before acting on earlier design sections. User requested regular-fit jeans, skills/contact destinations and a dog, and exploration of waterfall/fun-zone ideas. Six-destination imagery, page order, dog fetch and the name Abhilash’s Skygarden are proposals awaiting next-request feedback, not approved implementation changes. Resume PDF is now supplied and preserved in docs/content; review still pending. Application implementation has not started.
