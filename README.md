<<<<<<< HEAD
# Al Shahin — React + Node/Express review mock

The same bilingual Al Shahin experience, rebuilt with **React 19**, **Node.js** and **Express 5**. Vite handles JSX, development updates and production assets. There is no Python dependency or tooling.

## Run

Requires Node.js 22.12+ and npm.

```sh
npm install --include=dev
npm run dev
```

Open **http://127.0.0.1:3000**. Express serves React with Vite middleware. `PORT` overrides the default. Opening `index.html` directly is no longer supported.

For an optimised local build:

```sh
npm run build
npm start
```

The server binds to loopback for local review. Configure production hosting, proxy and TLS separately. This mock has not been deployed.

## Included

All CSS font sizes are increased by 20%, with a minimum of 12px for the smallest captions. `src/typography.css` adds wrapping and spacing for larger labels, mobile menus and form controls. Text embedded in the supplied poster images is part of the artwork and is not resized independently.

The contact section contains a lazy-loaded Google Maps iframe in a glass card, with an office-address caption and an external “Open in Google Maps” link. The public query embed needs no API key or Maps JavaScript SDK. The `useOfficeMap` hook switches the map language with the page. Google serves the map externally; the exact business marker should be checked during live browser review.

Service posters fill their cards edge to edge at their original 2:3 aspect ratio. Shared liquid-glass styles in `src/glass.css` add translucent surfaces, blur, rounded edges and reflective highlights to cards and buttons. Readable dark button tints and opaque fallbacks are provided when backdrop filtering is unsupported.

The client-supplied `public/assets/UAE Currency and White Eagle Logo.png` is the shared header and hero backdrop. A scroll-linked fade transitions it to ivory as the hero leaves the viewport, while the sticky header becomes solid. The backdrop fade and parallax run automatically.

- All home-page sections and five service views at `/services/<slug>.html`. NafIs links to the flagged section on the personal-loan view.
- React-managed English/Arabic switching, RTL layout and internal navigation. Language survives internal navigation; nothing persists after reload.
- Personal/salary and mortgage calculators, zero-interest support, amortisation chart, animated payment values and WhatsApp result links.
- Four-question enquiry flow, review placeholders, accessible tabs, FAQs, mobile navigation and local-only form validation.
- Layered skyline parallax, short pinned service rail, staggered reveals, card tilt with pointer highlight, magnetic hover buttons, floating particles/orbits, scroll progress and panel transitions.
- Automatic full motion, touch fallbacks and native service scrolling if GSAP is unavailable.
- Strong staggered entrance reveals, continuously floating skyline and coins, visibly rotating orbit details, scroll-drawn accents, process highlights, click ripples, calculator feedback and a scroll-progress back-to-top button. Core CSS and native scroll reveals start without waiting for the scroll engine.
- Full animations start automatically. The motion control button has been removed at the client’s request.

Internet access loads Google Fonts and supplied source images. Exact GSAP/ScrollTrigger **3.12.5** is installed locally and split into a local Vite chunk, so animations do not rely on an external CDN. Failed images use an inline SVG placeholder and are logged in `window.imageFailures` and the console.

## Source map

```text
server.js                     Express development and production server
vite.config.js                React build configuration
index.html                    React entry and fonts
src/
  App.jsx                     Client routes, progress, cursor and shell
  Pages.jsx                   Home sections, footer and five service views
  main.jsx                    React root
  components/UI.jsx           Translation context, images, header, tilt cards
  components/Widgets.jsx      Calculators, enquiry, reviews, contact form
  components/MotionControl.jsx  Full/reduced motion preference control
  content/translations.json   English / Arabic dictionary
  hooks/motion.js             GSAP lifecycle and animated payment hook
  hooks/interactions.js       Scroll accents, click feedback and update glow
  lib/finance.js              Amortisation and local validation
  lib/animationEngine.js      Locally bundled GSAP and ScrollTrigger
  lib/motionPreference.js     Shared CSS/JS motion preference
  styles.css                  Design, responsive layout and RTL
  effects.css                 Dynamic effects and motion preferences
public/assets/                Artwork, fallback and source URLs
tests/app.test.mjs             React, content, calculation and server tests
MISSING.md                    Content approvals and production gaps
```

Edit copy in `src/content/translations.json` and keep its Arabic native-review row in `MISSING.md`. Edit section composition in `src/Pages.jsx`, interactions in `Widgets.jsx`, and design tokens in `src/styles.css`.

## Privacy and honesty

Form and enquiry answers exist only in React memory. No storage, analytics, database, submission endpoint or automatic callback is implemented. Express exposes `GET /api/health` and rejects write requests with HTTP 405. The contact form uses `method="dialog"` and prevents submission. WhatsApp opens only on an explicit click and includes the estimate or categorical enquiry summary.

Calculations are **Illustrative, not an offer** and exclude fees and insurance. No bank partnerships, licences, ratings, statistics, testimonials or team identities are invented. All original approval flags remain in `MISSING.md`.

## Verification

```sh
npm run build
npm test
```

Tests run actual React components in jsdom, check all six views and local links/assets, and exercise calculators, Arabic, routing, enquiry, validation, image fallback and review/menu controls. Express tests verify production deep links, assets, health, 404s and rejection of submissions. Production tests require a current build.

No browser was connected for visual QA. jsdom cannot verify real GSAP/pinning, screen-reader behaviour, device layouts or Lighthouse. The 85+ mobile performance score remains a target. React overhead changes the original plain-JavaScript budget; consult Vite output for measured bundle sizes.
=======
# Bank_app
>>>>>>> a7c1449010e516c07e4a1a307e6fab7c45f3168d
