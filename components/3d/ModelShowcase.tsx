"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RotateCw, ZoomIn, RefreshCw, Eye, Sparkles, Layers } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ModelShowcaseProps {
  modelPath?: string;
}

const MATERIAL_PRESETS = [
  { id: "obsidian", name: "Obsidian Black", color: 0x141414, roughness: 0.35, metalness: 0.15 },
  { id: "bone-white", name: "Bone White PLA", color: 0xeeece8, roughness: 0.45, metalness: 0.05 },
  { id: "carbon", name: "Carbon Graphite", color: 0x22252a, roughness: 0.65, metalness: 0.25 },
  { id: "accent", name: "Studio Clay", color: 0x3d3936, roughness: 0.7, metalness: 0.0 },
];

export function ModelShowcase({ modelPath = "/models/model.glb" }: ModelShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modelType, setModelType] = useState<"gltf" | "procedural">("procedural");

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.maxDistance = 7;
    controls.minDistance = 1.8;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controlsRef.current = controls;

    // Lighting (Studio Setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4ff3f, 1.6);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x607080, 0.7);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    // Soft Floor Shadow Disc
    const floorGeo = new THREE.PlaneGeometry(6, 6);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.3 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.1;
    floor.receiveShadow = true;
    scene.add(floor);

    // Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Create Base Materials
    const baseMat = new THREE.MeshStandardMaterial({
      color: MATERIAL_PRESETS[0].color,
      roughness: MATERIAL_PRESETS[0].roughness,
      metalness: MATERIAL_PRESETS[0].metalness,
      wireframe: false,
    });
    materialsRef.current = [baseMat];

    // Try loading GLTF model, fallback to procedural sculpture
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        modelGroup.clear();
        const loadedModel = gltf.scene;

        // Auto center and scale model
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z);
        const scale = 2.0 / maxAxis;
        loadedModel.scale.setScalar(scale);
        loadedModel.position.sub(center.multiplyScalar(scale));

        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.castShadow = true;
            m.receiveShadow = true;
            m.material = baseMat;
          }
        });

        modelGroup.add(loadedModel);
        setModelType("gltf");
        setIsLoaded(true);
      },
      undefined,
      () => {
        // Fallback: Build tactile complex generative geometric artifact
        modelGroup.clear();
        buildProceduralSculpture(modelGroup, baseMat);
        setModelType("procedural");
        setIsLoaded(true);
      }
    );

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Render loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(reqId);
      controls.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  // Procedural Sculpture Builder
  function buildProceduralSculpture(group: THREE.Group, mat: THREE.Material) {
    // A complex, faceted helical ribbon representing a statement sculpture
    const geometry = new THREE.TorusKnotGeometry(0.85, 0.28, 128, 32, 2, 3);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Subtle internal pedestal
    const baseGeo = new THREE.CylinderGeometry(0.7, 0.85, 0.25, 32);
    const baseMesh = new THREE.Mesh(baseGeo, mat);
    baseMesh.position.y = -1.0;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    group.add(baseMesh);
  }

  // Handle Controls
  const toggleRotation = () => {
    if (controlsRef.current) {
      const next = !isRotating;
      controlsRef.current.autoRotate = next;
      setIsRotating(next);
      trackEvent("3d_viewer_interact", { action: "toggle_rotation", state: next });
    }
  };

  const toggleWireframe = () => {
    const next = !wireframe;
    setWireframe(next);
    materialsRef.current.forEach((m) => {
      m.wireframe = next;
    });
    trackEvent("3d_viewer_interact", { action: "toggle_wireframe", state: next });
  };

  const handleMaterialChange = (index: number) => {
    setActiveMaterial(index);
    const preset = MATERIAL_PRESETS[index];
    materialsRef.current.forEach((m) => {
      m.color.setHex(preset.color);
      m.roughness = preset.roughness;
      m.metalness = preset.metalness;
    });
    trackEvent("3d_viewer_interact", { action: "change_material", material: preset.name });
  };

  const resetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 1.2, 3.8);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.autoRotate = true;
      setIsRotating(true);
      setZoomLevel(1);
    }
  };

  const handleZoom = (direction: "in" | "out") => {
    if (cameraRef.current) {
      const factor = direction === "in" ? 0.85 : 1.15;
      cameraRef.current.position.multiplyScalar(factor);
      setZoomLevel((prev) => (direction === "in" ? prev * 1.15 : prev * 0.85));
      trackEvent("3d_viewer_interact", { action: "zoom", direction });
    }
  };

  return (
    <section className="relative py-28 md:py-36 bg-surface-card border-y border-border overflow-hidden">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE INSPECTION</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
              DON’T JUST LOOK AT IT.
            </h2>
            <p className="font-mono text-xs md:text-sm text-foreground-secondary uppercase tracking-widest mt-2">
              ROTATE IT. ZOOM IN. SEE THE DETAIL.
            </p>
          </div>

          <div className="font-mono text-xs text-foreground-muted max-w-sm leading-relaxed">
            Drag with cursor or touch to inspect volumetric proportions, surface
            curvature, and seam geometry under studio rim lighting.
          </div>
        </div>

        {/* 3D Viewport Box */}
        <div className="relative w-full h-[520px] md:h-[640px] bg-background border border-border rounded-[2px] overflow-hidden">
          {/* Canvas Mount */}
          <div
            ref={containerRef}
            data-cursor="drag"
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* Top Status Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-3 bg-surface/80 backdrop-blur-md px-3 py-1.5 border border-border rounded-[2px] font-mono text-[11px] uppercase tracking-wider text-foreground-secondary">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>
                {modelType === "gltf" ? "CAD MODEL: ASSET LOADED" : "STUDIO SPEC: SCULPTURE 01"}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-surface/80 backdrop-blur-md px-3 py-1.5 border border-border rounded-[2px] font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
              <span>VIEWPORT: 60 FPS</span>
              <span>•</span>
              <span>LIGHTS: DUAL RIM + KEY</span>
            </div>
          </div>

          {/* Bottom Floating Controls Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 max-w-full px-4">
            <div className="flex items-center gap-1 bg-surface/90 backdrop-blur-xl border border-border rounded-[3px] p-1.5 shadow-2xl">
              {/* Rotation toggle */}
              <button
                onClick={toggleRotation}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer",
                  isRotating
                    ? "bg-foreground text-background font-semibold"
                    : "text-foreground-secondary hover:text-foreground hover:bg-surface-raised"
                )}
                title="Toggle Auto Rotation"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Rotate</span>
              </button>

              {/* Wireframe toggle */}
              <button
                onClick={toggleWireframe}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer",
                  wireframe
                    ? "bg-accent text-background font-semibold"
                    : "text-foreground-secondary hover:text-foreground hover:bg-surface-raised"
                )}
                title="Toggle Wireframe Mesh"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Wireframe</span>
              </button>

              {/* Zoom controls */}
              <button
                onClick={() => handleZoom("in")}
                className="p-2 text-foreground-secondary hover:text-foreground hover:bg-surface-raised rounded-[2px] transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              {/* Reset view */}
              <button
                onClick={resetView}
                className="p-2 text-foreground-secondary hover:text-foreground hover:bg-surface-raised rounded-[2px] transition-colors cursor-pointer"
                title="Reset Camera"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Material Selector Chips */}
            <div className="hidden lg:flex items-center gap-1 bg-surface/90 backdrop-blur-xl border border-border rounded-[3px] p-1.5 shadow-2xl">
              <span className="font-mono text-[10px] uppercase text-foreground-muted px-2">
                Material:
              </span>
              {MATERIAL_PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => handleMaterialChange(idx)}
                  className={cn(
                    "px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer",
                    activeMaterial === idx
                      ? "bg-surface-raised border border-foreground/30 text-foreground"
                      : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Subtext */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between font-mono text-xs text-foreground-muted gap-2">
          <div>
            NATIVE GLTF / STEP PIPELINE • COMPATIBLE WITH SOLIDWORKS, BLENDER & RHINO
          </div>
          <div className="text-foreground-secondary">
            DROP CAD AT: <span className="text-accent">/public/models/model.glb</span>
          </div>
        </div>
      </div>
    </section>
  );
}
