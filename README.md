<div align="center">
  <img src="assets/profile-banner.svg" alt="Tanuj — Software Engineer & Systems Architect" width="100%" />

  <br /><br />

  <h1>Tanuj</h1>
  <p><strong>Software Engineer &amp; Systems Architect</strong></p>
  <p>
    Building deterministic simulations, forensic signal-processing pipelines, and spatial 3D web applications.
  </p>

  <p>
    <a href="https://github.com/usernametan"><img src="https://img.shields.io/badge/GitHub-usernametan-111111?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
    <a href="mailto:tanujbisht0712@gmail.com"><img src="https://img.shields.io/badge/Email-tanujbisht0712@gmail.com-262626?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
    <img src="https://img.shields.io/github/followers/usernametan?style=flat-square&label=Followers&labelColor=111111&color=262626" alt="Followers" />
  </p>

  <p>
    <sub>
      <a href="#about">About</a> &nbsp;·&nbsp;
      <a href="#featured-systems">Featured Systems</a> &nbsp;·&nbsp;
      <a href="#technology-stack">Technology Stack</a> &nbsp;·&nbsp;
      <a href="#repository-telemetry">Telemetry</a> &nbsp;·&nbsp;
      <a href="#contact">Contact</a>
    </sub>
  </p>
</div>

---

## About

I design and engineer full-stack software systems with an emphasis on **clean architectural boundaries**, **deterministic execution**, and **high-craft interfaces**.

<table>
  <tr>
    <td width="33%" valign="top">
      <strong>Simulation &amp; Game Systems</strong><br /><br />
      Pure fixed-step engines strictly isolated from rendering and audio layers via typed event contracts and seeded RNG.
    </td>
    <td width="33%" valign="top">
      <strong>Applied DSP &amp; Forensics</strong><br /><br />
      Auditable, SHA-256 hashed audio analysis workflows combining neural/acoustic fallbacks with human-in-the-loop review gates.
    </td>
    <td width="33%" valign="top">
      <strong>Spatial &amp; Local-First Apps</strong><br /><br />
      Interactive 3D WebGL environments paired with offline-first browser storage, PWA caching, and strongly typed backend APIs.
    </td>
  </tr>
</table>

---

## Featured Systems

<table>
  <tr>
    <td width="33%" valign="top">
      <a href="https://github.com/usernametan/ant-defence">
        <img src="https://raw.githubusercontent.com/usernametan/ant-defence/main/docs/assets/gameplay-screenshot.png" alt="Zone Control Gameplay" width="100%" />
      </a>
      <br /><br />
      <strong><a href="https://github.com/usernametan/ant-defence">Zone Control</a></strong><br />
      <sub><code>ant-defence</code> · TypeScript · Canvas 2D</sub>
      <p>
        Deterministic 60 Hz top-down tactical arena shooter with destructible cover, 4 procedural biomes, A* pathfinding, and Hellcell PvPvE boss combat.
      </p>
      <p>
        <a href="https://arena4us.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-arena4us.vercel.app-fafafa?style=flat-square&labelColor=111111" alt="Live Demo" /></a>
        <a href="https://github.com/usernametan/ant-defence"><img src="https://img.shields.io/github/last-commit/usernametan/ant-defence?style=flat-square&label=Updated&labelColor=111111&color=262626" alt="Last Commit" /></a>
      </p>
    </td>
    <td width="33%" valign="top">
      <a href="https://github.com/usernametan/forensic-audio-">
        <img src="https://raw.githubusercontent.com/usernametan/forensic-audio-/main/docs/assets/banner.svg" alt="Audio Forensics Platform" width="100%" />
      </a>
      <br /><br />
      <strong><a href="https://github.com/usernametan/forensic-audio-">Audio Forensics</a></strong><br />
      <sub><code>forensic-audio-</code> · Python · FastAPI · React</sub>
      <p>
        End-to-end forensic audio examination suite with SHA-256 chain of custody, speech enhancement, speaker comparison, and examiner-gated reporting.
      </p>
      <p>
        <img src="https://img.shields.io/badge/Integrity-SHA--256_Audit-262626?style=flat-square&labelColor=111111" alt="SHA-256 Audit" />
        <a href="https://github.com/usernametan/forensic-audio-"><img src="https://img.shields.io/github/last-commit/usernametan/forensic-audio-?style=flat-square&label=Updated&labelColor=111111&color=262626" alt="Last Commit" /></a>
      </p>
    </td>
    <td width="33%" valign="top">
      <a href="https://github.com/usernametan/nexora">
        <img src="https://raw.githubusercontent.com/usernametan/nexora/main/docs/assets/banner.svg" alt="Nexora Personal Cosmos" width="100%" />
      </a>
      <br /><br />
      <strong><a href="https://github.com/usernametan/nexora">Nexora</a></strong><br />
      <sub><code>nexora</code> · Three.js · React · Java 21</sub>
      <p>
        Local-first 3D solar system productivity universe spanning 7 celestial worlds with procedural WebGL textures and optional Spring Boot 3 cloud sync.
      </p>
      <p>
        <img src="https://img.shields.io/badge/Architecture-Local--First_PWA-262626?style=flat-square&labelColor=111111" alt="Local-First PWA" />
        <a href="https://github.com/usernametan/nexora"><img src="https://img.shields.io/github/last-commit/usernametan/nexora?style=flat-square&label=Updated&labelColor=111111&color=262626" alt="Last Commit" /></a>
      </p>
    </td>
  </tr>
</table>

<details>
<summary><strong>Expand Architecture Highlights</strong></summary>

- **Zone Control (`ant-defence`):** Reduced `20v20` 2,000-tick simulation step time from `1.015 ms` to **`0.595 ms/step`** and eliminated 60–138 mid-fight full-map canvas rebuilds via `ChunkedGroundCache` (`8×8` dirty chunks) and typed-array A* pathfinding capped at `3` calls/tick.
- **Audio Forensics (`forensic-audio-`):** Enforces read-only original storage, dual SHA-256 hashing, deterministic acoustic fallbacks (spectral gating, energy VAD, MFCC cosine) when heavy ML weights are absent, and an API-level `HTTP 409` export lock until certified human examiner approval.
- **Nexora (`nexora`):** Combines an offline-capable React Three Fiber 3D interface and Web Audio ambient synthesis with a stateless JWT Spring Boot 3.3.5 / Java 21 backend supporting versioned optimistic-concurrency state sync (`baseVersion`) and 20 MB file storage.

</details>

---

## Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Languages** | ![TypeScript](https://img.shields.io/badge/TypeScript-111111?style=flat-square&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-111111?style=flat-square&logo=javascript&logoColor=white) ![Python](https://img.shields.io/badge/Python-111111?style=flat-square&logo=python&logoColor=white) ![Java](https://img.shields.io/badge/Java_21-111111?style=flat-square&logo=openjdk&logoColor=white) ![SQL](https://img.shields.io/badge/SQL-111111?style=flat-square&logo=postgresql&logoColor=white) |
| **Frontend & 3D** | ![React](https://img.shields.io/badge/React_18-262626?style=flat-square&logo=react&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js_/_R3F-262626?style=flat-square&logo=threedotjs&logoColor=white) ![Canvas 2D](https://img.shields.io/badge/Canvas_2D-262626?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-262626?style=flat-square&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-262626?style=flat-square&logo=tailwindcss&logoColor=white) ![GSAP](https://img.shields.io/badge/GSAP_3-262626?style=flat-square) |
| **Backend & Data** | ![FastAPI](https://img.shields.io/badge/FastAPI-262626?style=flat-square&logo=fastapi&logoColor=white) ![Spring Boot](https://img.shields.io/badge/Spring_Boot_3-262626?style=flat-square&logo=springboot&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy_2.0-262626?style=flat-square) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL_16-262626?style=flat-square&logo=postgresql&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-262626?style=flat-square&logo=sqlite&logoColor=white) ![Flyway](https://img.shields.io/badge/Flyway-262626?style=flat-square) |
| **Audio, DSP & ML** | ![Web Audio API](https://img.shields.io/badge/Web_Audio_API-262626?style=flat-square) ![Librosa](https://img.shields.io/badge/Librosa-262626?style=flat-square) ![Whisper](https://img.shields.io/badge/Whisper-262626?style=flat-square) ![SpeechBrain](https://img.shields.io/badge/SpeechBrain-262626?style=flat-square) ![Pyannote](https://img.shields.io/badge/pyannote.audio-262626?style=flat-square) |
| **Testing & DevOps** | ![Vitest](https://img.shields.io/badge/Vitest-262626?style=flat-square&logo=vitest&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-262626?style=flat-square&logo=playwright&logoColor=white) ![Pytest](https://img.shields.io/badge/Pytest-262626?style=flat-square&logo=pytest&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-262626?style=flat-square&logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-262626?style=flat-square&logo=githubactions&logoColor=white) |

---

## Repository Telemetry

| Repository | Primary Language | Architecture Pattern | CI / Verification |
| :--- | :--- | :--- | :--- |
| [`usernametan/ant-defence`](https://github.com/usernametan/ant-defence) | TypeScript | Pure 60 Hz Sim + Typed Event Bus | ![CI](https://img.shields.io/github/actions/workflow/status/usernametan/ant-defence/ci.yml?style=flat-square&label=CI&labelColor=111111&color=262626) |
| [`usernametan/forensic-audio-`](https://github.com/usernametan/forensic-audio-) | Python / JavaScript | FastAPI Async Pipeline + React SPA | `pytest` integration suite + Docker Compose |
| [`usernametan/nexora`](https://github.com/usernametan/nexora) | JavaScript / Java 21 | Local-First 3D PWA + Spring Boot 3 API | ![CI](https://img.shields.io/github/actions/workflow/status/usernametan/nexora/ci.yml?style=flat-square&label=CI&labelColor=111111&color=262626) |

---

## Contact

- **GitHub:** [github.com/usernametan](https://github.com/usernametan)
- **Email:** [tanujbisht0712@gmail.com](mailto:tanujbisht0712@gmail.com)

---

<div align="center">
  <sub>Minimal. Deterministic. Auditable. — <a href="https://github.com/usernametan">usernametan</a></sub>
</div>
