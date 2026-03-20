import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Grid, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveNode from './InteractiveNode';
import { INTERACTIVE_OBJECTS } from '../config/InteractiveObjects';

export default function Environment({ setActiveObject, activeObjectId, visitedNodes = [], appState, progress = 0 }) {
  const { camera } = useThree();
  const previousNearestId = useRef(null);
  
  const ambientLightRef = useRef(null);
  const directionalLightRef = useRef(null);

  useFrame((state, delta) => {
    let nearestId = null;
    let minDistance = Infinity;

    INTERACTIVE_OBJECTS.forEach((obj) => {
      const distance = camera.position.distanceTo(obj.position);
      if (distance < obj.radius && distance < minDistance) {
        minDistance = distance;
        nearestId = obj.id;
      }
    });

    if (nearestId !== previousNearestId.current) {
      previousNearestId.current = nearestId;
      const activeObj = INTERACTIVE_OBJECTS.find(o => o.id === nearestId) || null;
      setActiveObject(activeObj);
    }

    // Dynamic Cinematic Lighting mapping physical game loops accurately scaling room visibility iteratively!
    if (ambientLightRef.current && directionalLightRef.current) {
      let targetAmbient = 0.15 + (0.2 * progress);
      let targetDirectional = 0.2 + (0.4 * progress);
      
      if (appState === 'INTERACT') {
         targetAmbient = 0.15;
         targetDirectional = 0.2;
      }

      ambientLightRef.current.intensity = THREE.MathUtils.lerp(ambientLightRef.current.intensity, targetAmbient, delta * 3);
      directionalLightRef.current.intensity = THREE.MathUtils.lerp(directionalLightRef.current.intensity, targetDirectional, delta * 3);
    }
  });

  return (
    <>
      <fog attach="fog" args={['#020617', 5, 25]} />
      <ambientLight ref={ambientLightRef} intensity={0.2} />
      <directionalLight ref={directionalLightRef} position={[5, 10, 5]} intensity={0.2} castShadow />
      
      {/* Ground Grid - Slightly subdued resolving space strictly mapping structural coordinates */}
      <Grid 
        position={[0, 0, 0]} 
        args={[80, 80]} 
        cellSize={1} 
        cellThickness={0.8} 
        cellColor="#0ea5e9" 
        sectionSize={5} 
        sectionThickness={1.2} 
        sectionColor="#38bdf8" 
        fadeDistance={25} 
        fadeStrength={2}
      />

      {/* Glossy Reflective Structural Floor absorbing the glowing nodes and dynamic physics generating realism natively! */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={10}
          roughness={0.4}
          metalness={0.8}
          depthScale={1}
          minDepthThreshold={0.8}
          color="#020617"
        />
      </mesh>
      
      {/* Detailed Segmented Architectural Server Walls simulating massive scale structural interiors */}
      {[-20, 20].map((z, i) => (
        <group key={`back-${i}`} position={[0, 0, z]}>
           <mesh position={[0, 5, 0]} receiveShadow>
             <boxGeometry args={[40, 10, 1]} />
             <meshStandardMaterial color="#020617" roughness={0.9} />
           </mesh>
           {/* Vertical Structural Server Rack Details */}
           {[-15, -10, -5, 0, 5, 10, 15].map(x => (
             <group key={`beam-${x}`} position={[x, 5, i === 0 ? 0.6 : -0.6]}>
               <mesh castShadow receiveShadow>
                 <boxGeometry args={[0.5, 10, 0.5]} />
                 <meshStandardMaterial color="#0b1120" metalness={0.6} roughness={0.4} />
               </mesh>
               <mesh position={[0, 0, i === 0 ? 0.26 : -0.26]}>
                 <planeGeometry args={[0.1, 10]} />
                 <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} toneMapped={false} />
               </mesh>
             </group>
           ))}
        </group>
      ))}

      {[-20, 20].map((x, i) => (
        <group key={`side-${i}`} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
           <mesh position={[0, 5, 0]} receiveShadow>
             <boxGeometry args={[40, 10, 1]} />
             <meshStandardMaterial color="#020617" roughness={0.9} />
           </mesh>
           {[-15, -10, -5, 0, 5, 10, 15].map(z => (
             <group key={`beam-side-${z}`} position={[z, 5, i === 0 ? 0.6 : -0.6]}>
               <mesh castShadow receiveShadow>
                 <boxGeometry args={[0.5, 10, 0.5]} />
                 <meshStandardMaterial color="#0b1120" metalness={0.6} roughness={0.4} />
               </mesh>
               <mesh position={[0, 0, i === 0 ? 0.26 : -0.26]}>
                 <planeGeometry args={[0.1, 10]} />
                 <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} toneMapped={false} />
               </mesh>
             </group>
           ))}
        </group>
      ))}

      {/* Dynamic spatial particle dust adapting mathematically alongside system energy progress scales natively */}
      <Sparkles count={40 + (80 * progress)} scale={25} size={1} speed={0.05 + (0.15 * progress)} opacity={0.02 + (0.08 * progress)} color="#0ea5e9" position={[0, 2, 0]} />

      {INTERACTIVE_OBJECTS.map((obj) => {
        const isVisited = visitedNodes && visitedNodes.includes(obj.id);
        const nextNode = INTERACTIVE_OBJECTS.find(o => !visitedNodes?.includes(o.id));
        const isNext = nextNode && nextNode.id === obj.id;

        return (
          <group key={obj.id}>
            {/* Architectural Spotlights securely rendering dynamic Drop-Shadows matching geometry grids flawlessly */}
            <spotLight 
              position={[obj.position.x, obj.position.y + 4, obj.position.z]} 
              angle={0.7}
              penumbra={0.4}
              intensity={isVisited ? 1.0 : (activeObjectId === obj.id ? 5 : 2.5)} 
              distance={8}
              color={isVisited ? "#1e293b" : (obj.type === 'core' ? '#0ea5e9' : '#8b5cf6')} 
              castShadow
            />
            {activeObjectId === obj.id && (
              <Sparkles count={25} scale={2} size={1.5} speed={0.4} opacity={0.3} color={obj.type === 'core' ? '#0ea5e9' : '#8b5cf6'} position={[obj.position.x, obj.position.y + 1, obj.position.z]} />
            )}
            <InteractiveNode 
              object={obj} 
              isActive={activeObjectId === obj.id} 
              isVisited={isVisited}
              isNext={isNext}
              progress={progress}
            />
          </group>
        );
      })}
    </>
  );
}
