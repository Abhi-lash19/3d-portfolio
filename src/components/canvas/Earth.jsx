import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import { useVisibleFrameloop } from "./useVisibleFrameloop";
import { useMediaQuery } from "../../utils/useMediaQuery";

import CanvasLoader from "../Loader";

const Earth = ({ reduceMotion }) => {
  const earth = useGLTF("./planet/scene.gltf");
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current && !reduceMotion) {
      ref.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <primitive
      ref={ref}
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

const EarthCanvas = () => {
  const [canvasRef, isVisible] = useVisibleFrameloop();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <Canvas
      ref={canvasRef}
      // "never" fully stops rendering while off screen; "demand" would stay
      // alive because OrbitControls(autoRotate) invalidates every frame.
      frameloop={isVisible ? "always" : "never"}
      shadows
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: false }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!reduceMotion}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth reduceMotion={reduceMotion} />
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload("./planet/scene.gltf");

export default EarthCanvas;
