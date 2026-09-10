'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Maximize, Minimize, RotateCcw, Play, Pause, Compass } from 'lucide-react';

// Authentic Three.js PBR Finish Preset Map
export interface FinishPreset {
  color: string;
  roughness: number;
  metalness: number;
  isPedestal?: boolean;
}

export const FINISH_PRESETS: Record<string, FinishPreset> = {
  'warm-sandstone': { color: '#C8B89F', roughness: 0.76, metalness: 0.0 },
  'light-black-graphite': { color: '#242424', roughness: 0.65, metalness: 0.06 },
  'museum-patina': { color: '#4A3E31', roughness: 0.55, metalness: 0.18 },
  'temple-bronze': { color: '#5A4532', roughness: 0.45, metalness: 0.35 },
  'granite-matte': { color: '#2E3033', roughness: 0.82, metalness: 0.0 },
  'polished-patina': { color: '#3B352E', roughness: 0.50, metalness: 0.25 },
  'chola-bronze': { color: '#543D2B', roughness: 0.45, metalness: 0.40 },
  'ebony-matte': { color: '#1A1A1A', roughness: 0.75, metalness: 0.0 },
  'gilded-accent': { color: '#9E803E', roughness: 0.42, metalness: 0.55 },
  'brushed-graphite': { color: '#333333', roughness: 0.45, metalness: 0.20 },
  'obsidian-matte': { color: '#181818', roughness: 0.72, metalness: 0.0 },
  'chalk-white': { color: '#EFECE6', roughness: 0.75, metalness: 0.0 },
  'smooth-matte': { color: '#EAE5DC', roughness: 0.60, metalness: 0.02 },
  'raw-layer': { color: '#D8D2C5', roughness: 0.52, metalness: 0.05 },
  'satin-sealed': { color: '#2A2A28', roughness: 0.38, metalness: 0.12 },
  'bronze-effect': { color: '#5C4533', roughness: 0.45, metalness: 0.35 },
  'hand-painted': { color: '#3F3D56', roughness: 0.50, metalness: 0.10 },
  'raw': { color: '#C8B89F', roughness: 0.70, metalness: 0.0 },
};

export interface ProductViewerProps {
  modelPath?: string;
  modelUrl?: string;
  fallbackColor?: string;
  color?: string;
  productName?: string;
  activeFinishSlug?: string;
  posterImage?: string;
}

export function ProductViewer({
  modelPath,
  modelUrl,
  fallbackColor = '#C8B89F',
  color,
  productName = 'Product',
  activeFinishSlug = 'warm-sandstone',
  posterImage,
}: ProductViewerProps) {
  const effectiveModelPath = modelPath || modelUrl;

  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References for Three.js lifecycle
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Default camera target & position for reset
  const defaultCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.4, 3.4));
  const defaultTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Determine current PBR material attributes based on activeFinishSlug
  const getMaterialPreset = useCallback((): FinishPreset => {
    if (activeFinishSlug && FINISH_PRESETS[activeFinishSlug]) {
      return FINISH_PRESETS[activeFinishSlug];
    }
    return {
      color: color || fallbackColor,
      roughness: 0.65,
      metalness: 0.05,
    };
  }, [activeFinishSlug, color, fallbackColor]);

  // Apply PBR material parameters to loaded 3D model meshes
  const applyMaterialToModel = useCallback(
    (group: THREE.Group, preset: FinishPreset) => {
      const isKalaModel = effectiveModelPath?.includes('kala-final-print');

      const pedestalMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#141414'),
        roughness: 0.70,
        metalness: 0.02,
      });

      const activeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(preset.color),
        roughness: preset.roughness,
        metalness: preset.metalness,
      });

      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (isKalaModel) {
            const isStatueBust =
              child.material?.name === 'LightBlackMaterial' ||
              child.material?.name === 'LightGreyMaterial' ||
              child.material?.name === 'SandstoneMaterial' ||
              (child.geometry?.attributes?.position?.count && child.geometry.attributes.position.count > 10000);

            if (isStatueBust) {
              child.material = activeMaterial;
            } else {
              child.material = pedestalMaterial;
            }
          } else {
            // General sculpture models (Nandi, Nataraja, Name, etc.)
            child.material = activeMaterial;
          }
        }
      });
    },
    [effectiveModelPath]
  );

  // Initialize Three.js Scene, Camera, Controls, Lights
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Warm Ivory studio background
    scene.background = new THREE.Color('#FAFAF8');

    // Camera setup with constrained framing
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    const initialCamDistance = isMobile ? 4.2 : 3.4;
    camera.position.set(0, 0.35, initialCamDistance);
    defaultCamPosRef.current.set(0, 0.35, initialCamDistance);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // @ts-ignore
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // OrbitControls with smooth inertia
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false; // Keep object always centered
    controls.minDistance = isMobile ? 2.2 : 1.8;
    controls.maxDistance = isMobile ? 5.8 : 5.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't dip below studio floor
    controls.minPolarAngle = Math.PI / 6; // Don't invert upside down
    controls.target.set(0, 0, 0);
    defaultTargetRef.current.set(0, 0, 0);

    // Auto-rotation handling
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 1.0;

    const onUserInteraction = () => {
      setHasInteracted(true);
      controls.autoRotate = false;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (!prefersReducedMotion && autoRotate) {
        resumeTimerRef.current = setTimeout(() => {
          if (controlsRef.current) {
            controlsRef.current.autoRotate = true;
          }
        }, 4000);
      }
    };

    controls.addEventListener('start', onUserInteraction);

    // Premium Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Warm Soft Key Light
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    keyLight.position.set(3.2, 4.2, 3.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Gentle Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0xe8f0fa, 1.2);
    fillLight.position.set(-3.2, 2.0, 2.2);
    scene.add(fillLight);

    // Rim Contour Light
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, 3.4, -3.0);
    scene.add(rimLight);

    // Soft eye-level frontal fill for facial/filigree contours
    const frontLight = new THREE.DirectionalLight(0xfffcf5, 0.9);
    frontLight.position.set(0.2, 0.5, 3.2);
    scene.add(frontLight);

    // Studio Contact Shadow Ground Plane
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.15;
    ground.receiveShadow = true;
    scene.add(ground);

    // Model Container Group
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Load Model
    if (effectiveModelPath) {
      setLoading(true);
      const loader = new GLTFLoader();
      loader.load(
        effectiveModelPath,
        (gltf) => {
          const root = gltf.scene;

          // Compute bounding box & auto-scale to fit studio stage
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

          // Apply initial PBR material
          applyMaterialToModel(root, getMaterialPreset());

          modelGroup.add(root);
          setLoading(false);
        },
        undefined,
        (err) => {
          console.warn('ProductViewer GLB load failed:', err);
          setHasError(true);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
      setHasError(true);
    }

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
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const mobile = window.innerWidth < 768;

      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.minDistance = mobile ? 2.2 : 1.8;
        controlsRef.current.maxDistance = mobile ? 5.8 : 5.0;
      }

      rendererRef.current.setSize(w, h);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      setTimeout(handleResize, 100);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      controls.removeEventListener('start', onUserInteraction);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      cancelAnimationFrame(animationId);
      controls.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();

      // Dispose model geometry & materials
      modelGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
    };
  }, [effectiveModelPath, applyMaterialToModel, getMaterialPreset, autoRotate]);

  // Live PBR Material Update when activeFinishSlug changes
  useEffect(() => {
    if (!modelGroupRef.current) return;
    const preset = getMaterialPreset();
    applyMaterialToModel(modelGroupRef.current, preset);
  }, [activeFinishSlug, applyMaterialToModel, getMaterialPreset]);

  // Toggle Auto-rotation
  const toggleAutoRotate = () => {
    const nextState = !autoRotate;
    setAutoRotate(nextState);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = nextState;
    }
  };

  // Reset Camera View
  const handleReset = () => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.copy(defaultCamPosRef.current);
      controlsRef.current.target.copy(defaultTargetRef.current);
      controlsRef.current.reset();
    }
  };

  // Fullscreen Toggle
  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] bg-[#FAFAF8] rounded-3xl overflow-hidden border border-[#E8E5DE] shadow-xs select-none touch-none flex items-center justify-center"
    >
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAFAF8]/80 backdrop-blur-xs z-10 transition-opacity duration-500">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#181817] animate-ping" />
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#181817] font-medium">
              PREPARING 3D OBJECT
            </span>
          </div>
        </div>
      )}

      {/* Fallback image if model fails or does not exist */}
      {hasError && posterImage && (
        <div className="absolute inset-0 flex items-center justify-center p-8 z-0">
          <img
            src={posterImage}
            alt={productName}
            className="max-h-[85%] max-w-[85%] object-contain drop-shadow-xl"
          />
        </div>
      )}

      {/* VIEW IN 3D Badge (Top Left) */}
      {!hasError && (
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E5DE] text-[10px] font-mono tracking-widest uppercase text-[#181817] shadow-xs">
            <Compass size={12} className="text-[#6F6B63]" />
            VIEW IN 3D
          </span>
        </div>
      )}

      {/* Interaction Hint (Fades after first interaction) */}
      {!loading && !hasInteracted && !hasError && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-10 bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E8E5DE] shadow-xs transition-opacity duration-700">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#181817]">
            DRAG TO ROTATE • SCROLL TO ZOOM
          </span>
        </div>
      )}

      {/* Minimal Floating Studio Controls (Bottom Center) */}
      {!hasError && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-[#E8E5DE] transition-opacity hover:opacity-100">
          <button
            onClick={toggleAutoRotate}
            className="p-2 text-[#6F6B63] hover:text-[#181817] transition-colors rounded-full hover:bg-[#F4F1EA]"
            aria-label={autoRotate ? 'Pause 3D rotation' : 'Play 3D rotation'}
            title={autoRotate ? 'Pause rotation' : 'Start rotation'}
          >
            {autoRotate ? <Pause size={15} /> : <Play size={15} />}
          </button>

          <div className="w-px h-4 bg-[#E8E5DE]" />

          <button
            onClick={handleReset}
            className="p-2 text-[#6F6B63] hover:text-[#181817] transition-colors rounded-full hover:bg-[#F4F1EA]"
            aria-label="Reset 3D camera view"
            title="Reset camera"
          >
            <RotateCcw size={15} />
          </button>

          <div className="w-px h-4 bg-[#E8E5DE]" />

          <button
            onClick={handleFullscreen}
            className="p-2 text-[#6F6B63] hover:text-[#181817] transition-colors rounded-full hover:bg-[#F4F1EA]"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'View in fullscreen'}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductViewer;
