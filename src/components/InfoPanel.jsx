// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { X, Code, Terminal, Zap } from 'lucide-react';

export default function InfoPanel({ node, onClose }) {
  if (!node) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-2xl bg-slate-900/60 backdrop-blur-3xl border border-cyan-500/20 rounded-2xl p-8 shadow-[0_0_80px_rgba(0,255,255,0.07)] overflow-hidden text-slate-200"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors bg-slate-800/40 hover:bg-slate-700/60 p-2 rounded-full cursor-pointer pointer-events-auto z-50 border border-slate-700/50"
      >
        <X size={20} />
      </button>

      {/* Decorative Glow Elements */}
      <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <Terminal className="text-cyan-400" size={20} />
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]">{node.type} DIRECTORY</h2>
        </div>
        
        <h1 className="text-4xl font-black text-white mb-6 tracking-tight">
          {node.name}
        </h1>

        <p className="text-lg text-slate-300 leading-relaxed mb-8 border-l-2 border-cyan-500/50 pl-5 bg-linear-to-r from-cyan-950/20 to-transparent py-2">
          {node.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 pt-6 border-t border-slate-700/50">
          {/* Tech Stack */}
          <section>
            <h3 className="flex items-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
              <Code className="mr-2 text-purple-400" size={16} /> Config & Specs
            </h3>
            <div className="flex flex-wrap gap-2">
              {node.tech.map((t, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-slate-800/60 border border-slate-700/80 text-cyan-100 text-sm rounded-lg font-mono">
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h3 className="flex items-center text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
              <Zap className="mr-2 text-amber-400" size={16} /> Diagnostics
            </h3>
            <ul className="space-y-2.5">
              {node.features.map((f, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-300 font-medium">
                  <span className="text-cyan-500 mr-2 opacity-80 mt-0.5">▹</span> {f}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
