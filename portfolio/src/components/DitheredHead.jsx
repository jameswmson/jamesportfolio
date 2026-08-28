import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

/**
 * DitheredHead
 *
 * Renders a GLB bust to an offscreen target, then thresholds it to two colours
 * with an ordered (Bayer) dither. The dot grid is locked to the screen, so the
 * head turns underneath a stationary pattern.
 *
 * Defaults are the dark-ground values tuned against the About slot (490x612).
 */
export default function DitheredHead({
  src = '/head.glb',
  ground = '#1C1917',
  dot = '#F7F4EF',
  dotSize = 4,          // px per dither cell — the main aesthetic dial
  low = 0.19,           // contrast window floor
  high = 0.65,          // contrast window ceiling
  lift = 0.72,          // albedo lift: this texture skews dark
  gamma = 0.8,
  ambient = 0.34,
  key = 1.05,
  aoStrength = 3.2,
  aoRadius = 9,
  fps = 12,
  speed = 0.42,         // radians/sec
  padding = 1.06,
  className = '',
}) {
  const hostRef = useRef(null);
  const paramsRef = useRef({});
  useEffect(() => {
    paramsRef.current = {
      dotSize, low, high, lift, gamma, ambient, key, aoStrength, aoRadius, fps, speed, ground, dot,
    };
  }, [dotSize, low, high, lift, gamma, ambient, key, aoStrength, aoRadius, fps, speed, ground, dot]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    host.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0, 3);

    // ---- offscreen colour + depth ----
    const depthTexture = new THREE.DepthTexture(1, 1);
    depthTexture.type = THREE.UnsignedIntType;
    const rt = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthTexture,
    });

    // ---- head material: albedo lift + single lambert key, matching the preview ----
    const lightDir = new THREE.Vector3(-0.4, 0.44, 0.8).normalize();
    const headMat = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: null },
        uLightDir: { value: lightDir },
        uAmbient: { value: ambient },
        uKey: { value: key },
        uLift: { value: lift },
        uGamma: { value: gamma },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vN;
        void main() {
          vUv = uv;
          vN = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap;
        uniform vec3 uLightDir;
        uniform float uAmbient, uKey, uLift, uGamma;
        varying vec2 vUv;
        varying vec3 vN;
        void main() {
          vec3 albedo = texture2D(uMap, vUv).rgb;
          albedo = pow(clamp(albedo / uLift, 0.0, 1.0), vec3(uGamma));
          float nd = max(dot(normalize(vN), uLightDir), 0.0);
          gl_FragColor = vec4(albedo * (uAmbient + uKey * nd), 1.0);
        }`,
    });

    // ---- fullscreen dither pass ----
    const post = new THREE.Scene();
    const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postMat = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: rt.texture },
        tDepth: { value: depthTexture },
        uRes: { value: new THREE.Vector2(1, 1) },
        uDpr: { value: dpr },
        uScale: { value: dotSize },
        uLow: { value: low },
        uHigh: { value: high },
        uAOStrength: { value: aoStrength },
        uAORadius: { value: aoRadius },
        uNear: { value: camera.near },
        uFar: { value: camera.far },
        uGround: { value: new THREE.Color(ground) },
        uDot: { value: new THREE.Color(dot) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse, tDepth;
        uniform vec2 uRes;
        uniform float uDpr, uScale, uLow, uHigh, uAOStrength, uAORadius, uNear, uFar;
        uniform vec3 uGround, uDot;
        varying vec2 vUv;

        float bayer(vec2 p) {
          float m[16];
          m[0]=0.;  m[1]=8.;  m[2]=2.;  m[3]=10.;
          m[4]=12.; m[5]=4.;  m[6]=14.; m[7]=6.;
          m[8]=3.;  m[9]=11.; m[10]=1.; m[11]=9.;
          m[12]=15.;m[13]=7.; m[14]=13.;m[15]=5.;
          int i = int(mod(p.x, 4.0)) + int(mod(p.y, 4.0)) * 4;
          for (int k = 0; k < 16; k++) { if (k == i) return (m[k] + 0.5) / 16.0; }
          return 0.5;
        }

        float viewZ(vec2 uv) {
          float d = texture2D(tDepth, uv).x;
          float z = d * 2.0 - 1.0;
          return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
        }

        void main() {
          // one lighting sample per dither cell, taken at the cell centre
          vec2 cell = floor(gl_FragCoord.xy / (uScale * uDpr));
          vec2 cUv  = (cell + 0.5) * (uScale * uDpr) / uRes;

          vec3 src = texture2D(tDiffuse, cUv).rgb;
          float lum = dot(src, vec3(0.2126, 0.7152, 0.0722));

          // depth-derived occlusion: cavities sit behind their neighbourhood
          float d0 = viewZ(cUv);
          float acc = 0.0;
          for (int i = 0; i < 8; i++) {
            float a = float(i) * 0.7853981634;
            vec2 o = vec2(cos(a), sin(a)) * uAORadius * uDpr / uRes;
            acc += viewZ(cUv + o);
          }
          float ao = clamp((acc / 8.0 - d0) * uAOStrength + 1.0, 0.0, 1.0);
          lum = smoothstep(uLow, uHigh, lum * ao);

          // background stays clean: far depth means nothing was drawn
          if (d0 > uFar * 0.9) { gl_FragColor = vec4(uGround, 1.0); return; }

          float on = step(bayer(cell), lum);

          // round dots rather than square cells
          vec2 f = fract(gl_FragCoord.xy / (uScale * uDpr)) - 0.5;
          float r = 1.0 - smoothstep(0.36, 0.46, length(f));

          gl_FragColor = vec4(mix(uGround, uDot, on * r), 1.0);
        }`,
    });
    post.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMat));

    // ---- load ----
    let head = null;
    let disposed = false;
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(src, (gltf) => {
      if (disposed) return;
      head = gltf.scene;
      head.traverse((o) => {
        if (!o.isMesh) return;
        const map = o.material.map;
        if (map) { map.colorSpace = THREE.NoColorSpace; map.needsUpdate = true; }
        const m = headMat.clone();
        m.uniforms.uMap.value = map;
        m.side = THREE.FrontSide;
        o.material = m;
      });

      const box = new THREE.Box3().setFromObject(head);
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      head.position.sub(centre);

      const pivot = new THREE.Group();
      pivot.add(head);
      scene.add(pivot);
      head = pivot;

      const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
      camera.position.z = (size.y / 2 / Math.tan(halfFov)) * padding;
      camera.updateProjectionMatrix();
    });

    // ---- sizing ----
    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      rt.setSize(w * dpr, h * dpr);
      postMat.uniforms.uRes.value.set(w * dpr, h * dpr);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // ---- loop ----
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(host);

    let raf = 0, last = 0, prev = performance.now();
    const draw = () => {
      renderer.setRenderTarget(rt);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.render(post, postCam);
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const p = paramsRef.current;

      postMat.uniforms.uScale.value = p.dotSize;
      postMat.uniforms.uLow.value = p.low;
      postMat.uniforms.uHigh.value = p.high;
      postMat.uniforms.uAOStrength.value = p.aoStrength;
      postMat.uniforms.uAORadius.value = p.aoRadius;
      postMat.uniforms.uGround.value.set(p.ground);
      postMat.uniforms.uDot.value.set(p.dot);

      if (!visible) { prev = now; return; }
      if (now - last < 1000 / p.fps) return;
      const dt = Math.min((now - prev) / 1000, 0.25);
      last = now; prev = now;

      if (head && !reduced) head.rotation.y += p.speed * dt;
      draw();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      rt.dispose();
      depthTexture.dispose();
      postMat.dispose();
      headMat.dispose();
      renderer.dispose();
      dracoLoader.dispose();
      if (renderer.domElement.parentNode) host.removeChild(renderer.domElement);
    };
  }, [src, padding]);

  return <div ref={hostRef} className={className} style={{ width: '100%', height: '100%' }} />;
}
