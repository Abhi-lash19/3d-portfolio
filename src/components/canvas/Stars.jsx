import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

import { isStarsDimmed } from "./starsState";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { useVisibleFrameloop } from "./useVisibleFrameloop";

// 3 floats per point, so the buffer length must be a multiple of the stride.
// 5000 left a partial trailing vertex and a non-integer attribute count.
const STAR_COUNT = 1667;
const POSITION_STRIDE = 3;

const Stars = ({ reduceMotion, ...props }) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(STAR_COUNT * POSITION_STRIDE), {
      radius: 1.2,
    })
  );

  useFrame((_, delta) => {
    if (!ref.current || reduceMotion) return;

    const speed = isStarsDimmed() ? 0.15 : 1;
    ref.current.rotation.x -= (delta / 10) * speed;
    ref.current.rotation.y -= (delta / 15) * speed;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={POSITION_STRIDE}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [canvasRef, isVisible] = useVisibleFrameloop();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div className="w-full h-auto absolute inset-0 z-[-1] pointer-events-none">
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 1] }}
        // stop rendering entirely while scrolled out of view
        frameloop={isVisible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <Stars reduceMotion={reduceMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
