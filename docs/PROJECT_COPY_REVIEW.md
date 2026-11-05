# Approved project content and implementation contract

User approved the project descriptions and recommended featured selection in the conversation after the source review. Use “Skills demonstrated”, not “What I learned”. Read resume and inspected selected implementation files in 14 repositories at the revisions listed below. This is a source review, not an exhaustive audit or live execution test. No deployment, quality, performance, accuracy or adoption claims are inferred from source alone. Other repositories discovered in account search were not audited for this shortlist.

Approved featured order: VERA, Renzo, ScribeAI, GitInsight Engine, AWS deployment automation, CoreGPT. This balances AI applications, backend integrations, cloud delivery and learning fundamentals. Private projects retain the user's In progress editorial label and must have no public repository links.

## Internal evidence notes — not website copy
- ScribeAI's agent factory explicitly disables OpenAI and selects Groq. Existing portfolio OpenAI wording should change.
- CoreGPT train_step updates only the output layer. Do not call this complete end-to-end transformer training. No GitHub Actions/Docker files were found in its inspected tree to substantiate the resume's CI/CD sentence.
- MonitorPro: user requested no public discussion of mocked fields. Keep the approved neutral dashboard description. Internal source evidence still establishes that temperature and cache-size fields are mocked; do not expand public copy into claims that every value is measured.
- Python-FastApi-AWS is specifically a Wikipedia/search/text-processing API, not an unspecified business backend.
- Jenkins/EKS code establishes provisioning; do not promise a fully verified end-to-end application delivery pipeline.
- GitInsight's generateAllCards references a svgGenerator module absent from the inspected tree. This path needs a runtime/entrypoint check before promoting it as a working demo. No execution was performed here.
- My World redesign is planned, not an implemented capability of the existing portfolio.

## VERA

Placement: Featured

**Portfolio description:** A knowledge assistant that searches technical documents and source code to help answer engineering questions. It combines keyword and meaning-based search, then supplies relevant material to an AI model so answers can refer back to their sources.

**Problem addressed:** Finding useful information across scattered engineering material.

**Skills demonstrated:** Python; document ingestion; FAISS/BM25 hybrid search; retrieval-augmented generation; answer orchestration.

Source revision: c5e84b03774559b4844372d14b4a753bce5623de

Inspected files:
- `retrieval/fusion/hybrid_retriever.py`
- `orchestration/orchestrator.py`
- `ingestion/main.py`

## Renzo

Placement: Featured

**Portfolio description:** A job-matching backend that gathers vacancies, removes duplicates and ranks them against a candidate’s profile. It shows matching and missing skills to help focus a job search.

**Problem addressed:** Sorting through job listings that may not match a candidate’s experience.

**Skills demonstrated:** Python; data pipelines; explainable weighted ranking; deduplication; skill-gap analysis.

Source revision: 6ef09814cb7c37b50a7075c1eed431c224660890

Inspected files:
- `pipeline/orchestrator.py`
- `pipeline/scorer.py`
- `intelligence/skill_gap.py`

## ScribeAI

Placement: Featured

**Portfolio description:** An AI writing assistant for drafting and improving content through a chat interface. Its backend processes chat events, generates replies with Groq and keeps conversation records while guarding against duplicate events and reply loops.

**Problem addressed:** Turning writing requests into an ongoing, organized conversation.

**Skills demonstrated:** TypeScript; Express; Groq integration; Stream Chat webhooks; persistence; rate limiting.

Source revision: 894e574d53aaa6d0f119f8f1546811fccbc9f1d1

Inspected files:
- `backend/src/agents/createAgent.ts`
- `backend/src/routes/streamWebhook.ts`
- `backend/src/agents/groq/prompts.ts`

## GitInsight_Engine

Placement: Featured

**Portfolio description:** A GitHub analytics engine that brings repository activity, language usage and contribution data together into reports and visual cards. It caches API responses and handles retries to reduce repeated requests.

**Problem addressed:** Understanding and presenting GitHub activity without manually collecting data from multiple endpoints.

**Skills demonstrated:** Node.js; API integration; aggregation; caching; retry logic; SVG generation.

Source revision: ba4b293b962c8193b24d52865003d11d6208084e

Inspected files:
- `packages/core/application/computeStats.js`
- `packages/core/clients/apiClient.js`
- `packages/core/generators/generateAllCards.js`

## infra-deploy-aws

Placement: Featured

**Portfolio description:** An infrastructure and deployment workflow that provisions an AWS EC2 server with Terraform, builds a Docker application image, pushes it to ECR and deploys it through GitHub Actions.

**Problem addressed:** Making infrastructure setup and application delivery repeatable.

**Skills demonstrated:** Terraform; AWS EC2/ECR; Docker; GitHub Actions; infrastructure as code.

Source revision: e9f79e4235fc1ca7177c134a8b0dc31d43b9aaa9

Inspected files:
- `terraform/main.tf`
- `.github/workflows/deploy.yml`

## CoreGPT

Placement: Featured

**Portfolio description:** An educational GPT-style model built in Python to explore tokenization, causal attention and text generation. It includes a simplified training loop that updates the output layer.

**Problem addressed:** Understanding the building blocks behind language models through a small inspectable implementation.

**Skills demonstrated:** Python; transformer fundamentals; attention; next-token prediction; loss functions; sampling.

Source revision: 395a894418bc0b860c420d36123dd0bf3407e57b

Inspected files:
- `coregpt.py`
- `tests/test_training.py`

## chitragupta

Placement: All projects · In progress · private

**Portfolio description:** A personal knowledge companion that turns saved information into a searchable library and supports AI-assisted learning and questions over that library, with references to relevant saved sources.

**Problem addressed:** Making saved information easier to find, understand and reuse.

**Skills demonstrated:** Python; ingestion; persistent storage; retrieval; streaming AI answers; source-aware context selection.

Source revision: 7cc296a2070b07854e085165784d6cd938005ec2

Inspected files:
- `src/chitragupta/ingestion.py`
- `src/chitragupta/learn/runner.py`
- `src/chitragupta/ask/runner.py`

## BountyDesk

Placement: All projects · In progress · private

**Portfolio description:** A tool that discovers software bounty opportunities, filters unsuitable candidates and ranks a shortlist using evidence and personal preferences. It helps a developer decide what is worth investigating.

**Problem addressed:** Reducing manual effort spent evaluating scattered bounty opportunities.

**Skills demonstrated:** Python; staged pipelines; validation; persistence; evidence-based prioritization; external API handling.

Source revision: d3dae96f5298ab1e8d783ae4b59c3eb6a5b2e309

Inspected files:
- `src/bountydesk/application/pipeline.py`
- `src/bountydesk/application/prioritization.py`

## express-typescript-backend

Placement: All projects

**Portfolio description:** A task-management backend with account authentication and APIs for creating, finding, updating and deleting a user’s tasks. It separates request handling, business logic and database access.

**Problem addressed:** Providing an organized backend for user-specific task data.

**Skills demonstrated:** TypeScript; Express; Supabase authentication; CRUD APIs; pagination; layered backend design.

Source revision: 1df5f20ea79774503f1909b4b4e9695743b881f3

Inspected files:
- `src/services/task.service.ts`
- `src/controllers/auth.controller.ts`

## MonitorPro

Placement: All projects

**Portfolio description:** A browser dashboard that streams CPU, memory and battery information from its host machine, making system activity easier to watch in one place.

**Problem addressed:** Viewing changing system metrics without repeatedly checking command-line tools.

**Skills demonstrated:** Python; Flask; Socket.IO; psutil; live dashboard updates.

Source revision: 8639a3221758802603a4a67b2684927a4f8b14e4

Inspected files:
- `app.py`

## Python-FastApi-AWS

Placement: All projects

**Portfolio description:** A Python API that makes Wikipedia search, article summaries and key noun phrases available through simple HTTP endpoints.

**Problem addressed:** Exposing information lookup and basic text processing through reusable HTTP endpoints.

**Skills demonstrated:** Python; FastAPI; external-service integration; TextBlob; API design.

Source revision: 47d5edb62accfcccbde24609d77fc40cd19f85fb

Inspected files:
- `main.py`
- `mylib/logic.py`

## jenkins-eks-automation

Placement: All projects

**Portfolio description:** Terraform configurations for setting up a Jenkins server and an Amazon EKS environment, with Kubernetes deployment and service manifests.

**Problem addressed:** Making a CI server and Kubernetes infrastructure easier to reproduce.

**Skills demonstrated:** Terraform; AWS networking; EC2; EKS; Kubernetes; infrastructure provisioning.

Source revision: 489692fa459b68f2d7be5f409813031a5ab6d29a

Inspected files:
- `EKS/main.tf`
- `jenkins Server/main.tf`

## x-o-game

Placement: All projects

**Portfolio description:** A browser-based two-player tic-tac-toe game with turn switching, win detection, reset controls and sound effects.

**Problem addressed:** Providing a simple local game while exercising interactive browser logic.

**Skills demonstrated:** JavaScript; DOM events; game state; win-condition logic; browser audio.

Source revision: 40f93981e3f8c09250250d180dad7e77a1b525c9

Inspected files:
- `src/script.js`

## 3d-portfolio

Placement: All projects

**Portfolio description:** A React portfolio presenting experience, technologies and projects with interactive 3D elements and a contact section. It lazy-loads part of the scene and pauses rendering when relevant canvases are out of view.

**Problem addressed:** Presenting professional work in an interactive, accessible website.

**Skills demonstrated:** React; React Three Fiber; Three.js; responsive interfaces; rendering lifecycle.

Source revision: ddd06472b9fce28967d907024d84f5cd15976220

Inspected files:
- `src/App.jsx`
- `src/components/canvas/useVisibleFrameloop.js`

## Implementation requirements
- This document supersedes older project descriptions and unreviewed featured selections in CONTENT.md, constants and image mockups.
- Use the approved featured order above. All projects includes featured entries as well as the other approved entries; do not duplicate cards within a view.
- Use Portfolio description, Problem addressed and Skills demonstrated as the public content fields. Source revisions, inspected paths and internal evidence notes are not page copy.
- Cards show title, a short excerpt of the approved description and relevant technology labels. Opened details show the full description, problem and Skills demonstrated. Use the same data in scroll sections and destination panels.
- Keep private repository URLs absent from UI and public content data. Retain Chitragupta/BountyDesk In progress labels.
- Verify public source URLs; show demo actions only for verified demos. Do not infer a live demo from code presence.
- Do not rewrite descriptions from fresh README text during automated sync. Preserve approved editorial copy and propose material changes for review.
- Resume and selected source files have now been reviewed. This does not authorize implementation or prove all apps work in production.
