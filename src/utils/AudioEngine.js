class ProceduralAudio {
  constructor() {
    this.ctx = null;
    this.ambientOscillator = null;
    this.ambientGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    this.ctx = new AudioContext();
    
    // Ambient Hum Setup (Deep Space Drone)
    this.ambientOscillator = this.ctx.createOscillator();
    this.ambientGain = this.ctx.createGain();
    
    this.ambientOscillator.type = 'sine';
    this.ambientOscillator.frequency.value = 45; // Sub-bass frequency
    
    this.ambientGain.gain.value = 0; // Absolute Start silenced
    
    this.ambientOscillator.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);
    
    this.ambientOscillator.start();
    this.initialized = true;
  }

  playAmbient() {
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    // Soft procedural fade-in establishing dark non-intrusive backdrop
    this.ambientGain.gain.setTargetAtTime(0.02, this.ctx.currentTime, 4);
  }

  stopAmbient() {
    if (!this.initialized) return;
    this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 1);
  }

  playPing() {
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    // Softened digital interaction confirmation cleanly simulating sci-fi feedback
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime); // Lower pitch 
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playDeny() {
    if (!this.initialized) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    // Aggressive low-frequency sawtooth buzz mimicking digital system blocks directly
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 0.2);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
}

export const AudioEngine = new ProceduralAudio();
