# Validation and release

## Browser support contract
Target maintained modern browsers: Chrome, Edge, Brave and Firefox on desktop; Safari on macOS/iOS; Chrome, Brave, Edge and Firefox on Android where available. Browser engines and resource support determine the 3D path, not branding. Old browsers or devices without usable WebGL receive the complete readable portfolio. No claim of identical rendering or universal 3D support on every browser ever released.

Automation: Chromium, Firefox and WebKit responsive checks. These do not replace actual branded Brave/Edge or real iOS/Android checks. Record OS, browser/version, device, viewport, result and evidence. Include Brave Shields and blocked analytics/audio. User's usual Brave/Chrome browsers are useful smoke tests, not the whole support list.

## Required scenarios
- At 360/390/768/1366/1440 CSS pixel widths: no clipping, horizontal overflow or inaccessible controls; rotate mobile and test safe areas.
- Normal scroll path with canvas disabled, JS scene load failure, unsupported WebGL and context loss; retry works.
- Keyboard walk/drag camera/tap destination; mobile thumbstick plus simultaneous swipe; cancellation on lost capture, blur, panel open, hidden tab and exit.
- Repeated destination changes and manual interruption: no teleport, collision clipping or trapped avatar. Home view always recoverable.
- Panel focus/close/Escape; links and forms work; key controls do not hijack typing; reduced motion and keyboard-only navigation.
- Mute/unmute, failed audio permission, footsteps only during movement, ambient zones and background suspension.
- EmailJS success/error/loading with controlled tests; no unintended real email sends. Mailto fallback and resume download verified.
- Private entries expose neither source URLs nor private data. Project proposals validate exact allowlist and preserve manual fields.
- Analytics events distinguish visits from repeated clicks, omit sensitive fields and fail without affecting experience.

## Performance and visual evidence
Targets, not measured claims: near 60fps on ordinary modern desktop; sustained >=30fps on the selected midrange mobile test device after quality adaptation; LCP <=2.5s and CLS <=0.1 for the standard entry under recorded test conditions. Record device/network/browser and profiler metrics; size simulation is not real device performance evidence. Capture initial page, active world, each panel, mobile controls, fallback and reduced motion; capture walking/turning/destination transitions as motion evidence. Use skill renderer inspection and visual scorecard appropriately for a portfolio.

## Release gates
npm run lint; npm run build; agreed browser/interaction checks; no critical accessibility/content defects; all assets licensed; valid share metadata and Pages base paths; final content and visuals accepted. Existing deploy.yml automatically runs on qualifying main pushes and also offers unrestricted workflow_dispatch. During implementation add a main-ref guard to production jobs; until then do not dispatch the branch workflow. Branch validation must upload preview/build artifacts only. Do not merge until the user authorizes release. Archive evidence under artifacts with a manifest and final report.
