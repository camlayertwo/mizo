# Mizo — prototype wireframe

Greyscale, light-mode, mono-first wireframe for **Mizo** (multi-chain launchpad hub, formerly Noah.fun).
Built to design *from*, not to ship. No real dev — static HTML/CSS/JS.

Vibe: tactile Japanese printmaking × blockchain. Hand-carved display (Yuji Syuku) for brand
moments, mono (JetBrains Mono) for everything functional. Chain colour is represented as a
hatch pattern + label, honouring brand rule 1 ("colour only ever means a chain") while staying greyscale.

## Screens (§20.3 prototype scope)
- `index.html` — Hub home (hero, chain row, activity strip, cross-chain wall/feed)
- `storefront.html` — Per-chain store (themed band, the Wall x12, the Bin) · `?c=hood|sol|base|bnb|ton|eth`
- `record.html` — Record detail (obi, grade + "graded Xm ago", chart, curve, buy widget)
- `launch.html` — Launch flow (chain picker → the record → cut & confirm, live obi preview)
- `private.html` — Private swap / back room (public↔private toggle, bridge counter)
- `collection.html` — Mizo's Collection (twelve slots, published criteria, share card)

Core component: the **obi card** = one square cover + one vertical band (grade · store · state · price · age).
Everything renders from a sample token list in `app.js`.

Deploy: static — `cd public && vercel deploy --prod`.
