  // src/components/canvas/Computer.jsx

  import { Suspense, useEffect, useMemo, useState, useRef } from "react";
  import { Canvas, useFrame, useThree } from "@react-three/fiber";
  import {
    OrbitControls,
    useGLTF,
    Environment,
    ContactShadows,
  } from "@react-three/drei";
  import { EffectComposer, Bloom } from "@react-three/postprocessing";
  import * as THREE from "three";
  import { isInteracting, setInteracting } from "../../utils/interaction";

  import CanvasLoader from "../Loader";

  // Safe helpers (prevents NaN propagation)
  const safeNum = (v, fallback = 0) => (Number.isFinite(v) ? v : fallback);
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  // Parallax + micro rotation rig
  const Rig = ({ isMobile }) => {
    const vec = useMemo(() => new THREE.Vector3(), []);
    const baseCam = useRef([20, 3, 5]);

    useFrame((state) => {
      // Step aside during scroll / touch
      if (isMobile || isInteracting()) return;

      const { mouse, camera } = state;

      // mouse can be undefined / NaN sometimes during init
      const mx = clamp(safeNum(mouse?.x, 0), -1, 1);
      const my = clamp(safeNum(mouse?.y, 0), -1, 1);

      // Subtle mouse parallax camera
      const parallaxX = mx * 0.9; // left-right
      const parallaxY = my * 0.35; // up-down

      camera.position.lerp(
        vec.set(
          baseCam.current[0] + parallaxX,
          baseCam.current[1] + parallaxY,
          baseCam.current[2]
        ),
        0.085
      );

      camera.lookAt(0, 0, 0);
    });

    return null;
  };

  const Computers = ({ isMobile }) => {
    const computer = useGLTF("./desktop_pc/scene.gltf");
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

    useFrame((state) => {
      if (!groupRef.current) return;

      const t = safeNum(state.clock.getElapsedTime(), 0);
      // blend instead of hard-stop during interaction
      const interactionBlend = !isMobile && isInteracting() ? 0.4 : 1;

      /* MOBILE — time-based motion (NO accumulation = no freeze) */
      if (isMobile) {
        groupRef.current.rotation.set(
          -0.01,
          Math.sin(t * 0.25) * 0.04,
          -0.1
        );
        invalidate(); // REQUIRED for frameloop="demand"
        return;
      }

      // Desktop: premium floating animation
      const speed = 0.55;

      groupRef.current.rotation.x =
        -0.01 + Math.sin(t * speed) * 0.02 * interactionBlend;
      groupRef.current.rotation.y =
        -0.2 + Math.sin(t * (speed * 0.75)) * 0.04 * interactionBlend;
      groupRef.current.rotation.z =
        -0.1 + Math.sin(t * (speed * 0.85)) * 0.01 * interactionBlend;

      // if anything ever turns invalid, reset instantly
      if (
        !Number.isFinite(groupRef.current.rotation.x) ||
        !Number.isFinite(groupRef.current.rotation.y) ||
        !Number.isFinite(groupRef.current.rotation.z)
      ) {
        groupRef.current.rotation.set(-0.01, -0.2, -0.1);
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
        className="r3f-canvas"
        onPointerEnter={() => setInteracting(true)}
        onPointerLeave={() => setInteracting(false)}
        onPointerDown={() => setInteracting(true)}
        onPointerUp={() => setInteracting(false)}
        style={{
          pointerEvents: isMobile ? "none" : "auto",
          cursor: isMobile ? "default" : "grab",
        }}
        frameloop={isMobile ? "demand" : "always"}
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

          {/* Premium parallax */}
          <Rig isMobile={isMobile} />

          {/* Orbit controls: smoother, calmer, more premium */}
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

          <Computers isMobile={isMobile} />
        </Suspense>
      </Canvas>
    );
  };

  useGLTF.preload("./desktop_pc/scene.gltf");

  export default ComputersCanvas;
