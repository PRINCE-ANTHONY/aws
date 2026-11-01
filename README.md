# THE BUILD FLOOR — Industrial Technology Community

> **"Nothing is ready-made. Everything is built."**

An immersive, premium, industrial technology community website centred around the concept of a live data centre where infrastructure is assembled, connected, tested, and brought online.

---

## 1. Creative Direction

- **Concept Name**: THE BUILD FLOOR
- **Aesthetic**: Industrial data centre, realistic server hardware, metallic surfaces, dark and restrained technical precision.
- **Palette**:
  - Primary Background: `#090B0E` (pitch black industrial environment)
  - Secondary Background: `#11161B`
  - Surface: `#181E24`
  - Safety Orange: `#FF6B24` (high-contrast cyber-neon / safety orange)
  - Deep Orange: `#C94716`
  - Primary Text: `#F1F3F4`
  - Secondary Text: `#929BA4`
  - Border: `#2A323A`
  - Status Indicators: `#00E599` (Green), `#00D8F6` (Cyan Telemetry)
- **Typography**:
  - Display: **Space Grotesk**
  - Body: **Inter**
  - Technical Labels & Code: **IBM Plex Mono**

---

## 2. 3D Server Infrastructure Assembly (Opening Sequence)

A cinematic 3D sequence orchestrating a realistic 42U data centre server rack assembly:

- **Stage 1 — Power Initiation (0.0s – 0.9s)**: Dark industrial void; a single safety-orange indicator on the rack base pulses into life as the 48V power bus synchronizes (`playPowerRelay()`).
- **Stage 2 — Rack Formation (0.9s – 1.9s)**: Heavy steel corner posts and cross-braces slide into position, locking together with metallic precision (`playMechanicalLatch()`).
- **Stage 3 — Hardware Assembly (1.9s – 3.2s)**: 4U NVMe storage arrays, 2U Graviton compute blades, and 2U Bedrock AI inference modules slide into rack units from different directions and latch with elastic mechanical snaps.
- **Stage 4 — Network Connection (3.2s – 4.1s)**: 1U Top-of-Rack 100GbE switch links to server blades via safety-orange neon fiber cables with flowing data photon packets.
- **Stage 5 — System Boot (4.1s – 4.8s)**: Hardware status LEDs flash through diagnostics; cooling fan servos spool up (`playFanSpoolUp()`).
- **Stage 6 — Brand Reveal & 3D Orbit (4.8s+)**: Camera pulls back smoothly to an authoritative 3/4 perspective of the completed 42U rack. Displays:
  - **BUILT BY BUILDERS.**
  - *A community where ideas become infrastructure, products and possibilities.*
  - **ENTER THE FACILITY →** button (triggers an airlock dive into the facility).
  - Full 360° drag-and-touch orbit with hover telemetry cards inspecting power, bandwidth, and temperatures.
- **Controls & Accessibility**:
  - Skip Intro button (`Esc` key support).
  - Session-level state: Shown once per session via `sessionStorage.getItem('the_build_floor_intro_seen')` (re-playable via `↺ Replay Assembly` or `?intro=1`).
  - Reduced-motion preferences respected with instant bypass.
  - Optional user-controlled synthesized Web Audio sound engine (toggleable via UI).

---

## 3. Website Sections & Architecture

### 1. Control Room (Hero Section `#home`)
- Blueprint scanline and grid backdrop.
- Telemetry badge: `FACILITY ONLINE // SECTOR: US-EAST-1 // 42U HARDWARE CLUSTER`.
- Editorial headline: **NOTHING IS READY-MADE. EVERYTHING IS BUILT.**
- Front elevation schematic diagram of Cabinet 01 with live status LEDs and rack unit specs.
- Engineering annotations strip (42U Architecture, 100% Free Tier Compliant, TLS 1.3, Open Source).

### 2. Technology Domains (`#domains`)
Interactive exploration of 5 dedicated engineering sectors:
1. **Cloud & Infrastructure**: Multi-AZ VPCs, ECS on Fargate, EventBridge, CloudWatch.
2. **Web Development & Systems**: Next.js 15, CloudFront Edge functions, WebSocket APIs.
3. **AI & Machine Learning**: Amazon Bedrock, Claude 3.5 Sonnet, OpenSearch vector search, LangChain agents.
4. **Cybersecurity & Zero Trust**: Least-privilege IAM policies, KMS encryption, WAF rules.
5. **Hardware & IoT**: AWS IoT Core, ESP32 microcontrollers, real-time MQTT telemetry.
- Clicking any domain opens an interactive technical drawer displaying core technologies, upcoming workshops, open-source repositories, and participation guides.

### 3. Featured Projects (`#projects`)
Editorial project showcase featuring real engineering artifacts:
- **Campus Cloud Copilot**: GenAI academic knowledge retrieval with Claude 3.5 Sonnet, OpenSearch, and Lambda.
- **EventBridge Media Processing Engine**: High-throughput serverless image pipeline handling RAW to WebP transformations.
- Includes problem statements, engineering solutions, architecture topology diagrams, tech stack chips, and GitHub links.

### 4. Operations & Events Schedule (`#events`)
Operations-style timeline featuring live upcoming build sessions and past workshop recaps:
- **Build Night 04**: Serverless Event Architectures & DynamoDB Streams (Nov 12, 2026 · SEH 304).
- **Deep Dive Lab**: Generative AI Agents with Amazon Bedrock (Nov 26, 2026).
- **Hack-The-Cloud**: 48-Hour Infrastructure Sprint (Dec 05–07, 2026).
- Past Operations archive with starter code templates and lecture slides.

### 5. Community & Rigor (`#community`)
- 3 Core Engineering Pillars: Production Standards, Zero-Dollar Financial Guardrails, Open Community On-Ramp.
- Leadership team profiles with real roles (Prince Anthony, Alex Chen, Sarah Lin).
- Verified telemetry metrics: 100% Free Tier Compliant, 42+ Serverless Deploys, 120+ Active Builders, $0.00 Surprise Billing Record.

### 6. Live Cloud Workbench Simulator (`#workbench`)
Interactive in-browser architecture dispatcher:
- 3 Presets: Serverless REST API, Bedrock GenAI Copilot, Event Image Pipeline.
- Live animated packet routing between Client, Gateway, Compute, and Database nodes.
- Real-time metrics strip: Invocations, roundtrip latency, memory, cost, and HTTP status.
- Live streaming CloudWatch terminal logs with filterable commands.

### 7. Access Terminal (`#join`)
- **Attendee Registration**: Full name, email, academic year, and focus sector.
- **3D Holographic Parallax Badge**: Real-time cursor parallax tilt, rainbow glare sheen, and unique generated registration ID.
- **Add to Calendar (`.ics`)**: Downloadable iCalendar file for scheduled build sessions.
- **Knowledge Base (FAQ)**: Accordion answering prerequisite questions, zero-cost guarantee, and build night structure.

---

## 4. Local Development

Start the local static server:

```bash
# Python
python -m http.server 3000

# Or Node.js
npx serve . -l 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
Append `?intro=1` to force the 3D server assembly sequence to replay.
