(function () {
  'use strict';

  // =========================================================================
  // Playful, Purposeful 3D Tech Intro: "A Team Building the Cloud"
  // Small robotic developer characters work together to assemble cloud infrastructure,
  // connect services, and bring a miniature digital environment to life.
  // =========================================================================

  var intro = document.getElementById('intro');
  var canvasContainer = document.getElementById('intro-canvas-container');
  var enterBtn = document.getElementById('enter-btn');
  var skipBtn = document.getElementById('skip');
  var replayBtn = document.getElementById('replay');
  var soundToggle = document.getElementById('sound-toggle');
  var soundIcon = document.getElementById('sound-icon');
  var soundState = document.getElementById('sound-state');
  var introHero = document.getElementById('intro-hero');
  var hoverTag = document.getElementById('hover-tag');
  var componentCard = document.getElementById('component-card');
  var cardBadge = document.getElementById('card-badge');
  var cardName = document.getElementById('card-name');
  var cardDesc = document.getElementById('card-desc');
  var cardMeta = document.getElementById('card-meta');
  var cardClose = document.getElementById('card-close');

  var timers = [];
  var autoAdvanceTimer = null;
  var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var soundEnabled = false;

  // -------------------------------------------------------------------------
  // Web Audio Synthesizer: Tactile Mechanical Audio Feedback
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

  function playFootstep(freq) {
    if (!soundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      var f = freq || (160 + Math.random() * 40);
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  function playSlotSnap() {
    if (!soundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var t = ctx.currentTime;
      // High metallic latch click
      var click = ctx.createOscillator();
      var clickGain = ctx.createGain();
      click.type = 'triangle';
      click.frequency.setValueAtTime(1400, t);
      click.frequency.exponentialRampToValueAtTime(280, t + 0.08);
      clickGain.gain.setValueAtTime(0.12, t);
      clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      click.connect(clickGain);
      clickGain.connect(ctx.destination);
      click.start(t);
      click.stop(t + 0.1);

      // Low solid impact thud
      var thud = ctx.createOscillator();
      var thudGain = ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(110, t);
      thud.frequency.exponentialRampToValueAtTime(32, t + 0.18);
      thudGain.gain.setValueAtTime(0.14, t);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      thud.connect(thudGain);
      thudGain.connect(ctx.destination);
      thud.start(t);
      thud.stop(t + 0.22);
    } catch (e) {}
  }

  function playSwitchClack() {
    if (!soundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var t = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.05);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.07);
    } catch (e) {}
  }

  function playPowerUpChord() {
    if (!soundEnabled) return;
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var t = ctx.currentTime;
      var freqs = [164.81, 246.94, 329.63, 493.88]; // E3, B3, E4, B4 harmonious chord
      freqs.forEach(function (f, i) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + i * 0.04);
        gain.gain.setValueAtTime(0.001, t + i * 0.04);
        gain.gain.linearRampToValueAtTime(0.04, t + i * 0.04 + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + i * 0.04);
        osc.stop(t + 1.3);
      });
    } catch (e) {}
  }

  // -------------------------------------------------------------------------
  // Dynamic Canvas Texture Generators for Realistic Technical Equipment
  // -------------------------------------------------------------------------
  function createCdkCodeTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    var ctx = canvas.getContext('2d');

    // Terminal Background
    ctx.fillStyle = '#1c1c1c';
    ctx.fillRect(0, 0, 512, 320);

    // Terminal Titlebar
    ctx.fillStyle = '#262626';
    ctx.fillRect(0, 0, 512, 32);

    // Window Dots
    ctx.fillStyle = '#e05353';
    ctx.beginPath(); ctx.arc(18, 16, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e5a538';
    ctx.beginPath(); ctx.arc(34, 16, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#48b870';
    ctx.beginPath(); ctx.arc(50, 16, 5, 0, Math.PI * 2); ctx.fill();

    // Tab Label
    ctx.fillStyle = '#8da3ba';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('lib/sbg-cloud-stack.ts', 74, 20);

    // Actual AWS CDK TypeScript code lines with syntax styling
    var lines = [
      { text: '// AWS Student Builder Group Infrastructure', color: '#5a6e82' },
      { text: 'import * as cdk from "aws-cdk-lib";', color: '#ff9900' },
      { text: 'import * as s3 from "aws-cdk-lib/aws-s3";', color: '#ff9900' },
      { text: 'import * as lambda from "aws-cdk-lib/aws-lambda";', color: '#ff9900' },
      { text: '', color: '#ffffff' },
      { text: 'export class SbgCloudStack extends cdk.Stack {', color: '#00e5ff' },
      { text: '  const vault = new s3.Bucket(this, "Vault", {', color: '#d8e4f0' },
      { text: '    encryption: s3.BucketEncryption.S3_MANAGED,', color: '#8da3ba' },
      { text: '    versioned: true', color: '#8da3ba' },
      { text: '  });', color: '#d8e4f0' },
      { text: '  new lambda.Function(this, "CoreCompute", {', color: '#d8e4f0' },
      { text: '    runtime: lambda.Runtime.NODEJS_20_X,', color: '#ff9900' },
      { text: '    architecture: lambda.Architecture.ARM_64,', color: '#00e5ff' },
      { text: '    handler: "index.handler"', color: '#48b870' },
      { text: '  });', color: '#d8e4f0' },
      { text: '}', color: '#00e5ff' }
    ];

    ctx.font = '13px "DM Mono", monospace';
    var y = 54;
    lines.forEach(function (l) {
      if (l.text) {
        ctx.fillStyle = l.color;
        ctx.fillText(l.text, 20, y);
      }
      y += 16;
    });

    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  function createArchDiagramTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, 512, 320);

    // Header
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, 512, 34);
    ctx.fillStyle = '#e0e0e0';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('LIVE TOPOLOGY // AWS SBG LAB CLUSTER', 20, 22);

    // Boxes for Services
    function drawBox(x, y, w, h, title, subtitle, strokeCol) {
      ctx.fillStyle = '#282828';
      ctx.strokeStyle = strokeCol || '#ff9900';
      ctx.lineWidth = 1.5;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(title, x + 10, y + 22);

      ctx.fillStyle = '#8da4bd';
      ctx.font = '11px monospace';
      ctx.fillText(subtitle, x + 10, y + 40);
    }

    drawBox(30, 60, 120, 54, 'Edge Router', 'CloudFront / PoP', '#a0a0a0');
    drawBox(195, 60, 125, 54, 'EC2 Graviton', 'Compute Blade', '#ff9900');
    drawBox(360, 60, 120, 54, 'S3 Vault', 'Durable Bucket', '#ff9900');

    drawBox(110, 155, 135, 54, 'Lambda Engine', 'Serverless Core', '#a0a0a0');
    drawBox(290, 155, 135, 54, 'DynamoDB Mesh', 'Persistence', '#ff9900');

    // Connecting Lines
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.35)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(150, 87); ctx.lineTo(195, 87);
    ctx.moveTo(320, 87); ctx.lineTo(360, 87);
    ctx.moveTo(257, 114); ctx.lineTo(257, 135); ctx.lineTo(177, 135); ctx.lineTo(177, 155);
    ctx.moveTo(257, 135); ctx.lineTo(357, 135); ctx.lineTo(357, 155);
    ctx.stroke();
    ctx.setLineDash([]);

    // Live Status Footer
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(20, 250, 472, 48);
    ctx.fillStyle = '#48b870';
    ctx.beginPath(); ctx.arc(42, 274, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e0ecf7';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('STATUS: CLOUD SERVICES CONVERGED · ALL HEALTHY', 58, 278);

    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  function createFaceCanvas(isHappy) {
    var canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, 128, 128);

    ctx.strokeStyle = '#c0c0c0';
    ctx.fillStyle = '#c0c0c0';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';

    if (isHappy) {
      // Happy eyes ^  ^
      ctx.beginPath();
      ctx.moveTo(28, 64); ctx.lineTo(44, 46); ctx.lineTo(60, 64);
      ctx.moveTo(68, 64); ctx.lineTo(84, 46); ctx.lineTo(100, 64);
      ctx.stroke();

      // Cheerful mouth
      ctx.beginPath();
      ctx.arc(64, 76, 18, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
    } else {
      // Attentive oval eyes
      ctx.beginPath();
      ctx.ellipse(44, 58, 10, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(84, 58, 10, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Flat concentrated line
      ctx.beginPath();
      ctx.moveTo(52, 90); ctx.lineTo(76, 90);
      ctx.stroke();
    }

    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  // -------------------------------------------------------------------------
  // Real Interactive Inspection Metadata for Builders and Infrastructure
  // -------------------------------------------------------------------------
  var INSPECTION_DATA = {
    'lifter': {
      badge: 'AWS COMPUTE BUILDER',
      name: 'Robotic Builder: Compute Specialist',
      desc: 'Carries and slots high-density Amazon EC2 Graviton3 server modules into the local chassis. Focuses on containerized build farms and multi-architecture workloads.',
      meta: 'Payload: EC2 Graviton3 Blade · 4 vCPU / 16GB RAM · EBS gp3 · ap-south-1a'
    },
    'networker': {
      badge: 'AWS CONNECTIVITY TECH',
      name: 'Robotic Builder: Fiber & Edge Tech',
      desc: 'Connects low-latency optical interconnects and manages VPC transit routes between distributed storage tiers and the API gateway edge.',
      meta: 'Link: Zero-Loss Optical Fiber · Protocols: HTTP/3, TLS 1.3 · MTU 9001'
    },
    'architect': {
      badge: 'AWS DEPLOY LEAD',
      name: 'Robotic Builder: Systems Architect',
      desc: 'Orchestrates infrastructure as code using the AWS Cloud Development Kit (CDK) in TypeScript and triggers automated zero-downtime deployments.',
      meta: 'Stack: AWS CDK v2.130 · Framework: Serverless REST API · Status: Active'
    },
    'rack': {
      badge: 'AWS COMPUTE CHASSIS',
      name: 'Amazon EC2 Graviton Chassis',
      desc: 'Modular 19-inch rack bay engineered for hot-swappable blade insertion, power balancing, and direct student deployment testing.',
      meta: 'Slots: 2x Modular Bays · Thermal: Active Exhaust Vents · Status: Locked & Live'
    },
    'cloud': {
      badge: 'AWS SERVERLESS CORE',
      name: 'Central Serverless & API Gateway Nexus',
      desc: 'Architectural cloud core routing requests dynamically to AWS Lambda functions and synchronizing event triggers across the student application mesh.',
      meta: 'Architecture: Event-Driven · Concurrency: Auto-scale · Latency: < 12ms'
    },
    'storage': {
      badge: 'AWS STORAGE VAULT',
      name: 'Amazon S3 Distributed Object Vault',
      desc: 'Multi-tier distributed storage platters anchored for immutable artifact storage, static website hosting, and secure data backups.',
      meta: 'Durability: 99.999999999% · Encryption: SSE-KMS · Versioning: Enabled'
    },
    'monitor': {
      badge: 'DEVELOPER WORKBENCH',
      name: 'Dual-Monitor CDK Console',
      desc: 'Engineering monitors displaying real AWS CDK TypeScript infrastructure code alongside live service topology telemetry.',
      meta: 'Display: TypeScript 5.4 · Architecture: Client → Edge → Compute → Storage'
    }
  };

  // -------------------------------------------------------------------------
  // Three.js State Variables & Scene Objects
  // -------------------------------------------------------------------------
  var scene, camera, renderer, animationFrameId;
  var inspectableObjects = [];
  var hoveredObject = null;

  // Scene Components
  var workbenchGroup, deskMonitors, serverChassis, cloudCore, storageVault;
  var serverModuleMesh = null;
  var rackLedMesh = null;
  var consoleLeverMesh = null;
  var architectFaceMaterial = null;
  var faceTextureNeutral = null;
  var faceTextureHappy = null;

  // Robotic Builders
  var lifterGroup, networkerGroup, architectGroup;
  var lifterTorso, lifterLeftLeg, lifterRightLeg, lifterLeftArm, lifterRightArm;
  var networkerTorso, networkerLeftLeg, networkerRightLeg, networkerCableHand;
  var architectLeftArm, architectRightArm, architectHeadGroup;
  var interactiveBeacons = [];

  // Dual Educational Cloud Conduits (Storage -> Lambda Core & Lambda Core -> EC2 Compute)
  var dynamicCableMesh1 = null, dynamicCableMesh2 = null;
  var dynamicCableCurve1 = null, dynamicCableCurve2 = null;
  var dataPackets1 = [], dataPackets2 = [];
  var cableConnected = false;

  // Camera Control & Animation Timeline
  var isTransitioning = false;
  var introCompleted = false;
  var sequenceStartTime = 0;
  var currentPhase = 0;

  // Orbit controls / Mouse interaction
  var mouseX = 0, mouseY = 0;
  var isDragging = false;
  var prevPointerX = 0, prevPointerY = 0;
  var orbitAngleX = 0.72; // Horizontal orbit
  var orbitAngleY = 0.65; // Vertical orbit
  var orbitDistance = 16.5;

  // Camera Target Interpolation
  var camPos = new THREE.Vector3(7.5, 6.5, 9.5);
  var camTarget = new THREE.Vector3(0, 1.2, 0);

  // -------------------------------------------------------------------------
  // Helper: Visual Discovery Locator Beacons for Accessible Discovery
  // -------------------------------------------------------------------------
  function addLocatorBeacon(parent, offsetY, color) {
    var beaconGroup = new THREE.Group();
    beaconGroup.position.set(0, offsetY, 0);

    var diamond = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.1, 0),
      new THREE.MeshStandardMaterial({ color: color || 0xdddddd, metalness: 0.6, roughness: 0.3 })
    );
    beaconGroup.add(diamond);

    var halo = new THREE.Mesh(
      new THREE.RingGeometry(0.13, 0.16, 16),
      new THREE.MeshBasicMaterial({ color: color || 0xcccccc, side: THREE.DoubleSide, transparent: true, opacity: 0.3 })
    );
    halo.rotation.x = -Math.PI / 2;
    beaconGroup.add(halo);

    beaconGroup.visible = false;
    parent.add(beaconGroup);
    interactiveBeacons.push({ group: beaconGroup, diamond: diamond, halo: halo, baseY: offsetY, parentObj: parent });
    return beaconGroup;
  }

  // -------------------------------------------------------------------------
  // 3D Tabletop Workbench Scene Initialization
  // -------------------------------------------------------------------------
  function initWorkbenchScene() {
    if (!window.THREE || !canvasContainer) return false;
    canvasContainer.innerHTML = '';

    var width = canvasContainer.clientWidth || window.innerWidth;
    var height = canvasContainer.clientHeight || window.innerHeight;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a1a1a, 0.032);

    camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(7.5, 6.5, 9.5);
    camera.lookAt(0, 1.2, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasContainer.appendChild(renderer.domElement);

    // Studio Lighting — Warm, Realistic, Restrained
    var ambientLight = new THREE.AmbientLight(0x2a2420, 1.6);
    scene.add(ambientLight);

    var keyLight = new THREE.DirectionalLight(0xfff0dd, 1.8);
    keyLight.position.set(6, 14, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -7;
    keyLight.shadow.camera.right = 7;
    keyLight.shadow.camera.top = 7;
    keyLight.shadow.camera.bottom = -7;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    // Warm fill from opposite side for depth
    var fillLight = new THREE.DirectionalLight(0xd0c0a8, 0.5);
    fillLight.position.set(-6, 4, 5);
    scene.add(fillLight);

    // Cool rim light — very subtle, just enough for edge definition
    var rimLight = new THREE.DirectionalLight(0xc0d0e0, 0.45);
    rimLight.position.set(-8, 5, -8);
    scene.add(rimLight);

    // Soft warm spot on the desk surface
    var deskLight = new THREE.PointLight(0xffe0b0, 0.6, 10);
    deskLight.position.set(-1.5, 3.5, 0.5);
    scene.add(deskLight);

    inspectableObjects = [];

    // ── 1. The Workbench Platform ─────────────────────────────────────────
    workbenchGroup = new THREE.Group();

    // Chamfered Charcoal Workbench Slab
    var slabGeo = new THREE.BoxGeometry(13.8, 0.38, 11.5);
    var slabMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.55,
      metalness: 0.35
    });
    var slab = new THREE.Mesh(slabGeo, slabMat);
    slab.position.y = -0.19;
    slab.receiveShadow = true;
    workbenchGroup.add(slab);

    // Fine Technical Grid Rulers on Desktop
    var gridMain = new THREE.GridHelper(13.6, 14, 0x3a3a3a, 0x2e2e2e);
    gridMain.position.y = 0.005;
    workbenchGroup.add(gridMain);

    // Outer Chamfered Trim
    var trimGeo = new THREE.BoxGeometry(14.05, 0.12, 11.75);
    var trimMat = new THREE.MeshStandardMaterial({ color: 0x3d3d3d, metalness: 0.6, roughness: 0.3 });
    var trim = new THREE.Mesh(trimGeo, trimMat);
    trim.position.y = -0.06;
    workbenchGroup.add(trim);

    scene.add(workbenchGroup);

    // ── 2. Dual Developer Monitors & Terminal Console ──────────────────────
    deskMonitors = new THREE.Group();

    // Stand base
    var standBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.8, 0.06, 24),
      new THREE.MeshStandardMaterial({ color: 0x303030, metalness: 0.7, roughness: 0.3 })
    );
    standBase.position.set(0, 0.03, -3.4);
    standBase.receiveShadow = true;
    deskMonitors.add(standBase);

    var standPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 1.5, 16),
      new THREE.MeshStandardMaterial({ color: 0x404040, metalness: 0.85, roughness: 0.15 })
    );
    standPole.position.set(0, 0.8, -3.4);
    deskMonitors.add(standPole);

    // Monitor 1 (Left): AWS CDK TypeScript Code Display
    var cdkTexture = createCdkCodeTexture();
    var monFrameGeo = new THREE.BoxGeometry(2.3, 1.45, 0.08);
    var monFrameMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2c, metalness: 0.65, roughness: 0.35 });
    var mon1Frame = new THREE.Mesh(monFrameGeo, monFrameMat);
    mon1Frame.position.set(-1.18, 1.25, -3.3);
    mon1Frame.rotation.y = 0.14;
    mon1Frame.castShadow = true;
    deskMonitors.add(mon1Frame);

    var mon1Screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.18, 1.35),
      new THREE.MeshBasicMaterial({ map: cdkTexture })
    );
    mon1Screen.position.set(-1.18, 1.25, -3.25);
    mon1Screen.rotation.y = 0.14;
    deskMonitors.add(mon1Screen);

    // Monitor 2 (Right): Live Cloud Architecture Topology
    var archTexture = createArchDiagramTexture();
    var mon2Frame = new THREE.Mesh(monFrameGeo, monFrameMat);
    mon2Frame.position.set(1.18, 1.25, -3.3);
    mon2Frame.rotation.y = -0.14;
    mon2Frame.castShadow = true;
    deskMonitors.add(mon2Frame);

    var mon2Screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.18, 1.35),
      new THREE.MeshBasicMaterial({ map: archTexture })
    );
    mon2Screen.position.set(1.18, 1.25, -3.25);
    mon2Screen.rotation.y = -0.14;
    deskMonitors.add(mon2Screen);

    // Workstation Keyboard & Console Tray
    var keyboard = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.04, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.3 })
    );
    keyboard.position.set(0, 0.02, -2.4);
    deskMonitors.add(keyboard);

    // Power Activation Lever Console (Operated by Architect)
    var consoleBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.28, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x353535, metalness: 0.7, roughness: 0.3 })
    );
    consoleBox.position.set(2.4, 0.14, -1.8);
    consoleBox.castShadow = true;
    deskMonitors.add(consoleBox);

    var leverBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.09, 0.06, 12),
      new THREE.MeshStandardMaterial({ color: 0x505050, metalness: 0.85, roughness: 0.15 })
    );
    leverBase.position.set(2.4, 0.3, -1.8);
    deskMonitors.add(leverBase);

    consoleLeverMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.35, 12),
      new THREE.MeshStandardMaterial({ color: 0xff9900, metalness: 0.6, roughness: 0.2 })
    );
    consoleLeverMesh.position.set(2.4, 0.45, -1.8);
    consoleLeverMesh.rotation.x = 0.45; // Up / Standby
    deskMonitors.add(consoleLeverMesh);

    deskMonitors.userData = { id: 'monitor', targetScale: 1.0 };
    scene.add(deskMonitors);
    inspectableObjects.push(deskMonitors);
    addLocatorBeacon(deskMonitors, 2.3, 0xdddddd);

    // ── 3. Server Chassis Bay (EC2 Graviton Housing) ──────────────────────
    serverChassis = new THREE.Group();
    serverChassis.position.set(-3.6, 0, -0.6);

    // Main Chassis Outer Shell
    var chassisShell = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 1.8, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x2d2d2d, metalness: 0.75, roughness: 0.3 })
    );
    chassisShell.position.y = 0.9;
    chassisShell.castShadow = true;
    chassisShell.receiveShadow = true;
    serverChassis.add(chassisShell);

    // Slot 1 (Bottom, Pre-installed Blade)
    var blade1 = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 0.4, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.65, roughness: 0.35 })
    );
    blade1.position.set(0, 0.48, 0.06);
    serverChassis.add(blade1);

    var blade1Led = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x48b870 })
    );
    blade1Led.position.set(0.38, 0.48, 0.82);
    serverChassis.add(blade1Led);

    // Slot 2 Guide Rail (Top, Waiting for Payload)
    var railL = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.45, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x484848, metalness: 0.8, roughness: 0.2 })
    );
    railL.position.set(-0.52, 1.15, 0.05);
    serverChassis.add(railL);

    var railR = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.45, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x484848, metalness: 0.8, roughness: 0.2 })
    );
    railR.position.set(0.52, 1.15, 0.05);
    serverChassis.add(railR);

    // Chassis Master Status Indicator LED (turns green on slot)
    rackLedMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.12, 0.03),
      new THREE.MeshBasicMaterial({ color: 0xff9900 }) // Amber standby initially
    );
    rackLedMesh.position.set(-0.42, 1.62, 0.81);
    serverChassis.add(rackLedMesh);

    // Optical Connection Patch Port
    var patchPort = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.14, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xff9900, metalness: 0.5, roughness: 0.4 })
    );
    patchPort.position.set(0.32, 1.62, 0.81);
    serverChassis.add(patchPort);

    serverChassis.userData = { id: 'rack', targetScale: 1.0 };
    scene.add(serverChassis);
    inspectableObjects.push(serverChassis);
    addLocatorBeacon(serverChassis, 2.1, 0xff9900);

    // ── 4. The Cloud Core (Central Architecture Dais) ──────────────────────
    cloudCore = new THREE.Group();
    cloudCore.position.set(0, 0, 0.5);

    // Hexagonal Architectural Dais
    var hexDais = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.75, 0.22, 6),
      new THREE.MeshStandardMaterial({ color: 0x303030, metalness: 0.7, roughness: 0.3 })
    );
    hexDais.position.y = 0.11;
    hexDais.receiveShadow = true;
    cloudCore.add(hexDais);

    // Glowing Neon Hex Rim
    var hexRing = new THREE.Mesh(
      new THREE.RingGeometry(1.58, 1.64, 6),
      new THREE.MeshBasicMaterial({ color: 0xff9900, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
    );
    hexRing.rotation.x = -Math.PI / 2;
    hexRing.rotation.z = Math.PI / 6;
    hexRing.position.y = 0.225;
    cloudCore.add(hexRing);

    // Central Pillar
    var centerPillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.7, 1.1, 6),
      new THREE.MeshStandardMaterial({ color: 0x383838, metalness: 0.65, roughness: 0.35 })
    );
    centerPillar.position.y = 0.75;
    centerPillar.castShadow = true;
    cloudCore.add(centerPillar);

    // Architectural Holographic Cloud Emblem
    var cloudSymbol = new THREE.Group();
    cloudSymbol.position.y = 1.65;

    var sphereCenter = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0x1a0e00, roughness: 0.35, metalness: 0.45 })
    );
    cloudSymbol.add(sphereCenter);

    var sphereLeft = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 18, 18),
      new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0x1a0e00, roughness: 0.35, metalness: 0.45 })
    );
    sphereLeft.position.set(-0.35, -0.06, 0);
    cloudSymbol.add(sphereLeft);

    var sphereRight = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 18, 18),
      new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0x1a0e00, roughness: 0.35, metalness: 0.45 })
    );
    sphereRight.position.set(0.35, -0.08, 0);
    cloudSymbol.add(sphereRight);

    var cloudBasePlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.2, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0x1a0e00, roughness: 0.35, metalness: 0.45 })
    );
    cloudBasePlate.position.y = -0.22;
    cloudSymbol.add(cloudBasePlate);

    // Orbital Ring around Cloud
    var orbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.022, 12, 36),
      new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2 })
    );
    orbitRing.rotation.x = 1.1;
    cloudSymbol.add(orbitRing);

    cloudCore.add(cloudSymbol);
    cloudCore.userData = { id: 'cloud', targetScale: 1.0, cloudSymbol: cloudSymbol, orbitRing: orbitRing };
    scene.add(cloudCore);
    inspectableObjects.push(cloudCore);
    addLocatorBeacon(cloudCore, 2.5, 0xff9900);

    // ── 5. Amazon S3 Distributed Storage Vault ─────────────────────────────
    storageVault = new THREE.Group();
    storageVault.position.set(3.8, 0, 1.2);

    var s3Pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.95, 0.16, 24),
      new THREE.MeshStandardMaterial({ color: 0x2e2e2e, metalness: 0.75, roughness: 0.25 })
    );
    s3Pedestal.position.y = 0.08;
    storageVault.add(s3Pedestal);

    for (var s = 0; s < 3; s++) {
      var platter = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.72, 0.22, 24),
        new THREE.MeshStandardMaterial({ color: 0x404040, metalness: 0.7, roughness: 0.3 })
      );
      platter.position.y = 0.28 + s * 0.34;
      platter.castShadow = true;
      storageVault.add(platter);

      var glowGasket = new THREE.Mesh(
        new THREE.CylinderGeometry(0.74, 0.74, 0.03, 24),
        new THREE.MeshBasicMaterial({ color: 0xff9900 })
      );
      glowGasket.position.y = 0.28 + s * 0.34;
      storageVault.add(glowGasket);
    }

    storageVault.userData = { id: 'storage', targetScale: 1.0 };
    scene.add(storageVault);
    inspectableObjects.push(storageVault);
    addLocatorBeacon(storageVault, 1.6, 0xdddddd);

    // ── 6. Robotic Builder 1: "The Heavy Lifter" (Compute Specialist) ─────
    lifterGroup = new THREE.Group();
    lifterGroup.position.set(-3.6, 0, 3.4); // Starts back along Z axis from server rack

    // Sturdy Rectangular Torso with Chamfers
    var torsoGeo = new THREE.BoxGeometry(0.72, 0.82, 0.58);
    var torsoMat = new THREE.MeshStandardMaterial({ color: 0x3c3c3c, metalness: 0.7, roughness: 0.35 });
    lifterTorso = new THREE.Mesh(torsoGeo, torsoMat);
    lifterTorso.position.y = 0.85;
    lifterTorso.castShadow = true;
    lifterGroup.add(lifterTorso);

    // High-visibility Orange Chest Plate
    var chestPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.58, 0.38, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xff9900, roughness: 0.35 })
    );
    chestPlate.position.set(0, 0.95, 0.31);
    lifterGroup.add(chestPlate);

    // Backpack Radiator / Power Unit
    var backpack = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.52, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x303030, metalness: 0.75, roughness: 0.25 })
    );
    backpack.position.set(0, 0.9, -0.36);
    lifterGroup.add(backpack);

    // Helmet Head with Visor
    var headGeo = new THREE.BoxGeometry(0.46, 0.38, 0.44);
    var headMat = new THREE.MeshStandardMaterial({ color: 0x353535, metalness: 0.75, roughness: 0.25 });
    var lifterHead = new THREE.Mesh(headGeo, headMat);
    lifterHead.position.set(0, 1.45, 0);
    lifterHead.castShadow = true;
    lifterGroup.add(lifterHead);

    // Glowing Amber LED Visor Strip
    var visor = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.12, 0.06),
      new THREE.MeshBasicMaterial({ color: 0xff9900 })
    );
    visor.position.set(0, 1.45, 0.23);
    lifterGroup.add(visor);

    // Articulated Legs & Feet
    var legGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.42, 12);
    var legMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.8, roughness: 0.2 });
    var footGeo = new THREE.BoxGeometry(0.24, 0.12, 0.38);
    var footMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5, metalness: 0.4 });

    lifterLeftLeg = new THREE.Group();
    lifterLeftLeg.position.set(-0.22, 0.44, 0);
    var lLegMesh = new THREE.Mesh(legGeo, legMat);
    lLegMesh.position.y = -0.15;
    lifterLeftLeg.add(lLegMesh);
    var lFootMesh = new THREE.Mesh(footGeo, footMat);
    lFootMesh.position.set(0, -0.38, 0.06);
    lifterLeftLeg.add(lFootMesh);
    lifterGroup.add(lifterLeftLeg);

    lifterRightLeg = new THREE.Group();
    lifterRightLeg.position.set(0.22, 0.44, 0);
    var rLegMesh = new THREE.Mesh(legGeo, legMat);
    rLegMesh.position.y = -0.15;
    lifterRightLeg.add(rLegMesh);
    var rFootMesh = new THREE.Mesh(footGeo, footMat);
    rFootMesh.position.set(0, -0.38, 0.06);
    lifterRightLeg.add(rFootMesh);
    lifterGroup.add(lifterRightLeg);

    // Articulated Arms Carrying the Server Module
    var armGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.55, 12);
    var armMat = new THREE.MeshStandardMaterial({ color: 0x383838, metalness: 0.7, roughness: 0.3 });

    lifterLeftArm = new THREE.Group();
    lifterLeftArm.position.set(-0.45, 1.05, 0);
    var lArmMesh = new THREE.Mesh(armGeo, armMat);
    lArmMesh.position.set(0, -0.22, 0.18);
    lArmMesh.rotation.x = 0.9;
    lifterLeftArm.add(lArmMesh);
    lifterGroup.add(lifterLeftArm);

    lifterRightArm = new THREE.Group();
    lifterRightArm.position.set(0.45, 1.05, 0);
    var rArmMesh = new THREE.Mesh(armGeo, armMat);
    rArmMesh.position.set(0, -0.22, 0.18);
    rArmMesh.rotation.x = 0.9;
    lifterRightArm.add(rArmMesh);
    lifterGroup.add(lifterRightArm);

    // The Server Module Blade (Carried by Lifter initially, then transferred into Chassis)
    serverModuleMesh = new THREE.Group();
    var bladeBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.02, 0.38, 1.48),
      new THREE.MeshStandardMaterial({ color: 0x454545, metalness: 0.75, roughness: 0.25 })
    );
    bladeBody.castShadow = true;
    serverModuleMesh.add(bladeBody);

    // Cooling Fin Grills on Top
    for (var f = 0; f < 5; f++) {
      var fin = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, 0.02, 0.12),
        new THREE.MeshBasicMaterial({ color: 0x2a2a2a })
      );
      fin.position.set(0, 0.2, -0.4 + f * 0.2);
      serverModuleMesh.add(fin);
    }
    // Blade Status LED
    var bladeLed = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 0.02),
      new THREE.MeshBasicMaterial({ color: 0xff9900 })
    );
    bladeLed.position.set(0.36, 0, -0.75);
    serverModuleMesh.add(bladeLed);

    // Attach to Lifter's hands initially
    serverModuleMesh.position.set(0, 0.95, 0.95);
    lifterGroup.add(serverModuleMesh);

    lifterGroup.userData = { id: 'lifter', targetScale: 1.0, isHolding: true };
    scene.add(lifterGroup);
    inspectableObjects.push(lifterGroup);
    addLocatorBeacon(lifterGroup, 1.95, 0xff9900);

    // ── 7. Robotic Builder 2: "The Networker" (Connectivity Tech) ─────────
    networkerGroup = new THREE.Group();
    networkerGroup.position.set(2.4, 0, 2.2); // Starts near storage vault

    // Cylindrical Sleek Torso
    var netTorsoGeo = new THREE.CylinderGeometry(0.32, 0.34, 0.72, 20);
    var netTorsoMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.65, roughness: 0.35 });
    networkerTorso = new THREE.Mesh(netTorsoGeo, netTorsoMat);
    networkerTorso.position.y = 0.78;
    networkerTorso.castShadow = true;
    networkerGroup.add(networkerTorso);

    // Backpack Optical Fiber Spool
    var spool = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.22, 16),
      new THREE.MeshStandardMaterial({ color: 0xcc8800, metalness: 0.55, roughness: 0.4 })
    );
    spool.rotation.z = Math.PI / 2;
    spool.position.set(0, 0.82, -0.38);
    networkerGroup.add(spool);

    // Dome Helmet
    var netHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 20, 16),
      new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.75, roughness: 0.25 })
    );
    netHead.position.set(0, 1.3, 0);
    networkerGroup.add(netHead);

    // Amber Visor Strip
    var netVisor = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.08, 0.05),
      new THREE.MeshBasicMaterial({ color: 0xff9900 })
    );
    netVisor.position.set(0, 1.28, 0.26);
    networkerGroup.add(netVisor);

    // Nimble Stepping Legs
    networkerLeftLeg = new THREE.Group();
    networkerLeftLeg.position.set(-0.16, 0.42, 0);
    var netLLegMesh = new THREE.Mesh(legGeo, legMat);
    netLLegMesh.position.y = -0.15;
    networkerLeftLeg.add(netLLegMesh);
    networkerGroup.add(networkerLeftLeg);

    networkerRightLeg = new THREE.Group();
    networkerRightLeg.position.set(0.16, 0.42, 0);
    var netRLegMesh = new THREE.Mesh(legGeo, legMat);
    netRLegMesh.position.y = -0.15;
    networkerRightLeg.add(netRLegMesh);
    networkerGroup.add(networkerRightLeg);

    // Connector Plug Held in Hands
    networkerCableHand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.06, 0.2, 12),
      new THREE.MeshStandardMaterial({ color: 0xffcc00, metalness: 0.9 })
    );
    networkerCableHand.rotation.x = Math.PI / 2;
    networkerCableHand.position.set(0, 0.85, 0.45);
    networkerGroup.add(networkerCableHand);

    networkerGroup.userData = { id: 'networker', targetScale: 1.0 };
    scene.add(networkerGroup);
    inspectableObjects.push(networkerGroup);
    addLocatorBeacon(networkerGroup, 1.8, 0xdddddd);

    // ── 8. Robotic Builder 3: "The Systems Architect" (Deploy Lead) ────────
    architectGroup = new THREE.Group();
    architectGroup.position.set(1.65, 0, -1.8); // Standing by the console desk

    // Compact Torso
    var archTorso = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.65, 0.42),
      new THREE.MeshStandardMaterial({ color: 0x3e3e3e, metalness: 0.7, roughness: 0.3 })
    );
    archTorso.position.y = 0.75;
    archTorso.castShadow = true;
    architectGroup.add(archTorso);

    // Retro-Futuristic Visor Screen (Expressive Face)
    faceTextureNeutral = createFaceCanvas(false);
    faceTextureHappy = createFaceCanvas(true);
    architectFaceMaterial = new THREE.MeshBasicMaterial({ map: faceTextureNeutral });

    architectHeadGroup = new THREE.Group();
    architectHeadGroup.position.set(0, 1.28, 0);

    var archHeadBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.44, 0.38, 0.38),
      new THREE.MeshStandardMaterial({ color: 0x2d2d2d, metalness: 0.8, roughness: 0.2 })
    );
    architectHeadGroup.add(archHeadBox);

    var archFaceScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.36, 0.3),
      architectFaceMaterial
    );
    archFaceScreen.position.set(0, 0, 0.2);
    architectHeadGroup.add(archFaceScreen);

    // Dual Antennas with Glowing Tips
    var antennaGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.24, 8);
    var ant1 = new THREE.Mesh(antennaGeo, new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.7, roughness: 0.3 }));
    ant1.position.set(-0.14, 0.3, 0);
    ant1.rotation.z = 0.2;
    architectHeadGroup.add(ant1);
    var antTip1 = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), new THREE.MeshBasicMaterial({ color: 0xff9900 }));
    antTip1.position.set(-0.165, 0.42, 0);
    architectHeadGroup.add(antTip1);

    var ant2 = new THREE.Mesh(antennaGeo, new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.7, roughness: 0.3 }));
    ant2.position.set(0.14, 0.3, 0);
    ant2.rotation.z = -0.2;
    architectHeadGroup.add(ant2);
    var antTip2 = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), new THREE.MeshBasicMaterial({ color: 0xff9900 }));
    antTip2.position.set(0.165, 0.42, 0);
    architectHeadGroup.add(antTip2);

    architectGroup.add(architectHeadGroup);

    // Articulated Arms
    architectLeftArm = new THREE.Group();
    architectLeftArm.position.set(-0.32, 0.95, 0);
    var aLArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.42, 10), armMat);
    aLArmMesh.position.y = -0.2;
    architectLeftArm.add(aLArmMesh);
    architectGroup.add(architectLeftArm);

    architectRightArm = new THREE.Group();
    architectRightArm.position.set(0.32, 0.95, 0);
    var aRArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.42, 10), armMat);
    aRArmMesh.position.y = -0.2;
    architectRightArm.add(aRArmMesh);
    architectGroup.add(architectRightArm);

    architectGroup.userData = { id: 'architect', targetScale: 1.0 };
    scene.add(architectGroup);
    inspectableObjects.push(architectGroup);
    addLocatorBeacon(architectGroup, 2.0, 0xdddddd);

    // ── 9. Dynamic Optical Fiber Line & Luminous Packets ───────────────────
    buildFiberCableCurve();

    // Event Listeners for Interaction
    window.addEventListener('resize', onThreeResize);
    window.addEventListener('mousemove', onThreeMouseMove);
    canvasContainer.addEventListener('mousedown', onCanvasMouseDown);
    window.addEventListener('mouseup', onCanvasMouseUp);
    canvasContainer.addEventListener('click', onCanvasClick);

    // Touch support for mobile devices
    canvasContainer.addEventListener('touchstart', onTouchStart, { passive: true });
    canvasContainer.addEventListener('touchmove', onTouchMove, { passive: true });

    if (cardClose) {
      cardClose.addEventListener('click', function (e) {
        e.stopPropagation();
        hideComponentCard();
      });
    }

    return true;
  }

  // -------------------------------------------------------------------------
  // Dynamic Dual Educational Cloud Pipelines (Storage -> Lambda & Lambda -> EC2)
  // -------------------------------------------------------------------------
  function buildFiberCableCurve() {
    if (dynamicCableMesh1) scene.remove(dynamicCableMesh1);
    if (dynamicCableMesh2) scene.remove(dynamicCableMesh2);

    // Pipeline 1: S3 Distributed Object Vault -> Central Serverless Core (Lambda & API Gateway)
    var pS3 = new THREE.Vector3(3.4, 0.15, 1.2);
    var pMid1 = new THREE.Vector3(1.7, 0.08, 0.9);
    var pCore = new THREE.Vector3(0.0, 0.22, 0.5);

    dynamicCableCurve1 = new THREE.CatmullRomCurve3([pS3, pMid1, pCore]);
    var tubeGeo1 = new THREE.TubeGeometry(dynamicCableCurve1, 28, 0.024, 8, false);
    var tubeMat1 = new THREE.MeshBasicMaterial({
      color: cableConnected ? 0xc0c0c0 : 0x606060,
      transparent: true,
      opacity: cableConnected ? 0.85 : 0.5
    });
    dynamicCableMesh1 = new THREE.Mesh(tubeGeo1, tubeMat1);
    scene.add(dynamicCableMesh1);

    // Pipeline 2: Central Serverless Core -> EC2 Graviton Compute Bay
    // While Networker runs, the conduit follows Networker's hands across the desk
    var pMid2 = new THREE.Vector3(-1.7, 0.08, 0.6);
    var pEnd2;
    if (cableConnected) {
      pEnd2 = new THREE.Vector3(-3.28, 1.62, 0.21); // Plugged into server rack patch port
    } else {
      var worldHandPos = new THREE.Vector3();
      if (networkerCableHand) {
        networkerCableHand.getWorldPosition(worldHandPos);
      } else {
        worldHandPos.set(2.4, 0.85, 2.65);
      }
      pEnd2 = worldHandPos;
    }

    dynamicCableCurve2 = new THREE.CatmullRomCurve3([pCore.clone(), pMid2, pEnd2]);
    var tubeGeo2 = new THREE.TubeGeometry(dynamicCableCurve2, 28, 0.024, 8, false);
    var tubeMat2 = new THREE.MeshBasicMaterial({
      color: cableConnected ? 0xff9900 : 0x805500,
      transparent: true,
      opacity: cableConnected ? 0.85 : 0.5
    });
    dynamicCableMesh2 = new THREE.Mesh(tubeGeo2, tubeMat2);
    scene.add(dynamicCableMesh2);

    // Dynamic photon data packets streaming along both active routes
    if (dataPackets1.length === 0) {
      for (var d = 0; d < 3; d++) {
        var pMesh1 = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 10, 10),
          new THREE.MeshBasicMaterial({ color: 0xeeeeee })
        );
        pMesh1.visible = false;
        scene.add(pMesh1);
        dataPackets1.push({ mesh: pMesh1, progress: d * 0.33, speed: 0.013 });

        var pMesh2 = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 10, 10),
          new THREE.MeshBasicMaterial({ color: 0xff9900 })
        );
        pMesh2.visible = false;
        scene.add(pMesh2);
        dataPackets2.push({ mesh: pMesh2, progress: d * 0.33, speed: 0.013 });
      }
    }
  }

  // -------------------------------------------------------------------------
  // Responsive Resize & Orbital Drag Interaction
  // -------------------------------------------------------------------------
  function onThreeResize() {
    if (!camera || !renderer || !canvasContainer) return;
    var width = canvasContainer.clientWidth || window.innerWidth;
    var height = canvasContainer.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onCanvasMouseDown(e) {
    if (introCompleted) {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    }
  }

  function onCanvasMouseUp() {
    isDragging = false;
  }

  function onTouchStart(e) {
    if (introCompleted && e.touches.length === 1) {
      isDragging = true;
      prevPointerX = e.touches[0].clientX;
      prevPointerY = e.touches[0].clientY;
    }
  }

  function onTouchMove(e) {
    if (isDragging && e.touches.length === 1) {
      var dx = e.touches[0].clientX - prevPointerX;
      var dy = e.touches[0].clientY - prevPointerY;
      orbitAngleX -= dx * 0.007;
      orbitAngleY = Math.max(0.2, Math.min(1.2, orbitAngleY + dy * 0.007));
      prevPointerX = e.touches[0].clientX;
      prevPointerY = e.touches[0].clientY;
    }
  }

  function onThreeMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    if (isDragging && introCompleted) {
      var dx = e.clientX - prevPointerX;
      var dy = e.clientY - prevPointerY;
      orbitAngleX -= dx * 0.007;
      orbitAngleY = Math.max(0.2, Math.min(1.2, orbitAngleY + dy * 0.007));
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    }

    // Raycast for hovering over inspectable objects
    if (!camera || !inspectableObjects.length) return;
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

    var hits = [];
    inspectableObjects.forEach(function (group) {
      var intersects = raycaster.intersectObjects(group.children, true);
      if (intersects.length > 0) {
        hits.push({ group: group, dist: intersects[0].distance });
      }
    });

    if (hits.length > 0) {
      hits.sort(function (a, b) { return a.dist - b.dist; });
      var targetObj = hits[0].group;
      if (hoveredObject !== targetObj) {
        if (hoveredObject) hoveredObject.userData.targetScale = 1.0;
        hoveredObject = targetObj;
        hoveredObject.userData.targetScale = 1.06;

        interactiveBeacons.forEach(function (b) {
          if (b.parentObj === hoveredObject) {
            b.diamond.scale.set(1.4, 1.4, 1.4);
            b.halo.scale.set(1.3, 1.3, 1.3);
          } else {
            b.diamond.scale.set(1.0, 1.0, 1.0);
            b.halo.scale.set(1.0, 1.0, 1.0);
          }
        });

        if (hoverTag) {
          var id = hoveredObject.userData.id;
          var info = INSPECTION_DATA[id];
          hoverTag.textContent = info ? (info.name + ' · CLICK TO INSPECT') : 'AWS ARCHITECTURE NODE';
          hoverTag.classList.add('active');
        }
      }
      if (hoverTag) {
        hoverTag.style.left = e.clientX + 'px';
        hoverTag.style.top = e.clientY + 'px';
      }
    } else {
      if (hoveredObject) {
        hoveredObject.userData.targetScale = 1.0;
        hoveredObject = null;
        interactiveBeacons.forEach(function (b) {
          b.diamond.scale.set(1.0, 1.0, 1.0);
          b.halo.scale.set(1.0, 1.0, 1.0);
        });
      }
      if (hoverTag) hoverTag.classList.remove('active');
    }
  }

  function onCanvasClick() {
    if (hoveredObject) {
      var id = hoveredObject.userData.id;
      showComponentCard(id);
    } else {
      hideComponentCard();
    }
  }

  function showComponentCard(id) {
    var data = INSPECTION_DATA[id];
    if (!data || !componentCard) return;
    cardBadge.textContent = data.badge;
    cardName.textContent = data.name;
    cardDesc.textContent = data.desc;
    cardMeta.textContent = data.meta;
    componentCard.hidden = false;
    componentCard.setAttribute('aria-hidden', 'false');
    playFootstep(320);
  }

  function hideComponentCard() {
    if (componentCard) {
      componentCard.hidden = true;
      componentCard.setAttribute('aria-hidden', 'true');
    }
  }

  // -------------------------------------------------------------------------
  // Render Loop & Wobbling Physics Simulation
  // -------------------------------------------------------------------------
  function animateThree(timestamp) {
    animationFrameId = requestAnimationFrame(animateThree);

    if (!sequenceStartTime) sequenceStartTime = timestamp;
    var elapsed = (timestamp - sequenceStartTime) * 0.001; // seconds

    // ── Phase Transitions & Choreography ────────────────────────────────
    // 0.0s - 1.0s: Quiet workspace, spotlight warms up
    // 1.0s - 2.8s: Lifter carries blade & Networker connects fiber
    // 2.8s - 3.8s: Architect flips switch, Cloud Core powers on
    // 3.8s - 5.5s: Pull-back, title and CTA appear

    // 1. Heavy Lifter Locomotion & Physics (Party Animals-inspired wobbling under weight)
    if (lifterGroup && lifterGroup.userData.isHolding) {
      if (elapsed >= 0.8 && elapsed < 2.3) {
        var walkNorm = (elapsed - 0.8) / 1.5; // 0 to 1
        lifterGroup.position.z = 3.4 - walkNorm * 3.4; // Moves toward rack z = 0.0

        var walkCycle = elapsed * 8.5;
        var wobble = Math.sin(walkCycle) * 0.12;
        lifterTorso.rotation.z = wobble;
        lifterTorso.rotation.y = -wobble * 0.6;
        lifterTorso.position.y = 0.85 + Math.abs(Math.sin(walkCycle)) * 0.06;

        // Creative Direction 1: The Stumble & Recovery!
        if (elapsed >= 1.35 && elapsed <= 1.7) {
          var stumblePhase = (elapsed - 1.35) / 0.35; // 0 to 1
          var stumbleArc = Math.sin(stumblePhase * Math.PI);
          lifterTorso.rotation.x = stumbleArc * 0.24; // Pitches forward!
          lifterTorso.position.y = 0.85 - stumbleArc * 0.08; // Foot dips
          if (serverModuleMesh) {
            serverModuleMesh.rotation.z = -stumbleArc * 0.18; // Server tilts in hands
            serverModuleMesh.position.y = 0.95 - stumbleArc * 0.05;
          }
          lifterLeftLeg.rotation.x = -stumbleArc * 0.4;
          lifterRightLeg.rotation.x = stumbleArc * 0.7; // Braces right foot forward to recover
        } else {
          lifterTorso.rotation.x = 0;
          if (serverModuleMesh) {
            serverModuleMesh.rotation.z = 0;
            serverModuleMesh.position.y = 0.95;
          }
          lifterLeftLeg.rotation.x = Math.sin(walkCycle) * 0.65;
          lifterRightLeg.rotation.x = -Math.sin(walkCycle) * 0.65;
        }

        if (Math.sin(walkCycle) > 0.95 && Math.random() < 0.25) {
          playFootstep(140);
        }
      } else if (elapsed >= 2.3 && lifterGroup.userData.isHolding) {
        // Snap the server module into the rack chassis!
        lifterGroup.userData.isHolding = false;
        lifterGroup.remove(serverModuleMesh);

        serverModuleMesh.position.set(0, 1.15, 0.06);
        serverModuleMesh.rotation.set(0, 0, 0);
        serverChassis.add(serverModuleMesh);

        if (rackLedMesh) rackLedMesh.material.color.setHex(0x48b870);

        playSlotSnap();

        lifterGroup.position.z = 0.16;
        lifterTorso.rotation.x = -0.15;
        lifterLeftLeg.rotation.x = 0;
        lifterRightLeg.rotation.x = 0;
      }
    } else if (lifterGroup && !lifterGroup.userData.isHolding) {
      // Settle & Dust Hands together ("job well done")
      lifterTorso.rotation.x += (0 - lifterTorso.rotation.x) * 0.08;
      lifterTorso.rotation.z += (0 - lifterTorso.rotation.z) * 0.08;
      lifterGroup.position.z += (0.0 - lifterGroup.position.z) * 0.08;

      if (elapsed >= 2.35 && elapsed < 2.85) {
        // Dusting off hands: arms sweep across each other in rhythmic clapping
        var dustCycle = (elapsed - 2.35) * 16;
        lifterLeftArm.rotation.x = -0.15;
        lifterRightArm.rotation.x = -0.15;
        lifterLeftArm.rotation.z = 0.2 + Math.sin(dustCycle) * 0.35;
        lifterRightArm.rotation.z = -0.2 - Math.sin(dustCycle) * 0.35;
      } else {
        // Rest hands proudly on waist
        lifterLeftArm.rotation.x += (-0.3 - lifterLeftArm.rotation.x) * 0.1;
        lifterRightArm.rotation.x += (-0.3 - lifterRightArm.rotation.x) * 0.1;
        lifterLeftArm.rotation.z += (0 - lifterLeftArm.rotation.z) * 0.1;
        lifterRightArm.rotation.z += (0 - lifterRightArm.rotation.z) * 0.1;
      }
    }

    // 2. Networker Locomotion & Fiber Cable Connection
    if (networkerGroup && !cableConnected) {
      if (elapsed >= 1.0 && elapsed < 2.6) {
        var netNorm = (elapsed - 1.0) / 1.6;
        networkerGroup.position.x = 2.4 - netNorm * 4.6;
        networkerGroup.position.z = 2.2 - netNorm * 1.8;

        var netCycle = elapsed * 11;
        networkerTorso.position.y = 0.78 + Math.abs(Math.sin(netCycle)) * 0.08;
        networkerTorso.rotation.z = Math.sin(netCycle) * 0.14;
        networkerLeftLeg.rotation.x = Math.sin(netCycle) * 0.8;
        networkerRightLeg.rotation.x = -Math.sin(netCycle) * 0.8;

        // Architect turns head toward Networker and gives an encouraging nod!
        if (architectHeadGroup && elapsed >= 1.4 && elapsed <= 2.2) {
          architectHeadGroup.rotation.y = -0.35;
          architectHeadGroup.rotation.x = 0.14 * Math.sin((elapsed - 1.4) * 10);
        }

        buildFiberCableCurve();
      } else if (elapsed >= 2.6 && !cableConnected) {
        cableConnected = true;
        buildFiberCableCurve();
        playSwitchClack();

        networkerLeftLeg.rotation.x = 0;
        networkerRightLeg.rotation.x = 0;
        networkerTorso.rotation.z = 0;
      }
    } else if (networkerGroup && cableConnected) {
      // Wave cheerfully to the team after plugging in
      if (elapsed >= 2.65 && elapsed < 3.3) {
        var waveCycle = (elapsed - 2.65) * 14;
        networkerCableHand.position.y = 1.05 + Math.sin(waveCycle) * 0.08;
        networkerTorso.rotation.y = -0.4;
      } else {
        networkerTorso.rotation.y += (0 - networkerTorso.rotation.y) * 0.08;
        networkerCableHand.position.y += (0.85 - networkerCableHand.position.y) * 0.08;
      }
    }

    // 3. Systems Architect Lever Pull & Cloud Power-On
    if (architectGroup) {
      if (elapsed >= 2.8 && elapsed < 3.2) {
        var leverNorm = (elapsed - 2.8) / 0.4;
        architectRightArm.rotation.x = 0.6 + leverNorm * 0.5;
        if (consoleLeverMesh) consoleLeverMesh.rotation.x = 0.45 - leverNorm * 0.9;
        if (architectHeadGroup) {
          architectHeadGroup.rotation.y = 0;
          architectHeadGroup.rotation.x = 0.2;
        }
      } else if (elapsed >= 3.2 && currentPhase < 3) {
        currentPhase = 3;
        playSwitchClack();
        playPowerUpChord();

        if (architectFaceMaterial && faceTextureHappy) {
          architectFaceMaterial.map = faceTextureHappy;
          architectFaceMaterial.needsUpdate = true;
        }

        if (cloudCore && cloudCore.userData.cloudSymbol) {
          cloudCore.userData.cloudSymbol.children.forEach(function (child) {
            if (child.material && child.material.emissive) {
              child.material.emissive.setHex(0xff7700);
            }
          });
        }

        dataPackets1.forEach(function (dp) { dp.mesh.visible = true; });
        dataPackets2.forEach(function (dp) { dp.mesh.visible = true; });
      }

      // Celebratory Victory Wave after Phase 3
      if (currentPhase >= 3) {
        var cheerCycle = (elapsed - 3.2) * 8;
        architectLeftArm.rotation.x = -1.2 + Math.sin(cheerCycle) * 0.35;
        architectRightArm.rotation.x = -1.2 + Math.cos(cheerCycle) * 0.35;
        architectGroup.position.y = Math.max(0, Math.sin(cheerCycle) * 0.12);
        if (architectHeadGroup) {
          architectHeadGroup.rotation.x = -0.15;
          architectHeadGroup.rotation.y = Math.sin(cheerCycle * 0.5) * 0.15;
        }
      }
    }

    // 4. Cloud Core Idle Animation & Dual Pipeline Data Stream
    if (currentPhase >= 3) {
      if (cloudCore && cloudCore.userData.cloudSymbol) {
        cloudCore.userData.cloudSymbol.rotation.y += 0.015;
        if (cloudCore.userData.orbitRing) cloudCore.userData.orbitRing.rotation.z += 0.02;
      }
      if (dynamicCableCurve1) {
        dataPackets1.forEach(function (dp) {
          dp.progress += dp.speed;
          if (dp.progress > 1.0) dp.progress = 0.0;
          var pt = dynamicCableCurve1.getPoint(dp.progress);
          dp.mesh.position.copy(pt);
        });
      }
      if (dynamicCableCurve2) {
        dataPackets2.forEach(function (dp) {
          dp.progress += dp.speed;
          if (dp.progress > 1.0) dp.progress = 0.0;
          var pt = dynamicCableCurve2.getPoint(dp.progress);
          dp.mesh.position.copy(pt);
        });
      }
    }

    // 5. Cinematic Pull-back Camera & Reveal (Phase 4)
    if (elapsed >= 3.8 && !introCompleted) {
      if (!introHero.classList.contains('revealed')) {
        introHero.classList.add('revealed');
      }
    }

    if (elapsed >= 4.5 && !introCompleted) {
      introCompleted = true;
    }

    // Floating Discovery Cues (Locator Beacons)
    if (introCompleted && interactiveBeacons.length) {
      interactiveBeacons.forEach(function (b) {
        b.group.visible = true;
        b.diamond.rotation.y += 0.025;
        b.halo.rotation.z += 0.015;
        b.group.position.y = b.baseY + Math.sin(elapsed * 3.2) * 0.035;
      });
    }

    // Smooth Camera Motion Interpolation (Hermite S-curve ease, completely non-disorienting)
    if (!isTransitioning && camera) {
      if (introCompleted) {
        var targetX = Math.sin(orbitAngleX) * Math.cos(orbitAngleY) * orbitDistance;
        var targetY = Math.sin(orbitAngleY) * orbitDistance;
        var targetZ = Math.cos(orbitAngleX) * Math.cos(orbitAngleY) * orbitDistance;

        camPos.x += (targetX - camPos.x) * 0.05;
        camPos.y += (targetY - camPos.y) * 0.05;
        camPos.z += (targetZ - camPos.z) * 0.05;
        camera.position.copy(camPos);
        camera.lookAt(camTarget);
      } else {
        var camProgress = Math.min(1.0, elapsed / 4.4);
        var ease = camProgress * camProgress * (3 - 2 * camProgress);

        var startCam = new THREE.Vector3(7.2, 5.8, 8.8);
        var endCam = new THREE.Vector3(11.5, 10.8, 11.5);

        camPos.lerpVectors(startCam, endCam, ease);
        camera.position.copy(camPos);
        camera.lookAt(0, 0.9, 0);
      }
    }

    // Elastic Scale on Hovered Objects
    inspectableObjects.forEach(function (obj) {
      var target = obj.userData.targetScale || 1.0;
      var cur = obj.scale.x;
      var s = cur + (target - cur) * 0.15;
      obj.scale.set(s, s, s);
    });

    renderer.render(scene, camera);
  }

  // -------------------------------------------------------------------------
  // Finish & Exit Transition (Seamless Transition to Homepage)
  // -------------------------------------------------------------------------
  function finishIntro(fast) {
    if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
    timers.forEach(clearTimeout);
    timers = [];

    hideComponentCard();
    document.body.style.cursor = 'default';
    document.body.classList.remove('intro-active');
    document.body.classList.remove('lock');

    try {
      sessionStorage.setItem('sbg_cloud_intro_seen', '1');
    } catch (e) {}

    if (fast) {
      if (intro) {
        intro.classList.add('done');
        intro.hidden = true;
      }
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      return;
    }

    // Cinematic zoom in through workbench into the website
    isTransitioning = true;
    if (camera) {
      var startY = camera.position.y;
      var startTime = Date.now();
      function zoomStep() {
        var elapsed = (Date.now() - startTime) / 500;
        if (elapsed < 1.0) {
          camera.position.y = startY - elapsed * 4.5;
          camera.position.x -= elapsed * 3.0;
          camera.position.z -= elapsed * 3.0;
          requestAnimationFrame(zoomStep);
        }
      }
      zoomStep();
    }

    if (intro) intro.classList.add('done');
    setTimeout(function () {
      if (intro) intro.hidden = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }, 750);
  }

  function playIntro() {
    timers.forEach(clearTimeout);
    timers = [];
    if (autoAdvanceTimer) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }

    window.scrollTo(0, 0);

    if (reducedMotion) {
      if (intro) intro.hidden = true;
      document.body.classList.remove('intro-active');
      document.body.classList.remove('lock');
      return;
    }

    if (intro) {
      intro.hidden = false;
      intro.classList.remove('done');
      document.body.classList.add('intro-active');
      document.body.classList.add('lock');
    }

    if (introHero) {
      introHero.classList.remove('revealed');
    }

    // Reset State
    cableConnected = false;
    currentPhase = 0;
    introCompleted = false;
    isTransitioning = false;
    sequenceStartTime = 0;

    var initialized = initWorkbenchScene();
    if (initialized) {
      animateThree(0);
    } else {
      finishIntro(true);
    }
  }

  // -------------------------------------------------------------------------
  // Control Buttons & Keyboard Accessibility
  // -------------------------------------------------------------------------
  if (skipBtn) {
    skipBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      finishIntro(true);
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      finishIntro(false);
      var targetSection = document.getElementById('about') || document.getElementById('home');
      if (targetSection) {
        setTimeout(function () {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', function (e) {
      e.preventDefault();
      playIntro();
    });
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      soundEnabled = !soundEnabled;
      if (soundIcon) soundIcon.innerHTML = soundEnabled ? '&#9834;' : '&#10006;';
      if (soundState) soundState.textContent = soundEnabled ? 'Sound On' : 'Sound Muted';
      soundToggle.setAttribute('aria-label', soundEnabled ? 'Mute sound effects' : 'Unmute sound effects');
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && intro && !intro.hidden) {
      finishIntro(true);
    }
  });

  // Session storage check: play once per session automatically, replay via nav button or ?intro / ?replay / ?v= URL params
  var urlParams = new URLSearchParams(window.location.search);
  var forceIntro = urlParams.has('intro') || urlParams.has('replay') || urlParams.has('v');
  var introSeen = false;
  try {
    introSeen = sessionStorage.getItem('sbg_cloud_intro_seen') === '1';
  } catch (e) {}

  if (introSeen && !forceIntro) {
    if (intro) intro.hidden = true;
    document.body.classList.remove('intro-active');
    document.body.classList.remove('lock');
  } else {
    playIntro();
  }

  // ---------- Mobile Navigation Drawer ----------
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

  // ---------- Intersection Observer for Scroll Reveals ----------
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---------- RSVP State & Calendar Export (.ics) ----------
  var rsvpForm = document.getElementById('rsvp-form');
  var rsvpPass = document.getElementById('rsvp-pass');
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
      var stored = localStorage.getItem('sbg_membership');
      if (stored) {
        var data = JSON.parse(stored);
        if (data && data.name) {
          if (passName) passName.textContent = data.name;
          if (passTrack) passTrack.textContent = data.track + ' Track';
          if (passId) passId.textContent = data.id || 'SBG-2026-9042';
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
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      }

      if (!valid) return;

      var regId = 'SBG-2026-' + Math.floor(1000 + Math.random() * 9000);
      var attendee = {
        name: nameVal,
        email: emailVal,
        year: yearSelect ? yearSelect.value : 'Junior',
        track: trackSelect ? trackSelect.value : 'Serverless & APIs',
        id: regId,
        date: new Date().toISOString()
      };

      try {
        localStorage.setItem('sbg_membership', JSON.stringify(attendee));
      } catch (e) {}

      renderPass();
    });
  }

  if (editRsvpBtn) {
    editRsvpBtn.addEventListener('click', function () {
      try {
        var stored = localStorage.getItem('sbg_membership');
        if (stored) {
          var data = JSON.parse(stored);
          if (data.name && nameInput) nameInput.value = data.name;
          if (data.email && emailInput) emailInput.value = data.email;
          if (data.year && yearSelect) yearSelect.value = data.year;
          if (data.track && trackSelect) trackSelect.value = data.track;
        }
        localStorage.removeItem('sbg_membership');
      } catch (e) {}
      renderPass();
      if (nameInput) nameInput.focus();
    });
  }

  // Calendar .ics generator
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', function () {
      var ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//AWS Student Builder Group//Campus Chapter//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:sbg-build-night-nov12@campus-cloud.org',
        'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        'DTSTART:20261112T183000',
        'DTEND:20261112T200000',
        'SUMMARY:AWS Student Builder Group: Serverless Image Pipeline',
        'DESCRIPTION:Hands-on cloud build session deploying AWS Lambda, S3, and EventBridge.',
        'LOCATION:Science & Engineering Hall, Room 304',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'AWS-Build-Night-Nov12.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  renderPass();
})();
