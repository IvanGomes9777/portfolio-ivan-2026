"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  // Simplex-ish hash + value noise + fbm
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.06;
    vec2 q = vec2(fbm(p * 1.6 + vec2(t, t * 0.7)),
                  fbm(p * 1.6 + vec2(-t * 0.4, t * 0.5)));
    float n = fbm(p * 2.2 + q * 1.4 + t);

    // Palette (matches your tokens, untouched)
    vec3 bg          = vec3(0.027, 0.027, 0.039);   // #07070a
    vec3 violet      = vec3(0.545, 0.361, 0.965);   // #8b5cf6
    vec3 indigo      = vec3(0.4,   0.4,   0.97 );
    vec3 violetSoft  = vec3(0.655, 0.529, 0.98 );   // #a78bfa

    vec3 col = bg;
    col = mix(col, violet,     smoothstep(0.42, 0.78, n) * 0.42);
    col = mix(col, indigo,     smoothstep(0.52, 0.86, fbm(p * 0.9 + t * 0.3)) * 0.18);
    col = mix(col, violetSoft, smoothstep(0.78, 0.95, n) * 0.12);

    // Mouse glow (subtle)
    vec2 m = uMouse;
    m.x *= aspect;
    float d = distance(p, m);
    col += violet * 0.25 * smoothstep(0.45, 0.0, d);

    // Vignette
    float vig = smoothstep(1.25, 0.35, length(uv - 0.5));
    col *= vig;

    // Slight grain
    float g = (hash(uv * uResolution + uTime) - 0.5) * 0.025;
    col += g;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock, size }) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value = clock.getElapsedTime();
    u.uResolution.value.set(size.width, size.height);
    const m = u.uMouse.value as THREE.Vector2;
    m.x = THREE.MathUtils.lerp(m.x, mouse.current.x, 0.06);
    m.y = THREE.MathUtils.lerp(m.y, mouse.current.y, 0.06);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(1, 1) },
        }}
      />
    </mesh>
  );
}

export default function HeroShader() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-80">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ShaderPlane />
      </Canvas>
      {/* Top fade so the navbar stays clean */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-bg)] to-transparent" />
      {/* Bottom fade into Promise section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
    </div>
  );
}
