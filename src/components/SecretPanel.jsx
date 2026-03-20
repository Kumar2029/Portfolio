import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function SecretPanel({ onClose }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }} 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-5xl max-h-[85vh] bg-[#0c0516]/95 border border-purple-500/50 backdrop-blur-2xl p-8 md:p-14 rounded-3xl shadow-[0_0_80px_rgba(76,29,149,0.3)] overflow-y-auto font-mono text-slate-200"
    >
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-purple-900/50 pb-6 mb-8 gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl text-purple-400 font-black tracking-widest uppercase drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            Behind the System
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-amber-500/80 tracking-[0.4em] text-xs md:text-sm mt-3 font-bold drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]"
          >
            ! THIS LAYER WAS NOT MEANT TO BE ACCESSED
          </motion.p>
        </div>
        <button onClick={onClose} className="px-6 py-3 border border-purple-500/50 hover:bg-purple-500/20 text-purple-300 text-xs md:text-sm font-bold tracking-widest transition-colors w-full md:w-auto shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          RETURN TO REALITY
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="space-y-6">
          <div className="border-l-2 border-purple-500 pl-5">
            <h2 className="text-xl text-white tracking-[0.3em] font-bold mb-4 opacity-90">THE PHILOSOPHY</h2>
            <p className="text-sm md:text-base leading-relaxed text-slate-400 mb-6 font-sans">
              True development isn't just about rendering nodes; it's about building systems that breathe. I approach architecture with a fundamental belief: complexity should be handled under the hood, leaving the interface elegant, responsive, and shockingly immersive.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-slate-400 font-sans">
              I don't just write code to meet specifications. I craft highly mathematical physics, tightly coupled procedural algorithms, and deep aesthetic atmospheres to ensure that every sequence feels intentional.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }} className="space-y-8">
          <div>
            <h3 className="text-purple-300 text-xs tracking-[0.3em] mb-3 opacity-80 uppercase font-bold">What makes my workflow different?</h3>
            <div className="flex flex-col gap-4">
               <div className="bg-purple-950/20 border border-purple-900/50 p-4 rounded-lg">
                  <h4 className="text-amber-400 text-sm tracking-widest mb-1 shadow-sm">PURE INTENTIONALITY</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">Every lighting multiplier, every audio spark frequency, and every physics lerp is explicitly calculated natively without bloated dependencies.</p>
               </div>
               <div className="bg-purple-950/20 border border-purple-900/50 p-4 rounded-lg">
                  <h4 className="text-amber-400 text-sm tracking-widest mb-1 shadow-sm">ARCHITECTURAL RIGIDITY</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">I prioritize pure clean architectures cleanly handling asynchronous limits and React AST constraints securely preventing infinite re-renders dynamically.</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
