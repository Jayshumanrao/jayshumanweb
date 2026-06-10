## Creative Portfolio Pro — Implementation Plan

### Phase 1: Foundation
- Update `styles.css` with white/black/purple design tokens + dark mode
- Add Google Fonts (Inter + Syne) via `<link>` in `__root.tsx`
- Install `framer-motion` for animations
- Create `ThemeProvider` with light/dark toggle persisted to localStorage
- Create shared `Navbar`, `Footer`, `Layout` components

### Phase 2: Core Pages (routes)
- **Home** — Hero, stats, featured projects (3 cards), client logos, testimonial
- **About** — Bio, timeline, education, skills with progress bars
- **Portfolio** — Filterable masonry gallery, project cards with lightbox
- **Services** — Service cards with pricing/delivery time
- **Testimonials** — Client review carousel with star ratings
- **Blog** — Article cards with categories
- **Contact** — Form, social links, FAQ

### Phase 3: Polish
- Smooth page transitions (Framer Motion AnimatePresence)
- Mobile responsive navigation (sheet/drawer)
- SEO meta per route
- Accessibility: keyboard nav, ARIA labels, contrast
- `robots.txt` + `sitemap.xml`

### Key Design Decisions
- Palette: White background, near-black text, purple (#7C3AED) accent
- Typography: Inter (body), Syne (headings)
- Layout: Modern editorial luxe — pill nav, generous whitespace, soft shadows
- Animations: Fade-up on scroll, hover scale on cards, floating background shapes