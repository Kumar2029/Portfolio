import PlayerController from './PlayerController';

export default function Scene() {
  return (
    <>
      {/* 1. RESTORED CONTROLS - Re-enabled WASD + PointerLock natively mapping start positions properly */}
      <PlayerController startPosition={[0, 1.8, 5]} />

      {/* 2. ADD BASIC LIGHTING (NON-NEGOTIABLE) */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Point Light near main object */}
      <pointLight position={[0, 2, 0]} intensity={2} color="cyan" />

      {/* 3. FIX GROUND VISIBILITY */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0f172a" roughness={1} />
      </mesh>

      {/* 4. REBUILD NODE (TEST OBJECT) */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial 
          color="cyan" 
          emissive="cyan" 
          emissiveIntensity={2} 
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
