'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Maximize, RotateCcw, Play, Pause } from 'lucide-react';

const swatches = [
  { name: 'Obsidian', color: '#1E1E1E' },
  { name: 'Bone', color: '#ECEAE4' },
  { name: 'Graphite', color: '#2A2D30' },
  { name: 'Warm Clay', color: '#8B8680' },
];

export interface ProductViewerProps {
  modelPath?: string;
  modelUrl?: string;
  fallbackColor?: string;
  color?: string;
  productName?: string;
}

export function ProductViewer({
  modelPath,
  modelUrl,
  fallbackColor = '#8B8680',
  color,
  productName = 'Product',
}: ProductViewerProps) {
  const effectiveModelPath = modelPath || modelUrl;
  const effectiveColor = color || fallbackColor;

  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const [activeColor, setActiveColor] = useState(effectiveColor);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#FAFAF8');
    // Soft fog matching background
    scene.fog = new THREE.Fog('#FAFAF8', 4, 10);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // @ts-ignore
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 6;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground

    controls.addEventListener('start', () => setInteracted(true));

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#fff0dd', 2);
    keyLight.position.set(2, 4, 2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#e6f0ff', 1);
    fillLight.position.set(-2, 3, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#ffffff', 1.5);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Ground Plane
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.1 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.8;
    ground.receiveShadow = true;
    scene.add(ground);

    const loadFallback = () => {
      const geo = new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: activeColor,
        roughness: 0.4,
        metalness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      modelRef.current = mesh;
      setLoading(false);
    };

    if (effectiveModelPath) {
      const loader = new GLTFLoader();
      loader.load(
        effectiveModelPath,
        (gltf) => {
          gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                // Keep original maps but adjust base properties
                child.material.roughness = Math.max(0.3, child.material.roughness || 0.4);
                child.material.metalness = Math.min(0.3, child.material.metalness || 0.1);
              }
            }
          });
          
          // Center and scale model
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim;
          
          gltf.scene.scale.setScalar(scale);
          gltf.scene.position.sub(center.multiplyScalar(scale));
          
          scene.add(gltf.scene);
          modelRef.current = gltf.scene;
          setLoading(false);
        },
        undefined,
        (err) => {
          console.error('Error loading model:', err);
          setError(true);
          loadFallback();
        }
      );
    } else {
      loadFallback();
    }

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = 2.0;
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Basic cleanup
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof Array) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [effectiveModelPath]);

  // Update color when swatch changes
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.color.set(activeColor);
        }
      });
    }
  }, [activeColor]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full h-[600px] md:h-[800px] rounded-2xl overflow-hidden bg-[#FAFAF8] border border-[#E8E5DE]" ref={containerRef}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAF8] z-10">
          <div className="w-8 h-8 border-2 border-[#E8E5DE] border-t-[#181818] rounded-full animate-spin"></div>
        </div>
      )}

      {!interacted && !loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-sm font-medium text-[#181818] transition-opacity duration-500">
          Drag to explore
        </div>
      )}

      {/* Swatches */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
        {swatches.map((swatch) => (
          <button
            key={swatch.name}
            onClick={() => setActiveColor(swatch.color)}
            className={`w-8 h-8 rounded-full border-2 transition-transform ${activeColor === swatch.color ? 'scale-110 border-[#181818]' : 'border-white shadow-sm hover:scale-105'}`}
            style={{ backgroundColor: swatch.color }}
            aria-label={`Change color to ${swatch.name}`}
            title={swatch.name}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-3 rounded-full shadow-sm border border-[#E8E5DE]">
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          className="p-2 text-[#777777] hover:text-[#181818] transition-colors rounded-full hover:bg-[#F5F3EE]"
          aria-label={autoRotate ? "Pause rotation" : "Play rotation"}
          title={autoRotate ? "Pause" : "Play"}
        >
          {autoRotate ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <div className="w-px h-6 bg-[#E8E5DE]"></div>
        <button 
          onClick={handleReset}
          className="p-2 text-[#777777] hover:text-[#181818] transition-colors rounded-full hover:bg-[#F5F3EE]"
          aria-label="Reset view"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-[#E8E5DE]"></div>
        <button 
          onClick={handleFullscreen}
          className="p-2 text-[#777777] hover:text-[#181818] transition-colors rounded-full hover:bg-[#F5F3EE]"
          aria-label="Toggle fullscreen"
          title="Fullscreen"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ProductViewer;
