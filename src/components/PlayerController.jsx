import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboard } from '../hooks/useKeyboard';

const SPEED = 5;
const PLAYER_HEIGHT = 1.8;

export default function PlayerController({ isHovering, appState, selectedObject, startPosition = [0, 1.8, 0] }) {
  const { camera } = useThree();
  const movement = useKeyboard();
  
  const velocity = useRef(new THREE.Vector3());
  const forwardVector = useRef(new THREE.Vector3());
  const rightVector = useRef(new THREE.Vector3());
  const initialized = useRef(false);

  // Snapshot position before interacting
  const preInteractPosition = useRef(new THREE.Vector3());
  const preInteractQuaternion = useRef(new THREE.Quaternion());

  useEffect(() => {
    if (!initialized.current) {
      camera.position.set(...startPosition);
      initialized.current = true;
    }
  }, [camera, startPosition]);

  useFrame((state, delta) => {
    // 1. STATE: INTRO (Completely frozen cinematic wait)
    if (appState === 'INTRO') return;
    
    // 2. STATE: AUTOFOCUS (Lerp camera aggressively towards the Skill Core initially)
    if (appState === 'AUTOFOCUS') {
      const coreTarget = new THREE.Vector3(0, 1.8, -2.5);
      camera.position.lerp(coreTarget, delta * 1.5);
      
      const lookTarget = new THREE.Vector3(0, 1.8, -5);
      const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(camera.position, lookTarget, camera.up)
      );
      camera.quaternion.slerp(targetQuaternion, delta * 2);
      return;
    }

    // 3. STATE: INTERACT (Cinematic zooming lookAt onto selectedObject securely isolating WASD)
    if (appState === 'INTERACT' && selectedObject) {
      // Calculate a cinematic offset mapping directly in front of the target
      const offsetDirection = (selectedObject.position.z > camera.position.z) ? -2.2 : 2.2;
      const offsetPos = new THREE.Vector3(
        selectedObject.position.x, 
        selectedObject.position.y + 0.2, 
        selectedObject.position.z + offsetDirection
      );
      
      camera.position.lerp(offsetPos, delta * 3);
      
      const targetLook = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(camera.position, selectedObject.position, camera.up)
      );
      camera.quaternion.slerp(targetLook, delta * 4);
      return; // Forcefully halt standard loops securely!
    }

    // 4. STATE: EXITING (Smooth cinematic rollback to preInteractPosition)
    if (appState === 'EXITING') {
      camera.position.lerp(preInteractPosition.current, delta * 3);
      camera.quaternion.slerp(preInteractQuaternion.current, delta * 4);
      return;
    }
    
    // 5. STATE: EXPLORE (Standard FPS Loop)
    
    // Log previous positions seamlessly in real-time catching the moment before interaction fires
    preInteractPosition.current.copy(camera.position);
    preInteractQuaternion.current.copy(camera.quaternion);

    // Zoom FOV inward linearly when targeting to prompt the user to fire
    const targetFov = isHovering ? 65 : 75;
    if (Math.abs(camera.fov - targetFov) > 0.1) {
      // eslint-disable-next-line react-hooks/immutability
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 4);
      camera.updateProjectionMatrix();
    }
    
    // Smooth deceleration dynamically building immersion securely!
    const currentSpeed = isHovering ? SPEED * 0.35 : SPEED;

    const currentKeys = movement.current;
    const moveForward = (currentKeys['w'] ? 1 : 0) - (currentKeys['s'] ? 1 : 0);
    const moveRight = (currentKeys['d'] ? 1 : 0) - (currentKeys['a'] ? 1 : 0);

    camera.getWorldDirection(forwardVector.current);
    forwardVector.current.y = 0;
    forwardVector.current.normalize();

    rightVector.current.crossVectors(forwardVector.current, camera.up).normalize();

    velocity.current.set(0, 0, 0);
    velocity.current.addScaledVector(forwardVector.current, moveForward * currentSpeed * delta);
    velocity.current.addScaledVector(rightVector.current, moveRight * currentSpeed * delta);
    
    camera.position.add(velocity.current);
    
    // Evaluate explicit state checking natively determining kinetic output cleanly organically
    const isMoving = moveForward !== 0 || moveRight !== 0;

    let targetY = PLAYER_HEIGHT;
    if (isMoving) {
        // Subtle walking head-bob tracking physical traversal
        targetY += Math.sin(state.clock.elapsedTime * 6) * 0.04;
    } else {
        // Elegant micro-drifting idle breath preventing stale visuals cleanly
        targetY += Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
    }

    camera.position.setY(targetY);
  });

  return <PointerLockControls />;
}
