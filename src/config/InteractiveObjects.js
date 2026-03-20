import { Vector3 } from 'three';

export const INTERACTIVE_OBJECTS = [
  { 
    id: 'skills', 
    name: 'Skill Core', 
    position: new Vector3(0, 0, -6), 
    radius: 3.5, 
    type: 'core',
    zone: 'Center Lock',
    description: "The core engine powering my development ecosystem. Specialized in modern front-end frameworks, performant Node.js runtimes, and building robust scalable architectures.",
    tech: ["React", "Three.js", "TailwindCSS", "Node.js"],
    features: ["Component-Driven", "Responsive", "Accessible"]
  },
  { 
    id: 'movie', 
    name: 'Movie Database Project', 
    position: new Vector3(-8, 0, -3), 
    radius: 2.5, 
    type: 'project',
    zone: 'Left Wing',
    description: "A highly cinematic consumer review application fetching real-time database inputs rendering rich hero-images and dynamic rating cards.",
    tech: ["React", "CSS3", "REST APIs"],
    features: ["Dynamic Routing", "Live Search", "Responsive Grid"]
  },
  { 
    id: 'library', 
    name: 'Library System', 
    position: new Vector3(8, 0, -3), 
    radius: 2.5, 
    type: 'project',
    zone: 'Right Wing',
    description: "A full-scale library administration dashboard handling automated book tracking, user lifecycles, and fine-mapping.",
    tech: ["PHP", "MySQL", "Bootstrap", "Vanilla JS"],
    features: ["Real-time DB", "User Roles", "Audit Logs"]
  },
  { 
    id: 'chatbot', 
    name: 'Personal AI Chatbot', 
    position: new Vector3(-4, 0, 5), 
    radius: 2.5, 
    type: 'project',
    zone: 'Deep Storage',
    description: "An advanced desktop assistant using natural language processing to execute OS-level commands and converse dynamically.",
    tech: ["Python", "Flask", "OpenAI API", "PyQt5"],
    features: ["Voice Recognition", "File Management", "LLM Context"]
  },
  { 
    id: 'contact', 
    name: 'Contact Beacon', 
    position: new Vector3(4, 0, 5), 
    radius: 2.5, 
    type: 'contact',
    zone: 'Comms Array',
    description: "Access my secure transmission terminal to initiate a connection securely. I am open to freelance work and full-time engineering roles globally.",
    tech: ["Email", "GitHub", "LinkedIn"],
    features: ["Fast Response", "Creative Ideation"]
  }
];
