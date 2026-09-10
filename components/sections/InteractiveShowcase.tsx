'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ShowroomObject {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  modelUrl: string;
  slug: string;
  material: string;
}

const SHOWROOM_OBJECTS: ShowroomObject[] = [
  {
    id: 'kala-portrait',
    name: 'Custom Portrait Sculpture',
    subtitle: 'Personalized sculptural bust created from photographs',
    price: 'From ₹1,499',
    modelUrl: '/models/kala-final-print.glb',
    slug: 'custom-portrait-sculpture',
    material: 'Warm Sandstone & Charcoal Base',
  },
  {
    id: 'heritage-nandi',
    name: 'Heritage Nandi Temple Sculpture',
    subtitle: 'Intricate Indian cultural icon with ornate ceremonial trappings',
    price: formatPrice(2499),
    modelUrl: '/models/nandi-temple-sculpture.glb',
    slug: 'heritage-nandi-sculpture',
    material: 'Dark Basalt Finish',
  },
  {
    id: 'nataraja-statement',
    name: 'Nataraja Statement Sculpture',
    subtitle: 'Cosmic dancer sculpture with ring of sacred flames',
    price: formatPrice(4999),
    modelUrl: '/models/nataraja-statement-sculpture.glb',
    slug: 'nataraja-statement-sculpture',
    material: 'Museum Bronze Patina',
  },
];

export default function InteractiveShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentObject = SHOWROOM_OBJECTS[currentIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Three.js scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  // Initialize Three.js scene once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0.4, isMobile ? 4.2 : 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // @ts-ignore
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Warm Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe5eef5, 1.2);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Contact shadow ground
    const groundGeo = new THREE.PlaneGeometry(12, 12);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.15;
    ground.receiveShadow = true;
    scene.add(ground);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2.0;
    controls.maxDistance = 5.2;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minPolarAngle = Math.PI / 6;
    controls.target.set(0, 0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 1.0;

    const onStart = () => {
      setHasInteracted(true);
      controls.autoRotate = false;
    };
    controls.addEventListener('start', onStart);

    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', onStart);
      cancelAnimationFrame(animationId);
      controls.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();
    };
  }, []);

  // Load active model whenever currentIndex changes
  useEffect(() => {
    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    setLoading(true);

    // Clear previous model from group
    while (modelGroup.children.length > 0) {
      const child = modelGroup.children[0];
      modelGroup.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry?.dispose();
      }
    }

    const loader = new GLTFLoader();
    loader.load(
      currentObject.modelUrl,
      (gltf) => {
        const root = gltf.scene;

        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.roughness = Math.max(0.4, child.material.roughness || 0.6);
            }
          }
        });

        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetHeight = 2.2;
        const scale = targetHeight / (maxDim || 1);

        root.scale.setScalar(scale);
        root.position.x = -center.x * scale;
        root.position.z = -center.z * scale;
        root.position.y = -box.min.y * scale - 1.15; // Ground alignment

        modelGroup.add(root);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Showroom model load failed:', err);
        setLoading(false);
      }
    );
  }, [currentIndex, currentObject.modelUrl]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWROOM_OBJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SHOWROOM_OBJECTS.length) % SHOWROOM_OBJECTS.length);
  };

  return (
    <section className="bg-[#EAE5DC] py-28 md:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            INTERACTIVE SHOWROOM
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#171716] mb-4 leading-tight">
            SEE THE OBJECT<br className="hidden sm:inline" /> BEFORE YOU MAKE IT YOURS.
          </h2>
          <p className="text-base md:text-lg text-[#6F6B63] max-w-xl mx-auto leading-relaxed">
            Explore selected Layerxyz objects from every angle before choosing your piece.
          </p>

          {/* Model Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {SHOWROOM_OBJECTS.map((obj, index) => (
              <button
                key={obj.id}
                onClick={() => setCurrentIndex(index)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                  currentIndex === index
                    ? 'bg-[#171716] text-[#F4F1EA] shadow-xs'
                    : 'bg-white/60 text-[#6F6B63] hover:bg-white hover:text-[#171716] border border-[#D4D0C8]/60'
                }`}
              >
                {obj.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3D Showroom Stage Container */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] relative rounded-3xl overflow-hidden bg-[#FAFAF8] border border-[#E8E5DE] shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
        >
          {/* Canvas container */}
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing outline-none" />

          {/* Minimal Loading State */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAF8]/70 backdrop-blur-xs z-10 transition-opacity">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#171716] animate-ping" />
                <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#171716] font-medium">
                  LOADING OBJECT
                </span>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous Object"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E5DE] text-[#171716] flex items-center justify-center hover:bg-white transition-all shadow-xs"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Object"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E5DE] text-[#171716] flex items-center justify-center hover:bg-white transition-all shadow-xs"
          >
            <ChevronRight size={20} />
          </button>

          {/* Subtle drag hint */}
          {!loading && !hasInteracted && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E8E5DE] shadow-xs">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#171716]">
                DRAG TO ROTATE • SCROLL TO ZOOM
              </span>
            </div>
          )}

          {/* Bottom Bar: Clean Product Metadata & Direct Link */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 bg-gradient-to-t from-white/95 via-white/80 to-transparent backdrop-blur-xs flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#6F6B63] block mb-1">
                {currentObject.material}
              </span>
              <h3 className="text-lg sm:text-2xl font-medium text-[#171716]">
                {currentObject.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6B63] max-w-md hidden sm:block mt-0.5">
                {currentObject.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-5">
              <span className="text-base sm:text-xl font-semibold text-[#171716]">
                {currentObject.price}
              </span>
              <Link
                href={`/product/${currentObject.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171716] text-[#F4F1EA] rounded-full text-xs font-medium tracking-wide hover:bg-[#2A2A28] transition-colors"
              >
                VIEW DETAILS
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}