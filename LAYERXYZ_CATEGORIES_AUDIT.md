# LAYERXYZ — CATEGORIES SHOPPING SYSTEM AUDIT

**Date**: 2026-09-12  
**Live Production Site**: https://layerxyz.vercel.app  
**Target**: Full implementation of the 8-Category Shopping System across Layerxyz  

---

## 1. Executive Summary

This audit assesses the existing Layerxyz codebase in preparation for implementing the complete, functional **Categories Shopping Experience**. The goal is to transform category discovery across the homepage, navigation, desktop mega menu, mobile drawer, categories landing page, individual category pages, subcategory filtering, search, and cart flow, while maintaining the warm ivory/charcoal luxury aesthetic and adhering to strict credibility rules (no fake products, no fake reviews, no unverified claims).

---

## 2. Existing Framework & Routing Structure

- **Framework**: Next.js 15.5.25 (App Router), React 19, TypeScript 5.7.3, Tailwind CSS 3.4.17, Framer Motion 12.4.7, Three.js 0.173.0.
- **Rendering**: Fully static prerendering (SSG/Static) across 55 routes.
- **Existing Routes**:
  - `/`: Master homepage with 10 sections.
  - `/shop`: General catalogue with 4 category pills (Sculptures, Figurines, Home, Limited) and sorting.
  - `/categories`: Preliminary categories page (currently lists 8 categories with disconnected mock items).
  - `/categories/[slug]`: Dynamic category page (currently renders `CategoryDetailClient`).
  - `/collections` & `/collections/[slug]`: 5 curated thematic collections (`sculptures`, `figurines`, `home-objects`, `limited`, `custom`).
  - `/product/[slug]`: Product detail page with Three.js 3D viewer, finish swatches, size tiers, trust strip, and cart actions.
  - `/custom`: 5-stage bespoke commission workflow with file upload and WhatsApp quote integration.
  - `/3d-studio`: Interactive 3D showroom with 4 verified GLB models.
  - `/work` & `/work/[slug]`: Studio case studies.
  - `/cart`: Slide-in cart drawer and full cart page with WhatsApp order generation.
  - `/about`, `/faq`, `/shipping`, `/returns`, `/contact`.

---

## 3. Product & Category Data Audit

### 3.1 Product Structure (`data/products.ts`)
- **Products**: 17 products defined in `BASE_PRODUCTS`.
- **Current Model**:
  - Uses legacy `category: 'sculptures' | 'figurines' | 'home' | 'collectibles' | 'limited'`.
  - Does **not** yet have `categorySlug` or `subcategorySlugs` matching the 8 target categories.
- **Asset Availability**:
  - **Real Images (5)**:
    1. `/images/products/custom-portrait-sculpture.jpg`
    2. `/images/products/heritage-nandi-sculpture.jpg`
    3. `/images/products/personalized-name-sculpture.jpg`
    4. `/images/products/nataraja-statement-sculpture.jpg`
    5. `/images/products/kala-statue-optimized.jpg`
  - **Real 3D GLB Models (4)**:
    1. `/models/kala-final-print.glb`
    2. `/models/nandi-temple-sculpture.glb`
    3. `/models/personalized-name-sculpture.glb`
    4. `/models/nataraja-statement-sculpture.glb`
  - Remaining 12 products have procedural/CSS color swatches and fallback renderings.

### 3.2 Category Structure (`data/categories.ts`)
- **Current State**:
  - Defines 8 categories, but embeds disconnected mock products (`gift_01`, `custom-lithophane-photo-lamp`, etc.) that do not exist in `data/products.ts`.
  - Subcategories are strings instead of `{ slug, name, description }`.
  - Contains unverified residual buzzwords (`Tough Studio Resin`, `Bronze-Infused Matrix`, `Super-Fine UV Resin`, `Polymer Carbon Matrix`) which violate Phase 13 credibility rules.
- **Required Model (Phase 2)**:
  - Central type-safe schema:
    ```ts
    type Subcategory = { slug: string; name: string; description?: string; };
    type Category = { slug: string; name: string; shortName?: string; description: string; subcategories: Subcategory[]; image?: string; featured?: boolean; };
    ```
  - Exact 8 categories:
    1. `gifts` (Gifts)
    2. `god-idols` (God Idols)
    3. `leaders-icons` (Leaders & Icons)
    4. `costume-idols` (Costume Idols)
    5. `home-decor` (Home Décor)
    6. `toys-figurines` (Toys & Figurines)
    7. `awards-trophies` (Awards & Trophies)
    8. `custom-creations` (Custom Creations)
  - Categories must query real products dynamically from `data/products.ts`.

---

## 4. Navigation & Search Audit

### 4.1 Desktop Navigation (`components/layout/Navbar.tsx`)
- Nav links currently include `SHOP`, `CATEGORIES`, `CUSTOM`, `COLLECTIONS`, `3D STUDIO`, `WORK`, `ABOUT`.
- **Missing**: Desktop Categories Mega Menu. Clicking or hovering `CATEGORIES` just acts as a simple link.
- **Need**: Full-width or generous centered mega menu displaying all 8 categories with their respective subcategories in an accessible 4-column layout with click/keyboard controls and Escape key dismissal.

### 4.2 Mobile Navigation (`components/layout/MobileMenu.tsx`)
- Currently renders a flat vertical list of links.
- **Missing**: Interactive expandable Categories accordion showing all 8 categories and their subcategory links with touch-friendly targets.

### 4.3 Search System (`components/layout/SearchOverlay.tsx`)
- Currently calls `searchProducts(query)` from `data/products.ts`.
- Only matches product title, description, and old category string.
- **Missing**: Indexing category names, subcategory names, and directing users directly to `/categories/[slug]?subcategory=[sub]` alongside matching product cards.

---

## 5. UI & Reusable Component Audit

### 5.1 Product Card (`components/ui/ProductCard.tsx`)
- Renders image/GLB preview, badges, title, description, and price.
- **Issue**: Line 96 and Line 118 unconditionally say "VIEW IN 3D", even for products without a 3D model.
- **Requirement**: Display "VIEW IN 3D" only when `modelUrl` exists; otherwise show "VIEW OBJECT". Add "CUSTOMIZABLE" badge support when true.

### 5.2 Category Landing Page (`app/categories/page.tsx`)
- Currently renders a long vertical stack of cards containing mock specs and mock products.
- **Need**: Transform into an editorial magazine-style discovery page with warm ivory palette, category cards with real product visual previews/fallbacks, subcategory pills, object counts, and bespoke custom creation triggers.

### 5.3 Dynamic Category Page (`app/categories/[slug]/page.tsx` & `CategoryDetailClient.tsx`)
- Currently tied to embedded mock products in `data/categories.ts`. Links go to `/start-a-project` instead of real `/product/[slug]`.
- **Need**: Rebuild to pull genuine products from `data/products.ts`, support `?subcategory=` URL query filtering, provide dynamic sort controls, render a polished empty state ("THIS COLLECTION IS TAKING SHAPE") when a category or subcategory has no stock products, and provide strong custom creation CTAs.

### 5.4 Homepage Discovery (`components/sections/ShopByCategory.tsx`)
- Currently renders an interactive tabbed panel with specs and subcategories.
- **Need**: Upgrade into an editorial category discovery showcase linking directly to all 8 categories with truthful copy and visual previews.

---

## 6. Verification Status of Current Build

- **TypeScript (`npx tsc --noEmit`)**: PASS (0 errors).
- **Next.js Production Build (`npm run build`)**: PASS (55/55 routes prerendered in 4.6s).
- **Lint (`npm run lint`)**: Prompts for ESLint config setup (deprecation notice from Next.js 15).

---

## 7. Potential Conflicts & Gaps

1. **Product Disconnection**: Mock products in `data/categories.ts` break the cart and product detail routes.
   *Resolution*: Eliminate mock products from `data/categories.ts`. Add `categorySlug` and `subcategorySlugs` to `data/products.ts` and query them dynamically.
2. **Category Population**: Some categories (e.g., Awards & Trophies, Costume Idols) do not currently have pre-made catalog products in `data/products.ts`.
   *Resolution*: Do NOT invent fake products. Implement the required Phase 14 polished empty state:
   *"THIS COLLECTION IS TAKING SHAPE. We are developing more objects for this category. If you already have an idea, we can create something specifically for you."* with a direct CTA to `/custom`.
3. **URL Pattern for Subcategories**:
   *Resolution*: Use `/categories/[slug]?subcategory=[subslug]`. This cleanly integrates with Next.js App Router, avoids deeply nested catch-all routing collisions, allows easy bookmarking, and preserves filters upon refresh.

---

## 8. Implementation Plan

- **Phase 2**: Create clean, type-safe `data/categories.ts` with the exact 8 categories and subcategories, and associate products in `data/products.ts`.
- **Phase 3 & 8 & 9**: Build/upgrade `/categories/[slug]` with subcategory filtering, sorting, breadcrumbs, empty states, and custom creation CTAs.
- **Phase 4**: Build luxury editorial `/categories` landing page.
- **Phase 5**: Update homepage `ShopByCategory` section.
- **Phase 6**: Implement Desktop Mega Menu and Mobile Drawer Accordion.
- **Phase 10**: Refine `ProductCard` to show "VIEW IN 3D" only when models exist and support customization tags.
- **Phase 11**: Integrate category and subcategory search in `SearchOverlay.tsx`.
- **Phase 12**: Ensure comprehensive SEO metadata, breadcrumbs, and OpenGraph data for all category pages.
- **Phase 14–17**: Complete accessibility, performance, and empty state verification.
- **Phase 18**: Full build, typecheck, and verification pass, followed by creating `LAYERXYZ_CATEGORIES_IMPLEMENTATION.md`.

