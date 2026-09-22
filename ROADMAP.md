# Light to Nations — Roadmap

## Vision
A no-combat action RPG about the spread of the gospel from Pentecost onward. The player follows an apostle whose path branches across nations. Every obstacle is a real event from Acts, turned into its own distinct mini-mechanic — never generic combat, never a health bar.

## Why Not Combat (read this before adding a health bar)
The Christian game space is saturated with trivia and puzzle apps, and generic combat is the crowded lane everywhere else. The differentiator here is making spiritual endurance — holding firm under pressure, acting in faith, receiving grace — feel as intense and rewarding as combat, without being combat. If a future design conversation drifts toward "let's add fighting for retention," the answer is: build better mechanics, not combat. This was a deliberate decision, made with input from Giovanni's wife as editorial/discernment reviewer.

## Core Loop (per encounter)
1. **Act of faith** — skill-based challenge (timing, precision, discernment). Success = miracle + XP.
2. **Cost of faith** — pressure-based challenge (hold firm under intimidation/threat).
3. **Deliverance** — low-tension grace beat; may have no fail state.

## Technical Foundations (build before/alongside first encounter)
- [x] Scene/state management structure — how Phaser scenes transition (overworld → encounter → back to overworld) — `GameStateManager` (pause/launch/resume + fade), decoupled via scene events
- [x] Basic save/progress system — so playtesters don't restart from zero — `SaveManager`, versioned localStorage, unit-tested
- [x] Asset placeholder strategy — simple shapes/silhouettes standing in for final art — encounter scenes use flat rectangles/circles; pilgrim sprite already placeholder art

## Phase 1 — Vertical Slice: Peter's Arc (Acts 3–5)
**Goal:** one complete, playable path start to finish, proving the loop works before any expansion.

**Status:** the three mechanics are built and playable as generic, content-driven scene classes (`TimingEncounterScene`, `DebateEncounterScene`, `GraceBeatScene`), each fed by a Peter's-arc data file, with unit tests on the underlying win/loss logic. Not yet connected to a real overworld — currently reachable only via debug keys 1/2/3 in `Game.ts`.

- [ ] Minimal overworld map: temple gate → council chamber → jail, walkable, no combat, Phaser tilemap
- [x] **Encounter 1 — Healing the lame man** (Acts 3): timing/precision mechanic, visible miracle payoff, XP reward
- [x] **Encounter 2 — Arrest & Sanhedrin** (Acts 4): debate-under-pressure mechanic, resist wavering under threat
- [x] **Encounter 3 — Jail & angelic deliverance** (Acts 5): low/no-fail grace beat, tone shift to release
- [x] Basic XP/progression system carrying across all three encounters — `SaveManager.faithXP`, no UI yet
- [ ] Dialogue system delivering scripture through character speech, not exposition dumps — currently static per-line text, not a reusable dialogue system

## Content & Theological Accountability
- [ ] Scripture accuracy review pass per encounter before marking it "done" (reviewer: wife, editorial/discernment role)
- [ ] Track source passage per encounter/dialogue line (e.g. Acts 3:1-10) for reference and any future "learn more" feature

## Definition of Done — Phase 1
- [ ] All three encounters playable start to finish without bugs blocking progress
- [ ] Scripture accuracy reviewed and approved
- [ ] Played by at least a few people outside yourself; the core question answered: does the non-combat loop feel satisfying, or does it feel like nothing happened?

## Phase 2 — Validate & Polish
- [ ] Playtest Phase 1 slice (self + trusted testers)
- [ ] Confirm the non-combat loop feels satisfying to a young player
- [ ] Polish juice — feedback, sound, screen effects for all 3 mechanic types

## Phase 3 — Expand the Loop
- [ ] Second apostle's arc (John, or another), reusing the engine, new story-specific mechanics
- [ ] Apostle-select screen

## Phase 4 — Pentecost Opening
- [ ] Cinematic/interactive Pentecost intro (tongues of fire, 3,000 converted)
- [ ] Apostle selection branching from that intro

## Deferred / Parked
- FaithRunners (`faith_runners` repo) — set aside; served its purpose as a Flame/Dart learning project
- Full nation map / continent-scale structure — revisit after Phase 3 proves the loop
