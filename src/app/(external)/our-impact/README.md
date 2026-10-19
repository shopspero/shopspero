# Editing Our Impact

- content.ts: current ministries, past ministries, partner descriptions, source credits, and logo paths.
- page.tsx: intro and section headings.
- MinistryCard.tsx: shared photo and description layout.
- PastMinistriesGallery.tsx: previous/next controls and keyboard interaction.
- impact.css: fonts, spacing, gallery, and responsive layout.

## Giving year and order

Update givingYear and currentMinistries together. The current focus is 2026: Trinity Baptist Church, then VGS. Past ministries appear in array order: Grace Academie, then More Than Bread. Keep past entries in pastMinistries to avoid making the page longer. The gallery shows one entry at a time and has left/right buttons and keyboard arrow support; it does not autoplay.

## Photos and logos

All ministry photos in public/images/impact are 1200 x 800 WebP. Crop new ministry photos to the same 3:2 dimensions. Keep alt text, credit, and source together in the photo object. Source credits remain beneath images. Current web-sourced photo reuse permission is unconfirmed; replace with team-approved images or confirm permission before publishing.

Trinity: official church website. VGS: secondary-student photo from https://vientiane-gain-glory.xyz/, supplied by the team as the school website. Grace: Peninsula Bible Church's ministry profile. More Than Bread: official website. Exact source links are in content.ts.

Partner logos are 600 x 300 WebP canvases, resized with containment so logos are not distorted. Five logos were supplied by the team; UIC uses the existing repository logo. Abba Modern's supplied logo is white on transparent, so darkBackground is true.

## Content and checks

Descriptions use the team's notes. The Laos entry describes planned tuition aid and supplies; it does not claim funds have already been disbursed. No donation totals or past giving years are invented. The heart-behind-giving and thank-you sections are omitted.

Preview at /our-impact with npm run dev. Check types with npx tsc --noEmit --incremental false. Test the gallery with buttons and keyboard arrows, including first/last disabled states, and check mobile widths.
