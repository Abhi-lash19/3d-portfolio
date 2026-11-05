# My World — Abhilash Giri's portfolio

## Current branch status — start here

**Working branch: `portfolio-v2`. Current phase: approved planning → production asset creation.**

The repository contains the existing React portfolio and the approved specification for its My World redesign. The new world, character models and animations have **not yet been produced**. Saved generated images are concept references, not screenshots of a working redesign. Running the current application shows the existing portfolio.

The next task is to create the production models, animations, illustrations and audio, plus an isolated asset preview scene. Present one consolidated asset review before starting the main application implementation. User approval of the actual assets and explicit application-build kickoff are still required.

Keep work on `portfolio-v2`. Preserve `main` and the current public portfolio until the completed replacement is approved. Asset work does not authorize merging, deployment, repository-visibility changes or paid services.

## Reading order for the next agent

1. [Agent instructions](AGENTS.md) — scope, required skills and execution rules.
2. [New-chat handoff](docs/HANDOFF_ASSET_PRODUCTION.md) — complete context and reference map.
3. [Current decisions](docs/CURRENT_DECISIONS.md) — authoritative approval summary.
4. [Models and animation](docs/MODELS_AND_ANIMATION.md) — asset inventory, motion states, controls, production method and review requirements.
5. [Approved project copy](docs/PROJECT_COPY_REVIEW.md), [books and layout](docs/BOOKS_AND_LAYOUT.md), and [hosting and analytics](docs/ANALYTICS_PLANNING.md) — preserve these decisions.
6. [Asset requirements](docs/ASSETS.md), [design references](docs/design/README.md), and [required skills](docs/SKILLS.md) — inspect the actual images and read the relevant pinned skills.
7. [Implementation plan](docs/IMPLEMENTATION_PLAN.md), [validation](docs/VALIDATION.md), and [progress handoff](artifacts/game-progress.md) — integration sequence and evidence requirements.

The [documentation index](docs/README.md) links the remaining specifications. Current approvals supersede historical proposal text and labels inside old images. Do not repeat settled design questions or infer completed features from planning documents. Update progress and preserve editable sources, exports, licences and review evidence as work advances.

## Approved direction at a glance

- **My World** on the entrance gate; Abhilash Giri in the professional introduction.
- Sapphire/amber sculpted floating island, fixed blue-hour atmosphere and warm lanterns.
- Six exterior destinations: Project Launchpad, Experience Observatory, Skills Cascade, Reading Garden, Contact Cabin and Play Meadow. Readable content panels; no walkable interiors.
- Blender-authored models/animations, Three.js browser interactions, suitable freely licensed assets where useful. Zero budget; external generator credits are not included with installed skills.
- Fictional avatar in navy hoodie, regular-fit straight-leg jeans and sneakers. Walking only; no human running/jumping.
- Golden dog with amber collar, following, simple Pet action, fetch and butterfly play. Dog running and small playful hops allowed; no draggable brush.
- Bounded elevated camera; desktop keyboard walking/drag-look and mobile thumbstick walking/swipe-look. Mobile exploration is optional; complete content remains scrollable.
- Continuous decorative skills waterfall, grouped skills panel, bounded fetch controls and reduced-motion support.
- Muted-by-default ambience, footsteps and dog/interaction sounds; no music or narration.
- Adaptive visual detail; user's reference phone is **Google Pixel 9**. Performance goals require measurement, and broad browser support remains required.

Consult the detailed specifications for exact behaviour; this summary does not replace them.

## Required next deliverable

Produce the asset collection and present a consolidated review containing character front/side/back views, all-six-destination composition, original book artwork, desktop/mobile framing, sound samples and **actual 3D motion previews**. Check walking, petting alignment, fetch/ball return and waterfall loops. Keep editable Blender sources or reproducible scripts, GLB exports, image/audio sources, licence records and an asset manifest. Generated stills alone are not animation evidence.

Two truthful personal book habit examples and Cloudflare/GoatCounter account configuration remain pending. These do not block modeling. Hosting and analytics choices are approved; their integration and deployment have not been performed.

## Existing application

The current baseline uses React, Vite, Three.js, React Three Fiber, Drei, Tailwind CSS and Framer Motion. Existing code is under `src/`; static assets are also under `public/`. Preserve this application while preparing the redesign assets. Do not replace it with a skill starter template.

Commands defined in `package.json`:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

These commands do not establish that tests or performance checks have passed. Record actual results when run. The `private` flag in `package.json` prevents npm publication; it does not establish GitHub repository visibility.

The existing portfolio's original design inspiration was [this Three.js portfolio tutorial](https://www.youtube.com/watch?v=0fYi8SGA20k). The approved My World redesign references are preserved separately under `docs/design/`.
