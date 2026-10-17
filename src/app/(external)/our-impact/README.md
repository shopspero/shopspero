# Editing the Our Impact page

Open this folder in VS Code: src/app/(external)/our-impact.

## Where to change things

| File       | What to edit                                                                                                                           |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| content.ts | Ministry stories, partnership descriptions, website links, photo paths, and photo credits.                                             |
| page.tsx   | Opening and closing text, section headings, and the order/layout of page sections. Numbered comments mark each section.                |
| impact.css | Fonts, colors, spacing, alignment, and responsive layout. Comments label matching sections; tablet and mobile rules are at the bottom. |

## Change a story or partner

1. Open content.ts.
2. Find the organization by its name.
3. Edit the text inside the quotes. Keep the surrounding commas and braces.
4. Save with Ctrl+S and check http://localhost:3000/our-impact while npm run dev is running.

The stories and partners lists control display order. Copy an existing entry to add one. Ministry id values must be unique. All fields are required except ones marked with ? in the types at the top of content.ts.

## Change a photo

Save the image in public/images/impact. Set image in content.ts to /images/impact/your-file.jpg (omit public). Update photoAlt with a short image description and include photoCredit and photoSource. Keep source credits and confirm reuse permission before publishing. Partner logos are currently in public/images/partners.

## Links elsewhere in the website

- Header navigation: src/app/(external)/layout.tsx
- Footer navigation: src/components/Footer.tsx
- About Us link: src/app/(external)/about-us/about.tsx

## Current design decisions

No section-jump links, location strip, Laos proposal, or “What our giving supports” blocks. The giving statement is centered. Giving years and amounts still need confirmation.


## Check before sharing

Run npx tsc --noEmit --incremental false from the SPERO folder to check types. Preview the page at both desktop and narrow widths. Saving files is local; committing records changes, and pushing uploads them for a pull request.
