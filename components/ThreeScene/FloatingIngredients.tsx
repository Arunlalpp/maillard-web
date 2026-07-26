"use client";

import { Float } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

/** Stylised, abstract "ingredients" — not literal models, kept light for perf. */
function Patty(props: ThreeElements["mesh"]) {
  return (
    <mesh castShadow {...props}>
      <cylinderGeometry args={[1, 1, 0.42, 48]} />
      <meshStandardMaterial color="#3a2318" roughness={0.65} metalness={0.1} />
    </mesh>
  );
}

function CheeseBun(props: ThreeElements["mesh"]) {
  return (
    <mesh castShadow {...props}>
      <sphereGeometry args={[1, 40, 40]} />
      <meshStandardMaterial color="#c9862f" roughness={0.4} metalness={0.15} />
    </mesh>
  );
}

function OnionRing(props: ThreeElements["mesh"]) {
  return (
    <mesh castShadow {...props}>
      <torusGeometry args={[0.8, 0.28, 24, 64]} />
      <meshStandardMaterial color="#FF6A21" roughness={0.3} metalness={0.2} emissive="#FF6A21" emissiveIntensity={0.15} />
    </mesh>
  );
}

export function FloatingIngredients() {
  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.2}>
        <CheeseBun position={[-3, 1.4, -1]} scale={0.9} />
      </Float>
      <Float speed={1.1} rotationIntensity={1.2} floatIntensity={1.4}>
        <Patty position={[3.1, -0.6, 0.4]} scale={1} rotation={[0.4, 0.2, 0.1]} />
      </Float>
      <Float speed={1.7} rotationIntensity={1.5} floatIntensity={1.6}>
        <OnionRing position={[1.6, 2.1, -1.6]} scale={0.9} rotation={[1.1, 0.3, 0]} />
      </Float>
      <Float speed={1.3} rotationIntensity={1.0} floatIntensity={1.1}>
        <OnionRing position={[-2.4, -1.7, 0.6]} scale={0.6} rotation={[0.6, 0.8, 0]} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.3}>
        <CheeseBun position={[4, 1.8, -2]} scale={0.5} />
      </Float>
    </group>
  );
}
