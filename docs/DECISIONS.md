# Decisions

## Confirmed by user
- Display name: Abhilash Giri.
- Cloud Station; sapphire/amber; soft sculpted buildings; clear mostly solid dark panels with subtle glass; restrained bento project grid.
- Instant introduction and island poster; desktop 3D loads when suitable, mobile entry is optional; all information scrollable.
- Free character movement and camera inspection, plus clickable destinations. Desktop keyboard walking and drag-to-look; mobile thumbstick walking and swipe-to-look. Bounds and reset view required.
- Click causes camera movement and avatar travel; content opens promptly; motion starts at the actual current position.
- Fictional hoodie/jeans/Jordan style sneaker character, no backpack or glasses. Same design as cursor companion; native cursor remains usable.
- No spending. Do not treat a ChatGPT subscription as external asset API credits.
- Professional focus: backend, AWS cloud, system integration and AI-assisted application development. No unsupported numerical claims.
- Existing experience and social/email links retained. Email and existing contact form retained. Resume PDF will be provided.
- Existing projects retained; newer projects reviewed from actual source where accessible.
- Chitragupta and BountyDesk: public descriptions, In progress labels, no repo links. Mention AI-assisted development without exposing private details.
- Books: Deep Work by Cal Newport; Chanakya Niti (title confirmed; author/edition confirmation still needed).
- Project update workflow prepares a change for review, with deliberate publication after acceptance.
- Footsteps and gentle environmental audio desired. Plan default muted with visible toggle and explicit audio activation.
- Existing GitHub Pages address retained.
- Aggregate visits and exploration-mode analytics desired, without identifying people.
- Broad browser support, including mobile Brave and Edge. User's Chrome/Brave usage is a test example, not a support restriction.

## Engineering defaults proposed for the implementation plan
- Third-person perspective, walkable island bounds, simple colliders and path graph; no physics engine unless evidence requires it.
- Sound off initially; pause on hidden tab. Cursor companion only for fine-pointer devices, disabled for reduced motion.
- Warm neutral typography, dark sapphire surfaces and amber focus/active states; exact tokens are proposed in DESIGN.md.
- Use CSS/DOM for readable panels and labels; a 3D-looking panel is not a reason to render body text into the canvas.

## Remaining before build kickoff
1. Recover approved concept image or approve replacement desktop/mobile mockups. Current agent has only written descriptions of the old image.
2. Supply resume PDF. Do not display a dead download button before the file exists.
3. Confirm Chanakya Niti author/edition from the actual book before printing attribution.
4. Complete source-based review of newer public projects and select featured ordering/screenshots.
5. Select a free analytics service and confirm its account/site configuration, event support and current limits. No service is provisioned or selected yet.
6. Approve the visual asset sheet (avatar, landmarks, controls/panels) and frozen build brief.

BountyDesk README currently describes V1 as complete and frozen. Preserve the user's requested In progress portfolio label as an editorial decision; do not claim the repository has no working version.

## Latest checkpoint — 2026-11-05 design revision and backup
Read [design review checkpoint](design/README.md) before acting on earlier design sections. User requested regular-fit jeans, skills/contact destinations and a dog, and exploration of waterfall/fun-zone ideas. Six-destination imagery, page order, dog fetch and the name Abhilash’s Skygarden are proposals awaiting next-request feedback, not approved implementation changes. Resume PDF is now supplied and preserved in docs/content; review still pending. Application implementation has not started.
