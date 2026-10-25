(function () {
  'use strict';

  // =========================================================================
  // AUDIO ENGINE (Web Audio API Synthesizer)
  // Provides tactile sound feedback for cloud interactions with mute toggle
  // =========================================================================
  var audioCtx = null;
  var soundEnabled = true;

  try {
    var storedSound = sessionStorage.getItem('sbg_sound_enabled');
    if (storedSound !== null) {
      soundEnabled = storedSound === '1';
    }
  } catch (e) {}

  var soundToggleBtn = document.getElementById('sound-toggle');
  var soundIcon = document.getElementById('sound-icon');

  function updateSoundUI() {
    if (soundIcon) {
      soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    }
    if (soundToggleBtn) {
      soundToggleBtn.setAttribute('title', soundEnabled ? 'Sound Effects: ON (Click to mute)' : 'Sound Effects: MUTED (Click to unmute)');
      soundToggleBtn.style.opacity = soundEnabled ? '1' : '0.6';
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', function () {
      soundEnabled = !soundEnabled;
      try {
        sessionStorage.setItem('sbg_sound_enabled', soundEnabled ? '1' : '0');
      } catch (e) {}
      updateSoundUI();
      if (soundEnabled) playPop(640);
    });
    updateSoundUI();
  }

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playPop(freq) {
    if (!soundEnabled) return;
    try {
      var ctx = getAudioContext();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      var f = freq || 540;
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(f * 1.35, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.085);
    } catch (e) {}
  }

  function playPacketChirp() {
    if (!soundEnabled) return;
    try {
      var ctx = getAudioContext();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(820, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1420, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.075);
    } catch (e) {}
  }

  function playSuccessChord() {
    if (!soundEnabled) return;
    try {
      var ctx = getAudioContext();
      var freqs = [440, 554.37, 659.25, 880]; // A Major Chord
      freqs.forEach(function (f, i) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.035, ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35 + i * 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + 0.36 + i * 0.04);
      });
    } catch (e) {}
  }

  // =========================================================================
  // 3D INTERACTIVE WORKBENCH INTRO (Three.js)
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

  var scene, camera, renderer, animationFrameId;
  var builderGroup, deskGroup;
  var interactiveNodes = [];
  var circuitLines = [];
  var dataPackets = [];
  var ambientParticles = null;
  var hoveredNode = null;
  var targetCamX = 0, targetCamY = 2.8;
  var mouseX = 0, mouseY = 0;
  var isTransitioning = false;
  var isInteracting = false;
  var assemblyProgress = 0;

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

  function createCodeTexture(isTerminal) {
    var canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = isTerminal ? '#060a12' : '#09111c';
    ctx.fillRect(0, 0, 512, 320);

    ctx.fillStyle = '#ff9900';
    ctx.font = 'bold 15px monospace';
    var title = isTerminal ? '~/aws-builders $ cdk deploy --all' : 'import { Stack, aws_s3, aws_lambda } from "aws-cdk-lib";';
    ctx.fillText(title, 20, 32);

    var colors = ['#00d4ff', '#ff9900', '#34d399', '#f472b6', '#a78bfa', '#fbbf24', '#94a3b8'];
    for (var i = 0; i < 11; i++) {
      var y = 62 + i * 22;
      var indent = (i % 3 === 0 ? 0 : 22);
      var width = 110 + ((i * 53) % 250);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(20 + indent, y, width, 9);

      if (i % 2 === 0) {
        ctx.fillStyle = '#334155';
        ctx.fillRect(20 + indent + width + 14, y, 55, 9);
      }
    }
    return new THREE.CanvasTexture(canvas);
  }

  function initThreeScene() {
    if (!window.THREE || !canvasContainer) return false;
    canvasContainer.innerHTML = '';

    var width = canvasContainer.clientWidth || window.innerWidth;
    var height = canvasContainer.clientHeight || window.innerHeight;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04070d, 0.045);

    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 2.8, 6.2);
    camera.lookAt(0, 1.25, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasContainer.appendChild(renderer.domElement);

    // Dynamic Vibrant Studio Lights
    var ambientLight = new THREE.AmbientLight(0x182433, 1.4);
    scene.add(ambientLight);

    var keyLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    var orangeGlow = new THREE.PointLight(0xff9900, 3.2, 8);
    orangeGlow.position.set(0, 1.7, 0.2);
    scene.add(orangeGlow);

    var cyanRim = new THREE.DirectionalLight(0x00d4ff, 1.6);
    cyanRim.position.set(-5, 4, -4);
    scene.add(cyanRim);

    // Glowing Grid Floor
    var floorGeo = new THREE.PlaneGeometry(28, 28);
    var floorMat = new THREE.MeshStandardMaterial({ color: 0x050a12, roughness: 0.3, metalness: 0.8 });
    var floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    var grid = new THREE.GridHelper(28, 32, 0x00d4ff, 0x132337);
    grid.position.y = 0.01;
    scene.add(grid);

    // Floating Ambient Data Particles
    var particleCount = 80;
    var pGeo = new THREE.BufferGeometry();
    var pPos = new Float32Array(particleCount * 3);
    var pColors = new Float32Array(particleCount * 3);

    for (var p = 0; p < particleCount; p++) {
      pPos[p * 3] = (Math.random() - 0.5) * 9;
      pPos[p * 3 + 1] = 0.5 + Math.random() * 3.8;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 6;

      var isOrange = Math.random() > 0.45;
      pColors[p * 3] = isOrange ? 1.0 : 0.0;
      pColors[p * 3 + 1] = isOrange ? 0.6 : 0.83;
      pColors[p * 3 + 2] = isOrange ? 0.0 : 1.0;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    var pMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });
    ambientParticles = new THREE.Points(pGeo, pMat);
    scene.add(ambientParticles);

    // Tech Workbench Construction
    deskGroup = new THREE.Group();
    var topGeo = new THREE.BoxGeometry(3.6, 0.08, 1.6);
    var topMat = new THREE.MeshStandardMaterial({ color: 0x0e1724, roughness: 0.25, metalness: 0.7 });
    var deskTop = new THREE.Mesh(topGeo, topMat);
    deskTop.position.set(0, 0.95, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    deskGroup.add(deskTop);

    // Orange LED Desk Back
    var ledGeo = new THREE.BoxGeometry(3.6, 0.03, 0.02);
    var ledMat = new THREE.MeshBasicMaterial({ color: 0xff9900 });
    var ledStrip = new THREE.Mesh(ledGeo, ledMat);
    ledStrip.position.set(0, 0.99, -0.79);
    deskGroup.add(ledStrip);

    // Legs
    var legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.95, 12);
    var legMat = new THREE.MeshStandardMaterial({ color: 0x070c13, metalness: 0.9, roughness: 0.2 });
    [[-1.65, 0.475, -0.65], [1.65, 0.475, -0.65], [-1.65, 0.475, 0.65], [1.65, 0.475, 0.65]].forEach(function (pos) {
      var leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      deskGroup.add(leg);
    });

    // Dual Curved Ultrawide Monitors
    var monGeo = new THREE.BoxGeometry(1.2, 0.68, 0.03);
    var bezelMat = new THREE.MeshStandardMaterial({ color: 0x080e16, metalness: 0.8 });

    var leftMon = new THREE.Group();
    leftMon.add(new THREE.Mesh(monGeo, new THREE.MeshBasicMaterial({ map: createCodeTexture(false) })));
    var lBezel = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.72, 0.04), bezelMat);
    lBezel.position.z = -0.01;
    leftMon.add(lBezel);
    leftMon.position.set(-0.72, 1.55, -0.45);
    leftMon.rotation.y = 0.22;
    deskGroup.add(leftMon);

    var rightMon = new THREE.Group();
    rightMon.add(new THREE.Mesh(monGeo, new THREE.MeshBasicMaterial({ map: createCodeTexture(true) })));
    var rBezel = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.72, 0.04), bezelMat);
    rBezel.position.z = -0.01;
    rightMon.add(rBezel);
    rightMon.position.set(0.72, 1.55, -0.45);
    rightMon.rotation.y = -0.22;
    deskGroup.add(rightMon);

    // Mini Server Blade Chassis
    var bladeRack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.65, 0.48), new THREE.MeshStandardMaterial({ color: 0x0d1420, metalness: 0.85 }));
    bladeRack.position.set(1.45, 1.32, -0.3);
    deskGroup.add(bladeRack);

    for (var l = 0; l < 4; l++) {
      var led = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.01), new THREE.MeshBasicMaterial({ color: l % 2 === 0 ? 0xff9900 : 0x00d4ff }));
      led.position.set(1.35, 1.15 + l * 0.1, -0.05);
      deskGroup.add(led);
    }

    // Hologram Pedestal Projector & Light Cone
    var pedGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.05, 24);
    var pedMat = new THREE.MeshStandardMaterial({ color: 0x0e1724, metalness: 0.8, roughness: 0.2 });
    var pedestal = new THREE.Mesh(pedGeo, pedMat);
    pedestal.position.set(0, 0.98, -0.1);
    deskGroup.add(pedestal);

    var pedRing = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.02, 12, 32), new THREE.MeshBasicMaterial({ color: 0xff9900 }));
    pedRing.rotation.x = Math.PI / 2;
    pedRing.position.set(0, 1.01, -0.1);
    deskGroup.add(pedRing);

    var beamGeo = new THREE.ConeGeometry(1.3, 1.6, 24, 1, true);
    var beamMat = new THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
    var beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, 1.78, -0.1);
    beam.rotation.x = Math.PI;
    deskGroup.add(beam);

    scene.add(deskGroup);

    // Stylized Student Builder
    builderGroup = new THREE.Group();
    builderGroup.position.set(0, 0, 0.85);

    var chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.08), new THREE.MeshStandardMaterial({ color: 0x080d14, roughness: 0.6 }));
    chairBack.position.set(0, 1.15, 0.3);
    builderGroup.add(chairBack);

    var hoodieMat = new THREE.MeshStandardMaterial({ color: 0x111926, roughness: 0.7 });
    var torso = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.65, 0.36), hoodieMat);
    torso.position.set(0, 1.15, 0.05);
    torso.rotation.x = 0.06;
    builderGroup.add(torso);

    var head = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.35, 0.32), new THREE.MeshStandardMaterial({ color: 0xf5cfb3, roughness: 0.5 }));
    head.position.set(0, 1.62, 0.06);
    builderGroup.add(head);

    var visor = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 0.16), new THREE.MeshBasicMaterial({ color: 0xff9900 }));
    visor.position.set(0, 1.65, 0.16);
    builderGroup.add(visor);

    var lArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.12), hoodieMat);
    lArm.position.set(-0.28, 1.12, -0.15);
    lArm.rotation.x = 0.75;
    builderGroup.add(lArm);

    var rArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.12), hoodieMat);
    rArm.position.set(0.28, 1.12, -0.15);
    rArm.rotation.x = 0.75;
    builderGroup.add(rArm);

    scene.add(builderGroup);

    // Interactive Floating AWS Nodes
    interactiveNodes = [];

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

    // 1. EC2
    var ec2Group = new THREE.Group();
    ec2Group.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.32, 0.4), new THREE.MeshStandardMaterial({ color: 0x0f1826, metalness: 0.85, roughness: 0.25 })));
    ec2Group.add(new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.42), new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0x884400, roughness: 0.2 })));
    ec2Group.add(new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.36, 0.44), new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true })));
    makeInteractiveNode('EC2', ec2Group, -1.25, 2.05, -0.15);

    // 2. S3
    var s3Group = new THREE.Group();
    for (var s = 0; s < 3; s++) {
      var s3Disc = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.07, 24), new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0x663300, roughness: 0.3, metalness: 0.6 }));
      s3Disc.position.y = (s - 1) * 0.11;
      s3Group.add(s3Disc);
    }
    var s3Ring = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.014, 12, 32), new THREE.MeshBasicMaterial({ color: 0x00d4ff }));
    s3Ring.rotation.x = 0.55;
    s3Group.add(s3Ring);
    makeInteractiveNode('S3', s3Group, 1.25, 2.05, -0.15);

    // 3. Lambda
    var lambdaGroup = new THREE.Group();
    lambdaGroup.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), new THREE.MeshStandardMaterial({ color: 0xff9900, emissive: 0xcc6600, roughness: 0.2, metalness: 0.5 })));
    lambdaGroup.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.36, 0), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })));
    makeInteractiveNode('Lambda', lambdaGroup, 0.0, 2.55, -0.1);

    // 4. Cloud Architecture
    var archGroup = new THREE.Group();
    archGroup.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.25, 0), new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x004466, roughness: 0.2, metalness: 0.8 })));
    archGroup.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.33, 1), new THREE.MeshBasicMaterial({ color: 0xff9900, wireframe: true, transparent: true, opacity: 0.85 })));
    makeInteractiveNode('Cloud Architecture', archGroup, 0.0, 1.7, -0.1);

    // Circuit lines and flowing data packets
    circuitLines = [];
    dataPackets = [];
    var hubPos = new THREE.Vector3(0.0, 1.7, -0.1);
    var connections = [
      { to: new THREE.Vector3(-1.25, 2.05, -0.15), color: 0x00d4ff },
      { to: new THREE.Vector3(0.0, 2.55, -0.1), color: 0xff9900 },
      { to: new THREE.Vector3(1.25, 2.05, -0.15), color: 0x00d4ff }
    ];

    connections.forEach(function (conn) {
      var mid = hubPos.clone().lerp(conn.to, 0.5);
      mid.y += 0.15;
      var curve = new THREE.CatmullRomCurve3([hubPos.clone(), mid, conn.to.clone()]);
      var tubeGeo = new THREE.TubeGeometry(curve, 24, 0.012, 8, false);
      var tube = new THREE.Mesh(tubeGeo, new THREE.MeshBasicMaterial({ color: conn.color, transparent: true, opacity: 0.0 }));
      scene.add(tube);
      circuitLines.push(tube);

      var pMesh = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      pMesh.visible = false;
      scene.add(pMesh);
      dataPackets.push({ mesh: pMesh, curve: curve, progress: Math.random() });
    });

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

    var node = getRaycastNode(e.clientX, e.clientY);
    if (node) {
      hoveredNode = node;
      document.body.style.cursor = 'pointer';
      if (hoverTag) {
        hoverTag.textContent = node.userData.name + ' · Click to inspect';
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

  function animateThree(time) {
    animationFrameId = requestAnimationFrame(animateThree);
    var t = time * 0.001;

    if (!isTransitioning) {
      camera.position.x += (targetCamX - camera.position.x) * 0.055;
      camera.position.y += (targetCamY - camera.position.y) * 0.055;
      camera.lookAt(0, 1.35, 0);
    }

    if (builderGroup) {
      builderGroup.position.y = Math.sin(t * 3.6) * 0.012;
      var arms = builderGroup.children;
      if (arms[4]) arms[4].rotation.x = 0.72 + Math.sin(t * 11) * 0.07;
      if (arms[5]) arms[5].rotation.x = 0.72 + Math.cos(t * 11) * 0.07;
    }

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

    interactiveNodes.forEach(function (node) {
      node.rotation.y += node.userData.rotSpeedY;
      node.rotation.x += node.userData.rotSpeedX;
      node.position.y = node.userData.basePos.y + Math.sin(t * 2.2 + node.userData.floatOffset) * 0.04;

      var target = node.userData.targetScale;
      if (hoveredNode === node) target *= 1.16;

      node.scale.x += (target - node.scale.x) * 0.085;
      node.scale.y += (target - node.scale.y) * 0.085;
      node.scale.z += (target - node.scale.z) * 0.085;
    });

    dataPackets.forEach(function (dp) {
      if (dp.mesh.visible) {
        dp.progress = (dp.progress + 0.008) % 1.0;
        var pt = dp.curve.getPoint(dp.progress);
        dp.mesh.position.copy(pt);
      }
    });

    renderer.render(scene, camera);
  }

  function setProgress(percent, status) {
    assemblyProgress = percent;
    if (hudPercent) hudPercent.textContent = percent + '%';
    if (hudBarFill) hudBarFill.style.width = percent + '%';
    if (hudStatusText && status) hudStatusText.textContent = status;
  }

  function runChoreography() {
    setProgress(0, 'Initializing digital cloud workspace...');

    timers.push(setTimeout(function () {
      setProgress(28, 'Booting developer environment & workstation...');
      playPop(480);
    }, 800));

    timers.push(setTimeout(function () {
      setProgress(62, 'Deploying AWS EC2 & S3 infrastructure...');
      interactiveNodes.forEach(function (n) {
        if (n.userData.name === 'EC2' || n.userData.name === 'S3') {
          n.userData.targetScale = 1.0;
        }
      });
      playPop(620);
    }, 1800));

    timers.push(setTimeout(function () {
      setProgress(88, 'Compiling AWS Lambda & routing Cloud Mesh...');
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

    timers.push(setTimeout(function () {
      setProgress(100, 'Cloud Lab Online · All Systems Operational');
      playPop(920);
    }, 3400));

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

    isTransitioning = true;
    var startZ = camera ? camera.position.z : 6.2;
    var startY = camera ? camera.position.y : 2.8;
    var startTime = performance.now();
    var duration = 850;

    if (intro) intro.classList.add('done');

    function stepTransition(now) {
      var progress = Math.min((now - startTime) / duration, 1.0);
      var ease = progress * progress * (3 - 2 * progress);
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

  // =========================================================================
  // INTERACTIVE LIVE CLOUD WORKBENCH & TERMINAL SIMULATOR
  // =========================================================================
  var currentPreset = 'api';
  var totalInvocations = 0;
  var autoTrafficTimer = null;

  var PRESET_CONFIGS = {
    'api': {
      cmd: 'stream-tail --log-group /aws/lambda/campus-builder-service',
      n1: { cat: 'CLIENT', title: 'Campus Mobile App', badge: 'HTTP/2' },
      n2: { cat: 'GATEWAY', title: 'API Gateway (REST)', badge: 'v2.1 Managed', icon: '⛩️' },
      n3: { cat: 'SERVERLESS COMPUTE', title: 'AWS Lambda', badge: 'Node.js 20.x' },
      n4: { cat: 'DATABASE', title: 'Amazon DynamoDB', badge: 'Single-digit ms', icon: '⚡' },
      generateLogs: function (reqId, latency) {
        return [
          { type: 'info', text: '[INFO] ' + new Date().toISOString() + ' - START RequestId: ' + reqId + ' Version: $LATEST' },
          { type: 'event', text: '[EVENT] POST /v1/students/check-in HTTP/2 200 OK | Authenticated via IAM / Cognito' },
          { type: 'info', text: '[QUERY] DynamoDB putItem tableName="builders-roster" duration=' + (latency * 0.22).toFixed(1) + 'ms' },
          { type: 'success', text: '[REPORT] RequestId: ' + reqId + ' Duration: ' + latency + ' ms Billed: ' + Math.ceil(latency) + ' ms Memory: 64 MB / 128 MB' }
        ];
      }
    },
    'bedrock': {
      cmd: 'stream-tail --log-group /aws/bedrock/claude-campus-tutor',
      n1: { cat: 'CLIENT', title: 'Web AI Chat UI', badge: 'WebSocket' },
      n2: { cat: 'GATEWAY', title: 'API Gateway (WS)', badge: 'Bidirectional', icon: '⛩️' },
      n3: { cat: 'ORCHESTRATOR', title: 'AWS Lambda (Agent)', badge: 'Python 3.12' },
      n4: { cat: 'FOUNDATION MODEL', title: 'Amazon Bedrock', badge: 'Claude 3.5 Sonnet', icon: '🤖' },
      generateLogs: function (reqId, latency) {
        return [
          { type: 'info', text: '[INFO] ' + new Date().toISOString() + ' - START RequestId: ' + reqId + ' Session: sess_' + Math.floor(Math.random() * 90000) },
          { type: 'event', text: '[BEDROCK] InvokeModelWithResponseStream model="anthropic.claude-3-5-sonnet-20241022-v2:0"' },
          { type: 'info', text: '[STREAM] First token latency: ' + (latency * 0.35).toFixed(1) + 'ms | Prompt tokens: 128 | Output: 245' },
          { type: 'success', text: '[REPORT] RequestId: ' + reqId + ' Duration: ' + latency + ' ms Guardrails: 0 infractions | Cost: $0.00076' }
        ];
      }
    },
    'pipeline': {
      cmd: 'stream-tail --log-group /aws/s3-events/image-processor',
      n1: { cat: 'CLIENT', title: 'Media Uploader', badge: 'Multipart' },
      n2: { cat: 'OBJECT STORE', title: 'Amazon S3 (Ingest)', badge: 'EventBridge En', icon: '📦' },
      n3: { cat: 'IMAGE PROCESSOR', title: 'AWS Lambda (Sharp)', badge: 'ARM64 Graviton' },
      n4: { cat: 'OPTIMIZED S3', title: 'Amazon S3 (CDN)', badge: 'Multi-AZ WebP', icon: '🗄️' },
      generateLogs: function (reqId, latency) {
        return [
          { type: 'info', text: '[INFO] ' + new Date().toISOString() + ' - EventBridge trigger s3:ObjectCreated:Put on s3://campus-drop/' },
          { type: 'event', text: '[PROCESS] Resizing 3.4MB raw banner -> WebP thumbnail 140KB via libvips' },
          { type: 'info', text: '[S3-PUT] Generated s3://campus-cdn/thumbs/' + reqId.substring(0, 8) + '.webp' },
          { type: 'success', text: '[REPORT] RequestId: ' + reqId + ' Duration: ' + latency + ' ms Billed: ' + Math.ceil(latency) + ' ms Memory: 88 MB / 256 MB' }
        ];
      }
    }
  };

  // Elements
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

  // Nodes & Connectors
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

  var node1 = document.getElementById('node-1');
  var node2 = document.getElementById('node-2');
  var node3 = document.getElementById('node-3');
  var node4 = document.getElementById('node-4');
  var packet1 = document.getElementById('packet-1');
  var packet2 = document.getElementById('packet-2');
  var packet3 = document.getElementById('packet-3');

  function applyPreset(presetName) {
    currentPreset = presetName;
    var cfg = PRESET_CONFIGS[presetName];
    if (!cfg) return;

    if (termCmd) termCmd.textContent = cfg.cmd;
    if (n1Cat) n1Cat.textContent = cfg.n1.cat;
    if (n1Title) n1Title.textContent = cfg.n1.title;
    if (n1Badge) n1Badge.textContent = cfg.n1.badge;

    if (n2Cat) n2Cat.textContent = cfg.n2.cat;
    if (n2Title) n2Title.textContent = cfg.n2.title;
    if (n2Badge) n2Badge.textContent = cfg.n2.badge;
    if (n2Icon) n2Icon.textContent = cfg.n2.icon;

    if (n3Cat) n3Cat.textContent = cfg.n3.cat;
    if (n3Title) n3Title.textContent = cfg.n3.title;
    if (n3Badge) n3Badge.textContent = cfg.n3.badge;

    if (n4Cat) n4Cat.textContent = cfg.n4.cat;
    if (n4Title) n4Title.textContent = cfg.n4.title;
    if (n4Badge) n4Badge.textContent = cfg.n4.badge;
    if (n4Icon) n4Icon.textContent = cfg.n4.icon;

    presetBtns.forEach(function (btn) {
      var isTarget = btn.getAttribute('data-preset') === presetName;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', String(isTarget));
    });

    playPop(620);
    appendTerminalLine({ type: 'info', text: '[SWITCH] Switched active architecture topology to: ' + presetName.toUpperCase() });
  }

  presetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyPreset(btn.getAttribute('data-preset'));
    });
  });

  function appendTerminalLine(logObj) {
    if (!terminalLogs) return;
    var line = document.createElement('div');
    line.className = 'log-line ' + (logObj.type || 'info');
    line.textContent = logObj.text;
    terminalLogs.appendChild(line);

    // Keep log buffer bounded
    while (terminalLogs.children.length > 40) {
      terminalLogs.removeChild(terminalLogs.children[0]);
    }
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  }

  if (terminalClear) {
    terminalClear.addEventListener('click', function () {
      if (terminalLogs) terminalLogs.innerHTML = '';
      playPop(420);
    });
  }

  function dispatchSimulatedRequest() {
    totalInvocations++;
    if (statInvocations) statInvocations.textContent = totalInvocations.toLocaleString();
    if (statStatus) {
      statStatus.textContent = 'IN-FLIGHT';
      statStatus.className = 'stat-value status-executing';
    }

    var baseLatency = currentPreset === 'bedrock' ? (120 + Math.random() * 80) : (12 + Math.random() * 15);
    var latency = parseFloat(baseLatency.toFixed(1));

    // Sound effect
    playPacketChirp();

    // Sequence node flashes & packets
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

      // Update metrics
      if (statLatency) statLatency.textContent = latency + ' ms';
      if (statMemory) statMemory.textContent = (currentPreset === 'bedrock' ? '128 MB / 256 MB' : '64 MB / 128 MB');
      if (statStatus) {
        statStatus.textContent = '200 OK';
        statStatus.className = 'stat-value status-ready';
      }
      var estCost = (totalInvocations * 0.0000002).toFixed(6);
      if (statCost) statCost.textContent = '$' + estCost;

      // Stream generated logs
      var reqId = 'c' + Math.random().toString(36).substring(2, 10) + '-' + Math.random().toString(36).substring(2, 6);
      var logs = PRESET_CONFIGS[currentPreset].generateLogs(reqId, latency);
      logs.forEach(function (log) {
        appendTerminalLine(log);
      });

      setTimeout(function () {
        if (node4) node4.classList.remove('executing');
      }, 250);
    }, 540);
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
        playPop(440);
      } else {
        wbAutoBtn.classList.add('auto-active');
        if (autoState) autoState.textContent = 'ON';
        dispatchSimulatedRequest();
        autoTrafficTimer = setInterval(dispatchSimulatedRequest, 2400);
        playPop(880);
      }
    });
  }

  // =========================================================================
  // 3D HOLOGRAPHIC ATTENDEE PASS PARALLAX TILT
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

      var rotY = ((x - midX) / midX) * 16;
      var rotX = -((y - midY) / midY) * 16;

      rsvpPass.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) scale3d(1.02, 1.02, 1.02)';

      if (passGlare) {
        var glareX = (x / rect.width) * 100;
        var glareY = (y / rect.height) * 100;
        passGlare.style.background = 'radial-gradient(circle at ' + glareX + '% ' + glareY + '%, rgba(255, 153, 0, 0.25) 0%, rgba(0, 212, 255, 0.25) 35%, rgba(168, 85, 247, 0.2) 65%, transparent 85%)';
      }
    });

    rsvpPass.addEventListener('mouseleave', function () {
      rsvpPass.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (passGlare) {
        passGlare.style.background = 'linear-gradient(115deg, transparent 20%, rgba(255, 153, 0, 0.12) 40%, rgba(0, 212, 255, 0.18) 55%, rgba(168, 85, 247, 0.12) 70%, transparent 90%)';
      }
    });
  }

  // =========================================================================
  // MOBILE NAVIGATION DRAWER
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

  // =========================================================================
  // SCROLL REVEALS (Intersection Observer)
  // =========================================================================
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
  // RSVP STATE & ICALENDAR EXPORT (.ics)
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

      playSuccessChord();
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
      playPop(520);
      renderPass();
      if (nameInput) nameInput.focus();
    });
  }

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
      playSuccessChord();
    });
  }

  renderPass();
})();
