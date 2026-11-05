# Implementation plan

Status: written implementation contract prepared; visual/content preflight still open. This document is intended for a continuous build pass once the user approves kickoff. Milestones are engineering checkpoints within that pass, not repeated product-design sessions.

## 0. Freeze inputs
Close DECISIONS.md remaining items. Approve desktop/mobile mockups and avatar/island/UI sheets. Record asset licences and final project catalogue/order. Choose free analytics service and configuration. Supply resume. Confirm branch and preserve sources. Lead reads all five production skills and generator references applicable to asset production. Do not begin application implementation while the approved look is unknown.

## 1. Foundation and complete readable portfolio
Audit dependency compatibility; retain functioning baseline behavior. Implement content contracts, design tokens, navigation, all DOM sections, contact states and semantic anchors. Replace displayed name only as agreed. Add responsive layouts and accessible focus. Acceptance: all content reachable with 3D disabled; no fake links; existing projects/experience preserved.

## 2. Final-quality world and movement
Build the island, three landmarks and approved avatar from agreed sheets; finalize core materials at real camera scale before multiplying props. Implement keyboard, pointer and touch inputs, path graph, collision bounds and cancellation. Lazy loading, poster/retry and performance adaptation are part of this work. Acceptance: free movement and click destinations work, no lost avatar/stuck input; visual captures match approved composition.

## 3. Integration and polish
Connect destination selection to shared DOM panels; camera/arrival transitions never delay access. Add cursor companion, controlled audio and reduced motion. Produce final poster from world, social card and favicon. Acceptance: mobile sheets remain readable, scrolling recovers on exit, audio stops on pause and blocked audio fails silently with usable controls.

## 4. Content pipeline and measurement
Add vetted newer projects, resume and licensed imagery. Add analytics adapter and verify configured events in service diagnostics with no form data. Implement manual project-update proposal workflow and validations. Separate build-only branch checks from Pages publishing; guard production deployment to main even for workflow_dispatch. Acceptance: a fixture update creates the expected proposal without overwriting editorial/private entries; no production deployment from portfolio-v2.

## 5. Integrated validation and fixes
Run VALIDATION.md matrix, actual interactions and motion captures. Fix defects within the agreed scope. Record evidence, limitations and any blocked real-device checks. Complete skill visual scorecard after assets are integrated; no score based only on code inspection.

## 6. Release handoff
Provide branch commit, comparison, evidence and release checklist. User reviews finished result and authorizes merging; then main can replace the old portfolio. Never claim published merely because the branch build passed.

## Work assignment contracts for smaller agents
Lead owns shared state/interfaces, dependency changes, integration and final evidence. UI worker owns content/sections/panels; world worker owns world/models/input/camera. Define ownership before starting them. Automation/content tasks follow once schema is stable. Workers receive this plan, DESIGN.md, relevant skill, owned paths, exact inputs/outputs and acceptance criteria. They must not silently change confirmed requirements or overwrite one another's files.
