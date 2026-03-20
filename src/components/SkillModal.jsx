import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { X, Layout, Server, Wrench } from 'lucide-react';

const SKILLS = [
  {
    category: 'Frontend',
    icon: <Layout className="text-cyan-400" size={24} />,
    items: [
      { name: 'React / Next.js', desc: 'Building responsive, interactive UIs and SPAs.' },
      { name: 'Tailwind CSS', desc: 'Utility-first rapid styling and design systems.' },
      { name: 'Phaser.js', desc: '2D WebGL game development and interactive canvas.' }
    ]
  },
  {
    category: 'Backend',
    icon: <Server className="text-blue-400" size={24} />,
    items: [
      { name: 'Node.js / Express', desc: 'RESTful API development and microservices.' },
      { name: 'Python', desc: 'Data processing, scripting, and backend architecture.' },
      { name: 'PostgreSQL / MongoDB', desc: 'Relational and NoSQL database modeling.' }
    ]
  },
  {
    category: 'Tools & AI',
    icon: <Wrench className="text-purple-400" size={24} />,
    items: [
      { name: 'Git & GitHub', desc: 'Version control and CI/CD workflows.' },
      { name: 'Docker', desc: 'Containerization and deployment.' },
      { name: 'LangChain & LLMs', desc: 'Integrating generative AI into practical apps.' }
    ]
  }
];

export default function SkillModal({ onClose }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md pointer-events-auto z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-4xl bg-slate-900 border border-blue-500/30 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.15)] p-8 overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-blue-400 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 mb-2">
            Skill Core
          </h2>
          <p className="text-slate-400">Core competencies and technical arsenal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILLS.map((section, idx) => (
            <motion.div 
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.1 }}
              className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-slate-900 rounded-lg mr-4 border border-slate-700">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-200">{section.category}</h3>
              </div>
              
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.name} className="group">
                    <h4 className="text-slate-300 font-medium group-hover:text-blue-400 transition-colors">{item.name}</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
