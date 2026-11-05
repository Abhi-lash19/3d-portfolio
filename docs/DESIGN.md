# Design and interaction specification

## Visual knowledge and evidence
Written direction is confirmed. The original generated image is absent; its exact geometry, proportions and layout have not been inspected in this environment. The specification below translates the written direction into a concrete proposed composition, subject to visual approval before implementation.

## Page composition
1. Compact header: Abhilash Giri, Work, Experience, Ideas, Contact, resume when present.
2. Hero: name and short backend/cloud introduction beside a large floating island on desktop. Amber primary work action, secondary exploration action. On mobile stack intro, island poster, exploration action and scroll cue.
3. Selected work: 4–6 featured cards; all existing and approved new projects available below or via All projects. Each has purpose, contribution, technology and valid actions.
4. Experience: accessible chronological timeline, preserving verified content.
5. Ideas that shaped me: two book cards with short personal reflections.
6. Contact: email, form and existing social links; clean footer.

## Island layout
Proposed readable triangle: arrival plaza at front centre; project launchpad left; domed experience observatory back/right; reading garden right/front. Join all landmarks with visible paths. Use restrained clouds, planted edges, books, a telescope and small infrastructure motifs to make each destination distinct. Contact remains in the DOM navigation; no fourth building is required. No detail should hide paths or the avatar at normal zoom.

Start camera at an elevated three-quarter view encompassing all three landmarks. Keep zoom and pitch bounded so the visitor cannot see underneath the island or lose it. Offer Home view. Aim toward the active destination without teleporting the avatar. Camera may finish before walking; the path and avatar remain visible. Opening another destination cancels the previous route and computes a new path from the current position. Manual movement cancels auto-walk.

## Proposed visual tokens
Background #071426; surface #10243D; raised surface #183550; warm text #F6F1E7; muted text #B7C7D8; accent #F5B84B. Validate contrast in rendered contexts. Soft edges, matte materials, warm directional light and subtle ambient fill. No heavy bloom, distortion or layered blur. Local/system sans-serif initially; if selecting a font, package its licence and avoid blocking external requests.

Avatar: friendly fictional proportions; hoodie, jeans, high-top sneakers, no bag/glasses. Prepare front/side/back appearance and idle/walk/turn transitions. Use original sneaker styling; a logo is not required. Small cursor companion shares silhouette and colours; does not intercept clicks or obscure form fields.

## Input and panels
Desktop: WASD/arrows while scene is focused; pointer drag rotates camera, wheel zooms within limits. Do not intercept typing or page scrolling outside the scene. Click a destination selects it and opens its panel.
Mobile: explicit Explore mode with left thumbstick and right swipe-look area, destination taps, Home view and Exit exploration. Scope touch-action restrictions to the active scene; restore ordinary scrolling on exit. Clear movement on pointer cancel, blur, orientation change and hidden tab.
Desktop panel sits beside the scene; mobile uses a large accessible sheet. Opening a sheet pauses free movement and routes focus into the panel; avatar auto-walk can finish in the background. Escape/close returns focus to the trigger. Offer equivalent destination buttons for keyboard and screen reader access.

## States
Poster → loading → exploring; failure/context loss → poster with retry; exiting → regular page. Panels support closed/open/transitioning. Audio supports muted/enabled/unavailable. Contact supports idle/submitting/success/error and an email fallback. Reduced motion skips automatic camera travel and disables cursor following; visitors can still use explicit controls. Fullscreen is optional and never required.
