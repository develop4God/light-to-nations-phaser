# Light to Nations (Phaser)

Top-down RPG about carrying the gospel across the world's nations. No combat —
spiritual obstacles (doubt, fear, persecution, deception) are overcome through
faith, not violence. Isaiah 49:6.

This is a Phaser port/successor of the Bonfire/Flame prototype at
`../light_to_nations_flame` — that repo is design reference only (nation
roster, hero/faith-growth concept), not code to port literally.

## Concept

- Single pilgrim hero traveling continent to continent, exploring each nation
  as its own map.
- Hero grows in faith as nations are reached.
- Each nation has NPCs to meet and a spiritual obstacle to overcome — never a
  quiz, never a weapon.
- Same principle as the sibling project `../faith_runners`: every mechanic is
  grounded in a real story, not an abstract game-design trope.

## Stack

- Phaser 3, TypeScript, Vite
- `npm run dev` — dev server (localhost:8080)
- `npm run build` — type-check + production build

## Agent instructions

Read `skills/` before writing any Phaser code — it documents Phaser's
scenes, physics, tilemaps, input, and other subsystems in depth. Follow the
idiomatic patterns documented there rather than guessing at Phaser APIs.
