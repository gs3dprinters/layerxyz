# Layerxyz — Category Shopping Experience Implementation

## 1. Architecture & Design Overview
The Category Shopping Experience transforms Layerxyz into a premium, luxury physical-object destination while upholding truthful physical craftsmanship. Built upon Next.js 15 App Router with TypeScript and Tailwind CSS, the implementation adheres strictly to the established warm luxury aesthetic (`#F4F1EA`, `#171716`, `#C8B89F`, `#E8E5DE`).

Key architectural principles:
- **Centralized, Type-Safe Category Architecture**: The 8 categories and their specific subcategories are strictly modeled in `data/categories.ts`.
- **Integrated Product Categorization**: Real physical products in `data/products.ts` are mapped directly to their primary and secondary category slugs, subcategory slugs, and customizable status.
- **Truthful Presentation**: No fake placeholder products or unverifiable marketing statistics. Categories and subcategories with objects in development render a polished empty state guiding visitors to commission custom objects.
- **Omnipresent Category Discovery**: Desktop Mega Menu dropdown, mobile accordion navigation, homepage category section, dedicated category landing page, and integrated multi-entity search.

---

## 2. Category Model Structure (`data/categories.ts`)
```typescript
export type Subcategory = {
  slug: string;
  name: string;
  description?: string;
};

export type Category = {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  subcategories: Subcategory[];
  image?: string;
  featured?: boolean;
};
```

### The 8 Core Categories & Subcategory Taxonomy
1. **Gifts** (`gifts`)
   - `personalized-gifts`: Personalized Gifts
   - `name-photo-gifts`: Name & Photo Gifts
   - `keychains`: Keychains
   - `couple-gifts`: Couple Gifts
   - `custom-gift-items`: Custom Gift Items
2. **God Idols** (`god-idols`)
   - `ganesha`: Ganesha
   - `murugan`: Murugan
   - `krishna`: Krishna
   - `shiva`: Shiva
   - `lakshmi`: Lakshmi
   - `other-deity-idols`: Other Deity Idols
3. **Leaders & Icons** (`leaders-icons`)
   - `political-leaders`: Political Leaders
   - `social-reformers`: Social Reformers
   - `historical-personalities`: Historical Personalities
   - `tamil-icons`: Tamil Icons
   - `famous-personalities`: Famous Personalities
4. **Costume Idols** (`costume-idols`)
   - `movie-characters`: Movie Characters
   - `superheroes`: Superheroes
   - `action-figures`: Action Figures
   - `custom-characters`: Custom Characters
   - `character-miniatures`: Character Miniatures
5. **Home Décor** (`home-decor`)
   - `showpieces`: Showpieces
   - `decorative-sculptures`: Decorative Sculptures
   - `table-decor`: Table Décor
   - `wall-decor`: Wall Décor
   - `customized-decor`: Customized Décor
6. **Toys & Figurines** (`toys-figurines`)
   - `miniatures`: Miniatures
   - `collectible-figures`: Collectible Figures
   - `character-figures`: Character Figures
   - `custom-figurines`: Custom Figurines
7. **Awards & Trophies** (`awards-trophies`)
   - `custom-trophies`: Custom Trophies
   - `awards`: Awards
   - `mementos`: Mementos
   - `corporate-event-trophies`: Corporate/Event Trophies
8. **Custom Creations** (`custom-creations`)
   - `custom-3d-models`: Custom 3D Models
   - `personalized-designs`: Personalized Designs
   - `customer-provided-ideas`: Customer-Provided Ideas
   - `made-to-order-products`: Made-to-Order Products

---

## 3. Product Schema Extensions (`data/products.ts`)
The `Product` interface was extended with:
- `categorySlug?: string`: Primary category slug matching `CATEGORIES`.
- `categorySlugs?: string[]`: Multi-category memberships.
- `subcategorySlugs?: string[]`: Array of subcategory slugs for filtering.
- `isCustomizable?: boolean`: Indicates custom fabrication eligibility (triggers `CUSTOMIZABLE` status badge).

Query functions exported:
- `getProductsByCategory(categorySlug: string, subcategorySlug?: string): Product[]`
- `getCategoryProductCount(categorySlug: string): number`
- `getCategorySubcategoryProductCount(categorySlug: string, subcategorySlug: string): number`
- `searchProducts(query: string): Product[]` (matches names, descriptions, categories, and subcategories).

---

## 4. Component Breakdown & Enhancements

### `components/ui/ProductCard.tsx`
- **Conditional 3D Action**: Displays `"VIEW IN 3D"` if and only if `product.modelUrl` or `product.model` genuinely exists; otherwise renders `"VIEW OBJECT"`.
- **Badges**: Supports `CUSTOMIZABLE`, `CUSTOM`, `NEW`, `BESTSELLER`, and `LIMITED`.
- **Interactivity**: Seamless 3D viewport on hover for verified models, with fallback poster presentation.

### `components/layout/Navbar.tsx`
- **Desktop Mega Menu**: Hovering or clicking `"CATEGORIES"` activates a wide, warm ivory backdrop-blur mega dropdown.
- Displays all 8 categories across a 4-column balanced grid with their respective subcategories.
- Includes a bottom quick-action bar with `"EXPLORE ALL 8 CATEGORIES"` and custom commission links.
- Keyboard accessible (`Escape` key dismisses menu), handles intent timeouts, and automatically closes upon navigation.

### `components/layout/MobileMenu.tsx`
- **Categories Accordion**: Seamless collapsible menu section within the mobile drawer.
- Shows direct links to each category and `/categories` landing page with smooth Framer Motion height animation.

### `components/layout/SearchOverlay.tsx`
- **Multi-Entity Search**: Live query execution against both the product catalog and the category/subcategory taxonomy.
- Clean category result cards with direct navigation to specific subcategory filters.
- Replaced non-brand colors with pure charcoal/warm ivory palette.

### `components/sections/ShopByCategory.tsx` (Homepage)
- Direct discovery of the 8 categories with numeric indicators (`01`–`08`) and dynamic product counts.
- Active category deep-dive panel with subcategory tags and featured real product cards.
- Quick browse grid highlighting all 8 categories.

### `app/categories/page.tsx` (Category Hub)
- Curated editorial magazine layout.
- Individual category cards featuring index counters, description, product count/status, subcategory chip links, and direct catalogue CTA.
- Bottom bespoke commission banner linking to `/custom`.

### `app/categories/[slug]/page.tsx` & `CategoryDetailClient.tsx` (Dynamic Category View)
- Server-rendered with dynamic metadata and Next.js 15 Suspense boundaries for CSR bailout safety.
- Breadcrumb navigation (`Home / Categories / [Category Name]`).
- Interactive subcategory pills with real-time product counts.
- URL query parameter synchronization (`?subcategory=[subslug]`).
- Sort controls (Featured, Price: Low to High, Price: High to Low, Name A-Z).
- Responsive grid of `ProductCard` components.
- **Polished Empty State**: When no objects exist in a category/subcategory, renders:
  > **THIS COLLECTION IS TAKING SHAPE**  
  > *We are developing more objects for this category. If you already have an idea, we can create something specifically for you.*  
  > `[COMMISSION A CUSTOM PIECE →]` (linking to `/custom`)
- Studio Bespoke Callout card and neighbor category pagination (`← PREVIOUS` / `NEXT →`).

---

## 5. Live Route Inventory
- `/categories` — Main Category Directory
- `/categories/gifts` — Gifts Category
- `/categories/god-idols` — God Idols Category
- `/categories/leaders-icons` — Leaders & Icons Category
- `/categories/costume-idols` — Costume Idols Category
- `/categories/home-decor` — Home Décor Category
- `/categories/toys-figurines` — Toys & Figurines Category
- `/categories/awards-trophies` — Awards & Trophies Category
- `/categories/custom-creations` — Custom Creations Category

---

## 6. SEO & Static Generation Verification
- `app/sitemap.ts` includes `/categories` and all 8 `/categories/[slug]` routes with priority `0.85`.
- `generateStaticParams` ensures static HTML generation for all 8 categories during `next build`.
- `generateMetadata` delivers category-specific title, description, and keywords.
- Build results: 55/55 routes successfully generated, 0 TypeScript errors.
