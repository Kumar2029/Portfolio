import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import PlayerController from './components/PlayerController';
import Environment from './components/Environment';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import InfoPanel from './components/InfoPanel';
import { INTERACTIVE_OBJECTS } from './config/InteractiveObjects';
import { AudioEngine } from './utils/AudioEngine';

export default function App() {
  const [activeObject, setActiveObject] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [appState, setAppState] = useState('INTRO'); // INTRO, AUTOFOCUS, EXPLORE, INTERACT, EXITING
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [accessDenied, setAccessDenied] = useState(false);

  // Pure Math Native Progress Parsing securely
  const nonCoreIds = INTERACTIVE_OBJECTS.filter(o => o.type !== 'core').map(o => o.id);
  const visitedNonCore = visitedNodes.filter(id => nonCoreIds.includes(id)).length;
  const progress = visitedNonCore / nonCoreIds.length;
  
  // Cinematic Flow Timers
  useEffect(() => {
    if (appState === 'INTRO') {
      const timer = setTimeout(() => setAppState('AUTOFOCUS'), 3500);
      return () => clearTimeout(timer);
    }
    if (appState === 'AUTOFOCUS') {
      const timer = setTimeout(() => {
        setAppState('EXPLORE');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const appStateRef = useRef(appState);
  useEffect(() => { appStateRef.current = appState; }, [appState]);

  const activeObjRef = useRef(null);
  useEffect(() => { activeObjRef.current = activeObject; }, [activeObject]);

  const closeModal = () => {
    setSelectedObject(null);
    setAppState('EXITING');
    
    // Explicitly restore pointer lock natively dropping the player back into the world seamlessly
    setTimeout(() => {
      setAppState('EXPLORE');
      if (!document.pointerLockElement) {
        document.body.requestPointerLock?.();
      }
    }, 1200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      
      // Close overlay cleanly with Escape
      if (e.key === 'Escape' && appStateRef.current === 'INTERACT') {
        closeModal();
        return;
      }
      
      if (e.key.toLowerCase() === 'e') {
        const currentActive = activeObjRef.current;
        // Block interaction if we are not in EXPLORE mode natively scanning
        if (currentActive && !isInteracting && appStateRef.current === 'EXPLORE') {
          // Check Core Progression Lock
          if (currentActive.type === 'core' && progress < 1) {
            AudioEngine.playDeny();
            setAccessDenied(true);
            setTimeout(() => setAccessDenied(false), 2000);
            return;
          }

          setIsInteracting(true);
          AudioEngine.playPing();
          
          setTimeout(() => {
            setIsInteracting(false);
            setSelectedObject(currentActive);
            setAppState('INTERACT');
            setVisitedNodes(prev => (prev.includes(currentActive.id) ? prev : [...prev, currentActive.id]));
            
            if (document.pointerLockElement) {
              document.exitPointerLock();
            }
          }, 350); // Feedback flash delay
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Boot up the procedural ambient hum specifically upon explicit user browser activity resolving Web Audio policies
    const triggerAudio = () => { AudioEngine.playAmbient(); window.removeEventListener('click', triggerAudio); };
    window.addEventListener('click', triggerAudio);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInteracting, progress]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 font-sans text-slate-200">
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <Canvas shadows camera={{ position: [0, 1.8, 5], fov: 75 }}>
          <color attach="background" args={['#080c16']} />
          
          {/* Complete Interactive Universe Network passing Visited metrics */}
          <Environment 
            setActiveObject={setActiveObject} 
            activeObjectId={activeObject?.id} 
            visitedNodes={visitedNodes}
            appState={appState}
            progress={progress}
          />
          
          {/* Map Navigational Controller securely tracking App States */}
          <PlayerController 
            isHovering={!!activeObject && !isInteracting} 
            appState={appState}
            selectedObject={selectedObject}
            startPosition={[0, 1.8, 0]} 
          />

          {/* Post Processing Signature Overhaul */}
          <EffectComposer>
            <DepthOfField 
              target={appState === 'INTERACT' && selectedObject ? selectedObject.position : [0, 1.8, -10]} 
              focalLength={0.4} 
              bokehScale={appState === 'INTERACT' ? 5 : 1.5} 
              height={480} 
            />
            <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 1. INITIAL INTRO OVERLAY */}
      <AnimatePresence>
        {appState === 'INTRO' && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2.0 } }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="text-center flex flex-col items-center">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase mb-10"
              >
                INITIALIZING<br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">DEVELOPER SYSTEM...</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col gap-5 text-slate-300 font-mono text-xs tracking-[0.2em] shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                  <span>Navigation Grid</span>
                  <span className="text-white bg-slate-800 px-3 py-1 rounded border border-slate-700">W A S D</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Engage Terminals</span>
                  <span className="text-cyan-200 bg-cyan-950 px-3 py-1 rounded border border-cyan-800">E</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Background Darken Overlay when interacting */}
      <AnimatePresence>
        {appState === 'INTERACT' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-10 bg-slate-950/60 backdrop-blur-md pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Central Interactive Mission Loop Progression HUD */}
      {appState !== 'INTRO' && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-1000">
           <div className="bg-slate-900/80 border border-slate-700/80 backdrop-blur-md px-8 py-3 rounded-xl flex flex-col items-center shadow-lg shadow-cyan-900/20">
             <p className="text-cyan-400 font-mono text-xs font-bold tracking-[0.25em] uppercase drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]">
                {progress === 0 && "AWAITING INITIALIZATION"}
                {progress > 0 && progress < 1 && "CORE SYSTEMS UNLOCKING"}
                {progress === 1 && "DEVELOPER SYSTEM ACTIVATED"}
             </p>
             <div className="w-full h-1 bg-slate-800 mt-3 rounded overflow-hidden">
                <div className="h-full bg-cyan-500 transition-all duration-1000 shadow-[0_0_10px_rgba(0,255,255,1)]" style={{ width: `${progress * 100}%` }} />
             </div>
           </div>
        </div>
      )}

      {/* Access Denied Glitch Overlay */}
      <AnimatePresence>
        {accessDenied && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center bg-red-950/30 mix-blend-screen"
          >
            <div className="bg-red-950/90 border border-red-500/80 px-10 py-5 rounded shadow-[0_0_40px_rgba(255,0,0,0.4)]">
                <h2 className="text-xl md:text-2xl font-mono font-bold text-red-500 tracking-[0.4em] uppercase drop-shadow-[0_0_15px_rgba(255,0,0,1)] animate-pulse">
                    ACCESS DENIED
                </h2>
                <p className="text-red-400 text-xs font-mono tracking-widest uppercase mt-2 text-center">Initialization Required</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimap / Tracker Backup */}
      {appState !== 'INTRO' && (
        <div className="absolute top-6 right-6 z-20 pointer-events-none transition-opacity duration-1000 opacity-80 hover:opacity-100">
          <div className="bg-slate-900/60 border border-slate-700/50 backdrop-blur-md px-5 py-2.5 rounded-lg flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${visitedNodes.length === INTERACTIVE_OBJECTS.length ? 'bg-green-500' : 'bg-cyan-500 animate-pulse'}`} />
            <p className="text-slate-300 font-mono text-xs font-semibold tracking-widest uppercase">
              {visitedNodes.length} / {INTERACTIVE_OBJECTS.length} Explored
            </p>
          </div>
        </div>
      )}
      
      {/* Target Crosshair */}
      {(appState === 'EXPLORE' || appState === 'AUTOFOCUS') && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <div className={`w-1 h-1 rounded-full transition-all duration-300 ${activeObject && !isInteracting ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,1)] scale-[2]' : 'bg-white/40'}`}></div>
        </div>
      )}

      {/* Visual Feedback on Action triggering deep system loading overlays natively */}
      {isInteracting && activeObject && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center bg-cyan-900/10 mix-blend-screen">
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-cyan-200 tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] animate-pulse">
                Loading System Architecture...
            </h2>
        </div>
      )}

      {/* Dynamic Text Hint HUD Overlay */}
      <AnimatePresence>
        {appState === 'EXPLORE' && !isInteracting && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            {activeObject ? (
              <div className="bg-slate-900/90 border border-cyan-500/50 backdrop-blur-md px-6 py-3 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.2)] scale-105 transition-transform">
                <p className="text-cyan-400 font-mono text-sm font-semibold tracking-[0.15em] flex items-center gap-4">
                  {accessDenied ? (
                    <>
                       <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1 rounded shadow-[0_0_10px_rgba(255,0,0,0.2)]">E</span>
                       <span className="text-red-400 drop-shadow-[0_0_8px_rgba(255,0,0,1)]">SYSTEM LOCKED</span>
                    </>
                  ) : (
                    <>
                       <span className="bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 px-3 py-1 rounded shadow-[0_0_10px_rgba(0,255,255,0.2)]">E</span>
                       MODULE DETECTED: <span className="text-white pl-1">{activeObject.name.toUpperCase()}</span>
                    </>
                  )}
                </p>
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-slate-700/40 backdrop-blur-md px-6 py-2.5 rounded-full opacity-60">
                <p className="text-slate-300 font-mono text-xs tracking-widest uppercase">
                  Move toward a node to explore
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Central InfoPanel Architecture Binding */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <AnimatePresence>
          {appState === 'INTERACT' && selectedObject && (
            <div className="pointer-events-auto w-full h-full flex items-center justify-center p-4">
              <InfoPanel key="infopanel" node={selectedObject} onClose={closeModal} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
