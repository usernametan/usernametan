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

  // 3D Wireframe Icosahedron Geometry
  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVerts = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ].map(([x, y, z]) => {
    const len = Math.hypot(x, y, z);
    return { x: x / len, y: y / len, z: z / len };
  });

  const edges = [
    [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
    [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
    [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
    [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
    [1, 9], [5, 4], [11, 2], [10, 6], [7, 8],
    [9, 5], [4, 11], [2, 10], [6, 7], [8, 1],
  ];

  // Drifting architectural particles
  const particles = Array.from({ length: 56 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00018,
    vy: (Math.random() - 0.5) * 0.00018,
    r: 0.9 + Math.random() * 1.4,
    violet: Math.random() < 0.25,
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

  function drawGrid(t) {
    const spacing = 56;
    const offsetX = ((t * 6 + smoothMouse.nx * 18) % spacing + spacing) % spacing;
    const offsetY = ((t * 4 + smoothMouse.ny * 18) % spacing + spacing) % spacing;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.024)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = offsetX - spacing; x < width + spacing; x += spacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = offsetY - spacing; y < height + spacing; y += spacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  function drawParticles() {
    for (const p of particles) {
      if (!reducedMotion) {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
      }
      const px = p.x * width + smoothMouse.nx * 14;
      const py = p.y * height + smoothMouse.ny * 14;

      let alpha = 0.28;
      if (mouse.active && !isCoarsePointer) {
        const dist = Math.hypot(px - mouse.x, py - mouse.y);
        if (dist < 160) {
          alpha = 0.28 + (1 - dist / 160) * 0.45;
        }
      }

      ctx.fillStyle = p.violet
        ? `rgba(167, 139, 250, ${alpha})`
        : `rgba(228, 228, 231, ${alpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawWireframe(t) {
    const cx = width > 900 ? width * 0.76 : width * 0.5;
    const cy = width > 900 ? height * 0.48 : height * 0.76;
    const radius = Math.min(width, height) * (width > 900 ? 0.24 : 0.2);

    const rx = t * 0.18 + smoothMouse.ny * 0.35;
    const ry = t * 0.26 + smoothMouse.nx * 0.45;

    const projected = rawVerts.map((v) => {
      const r = rotate3D(v, rx, ry);
      const scale = 2.6 / (3.2 - r.z);
      return {
        x: cx + r.x * radius * scale,
        y: cy + r.y * radius * scale,
        z: r.z,
      };
    });

    // Subtle ambient highlight sweep
    const pulse = (Math.sin(t * 0.9) + 1) * 0.5;

    for (const [i, j] of edges) {
      const a = projected[i];
      const b = projected[j];
      const depthAlpha = 0.12 + ((a.z + b.z + 2) / 4) * 0.24;
      ctx.strokeStyle = `rgba(212, 212, 216, ${depthAlpha + pulse * 0.05})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    for (const p of projected) {
      const alpha = 0.25 + ((p.z + 1) / 2) * 0.5;
      ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame(now) {
    if (!isVisible) return;
    const t = now * 0.001;

    smoothMouse.nx += (mouse.nx - smoothMouse.nx) * 0.06;
    smoothMouse.ny += (mouse.ny - smoothMouse.ny) * 0.06;

    ctx.clearRect(0, 0, width, height);
    drawGrid(reducedMotion ? 0 : t);
    drawParticles();
    drawWireframe(reducedMotion ? 0.4 : t);

    if (heroTilt && !reducedMotion && !isCoarsePointer) {
      heroTilt.style.transform = `rotateX(${-smoothMouse.ny * 2.5}deg) rotateY(${smoothMouse.nx * 3}deg)`;
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
