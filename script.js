(function () {
  'use strict';

  // =========================================================================
  // THE BUILD FLOOR — INDUSTRIAL TECHNOLOGY COMMUNITY ENGINE
  // Full 3D Server Assembly Sequence & Live Infrastructure Control Room
  // Concept: "Nothing is ready-made. Everything is built."
  // =========================================================================

  // DOM Elements: 3D Server Assembly Intro
  var intro = document.getElementById('intro');
  var canvasContainer = document.getElementById('intro-canvas-container');
  var enterBtn = document.getElementById('enter-btn');
  var skipBtn = document.getElementById('skip');
  var replayBtn = document.getElementById('replay');
  var introSoundBtn = document.getElementById('intro-sound-btn');
  var navSoundBtn = document.getElementById('nav-sound-btn');
  var warpFlash = document.getElementById('warp-flash');
  var brandOverlay = document.getElementById('intro-brand-overlay');
  var stageCode = document.getElementById('stage-code');
  var stageName = document.getElementById('stage-name');
  var guideText = document.getElementById('guide-text');

  // DOM Elements: Module Telemetry HUD Card
  var moduleHudCard = document.getElementById('module-hud-card');
  var hudCardClose = document.getElementById('hud-card-close');
  var hudModuleBadge = document.getElementById('hud-module-badge');
  var hudModuleTitle = document.getElementById('hud-module-title');
  var hudModuleDesc = document.getElementById('hud-module-desc');
  var hudModuleState = document.getElementById('hud-module-state');
  var hudSpecPower = document.getElementById('hud-spec-power');
  var hudSpecBus = document.getElementById('hud-spec-bus');
  var hudSpecTemp = document.getElementById('hud-spec-temp');

  var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isSoundEnabled = true;

  try {
    var storedSound = localStorage.getItem('the_build_floor_sound');
    if (storedSound !== null) {
      isSoundEnabled = storedSound === 'true';
    }
  } catch (e) {}

  function updateSoundUI() {
    var icon = isSoundEnabled ? '🔊' : '🔇';
    var text = isSoundEnabled ? 'AUDIO ON' : 'AUDIO MUTED';
    if (introSoundBtn) {
      var iconSpan = introSoundBtn.querySelector('.sound-icon');
      var textSpan = introSoundBtn.querySelector('.sound-text');
      if (iconSpan) iconSpan.textContent = icon;
      if (textSpan) textSpan.textContent = text;
      if (isSoundEnabled) {
        introSoundBtn.classList.remove('muted');
      } else {
        introSoundBtn.classList.add('muted');
      }
    }
    if (navSoundBtn) {
      var navIcon = navSoundBtn.querySelector('.sound-icon');
      if (navIcon) navIcon.textContent = icon;
    }
  }
  updateSoundUI();

  function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    try {
      localStorage.setItem('the_build_floor_sound', String(isSoundEnabled));
    } catch (e) {}
    updateSoundUI();
    if (isSoundEnabled) {
      playClickPop(800);
    }
  }

  if (introSoundBtn) introSoundBtn.addEventListener('click', toggleSound);
  if (navSoundBtn) navSoundBtn.addEventListener('click', toggleSound);

  // -------------------------------------------------------------------------
  // Web Audio API: Procedural Industrial Sound Synthesizer
  // Relay clicks, metallic snaps, cooling fan spool, and airlock release
  // -------------------------------------------------------------------------
  var audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playClickPop(freq) {
    if (!isSoundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var t = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'triangle';
      var f = freq || 720;
      osc.frequency.setValueAtTime(f, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.05);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.07);
    } catch (e) {}
  }

  function playPowerRelay() {
    if (!isSoundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var t = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, t);
      osc.frequency.linearRampToValueAtTime(120, t + 0.25);
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.42);
    } catch (e) {}
  }

  function playMechanicalLatch() {
    if (!isSoundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var t = ctx.currentTime;
      // High transient metallic click
      var osc1 = ctx.createOscillator();
      var gain1 = ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(1800, t);
      osc1.frequency.exponentialRampToValueAtTime(320, t + 0.06);
      gain1.gain.setValueAtTime(0.12, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.08);

      // Low solid chassis thud
      var osc2 = ctx.createOscillator();
      var gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(180, t);
      osc2.frequency.exponentialRampToValueAtTime(45, t + 0.15);
      gain2.gain.setValueAtTime(0.15, t);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(t);
      osc2.stop(t + 0.2);
    } catch (e) {}
  }

  function playFanSpoolUp() {
    if (!isSoundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var t = ctx.currentTime;
      var bufferSize = ctx.sampleRate * 0.8;
      var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      for (var j = 0; j < bufferSize; j++) {
        data[j] = Math.random() * 2 - 1;
      }
      var noise = ctx.createBufferSource();
      noise.buffer = buffer;
      var filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, t);
      filter.frequency.exponentialRampToValueAtTime(1600, t + 0.7);
      filter.Q.setValueAtTime(2.0, t);

      var gain = ctx.createGain();
      gain.gain.setValueAtTime(0.02, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(t);
      noise.stop(t + 0.82);
    } catch (e) {}
  }

  function playAirlockDive() {
    if (!isSoundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var t = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, t);
      osc.frequency.exponentialRampToValueAtTime(480, t + 0.6);
      gain.gain.setValueAtTime(0.02, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

      var filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, t);
      filter.frequency.exponentialRampToValueAtTime(3200, t + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.75);
    } catch (e) {}
  }

  function playPacketChirp() {
    if (!isSoundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var notes = [440, 554.37, 659.25, 880];
      notes.forEach(function (f, i) {
        var t = ctx.currentTime + i * 0.04;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.03, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.08);
      });
    } catch (e) {}
  }

  // -------------------------------------------------------------------------
  // Component Telemetry Specifications for 3D Rack
  // -------------------------------------------------------------------------
  var MODULE_SPECS = {
    'storage': {
      title: '4U NVMe High-Density Object Lake',
      badge: '4U CHASSIS // S3 STORAGE',
      desc: '24 hot-swappable enterprise NVMe PCIe 5.0 solid-state drives providing local sub-millisecond vector and dataset buffering.',
      state: 'MOUNTED // 100% HEALTH',
      power: '420W (Redundant)',
      bus: '100 Gbps QSFP28',
      temp: '32.1°C OPTIMAL'
    },
    'compute': {
      title: '2U Dual Graviton Compute Blade',
      badge: '2U CHASSIS // SERVERLESS HUB',
      desc: 'High-density 64-core ARM Graviton processor nodes powering low-latency AWS Lambda containers and event dispatchers.',
      state: 'ONLINE // LOAD: NOMINAL',
      power: '340W (Active)',
      bus: 'Dual 25GbE SFP28',
      temp: '36.8°C NORMAL'
    },
    'switch': {
      title: '1U Top-of-Rack 100GbE Switch',
      badge: '1U CHASSIS // NETWORK FABRIC',
      desc: 'Low-latency packet routing backplane connecting rack nodes directly to campus fiber gateway with zero packet drop.',
      state: 'FORWARDING // 0 DROPS',
      power: '180W',
      bus: '3.2 Tbps Switching',
      temp: '29.4°C COOL'
    },
    'ai': {
      title: '2U Amazon Bedrock Neural Node',
      badge: '2U CHASSIS // AI ACCELERATOR',
      desc: 'Hardware inference coprocessor optimized for multi-token Claude 3.5 Sonnet agent streaming and vector embeddings.',
      state: 'INFERENCE READY',
      power: '520W (Titanium)',
      bus: 'PCIe Gen5 x16',
      temp: '38.2°C NOMINAL'
    },
    'gateway': {
      title: '2U Cloud Infrastructure Gateway',
      badge: '2U CHASSIS // TRANSIT ROUTER',
      desc: 'Dual redundant fan modules and quad 25GbE optical uplinks establishing secure zero-trust campus peering.',
      state: 'ROUTING // NOMINAL',
      power: '210W',
      bus: 'Quad 25GbE SFP28',
      temp: '30.5°C OPTIMAL'
    },
    'rack': {
      title: '42U Industrial Steel Server Rack Frame',
      badge: '42U SPEC // CHASSIS ENCLOSURE',
      desc: 'Heavy-gauge cold-rolled steel cabinet with integrated dual power distribution units, grounding busbar, and cable channels.',
      state: 'STRUCTURAL LOCK OK',
      power: '3200W Capacity',
      bus: '48V DC Backplane',
      temp: '22.0°C AMBIENT'
    }
  };

  // -------------------------------------------------------------------------
  // Three.js 3D Server Assembly Scene — Realistic Industrial Data Centre
  // -------------------------------------------------------------------------
  var scene, camera, renderer, animationFrameId;
  var rackGroup, rackFrame, rackRails = [];
  var serverModules = [];
  var networkCables = [];
  var animatedCablePhotons = [];
  var floorGrid, powerIndicatorLED;

  // Assembly Sequence Choreography Timings (in seconds)
  // Stage 1 (0.0 - 0.9s): Power initiation (indicator pulses)
  // Stage 2 (0.9 - 1.9s): Rack formation (rails and posts lock)
  // Stage 3 (1.9 - 3.2s): Hardware assembly (blades slide in and lock)
  // Stage 4 (3.2 - 4.1s): Network connection (cables route & fire)
  // Stage 5 (4.1 - 4.8s): Boot (status LEDs flash into life)
  // Stage 6 (4.8s+): Brand reveal (camera pulls back, BUILT BY BUILDERS)
  var assemblyStartTime = 0;
  var currentStage = 1;
  var isSequenceFinished = false;

  // Interaction State
  var raycaster, mouseVector;
  var isDragging = false;
  var previousMousePos = { x: 0, y: 0 };
  var targetRotation = { x: 0.15, y: 0.35 };
  var currentRotation = { x: 0.15, y: 0.35 };
  var cameraOffset = { x: 0, y: 0 };
  var hoveredModuleKey = null;

  // Easing function for authentic mechanical snap
  function easeOutBack(x) {
    var c1 = 1.6;
    var c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  function initThreeScene() {
    if (!window.THREE || !canvasContainer) return false;
    canvasContainer.innerHTML = '';

    var width = canvasContainer.clientWidth || window.innerWidth;
    var height = canvasContainer.clientHeight || window.innerHeight;

    scene = new THREE.Scene();
    // Pitch Black Industrial Fog
    scene.fog = new THREE.FogExp2(0x090b0e, 0.04);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    // Initial dramatic close-in camera position
    camera.position.set(0, 0.5, 4.2);
    camera.lookAt(0, 0.3, 0);

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x090b0e, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      canvasContainer.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed:', e);
      return false;
    }

    raycaster = new THREE.Raycaster();
    mouseVector = new THREE.Vector2();

    // ── Industrial Data Centre 3-Point Lighting ──────────────────────────
    var ambient = new THREE.AmbientLight(0x11161b, 1.2);
    scene.add(ambient);

    // Overhead Cool Directional Light (cold data centre ceiling lighting)
    var keyLight = new THREE.DirectionalLight(0xd0e0ff, 1.8);
    keyLight.position.set(3, 8, 4);
    scene.add(keyLight);

    // Safety-Orange Accent Fill Light (casts neon industrial amber highlights)
    var rimLight = new THREE.DirectionalLight(0xff6b24, 2.2);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Central Rack Interior Radiance Point Light
    var rackLight = new THREE.PointLight(0xff8833, 2.8, 12);
    rackLight.position.set(0, 0.5, 0.8);
    scene.add(rackLight);

    // Soft Slate Contrast Light
    var contrastLight = new THREE.DirectionalLight(0x202b38, 0.7);
    contrastLight.position.set(0, -4, 2);
    scene.add(contrastLight);

    buildFloorGrid();
    buildServerRack();
    buildServerModules();
    buildNetworkCables();

    // Reset sequence flags
    assemblyStartTime = performance.now();
    currentStage = 1;
    isSequenceFinished = false;

    // Attach Orbit & Interaction Handlers
    window.addEventListener('resize', onThreeResize);
    canvasContainer.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    canvasContainer.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    canvasContainer.addEventListener('click', onCanvasClick);

    return true;
  }

  // ── Reflective Metal Floor with Safety Demarcation Lines ────────────────
  function buildFloorGrid() {
    // Industrial safety-orange grid markings
    floorGrid = new THREE.GridHelper(28, 28, 0xff6b24, 0x1f262e);
    floorGrid.position.y = -1.8;
    scene.add(floorGrid);
  }

  // ── 42U Server Rack Chassis Frame ──────────────────────────────────────
  function buildServerRack() {
    rackGroup = new THREE.Group();
    rackGroup.position.set(0, 0, 0);

    rackFrame = new THREE.Group();
    rackRails = [];

    // Metallic Powder-Coated Steel & Hardware Materials
    var steelMat = new THREE.MeshStandardMaterial({
      color: 0x12171f,
      metalness: 0.88,
      roughness: 0.32
    });
    var innerRailMat = new THREE.MeshStandardMaterial({
      color: 0x242d38,
      metalness: 0.94,
      roughness: 0.18
    });
    var tickMat = new THREE.MeshBasicMaterial({ color: 0x3d4b5c });
    var darkVentMat = new THREE.MeshStandardMaterial({
      color: 0x0a0d12,
      metalness: 0.65,
      roughness: 0.6
    });

    // 1. Four Heavy Outer Corner Uprights (Cold-rolled Steel Columns)
    var postGeo = new THREE.BoxGeometry(0.07, 3.6, 0.07);
    var postCoords = [
      [-0.78, 0, -0.58],
      [0.78, 0, -0.58],
      [-0.78, 0, 0.58],
      [0.78, 0, 0.58]
    ];
    postCoords.forEach(function (coords, i) {
      var post = new THREE.Mesh(postGeo, steelMat);
      post.position.set(coords[0], coords[1], coords[2]);
      post.userData = { serviceKey: 'rack', initialY: coords[1] + (i % 2 === 0 ? 3.5 : -3.5) };
      rackFrame.add(post);
      rackRails.push({ mesh: post, targetY: coords[1], startY: post.userData.initialY });
    });

    // 2. Four Internal EIA-310 19-inch Mounting Rails with 1U Tick Markers
    var railGeo = new THREE.BoxGeometry(0.04, 3.2, 0.04);
    var railCoords = [
      [-0.68, 0, 0.50],
      [0.68, 0, 0.50],
      [-0.68, 0, -0.50],
      [0.68, 0, -0.50]
    ];
    railCoords.forEach(function (coords) {
      var rail = new THREE.Mesh(railGeo, innerRailMat);
      rail.position.set(coords[0], coords[1], coords[2]);
      rackFrame.add(rail);
      rackRails.push({ mesh: rail, targetY: coords[1], startY: coords[1] + 3.0 });
    });

    // Tick marks along the front rails for 42U unit markings
    var tickGeo = new THREE.BoxGeometry(0.045, 0.012, 0.01);
    for (var u = 0; u < 21; u++) {
      var tickY = -1.5 + u * 0.15;
      var leftTick = new THREE.Mesh(tickGeo, tickMat);
      leftTick.position.set(-0.68, tickY, 0.522);
      rackFrame.add(leftTick);

      var rightTick = new THREE.Mesh(tickGeo, tickMat);
      rightTick.position.set(0.68, tickY, 0.522);
      rackFrame.add(rightTick);
    }

    // 3. Top Roof Assembly with Dual Exhaust Fan Grilles
    var topPlateGeo = new THREE.BoxGeometry(1.64, 0.08, 1.24);
    var topPlate = new THREE.Mesh(topPlateGeo, steelMat);
    topPlate.position.set(0, 1.8, 0);
    rackFrame.add(topPlate);
    rackRails.push({ mesh: topPlate, targetY: 1.8, startY: 4.8 });

    // Dual Circular Roof Exhaust Fans
    var fanCowlGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.03, 24);
    var fanBladeMat = new THREE.MeshStandardMaterial({ color: 0x1b232e, metalness: 0.7, roughness: 0.3 });
    [-0.35, 0.35].forEach(function (fanX) {
      var fan = new THREE.Mesh(fanCowlGeo, fanBladeMat);
      fan.position.set(fanX, 1.84, 0);
      rackFrame.add(fan);
    });

    // 4. Heavy Base Pedestal & Leveler Feet
    var basePlateGeo = new THREE.BoxGeometry(1.64, 0.08, 1.24);
    var basePlate = new THREE.Mesh(basePlateGeo, steelMat);
    basePlate.position.set(0, -1.8, 0);
    rackFrame.add(basePlate);
    rackRails.push({ mesh: basePlate, targetY: -1.8, startY: -4.8 });

    var footGeo = new THREE.CylinderGeometry(0.05, 0.06, 0.06, 12);
    var footMat = new THREE.MeshStandardMaterial({ color: 0x222a36, metalness: 0.9, roughness: 0.2 });
    postCoords.forEach(function (coords) {
      var foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(coords[0], -1.86, coords[2]);
      rackFrame.add(foot);
    });

    // 5. Side Ventilation Louver Panels
    var sideGeo = new THREE.BoxGeometry(0.02, 3.4, 1.12);
    var leftPanel = new THREE.Mesh(sideGeo, darkVentMat);
    leftPanel.position.set(-0.77, 0, 0);
    rackFrame.add(leftPanel);

    var rightPanel = new THREE.Mesh(sideGeo, darkVentMat);
    rightPanel.position.set(0.77, 0, 0);
    rackFrame.add(rightPanel);

    // Subtle horizontal ventilation slits on sides
    var slitGeo = new THREE.BoxGeometry(0.025, 0.02, 0.85);
    var slitMat = new THREE.MeshBasicMaterial({ color: 0x05070a });
    for (var s = 0; s < 12; s++) {
      var slitY = -1.2 + s * 0.22;
      var leftSlit = new THREE.Mesh(slitGeo, slitMat);
      leftSlit.position.set(-0.772, slitY, 0);
      rackFrame.add(leftSlit);

      var rightSlit = new THREE.Mesh(slitGeo, slitMat);
      rightSlit.position.set(0.772, slitY, 0);
      rackFrame.add(rightSlit);
    }

    // 6. Stage 1 Indicator: Safety-Orange Power Pilot LED on Base PDU
    var indGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16);
    var indMat = new THREE.MeshBasicMaterial({ color: 0xff6b24 });
    powerIndicatorLED = new THREE.Mesh(indGeo, indMat);
    powerIndicatorLED.position.set(-0.55, -1.55, 0.52);
    rackFrame.add(powerIndicatorLED);

    rackGroup.add(rackFrame);
    scene.add(rackGroup);
  }

  // ── Server Hardware Blades & Storage Modules ────────────────────────────
  function buildServerModules() {
    serverModules = [];

    var ledGreenMat = new THREE.MeshBasicMaterial({ color: 0x00e599 });
    var ledOrangeMat = new THREE.MeshBasicMaterial({ color: 0xff6b24 });
    var ledAmberMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    var handleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 });
    var chassisDarkMat = new THREE.MeshStandardMaterial({ color: 0x131922, metalness: 0.85, roughness: 0.28 });
    var portMetalMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.95, roughness: 0.15 });
    var darkVentMat = new THREE.MeshStandardMaterial({ color: 0x0a0d12, metalness: 0.65, roughness: 0.6 });
    var psuMat = new THREE.MeshStandardMaterial({ color: 0x222b36, metalness: 0.9, roughness: 0.22 });

    // -----------------------------------------------------------------------
    // MODULE 1: 1U TOP-OF-RACK 100GbE SWITCH (42U-41U, Y = +1.38)
    // -----------------------------------------------------------------------
    var m1Group = new THREE.Group();
    var m1Geo = new THREE.BoxGeometry(1.36, 0.14, 1.0);
    var m1Chassis = new THREE.Mesh(m1Geo, chassisDarkMat);
    m1Chassis.userData = { serviceKey: 'switch' };
    m1Group.add(m1Chassis);

    // Dual-row 32x QSFP28 / RJ45 metal cage ports
    var portGeo = new THREE.BoxGeometry(0.034, 0.032, 0.015);
    for (var r = 0; r < 2; r++) {
      for (var p = 0; p < 16; p++) {
        var port = new THREE.Mesh(portGeo, portMetalMat);
        var pX = -0.52 + p * 0.07;
        var pY = (r === 0 ? 0.024 : -0.024);
        port.position.set(pX, pY, 0.505);
        m1Group.add(port);

        var pLed = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.012), (p % 4 === 0 ? ledOrangeMat : ledGreenMat));
        pLed.position.set(pX, pY + 0.024, 0.508);
        m1Group.add(pLed);
      }
    }

    // OLED System Diagnostics mini-screen
    var oledGeo = new THREE.BoxGeometry(0.16, 0.05, 0.01);
    var oledMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    var oledScreen = new THREE.Mesh(oledGeo, oledMat);
    oledScreen.position.set(0.56, 0, 0.506);
    m1Group.add(oledScreen);

    m1Group.position.set(0, 1.38, 0);
    rackGroup.add(m1Group);
    serverModules.push({
      group: m1Group,
      mainMesh: m1Chassis,
      key: 'switch',
      targetPos: new THREE.Vector3(0, 1.38, 0),
      startPos: new THREE.Vector3(0, 1.38, 3.2), // slides from FRONT!
      delay: 2.7
    });

    // -----------------------------------------------------------------------
    // MODULE 2: 1U HORIZONTAL CABLE MANAGEMENT PANEL (40U-39U, Y = +1.22)
    // -----------------------------------------------------------------------
    var m2Group = new THREE.Group();
    var m2Geo = new THREE.BoxGeometry(1.36, 0.10, 0.9);
    var m2Chassis = new THREE.Mesh(m2Geo, chassisDarkMat);
    m2Group.add(m2Chassis);

    // Front D-rings / cable pass-through slots
    var ringGeo = new THREE.BoxGeometry(0.08, 0.04, 0.04);
    for (var dg = 0; dg < 5; dg++) {
      var dRing = new THREE.Mesh(ringGeo, handleMat);
      dRing.position.set(-0.48 + dg * 0.24, 0, 0.47);
      m2Group.add(dRing);
    }
    m2Group.position.set(0, 1.22, 0);
    rackGroup.add(m2Group);

    // -----------------------------------------------------------------------
    // MODULE 3: 2U AMAZON BEDROCK GENAI TENSOR BLADE (38U-35U, Y = +0.92)
    // -----------------------------------------------------------------------
    var m3Group = new THREE.Group();
    var m3Geo = new THREE.BoxGeometry(1.36, 0.26, 1.0);
    var m3Mat = new THREE.MeshStandardMaterial({
      color: 0x161e28,
      metalness: 0.9,
      roughness: 0.22,
      emissive: 0xff6b24,
      emissiveIntensity: 0.06
    });
    var m3Chassis = new THREE.Mesh(m3Geo, m3Mat);
    m3Chassis.userData = { serviceKey: 'ai' };
    m3Group.add(m3Chassis);

    // Left and Right Rack Ear Latch Handles (Safety-Orange anodized)
    var latchMat = new THREE.MeshStandardMaterial({ color: 0xff6b24, metalness: 0.85, roughness: 0.25 });
    [-0.64, 0.64].forEach(function (lx) {
      var latch = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.20, 0.05), latchMat);
      latch.position.set(lx, 0, 0.51);
      m3Group.add(latch);
    });

    // Dual Front Intake Ventilation Grilles with internal glowing copper fins
    [-0.32, 0.32].forEach(function (gx) {
      var grille = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.18, 0.02), darkVentMat);
      grille.position.set(gx, 0, 0.505);
      m3Group.add(grille);

      var copperFin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12), new THREE.MeshStandardMaterial({
        color: 0xe07a2a,
        metalness: 0.95,
        roughness: 0.15
      }));
      copperFin.rotation.x = Math.PI / 2;
      copperFin.position.set(gx, 0, 0.44);
      m3Group.add(copperFin);
    });

    // Central Glowing Crystal Tensor Core
    var tensorCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 0), new THREE.MeshStandardMaterial({
      color: 0xff6b24,
      roughness: 0.1,
      metalness: 0.4,
      emissive: 0xff6b24,
      emissiveIntensity: 0.9
    }));
    tensorCore.position.set(0, 0, 0.515);
    m3Group.add(tensorCore);

    m3Group.position.set(0, 0.92, 0);
    rackGroup.add(m3Group);
    serverModules.push({
      group: m3Group,
      mainMesh: m3Chassis,
      key: 'ai',
      targetPos: new THREE.Vector3(0, 0.92, 0),
      startPos: new THREE.Vector3(0, 0.92, 3.4), // slides from FRONT!
      delay: 2.5
    });

    // -----------------------------------------------------------------------
    // MODULE 4: 2U DUAL COMPUTE BLADE (GRAVITON4) (34U-31U, Y = +0.52)
    // -----------------------------------------------------------------------
    var m4Group = new THREE.Group();
    var m4Geo = new THREE.BoxGeometry(1.36, 0.26, 1.0);
    var m4Mat = new THREE.MeshStandardMaterial({ color: 0x1a222e, metalness: 0.88, roughness: 0.25 });
    var m4Chassis = new THREE.Mesh(m4Geo, m4Mat);
    m4Chassis.userData = { serviceKey: 'compute' };
    m4Group.add(m4Chassis);

    // 8x 2.5" Enterprise NVMe SSD Hot-Swap Drive Caddies
    var sddGeo = new THREE.BoxGeometry(0.10, 0.18, 0.02);
    for (var sd = 0; sd < 8; sd++) {
      var sddMesh = new THREE.Mesh(sddGeo, chassisDarkMat);
      var sX = -0.46 + sd * 0.13;
      sddMesh.position.set(sX, 0, 0.505);
      m4Group.add(sddMesh);

      // Caddy Latch Handle
      var sHandle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.015), handleMat);
      sHandle.position.set(sX, -0.06, 0.515);
      m4Group.add(sHandle);

      // Drive status LED
      var sLed = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.012), (sd % 2 === 0 ? ledGreenMat : ledAmberMat));
      sLed.position.set(sX, 0.06, 0.516);
      m4Group.add(sLed);
    }

    // Power switch with safety-orange halo LED
    var pwrSwitch = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.01, 16), ledOrangeMat);
    pwrSwitch.rotation.x = Math.PI / 2;
    pwrSwitch.position.set(0.58, 0.04, 0.508);
    m4Group.add(pwrSwitch);

    m4Group.position.set(0, 0.52, 0);
    rackGroup.add(m4Group);
    serverModules.push({
      group: m4Group,
      mainMesh: m4Chassis,
      key: 'compute',
      targetPos: new THREE.Vector3(0, 0.52, 0),
      startPos: new THREE.Vector3(0, 0.52, 3.2), // slides from FRONT!
      delay: 2.2
    });

    // -----------------------------------------------------------------------
    // MODULE 5: 4U HIGH-DENSITY STORAGE JBOD ARRAY (30U-25U, Y = +0.02)
    // -----------------------------------------------------------------------
    var m5Group = new THREE.Group();
    var m5Geo = new THREE.BoxGeometry(1.36, 0.50, 1.0);
    var m5Chassis = new THREE.Mesh(m5Geo, chassisDarkMat);
    m5Chassis.userData = { serviceKey: 'storage' };
    m5Group.add(m5Chassis);

    // 24x 3.5" Hot-Swap Enterprise Storage Drive Caddies (4 rows of 6)
    var caddyGeo = new THREE.BoxGeometry(0.17, 0.09, 0.02);
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 6; col++) {
        var cMesh = new THREE.Mesh(caddyGeo, chassisDarkMat);
        var cX = -0.48 + col * 0.19;
        var cY = 0.17 - row * 0.11;
        cMesh.position.set(cX, cY, 0.505);
        m5Group.add(cMesh);

        var cLever = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.012), handleMat);
        cLever.position.set(cX - 0.03, cY, 0.515);
        m5Group.add(cLever);

        var cLed = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.01), ledGreenMat);
        cLed.position.set(cX + 0.06, cY, 0.516);
        m5Group.add(cLed);
      }
    }

    m5Group.position.set(0, 0.02, 0);
    rackGroup.add(m5Group);
    serverModules.push({
      group: m5Group,
      mainMesh: m5Chassis,
      key: 'storage',
      targetPos: new THREE.Vector3(0, 0.02, 0),
      startPos: new THREE.Vector3(0, 0.02, 3.6), // slides from FRONT!
      delay: 1.9
    });

    // -----------------------------------------------------------------------
    // MODULE 6: 2U CLOUD INFRASTRUCTURE GATEWAY BLADE (24U-21U, Y = -0.50)
    // -----------------------------------------------------------------------
    var m6Group = new THREE.Group();
    var m6Geo = new THREE.BoxGeometry(1.36, 0.26, 1.0);
    var m6Chassis = new THREE.Mesh(m6Geo, chassisDarkMat);
    m6Group.add(m6Chassis);

    // Dual hot-swap fan modules behind slotted grilles
    [-0.35, 0.35].forEach(function (fx) {
      var fanBox = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.02), darkVentMat);
      fanBox.position.set(fx, 0, 0.505);
      m6Group.add(fanBox);
    });

    // Quad 25GbE optical uplink transceivers
    for (var op = 0; op < 4; op++) {
      var optMesh = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.05, 0.02), portMetalMat);
      optMesh.position.set(-0.08 + op * 0.055, 0, 0.51);
      m6Group.add(optMesh);
    }
    m6Group.position.set(0, -0.50, 0);
    rackGroup.add(m6Group);

    // -----------------------------------------------------------------------
    // MODULE 7: 2U VENTED BLANKING PANELS (20U-17U, Y = -0.88)
    // -----------------------------------------------------------------------
    var m7Group = new THREE.Group();
    var m7Geo = new THREE.BoxGeometry(1.36, 0.26, 0.8);
    var m7Chassis = new THREE.Mesh(m7Geo, darkVentMat);
    m7Group.add(m7Chassis);

    // Horizontal airflow louver slits
    for (var ls = 0; ls < 6; ls++) {
      var louver = new THREE.Mesh(new THREE.BoxGeometry(1.10, 0.015, 0.01), handleMat);
      louver.position.set(0, -0.08 + ls * 0.032, 0.405);
      m7Group.add(louver);
    }
    m7Group.position.set(0, -0.88, 0);
    rackGroup.add(m7Group);

    // -----------------------------------------------------------------------
    // MODULE 8: 2U REDUNDANT TITANIUM POWER DISTRIBUTION UNITS (PDU) (Bottom, Y = -1.35)
    // -----------------------------------------------------------------------
    var m8Group = new THREE.Group();
    var m8Geo = new THREE.BoxGeometry(1.36, 0.28, 1.0);
    var m8Chassis = new THREE.Mesh(m8Geo, chassisDarkMat);
    m8Group.add(m8Chassis);

    // Dual 1600W Titanium PSUs
    [-0.32, 0.32].forEach(function (px) {
      var psuMesh = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.20, 0.02), psuMat);
      psuMesh.position.set(px, 0, 0.505);
      m8Group.add(psuMesh);

      // PSU extraction handle
      var pHandle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.025, 0.03), handleMat);
      pHandle.position.set(px, 0, 0.52);
      m8Group.add(pHandle);

      // Green DC OK status LED
      var pLed = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.015, 0.015), ledGreenMat);
      pLed.position.set(px + 0.12, 0.06, 0.518);
      m8Group.add(pLed);
    });

    m8Group.position.set(0, -1.35, 0);
    rackGroup.add(m8Group);
  }

  // ── Network Cables & Flowing Neon Data Signals ──────────────────────────
  function buildNetworkCables() {
    networkCables = [];
    animatedCablePhotons = [];

    // Cables routing from 1U Switch (Y = +1.38) down to modules below
    var cableConnections = [
      // Switch to Bedrock AI Blade (Left & Center)
      { from: new THREE.Vector3(-0.45, 1.35, 0.52), to: new THREE.Vector3(-0.32, 0.92, 0.52), color: 0xff6b24 },
      { from: new THREE.Vector3(-0.25, 1.35, 0.52), to: new THREE.Vector3(-0.15, 0.92, 0.52), color: 0xff6b24 },
      // Switch to Graviton Compute Blade
      { from: new THREE.Vector3(0.15, 1.35, 0.52), to: new THREE.Vector3(0.18, 0.52, 0.52), color: 0xff6b24 },
      { from: new THREE.Vector3(0.35, 1.35, 0.52), to: new THREE.Vector3(0.38, 0.52, 0.52), color: 0xff6b24 },
      // Switch to 4U Storage Array (routes out wide through side D-rings)
      { from: new THREE.Vector3(-0.52, 1.35, 0.52), to: new THREE.Vector3(-0.40, 0.02, 0.52), color: 0xff8c42 },
      // Switch to Gateway Blade
      { from: new THREE.Vector3(0.52, 1.35, 0.52), to: new THREE.Vector3(0.30, -0.50, 0.52), color: 0xff8c42 }
    ];

    cableConnections.forEach(function (c) {
      var mid = new THREE.Vector3().addVectors(c.from, c.to).multiplyScalar(0.5);
      mid.z += 0.24; // Bow outward like real bundled rack cabling
      mid.x += (c.from.x > 0 ? 0.08 : -0.08);

      var curve = new THREE.QuadraticBezierCurve3(c.from, mid, c.to);
      var points = curve.getPoints(24);
      var geom = new THREE.BufferGeometry().setFromPoints(points);
      var mat = new THREE.LineBasicMaterial({
        color: c.color,
        transparent: true,
        opacity: 0.15
      });
      var line = new THREE.Line(geom, mat);
      rackGroup.add(line);
      networkCables.push({ line: line, curve: curve });

      // Flowing Neon Signal Photon
      var pGeo = new THREE.SphereGeometry(0.025, 8, 8);
      var pMat = new THREE.MeshBasicMaterial({ color: 0xfffae0 });
      var photon = new THREE.Mesh(pGeo, pMat);
      photon.visible = false;
      rackGroup.add(photon);
      animatedCablePhotons.push({
        mesh: photon,
        curve: curve,
        speed: 0.45 + Math.random() * 0.25,
        progress: Math.random()
      });
    });
  }

  // ── Master 3D Animation & 6-Stage Timeline Loop ─────────────────────────
  function animateAssembly(time) {
    animationFrameId = requestAnimationFrame(animateAssembly);

    var elapsed = (time - assemblyStartTime) * 0.001;

    // ── STAGE 1: POWER INITIATION (0.0s - 0.9s) ───────────────────────────
    if (elapsed < 0.9) {
      if (currentStage !== 1) {
        currentStage = 1;
        if (stageCode) stageCode.textContent = 'STAGE 1/6';
        if (stageName) stageName.textContent = 'POWER INITIATION';
        if (guideText) guideText.textContent = 'Initiating 48V power bus... Standby';
        playPowerRelay();
      }

      // Hide modules, rack rails start separated
      rackRails.forEach(function (r) {
        r.mesh.position.y = r.startY;
      });
      serverModules.forEach(function (sm) {
        sm.group.position.copy(sm.startPos);
      });
      networkCables.forEach(function (nc) { nc.line.material.opacity = 0; });
      animatedCablePhotons.forEach(function (ap) { ap.mesh.visible = false; });

      // Pulse power indicator
      if (powerIndicatorLED) {
        var pScale = 1.0 + Math.sin(elapsed * 12.0) * 0.4;
        powerIndicatorLED.scale.set(pScale, pScale, pScale);
      }
    }

    // ── STAGE 2: RACK FORMATION (0.9s - 1.9s) ─────────────────────────────
    else if (elapsed >= 0.9 && elapsed < 1.9) {
      if (currentStage !== 2) {
        currentStage = 2;
        if (stageCode) stageCode.textContent = 'STAGE 2/6';
        if (stageName) stageName.textContent = 'RACK FORMATION';
        if (guideText) guideText.textContent = 'Assembling 42U corner rails & chassis frame';
        playMechanicalLatch();
      }

      var p2 = Math.min(1, (elapsed - 0.9) / 0.85);
      var ease2 = easeOutBack(p2);

      rackRails.forEach(function (r) {
        r.mesh.position.y = r.startY + (r.targetY - r.startY) * ease2;
      });

      // Camera slowly pans around to show frame structure
      camera.position.x = Math.sin(elapsed * 0.5) * 4.2;
      camera.position.z = Math.cos(elapsed * 0.5) * 4.2;
      camera.lookAt(0, 0, 0);
    }

    // ── STAGE 3: HARDWARE ASSEMBLY (1.9s - 3.2s) ──────────────────────────
    else if (elapsed >= 1.9 && elapsed < 3.2) {
      if (currentStage !== 3) {
        currentStage = 3;
        if (stageCode) stageCode.textContent = 'STAGE 3/6';
        if (stageName) stageName.textContent = 'HARDWARE ASSEMBLY';
        if (guideText) guideText.textContent = 'Seating server blades & NVMe storage arrays';
      }

      // Lock rack frame solid
      rackRails.forEach(function (r) { r.mesh.position.y = r.targetY; });

      // Move each module according to its individual timeline
      serverModules.forEach(function (sm) {
        if (elapsed >= sm.delay) {
          var smP = Math.min(1, (elapsed - sm.delay) / 0.65);
          var smEase = easeOutBack(smP);
          sm.group.position.lerpVectors(sm.startPos, sm.targetPos, smEase);

          if (smP >= 0.98 && !sm.hasSnapped) {
            sm.hasSnapped = true;
            playMechanicalLatch();
          }
        }
      });
    }

    // ── STAGE 4: NETWORK CONNECTION (3.2s - 4.1s) ─────────────────────────
    else if (elapsed >= 3.2 && elapsed < 4.1) {
      if (currentStage !== 4) {
        currentStage = 4;
        if (stageCode) stageCode.textContent = 'STAGE 4/6';
        if (stageName) stageName.textContent = 'NETWORK CONNECTION';
        if (guideText) guideText.textContent = 'Routing 100GbE fiber optics & patch bays';
      }

      // Ensure all modules are locked in their final rack slots
      serverModules.forEach(function (sm) { sm.group.position.copy(sm.targetPos); });

      var p4 = Math.min(1, (elapsed - 3.2) / 0.7);
      networkCables.forEach(function (nc) {
        nc.line.material.opacity = p4 * 0.85;
      });

      // Ignite neon signal photons
      animatedCablePhotons.forEach(function (ap) {
        ap.mesh.visible = true;
        ap.progress += ap.speed * 0.03;
        if (ap.progress > 1) ap.progress = 0;
        var pt = ap.curve.getPoint(ap.progress);
        ap.mesh.position.copy(pt);
      });
    }

    // ── STAGE 5: SYSTEM BOOT (4.1s - 4.8s) ────────────────────────────────
    else if (elapsed >= 4.1 && elapsed < 4.8) {
      if (currentStage !== 5) {
        currentStage = 5;
        if (stageCode) stageCode.textContent = 'STAGE 5/6';
        if (stageName) stageName.textContent = 'SYSTEM BOOT [200 OK]';
        if (guideText) guideText.textContent = 'Cooling fans spooling... All nodes synchronized';
        playFanSpoolUp();
      }

      animatedCablePhotons.forEach(function (ap) {
        ap.progress += ap.speed * 0.04;
        if (ap.progress > 1) ap.progress = 0;
        var pt = ap.curve.getPoint(ap.progress);
        ap.mesh.position.copy(pt);
      });
    }

    // ── STAGE 6: BRAND REVEAL & INTERACTIVE 3D ORBIT (4.8s+) ──────────────
    else {
      if (currentStage !== 6) {
        currentStage = 6;
        isSequenceFinished = true;
        if (stageCode) stageCode.textContent = 'STAGE 6/6';
        if (stageName) stageName.textContent = 'BUILT BY BUILDERS';
        if (guideText) guideText.textContent = 'Drag to orbit in 3D • Hover modules to inspect';

        if (brandOverlay) {
          brandOverlay.classList.add('visible');
          brandOverlay.setAttribute('aria-hidden', 'false');
        }
      }

      // Smooth interactive 3D orbit around the completed operational rack
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;

      camera.position.x += ((cameraOffset.x + Math.sin(currentRotation.y) * 5.2) - camera.position.x) * 0.06;
      camera.position.z += ((Math.cos(currentRotation.y) * 5.2) - camera.position.z) * 0.06;
      camera.position.y += ((0.4 + cameraOffset.y + currentRotation.x * 2.8) - camera.position.y) * 0.06;
      camera.lookAt(0, 0, 0);

      // Continuous data transmission through cables
      animatedCablePhotons.forEach(function (ap) {
        ap.progress += ap.speed * 0.02;
        if (ap.progress > 1) ap.progress = 0;
        var pt = ap.curve.getPoint(ap.progress);
        ap.mesh.position.copy(pt);
      });
    }

    renderer.render(scene, camera);
  }

  // ── Orbit & Touch Controls ──────────────────────────────────────────────
  function onThreeResize() {
    if (!camera || !renderer || !canvasContainer) return;
    var width = canvasContainer.clientWidth || window.innerWidth;
    var height = canvasContainer.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onPointerDown(e) {
    if (!isSequenceFinished) return;
    isDragging = true;
    previousMousePos = { x: e.clientX, y: e.clientY };
  }

  function onPointerMove(e) {
    if (!isSequenceFinished) return;
    var rect = canvasContainer.getBoundingClientRect();
    mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isDragging) {
      var deltaX = e.clientX - previousMousePos.x;
      var deltaY = e.clientY - previousMousePos.y;
      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;
      targetRotation.x = Math.max(-0.5, Math.min(0.5, targetRotation.x));
      previousMousePos = { x: e.clientX, y: e.clientY };
    } else {
      cameraOffset.x = mouseVector.x * 0.3;
      cameraOffset.y = mouseVector.y * 0.2;
      checkModuleHover();
    }
  }

  function onPointerUp() {
    isDragging = false;
  }

  function onTouchStart(e) {
    if (!isSequenceFinished) return;
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  function onTouchMove(e) {
    if (!isSequenceFinished) return;
    if (isDragging && e.touches.length === 1) {
      var deltaX = e.touches[0].clientX - previousMousePos.x;
      var deltaY = e.touches[0].clientY - previousMousePos.y;
      targetRotation.y += deltaX * 0.01;
      targetRotation.x += deltaY * 0.01;
      targetRotation.x = Math.max(-0.5, Math.min(0.5, targetRotation.x));
      previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  function onTouchEnd() {
    isDragging = false;
  }

  // ── Raycast Hover & Click Telemetry ─────────────────────────────────────
  function checkModuleHover() {
    if (!camera || !scene || !isSequenceFinished) return;
    raycaster.setFromCamera(mouseVector, camera);

    var interactiveMeshes = [];
    serverModules.forEach(function (sm) { interactiveMeshes.push(sm.mainMesh); });

    var intersects = raycaster.intersectObjects(interactiveMeshes, false);
    if (intersects.length > 0) {
      var hitMesh = intersects[0].object;
      var key = hitMesh.userData.serviceKey;
      if (hoveredModuleKey !== key) {
        hoveredModuleKey = key;
        showModuleHud(key);
        playClickPop(1400);
      }
      canvasContainer.style.cursor = 'pointer';
    } else {
      if (hoveredModuleKey && !moduleHudCard.matches(':hover')) {
        hoveredModuleKey = null;
        canvasContainer.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
    }
  }

  function showModuleHud(key) {
    var spec = MODULE_SPECS[key];
    if (!spec || !moduleHudCard) return;
    if (hudModuleTitle) hudModuleTitle.textContent = spec.title;
    if (hudModuleBadge) hudModuleBadge.textContent = spec.badge;
    if (hudModuleDesc) hudModuleDesc.textContent = spec.desc;
    if (hudModuleState) hudModuleState.textContent = spec.state;
    if (hudSpecPower) hudSpecPower.textContent = spec.power;
    if (hudSpecBus) hudSpecBus.textContent = spec.bus;
    if (hudSpecTemp) hudSpecTemp.textContent = spec.temp;

    moduleHudCard.classList.add('visible');
    moduleHudCard.setAttribute('aria-hidden', 'false');
  }

  function hideModuleHud() {
    if (!moduleHudCard) return;
    moduleHudCard.classList.remove('visible');
    moduleHudCard.setAttribute('aria-hidden', 'true');
    hoveredModuleKey = null;
  }

  if (hudCardClose) {
    hudCardClose.addEventListener('click', function (e) {
      e.stopPropagation();
      hideModuleHud();
    });
  }

  function onCanvasClick() {
    if (hoveredModuleKey && isSequenceFinished) {
      showModuleHud(hoveredModuleKey);
    }
  }

  // -------------------------------------------------------------------------
  // Enter Facility Transition & Bypass
  // -------------------------------------------------------------------------
  function enterFacility() {
    playAirlockDive();
    if (warpFlash) warpFlash.classList.add('active');

    setTimeout(function () {
      finishIntro(true);
      var homeSection = document.getElementById('home');
      if (homeSection) homeSection.scrollIntoView({ behavior: 'smooth' });
    }, 450);
  }

  function finishIntro(fast) {
    document.body.classList.remove('intro-active');
    document.body.classList.remove('lock');

    try {
      sessionStorage.setItem('the_build_floor_intro_seen', '1');
    } catch (e) {}

    if (intro) {
      intro.classList.add('done');
      intro.hidden = true;
      intro.style.display = 'none';
    }
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    // Initialize Hero 3D Operational Rack
    setTimeout(function () {
      initHeroRackScene();
    }, 100);
  }

  function playIntro() {
    window.scrollTo(0, 0);

    if (reducedMotion && !forceIntro) {
      finishIntro(true);
      return;
    }

    if (intro) {
      intro.hidden = false;
      intro.style.display = '';
      intro.classList.remove('done');
      document.body.classList.add('intro-active');
      document.body.classList.add('lock');
    }

    if (brandOverlay) {
      brandOverlay.classList.remove('visible');
      brandOverlay.setAttribute('aria-hidden', 'true');
    }
    if (warpFlash) warpFlash.classList.remove('active');
    hideModuleHud();

    var initialized = false;
    try {
      initialized = initThreeScene();
    } catch (err) {
      console.warn('Three.js initialization failed:', err);
    }

    if (initialized) {
      animateAssembly(performance.now());
    } else {
      finishIntro(true);
    }
  }

  // Button and Keyboard Handlers
  if (skipBtn) {
    skipBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      playClickPop(500);
      finishIntro(true);
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      enterFacility();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', function (e) {
      e.preventDefault();
      playClickPop(800);
      playIntro();
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && intro && !intro.hidden) {
      finishIntro(true);
    }
  });

  // Check Session Storage & URL parameters for intro bypass
  var urlParams = new URLSearchParams(window.location.search);
  var forceIntro = urlParams.has('intro');
  var shouldSkip = urlParams.has('skip');

  var seenSession = false;
  try {
    seenSession = sessionStorage.getItem('the_build_floor_intro_seen') === '1';
  } catch (e) {}

  if (shouldSkip || (seenSession && !forceIntro)) {
    finishIntro(true);
  } else {
    playIntro();
  }


  // =========================================================================
  // SECTION 5: INTERACTIVE FACILITY MAP CONTROLLER
  // =========================================================================
  var mapBays = document.querySelectorAll('.spatial-room-card, .map-bay-node');
  var previewSector = document.getElementById('preview-sector');
  var previewTitle = document.getElementById('preview-title');
  var previewDesc = document.getElementById('preview-desc');
  var previewVisual = document.getElementById('preview-visual');
  var previewTech = document.getElementById('preview-tech');
  var previewRepos = document.getElementById('preview-repos');
  var previewEnterBtn = document.getElementById('preview-enter-btn');
  var previewModalBtn = document.getElementById('preview-modal-btn');
  var conduitLines = document.querySelectorAll('.conduit-line');

  var activeFacilityDept = 'cloud';

  var FACILITY_DEPT_DATA = {
    'cloud': {
      sector: 'DEPARTMENT 01 // CLOUD INFRASTRUCTURE',
      title: 'Server Room & Distributed Fabric',
      desc: 'Multi-AZ cloud infrastructure, bare-metal server racks, Infrastructure as Code with AWS CDK and Terraform, and automated CloudWatch metrics.',
      visual: 'Industrial Server Room',
      tech: 'AWS CDK, Lambda, ECS, SQS',
      repos: '4 Deployed Templates',
      targetHash: '#department-cloud'
    },
    'dev': {
      sector: 'DEPARTMENT 02 // DEVELOPMENT LAB',
      title: 'Developer Workstation & Web Systems',
      desc: 'High-concurrency full-stack platforms, edge-rendered user interfaces, resilient API gateways, and distributed state caching.',
      visual: 'Developer Workstation',
      tech: 'Next.js 15, CloudFront Edge, API GW',
      repos: '3 Open-Source Starters',
      targetHash: '#department-dev'
    },
    'ai': {
      sector: 'DEPARTMENT 03 // INTELLIGENCE LAB',
      title: 'Neural Network & Amazon Bedrock',
      desc: 'Deploy autonomous agent frameworks, build enterprise RAG pipelines with Amazon Bedrock, and run low-latency vector embeddings.',
      visual: 'Connected Neural Network',
      tech: 'Claude 3.5 Sonnet, OpenSearch, LangChain',
      repos: '2 Active Copilot Models',
      targetHash: '#department-ai'
    },
    'security': {
      sector: 'DEPARTMENT 04 // SECURITY OPERATIONS',
      title: 'Network Security Control Room (SOC)',
      desc: 'Enforce least-privilege IAM policies, automate security compliance scans with Step Functions, and engineer TLS 1.3 encrypted data lakes.',
      visual: 'Security Operations Center',
      tech: 'AWS IAM, KMS Encryption, WAF Rules',
      repos: 'Automated IAM Linter',
      targetHash: '#department-security'
    },
    'hardware': {
      sector: 'DEPARTMENT 05 // HARDWARE LAB',
      title: 'Electronics Laboratory & IoT Core',
      desc: 'Wire microcontrollers and edge telemetry probes into AWS IoT Core, stream real-time MQTT telemetry, and process sensor data at the physical boundary.',
      visual: 'Electronics Laboratory',
      tech: 'AWS IoT Core, ESP32, MQTT, Timestream',
      repos: 'Campus Sensor Mesh Firmware',
      targetHash: '#department-hardware'
    },
    'workshop': {
      sector: 'DEPARTMENT 06 // PROJECT WORKSHOP',
      title: 'Industrial Prototyping Workspace',
      desc: 'An active prototyping workspace where student builders collaborate across departments, conduct architecture teardowns, and ship production builds.',
      visual: 'Prototyping Workspace',
      tech: 'Full-Stack CDK, Multi-Agent, Prototyping',
      repos: 'Featured Student Builds',
      targetHash: '#department-workshop'
    }
  };

  function selectFacilityDepartment(deptKey, playSound) {
    var data = FACILITY_DEPT_DATA[deptKey];
    if (!data) return;

    activeFacilityDept = deptKey;

    // Highlight Bay Node
    mapBays.forEach(function (bay) {
      if (bay.getAttribute('data-dept') === deptKey) {
        bay.classList.add('active');
        bay.setAttribute('aria-selected', 'true');
      } else {
        bay.classList.remove('active');
        bay.setAttribute('aria-selected', 'false');
      }
    });

    // Highlight Conduit Line
    conduitLines.forEach(function (line) {
      if (line.id === 'conduit-' + deptKey) {
        line.classList.add('active');
      } else {
        line.classList.remove('active');
      }
    });

    // Update Live Inspection Panel
    if (previewSector) previewSector.textContent = data.sector;
    if (previewTitle) previewTitle.textContent = data.title;
    if (previewDesc) previewDesc.textContent = data.desc;
    if (previewVisual) previewVisual.textContent = data.visual;
    if (previewTech) previewTech.textContent = data.tech;
    if (previewRepos) previewRepos.textContent = data.repos;
    if (previewEnterBtn) previewEnterBtn.href = data.targetHash;

    if (playSound) playClickPop(750);
  }

  mapBays.forEach(function (bay) {
    bay.addEventListener('click', function () {
      var d = bay.getAttribute('data-dept');
      selectFacilityDepartment(d, true);
    });

    bay.addEventListener('mouseenter', function () {
      var d = bay.getAttribute('data-dept');
      selectFacilityDepartment(d, false);
    });
  });

  if (previewModalBtn) {
    previewModalBtn.addEventListener('click', function () {
      openDomainModal(activeFacilityDept === 'workshop' ? 'cloud' : activeFacilityDept);
    });
  }

  // Initialize with Cloud Infrastructure active
  selectFacilityDepartment('cloud', false);


  // =========================================================================
  // SECTION 6: TECHNOLOGY DOMAINS MODAL / DRAWER (ALL 6 DEPARTMENTS)
  // =========================================================================
  var domainModal = document.getElementById('domain-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');
  var modalCloseBtn = document.getElementById('modal-close-btn');
  var modalSector = document.getElementById('modal-sector');
  var modalTitle = document.getElementById('modal-title');
  var modalDesc = document.getElementById('modal-desc');
  var modalTechList = document.getElementById('modal-tech-list');
  var modalWorkshopsList = document.getElementById('modal-workshops-list');
  var modalRepoLinks = document.getElementById('modal-repo-links');

  var DOMAIN_DETAILS = {
    'cloud': {
      sector: 'DEPARTMENT 01 // CLOUD INFRASTRUCTURE',
      title: 'Cloud & Infrastructure',
      desc: 'Architect resilient multi-AZ VPC topologies, codify infrastructure with AWS CDK, and implement automated CloudWatch alarms.',
      tech: [
        'AWS CDK (TypeScript / Python) & Terraform',
        'Amazon ECS on Fargate & Container Workloads',
        'Amazon EventBridge & SQS Distributed Queuing',
        'CloudWatch Metrics, Synthetics & X-Ray Distributed Tracing'
      ],
      workshops: [
        'Workshop 01: Multi-AZ VPC Architecture from Ground Zero',
        'Workshop 04: Zero-Downtime Blue/Green Deployments on ECS'
      ],
      repos: [
        { name: 'aws-cdk-production-vpc', url: 'https://github.com/PRINCE-ANTHONY/aws' },
        { name: 'serverless-sqs-dlq-pattern', url: 'https://github.com/PRINCE-ANTHONY/aws' }
      ]
    },
    'dev': {
      sector: 'DEPARTMENT 02 // DEVELOPMENT LAB',
      title: 'Development Lab & Web Systems',
      desc: 'High-concurrency full-stack platforms, edge-rendered user interfaces, resilient API gateways, and distributed state caching.',
      tech: [
        'Next.js 15 App Router & Server Components',
        'Amazon CloudFront Edge Lambda@Edge functions',
        'Amazon API Gateway REST & WebSocket backends',
        'DynamoDB Single-Table Design pattern'
      ],
      workshops: [
        'Workshop 02: Full-Stack Serverless with Cognito & DynamoDB',
        'Workshop 06: Edge-Rendered Dynamic Microservices'
      ],
      repos: [
        { name: 'nextjs-serverless-starter', url: 'https://github.com/PRINCE-ANTHONY/aws' },
        { name: 'cloudfront-edge-cache-demo', url: 'https://github.com/PRINCE-ANTHONY/aws' }
      ]
    },
    'ai': {
      sector: 'DEPARTMENT 03 // INTELLIGENCE LAB',
      title: 'Intelligence Lab & Bedrock GenAI',
      desc: 'Deploy autonomous agent frameworks, build enterprise RAG pipelines with Amazon Bedrock, and run low-latency vector embeddings.',
      tech: [
        'Amazon Bedrock (Claude 3.5 Sonnet, Titan Embeddings)',
        'Amazon OpenSearch Serverless Vector Store',
        'AWS Lambda Python 3.12 Boto3 SDK',
        'LangChain & LlamaIndex Agent Bindings'
      ],
      workshops: [
        'Workshop 03: Autonomous Multi-Turn RAG Copilot',
        'Workshop 05: Token Streaming & Caching on Amazon S3'
      ],
      repos: [
        { name: 'campus-bedrock-copilot', url: 'https://github.com/PRINCE-ANTHONY/aws' },
        { name: 'bedrock-claude-agent-starter', url: 'https://github.com/PRINCE-ANTHONY/aws' }
      ]
    },
    'security': {
      sector: 'DEPARTMENT 04 // SECURITY OPERATIONS',
      title: 'Security Operations & Zero Trust',
      desc: 'Enforce least-privilege IAM policies, automate security compliance scans with Step Functions, and engineer TLS 1.3 encrypted data lakes.',
      tech: [
        'AWS IAM Condition Keys & Permission Boundaries',
        'AWS KMS Customer Managed Keys & Envelope Encryption',
        'AWS WAF Web Access Control Lists & Rate Limiting',
        'AWS Secrets Manager & Parameter Store'
      ],
      workshops: [
        'Workshop 07: Automated S3 Bucket Security Scanner',
        'Workshop 08: Least-Privilege IAM Policy Architecture'
      ],
      repos: [
        { name: 'iam-least-privilege-linter', url: 'https://github.com/PRINCE-ANTHONY/aws' }
      ]
    },
    'hardware': {
      sector: 'DEPARTMENT 05 // HARDWARE LAB',
      title: 'Hardware & IoT Lab',
      desc: 'Wire microcontrollers and edge telemetry probes into AWS IoT Core, stream real-time MQTT telemetry, and process sensor data at the physical boundary.',
      tech: [
        'AWS IoT Core & MQTT Message Broker',
        'ESP32 & Raspberry Pi Hardware Probes',
        'Amazon Timestream Real-Time Time-Series DB',
        'AWS IoT Greengrass Edge Compute'
      ],
      workshops: [
        'Workshop 09: ESP32 Hardware Probe to AWS IoT Core',
        'Workshop 10: Building Real-Time Campus Telemetry'
      ],
      repos: [
        { name: 'esp32-aws-iot-firmware', url: 'https://github.com/PRINCE-ANTHONY/aws' }
      ]
    },
    'workshop': {
      sector: 'DEPARTMENT 06 // PROJECT WORKSHOP',
      title: 'Project Workshop & Prototyping',
      desc: 'An active prototyping workspace where student builders collaborate across departments, conduct architecture teardowns, review pull requests, and ship production builds.',
      tech: [
        'Full-Stack Cloud Infrastructure Prototyping',
        'Multi-Agent System Integration',
        'Open-Source Code Reviews & RFCs'
      ],
      workshops: [
        'Build Night 04: Serverless Event Architectures',
        'Hack-The-Cloud: 48-Hour Infrastructure Challenge'
      ],
      repos: [
        { name: 'campus-copilot-production', url: 'https://github.com/PRINCE-ANTHONY/aws' }
      ]
    }
  };

  function openDomainModal(domainKey) {
    var data = DOMAIN_DETAILS[domainKey];
    if (!data || !domainModal) return;

    if (modalSector) modalSector.textContent = data.sector;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;

    if (modalTechList) {
      modalTechList.innerHTML = '';
      data.tech.forEach(function (t) {
        var li = document.createElement('li');
        li.textContent = t;
        modalTechList.appendChild(li);
      });
    }

    if (modalWorkshopsList) {
      modalWorkshopsList.innerHTML = '';
      data.workshops.forEach(function (w) {
        var li = document.createElement('li');
        li.textContent = w;
        modalWorkshopsList.appendChild(li);
      });
    }

    if (modalRepoLinks) {
      modalRepoLinks.innerHTML = '';
      data.repos.forEach(function (r) {
        var a = document.createElement('a');
        a.className = 'modal-repo-pill';
        a.href = r.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = '<span>' + r.name + '</span> &rarr;';
        modalRepoLinks.appendChild(a);
      });
    }

    domainModal.classList.add('active');
    domainModal.setAttribute('aria-hidden', 'false');
    playClickPop(800);
  }

  function closeDomainModal() {
    if (!domainModal) return;
    domainModal.classList.remove('active');
    domainModal.setAttribute('aria-hidden', 'true');
    playClickPop(400);
  }

  document.querySelectorAll('.domain-inspect-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetKey = btn.getAttribute('data-domain-target');
      openDomainModal(targetKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDomainModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeDomainModal);

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && domainModal && domainModal.classList.contains('active')) {
      closeDomainModal();
    }
  });


  // =========================================================================
  // SECTION 6: INTERACTIVE LIVE CLOUD WORKBENCH SIMULATOR
  // Preserved Real-Time Architecture Dispatcher, Packet Routing & CloudWatch Terminal
  // =========================================================================
  var wbTriggerBtn = document.getElementById('wb-trigger-btn');
  var wbAutoBtn = document.getElementById('wb-auto-btn');
  var autoState = document.getElementById('auto-state');
  var presetBtns = document.querySelectorAll('.wb-preset-btn');
  var statInvocations = document.getElementById('stat-invocations');
  var statLatency = document.getElementById('stat-latency');
  var statMemory = document.getElementById('stat-memory');
  var statStatus = document.getElementById('stat-status');
  var statCost = document.getElementById('stat-cost');
  var terminalLogs = document.getElementById('terminal-logs');
  var terminalClear = document.getElementById('terminal-clear');
  var termCmd = document.getElementById('term-cmd');

  var node1 = document.getElementById('node-1');
  var node2 = document.getElementById('node-2');
  var node3 = document.getElementById('node-3');
  var node4 = document.getElementById('node-4');
  var packet1 = document.getElementById('packet-1');
  var packet2 = document.getElementById('packet-2');
  var packet3 = document.getElementById('packet-3');

  var n1Cat = document.getElementById('n1-cat');
  var n1Title = document.getElementById('n1-title');
  var n1Badge = document.getElementById('n1-badge');
  var n2Cat = document.getElementById('n2-cat');
  var n2Title = document.getElementById('n2-title');
  var n2Badge = document.getElementById('n2-badge');
  var n2Icon = document.getElementById('n2-icon');
  var n3Cat = document.getElementById('n3-cat');
  var n3Title = document.getElementById('n3-title');
  var n3Badge = document.getElementById('n3-badge');
  var n4Cat = document.getElementById('n4-cat');
  var n4Title = document.getElementById('n4-title');
  var n4Badge = document.getElementById('n4-badge');
  var n4Icon = document.getElementById('n4-icon');

  var totalInvocations = 0;
  var autoTrafficTimer = null;
  var currentPreset = 'api';

  var PRESET_DATA = {
    'api': {
      cmd: 'stream-tail --log-group /aws/lambda/campus-builder-service',
      memory: '256 MB',
      cost: '$0.00 (Free Tier)',
      n1: { cat: 'CLIENT', title: 'Campus Mobile App', badge: 'HTTP/2' },
      n2: { cat: 'GATEWAY', title: 'API Gateway (REST)', badge: 'v2.1 Managed', icon: '⛩️' },
      n3: { cat: 'SERVERLESS COMPUTE', title: 'AWS Lambda', badge: 'Node.js 20.x' },
      n4: { cat: 'DATABASE', title: 'Amazon DynamoDB', badge: 'Single-digit ms', icon: '⚡' },
      logGen: function (latency, reqId) {
        return [
          '<span class="log-tag">[START]</span> RequestId: ' + reqId + ' Version: $LATEST',
          '<span class="log-tag">[AUTH]</span> Cognito JWT validated for student payload. Scope: read:workshops',
          '<span class="log-tag">[DB_GET]</span> DynamoDB GetItem table=CampusWorkshops key={id: 104} (' + (latency * 0.35).toFixed(1) + 'ms)',
          '<span class="log-tag">[END]</span> RequestId: ' + reqId,
          '<span class="log-tag">[REPORT]</span> Duration: ' + latency + ' ms Billed: 100 ms Memory: 256 MB Max Used: 68 MB'
        ];
      }
    },
    'bedrock': {
      cmd: 'stream-tail --log-group /aws/bedrock/claude-3-5-sonnet/builder-agent',
      memory: '1024 MB',
      cost: '$0.00 (Free Sandbox)',
      n1: { cat: 'USER PROMPT', title: 'Student Cloud Copilot', badge: 'Next.js WebUI' },
      n2: { cat: 'API ORCHESTRATION', title: 'API Gateway + WAF', badge: 'Rate-limited', icon: '🛡️' },
      n3: { cat: 'AGENT CONTROLLER', title: 'Lambda Python 3.12', badge: 'LangChain SDK' },
      n4: { cat: 'FOUNDATION MODEL', title: 'Amazon Bedrock (Claude 3.5)', badge: '200k Context', icon: '🤖' },
      logGen: function (latency, reqId) {
        return [
          '<span class="log-tag">[START]</span> Bedrock Inference Request: ' + reqId + ' Model: anthropic.claude-3-5-sonnet',
          '<span class="log-tag">[PROMPT]</span> Context vectorized against OpenSearch syllabus corpus',
          '<span class="log-tag">[BEDROCK]</span> Emitting 482 completion tokens (' + latency + ' ms)',
          '<span class="log-tag">[REPORT]</span> Bedrock invocation finished with status 200 OK'
        ];
      }
    },
    'pipeline': {
      cmd: 'stream-tail --log-group /aws/events/campus-image-bus',
      memory: '512 MB',
      cost: '$0.00 (Free Tier)',
      n1: { cat: 'FILE UPLOAD', title: 'Campus Photo Portal', badge: 'S3 Presigned' },
      n2: { cat: 'OBJECT STORAGE', title: 'Amazon S3 Bucket', badge: 'Event Notification', icon: '🪣' },
      n3: { cat: 'EVENT ROUTER', title: 'Amazon EventBridge', badge: 'Bus Rule: s3:ObjectCreated' },
      n4: { cat: 'IMAGE WORKER', title: 'Lambda Sharp.js', badge: 'WebP Thumbnail Gen', icon: '⚙️' },
      logGen: function (latency, reqId) {
        return [
          '<span class="log-tag">[EVENT]</span> EventBridge received ObjectCreated on s3://campus-builder-assets/uploads/photo.jpg',
          '<span class="log-tag">[DISPATCH]</span> Rule "GenerateThumbnails" triggered Lambda target',
          '<span class="log-tag">[WORKER]</span> Transformed 4.2MB JPEG -> 120KB WebP in ' + latency + 'ms',
          '<span class="log-tag">[REPORT]</span> Pipeline complete: 0 drops, 100% delivery guarantee'
        ];
      }
    }
  };

  function applyPreset(name) {
    currentPreset = name;
    var data = PRESET_DATA[name];
    if (!data) return;

    if (termCmd) termCmd.textContent = data.cmd;
    if (statMemory) statMemory.textContent = data.memory;
    if (statCost) statCost.textContent = data.cost;

    if (n1Cat) n1Cat.textContent = data.n1.cat;
    if (n1Title) n1Title.textContent = data.n1.title;
    if (n1Badge) n1Badge.textContent = data.n1.badge;

    if (n2Cat) n2Cat.textContent = data.n2.cat;
    if (n2Title) n2Title.textContent = data.n2.title;
    if (n2Badge) n2Badge.textContent = data.n2.badge;
    if (n2Icon) n2Icon.textContent = data.n2.icon;

    if (n3Cat) n3Cat.textContent = data.n3.cat;
    if (n3Title) n3Title.textContent = data.n3.title;
    if (n3Badge) n3Badge.textContent = data.n3.badge;

    if (n4Cat) n4Cat.textContent = data.n4.cat;
    if (n4Title) n4Title.textContent = data.n4.title;
    if (n4Badge) n4Badge.textContent = data.n4.badge;
    if (n4Icon) n4Icon.textContent = data.n4.icon;

    if (terminalLogs) {
      terminalLogs.innerHTML = '<div class="log-line info"><span class="log-tag">[CONFIG]</span> Switched architecture pipeline to ' + name.toUpperCase() + '. Click "Dispatch Request" to test live execution.</div>';
    }
  }

  presetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      presetBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      var p = btn.getAttribute('data-preset');
      playClickPop(800);
      applyPreset(p);
    });
  });

  if (terminalClear) {
    terminalClear.addEventListener('click', function () {
      if (terminalLogs) terminalLogs.innerHTML = '';
      playClickPop(450);
    });
  }

  function dispatchSimulatedRequest() {
    totalInvocations++;
    if (statInvocations) statInvocations.textContent = totalInvocations.toLocaleString();
    if (statStatus) {
      statStatus.textContent = 'IN-FLIGHT';
      statStatus.className = 'stat-value status-executing';
    }

    var baseLatency = currentPreset === 'bedrock' ? (110 + Math.random() * 70) : (8 + Math.random() * 12);
    var latency = parseFloat(baseLatency.toFixed(1));

    playPacketChirp();

    if (node1) node1.classList.add('executing');
    if (packet1) {
      packet1.classList.remove('firing');
      void packet1.offsetWidth;
      packet1.classList.add('firing');
    }

    setTimeout(function () {
      if (node1) node1.classList.remove('executing');
      if (node2) node2.classList.add('executing');
      if (packet2) {
        packet2.classList.remove('firing');
        void packet2.offsetWidth;
        packet2.classList.add('firing');
      }
    }, 180);

    setTimeout(function () {
      if (node2) node2.classList.remove('executing');
      if (node3) node3.classList.add('executing');
      if (packet3) {
        packet3.classList.remove('firing');
        void packet3.offsetWidth;
        packet3.classList.add('firing');
      }
    }, 360);

    setTimeout(function () {
      if (node3) node3.classList.remove('executing');
      if (node4) node4.classList.add('executing');
    }, 540);

    setTimeout(function () {
      if (node4) node4.classList.remove('executing');

      if (statLatency) statLatency.textContent = latency + ' ms';
      if (statStatus) {
        statStatus.textContent = '200 OK';
        statStatus.className = 'stat-value free-tier';
      }

      if (terminalLogs) {
        var reqId = 'req-' + Math.random().toString(36).substring(2, 9);
        var preset = PRESET_DATA[currentPreset];
        if (preset && preset.logGen) {
          var lines = preset.logGen(latency, reqId);
          lines.forEach(function (ln) {
            var div = document.createElement('div');
            div.className = 'log-line';
            div.innerHTML = ln;
            terminalLogs.appendChild(div);
          });
          terminalLogs.scrollTop = terminalLogs.scrollHeight;
        }
      }
    }, 720);
  }

  if (wbTriggerBtn) {
    wbTriggerBtn.addEventListener('click', function () {
      dispatchSimulatedRequest();
    });
  }

  if (wbAutoBtn) {
    wbAutoBtn.addEventListener('click', function () {
      if (autoTrafficTimer) {
        clearInterval(autoTrafficTimer);
        autoTrafficTimer = null;
        wbAutoBtn.classList.remove('auto-active');
        if (autoState) autoState.textContent = 'OFF';
        playClickPop(400);
      } else {
        wbAutoBtn.classList.add('auto-active');
        if (autoState) autoState.textContent = 'ON';
        dispatchSimulatedRequest();
        autoTrafficTimer = setInterval(dispatchSimulatedRequest, 2400);
        playClickPop(800);
      }
    });
  }


  // =========================================================================
  // SECTION 7: 3D HOLOGRAPHIC ATTENDEE PASS PARALLAX TILT
  // =========================================================================
  var rsvpPass = document.getElementById('rsvp-pass');
  var passGlare = document.getElementById('pass-glare');

  if (rsvpPass) {
    rsvpPass.addEventListener('mousemove', function (e) {
      var rect = rsvpPass.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var midX = rect.width / 2;
      var midY = rect.height / 2;

      var rotY = ((x - midX) / midX) * 14;
      var rotX = -((y - midY) / midY) * 14;

      rsvpPass.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) scale3d(1.02, 1.02, 1.02)';

      if (passGlare) {
        var glareX = (x / rect.width) * 100;
        var glareY = (y / rect.height) * 100;
        passGlare.style.background = 'radial-gradient(circle at ' + glareX + '% ' + glareY + '%, rgba(255, 107, 36, 0.25) 0%, rgba(0, 216, 246, 0.2) 35%, transparent 75%)';
      }
    });

    rsvpPass.addEventListener('mouseleave', function () {
      rsvpPass.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (passGlare) {
        passGlare.style.background = 'linear-gradient(115deg, transparent 20%, rgba(255, 107, 36, 0.12) 40%, rgba(0, 216, 246, 0.15) 60%, transparent 80%)';
      }
    });
  }


  // =========================================================================
  // RSVP STATE & CALENDAR EXPORT (.ICS)
  // =========================================================================
  var rsvpForm = document.getElementById('rsvp-form');
  var passName = document.getElementById('pass-name');
  var passTrack = document.getElementById('pass-track');
  var passId = document.getElementById('pass-id');
  var nameInput = document.getElementById('rsvp-name');
  var emailInput = document.getElementById('rsvp-email');
  var yearSelect = document.getElementById('rsvp-year');
  var trackSelect = document.getElementById('rsvp-track');
  var nameError = document.getElementById('name-error');
  var emailError = document.getElementById('email-error');
  var downloadIcsBtn = document.getElementById('download-ics-btn');
  var editRsvpBtn = document.getElementById('edit-rsvp-btn');

  function renderPass() {
    try {
      var stored = localStorage.getItem('the_build_floor_pass');
      if (stored) {
        var data = JSON.parse(stored);
        if (data && data.name) {
          if (passName) passName.textContent = data.name;
          if (passTrack) passTrack.textContent = data.track + ' Track';
          if (passId) passId.textContent = data.id || 'TBF-2026-9042';
          if (rsvpForm) rsvpForm.hidden = true;
          if (rsvpPass) rsvpPass.hidden = false;
          return;
        }
      }
    } catch (e) {}

    if (rsvpForm) rsvpForm.hidden = false;
    if (rsvpPass) rsvpPass.hidden = true;
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';

      var nameVal = nameInput ? nameInput.value.trim() : '';
      var emailVal = emailInput ? emailInput.value.trim() : '';

      if (nameVal.length < 2) {
        if (nameError) nameError.textContent = 'Please provide your full name.';
        valid = false;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailPattern.test(emailVal)) {
        if (emailError) emailError.textContent = 'Please enter a valid university or personal email.';
        valid = false;
      }

      if (!valid) return;

      var regId = 'TBF-2026-' + Math.floor(1000 + Math.random() * 9000);
      var attendee = {
        name: nameVal,
        email: emailVal,
        year: yearSelect ? yearSelect.value : 'Junior',
        track: trackSelect ? trackSelect.value : 'Serverless & Cloud Infra',
        id: regId,
        date: new Date().toISOString()
      };

      try {
        localStorage.setItem('the_build_floor_pass', JSON.stringify(attendee));
      } catch (e) {}

      playClickPop(900);
      renderPass();
    });
  }

  if (editRsvpBtn) {
    editRsvpBtn.addEventListener('click', function () {
      try {
        var stored = localStorage.getItem('the_build_floor_pass');
        if (stored) {
          var data = JSON.parse(stored);
          if (data.name && nameInput) nameInput.value = data.name;
          if (data.email && emailInput) emailInput.value = data.email;
          if (data.year && yearSelect) yearSelect.value = data.year;
          if (data.track && trackSelect) trackSelect.value = data.track;
        }
        localStorage.removeItem('the_build_floor_pass');
      } catch (e) {}
      playClickPop(500);
      renderPass();
      if (nameInput) nameInput.focus();
    });
  }

  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', function () {
      playClickPop(850);
      var ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//The Build Floor//AWS Community Chapter//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:tbf-build-night-nov12@campus-cloud.org',
        'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        'DTSTART:20261112T183000',
        'DTEND:20261112T203000',
        'SUMMARY:The Build Floor: Build Night 04 // Serverless Event Architectures',
        'DESCRIPTION:Deploying EventBridge rules, Lambda handlers with DLQs, and DynamoDB Streams live in SEH 304.',
        'LOCATION:Science & Engineering Hall, Room 304',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'The-Build-Floor-Build-Night-04.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  renderPass();


  // =========================================================================
  // GLOBAL NAVIGATION SPY & MOBILE DRAWER
  // =========================================================================
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.getElementById('navlinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        menuToggle.innerHTML = '&#9776;';
      }
    });
  }

  // Scrollspy to set active state in topbar
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.facility-navlinks .nav-item');

  function updateActiveNav() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var currentSection = '';

    sections.forEach(function (sec) {
      var top = sec.offsetTop - 120;
      var height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    if (currentSection) {
      navItems.forEach(function (item) {
        if (item.getAttribute('data-nav') === currentSection) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Scroll Reveal Observer
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // =========================================================================
  // HERO 3D OPERATIONAL SERVER RACK CONTROLLER
  // =========================================================================
  var heroRackInitialized = false;

  function initHeroRackScene() {
    if (heroRackInitialized) return;
    var heroCanvas = document.getElementById('hero-rack-canvas');
    if (!heroCanvas || !window.THREE) return;

    var container = heroCanvas.parentElement;
    var width = container.clientWidth || 400;
    var height = container.clientHeight || 500;

    var heroScene = new THREE.Scene();
    var heroCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    heroCamera.position.set(1.5, 0.35, 4.6);
    heroCamera.lookAt(0, 0, 0);

    var heroRenderer;
    try {
      heroRenderer = new THREE.WebGLRenderer({
        canvas: heroCanvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      heroRenderer.setSize(width, height);
      heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      heroRenderer.toneMappingExposure = 1.15;
    } catch (e) {
      console.warn('Hero WebGL init failed:', e);
      return;
    }

    heroRackInitialized = true;

    // Industrial Lighting
    var amb = new THREE.AmbientLight(0x141a22, 1.4);
    heroScene.add(amb);

    var keyLight = new THREE.DirectionalLight(0xd4e2ff, 1.6);
    keyLight.position.set(3, 6, 4);
    heroScene.add(keyLight);

    var orangeRim = new THREE.DirectionalLight(0xff6b24, 2.4);
    orangeRim.position.set(-3, 2, -2);
    heroScene.add(orangeRim);

    // Subtle Ground Grid
    var grid = new THREE.GridHelper(16, 16, 0xff6b24, 0x1e2733);
    grid.position.y = -1.82;
    heroScene.add(grid);

    // Operational Server Rack Group
    var hRack = new THREE.Group();
    heroScene.add(hRack);

    // Materials
    var steelMat = new THREE.MeshStandardMaterial({ color: 0x12171f, metalness: 0.88, roughness: 0.32 });
    var railMat = new THREE.MeshStandardMaterial({ color: 0x242d38, metalness: 0.94, roughness: 0.18 });
    var darkVentMat = new THREE.MeshStandardMaterial({ color: 0x0a0d12, metalness: 0.65, roughness: 0.6 });
    var ledGreenMat = new THREE.MeshBasicMaterial({ color: 0x00e599 });
    var ledOrangeMat = new THREE.MeshBasicMaterial({ color: 0xff6b24 });
    var ledAmberMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    var chassisDarkMat = new THREE.MeshStandardMaterial({ color: 0x131922, metalness: 0.85, roughness: 0.28 });

    // 4 Corner Posts
    var postCoords = [[-0.78, 0, -0.58], [0.78, 0, -0.58], [-0.78, 0, 0.58], [0.78, 0, 0.58]];
    postCoords.forEach(function (coords) {
      var post = new THREE.Mesh(new THREE.BoxGeometry(0.07, 3.6, 0.07), steelMat);
      post.position.set(coords[0], coords[1], coords[2]);
      hRack.add(post);

      var foot = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.06, 12), steelMat);
      foot.position.set(coords[0], -1.84, coords[2]);
      hRack.add(foot);
    });

    // Top & Bottom Plates
    var topP = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.08, 1.24), steelMat);
    topP.position.y = 1.8;
    hRack.add(topP);

    var botP = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.08, 1.24), steelMat);
    botP.position.y = -1.8;
    hRack.add(botP);

    // Inner Rails
    [[-0.68, 0, 0.50], [0.68, 0, 0.50]].forEach(function (coords) {
      var rail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.2, 0.04), railMat);
      rail.position.set(coords[0], coords[1], coords[2]);
      hRack.add(rail);
    });

    // Side Panels
    var leftP = new THREE.Mesh(new THREE.BoxGeometry(0.02, 3.4, 1.12), darkVentMat);
    leftP.position.set(-0.77, 0, 0);
    hRack.add(leftP);
    var rightP = new THREE.Mesh(new THREE.BoxGeometry(0.02, 3.4, 1.12), darkVentMat);
    rightP.position.set(0.77, 0, 0);
    hRack.add(rightP);

    // 1U 100GbE Switch (42U)
    var sw = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.14, 1.0), chassisDarkMat);
    sw.position.set(0, 1.38, 0);
    hRack.add(sw);
    for (var p = 0; p < 16; p++) {
      var pLed = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.012), (p % 3 === 0 ? ledOrangeMat : ledGreenMat));
      pLed.position.set(-0.48 + p * 0.065, 1.38 + 0.02, 0.51);
      hRack.add(pLed);
    }

    // 2U Bedrock AI Tensor Accelerator (38U)
    var aiB = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.26, 1.0), new THREE.MeshStandardMaterial({
      color: 0x161e28, metalness: 0.9, roughness: 0.22, emissive: 0xff6b24, emissiveIntensity: 0.08
    }));
    aiB.position.set(0, 0.92, 0);
    hRack.add(aiB);
    var core = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 0), new THREE.MeshStandardMaterial({
      color: 0xff6b24, emissive: 0xff6b24, emissiveIntensity: 0.9
    }));
    core.position.set(0, 0.92, 0.515);
    hRack.add(core);

    // 2U Graviton4 Compute Blade (32U)
    var comp = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.26, 1.0), chassisDarkMat);
    comp.position.set(0, 0.52, 0);
    hRack.add(comp);
    for (var sd = 0; sd < 8; sd++) {
      var dLed = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.012), (sd % 2 === 0 ? ledGreenMat : ledAmberMat));
      dLed.position.set(-0.46 + sd * 0.13, 0.52 + 0.04, 0.51);
      hRack.add(dLed);
    }

    // 4U Storage Array (24U)
    var st = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.50, 1.0), chassisDarkMat);
    st.position.set(0, 0.02, 0);
    hRack.add(st);
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 6; c++) {
        var sLed = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.01), ledGreenMat);
        sLed.position.set(-0.46 + c * 0.18, 0.16 - r * 0.10, 0.51);
        hRack.add(sLed);
      }
    }

    // 2U Cloud Gateway Blade
    var gw = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.26, 1.0), chassisDarkMat);
    gw.position.set(0, -0.50, 0);
    hRack.add(gw);

    // 2U Blanking Louvers
    var bl = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.26, 0.8), darkVentMat);
    bl.position.set(0, -0.88, 0);
    hRack.add(bl);

    // 2U Redundant PDU
    var pdu = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.28, 1.0), chassisDarkMat);
    pdu.position.set(0, -1.35, 0);
    hRack.add(pdu);

    // Fiber Optics Cable Looms
    var hCables = [
      { from: new THREE.Vector3(-0.45, 1.35, 0.52), to: new THREE.Vector3(-0.32, 0.92, 0.52), color: 0xff6b24 },
      { from: new THREE.Vector3(0.15, 1.35, 0.52), to: new THREE.Vector3(0.18, 0.52, 0.52), color: 0xff6b24 },
      { from: new THREE.Vector3(-0.52, 1.35, 0.52), to: new THREE.Vector3(-0.40, 0.02, 0.52), color: 0xff8c42 }
    ];

    var cablePhotons = [];
    hCables.forEach(function (c) {
      var mid = new THREE.Vector3().addVectors(c.from, c.to).multiplyScalar(0.5);
      mid.z += 0.22;
      var curve = new THREE.QuadraticBezierCurve3(c.from, mid, c.to);
      var pts = curve.getPoints(20);
      var geo = new THREE.BufferGeometry().setFromPoints(pts);
      var line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: c.color, transparent: true, opacity: 0.85 }));
      hRack.add(line);

      var pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfffae0 }));
      hRack.add(pMesh);
      cablePhotons.push({ mesh: pMesh, curve: curve, progress: Math.random() });
    });

    // Interactive Mouse Parallax
    var hTargetRot = { x: 0.12, y: 0.35 };
    var hCurrentRot = { x: 0.12, y: 0.35 };
    var heroInView = true;

    if ('IntersectionObserver' in window) {
      var heroObs = new IntersectionObserver(function (entries) {
        heroInView = entries[0].isIntersecting;
      }, { threshold: 0.1 });
      heroObs.observe(container);
    }

    container.addEventListener('mousemove', function (e) {
      var rect = container.getBoundingClientRect();
      var nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      var ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      hTargetRot.y = 0.35 + nx * 0.45;
      hTargetRot.x = 0.12 - ny * 0.25;
    });

    window.addEventListener('resize', function () {
      var w = container.clientWidth || 400;
      var h = container.clientHeight || 500;
      heroCamera.aspect = w / h;
      heroCamera.updateProjectionMatrix();
      heroRenderer.setSize(w, h);
    });

    function renderHeroRack(t) {
      requestAnimationFrame(renderHeroRack);
      if (!heroInView) return;

      var sec = t * 0.001;
      hTargetRot.y += Math.sin(sec * 0.8) * 0.0008;

      hCurrentRot.y += (hTargetRot.y - hCurrentRot.y) * 0.06;
      hCurrentRot.x += (hTargetRot.x - hCurrentRot.x) * 0.06;

      hRack.rotation.y = hCurrentRot.y;
      hRack.rotation.x = hCurrentRot.x;

      cablePhotons.forEach(function (cp) {
        cp.progress += 0.02;
        if (cp.progress > 1) cp.progress = 0;
        var pt = cp.curve.getPoint(cp.progress);
        cp.mesh.position.copy(pt);
      });

      heroRenderer.render(heroScene, heroCamera);
    }

    renderHeroRack(performance.now());
  }

  // Initialize Hero 3D Server Rack on load if visible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroRackScene);
  } else {
    setTimeout(initHeroRackScene, 200);
  }

})();
