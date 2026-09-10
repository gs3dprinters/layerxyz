# Layerxyz Codebase & Architecture Audit

**Audit Date**: September 10, 2026  
**Target Repository**: `/Users/sadha/.gemini/antigravity/scratch/layerxyz`  
**Live Site**: [https://layerxyz.vercel.app/](https://layerxyz.vercel.app/)  
**Brand & Domain**: Layerxyz — Premium Custom 3D Printing, Sculpture, Fabrication & Physical Objects  
**Audit Purpose**: Pre-redesign technical audit, architecture review, asset inventory, and readiness inspection.

---

## 1. Executive Summary & Repositioning Alignment

Layerxyz is undergoing a strategic repositioning from a technical 3D printing service to an integrated:
- **Premium 3D Object Store**
- **Contemporary Sculpture Gallery**
- **Custom Fabrication Studio**
- **Interactive 3D Product Experience**

The website aesthetic must deliberately avoid:
- Generic 3D printing / engineering bureau clichés
- SaaS dashboard or WebGL demo vibes
- Neon cyberpunk / heavy glassmorphism / blueprint HUD graphics
- Cheap local printing service impression

Instead, the benchmark experience aligns with luxury furniture, contemporary sculpture galleries, and Apple-grade physical product presentation where Three.js technology operates seamlessly in the background.

---

## 2. Current Architecture

| System Component | Technology / Version | Implementation Details |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.1.7 (Next 15.5.25 runtime) | React Server Components & Client Components under App Router |
| **UI Library** | React 19.0.0 & React DOM 19.0.0 | Full React 19 compatibility |
| **Language** | TypeScript 5.7.3 | Strict type checking enabled (`strict: true`) |
| **Styling** | Tailwind CSS 3.4.17 + PostCSS 8.5.2 | Custom warm luxury palette, utility classes |
| **Class Utilities** | `clsx` 2.1.1 + `tailwind-merge` 3.0.1 | Merged class logic in `lib/utils.ts` |
| **3D Rendering** | Three.js 0.173.0 (`@types/three` 0.173.0) | Direct Three.js Canvas APIs, `GLTFLoader`, `STLLoader`, `OrbitControls` |
| **Animation** | Framer Motion 12.4.7 | Micro-interactions, slide-overs, step transitions, cart drawers |
| **Icons** | Lucide React 0.475.0 | Clean, modern line icons (ShoppingBag, Search, Menu, ArrowRight, etc.) |
| **State Management**| React Context (`lib/cart-context.tsx`) | LocalStorage-persisted cart state with live drawer |

---

## 3. Current Routes

### Active Prerendered Static / Dynamic Routes (42 Pages Total)
- `/` (`app/page.tsx`): Main homepage featuring Hero, Featured Collection, Interactive 3D Showcase, Shop by Category, Custom CTA, Selected Work, Large Scale, Why Layerxyz, FAQ, and Final CTA.
- `/shop` (`app/shop/page.tsx`): Ecommerce catalog with category filters, sort controls, and responsive product grid.
- `/product/[slug]` (`app/product/[slug]/page.tsx` + `ProductClient.tsx`): 17 product pages with interactive 3D viewer, variant selector, specs accordion, and WhatsApp inquiry integration.
- `/collections` (`app/collections/page.tsx`): Curated collection listing.
- `/collections/[slug]` (`app/collections/[slug]/page.tsx`): 5 collection routes (`sculptures`, `figurines`, `home-objects`, `collectibles`, `limited`).
- `/custom` (`app/custom/page.tsx`): Multi-step custom fabrication quote wizard with file dropzone.
- `/3d-studio` (`app/3d-studio/page.tsx`): Interactive 3D showcase gallery of real Layerxyz pieces.
- `/about` (`app/about/page.tsx`): Studio overview, craft values, and Tiruppur studio information.
- `/work` (`app/work/page.tsx`): Selected client portfolio & studio works index.
- `/work/[slug]` (`app/work/[slug]/page.tsx`): 6 portfolio case studies with project narratives.
- `/cart` (`app/cart/page.tsx`): Full cart view with WhatsApp checkout handoff.
- `/start-a-project` (`app/start-a-project/page.tsx`): Client redirection layer to `/custom`.
- `robots.ts` & `sitemap.ts`: Dynamic search engine discovery endpoints.

### Missing / Dead Link Routes (Discovered in Audit)
The following links exist in `components/layout/Footer.tsx` but lack corresponding route handlers in `app/`, resulting in 404 errors if clicked:
- `/contact`
- `/faq` (FAQ exists on homepage, but dedicated route does not)
- `/shipping`
- `/returns`

---

## 4. Existing Components

### Layout Components (`components/layout/`)
- `Navbar.tsx`: Sticky frosted navbar (`bg-[#F5F3EE]/85`), category navigation, integrated search overlay trigger, cart badge counter.
- `CartDrawer.tsx`: Slide-in drawer with Framer Motion, quantity adjusters, subtotal calculation, and direct WhatsApp checkout trigger.
- `SearchOverlay.tsx`: Full-screen animated overlay searching live product catalog.
- `MobileMenu.tsx`: Fullscreen mobile navigation overlay with slide transitions.
- `Footer.tsx`: 4-column luxury footer with newsletter capture and studio location credits.
- `Logo.tsx`: Clean sans-serif wordmark.
- `WhatsAppButton.tsx`: Floating desktop contact helper.
- `CustomCursor.tsx`: Stubbed / deactivated (`export {};`).

### UI Components (`components/ui/`)
- `ProductCard.tsx`: Product card with 3D badges, pricing, hover zoom, and routing.
- `ProductGrid.tsx`: Responsive CSS grid (4-col desktop, 2-col tablet, 1-col mobile).
- `Button.tsx`: Polymorphic button (`primary`, `secondary`, `outline`, `ghost`).
- `Badge.tsx`: Minimal pill badges (`BESTSELLER`, `NEW`, `CUSTOM`, `LIMITED`).
- `Accordion.tsx`: Accessible animated accordion with Framer Motion `AnimatePresence`.
- `Card.tsx`: Rounded clean container card with border styling.
- `NoiseOverlay.tsx`: Stubbed / deactivated (`export {};`).

### 3D Components (`components/3d/`)
- `HeroSculpture.tsx`: Client-only Three.js viewer loading the real `kala-final-print.glb` statue. Configured with dual-mesh material assignment (graphite `#323232` person, deep charcoal `#141414` pedestal), studio lighting, soft contact shadow, and subtle mouse parallax.
- `CardModelViewer.tsx`: Micro 3D viewer designed for homepage product cards. Uses `IntersectionObserver` to only run WebGL when visible; auto-rotates and pauses/scales on cursor hover.
- `ProductViewer.tsx`: Full-featured product page 3D viewer with OrbitControls, material finish presets (Obsidian, Bone, Graphite, Warm Clay), auto-rotation toggle, and smooth fallback.
- `ModelShowcase.tsx`: Auxiliary WebGL presentation module.

### Section Components (`components/sections/`)
- Active: `HeroSection.tsx`, `FeaturedCollection.tsx`, `InteractiveShowcase.tsx`, `ShopByCategory.tsx`, `CustomCTASection.tsx`, `SelectedWorkSection.tsx`, `LargeScaleSection.tsx`, `WhyLayerxyz.tsx`, `FAQSection.tsx`, `FinalCTASection.tsx`.
- Stubbed Legacy Files: `IntroSection.tsx`, `TrustMarquee.tsx`, `ProcessSection.tsx`, `TechSpecsSection.tsx`, `ServicesSection.tsx`, `MaterialSection.tsx`, `CustomIdeaSection.tsx`, `ScaleSection.tsx`, `WorkSection.tsx` (all preserved with `export {};` to avoid breaking old imports).

---

## 5. Existing 3D Assets Inventory

All 3D assets reside in `/public/models/`:

| Filename | Format | Size | Purpose & Current Usage | Suitability for Homepage | Suitability for Product Card | Suitability for Detail Page |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `kala-final-print.glb` | GLB (Binary) | **4.8 MB** | **Hero 3D Model** & Custom Portrait Sculpture. Real Layerxyz portrait statue with pedestal. | **High (Primary Hero)** | **High** | **High** |
| `kala-final-print.stl` | STL (CAD) | **11 MB** | Original CAD source for Kala portrait statue. Currently loaded in `InteractiveShowcase.tsx`. | Low (Too heavy for WebGL) | Unsuitable | Low (prefer GLB) |
| `nandi-temple-sculpture.glb` | GLB (Binary) | **1.0 MB** | Heritage Nandi Temple Sculpture. Real heritage product model. | Medium | **High** | **High** |
| `nataraja-statement-sculpture.glb` | GLB (Binary) | **1.6 MB** | Statement Nataraja Sculpture with ring of flames. Real cultural statement piece. | Medium | **High** | **High** |
| `personalized-name-sculpture.glb` | GLB (Binary) | **56 KB** | Personalized Name Desk Sculpture. Ultra-lightweight custom typography object. | Low | **High** | **High** |

**Asset Findings**:
- 4 production-ready `.glb` models exist and are successfully integrated.
- The 11MB STL model in `InteractiveShowcase.tsx` should be swapped to `kala-final-print.glb` (4.8 MB) to save ~6.2 MB on homepage payload.

---

## 6. Existing Product Assets & Data Architecture

### Product Data System (`data/products.ts`)
Products are modeled as statically typed TypeScript objects (`export interface Product`).
- Current catalog size: **17 products** across 5 categories (`sculptures`, `figurines`, `home-objects`, `collectibles`, `limited`).
- Four flagship products use **real 3D models**:
  1. `custom-portrait-sculpture`: `/models/kala-final-print.glb` (Price: ₹1,499)
  2. `heritage-nandi-sculpture`: `/models/nandi-temple-sculpture.glb` (Price: ₹2,499)
  3. `personalized-name-sculpture`: `/models/personalized-name-sculpture.glb` (Price: ₹799)
  4. `nataraja-statement-sculpture`: `/models/nataraja-statement-sculpture.glb` (Price: ₹4,999)
- Remaining 13 products currently utilize CSS gradient backgrounds and fallback procedural representations.

### Collections Data System (`data/collections.ts`)
5 curated collections:
- `sculptures` (6 items)
- `figurines` (3 items)
- `home-objects` (4 items)
- `collectibles` (4 items)
- `limited` (2 items)

---

## 7. Existing Image Assets Inventory

### Verified Images on Disk (`public/images/products/`)
- `kala-statue-optimized.jpg` (126 KB) — High-resolution studio photography of Kala statue
- `custom-portrait-sculpture.jpg` (34 KB) — Studio render of portrait sculpture
- `heritage-nandi-sculpture.jpg` (33 KB) — Studio render of Nandi sculpture
- `nataraja-statement-sculpture.jpg` (63 KB) — Studio render of Nataraja sculpture
- `personalized-name-sculpture.jpg` (20 KB) — Studio render of personalized name piece

### Missing Image References
In `data/projects.ts`, 6 project entries reference images under `/images/`:
- `/images/project-sculpture.jpg`
- `/images/project-chassis.jpg`
- `/images/project-pavilion.jpg`
- `/images/project-figurine.jpg`
- `/images/project-lighting.jpg`
- `/images/project-kinetic.jpg`

*Note*: None of these files currently exist in `/public/images/`. Currently handled via gradient fallbacks in the UI.

---

## 8. Current Dependencies Audit

```json
{
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.475.0",
    "next": "^15.1.7",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.0.1",
    "three": "^0.173.0"
  },
  "devDependencies": {
    "@types/node": "^20.17.19",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@types/three": "^0.173.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.2",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  }
}
```

**Dependency Findings**:
- Clean, minimal dependency graph with zero bloated or unmaintained packages.
- No redundant WebGL wrappers (`@react-three/fiber` or `@react-three/drei` are omitted in favor of lean vanilla Three.js).
- `framer-motion` 12 is fully compatible with React 19.
- Note: ESLint is not installed in `devDependencies`, causing `npm run lint` (`next lint`) to prompt for initial configuration.

---

## 9. Current Problems & Technical Deficits

1. **Heavy STL Asset in Interactive Showcase**:
   - `InteractiveShowcase.tsx` loads `kala-final-print.stl` (11 MB). Loading raw STL on the homepage wastes mobile bandwidth and slows parsing. It should be switched to `kala-final-print.glb` (4.8 MB).
2. **Missing Routes (Footer 404s)**:
   - Footer links point to `/contact`, `/faq`, `/shipping`, `/returns`. None of these pages exist in `app/`.
3. **Missing Project Images**:
   - `data/projects.ts` references `/images/project-*.jpg` which are missing from `public/images/`.
4. **Placeholder Business Info**:
   - `lib/utils.ts` and `FAQSection.tsx` have placeholder WhatsApp telephone numbers (`919876543210` and `1234567890`).
5. **Brand Aesthetic Inconsistencies**:
   - `Footer.tsx` has `hover:text-[#B7FF00]` (bright lime) on text links, clashing with the warm luxury palette.
6. **ESLint Configuration Missing**:
   - Running `next lint` prompts for ESLint initialization because no `.eslintrc` or eslint package exists.

---

## 10. Performance Audit

- **Static Generation**: All 42 pages build as pre-rendered SSG with 0 server-side blocking.
- **First Load JS**: ~103 kB shared chunk size across routes — very lean.
- **Client 3D Loading**:
  - `HeroSculpture.tsx` uses dynamic client import with `ssr: false`.
  - `CardModelViewer.tsx` uses `IntersectionObserver` with `rootMargin: '100px'` so WebGL contexts only initialize when scrolled into view.
  - Context disposal: `renderer.dispose()`, `geometry.dispose()`, and `material.dispose()` are implemented on component unmount.
- **Optimization Opportunities**:
  - Add Draco compression or meshopt compression for `kala-final-print.glb` in future phases if sub-2MB transfer is desired.
  - Implement Next.js `<Image>` with priority hints for above-the-fold product cards.

---

## 11. Responsive Audit

- **Desktop (1440px / 1280px)**:
  - Hero layout splits evenly (typography left, 3D statue right).
  - Featured Objects grid displays 4 distinct columns with high-clarity 3D card viewers.
- **Tablet (1024px / 768px)**:
  - Featured collection reorganizes into a clean 2x2 grid.
  - Navigation switches to compact layout or hamburger overlay.
- **Mobile (430px / 390px / 375px)**:
  - Single column product flow.
  - Hero 3D viewer scales down gracefully (`h-[360px] sm:h-[480px] md:h-[580px]`).
  - OrbitControls touch rotation works without trapping page scroll.

---

## 12. Accessibility Audit

- **Semantic Elements**: Proper `<nav>`, `<header>`, `<main>`, `<section>`, and `<footer>` containers utilized.
- **ARIA & States**: Accordion components in FAQ and Product pages include `aria-expanded` and role definitions.
- **Keyboard Navigation**: Buttons and links have distinct focus outlines.
- **Color Contrast**: Warm charcoal `#181818` on warm ivory `#F5F3EE` achieves > 11:1 contrast ratio (AAA compliant).
- **Reduced Motion**: Framer Motion transitions should be wired to `prefers-reduced-motion` media queries in subsequent refinement.

---

## 13. Brand Consistency Audit

- **Palette**:
  - Background: Warm ivory `#F5F3EE` / `#FAFAF8`
  - Text: Charcoal `#181818` and muted slate `#777777`
  - Hero Sculpture: Light black / graphite `#323232` bust on deep charcoal `#141414` pedestal
  - Accents: Restrained, avoid neon / cyberpunk highlights
- **Typography**:
  - Primary: Clean modern sans-serif (Inter / System Sans)
  - Monospace: Reserved exclusively for dimensions, specs, and price tags.

---

## 14. Recommended Implementation Order (Future Phases)

1. **Phase 1: Asset & Link Sanitation**
   - Switch `InteractiveShowcase.tsx` from `kala-final-print.stl` (11 MB) to `kala-final-print.glb` (4.8 MB).
   - Implement stub pages or modal overlays for missing footer routes (`/contact`, `/faq`, `/shipping`, `/returns`).
   - Replace placeholder WhatsApp numbers with official business contact details.
2. **Phase 2: Product Catalog & Media Refinement**
   - Add photography/render assets for the remaining 13 products or standardize fallback rendering.
   - Provide actual images for the 6 studio portfolio entries in `data/projects.ts`.
3. **Phase 3: 3D Viewer & Interaction Tuning**
   - Fine-tune studio lighting and environment maps across all 4 product card viewers.
   - Introduce subtle loading spinners or shimmer placeholders during initial model downloads.
4. **Phase 4: Commerce & Conversion Polish**
   - Enhance the custom quote request flow with structured specifications.
   - Refine WhatsApp direct-checkout message templates.
