'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function HeroSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth / 2;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = window.innerWidth < 768;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    
    // Camera setup - responsive framing
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    const defaultCamDistance = isMobile ? 4.3 : 3.3;
    camera.position.set(0, 0.35, defaultCamDistance);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // @ts-ignore
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Luxury Studio Lighting for Warm Sandstone Sculpture
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Soft Warm Key Light (top-right-front)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.6);
    keyLight.position.set(2.8, 3.8, 3.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Gentle Cool Fill Light (left-mid) to balance warm key
    const fillLight = new THREE.DirectionalLight(0xe8eef5, 1.2);
    fillLight.position.set(-3.2, 1.8, 2.2);
    scene.add(fillLight);

    // Rim Light (highlights contours of hair, shoulders from ivory backdrop)
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(0, 3.4, -2.8);
    scene.add(rimLight);

    // Gentle Frontal Eye-Level Fill (reveals eyes, facial contours, beard, fabric folds)
    const frontLight = new THREE.DirectionalLight(0xfffbf5, 1.1);
    frontLight.position.set(0.3, 0.7, 3.4);
    scene.add(frontLight);

    // Subtle upward ground bounce
    const bounceLight = new THREE.DirectionalLight(0xf4f1ea, 0.6);
    bounceLight.position.set(0, -2, 1);
    scene.add(bounceLight);

    // Soft Contact Shadow Plane beneath the statue
    const groundGeo = new THREE.PlaneGeometry(12, 12);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.15;
    ground.receiveShadow = true;
    scene.add(ground);

    // OrbitControls with smooth inertia
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false; // Keep statue always centered
    controls.minDistance = isMobile ? 2.8 : 2.2;
    controls.maxDistance = isMobile ? 5.5 : 4.8;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't look below ground
    controls.minPolarAngle = Math.PI / 6; // Don't flip upside down
    controls.target.set(0, 0.05, 0);

    // Subtle auto-rotation if motion is not reduced
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 1.0;

    let resumeAutoRotateTimeout: NodeJS.Timeout | null = null;

    const onUserInteraction = () => {
      setHasInteracted(true);
      controls.autoRotate = false;
      if (resumeAutoRotateTimeout) clearTimeout(resumeAutoRotateTimeout);
      if (!prefersReducedMotion) {
        resumeAutoRotateTimeout = setTimeout(() => {
          controls.autoRotate = true;
        }, 4000); // Resume auto-rotate 4s after user stops dragging
      }
    };

    controls.addEventListener('start', onUserInteraction);

    // Premium Warm Sandstone Sculpture Material (#C8B89F)
    const statueMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C8B89F'),
      roughness: 0.76,
      metalness: 0.0,
      flatShading: false,
    });

    // Deep Dark Charcoal / Black Pedestal Material (#141414)
    const pedestalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141414'),
      roughness: 0.70,
      metalness: 0.02,
      flatShading: false,
    });

    const statueGroup = new THREE.Group();
    scene.add(statueGroup);

    // Load actual GLB model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/models/kala-final-print.glb',
      (gltf) => {
        const root = gltf.scene;
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Apply Warm Sandstone to person bust and Deep Charcoal to pedestal
            const isStatue = 
              child.material?.name === 'LightBlackMaterial' ||
              child.material?.name === 'LightGreyMaterial' ||
              child.material?.name === 'SandstoneMaterial' ||
              (child.geometry?.attributes?.position?.count && child.geometry.attributes.position.count > 10000);

            if (isStatue) {
              child.material = statueMaterial;
            } else {
              child.material = pedestalMaterial;
            }
          }
        });

        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetHeight = 2.3;
        const scale = targetHeight / (maxDim || 1);

        root.scale.setScalar(scale);
        root.position.x = -center.x * scale;
        root.position.z = -center.z * scale;
        root.position.y = -box.min.y * scale - 1.15; // Sit cleanly on ground plane

        statueGroup.add(root);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Hero GLB load failed:', err);
        setHasError(true);
        setLoading(false);
      }
    );

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const mobile = window.innerWidth < 768;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      controls.minDistance = mobile ? 2.8 : 2.2;
      controls.maxDistance = mobile ? 5.5 : 4.8;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', onUserInteraction);
      if (resumeAutoRotateTimeout) clearTimeout(resumeAutoRotateTimeout);
      cancelAnimationFrame(animationId);
      controls.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      statueMaterial.dispose();
      pedestalMaterial.dispose();
      groundGeo.dispose();
      groundMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none touch-none">
      {/* Three.js canvas container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
      />

      {/* Elegant minimal loading indicator */}
      {loading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F4F1EA]/70 backdrop-blur-xs z-10 transition-opacity duration-500">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#181817] animate-ping" />
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#181817] font-medium">
              PREPARING SCULPTURE
            </span>
          </div>
        </div>
      )}

      {/* Fallback image if WebGL fails */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img 
            src="/images/products/kala-statue-optimized.jpg" 
            alt="Layerxyz Kala Portrait Sculpture" 
            className="max-h-[80%] max-w-[80%] object-contain drop-shadow-2xl"
          />
        </div>
      )}

      {/* Subtle user guidance: fades out after first interaction */}
      {!loading && !hasInteracted && !hasError && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E8E5DE] shadow-xs transition-opacity duration-700">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#181817]">
            DRAG TO ROTATE
          </span>
        </div>
      )}
    </div>
  );
}

export default HeroSculpture;
