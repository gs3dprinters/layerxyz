"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function HeroSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Lighting (Studio Setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4ff3f, 1.8);
    rimLight.position.set(-3, 2, -2.5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x708090, 0.8);
    fillLight.position.set(0, -3, 2);
    scene.add(fillLight);

    // Group for object
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Procedural Layered Monolith Sculpture
    // Emulates a high-end generative 3D printed architectural artifact
    const layers = 28;
    const layerMeshes: THREE.Mesh[] = [];

    const material = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.38,
      metalness: 0.12,
      flatShading: false,
    });

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.4,
    });

    for (let i = 0; i < layers; i++) {
      const progress = i / layers;
      const angle = progress * Math.PI * 2;
      const radius = 0.95 + 0.25 * Math.sin(progress * 4 * Math.PI) * Math.cos(progress * 2 * Math.PI);
      const heightStep = (progress - 0.5) * 2.4;

      const shape = new THREE.Shape();
      const points = 6;
      for (let p = 0; p < points; p++) {
        const theta = (p / points) * Math.PI * 2 + angle * 0.4;
        const r = radius * (1 + 0.15 * Math.cos(theta * 3));
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        if (p === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();

      const extrudeSettings = {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.015,
        bevelSegments: 2,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = heightStep;
      mesh.rotation.x = Math.PI / 2;
      mesh.rotation.z = angle * 0.3;

      // Edges for 3D printed layer texture look
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(edges, edgeMaterial);
      mesh.add(line);

      sculptureGroup.add(mesh);
      layerMeshes.push(mesh);
    }

    // Interactive mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.6;
    };

    window.addEventListener("mousemove", onMouseMove);

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

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Turntable rotation
      sculptureGroup.rotation.y += delta * 0.22;
      sculptureGroup.rotation.x = mouseY * 0.5 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
      sculptureGroup.rotation.z = -mouseX * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
      edgeMaterial.dispose();
      layerMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="drag"
      className="relative w-full h-full min-h-[380px] lg:min-h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Studio Spec Overlay Tags */}
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] uppercase tracking-widest text-foreground-muted pointer-events-none hidden sm:block">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>REALTIME 3D VIEWPORT</span>
        </div>
        <div className="text-foreground/40 mt-0.5">FORM / KINETIC MONOLITH 01</div>
      </div>

      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] uppercase tracking-widest text-foreground-muted pointer-events-none hidden sm:block text-right">
        <div>LAYER RESOLUTION: 0.12 MM</div>
        <div className="text-foreground/40 mt-0.5">STUDIO SHADER / OBSIDIAN</div>
      </div>
    </div>
  );
}
