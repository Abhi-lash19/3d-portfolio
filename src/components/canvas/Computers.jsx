// src/components/canvas/Computer.jsx

import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

import CanvasLoader from "../Loader";

// Parallax + micro rotation rig
const Rig = ({ isMobile }) => {
  const vec = useMemo(() => new THREE.Vector3(), []);
  const baseCam = useRef([20, 3, 5]);

  useFrame((state) => {
    if (isMobile) return;

    const { mouse, camera } = state;

    // Subtle mouse parallax camera
    const parallaxX = mouse.x * 0.9; // left-right
    const parallaxY = mouse.y * 0.35; // up-down

    camera.position.lerp(
      vec.set(
        baseCam.current[0] + parallaxX,
        baseCam.current[1] + parallaxY,
        baseCam.current[2]
      ),
      0.06
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const groupRef = useRef();

  // micro rotation on model
  useFrame((state) => {
    if (!groupRef.current || isMobile) return;

    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.x = -0.01 + Math.sin(t * 0.4) * 0.02;
    groupRef.current.rotation.y = -0.2 + Math.sin(t * 0.3) * 0.04;
    groupRef.current.rotation.z = -0.1 + Math.sin(t * 0.35) * 0.01;
  });

  return (
    <group ref={groupRef}>
      {/* Ambient base */}
      <ambientLight intensity={0.5} />

      {/*realistic sky/ground fill */}
      <hemisphereLight intensity={0.6} groundColor="black" />

      {/*main spotlight (strong key light) */}
      <spotLight
        position={[10, 25, 10]}
        angle={0.35}
        penumbra={1}
        intensity={2.4}
        castShadow
        shadow-mapSize={1024}
      />

      {/*front fill light */}
      <pointLight position={[-10, 10, 10]} intensity={1.15} />

      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
      />

      {/* Realistic soft shadow under desk */}
      <ContactShadows
        position={[0, -3.6, 0]}
        opacity={0.45}
        scale={10}
        blur={2.5}
        far={4}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 500px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const handler = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={isMobile ? 1 : [1, 2]} // reduce work on mobile
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: !isMobile, // reduce GPU cost on mobile
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* HDR lighting */}
        <Environment preset="city" />

        {/* Premium parallax */}
        <Rig isMobile={isMobile} />

        {/* Orbit controls: smooth + limited */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.35}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Bloom only on desktop (perf boost) */}
        {!isMobile && (
          <EffectComposer>
            <Bloom
              intensity={0.32}
              luminanceThreshold={0.25}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        )}

        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

useGLTF.preload("./desktop_pc/scene.gltf");

export default ComputersCanvas;
