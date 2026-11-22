(() => {
  const canvas = document.getElementById("arch-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const cursorGlow = document.getElementById("cursor-glow");
  const heroTilt = document.getElementById("hero-tilt");

  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = null;
  let isVisible = true;

  const mouse = { x: -9999, y: -9999, nx: 0, ny: 0, active: false };
  const smoothMouse = { nx: 0, ny: 0 };

  // 3D Wireframe Cube Vertices & Edges
  const cubeVerts = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
  ].map(([x, y, z]) => ({ x, y, z }));

  const cubeEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];

  // Drifting architectural particles
  const particles = Array.from({ length: 54 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00016,
    vy: (Math.random() - 0.5) * 0.00016,
    r: 0.9 + Math.random() * 1.3,
    violet: Math.random() < 0.28,
  }));

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rotate3D(v, rx, ry) {
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x1 = v.x * cosY - v.z * sinY;
    const z1 = v.x * sinY + v.z * cosY;

    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y2 = v.y * cosX - z1 * sinX;
    const z2 = v.y * sinX + z1 * cosX;

    return { x: x1, y: y2, z: z2 };
  }

  function drawArchitecturalGrid(t) {
    const spacing = 84;
    const ox = ((t * 5 + smoothMouse.nx * 16) % spacing + spacing) % spacing;
    const oy = ((t * 3 + smoothMouse.ny * 16) % spacing + spacing) % spacing;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = ox - spacing; x < width + spacing; x += spacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = oy - spacing; y < height + spacing; y += spacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Subtle crosshair ticks at intersections
    ctx.strokeStyle = "rgba(161, 161, 170, 0.14)";
    ctx.beginPath();
    for (let x = ox - spacing; x < width + spacing; x += spacing) {
      for (let y = oy - spacing; y < height + spacing; y += spacing) {
        ctx.moveTo(x - 3, y);
        ctx.lineTo(x + 3, y);
        ctx.moveTo(x, y - 3);
        ctx.lineTo(x, y + 3);
      }
    }
    ctx.stroke();
  }

  function drawPlanetAndMountain(t) {
    const px = width * 0.14 - smoothMouse.nx * 14;
    const py = height * 0.42 - smoothMouse.ny * 14;
    const radius = Math.min(width, height) * 0.22;

    // Eclipsed planet disc
    ctx.fillStyle = "rgba(5, 5, 8, 0.94)";
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();

    // Rim-lit cyan-white crescent arc
    const rimPulse = 0.5 + ((Math.sin(t * 0.9) + 1) * 0.5) * 0.35;
    ctx.strokeStyle = `rgba(103, 232, 249, ${rimPulse})`;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(px, py, radius, -Math.PI * 0.62, Math.PI * 0.12);
    ctx.stroke();

    // Parallax mountain silhouette on lower left
    const mx = -smoothMouse.nx * 22;
    const my = -smoothMouse.ny * 10;
    const mGrad = ctx.createLinearGradient(0, height * 0.55, 0, height);
    mGrad.addColorStop(0, "rgba(30, 41, 59, 0.90)");
    mGrad.addColorStop(1, "rgba(3, 5, 10, 0.98)");

    ctx.fillStyle = mGrad;
    ctx.beginPath();
    ctx.moveTo(mx - 40, height + 20);
    ctx.lineTo(mx - 40, height * 0.64 + my);
    ctx.lineTo(mx + width * 0.06, height * 0.54 + my);
    ctx.lineTo(mx + width * 0.13, height * 0.62 + my);
    ctx.lineTo(mx + width * 0.21, height * 0.78 + my);
    ctx.lineTo(mx + width * 0.34, height + 20);
    ctx.closePath();
    ctx.fill();
  }

  function drawParticles() {
    for (const p of particles) {
      if (!reducedMotion) {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
      }
      const px = p.x * width + smoothMouse.nx * 12;
      const py = p.y * height + smoothMouse.ny * 12;

      let alpha = 0.26;
      if (mouse.active && !isCoarsePointer) {
        const dist = Math.hypot(px - mouse.x, py - mouse.y);
        if (dist < 170) {
          alpha = 0.26 + (1 - dist / 170) * 0.48;
        }
      }

      ctx.fillStyle = p.violet
        ? `rgba(129, 140, 248, ${alpha})`
        : `rgba(34, 211, 238, ${alpha * 0.85})`;
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawCubeCluster(t) {
    const cubes = [
      {
        cx: width * 0.86 + smoothMouse.nx * 20,
        cy: height * 0.36 + smoothMouse.ny * 18,
        size: Math.min(width, height) * 0.13,
        rx: 0.48 + t * 0.14 + smoothMouse.ny * 0.35,
        ry: 0.65 + t * 0.2 + smoothMouse.nx * 0.45,
        violet: false,
      },
      {
        cx: width * 0.91 + smoothMouse.nx * 26,
        cy: height * 0.62 + smoothMouse.ny * 22,
        size: Math.min(width, height) * 0.1,
        rx: -0.35 + t * 0.1 + smoothMouse.ny * 0.28,
        ry: 0.9 - t * 0.16 + smoothMouse.nx * 0.35,
        violet: true,
      },
    ];

    for (const c of cubes) {
      const projected = cubeVerts.map((v) => {
        const r = rotate3D(v, c.rx, c.ry);
        const scale = 2.8 / (3.4 - r.z);
        return {
          x: c.cx + r.x * c.size * scale,
          y: c.cy + r.y * c.size * scale,
          z: r.z,
        };
      });

      for (const [i, j] of cubeEdges) {
        const a = projected[i];
        const b = projected[j];
        const depthAlpha = 0.14 + ((a.z + b.z + 2) / 4) * 0.28;
        ctx.strokeStyle = c.violet
          ? `rgba(129, 140, 248, ${depthAlpha})`
          : `rgba(34, 211, 238, ${depthAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const p of projected) {
        const alpha = 0.25 + ((p.z + 1) / 2) * 0.55;
        ctx.fillStyle = c.violet
          ? `rgba(167, 139, 250, ${alpha})`
          : `rgba(244, 244, 245, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function frame(now) {
    if (!isVisible) return;
    const t = now * 0.001;

    smoothMouse.nx += (mouse.nx - smoothMouse.nx) * 0.06;
    smoothMouse.ny += (mouse.ny - smoothMouse.ny) * 0.06;

    ctx.clearRect(0, 0, width, height);
    drawArchitecturalGrid(reducedMotion ? 0 : t);
    drawPlanetAndMountain(reducedMotion ? 0 : t);
    drawParticles();
    drawCubeCluster(reducedMotion ? 0.3 : t);

    if (heroTilt && !reducedMotion && !isCoarsePointer) {
      heroTilt.style.transform = `rotateX(${-smoothMouse.ny * 2.2}deg) rotateY(${smoothMouse.nx * 2.5}deg)`;
    }

    if (!reducedMotion) {
      rafId = requestAnimationFrame(frame);
    }
  }

  if (!isCoarsePointer && !reducedMotion) {
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.nx = (e.clientX / width - 0.5) * 2;
      mouse.ny = (e.clientY / height - 0.5) * 2;
      mouse.active = true;
      if (cursorGlow) {
        cursorGlow.style.opacity = "1";
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
      }
    });

    window.addEventListener("mouseleave", () => {
      mouse.active = false;
      mouse.nx = 0;
      mouse.ny = 0;
      if (cursorGlow) cursorGlow.style.opacity = "0";
    });

    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  document.addEventListener("visibilitychange", () => {
    isVisible = document.visibilityState === "visible";
    if (isVisible && !reducedMotion) {
      rafId = requestAnimationFrame(frame);
    } else if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  window.addEventListener("resize", () => {
    resize();
    if (reducedMotion) frame(performance.now());
  });

  resize();
  rafId = requestAnimationFrame(frame);
})();
