import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Grid, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveNode from './InteractiveNode';
import { INTERACTIVE_OBJECTS } from '../config/InteractiveObjects';

export default function Environment({ setActiveObject, activeObjectId, visitedNodes = [], appState, progress = 0, systemMode = 'standard', systemPhase = 0, completed = false, secretMode = false }) {
  const { camera } = useThree();
  const previousNearestId = useRef(null);
  
  const ambientLightRef = useRef(null);
  const directionalLightRef = useRef(null);

  const isOverride = systemMode === 'override';
  const cPrimary = isOverride ? '#ef4444' : '#0ea5e9';
  const cSecondary = isOverride ? '#991b1b' : '#38bdf8';

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

    if (ambientLightRef.current && directionalLightRef.current) {
      let targetAmbient = 0.15 + (0.2 * progress);
      let targetDirectional = 0.2 + (0.4 * progress);
      
      if (appState === 'INTERACT') {
         targetAmbient = 0.15;
         targetDirectional = 0.2;
      }
      
      if (appState === 'OVERRIDE_SEQUENCE') {
         if (systemPhase === 1) {
             targetAmbient = 0.05;
             targetDirectional = 0.05;
         } else if (systemPhase === 2) {
             targetAmbient = Math.sin(state.clock.elapsedTime * 20) > 0 ? 0.3 : 0.05;
             targetDirectional = Math.sin(state.clock.elapsedTime * 15) > 0 ? 0.4 : 0.05;
         } else if (systemPhase === 3) {
             targetAmbient = 0.0;
             targetDirectional = 0.0;
         }
      }

      ambientLightRef.current.intensity = THREE.MathUtils.lerp(ambientLightRef.current.intensity, targetAmbient, delta * 3);
      directionalLightRef.current.intensity = THREE.MathUtils.lerp(directionalLightRef.current.intensity, targetDirectional, delta * 3);
    }
  });

  return (
    <>
      <fog attach="fog" args={[isOverride ? '#450a0a' : '#020617', 5, 25]} />
      <ambientLight ref={ambientLightRef} intensity={0.2} color={isOverride ? '#ef4444' : '#ffffff'} />
      <directionalLight ref={directionalLightRef} position={[5, 10, 5]} intensity={0.2} castShadow color={isOverride ? '#ef4444' : '#ffffff'} />
      
      {/* Dynamic Responsive Grid rendering exact Choice Colors dynamically overriding native matrices! */}
      <Grid 
        position={[0, 0, 0]} 
        args={[80, 80]} 
        cellSize={1} 
        cellThickness={0.8} 
        cellColor={secretMode ? "#d97706" : cPrimary} 
        sectionSize={5} 
        sectionThickness={1.2} 
        sectionColor={secretMode ? "#4c1d95" : cSecondary} 
        fadeDistance={isOverride ? 15 : 25} 
        fadeStrength={isOverride ? 5 : 2}
      />

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
          color={isOverride ? "#200000" : "#020617"}
        />
      </mesh>
      
      {[-20, 20].map((z, i) => (
        <group key={`back-${i}`} position={[0, 0, z]}>
           <mesh position={[0, 5, 0]} receiveShadow>
             <boxGeometry args={[40, 10, 1]} />
             <meshStandardMaterial color={isOverride ? "#200000" : "#020617"} roughness={0.9} />
           </mesh>
           {[-15, -10, -5, 0, 5, 10, 15].map(x => (
             <group key={`beam-${x}`} position={[x, 5, i === 0 ? 0.6 : -0.6]}>
               <mesh castShadow receiveShadow>
                 <boxGeometry args={[0.5, 10, 0.5]} />
                 <meshStandardMaterial color={isOverride ? "#450a0a" : "#0b1120"} metalness={0.6} roughness={0.4} />
               </mesh>
               <mesh position={[0, 0, i === 0 ? 0.26 : -0.26]}>
                 <planeGeometry args={[0.1, 10]} />
                 <meshBasicMaterial color={cPrimary} transparent opacity={0.3} toneMapped={false} />
               </mesh>
             </group>
           ))}
        </group>
      ))}

      {[-20, 20].map((x, i) => (
        <group key={`side-${i}`} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
           <mesh position={[0, 5, 0]} receiveShadow>
             <boxGeometry args={[40, 10, 1]} />
             <meshStandardMaterial color={isOverride ? "#200000" : "#020617"} roughness={0.9} />
           </mesh>
           {[-15, -10, -5, 0, 5, 10, 15].map(z => (
             <group key={`beam-side-${z}`} position={[z, 5, i === 0 ? 0.6 : -0.6]}>
               <mesh castShadow receiveShadow>
                 <boxGeometry args={[0.5, 10, 0.5]} />
                 <meshStandardMaterial color={isOverride ? "#450a0a" : "#0b1120"} metalness={0.6} roughness={0.4} />
               </mesh>
               <mesh position={[0, 0, i === 0 ? 0.26 : -0.26]}>
                 <planeGeometry args={[0.1, 10]} />
                 <meshBasicMaterial color={cPrimary} transparent opacity={0.3} toneMapped={false} />
               </mesh>
             </group>
           ))}
        </group>
      ))}

      {/* Atmospheric Glitch tracking tracking extreme speeds overriding standard particles cleanly */}
      <Sparkles count={40 + (80 * progress)} scale={25} size={isOverride ? 4 : 1} speed={isOverride ? 1.5 : (0.05 + (0.15 * progress))} opacity={isOverride ? 0.3 : (0.02 + (0.08 * progress))} color={isOverride ? "#ef4444" : "#0ea5e9"} position={[0, 2, 0]} />

      {INTERACTIVE_OBJECTS.map((obj, i) => {
        const isVisited = visitedNodes && visitedNodes.includes(obj.id);
        const nextNode = INTERACTIVE_OBJECTS.find(o => !visitedNodes?.includes(o.id));
        const isNext = nextNode && nextNode.id === obj.id;
        
        // Exact mathematical intensity calculation drawing branching limits explicitly per wing!
        let modeIntensityMult = 1.0;
        if (systemMode === 'projects' && obj.zone !== 'Left Wing' && obj.zone !== 'Right Wing') modeIntensityMult = 0.15;
        if (systemMode === 'capabilities' && obj.zone !== 'Center Lock') modeIntensityMult = 0.15;
        
        if (appState === 'OVERRIDE_SEQUENCE') {
            if (systemPhase === 1) modeIntensityMult = 0.8;
            else if (systemPhase === 2) modeIntensityMult = i % 2 === 0 ? 1.5 : 0.2;
            else if (systemPhase === 3) modeIntensityMult = obj.type === 'core' ? 10.0 : 0.0;
            else if (systemPhase === 4) modeIntensityMult = obj.type === 'core' ? 2.0 : 1.0;
        }

        if (systemMode === 'recovery' && obj.type === 'core') modeIntensityMult = 2.0;
        if (completed && obj.type === 'core') modeIntensityMult = 3.0; // Extreme Final Boost directly

        const baseSpotlightColor = secretMode ? "#d97706" : (obj.type === 'core' ? '#0ea5e9' : '#8b5cf6');
        const finalVisitedColor = secretMode ? "#451a03" : "#0f172a"; // Deep pure mute to avoid ambient glow mapping safely
        
        const spotColor = (appState === 'OVERRIDE_SEQUENCE' && systemPhase === 2) ? (i % 2 === 0 ? '#ef4444' : baseSpotlightColor) : (isVisited ? finalVisitedColor : baseSpotlightColor);
        
        const finalIntensity = (isVisited ? 1.0 : (activeObjectId === obj.id ? 5 : 2.5)) * modeIntensityMult;

        return (
          <group key={obj.id}>
            <spotLight 
              position={[obj.position.x, obj.position.y + 4, obj.position.z]} 
              angle={0.7}
              penumbra={0.4}
              intensity={finalIntensity} 
              distance={8}
              color={spotColor} 
              castShadow
            />
            {activeObjectId === obj.id && (
              <Sparkles count={25} scale={2} size={1.5} speed={0.4} opacity={0.3} color={spotColor} position={[obj.position.x, obj.position.y + 1, obj.position.z]} />
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
