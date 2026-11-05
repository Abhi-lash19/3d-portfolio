# Approved hosting and analytics

## Approval and current status
User approved Cloudflare Pages Free, a new public website address, GoatCounter hosted analytics, and a small public footer counter labelled **Visits**. Other measurements remain private. User revised the earlier request to disable optional breakdowns: retain standard aggregate analytics breakdowns privately. No accounts, integration, visibility change or deployment have been performed. Next discussion: models and animation.

## Hosting
Source repository is intended to become private; public website will be hosted on Cloudflare Pages Free, normally at a chosen available pages.dev address. Exact address and account setup remain pending. This supersedes earlier plans to retain the GitHub Pages address. GitHub Pages publishing from private repos requires an eligible paid GitHub plan; Cloudflare permits private GitHub sources.

Setup walkthrough: create Cloudflare account, connect only the intended GitHub repository, select main as production branch, use npm run build with dist output, and configure necessary environment values. Confirm current build/runtime requirements during setup. New root hosting requires checking Vite base paths, canonical URLs, share metadata, routes and assets. Do not expose docs, source maps with private content, credentials or internal evidence in the deployed output. Browser-delivered JavaScript and assets remain publicly downloadable even when source Git is private.

Preserve the current public portfolio until the replacement is accepted. Do not make the existing GitHub Pages source private before migration readiness, because that may take the current site offline. Disable/replace the old deployment workflow at cutover. Preserve deliberate release control: configuring Git integration must not silently authorize production deployment on every content merge. Select a manual release process or disable automatic production deployment as appropriate during setup. Development branches do not publish production. Preview access must be explicitly configured and verified; private Git does not by itself make preview URLs private.

## Analytics and storage
Provider: GoatCounter hosted service, currently free for reasonable personal-site usage. Store measurements in its database; do not commit changing analytics records to Git or implement a local file database. Owner-only dashboard; optional exports for owner backup. No paid upgrade without approval. If service is blocked, unavailable or limited, the portfolio remains usable.

Retain standard aggregate browser/system, screen/device, location/language and referral breakdowns as available in provider settings, privately. This is the user's revised preference. It is not a request for personal identification, raw individual pageview histories, session replay, advertising trackers, form contents, email addresses or custom fingerprints. Leave optional individual-pageview history off unless separately requested. GoatCounter's built-in temporary session deduplication follows its documented behavior; do not describe counts as precise unique humans or promise zero processing of network metadata.

## Events and meaning
- Page visit: one canonical page visit signal on initial navigation. Do not count section scrolls or opening panels as new page visits.
- Active exploration: explicit entry on mobile, or first movement/destination interaction in desktop world. Auto-loading a canvas is not exploration. Deduplicate repeated engagement signals within the agreed browser visit scope; document actual provider/session behavior during integration.
- Project opening: fixed project ID, no arbitrary text or private repo URL.
- Resume: download-link activation, not proof the download completed.
- Contact: fixed channel (email, GitHub, LinkedIn, Instagram) link activation, not proof a message was sent.
Use explicit fixed event names/titles rather than reading arbitrary HTML or form data into analytics. Do not send sensitive query strings. Track neither local development nor previews in production totals.

Visits and events are different units. A visit may scroll and explore; do not obtain an alleged exact “standard-only visitors” number by subtracting event counts from page totals. Show visits and exploration counts separately unless a tested compatible session aggregation is implemented. Counts remain approximate because of blockers, repeat visits and provider deduplication.

## Public footer counter
Label exactly **Visits**. Small, readable, low-emphasis footer element, not a hero statistic. No animated score, leaderboard or prominent social proof. Only aggregate page visits, excluding action events; no unique-people claim.

Use a small Cloudflare server function that fetches only the necessary aggregate page-visit total with a server-held GoatCounter credential and returns an allowlisted response (count, optionally updatedAt). Cache the result (initial proposal: one hour), apply bounded requests/timeouts and never accept arbitrary upstream queries/paths from the browser. Never expose the token or the private analytics response. Keep dashboard private and native site-wide public-counter access disabled: its path-selectable API could expose other totals. Validate actual GoatCounter authenticated API route, permission and aggregation semantics before implementation; do not invent an endpoint. Handle failure with a cached valid count or unobtrusive unavailable state, never a fabricated zero. Use free service limits and avoid request amplification.

## Acceptance checks
Events arrive with correct fixed names; desktop auto-load alone is not active engagement; contact form fields are absent; dashboard remains private; public endpoint exposes only page-visit aggregate; no token in built assets; private metric paths cannot be queried through it; failed tracking does not block navigation; preview/local traffic excluded; cached footer count renders accessibly on mobile. Confirm collected breakdown settings and any required privacy/consent wording for the actual configuration.

## Official sources checked during planning
- [GitHub Pages plans](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Cloudflare Pages limits and private repository support](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [GoatCounter](https://www.goatcounter.com/)
- [GoatCounter free-use terms](https://www.goatcounter.com/help/terms)
- [Events](https://www.goatcounter.com/help/events)
- [Data collection and privacy](https://www.goatcounter.com/help/privacy)
- [Public counter behavior](https://www.goatcounter.com/help/visitor-counter)

Setup tasks are pending. Provider choices are approved; do not ask the user to choose them again. User will create accounts; request site identifiers via chat and secrets through appropriate secret configuration, never in public source.
