'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface CardModelViewerProps {
  modelUrl: string;
  posterImage?: string;
  isHovered?: boolean;
  productName?: string;
}

// Generate a soft procedural radial shadow texture for clean luxury ground contact
function createSoftRadialShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(20, 20, 20, 0.40)');
    gradient.addColorStop(0.35, 'rgba(20, 20, 20, 0.22)');
    gradient.addColorStop(0.7, 'rgba(20, 20, 20, 0.06)');
    gradient.addColorStop(1, 'rgba(20, 20, 20, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function CardModelViewer({
  modelUrl,
  posterImage,
  isHovered = false,
  productName = 'Product',
}: CardModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // References for dynamic animation values
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const isHoveredRef = useRef(isHovered);
  isHoveredRef.current = isHovered;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;
    let renderer: THREE.WebGLRenderer | null = null;

    // IntersectionObserver to only render when visible in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.15, 3.4);

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      // @ts-ignore
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed for card:', e);
      setHasError(true);
      return () => {
        observer.disconnect();
      };
    }

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 2.2);
    keyLight.position.set(2.2, 3.2, 2.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0ff, 1.1);
    fillLight.position.set(-2.5, 1.6, 1.8);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, 2.6, -2.5);
    scene.add(rimLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.7);
    frontLight.position.set(0, 0.4, 2.8);
    scene.add(frontLight);

    // Realistic Soft Ground Shadow
    const shadowTexture = createSoftRadialShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(2.4, 1.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.75;
    scene.add(shadowMesh);

    // Group for model rotation and hover scaling
    const pivotGroup = new THREE.Group();
    scene.add(pivotGroup);
    modelGroupRef.current = pivotGroup;

    // Load Model
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;

        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.material) {
              child.material.side = THREE.DoubleSide;
              // Soften extreme roughness/metalness values for elegant lighting
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.roughness = Math.max(0.32, child.material.roughness || 0.45);
              }
            }
          }
        });

        // Compute Bounding Box and Center Model
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetHeight = 1.85;
        const scale = targetHeight / (maxDim || 1);

        root.scale.setScalar(scale);
        root.position.x = -center.x * scale;
        root.position.z = -center.z * scale;
        // Align base cleanly with the ground shadow plane
        root.position.y = -box.min.y * scale - 0.75;

        // Give custom nameplate desk sculpture a slight natural initial 3/4 tilt
        if (modelUrl.includes('personalized')) {
          root.rotation.x = 0.2;
          root.position.y += 0.2;
        }

        pivotGroup.add(root);
        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.warn(`Failed to load 3D card model ${modelUrl}:`, err);
        setHasError(true);
      }
    );

    // Animation Loop
    let currentRotSpeed = 0.006;
    let currentScale = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !renderer) return;

      // Smooth hover scale and rotation transitions
      const targetSpeed = isHoveredRef.current ? 0.001 : 0.006;
      const targetScale = isHoveredRef.current ? 1.045 : 1.0;

      currentRotSpeed += (targetSpeed - currentRotSpeed) * 0.06;
      currentScale += (targetScale - currentScale) * 0.08;

      if (pivotGroup) {
        pivotGroup.rotation.y += currentRotSpeed;
        pivotGroup.scale.setScalar(currentScale);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();

      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });
    };
  }, [modelUrl]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none" ref={containerRef}>
      {/* Fallback / Instant Poster Image */}
      {posterImage && (
        <img
          src={posterImage}
          alt={productName}
          className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-700 ease-out pointer-events-none ${
            isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
      )}

      {/* Subtle Loading Shimmer */}
      {!isLoaded && !hasError && !posterImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F5F3EE]/60">
          <div className="w-5 h-5 border-2 border-[#181818]/20 border-t-[#181818] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export default CardModelViewer;
