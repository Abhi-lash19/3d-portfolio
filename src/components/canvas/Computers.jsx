// src/components/canvas/Computers.jsx

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import CanvasLoader from "../Loader";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { useVisibleFrameloop } from "./useVisibleFrameloop";

// Safe helpers (prevents NaN propagation)
const safeNum = (v, fallback = 0) => (Number.isFinite(v) ? v : fallback);
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const Computers = ({ isMobile, isVisible, isDragging, reduceMotion }) => {
  const computer = useGLTF("./desktop_pc/scene.glb");
  const groupRef = useRef();
  const { invalidate } = useThree();

  // MEMOIZED MODEL PROPS (ADDED)
  const modelProps = useMemo(
    () => ({
      scale: isMobile ? 0.68 : 0.75,
      position: isMobile ? [0, -3.4, -2.4] : [0, -3.25, -1.5],
    }),
    [isMobile]
  );

  // Own time accumulator. R3F resets clock.elapsedTime every time the
  // frameloop prop changes, so driving the float from the clock would make the
  // model jump whenever the hero scrolls back into view.
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    // belt-and-braces: also skip the work (and the mobile invalidate() below)
    // if a frame somehow still runs while the canvas is off screen
    if (!groupRef.current || !isVisible) return;

    const group = groupRef.current;

    timeRef.current += safeNum(delta, 0);
    const t = timeRef.current;

    /* Mouse parallax.
       This nudges the MODEL, not the camera. OrbitControls calls
       controls.update() every frame and owns camera.position outright, so the
       old camera rig both fought it and never ran (it bailed out whenever the
       pointer was inside the canvas — i.e. always). Moving the group instead
       keeps OrbitControls as the single camera owner. */
    if (!isMobile && !reduceMotion) {
      const mx = clamp(safeNum(state.mouse?.x, 0), -1, 1);
      const my = clamp(safeNum(state.mouse?.y, 0), -1, 1);
      // hold still while the user is dragging the model around
      const ease = isDragging ? 0 : 0.05;

      group.position.x += (mx * 0.25 - group.position.x) * ease;
      group.position.y += (my * 0.08 - group.position.y) * ease;
    }

    // blend instead of hard-stop during interaction
    const interactionBlend = !isMobile && isDragging ? 0.4 : 1;

    /* Reduced motion: hold the model in its resting pose */
    if (reduceMotion) {
      group.rotation.set(-0.01, -0.2, -0.1);
      return;
    }

    /* MOBILE — time-based motion (NO accumulation = no freeze) */
    if (isMobile) {
      group.rotation.set(-0.01, Math.sin(t * 0.25) * 0.04, -0.1);
      invalidate(); // REQUIRED for frameloop="demand"
      return;
    }

    // Desktop: premium floating animation
    const speed = 0.55;

    group.rotation.x = -0.01 + Math.sin(t * speed) * 0.02 * interactionBlend;
    group.rotation.y = -0.2 + Math.sin(t * (speed * 0.75)) * 0.04 * interactionBlend;
    group.rotation.z = -0.1 + Math.sin(t * (speed * 0.85)) * 0.01 * interactionBlend;

    // if anything ever turns invalid, reset instantly
    if (
      !Number.isFinite(group.rotation.x) ||
      !Number.isFinite(group.rotation.y) ||
      !Number.isFinite(group.rotation.z)
    ) {
      group.rotation.set(-0.01, -0.2, -0.1);
    }
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
        scale={modelProps.scale}
        position={modelProps.position}
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
  const [canvasRef, isVisible] = useVisibleFrameloop();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Drag state is local to THIS canvas. It used to be a module-level global
  // shared with the Stars canvas, so hovering the hero also froze the stars.
  const [isDragging, setIsDragging] = useState(false);
  const endDrag = () => setIsDragging(false);

  return (
    <Canvas
      ref={canvasRef}
      className="r3f-canvas"
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      style={{
        pointerEvents: isMobile ? "none" : "auto",
        cursor: isMobile ? "default" : "grab",
      }}
      // "never" fully stops rendering while off screen. "demand" is not
      // enough here: drei/postprocessing helpers call invalidate() every
      // frame, which would keep a "demand" loop alive.
      frameloop={!isVisible ? "never" : isMobile ? "demand" : "always"}
      shadows={!isMobile}
      dpr={isMobile ? 1 : [1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{
        preserveDrawingBuffer: false,
        antialias: !isMobile,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* HDR lighting */}
        <Environment preset="city" blur={0.4} /> {/*softer, more cinematic */}

        {/* Orbit controls: smoother, calmer, more premium.
            Sole owner of the camera. */}
        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        )}

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

        <Computers
          isMobile={isMobile}
          isVisible={isVisible}
          isDragging={isDragging}
          reduceMotion={reduceMotion}
        />
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload("./desktop_pc/scene.glb");

export default ComputersCanvas;
