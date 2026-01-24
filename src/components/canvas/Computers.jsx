// src/components/canvas/Computer.jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment, ContactShadows,} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* Ambient base */}
      <ambientLight intensity={0.5} />

      {/*realistic sky/ground fill */}
      <hemisphereLight intensity={0.6} groundColor='black' />

      {/*main spotlight (strong key light) */}
      <spotLight
        position={[10, 25, 10]}
        angle={0.35}
        penumbra={1}
        intensity={2.5}
        castShadow
        shadow-mapSize={1024}
      />

      {/*front fill light */}
      <pointLight position={[-10, 10, 10]} intensity={1.2} />

      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />

      {/* Realistic soft shadow under desk */}
      <ContactShadows
        position={[0, -3.6, 0]}
        opacity={0.45}
        scale={10}
        blur={2.5}
        far={4}
      />
    </mesh>
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
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{
        preserveDrawingBuffer: true,
        toneMappingExposure: 1.1,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* HDR lighting */}
        <Environment preset='city' />

        {/* Smooth cinematic camera */}
        <OrbitControls
          enableZoom={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.4}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Bloom glow */}
        <EffectComposer>
          <Bloom
            intensity={0.35}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

useGLTF.preload("./desktop_pc/scene.gltf");

export default ComputersCanvas;
