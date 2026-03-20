import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, Glitch } from '@react-three/postprocessing';
import PlayerController from './components/PlayerController';
import Environment from './components/Environment';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import InfoPanel from './components/InfoPanel';
import DeveloperProfile from './components/DeveloperProfile';
import SecretPanel from './components/SecretPanel';
import { INTERACTIVE_OBJECTS } from './config/InteractiveObjects';
import { AudioEngine } from './utils/AudioEngine';

export default function App() {
  const [activeObject, setActiveObject] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [appState, setAppState] = useState('INTRO'); // INTRO, AUTOFOCUS, EXPLORE, INTERACT, EXITING
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [accessDenied, setAccessDenied] = useState(false);
  
  // Gamification & Objective Mechanics natively
  const [lastActivationTime, setLastActivationTime] = useState(0);
  const [comboText, setComboText] = useState('');
  const [completed, setCompleted] = useState(false);
  const [secretMode, setSecretMode] = useState(false);
  
  // Refs enforcing closure validity inside the native event listener optimally
  const visitedNodesRef = useRef(visitedNodes);
  useEffect(() => { visitedNodesRef.current = visitedNodes; }, [visitedNodes]);
  const lastActivationRef = useRef(lastActivationTime);
  useEffect(() => { lastActivationRef.current = lastActivationTime; }, [lastActivationTime]);
  const completedRef = useRef(completed);
  useEffect(() => { completedRef.current = completed; }, [completed]);
  
  // System Personality Tracks
  const [systemMode, setSystemMode] = useState('standard');
  const [systemDialogue, setSystemDialogue] = useState('AWAITING INPUT...');
  const [displayedDialogue, setDisplayedDialogue] = useState('');
  const [systemPhase, setSystemPhase] = useState(0);

  // Native Typewriter Effect Engine securely tracking `systemDialogue` hooks organically
  useEffect(() => {
    let index = 0;
    setDisplayedDialogue('');
    if (!systemDialogue) return;
    
    const typewriter = setInterval(() => {
      setDisplayedDialogue((prev) => prev + systemDialogue.charAt(index));
      index++;
      if (index >= systemDialogue.length) clearInterval(typewriter);
    }, 30);
    return () => clearInterval(typewriter);
  }, [systemDialogue]);

  // Pure Math Native Progress Parsing securely
  const nonCoreIds = INTERACTIVE_OBJECTS.filter(o => o.type !== 'core').map(o => o.id);
  const visitedNonCore = visitedNodes.filter(id => nonCoreIds.includes(id)).length;
  const progress = visitedNonCore / nonCoreIds.length;
  
  // Cinematic Flow Timers
  useEffect(() => {
    if (appState === 'AUTOFOCUS') {
      const timer = setTimeout(() => {
        setAppState('EXPLORE');
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (appState === 'OVERRIDE_SEQUENCE') {
      setSystemPhase(1);
      setSystemMode('override');
      setSystemDialogue('Unauthorized Access Detected...');
      AudioEngine.playGlitch();
      
      const t1 = setTimeout(() => {
        setSystemPhase(2);
        setSystemDialogue('Attempting Containment...');
        AudioEngine.playGlitch();
      }, 1000);
      
      const t2 = setTimeout(() => {
        setSystemPhase(3);
        setSystemDialogue('System Integrity Failing...');
        AudioEngine.playBassPulse();
      }, 2500);
      
      const t3 = setTimeout(() => {
        setSystemPhase(4);
        setSystemDialogue('Override Denied. System Restored.');
        AudioEngine.playStabilize();
      }, 3500);
      
      const t4 = setTimeout(() => {
        setSystemMode('recovery');
        setAppState('EXPLORE');
        setSystemPhase(0);
      }, 4500);
      
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
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
      
      // Easter Egg Hook isolating native completions!
      if (e.key.toLowerCase() === 'h' && completedRef.current && appStateRef.current === 'EXPLORE') {
         setAppState('SECRET_TRANSITION');
         setSystemDialogue('Hidden Layer Detected...');
         AudioEngine.playGlitch();
         
         if (document.pointerLockElement) {
            document.exitPointerLock();
         }

         setTimeout(() => {
            setSystemDialogue('Accessing Developer Core...');
            AudioEngine.playGlitch();
         }, 1500);

         setTimeout(() => {
            setSecretMode(true);
            setAppState('SECRET_PANEL');
            AudioEngine.playBassPulse();
         }, 3000);
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
            
            // Native Interactive Objective Gameplay Mechanics cleanly parsing logic!
            if (currentActive.type !== 'core' && !visitedNodesRef.current.includes(currentActive.id)) {
                const now = Date.now();
                if (lastActivationRef.current > 0 && (now - lastActivationRef.current < 8000)) {
                    setComboText('+FAST SYNC BONUS!');
                    setTimeout(() => setComboText(''), 2500);
                } else {
                    setComboText('+MODULE ACTIVATED');
                    setTimeout(() => setComboText(''), 2000);
                }
                setLastActivationTime(now);
            }
            if (currentActive.type === 'core' && !completedRef.current) setCompleted(true);
            
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
            systemMode={systemMode}
            systemPhase={systemPhase}
            completed={completed}
            secretMode={secretMode}
          />
          
          {/* Map Navigational Controller securely tracking App States */}
          <PlayerController 
            isHovering={!!activeObject && !isInteracting} 
            appState={appState}
            selectedObject={selectedObject}
            startPosition={[0, 1.8, 0]} 
            systemPhase={systemPhase}
          />

          {/* Post Processing Signature Overhaul */}
          <EffectComposer>
            <Glitch 
               active={appState === 'OVERRIDE_SEQUENCE' && systemPhase < 3} 
               delay={[0.1, 0.3]} 
               duration={[0.1, 0.4]} 
               strength={[0.1, 0.3]} 
            />
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
            exit={{ opacity: 0, transition: { duration: 1.0 } }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950 backdrop-blur-md"
          >
            <div className="max-w-md w-full p-8 border border-cyan-500/30 bg-slate-900/80 rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.1)] flex flex-col font-mono">
               <motion.h1 
                 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                 className="text-cyan-400 font-bold tracking-widest uppercase mb-2 text-xl"
               >
                 SYSTEM INITIALIZED...
               </motion.h1>
               <motion.p 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                 className="text-cyan-200 text-xs tracking-widest mb-8 opacity-70"
               >
                 USER DETECTED.
               </motion.p>
               
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="flex flex-col gap-3">
                 <p className="text-white text-xs tracking-[0.2em] mb-2 opacity-50 uppercase">Select Access Mode:</p>
                 <button onClick={() => { AudioEngine.playPing(); setSystemMode('projects'); setSystemDialogue('Project modules unlocked.'); setAppState('AUTOFOCUS'); }} className="text-left px-5 py-3 border border-slate-700 hover:border-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300 transition-all text-slate-300 tracking-widest text-xs uppercase group">
                    <span className="opacity-50 group-hover:opacity-100 mr-3">[1]</span> Explore Projects
                 </button>
                 <button onClick={() => { AudioEngine.playPing(); setSystemMode('capabilities'); setSystemDialogue('Capabilities loading...'); setAppState('AUTOFOCUS'); }} className="text-left px-5 py-3 border border-slate-700 hover:border-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-300 transition-all text-slate-300 tracking-widest text-xs uppercase group">
                    <span className="opacity-50 group-hover:opacity-100 mr-3">[2]</span> View Capabilities
                 </button>
                 <button onClick={() => { AudioEngine.playPing(); setSystemMode('override'); setSystemDialogue('UNAUTHORIZED ACCESS DETECTED...'); setAppState('OVERRIDE_SEQUENCE'); }} className="mt-2 text-left px-5 py-3 border border-slate-700 hover:border-red-500 hover:bg-red-950/50 hover:text-red-400 transition-all text-slate-500 tracking-widest text-xs uppercase hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] group">
                    <span className="opacity-50 group-hover:opacity-100 mr-3 text-red-500">[!]</span> Override System
                 </button>
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

      {/* Objective & Progression HUD completely mapped natively */}
      {appState !== 'INTRO' && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-1000 w-[90%] max-w-md">
           <div className={`bg-slate-950/80 border ${completed ? 'border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-slate-700/80 shadow-[0_0_20px_rgba(0,255,255,0.05)]'} backdrop-blur-md p-4 rounded-xl flex flex-col shadow-xl transition-all duration-700`}>
             <div className="flex justify-between items-end mb-3">
                 <div>
                     <p className={`font-mono text-[10px] tracking-[0.2em] uppercase ${completed ? 'text-amber-500' : 'text-slate-400'}`}>
                         System Status: {completed ? 'ONLINE' : 'INCOMPLETE'}
                     </p>
                     <p className={`font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase mt-1 ${completed ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]' : 'text-cyan-400 drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]'}`}>
                        {progress === 1 ? (completed ? "DEVELOPER IDENTITY SECURED" : "CORE ACCESS GRANTED") : "INITIALIZE ALL MODULES"}
                     </p>
                 </div>
                 <p className="font-mono text-lg font-black tracking-widest text-white">{Math.round(progress * 100)}%</p>
             </div>
             <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                 <motion.div 
                     className={`absolute top-0 left-0 h-full ${completed ? 'bg-amber-400' : 'bg-cyan-400'}`}
                     initial={{ width: 0 }}
                     animate={{ width: `${progress * 100}%` }}
                     transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                 />
             </div>
             
             {/* Fast Sync Bonus Float Tracker */}
             <AnimatePresence>
                {comboText && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.8 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, scale: 1.1 }} 
                        className="absolute -bottom-11 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                        <p className="text-[10px] md:text-xs font-mono font-bold text-amber-400 tracking-[0.2em] md:tracking-[0.3em] pl-4 pr-3 py-1.5 bg-amber-950/90 border border-amber-500/50 rounded-full drop-shadow-[0_0_10px_rgba(245,158,11,0.7)] uppercase">
                            {comboText}
                        </p>
                    </motion.div>
                )}
             </AnimatePresence>
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

      {/* Dynamic Native System Dialogue UI HUD Tracker */}
      {appState !== 'INTRO' && (
        <div className="absolute bottom-8 left-8 z-20 pointer-events-none opacity-90 mix-blend-screen transition-all duration-500">
           <div className={`border-l-2 pl-4 py-1 ${systemMode === 'override' ? 'border-red-500' : 'border-cyan-500'}`}>
             <p className={`font-mono text-[10px] md:text-sm tracking-widest uppercase ${systemMode === 'override' ? 'text-red-400 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]' : 'text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]'}`}>
               &gt; {displayedDialogue}
               <span className="w-2 h-3 ml-1 bg-current inline-block animate-pulse align-middle" />
             </p>
           </div>
        </div>
      )}

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
              {selectedObject.type === 'core' ? (
                 <DeveloperProfile key="devprofile" onClose={closeModal} />
              ) : (
                 <InfoPanel key="infopanel" node={selectedObject} onClose={closeModal} />
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
      {/* Secret Layer Architectural Override */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <AnimatePresence>
          {appState === 'SECRET_PANEL' && (
            <div className="pointer-events-auto w-full h-full flex items-center justify-center p-4">
              <SecretPanel onClose={() => { 
                  AudioEngine.playPing(); 
                  setAppState('EXITING'); 
                  setTimeout(() => { 
                      setAppState('EXPLORE'); 
                      if (!document.pointerLockElement) document.body.requestPointerLock?.(); 
                  }, 1200); 
              }} />
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
