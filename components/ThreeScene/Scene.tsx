"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { Particles } from "./Particles";
import { FloatingIngredients } from "./FloatingIngredients";
import type { Vec2 } from "@/hooks/useMousePosition";

interface SceneProps {
  pointer: React.MutableRefObject<Vec2>;
  lowPower?: boolean;
}

/** Eases the camera toward the pointer for a parallax / interactive feel. */
function CameraRig({ pointer }: { pointer: React.MutableRefObject<Vec2> }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame(() => {
    target.current.set(pointer.current.x * 1.6, pointer.current.y * 1.1, 6);
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Scene({ pointer, lowPower = false }: SceneProps) {
  return (
    <>
      <color attach="background" args={["#0B0A08"]} />
      <fog attach="fog" args={["#0B0A08", 8, 20]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.3} color="#ffd9b0" castShadow />
      <pointLight position={[-6, -2, -4]} intensity={40} color="#FF6A21" distance={20} />

      <Environment preset="sunset" />

      <FloatingIngredients />
      <Particles count={lowPower ? 350 : 900} />

      <CameraRig pointer={pointer} />

      {!lowPower && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.3} />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      )}
    </>
  );
}
