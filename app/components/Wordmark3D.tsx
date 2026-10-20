"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { WORD_SPAN } from "./logoMorph";

// Brand colours as raw sRGB, written straight to the screen (no colour management).
const hex = (h: string) =>
  new THREE.Vector3(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

// 2D simplex noise by Ian McEwan / Ashima Arts (MIT).
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;

  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // A slow mesh gradient flowing across the letters.
    vec2 p = vPos.xy * 0.42;
    float t = uTime * 0.12;
    float n1 = snoise(p + vec2(t, -t * 0.7));
    float n2 = snoise(p * 1.6 - vec2(t * 0.6, t) + n1 * 0.6);
    vec3 col = mix(uC1, uC2, smoothstep(-0.6, 0.6, n1));
    col = mix(col, uC3, smoothstep(0.0, 0.9, n2));
    col = mix(col, uC4, smoothstep(0.5, 1.0, n1 * n2 + 0.45) * 0.7);

    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);
    vec3 L = normalize(vec3(uPointer * 0.9, 1.0));
    float diff = clamp(dot(N, L), 0.0, 1.0);
    float face = smoothstep(0.55, 0.95, N.z);

    // Deep, shaded sides; bright gradient face.
    vec3 side = col * 0.3 + vec3(0.02);
    vec3 base = mix(side * (0.45 + 0.9 * diff), col * (0.88 + 0.22 * diff), face);

    // A highlight that follows the cursor, plus a soft rim.
    float spec = pow(clamp(dot(N, normalize(L + V)), 0.0, 1.0), 70.0) * 0.55;
    float rim = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0) * 0.2;
    gl_FragColor = vec4(base + spec + rim, 1.0);
  }
`;

/** Finishes for the wordmark, picked from the hero's inspector. */
export const materials = {
  Iris: ["#2a1250", "#8b3dff", "#45e6ff", "#ff6f9c"],
  Chrome: ["#0b0b0c", "#4a4a4a", "#d4d4d4", "#ffffff"],
  Ink: ["#050505", "#141414", "#343434", "#7a7a7a"],
  Paper: ["#a9a9a9", "#dcdcdc", "#f2f2f2", "#ffffff"],
} as const;
export type Material = keyof typeof materials;

type Uniforms = Record<"uC1" | "uC2" | "uC3" | "uC4", { value: THREE.Vector3 }>;

/**
 * The VORQ wordmark as an extruded 3D object with a live shader face.
 * It leans toward the cursor and idles with a slow sway. Calls `onReady`
 * once the first frame is on screen so the flat fallback can step aside.
 */
export default function Wordmark3D({
  onReady,
  pausedRef,
  material = "Iris",
  telemetryRef,
}: {
  onReady: () => void;
  pausedRef?: { current: boolean };
  material?: Material;
  /** Receives the live rotation (radians) every frame, for the inspector readout. */
  telemetryRef?: { current: { x: number; y: number } };
}) {
  const mount = useRef<HTMLDivElement>(null);
  const colors = useRef<Uniforms | null>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the flat wordmark stays.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
    const group = new THREE.Group();
    scene.add(group);

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uC1: { value: hex("#2a1250") },
      uC2: { value: hex("#8b3dff") },
      uC3: { value: hex("#45e6ff") },
      uC4: { value: hex("#ff6f9c") },
    };
    colors.current = uniforms;
    const shader = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });

    let mesh: THREE.Mesh | undefined;
    let wordWidth = 4;
    let wordHeight = 1;
    let disposed = false;

    const fit = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Pull the camera back until the word spans WORD_SPAN of the width and no more than 60% of the height,
      // leaving room for the tilt so the near end never leaves the frame.
      const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const byWidth = wordWidth / 2 / WORD_SPAN / (tan * camera.aspect);
      const byHeight = wordHeight / 2 / 0.6 / tan;
      camera.position.z = Math.max(byWidth, byHeight);
      camera.updateProjectionMatrix();
    };

    fetch("/fonts/sekuya-vorq.json")
      .then((r) => r.json())
      .then((data) => {
        if (disposed) return;
        const geometry = new TextGeometry("VORQ", {
          font: new FontLoader().parse(data),
          size: 1,
          depth: 0.34,
          curveSegments: 10,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.018,
          bevelSegments: 3,
        });
        geometry.center();
        geometry.computeBoundingBox();
        wordWidth = geometry.boundingBox!.max.x - geometry.boundingBox!.min.x;
        wordHeight = geometry.boundingBox!.max.y - geometry.boundingBox!.min.y;
        mesh = new THREE.Mesh(geometry, shader);
        group.add(mesh);
        fit();
        renderer.render(scene, camera);
        onReady();
      })
      .catch(() => {});

    const ro = new ResizeObserver(fit);
    ro.observe(el);

    const target = new THREE.Vector2();
    const current = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const clock = new THREE.Clock();
    let frame = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!visible || !mesh || pausedRef?.current) return;
      const t = reduce ? 0 : clock.getElapsedTime();
      current.lerp(target, 0.06);
      group.rotation.y = current.x * 0.26 + Math.sin(t * 0.4) * 0.05;
      group.rotation.x = -current.y * 0.18 + Math.cos(t * 0.5) * 0.03;
      group.position.y = Math.sin(t * 0.8) * 0.03;
      uniforms.uTime.value = t;
      uniforms.uPointer.value.copy(current);
      if (telemetryRef) {
        telemetryRef.current.x = group.rotation.x;
        telemetryRef.current.y = group.rotation.y;
      }
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      mesh?.geometry.dispose();
      shader.dispose();
      colors.current = null;
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady, pausedRef, telemetryRef]);

  // Re-skin without rebuilding the scene. Declared after the setup effect, so it also sets the first finish.
  useEffect(() => {
    const u = colors.current;
    if (!u) return;
    const [c1, c2, c3, c4] = materials[material];
    u.uC1.value.copy(hex(c1));
    u.uC2.value.copy(hex(c2));
    u.uC3.value.copy(hex(c3));
    u.uC4.value.copy(hex(c4));
  }, [material]);

  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
}
