// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function DeveloperProfile({ onClose }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }} 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[90%] max-w-4xl max-h-[85vh] bg-slate-950/90 border border-amber-500/50 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-y-auto font-mono text-slate-200"
    >
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-amber-900/50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl text-amber-400 font-black tracking-widest uppercase drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">System Master</h1>
          <p className="text-amber-200/60 tracking-[0.3em] text-xs md:text-sm mt-3">IDENTITY VERIFIED &gt; FULL STACK ARCHITECT</p>
        </div>
        <button onClick={onClose} className="px-6 py-3 border border-amber-500/50 hover:bg-amber-500/20 text-amber-400 text-xs md:text-sm font-bold tracking-widest transition-colors w-full md:w-auto">
          TERMINATE SESSION
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="border-l-2 border-amber-500 pl-4">
            <h2 className="text-lg text-white tracking-widest mb-3 opacity-90">SYSTEM DIRECTIVES</h2>
            <p className="text-sm leading-loose text-slate-400 mb-4">
              All peripheral modules successfully booted. The Developer System is online. I specialize in highly scalable, performant architectural nodes securely bridging complex data structures flawlessly.
            </p>
            <p className="text-sm leading-loose text-slate-400">
              Current computational vectors: Advanced web deployment hooks, real-time 3D simulation mappings natively pushing post-processing limits, and deep structural React foundations smoothly bypassing generic application bounds.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-amber-300 text-xs tracking-widest mb-3 opacity-80 uppercase">Primary Stack Sequence</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Three.js', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'TypeScript', 'Docker'].map(t => (
                <span key={t} className="px-3 py-1.5 bg-amber-950/40 border border-amber-800/80 rounded text-[10px] md:text-xs text-amber-200 tracking-wider">[{t}]</span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-amber-300 text-xs tracking-widest mb-3 opacity-80 uppercase">System Status Log</h3>
            <div className="font-mono text-xs md:text-[13px] leading-relaxed text-emerald-400 bg-emerald-950/30 p-5 border border-emerald-900/50 rounded shadow-inner">
              <p className="mb-2">&gt; All Interface Nodes Active.</p>
              <p className="mb-2">&gt; Memory Array Allocation: Nominal.</p>
              <p className="mb-2">&gt; Security Overrides: Denied/Restored.</p>
              <p>&gt; Awaiting Further Directives...</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
