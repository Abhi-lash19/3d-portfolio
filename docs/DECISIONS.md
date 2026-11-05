# Decisions

Current authority: [current decisions](CURRENT_DECISIONS.md) and [approved project content](PROJECT_COPY_REVIEW.md). These supersede older unresolved-name, project-copy and source-review notes below.

## Confirmed by user
- Display name: Abhilash Giri.
- My World on the entrance gate; sapphire/amber; soft sculpted buildings; clear mostly solid dark panels with subtle glass; restrained bento project grid.
- Instant introduction and island poster; desktop 3D loads when suitable, mobile entry is optional; all information scrollable.
- Free character movement and camera inspection, plus clickable destinations. Desktop keyboard walking and drag-to-look; mobile thumbstick walking and swipe-to-look. Bounds and reset view required.
- Click causes camera movement and avatar travel; content opens promptly; motion starts at the actual current position.
- Fictional hoodie/jeans/Jordan style sneaker character, no backpack or glasses. Same design as cursor companion; native cursor remains usable.
- No spending. Do not treat a ChatGPT subscription as external asset API credits.
- Professional focus: backend, AWS cloud, system integration and AI-assisted application development. No unsupported numerical claims.
- Existing experience and social/email links retained. Email and existing contact form retained. Resume PDF is preserved at docs/content/Abhilash_Resume.pdf.
- Existing projects retained; newer projects reviewed from actual source where accessible.
- Chitragupta and BountyDesk: public descriptions, In progress labels, no repo links. Mention AI-assisted development without exposing private details.
- Books: Deep Work by Cal Newport; Chanakya Neeti by Radhakrishnan Pillai; original illustrated artwork approved.
- Project update workflow prepares a change for review, with deliberate publication after acceptance.
- Footsteps and gentle environmental audio desired. Plan default muted with visible toggle and explicit audio activation.
- Superseded: hosting is Cloudflare Pages Free with a new public address; see ANALYTICS_PLANNING.md.
- Aggregate visits and exploration-mode analytics desired, without identifying people.
- Broad browser support, including mobile Brave and Edge. User's Chrome/Brave usage is a test example, not a support restriction.

## Engineering defaults proposed for the implementation plan
- Third-person perspective, walkable island bounds, simple colliders and path graph; no physics engine unless evidence requires it.
- Sound off initially; pause on hidden tab. Cursor companion only for fine-pointer devices, disabled for reduced motion.
- Warm neutral typography, dark sapphire surfaces and amber focus/active states; exact tokens are proposed in DESIGN.md.
- Use CSS/DOM for readable panels and labels; a 3D-looking panel is not a reason to render body text into the canvas.

## Remaining before build kickoff
1. Produce models, animation, audio and imagery under approved MODELS_AND_ANIMATION.md, then obtain consolidated asset approval. User reference phone is Google Pixel 9. Human walking only; dog may run/hop; Pet action without brush; exterior-only destinations.
2. Configure Cloudflare Pages and GoatCounter accounts, exact address and private aggregate counter endpoint.
3. Produce licensed production imagery and verify demos/links. Resume and approved project text are already available.
4. Obtain two truthful habit/decision examples for the books; identities and reflection wording are confirmed.
5. Consolidate final build brief and obtain user's implementation kickoff.

BountyDesk README currently describes V1 as complete and frozen. Preserve the user's requested In progress portfolio label as an editorial decision; do not claim the repository has no working version.


Current hosting/analytics authority: [approved plan](ANALYTICS_PLANNING.md). Cloudflare Pages Free replaces the prior GitHub Pages hosting decision; GoatCounter is selected. Next: production assets and consolidated review per [approved plan](MODELS_AND_ANIMATION.md).
