(function () {
  'use strict';

  // =========================================================================
  // Futuristic Interactive 3D Cloud Workspace Intro (Three.js)
  // Inspired by Bruno Simon's 3D interactive experience, reimagined for
  // AWS Student Builder Group with EC2, S3, Lambda & Cloud Architecture.
  // =========================================================================

  var intro = document.getElementById('intro');
  var canvasContainer = document.getElementById('intro-canvas-container');
  var enterBtn = document.getElementById('enter-btn');
  var skipBtn = document.getElementById('skip');
  var replayBtn = document.getElementById('replay');
  var hudStatusText = document.getElementById('hud-status-text');
  var hudPercent = document.getElementById('hud-percent');
  var hudBarFill = document.getElementById('hud-bar-fill');
  var hoverTag = document.getElementById('hover-tag');
  var componentCard = document.getElementById('component-card');
  var cardBadge = document.getElementById('card-badge');
  var cardName = document.getElementById('card-name');
  var cardDesc = document.getElementById('card-desc');
  var cardMeta = document.getElementById('card-meta');
  var cardClose = document.getElementById('card-close');

  var autoTimer = null;
  var timers = [];
  var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Web Audio for subtle, tactile feedback
  var audioCtx = null;
  function playPop(freq) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'sine';
      var f = freq || 540;
      osc.frequency.setValueAtTime(f, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(f * 1.35, audioCtx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.085);
    } catch (e) {}
  }

  // Three.js State
  var scene, camera, renderer, animationFrameId;
  var builderGroup, deskGroup;
  var interactiveNodes = []; // EC2, S3, Lambda, Architecture
  var circuitLines = [];
  var dataPackets = [];
  var ambientParticles = null;
  var hoveredNode = null;
  var targetCamX = 0, targetCamY = 2.8;
  var mouseX = 0, mouseY = 0;
  var isTransitioning = false;
  var isInteracting = false;
  var assemblyProgress = 0;

  // Component Data Specs
  var COMPONENT_INFO = {
    'EC2': {
      badge: 'AWS COMPUTE',
      title: 'Amazon EC2 (Elastic Compute Cloud)',
      desc: 'Resilient, scalable virtual server instances powering backend microservices, student-built APIs, and containerized machine learning pipelines.',
      meta: 'Instance: t4g.xlarge (Graviton) · Status: Active · 4 vCPU / 16GB RAM'
    },
    'S3': {
      badge: 'AWS STORAGE',
      title: 'Amazon S3 (Simple Storage Service)',
      desc: 'Industry-standard object storage engineered for 99.999999999% (11 9s) durability. Hosts static web assets, data lakes, and event-driven triggers.',
      meta: 'Tier: Standard · Replication: Multi-AZ · Encryption: SSE-KMS'
    },
    'Lambda': {
      badge: 'AWS SERVERLESS',
      title: 'AWS Lambda (Serverless Compute)',
      desc: 'Run event-driven backend code automatically without provisioning servers. Instantly scales to tens of thousands of requests with millisecond execution.',
      meta: 'Runtime: Node.js 20.x · Execution: Event-Triggered · Cost: Pay-per-ms'
    },
    'Cloud Architecture': {
      badge: 'WELL-ARCHITECTED',
      title: 'AWS Cloud Architecture Mesh',
      desc: 'A unified cloud topology orchestrating compute, serverless, and storage into a fault-tolerant, scalable foundation built by student engineers.',
      meta: 'Pillars: Reliability · Security · Performance · Cost Optimization'
    }
  };

  // Dynamic Canvas Texture for IDE Screens
  function createCodeTexture(isTerminal) {
    var canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = isTerminal ? '#091019' : '#080d14';
    ctx.fillRect(0, 0, 512, 320);

    ctx.fillStyle = '#ff9900';
    ctx.font = 'bold 15px monospace';
    var title = isTerminal ? '~/aws-builder-group $ cdk deploy --all' : 'import { Stack, aws_s3, aws_lambda } from "aws-cdk-lib";';
    ctx.fillText(title, 20, 32);

    var colors = ['#00d4ff', '#ff9900', '#34d399', '#f472b6', '#a78bfa', '#fbbf24', '#94a3b8'];
    for (var i = 0; i < 11; i++) {
      var y = 62 + i * 22;
      var indent = (i % 3 === 0 ? 0 : 22);
      var width = 110 + ((i * 53) % 250);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(20 + indent, y, width, 9);

      if (i % 2 === 0) {
        ctx.fillStyle = '#475569';
        ctx.fillRect(20 + indent + width + 14, y, 55, 9);
      }
    }
    return new THREE.CanvasTexture(canvas);
  }

  // -------------------------------------------------------------------------
  // 3D Scene Initialization
  // -------------------------------------------------------------------------
  function initThreeScene() {
    if (!window.THREE || !canvasContainer) return false;
    canvasContainer.innerHTML = '';

    var width = canvasContainer.clientWidth || window.innerWidth;
    var height = canvasContainer.clientHeight || window.innerHeight;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080d14, 0.045);

    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 2.8, 6.2);
    camera.lookAt(0, 1.25, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasContainer.appendChild(renderer.domElement);

    // Studio & Neon Lights
    var ambientLight = new THREE.AmbientLight(0x182433, 1.2);
    scene.add(ambientLight);

    var keyLight = new THREE.DirectionalLight(0xfff5e6, 1.6);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    var orangeGlow = new THREE.PointLight(0xff9900, 2.8, 7);
    orangeGlow.position.set(0, 1.7, 0.2);
    scene.add(orangeGlow);

    var cyanRim = new THREE.DirectionalLight(0x00d4ff, 1.4);
    cyanRim.position.set(-5, 4, -4);
    scene.add(cyanRim);

    // Glowing Neon Grid Floor
    var floorGeo = new THREE.PlaneGeometry(26, 26);
    var floorMat = new THREE.MeshStandardMaterial({ color: 0x070c13, roughness: 0.35, metalness: 0.7 });
    var floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    var grid = new THREE.GridHelper(26, 30, 0x1d3348, 0x0f1c29);
    grid.position.y = 0.01;
    scene.add(grid);

    // Ambient Floating Data Particles (Cyan & Orange)
    var particleCount = 70;
    var pGeo = new THREE.BufferGeometry();
    var pPos = new Float32Array(particleCount * 3);
    var pColors = new Float32Array(particleCount * 3);

    for (var p = 0; p < particleCount; p++) {
      pPos[p * 3] = (Math.random() - 0.5) * 8;
      pPos[p * 3 + 1] = 0.5 + Math.random() * 3.5;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 5;

      var isOrange = Math.random() > 0.45;
      pColors[p * 3] = isOrange ? 1.0 : 0.0;
      pColors[p * 3 + 1] = isOrange ? 0.6 : 0.83;
      pColors[p * 3 + 2] = isOrange ? 0.0 : 1.0;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    var pMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });
    ambientParticles = new THREE.Points(pGeo, pMat);
    scene.add(ambientParticles);

    // -----------------------------------------------------------------------
    // Tech Workbench Construction
    // -----------------------------------------------------------------------
    deskGroup = new THREE.Group();
    var topGeo = new THREE.BoxGeometry(3.6, 0.08, 1.6);
    var topMat = new THREE.MeshStandardMaterial({ color: 0x141e2a, roughness: 0.25, metalness: 0.7 });
    var deskTop = new THREE.Mesh(topGeo, topMat);
    deskTop.position.set(0, 0.95, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskGroup.add(deskTop);

    // Ambient Orange LED Edge on Desk Back
    var ledGeo = new THREE.BoxGeometry(3.6, 0.03, 0.02);
    var ledMat = new THREE.MeshBasicMaterial({ color: 0xff9900 });
    var ledStrip = new THREE.Mesh(ledGeo, ledMat);
    ledStrip.position.set(0, 0.99, -0.79);
    deskGroup.add(ledStrip);

    // Sturdy Steel Legs
    var legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.95, 12);
    var legMat = new THREE.MeshStandardMaterial({ color: 0x0c1219, metalness: 0.9, roughness: 0.2 });
    [[-1.65, 0.475, -0.65], [1.65, 0.475, -0.65], [-1.65, 0.475, 0.65], [1.65, 0.475, 0.65]].forEach(function (pos) {
      var leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    // Dual Curved Ultrawide Monitors
    var codeTex1 = createCodeTexture(false);
    var codeTex2 = createCodeTexture(true);
    var monGeo = new THREE.BoxGeometry(1.2, 0.68, 0.03);
    var bezelMat = new THREE.MeshStandardMaterial({ color: 0x090f16, metalness: 0.8 });

    var leftMon = new THREE.Group();
    leftMon.add(new THREE.Mesh(monGeo, new THREE.MeshBasicMaterial({ map: codeTex1 })));
    var lBezel = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.72, 0.04), bezelMat);
    lBezel.position.z = -0.01;
    leftMon.add(lBezel);
    leftMon.position.set(-0.72, 1.55, -0.45);
    leftMon.rotation.y = 0.22;
    deskGroup.add(leftMon);

    var rightMon = new THREE.Group();
    rightMon.add(new THREE.Mesh(monGeo, new THREE.MeshBasicMaterial({ map: codeTex2 })));
    var rBezel = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.72, 0.04), bezelMat);
    rBezel.position.z = -0.01;
    rightMon.add(rBezel);
    rightMon.position.set(0.72, 1.55, -0.45);
    rightMon.rotation.y = -0.22;
    deskGroup.add(rightMon);

    // Keyboard & Deskpad
    var kbGeo = new THREE.BoxGeometry(0.68, 0.02, 0.24);
    var kbMat = new THREE.MeshStandardMaterial({ color: 0x111a24, metalness: 0.5 });
    var keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(0, 1.0, 0.2);
    deskGroup.add(keyboard);

    // Mini Server Blade Chassis on Desk with Activity LEDs
    var bladeRack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.65, 0.48), new THREE.MeshStandardMaterial({ color: 0x101721, metalness: 0.8 }));
    bladeRack.position.set(1.45, 1.32, -0.3);
    bladeRack.castShadow = true;
    deskGroup.add(bladeRack);

    for (var l = 0; l < 4; l++) {
      var led = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.01), new THREE.MeshBasicMaterial({ color: l % 2 === 0 ? 0xff9900 : 0x00d4ff }));
      led.position.set(1.35, 1.15 + l * 0.1, -0.05);
      deskGroup.add(led);
    }

    // Holographic Pedestal Projector
    var pedGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.05, 24);
    var pedMat = new THREE.MeshStandardMaterial({ color: 0x111c28, metalness: 0.8, roughness: 0.2 });
    var pedestal = new THREE.Mesh(pedGeo, pedMat);
    pedestal.position.set(0, 0.98, -0.1);
    deskGroup.add(pedestal);

    var pedRing = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.02, 12, 32), new THREE.MeshBasicMaterial({ color: 0xff9900 }));
    pedRing.rotation.x = Math.PI / 2;
    pedRing.position.set(0, 1.01, -0.1);
    deskGroup.add(pedRing);

    // Hologram Light Cone
    var beamGeo = new THREE.ConeGeometry(1.3, 1.6, 24, 1, true);
    var beamMat = new THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.1, side: THREE.DoubleSide });
    var beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, 1.78, -0.1);
    beam.rotation.x = Math.PI;
    deskGroup.add(beam);

    scene.add(deskGroup);

    // -----------------------------------------------------------------------
    // The Stylized 3D Student Builder
    // -----------------------------------------------------------------------
    builderGroup = new THREE.Group();
    builderGroup.position.set(0, 0, 0.85);

    // Ergonomic Chair Back
    var chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.08), new THREE.MeshStandardMaterial({ color: 0x0b1017, roughness: 0.6 }));
    chairBack.position.set(0, 1.15, 0.3);
    builderGroup.add(chairBack);

    // Character Torso (Charcoal Tech Hoodie)
    var torsoGeo = new THREE.BoxGeometry(0.58, 0.65, 0.36);
    var hoodieMat = new THREE.MeshStandardMaterial({ color: 0x141c26, roughness: 0.7 });
    var torso = new THREE.Mesh(torsoGeo, hoodieMat);
    torso.position.set(0, 1.15, 0.05);
    torso.rotation.x = 0.06;
    torso.castShadow = true;
    builderGroup.add(torso);

    // Stylized Head
    var headGeo = new THREE.BoxGeometry(0.32, 0.35, 0.32);
    var headMat = new THREE.MeshStandardMaterial({ color: 0xf5cfb3, roughness: 0.5 });
    var head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, 1.62, 0.06);
    builderGroup.add(head);

    // Dark Hair
    var hairGeo = new THREE.BoxGeometry(0.35, 0.14, 0.34);
    var hairMat = new THREE.MeshStandardMaterial({ color: 0x1a232f, roughness: 0.9 });
    var hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 1.77, 0.06);
    builderGroup.add(hair);

    // Glowing Orange Cyber Visor
    var visorGeo = new THREE.BoxGeometry(0.36, 0.08, 0.16);
    var visorMat = new THREE.MeshBasicMaterial({ color: 0xff9900 });
    var visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 1.65, 0.16);
    builderGroup.add(visor);

    // Arms Typing at Keyboard
    var lArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.12), hoodieMat);
    lArm.position.set(-0.28, 1.12, -0.15);
    lArm.rotation.x = 0.75;
    builderGroup.add(lArm);

    var rArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.12), hoodieMat);
    rArm.position.set(0.28, 1.12, -0.15);
    rArm.rotation.x = 0.75;
    builderGroup.add(rArm);

    scene.add(builderGroup);

    // -----------------------------------------------------------------------
    // The 4 Core AWS Cloud Nodes (EC2, S3, Lambda, Cloud Architecture)
    // -----------------------------------------------------------------------
    interactiveNodes = [];

    // Helper: Build a floating node
    function makeInteractiveNode(name, group, posX, posY, posZ) {
      group.position.set(posX, posY, posZ);
      group.scale.set(0.001, 0.001, 0.001);
      group.userData = {
        name: name,
        basePos: new THREE.Vector3(posX, posY, posZ),
        baseScale: 1.0,
        targetScale: 0.001,
        rotSpeedY: 0.015,
        rotSpeedX: 0.005,
        floatOffset: Math.random() * Math.PI * 2
      };
      scene.add(group);
      interactiveNodes.push(group);
      return group;
    }

    // 1. EC2: Rack-mount Blade Compute Chassis with glowing core and activity LEDs
    var ec2Group = new THREE.Group();
    var ec2Body = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.32, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x121a24, metalness: 0.85, roughness: 0.25 })
    );
    var ec2Core = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.18, 0.42),
      new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0x884400, roughness: 0.2 })
    );
    var ec2Bracket = new THREE.Mesh(
      new THREE.BoxGeometry(0.54, 0.36, 0.44),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true })
    );
    ec2Group.add(ec2Body);
    ec2Group.add(ec2Core);
    ec2Group.add(ec2Bracket);
    makeInteractiveNode('EC2', ec2Group, -1.25, 2.05, -0.15);

    // 2. S3: Tiered Cylindrical Storage Bucket with Dual Orbital Data Rings
    var s3Group = new THREE.Group();
    for (var s = 0; s < 3; s++) {
      var s3Disc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 0.07, 24),
        new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0x663300, roughness: 0.3, metalness: 0.6 })
      );
      s3Disc.position.y = (s - 1) * 0.11;
      s3Group.add(s3Disc);
    }
    var s3Ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.014, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0xffb84d })
    );
    s3Ring1.rotation.x = 0.55;
    var s3Ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.38, 0.012, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff })
    );
    s3Ring2.rotation.y = 0.7;
    s3Group.add(s3Ring1);
    s3Group.add(s3Ring2);
    makeInteractiveNode('S3', s3Group, 1.25, 2.05, -0.15);

    // 3. Lambda: Vibrant AWS Orange Serverless Energy Octahedron with pulsing cage
    var lambdaGroup = new THREE.Group();
    var lamCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.28, 0),
      new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0xcc6600, roughness: 0.2, metalness: 0.5 })
    );
    var lamCage = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
    );
    lambdaGroup.add(lamCore);
    lambdaGroup.add(lamCage);
    makeInteractiveNode('Lambda', lambdaGroup, 0.0, 2.55, -0.1);

    // 4. Cloud Architecture: Central Connected Mesh Hub
    var archGroup = new THREE.Group();
    var archCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.25, 0),
      new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x004466, roughness: 0.2, metalness: 0.8 })
    );
    var archWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.32, 1),
      new THREE.MeshBasicMaterial({ color: 0xff9900, wireframe: true, transparent: true, opacity: 0.85 })
    );
    var archOrbital = new THREE.Mesh(
      new THREE.TorusGeometry(0.42, 0.012, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff })
    );
    archOrbital.rotation.x = Math.PI / 2;
    archGroup.add(archCore);
    archGroup.add(archWire);
    archGroup.add(archOrbital);
    makeInteractiveNode('Cloud Architecture', archGroup, 0.0, 1.7, -0.1);

    // -----------------------------------------------------------------------
    // Glowing Fiber-Optic Circuit Tubes Connecting Hub to Services
    // -----------------------------------------------------------------------
    circuitLines = [];
    dataPackets = [];

    var hubPos = new THREE.Vector3(0.0, 1.7, -0.1);
    var connections = [
      { to: new THREE.Vector3(-1.25, 2.05, -0.15), color: 0x00d4ff }, // To EC2
      { to: new THREE.Vector3(0.0, 2.55, -0.1), color: 0xff9900 },    // To Lambda
      { to: new THREE.Vector3(1.25, 2.05, -0.15), color: 0x00d4ff }   // To S3
    ];

    connections.forEach(function (conn) {
      var midY = (hubPos.y + conn.to.y) * 0.5 + 0.15;
      var midX = (hubPos.x + conn.to.x) * 0.5;
      var midZ = (hubPos.z + conn.to.z) * 0.5 + 0.08;
      var curve = new THREE.CatmullRomCurve3([
        hubPos.clone(),
        new THREE.Vector3(midX, midY, midZ),
        conn.to.clone()
      ]);

      var tubeGeo = new THREE.TubeGeometry(curve, 24, 0.012, 8, false);
      var tubeMat = new THREE.MeshBasicMaterial({ color: conn.color, transparent: true, opacity: 0.0 });
      var tube = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tube);
      circuitLines.push(tube);

      // Flowing Data Packet along the line
      var packetMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      packetMesh.visible = false;
      scene.add(packetMesh);
      dataPackets.push({ mesh: packetMesh, curve: curve, progress: Math.random() });
    });

    // Event Listeners
    window.addEventListener('resize', onThreeResize);
    window.addEventListener('mousemove', onThreeMouseMove);
    canvasContainer.addEventListener('click', onCanvasClick);

    if (cardClose) {
      cardClose.addEventListener('click', function (e) {
        e.stopPropagation();
        hideComponentCard();
      });
    }

    return true;
  }

  // -------------------------------------------------------------------------
  // Interaction & Raycasting (Bruno Simon Style)
  // -------------------------------------------------------------------------
  function onThreeResize() {
    if (!renderer || !camera || !canvasContainer) return;
    var width = canvasContainer.clientWidth || window.innerWidth;
    var height = canvasContainer.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function getRaycastNode(clientX, clientY) {
    if (!scene || !camera || !renderer) return null;
    var rect = renderer.domElement.getBoundingClientRect();
    var x = ((clientX - rect.left) / rect.width) * 2 - 1;
    var y = -((clientY - rect.top) / rect.height) * 2 + 1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    var allMeshes = [];
    interactiveNodes.forEach(function (group) {
      group.traverse(function (child) {
        if (child.isMesh) {
          child.userData.parentGroup = group;
          allMeshes.push(child);
        }
      });
    });

    var intersects = raycaster.intersectObjects(allMeshes, false);
    if (intersects.length > 0) {
      return intersects[0].object.userData.parentGroup || null;
    }
    return null;
  }

  function onThreeMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetCamX = mouseX * 0.95;
    targetCamY = 2.8 + mouseY * 0.45;

    isInteracting = true;
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }

    // Raycast hover check
    var node = getRaycastNode(e.clientX, e.clientY);
    if (node) {
      hoveredNode = node;
      document.body.style.cursor = 'pointer';
      if (hoverTag) {
        var name = node.userData.name;
        hoverTag.textContent = name + ' · Click to inspect';
        hoverTag.style.left = e.clientX + 'px';
        hoverTag.style.top = (e.clientY - 18) + 'px';
        hoverTag.classList.add('visible');
      }
    } else {
      hoveredNode = null;
      document.body.style.cursor = 'default';
      if (hoverTag) hoverTag.classList.remove('visible');
    }
  }

  function onCanvasClick(e) {
    var node = getRaycastNode(e.clientX, e.clientY);
    if (node) {
      showComponentCard(node.userData.name);
      node.rotation.y += Math.PI * 0.75;
      playPop(780);
    } else {
      // Clicked empty space: hide card if open
      if (componentCard && !componentCard.hidden && !componentCard.contains(e.target)) {
        hideComponentCard();
      }
    }
  }

  function showComponentCard(name) {
    var info = COMPONENT_INFO[name];
    if (!info || !componentCard) return;

    if (cardBadge) cardBadge.textContent = info.badge;
    if (cardName) cardName.textContent = info.title;
    if (cardDesc) cardDesc.textContent = info.desc;
    if (cardMeta) cardMeta.textContent = info.meta;

    componentCard.hidden = false;
    componentCard.setAttribute('aria-hidden', 'false');
    if (hudStatusText) hudStatusText.textContent = 'Inspecting ' + name + ' Architecture Node';
  }

  function hideComponentCard() {
    if (componentCard) {
      componentCard.hidden = true;
      componentCard.setAttribute('aria-hidden', 'true');
    }
  }

  // -------------------------------------------------------------------------
  // Render & Animation Loop
  // -------------------------------------------------------------------------
  function animateThree(time) {
    animationFrameId = requestAnimationFrame(animateThree);
    var t = time * 0.001;

    // Smooth Camera Drift / Mouse Parallax
    if (!isTransitioning) {
      camera.position.x += (targetCamX - camera.position.x) * 0.055;
      camera.position.y += (targetCamY - camera.position.y) * 0.055;
      camera.lookAt(0, 1.35, 0);
    }

    // Builder Typing & Breathing Dynamics
    if (builderGroup) {
      builderGroup.position.y = Math.sin(t * 3.6) * 0.012;
      var arms = builderGroup.children;
      if (arms[4]) arms[4].rotation.x = 0.72 + Math.sin(t * 11) * 0.07;
      if (arms[5]) arms[5].rotation.x = 0.72 + Math.cos(t * 11) * 0.07;
    }

    // Drift Ambient Data Particles
    if (ambientParticles) {
      var positions = ambientParticles.geometry.attributes.position.array;
      for (var p = 0; p < positions.length / 3; p++) {
        positions[p * 3 + 1] += 0.003;
        if (positions[p * 3 + 1] > 4.2) {
          positions[p * 3 + 1] = 0.5;
        }
      }
      ambientParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Interactive Nodes Animation & Scaling
    interactiveNodes.forEach(function (node) {
      node.rotation.y += node.userData.rotSpeedY;
      node.rotation.x += node.userData.rotSpeedX;
      node.position.y = node.userData.basePos.y + Math.sin(t * 2.2 + node.userData.floatOffset) * 0.04;

      // Scale up based on assembly target, with hover boost
      var target = node.userData.targetScale;
      if (hoveredNode === node) target *= 1.16;

      node.scale.x += (target - node.scale.x) * 0.085;
      node.scale.y += (target - node.scale.y) * 0.085;
      node.scale.z += (target - node.scale.z) * 0.085;
    });

    // Flowing Light Packets along Splines
    dataPackets.forEach(function (dp) {
      if (dp.mesh.visible) {
        dp.progress = (dp.progress + 0.008) % 1.0;
        var pt = dp.curve.getPoint(dp.progress);
        dp.mesh.position.copy(pt);
      }
    });

    renderer.render(scene, camera);
  }

  // -------------------------------------------------------------------------
  // Opening Choreography (3-4 Seconds Assembly Timeline)
  // -------------------------------------------------------------------------
  function setProgress(percent, status) {
    assemblyProgress = percent;
    if (hudPercent) hudPercent.textContent = percent + '%';
    if (hudBarFill) hudBarFill.style.width = percent + '%';
    if (hudStatusText && status) hudStatusText.textContent = status;
  }

  function runChoreography() {
    setProgress(0, 'Initializing digital workspace...');

    // 0.8s: Grid & Workstation
    timers.push(setTimeout(function () {
      setProgress(28, 'Booting developer environment & workstation...');
      playPop(480);
    }, 800));

    // 1.8s: EC2 & S3 Materialize
    timers.push(setTimeout(function () {
      setProgress(62, 'Deploying AWS EC2 & S3 infrastructure...');
      interactiveNodes.forEach(function (n) {
        if (n.userData.name === 'EC2' || n.userData.name === 'S3') {
          n.userData.targetScale = 1.0;
        }
      });
      playPop(620);
    }, 1800));

    // 2.7s: Lambda & Cloud Architecture Hub Materialize + Circuits
    timers.push(setTimeout(function () {
      setProgress(88, 'Compiling AWS Lambda & routing Cloud Architecture...');
      interactiveNodes.forEach(function (n) {
        n.userData.targetScale = 1.0;
      });
      circuitLines.forEach(function (line) {
        line.material.opacity = 0.85;
      });
      dataPackets.forEach(function (dp) {
        dp.mesh.visible = true;
      });
      playPop(740);
    }, 2700));

    // 3.4s: Assembly Complete!
    timers.push(setTimeout(function () {
      setProgress(100, 'Cloud Environment Online · All Systems Healthy');
      playPop(920);
    }, 3400));

    // 6.5s: Auto-advance only if user is idle and not inspecting
    autoTimer = setTimeout(function () {
      if (!isInteracting && (!componentCard || componentCard.hidden)) {
        finishIntro(false);
      }
    }, 6500);
  }

  function clearAllTimers() {
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
    timers.forEach(clearTimeout);
    timers = [];
  }

  // -------------------------------------------------------------------------
  // Smooth Camera Fly-In Transition to Homepage
  // -------------------------------------------------------------------------
  function finishIntro(fast) {
    clearAllTimers();
    hideComponentCard();
    if (hoverTag) hoverTag.classList.remove('visible');
    document.body.style.cursor = 'default';
    document.body.classList.remove('intro-active');
    document.body.classList.remove('lock');

    if (fast) {
      if (intro) {
        intro.classList.add('done');
        intro.hidden = true;
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      return;
    }

    // Cinematic Camera Fly-In through Cloud Architecture Hub
    isTransitioning = true;
    var startZ = camera ? camera.position.z : 6.2;
    var startY = camera ? camera.position.y : 2.8;
    var startTime = performance.now();
    var duration = 850;

    if (intro) intro.classList.add('done');

    function stepTransition(now) {
      var progress = Math.min((now - startTime) / duration, 1.0);
      var ease = progress * progress * (3 - 2 * progress); // smoothstep
      if (camera) {
        camera.position.z = startZ - ease * 4.8;
        camera.position.y = startY - ease * 1.1;
      }

      if (progress < 1.0) {
        requestAnimationFrame(stepTransition);
      } else {
        if (intro) intro.hidden = true;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    }
    requestAnimationFrame(stepTransition);
  }

  function playIntro() {
    clearAllTimers();
    isInteracting = false;
    isTransitioning = false;
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

    var initialized = initThreeScene();
    if (initialized) {
      animateThree(0);
      runChoreography();
    } else {
      finishIntro(true);
    }
  }

  // Button and Keyboard Handlers
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
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', function (e) {
      e.preventDefault();
      playIntro();
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && intro && !intro.hidden) {
      if (componentCard && !componentCard.hidden) {
        hideComponentCard();
      } else {
        finishIntro(true);
      }
    }
  });

  // Session storage check: auto-play once per session, or replay button
  var introSeen = false;
  try {
    introSeen = sessionStorage.getItem('sbg_3d_intro_seen') === '1';
    sessionStorage.setItem('sbg_3d_intro_seen', '1');
  } catch (e) {}

  if (introSeen) {
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
