"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
    count?: number;
    radius?: number;
    color?: string;
}

/** A drifting field of points. Cheap: one draw call, updated on the GPU-friendly path. */
export function Particles({ count = 900, radius = 9, color = "#FF8A4C" }: ParticlesProps) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // distribute in a soft spherical shell
            const r = radius * Math.cbrt(Math.random());
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
            arr[i * 3 + 2] = r * Math.cos(phi);
        }
        return arr;
    }, [count, radius]);

    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.y += delta * 0.03;
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.045}
                color={color}
                transparent
                opacity={0.55}
                depthWrite={false}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
