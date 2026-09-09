'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

export function HeroSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth / 2;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    
    // Camera setup - responsive framing
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    const defaultCamDistance = isMobile ? 4.2 : 3.3;
    camera.position.set(0, 0.35, defaultCamDistance);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // @ts-ignore
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Luxury Studio Lighting for Warm Sandstone
    const ambientLight = new THREE.AmbientLight(0xfff7ec, 0.75);
    scene.add(ambientLight);

    // Soft Key Light (top-right-front)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(2.5, 3.5, 3.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0006;
    scene.add(keyLight);

    // Gentle Cool Fill Light (left-mid)
    const fillLight = new THREE.DirectionalLight(0xe8f0ff, 1.2);
    fillLight.position.set(-3.0, 1.5, 2.0);
    scene.add(fillLight);

    // Subtle Rim Light (highlights contours of head, hair, shoulders)
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.6);
    rimLight.position.set(0, 3.2, -2.8);
    scene.add(rimLight);

    // Gentle Frontal Eye-Level Fill (reveals eyes, facial contours, beard, shirt folds)
    const frontLight = new THREE.DirectionalLight(0xfff8ee, 0.85);
    frontLight.position.set(0.4, 0.6, 3.2);
    scene.add(frontLight);

    // Subtle upward bounce from ground
    const bounceLight = new THREE.DirectionalLight(0xf5f3ee, 0.45);
    bounceLight.position.set(0, -2, 1);
    scene.add(bounceLight);

    // Soft Contact Shadow Plane beneath the statue
    const groundGeo = new THREE.PlaneGeometry(12, 12);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.16 });
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
    controls.maxDistance = isMobile ? 6.0 : 4.8;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't look below ground
    controls.minPolarAngle = Math.PI / 6; // Don't flip upside down
    controls.target.set(0, 0.05, 0);

    // Subtle auto-rotation: ~25s per full 360 turn
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.3;

    let resumeAutoRotateTimeout: NodeJS.Timeout | null = null;

    const onUserInteraction = () => {
      setHasInteracted(true);
      controls.autoRotate = false;
      if (resumeAutoRotateTimeout) clearTimeout(resumeAutoRotateTimeout);
      resumeAutoRotateTimeout = setTimeout(() => {
        controls.autoRotate = true;
      }, 3500); // Resume auto-rotate 3.5s after user stops dragging
    };

    controls.addEventListener('start', onUserInteraction);

    // Premium Warm Sandstone Material (#C8B89F) with natural matte stone finish
    const sandstoneMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C8B89F'),
      roughness: 0.76,
      metalness: 0.0,
      flatShading: false,
    });

    // Dark Charcoal / Black Pedestal Material (#161616)
    const pedestalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#161616'),
      roughness: 0.44,
      metalness: 0.05,
      flatShading: false,
    });

    const statueGroup = new THREE.Group();
    scene.add(statueGroup);

    // Setup and normalize mesh
    const setupMesh = (geometry: THREE.BufferGeometry) => {
      geometry.computeVertexNormals();
      geometry.center();
      geometry.computeBoundingBox();

      const box = geometry.boundingBox || new THREE.Box3();
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetHeight = 2.3;
      const scale = targetHeight / (maxDim || 1);
      geometry.scale(scale, scale, scale);

      // Re-center after scale
      geometry.computeBoundingBox();
      const scaledBox = geometry.boundingBox!;
      const yOffset = scaledBox.min.y;

      const mesh = new THREE.Mesh(geometry, sandstoneMaterial);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.y = -yOffset - 1.15; // Align bottom cleanly with ground plane

      statueGroup.add(mesh);
      setLoading(false);
    };

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

            // Apply Warm Sandstone to person bust and Dark Charcoal to pedestal
            const isSandstone = 
              child.material?.name === 'SandstoneMaterial' ||
              (child.geometry?.attributes?.position?.count && child.geometry.attributes.position.count > 10000);

            if (isSandstone) {
              child.material = sandstoneMaterial;
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
        root.position.y = -box.min.y * scale - 1.15; // Sit on ground plane

        statueGroup.add(root);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.warn('GLB load failed, attempting STL fallback:', err);
        const stlLoader = new STLLoader();
        stlLoader.load(
          '/models/kala-final-print.stl',
          (geometry) => {
            // STL CAD coordinates are Z-up; rotate geometry to Y-up
            geometry.rotateX(-Math.PI / 2);
            setupMesh(geometry);
          },
          undefined,
          (stlErr) => {
            console.error('All loaders failed:', stlErr);
            setLoading(false);
          }
        );
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
      controls.maxDistance = mobile ? 6.0 : 4.8;
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
      sandstoneMaterial.dispose();
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
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F3EE]/80 backdrop-blur-sm z-10 transition-opacity duration-500">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#181818] animate-ping" />
            <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#181818] font-medium">
              LOADING OBJECT
            </span>
          </div>
        </div>
      )}

      {/* Subtle user guidance: fades out after first interaction */}
      {!loading && !hasInteracted && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E8E5DE] shadow-sm transition-opacity duration-700">
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#181818]">
            DRAG TO ROTATE
          </span>
        </div>
      )}
    </div>
  );
}

export default HeroSculpture;
