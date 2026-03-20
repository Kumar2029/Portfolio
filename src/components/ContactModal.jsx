import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { X, Terminal, Mail, Github, Linkedin, Copy, Check } from 'lucide-react';

export default function ContactModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('developer@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md pointer-events-auto z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg bg-slate-950 text-green-500 font-mono border border-green-500/30 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.15)] overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-green-500/30">
          <div className="flex items-center text-slate-400 text-sm">
            <Terminal size={14} className="mr-2" />
            <span>contact_terminal.exe</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-red-400 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-green-600 mb-1">Last login: {new Date().toUTCString()}</p>
            <p className="mb-4">root@dev-portfolio:~$ ./connect --init</p>
            <p className="text-green-400">Initializing secure connection protocols...</p>
            <p className="text-green-400">Identity verifiable. Select an endpoint below:</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between group p-3 border border-green-900 hover:border-green-500 hover:bg-green-950/30 transition-all rounded">
              <div className="flex items-center">
                <Mail className="mr-4 text-green-600 group-hover:text-green-400" size={24} />
                <span className="text-green-200">developer@example.com</span>
              </div>
              <button 
                onClick={copyEmail}
                className="text-green-600 hover:text-green-300 transition-colors p-2"
                title="Copy Email"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>

            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center p-3 border border-green-900 hover:border-green-500 hover:bg-green-950/30 transition-all rounded group"
            >
              <Github className="mr-4 text-green-600 group-hover:text-green-400" size={24} />
              <span className="text-green-200">github.com/developer</span>
            </a>

            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center p-3 border border-green-900 hover:border-green-500 hover:bg-green-950/30 transition-all rounded group"
            >
              <Linkedin className="mr-4 text-green-600 group-hover:text-green-400" size={24} />
              <span className="text-green-200">linkedin.com/in/developer</span>
            </a>
          </div>

          <div className="mt-6 flex">
            <span className="text-green-400 mr-2">root@dev-portfolio:~$</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
