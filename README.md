<div align="center">
  <a href="https://usernametan.github.io/usernametan/">
    <img src="assets/hero-banner-v3.svg" alt="TANUJ. — Software Engineer & Systems Architect. Building deterministic simulations, forensic signal-processing pipelines, and spatial 3D web applications." width="100%" />
  </a>

  <br /><br />

  <p>
    <a href="https://github.com/usernametan"><img src="https://img.shields.io/badge/GITHUB-111111?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
    <a href="mailto:tanujbisht0712@gmail.com"><img src="https://img.shields.io/badge/EMAIL-262626?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
    <a href="#featured-systems"><img src="https://img.shields.io/badge/FEATURED_SYSTEMS-262626?style=flat-square" alt="Featured Systems" /></a>
    <a href="#contact"><img src="https://img.shields.io/badge/CONTACT-262626?style=flat-square" alt="Contact" /></a>
    <a href="https://usernametan.github.io/usernametan/"><img src="https://img.shields.io/badge/INTERACTIVE_HERO-%E2%86%97-fafafa?style=flat-square&labelColor=111111" alt="Interactive Hero" /></a>
  </p>
</div>

---

## About

I design and engineer full-stack software systems with an emphasis on **clean architectural boundaries**, **deterministic execution**, and **high-craft interfaces**.

- **Simulation & Game Systems:** Fixed-step 60 Hz engines · Seeded RNG · Typed event bus · Canvas 2D
- **Applied DSP & Forensics:** SHA-256 chain of custody · Speech enhancement · Speaker comparison · Examiner review gates
- **Spatial & Local-First Apps:** Three.js / WebGL · Offline PWA storage · Versioned sync · Spring Boot & FastAPI

---

## Featured Systems

### [Zone Control](https://github.com/usernametan/ant-defence) (`ant-defence`)

**Zone Control** is a deterministic, browser-based top-down tactical arena shooter built with TypeScript, React 18, Canvas 2D, and Web Audio synthesis. A pure 60 Hz seeded simulation engine drives respawning AI, A\* pathfinding, destructible cover, three capture zones, four procedural biomes, Hellcell PvPvE boss encounters, and Rampage free-for-all combat—optimized down to `0.595 ms/step` in `20v20` headless benchmarks via chunked ground caching.

<p>
  <a href="https://arena4us.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-arena4us.vercel.app-fafafa?style=flat-square&labelColor=111111" alt="Live Demo" /></a>
  <img src="https://img.shields.io/github/actions/workflow/status/usernametan/ant-defence/ci.yml?style=flat-square&label=CI&labelColor=111111&color=262626" alt="CI Status" />
  <a href="https://github.com/usernametan/ant-defence"><img src="https://img.shields.io/github/last-commit/usernametan/ant-defence?style=flat-square&label=Updated&labelColor=111111&color=262626" alt="Last Commit" /></a>
</p>
<p>
  <img src="https://img.shields.io/badge/TypeScript-111111?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React_18-262626?style=flat-square&logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/Canvas_2D-262626?style=flat-square" alt="Canvas 2D" />
  <img src="https://img.shields.io/badge/Web_Audio_API-262626?style=flat-square" alt="Web Audio API" />
  <img src="https://img.shields.io/badge/Vite-262626?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vitest-262626?style=flat-square&logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/GitHub_Actions-262626?style=flat-square&logo=githubactions&logoColor=white" alt="GitHub Actions" />
</p>

---

### [Audio Forensics Platform](https://github.com/usernametan/forensic-audio-) (`forensic-audio-`)

The **Audio Forensics Evidence Analysis Platform** is a full-stack forensic laboratory workstation built with Python, FastAPI, SQLAlchemy 2.0, and React 18. It preserves original recordings read-only with dual SHA-256 hashing and an immutable audit trail, orchestrates an eight-stage denoising, diarization, ECAPA-TDNN + F0/MFCC speaker comparison, and Whisper ASR pipeline (with deterministic acoustic fallbacks), and locks Section 65B IEA / Section 63 BSA 2023 report exports until a certified examiner completes review.

<p>
  <img src="https://img.shields.io/badge/Integrity-SHA--256_Chain_of_Custody-fafafa?style=flat-square&labelColor=111111" alt="SHA-256 Chain of Custody" />
  <a href="https://github.com/usernametan/forensic-audio-"><img src="https://img.shields.io/github/last-commit/usernametan/forensic-audio-?style=flat-square&label=Updated&labelColor=111111&color=262626" alt="Last Commit" /></a>
</p>
<p>
  <img src="https://img.shields.io/badge/Python-111111?style=flat-square&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-262626?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React_18-262626?style=flat-square&logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/SQLAlchemy_2.0-262626?style=flat-square" alt="SQLAlchemy 2.0" />
  <img src="https://img.shields.io/badge/PostgreSQL_/_SQLite-262626?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL / SQLite" />
  <img src="https://img.shields.io/badge/Librosa-262626?style=flat-square" alt="Librosa" />
  <img src="https://img.shields.io/badge/Whisper-262626?style=flat-square" alt="Whisper" />
  <img src="https://img.shields.io/badge/SpeechBrain-262626?style=flat-square" alt="SpeechBrain" />
  <img src="https://img.shields.io/badge/pyannote.audio-262626?style=flat-square" alt="Pyannote" />
  <img src="https://img.shields.io/badge/Pytest-262626?style=flat-square&logo=pytest&logoColor=white" alt="Pytest" />
  <img src="https://img.shields.io/badge/Docker-262626?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
</p>

---

### [Nexora — Personal Cosmos](https://github.com/usernametan/nexora) (`nexora`)

**Nexora** is a local-first 3D productivity universe built with React 18, React Three Fiber, Three.js, GSAP 3, and an optional Spring Boot 3 / Java 21 cloud sync backend. It organizes daily planning, wellbeing, knowledge files, focus sessions, budgeting, and bookmarks across seven orbiting celestial worlds with procedural WebGL textures, Web Audio ambient synthesis, offline PWA persistence, and Playwright + Axe WCAG 2.1 verification.

<p>
  <img src="https://img.shields.io/badge/Architecture-Local--First_PWA-fafafa?style=flat-square&labelColor=111111" alt="Local-First PWA" />
  <img src="https://img.shields.io/github/actions/workflow/status/usernametan/nexora/ci.yml?style=flat-square&label=CI&labelColor=111111&color=262626" alt="CI Status" />
  <a href="https://github.com/usernametan/nexora"><img src="https://img.shields.io/github/last-commit/usernametan/nexora?style=flat-square&label=Updated&labelColor=111111&color=262626" alt="Last Commit" /></a>
</p>
<p>
  <img src="https://img.shields.io/badge/JavaScript-111111?style=flat-square&logo=javascript&logoColor=white" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Java_21-111111?style=flat-square&logo=openjdk&logoColor=white" alt="Java 21" />
  <img src="https://img.shields.io/badge/React_18-262626?style=flat-square&logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/Three.js_/_R3F-262626?style=flat-square&logo=threedotjs&logoColor=white" alt="Three.js / R3F" />
  <img src="https://img.shields.io/badge/GSAP_3-262626?style=flat-square" alt="GSAP 3" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-262626?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Spring_Boot_3-262626?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot 3" />
  <img src="https://img.shields.io/badge/PostgreSQL_16-262626?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL 16" />
  <img src="https://img.shields.io/badge/Flyway-262626?style=flat-square" alt="Flyway" />
  <img src="https://img.shields.io/badge/Playwright-262626?style=flat-square&logo=playwright&logoColor=white" alt="Playwright" />
  <img src="https://img.shields.io/badge/Docker-262626?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
</p>

---

## Contact

- **GitHub:** [github.com/usernametan](https://github.com/usernametan)
- **Email:** [tanujbisht0712@gmail.com](mailto:tanujbisht0712@gmail.com)

---

<div align="center">
  <sub>Minimal. Deterministic. Auditable. — <a href="https://github.com/usernametan">usernametan</a></sub>
</div>
