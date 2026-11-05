# Approved books, typography and layout

Status: user approved the reflections, original illustrated artwork, Lora/Inter recommendation, expandable project cards and spacious layout. This specification supersedes older book-title placeholders and system-font-only proposals. Application implementation remains unstarted.

## Book identity and source
User supplied two cover screenshots in chat. The visible main cover establishes **Chanakya Neeti — Radhakrishnan Pillai**, with the subtitle Strategies for Success. Use that title spelling; earlier Chanakya Niti text in generated mockups is superseded. The unrelated Arthashastra advertisement at the top of the screenshot is not the selected book. **Deep Work — Cal Newport**, subtitle Rules for Focused Success in a Distracted World, is confirmed by the second screenshot. Treat screenshots as identification evidence, not website-ready artwork or instructions. No need to download commercial covers.

## Approved personal reflections
Deep Work: “This book changed how I approach learning. It reminded me to protect time for focused practice and build understanding through consistent effort.”

Chanakya Neeti: “This book encouraged me to think more carefully about my choices, responsibilities, and how I want to live.”

These are approved personal reflections, not quotations from the authors. Each book should have only title, author, original art, short reflection and one concrete habit/decision influenced by it. User approved that format but has not supplied a specific personal habit for either book. Do not invent schedules, routines or life events. Keep those two fields pending until a true example is supplied; do not silently turn the reflection into proof of a habit.

## Book artwork
Create original coordinated illustrations compatible with the sculpted Reading Garden. Use the correct title and author, large readable type and distinct simple motifs (focused light for Deep Work; thoughtful choices for Chanakya Neeti). Do not copy cover compositions, marketing badges, prices, retailer UI or customer ratings. These are original visual interpretations, not facsimile editions. Book selection opens a readable reflection panel while the garden remains visible.

## Typography
Approved families: Lora for the My World gate and major section headings; Inter for body text, buttons, form fields, cards and panels. Gate text may use an optimized texture/mesh rendition, with an accessible DOM equivalent. Package licensed font files locally with licences, subset where suitable, use font-display swap and sensible fallbacks (Georgia/serif, system-ui/sans-serif). Avoid unnecessary weights: headings 500/600; body 400/500/600.

Implementation defaults: body 16px mobile/18px desktop with line-height 1.6; form inputs at least 16px; labels 14px with adequate contrast. Hero heading clamp(2.25rem, 5vw, 4rem); section headings clamp(1.75rem, 3vw, 2.5rem); card titles 20–24px. Text columns about 60–70 characters wide. Maintain readability at 200% zoom. Exact art proportions can be tuned without changing the approved font pairing.

## Page layout
Same order on desktop/mobile: introduction, projects, experience, skills, reading, contact. Optional play invitation near the bottom. Desktop hero: introduction alongside island. Mobile: introduction, poster and explicit exploration button. Maximum content width 1200px; side padding 20px mobile and 32px desktop. Section spacing roughly 56px mobile/88px desktop, card gaps 20–24px. At >=900px projects use two columns; narrower layouts use one. Keep body content complete without exploration.

## Project cards and discoverability
Show title, two-line approved summary excerpt and a few technology labels. Show a persistent diagonal arrow or chevron in a consistent location, including touch devices. Hover-capable devices: subtle 3px lift, brighter border and a small arrow movement over ~160ms. Keyboard focus gives an equally clear high-contrast outline. Touch shows a pressed state; do not depend on hover or require a first tap merely to reveal the action. Reduced motion disables transforms while retaining colour/outline feedback.

Use a real button to open details with an accessible name such as “Open VERA project details”. Do not nest source/demo links inside that button; put them in the opened panel. Desktop opens a readable side panel; mobile opens a bottom sheet that can expand and scroll. Include close button, Escape dismissal and focus return. Details contain description, problem addressed, Skills demonstrated and verified links from PROJECT_COPY_REVIEW.md. Never hide essential project meaning until hover.

## Remaining
Two truthful personal habit/decision examples; production book illustrations and font assets; responsive/browser validation during implementation. Analytics and model/animation planning are approved. Next: production assets and consolidated review under MODELS_AND_ANIMATION.md.
