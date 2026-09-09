'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Warm Studio Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#fff0dd', 2.5);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#e6f0ff', 1.5);
    fillLight.position.set(-3, -1, 1);
    scene.add(fillLight);

    // Ground plane for subtle reflection/shadow
    const groundGeo = new THREE.PlaneGeometry(10, 10);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.05 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create elegant abstract sculpture
    const group = new THREE.Group();
    
    // Smooth custom shape
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.5);
    shape.quadraticCurveTo(0.5, 0.5, 0.5, 0);
    shape.quadraticCurveTo(0.5, -0.5, 0, -0.5);
    shape.quadraticCurveTo(-0.5, -0.5, -0.5, 0);
    shape.quadraticCurveTo(-0.5, 0.5, 0, 0.5);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 32,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15,
      curveSegments: 64,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    const material = new THREE.MeshStandardMaterial({
      color: '#2A2A2A',
      roughness: 0.5,
      metalness: 0.08,
    });

    // Create a composition of overlapping shapes
    const numShapes = 3;
    for (let i = 0; i < numShapes; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      const scale = 1 - (i * 0.15);
      mesh.scale.setScalar(scale);
      mesh.position.z = (i - 1) * 0.2;
      mesh.position.x = Math.sin(i * Math.PI) * 0.2;
      mesh.rotation.z = i * (Math.PI / 4);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }

    scene.add(group);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onDocumentMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Elegant auto-rotation
      group.rotation.y += 0.002;
      group.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;

      // Smooth parallax interpolation
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
      
      group.position.x += (targetX - group.position.x) * 0.02;
      group.position.y += (-targetY - group.position.y) * 0.02;

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
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 pointer-events-none" 
      ref={containerRef}
      aria-hidden="true"
    />
  );
}

export default HeroSculpture;
