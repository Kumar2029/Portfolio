import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { X, Code, Layers, Server, CheckCircle, Info } from 'lucide-react';

const PROJECT_DATA = {
  library: {
    title: 'Library Management System',
    problem: 'Inefficient manual tracking of books, users, and borrowing records.',
    solution: 'Developed a centralized digital system for automated inventory and issue management.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    features: ['Barcode scanning integration', 'Real-time availability tracking', 'Automated overdue fee calculation'],
    outcome: 'Reduced manual administrative work by 40% and improved inventory accuracy.'
  },
  chatbot: {
    title: 'Personal AI Chatbot',
    problem: 'Need for a customized AI assistant capable of contextual memory and specialized tasks.',
    solution: 'Built a custom AI brain integrating LLM APIs with vector databases for memory retrieval.',
    stack: ['Python', 'LangChain', 'OpenAI API', 'Pinecone'],
    features: ['Conversational memory', 'Document QA', 'Custom tool execution'],
    outcome: 'Delivered a highly responsive AI agent capable of assisting with complex coding and research tasks.'
  },
  movie: {
    title: 'Movie Review Website',
    problem: 'Lack of a streamlined platform for users to discover, review, and rate obscure films.',
    solution: 'Created a social review platform with rich media integration and user profiles.',
    stack: ['Next.js', 'Prisma', 'MongoDB', 'Framer Motion'],
    features: ['Dynamic search & filtering', 'User authentication', 'Rich text editor for reviews'],
    outcome: 'Grew to 500+ active users within the first month of launch.'
  }
};

export default function ProjectModal({ zoneId, onClose }) {
  const data = PROJECT_DATA[zoneId];
  if (!data) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md pointer-events-auto z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.15)] p-8 overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 mb-8">
          {data.title}
        </h2>

        <div className="space-y-8">
          <section>
            <h3 className="flex items-center text-lg font-semibold text-cyan-300 mb-3">
              <Info className="mr-2" size={20} /> Problem & Solution
            </h3>
            <div className="space-y-2 bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
              <p className="text-slate-300"><span className="font-semibold text-slate-400 mr-2">Problem:</span> {data.problem}</p>
              <p className="text-slate-300"><span className="font-semibold text-slate-400 mr-2">Solution:</span> {data.solution}</p>
            </div>
          </section>

          <section>
            <h3 className="flex items-center text-lg font-semibold text-cyan-300 mb-3">
              <Code className="mr-2" size={20} /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.stack.map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-cyan-950/40 border border-cyan-800/50 rounded-md text-sm text-cyan-200">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="flex items-center text-lg font-semibold text-cyan-300 mb-3">
              <Layers className="mr-2" size={20} /> Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
              {data.features.map(feat => (
                <li key={feat} className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span> {feat}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="flex items-center text-lg font-semibold text-cyan-300 mb-3">
              <CheckCircle className="mr-2" size={20} /> Outcome
            </h3>
            <p className="text-slate-200 bg-linear-to-r from-cyan-950/50 to-blue-900/20 p-4 rounded-lg border border-cyan-900/30">
              {data.outcome}
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
