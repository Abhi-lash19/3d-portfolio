# Content inventory

## Verified baseline
Source: src/constants/index.js at base commit ddd06472b9fce28967d907024d84f5cd15976220. Change visible owner name to Abhilash Giri during implementation. Retain contactEmail exactly from that source, and retain all current GitHub, LinkedIn, Instagram and mailto destinations. Use the actual constants as authoritative for URL spelling.

Experience: AbsoluteLabs Senior Software Developer Apr 2025–present; AbsoluteLabs Software Developer Oct 2023–Mar 2025; Arcesium SRE Intern Jan–May 2023; BEL Software Development Intern May–Aug 2022. Preserve source descriptions and existing claims, adding none without evidence.

Existing projects: 3D Portfolio, ScribeAI, Express TypeScript Backend, MonitorPro, XO Game, infra-deploy-aws, Jenkins EKS Automation, Python FastAPI AWS. Existing project imagery is in src/assets. Do not discard existing entries merely because newer work is featured.

Newer candidates: Vera, Git Insight, Core GPT and Renzo. Repository names, exact capabilities, images, valid demos and featured order need a source/code audit before publication. User says Vera works even if its README looks unfinished; report user testimony separately from code inspection or execution evidence.

## Private project public copy
Read access to both private repositories confirmed through GitHub on 2026-11-05. Only READMEs were inspected in this pass; no code execution or functional verification is claimed. Do not copy private implementation documents or datasets into this public repository.

Chitragupta — In progress: “A personal knowledge and research companion that organizes saved ideas and repositories, supports learning, and connects answers to their sources. Built with AI-assisted development.” Evidence: private README blob 0b453518e73eb7c0d55fbcb2a0934423ee6c1922. Keep this as a high-level product description, not a claim that all planned workflows are production-ready.

BountyDesk — In progress (user-selected portfolio status): “A tool for discovering and evaluating software development bounty opportunities, comparing evidence and shortlisting promising work for human review. Built with AI-assisted development.” Evidence: private README blob c543e6b01b911d0e9e94927a7317c8d049c3b3e0. README reports a completed V1 with further work; no repository or demo link in the portfolio.

## Books and introduction drafts
Deep Work — Cal Newport. Draft reflection: “It changed how I think about focused learning and making deliberate time to improve my craft.”
Chanakya Niti — edition/author pending. Draft reflection: “It encouraged me to think more carefully about my choices, responsibilities and how I want to live.” Avoid attributed quotations unless verified.
Introduction draft: “I build backend systems, cloud integrations and useful tools—with AWS, thoughtful engineering and AI-assisted development.” Final wording can be edited without inventing achievements.

## Data contract
Project: id, title, summary, contribution, technologies[], status, featuredOrder|null, image{src,alt,width,height}, repositoryUrl|null, demoUrl|null, visibility, evidenceNotes (build-time only). Private entries must have null repositoryUrl. No dead action placeholders. Experience: id, role, company, dates, bullets[], icon. Book: id,title,author|null,reflection,art. Use stable IDs in DOM anchors, scene destinations and analytics.
