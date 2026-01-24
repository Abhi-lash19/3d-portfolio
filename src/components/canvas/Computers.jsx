// src/components/canvas/Computer.jsx

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* soft overall ambient */}
      <ambientLight intensity={0.6} />

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
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 500px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/*HDR environment*/}
        <Environment preset='city' />

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

useGLTF.preload("./desktop_pc/scene.gltf");

export default ComputersCanvas;
