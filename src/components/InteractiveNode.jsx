import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function InteractiveNode({ object, isActive, isVisited, isNext, progress = 0 }) {
  const hologramRef = useRef();
  const auraMaterialRef = useRef();
  
  const timeOffset = useRef(0);

  useEffect(() => {
    timeOffset.current = Math.random() * 100;
  }, []);

  const color = object.type === 'core' ? '#0ea5e9' : 
                object.type === 'project' ? '#8b5cf6' : '#3b82f6';
                
  const isCore = object.type === 'core';
  const baseIntensity = isVisited ? 0.3 : (isCore ? (0.5 + 2.5 * progress) : 2.0);
  const activeIntensity = baseIntensity * 2.5;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime + timeOffset.current;
    
    if (hologramRef.current) {
      // Hologram Float & Spin mechanics scaling natively based on systemic game loop unlocking bounds securely!
      let rotSpeedY = 0.5;
      let rotSpeedZ = 0.2;
      if (isCore) {
         rotSpeedY = 0.1 + (1.2 * progress);
         rotSpeedZ = 0.05 + (0.5 * progress);
      }
      
      hologramRef.current.position.y = (isCore ? 2.5 : 1.2) + Math.sin(t * 1.5) * 0.15;
      hologramRef.current.rotation.y += delta * rotSpeedY;
      hologramRef.current.rotation.z += delta * rotSpeedZ;

      // Scale pulse
      let targetScale = isActive ? 1.3 : 1.0;
      if (isNext && !isActive && !isVisited) {
        targetScale = 1.0 + Math.sin(t * 4) * 0.08;
      }
      hologramRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, delta * 6);
      
      // Emissive Intensity interpolating seamlessly
      if (hologramRef.current.material) {
        let targetIntensity = isVisited ? 0.3 : baseIntensity;
        if (isActive) {
          targetIntensity = activeIntensity + Math.sin(t * 10) * 1.5;
        } else if (isNext && !isVisited) {
          targetIntensity = baseIntensity + Math.sin(t * 3) * 0.8;
        }
        hologramRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
          hologramRef.current.material.emissiveIntensity, targetIntensity, delta * 8
        );
      }
    }

    if (auraMaterialRef.current) {
      let targetOpacity = isActive ? (isCore ? 0.5 : 0.4) : (isCore ? 0.25 : 0.15);
      if (isVisited) targetOpacity = 0.05;
      auraMaterialRef.current.opacity = THREE.MathUtils.lerp(auraMaterialRef.current.opacity, targetOpacity, delta * 5);
    }
  });

  if (isCore) {
    return (
      <group position={object.position}>
        {/* Central Core Huge Hexagonal Base */}
        <mesh position={[0, 0.2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[2, 2.2, 0.4, 6]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
        </mesh>
        
        {/* Core Glowing Power Ring */}
        <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        
        {/* Central Vertical Energy Pillar */}
        <mesh position={[0, 2.8, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 5, 16]} />
          <meshStandardMaterial 
            ref={auraMaterialRef}
            color={color} 
            emissive={color}
            transparent 
            opacity={0.25} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
            toneMapped={false} 
          />
        </mesh>
        
        {/* Enormous Core Hologram Component */}
        <mesh ref={hologramRef} position={[0, 2.5, 0]} castShadow>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={baseIntensity} 
            wireframe
            toneMapped={false}
          />
        </mesh>
      </group>
    );
  }

  // Standard Terminal Component Render mapped accurately
  return (
    <group position={object.position}>
      {/* Grounded Structural Pedestal Base */}
      <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.3, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Glowing Neon Access Band wrapped perfectly outside the Plinth natively marking system colors dynamically */}
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.03, 16, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Outer Holographic Container Field securely wrapping the terminal display dynamically linking to active node fields */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2.5, 32, 1, true]} />
        <meshStandardMaterial 
          ref={auraMaterialRef}
          color={color} 
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Internal Rotating Data Hologram cleanly substituting basic spheres projecting technical precision directly */}
      <mesh ref={hologramRef} position={[0, 1.2, 0]} castShadow>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={baseIntensity} 
          wireframe
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
