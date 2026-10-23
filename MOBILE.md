# Mobile layout

The home page and all five service pages share their existing content and assets with the desktop site. The last stylesheet, `src/mobile.css`, provides the touch layouts without changing the desktop composition.

- Below 768px the hero picture selects the client-supplied `public/assets/mobile-version bg.png`. The existing scroll hook fades this shared hero/header background.
- The mobile header keeps the original logo, company name, language switch, phone link, WhatsApp and menu. Its dimensions stay stable while scrolling.
- Phones use vertical service cards and stacked forms, calculator panels and service detail content. Portrait posters and the payment artwork remain fully visible.
- The pinned service rail applies only above 1100px with a fine pointer. Touch devices use a regular grid and vertical scrolling, while section reveals and click effects remain active.
- Floating controls include safe-area spacing. Form fields use 16px text and the viewport permits device zoom.

`npm run build` and `npm test` validate the bundle, React interactions, bilingual routing, supplied image paths and Express routes. No connected browser is available; physical device appearance and layout still need a browser review.
