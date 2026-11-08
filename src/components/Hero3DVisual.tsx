'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2.5, 6.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root Group for rotation and tilt
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Motherboard / Base Substrate
    const substrateGeo = new THREE.BoxGeometry(4.2, 0.12, 4.2);
    const substrateMat = new THREE.MeshStandardMaterial({
      color: 0x0c1015,
      roughness: 0.7,
      metalness: 0.3,
    });
    const substrate = new THREE.Mesh(substrateGeo, substrateMat);
    substrate.position.y = -0.2;
    rootGroup.add(substrate);

    // Substrate border ring
    const borderGeo = new THREE.BoxGeometry(4.25, 0.04, 4.25);
    const borderMat = new THREE.MeshBasicMaterial({
      color: 0xff9900,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const borderMesh = new THREE.Mesh(borderGeo, borderMat);
    borderMesh.position.y = -0.12;
    rootGroup.add(borderMesh);

    // 2. Main Microchip Die (Integrated Heat Spreader)
    const dieGeo = new THREE.BoxGeometry(2.4, 0.25, 2.4);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x161a20,
      roughness: 0.25,
      metalness: 0.85,
    });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.y = 0.05;
    rootGroup.add(die);

    // 3. Central Silicon Core / Logo Plate
    const coreGeo = new THREE.BoxGeometry(1.4, 0.06, 1.4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x090b0e,
      roughness: 0.1,
      metalness: 0.95,
      emissive: 0xff9900,
      emissiveIntensity: 0.15,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = 0.2;
    rootGroup.add(core);

    // Core pulsing border
    const coreBorderGeo = new THREE.EdgesGeometry(coreGeo);
    const coreBorderMat = new THREE.LineBasicMaterial({
      color: 0xffaa00,
      linewidth: 2,
    });
    const coreBorder = new THREE.LineSegments(coreBorderGeo, coreBorderMat);
    coreBorder.position.y = 0.201;
    rootGroup.add(coreBorder);

    // 4. Gold / Copper Contact Pins along perimeter
    const pinGeo = new THREE.BoxGeometry(0.08, 0.06, 0.28);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xffa834,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xff9900,
      emissiveIntensity: 0.2,
    });

    const pinOffsets = [-1.4, -1.0, -0.6, -0.2, 0.2, 0.6, 1.0, 1.4];
    pinOffsets.forEach((pos) => {
      // North & South pins
      const pinN = new THREE.Mesh(pinGeo, pinMat);
      pinN.position.set(pos, -0.05, -1.35);
      rootGroup.add(pinN);

      const pinS = new THREE.Mesh(pinGeo, pinMat);
      pinS.position.set(pos, -0.05, 1.35);
      rootGroup.add(pinS);

      // East & West pins
      const pinW = new THREE.Mesh(pinGeo, pinMat);
      pinW.rotation.y = Math.PI / 2;
      pinW.position.set(-1.35, -0.05, pos);
      rootGroup.add(pinW);

      const pinE = new THREE.Mesh(pinGeo, pinMat);
      pinE.rotation.y = Math.PI / 2;
      pinE.position.set(1.35, -0.05, pos);
      rootGroup.add(pinE);
    });

    // 5. Holographic Data Orbit Rings
    const ringGeo = new THREE.RingGeometry(2.3, 2.35, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff9900,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = 0.3;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(2.7, 2.73, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffbf60,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = 0.15;
    rootGroup.add(ring2);

    // 6. Floating Particles (Data Packets)
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.6;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffa31a,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const orangeKeyLight = new THREE.PointLight(0xff9900, 4.5, 12);
    orangeKeyLight.position.set(2, 3, 2);
    scene.add(orangeKeyLight);

    const topFillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topFillLight.position.set(-3, 6, 3);
    scene.add(topFillLight);

    const blueRimLight = new THREE.PointLight(0x4080ff, 1.5, 10);
    blueRimLight.position.set(-3, -1, -3);
    scene.add(blueRimLight);

    // Cursor tracking
    let targetRotX = 0.35;
    let targetRotY = -0.45;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = -0.45 + x * 0.4;
      targetRotX = 0.35 - y * 0.3;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth cursor tilt
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;

      // Idle float & subtle continuous orbit
      rootGroup.position.y = Math.sin(elapsed * 1.4) * 0.08;
      ring1.rotation.z = elapsed * 0.35;
      ring2.rotation.z = -elapsed * 0.2;
      particles.rotation.y = elapsed * 0.12;

      // Pulse core emissive
      const pulse = 0.15 + Math.sin(elapsed * 2.5) * 0.1;
      coreMat.emissiveIntensity = pulse;
      orangeKeyLight.intensity = 4.0 + Math.sin(elapsed * 2.5) * 1.0;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Ambient Orange Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 153, 0, 0.16) 0%, rgba(255, 153, 0, 0.02) 50%, transparent 75%)',
        }}
      />

      {/* Floating HUD Badges */}
      <div className="absolute top-4 left-2 sm:left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#11141a]/85 backdrop-blur-md border border-[#303846] text-[11px] font-mono text-[#a1a1aa] shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#ff9900] animate-pulse" />
          <span>CHIP ARCHITECTURE // SOC-SBG-01</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-2 sm:right-6 z-20 pointer-events-none">
        <div className="flex flex-col gap-1.5 px-4 py-2.5 rounded-xl bg-[#11141a]/90 backdrop-blur-md border border-[#303846] text-[11px] font-mono shadow-2xl">
          <div className="flex items-center justify-between gap-4 text-[#71717a]">
            <span>NODE STATUS</span>
            <span className="text-[#34d399] font-semibold">ACTIVE</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-[#71717a]">
            <span>BUILD FREQUENCY</span>
            <span className="text-white">WEEKLY</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-[#71717a]">
            <span>AWS ECOSYSTEM</span>
            <span className="text-[#ff9900]">MULTI-DOMAIN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

