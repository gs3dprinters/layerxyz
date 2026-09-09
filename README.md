# Layerxyz — Custom 3D Printing & Fabrication Studio

> **We turn digital ideas into physical objects.**  
> Professional custom 3D printing and fabrication studio based in Tiruppur, Tamil Nadu, India.

---

## Overview

Layerxyz is a modern web application and digital showroom designed for high-end custom 3D printing, rapid prototyping, architectural studies, character figurines, and large-format multi-piece modular sculptures.

- **Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion v12, Three.js, Lucide React
- **Aesthetic**: Minimal, dark studio design system with editorial typography, tactile grain overlay, 1px borders, and subtle electric lime accents.
- **Interactive 3D**: Real-time Three.js viewport with studio rim/key lighting, OrbitControls, wireframe/solid toggle, and dynamic material shaders.
- **Configurator**: 5-stage project inquiry flow supporting 3D mesh files (.stl, .obj, .3mf, .step, .zip, etc.).

---

## Features

- **Hero Interactive 3D Sculpture**: Real-time parametric layered monolith rendered with Three.js.
- **Interactive Scale Visualizer**: Dimensional comparisons from desktop figurines (50mm) to architectural sculptures (2500mm+).
- **Interactive 3D Configurator**: Drag to rotate, zoom, wireframe toggle, and material preview.
- **Selected Works Portfolio**: Categorized project gallery with individual dynamic deep-dive pages (`/work/[slug]`).
- **4-Stage Fabrication Pipeline**: Upload → Prepare → Slicing & Printing → Hand-Finished Surface Conditioning.
- **Substrates & Materials**: Detailed specifications for PLA Pro+, Matte Carbon PETG, Studio PLA, and High-Detail UV Resin.
- **Multi-Step Project Inquiries**: 5-step configurator at `/start-a-project`.
- **Local & Global SEO**: Dynamic sitemap (`/sitemap.xml`), `robots.txt`, OpenGraph cards, and schema.org `LocalBusiness` structured data for Tiruppur, Tamil Nadu.

---

## Getting Started

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/gs3dprinters/layerxyz.git
cd layerxyz

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

```
├── app/
│   ├── layout.tsx            # Global layout, metadata & LocalBusiness schema
│   ├── page.tsx              # Master homepage with all editorial sections
│   ├── globals.css           # Design tokens, scrollbar & animations
│   ├── sitemap.ts            # Dynamic sitemap generator
│   ├── robots.ts             # Robots.txt generator
│   ├── not-found.tsx         # Branded 404 page
│   ├── work/
│   │   ├── page.tsx          # Portfolio archive
│   │   └── [slug]/page.tsx   # Dynamic project detail routes
│   ├── services/page.tsx     # Services & capabilities breakdown
│   ├── process/page.tsx      # Fabrication methodology & finishing
│   ├── about/page.tsx        # Studio philosophy & Tiruppur roots
│   └── start-a-project/      # 5-step project quote configurator
├── components/
│   ├── 3d/                   # Three.js canvases & controls
│   ├── layout/               # Navbar, MobileMenu, Footer, CustomCursor, WhatsApp
│   ├── sections/             # Editorial homepage components
│   └── ui/                   # Buttons, Badges, Cards, Accordion
├── data/                     # Decoupled project, service, material & FAQ data
├── lib/                      # API abstraction, analytics, utilities
└── public/                   # Images, models, and static assets
```

---

## Customization

- **Contact & WhatsApp**: Update `.env.local` (see `.env.example`).
- **3D CAD Model**: Place your GLTF/GLB model at `public/models/model.glb` to automatically display it in the 3D viewer.
- **Projects**: Edit `data/projects.ts` to add or update your client portfolio.

---

## License

Private / Commercial — © 2026 Layerxyz. All rights reserved.
