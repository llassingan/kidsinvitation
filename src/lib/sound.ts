let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    if (!("AudioContext" in window)) return null;
    ctx = new window.AudioContext();
  }
  return ctx;
}

function tone(freq: number, start: number, duration: number, gain: number, type: OscillatorType = "triangle") {
  const ac = context();
  if (!ac) return;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.setValueAtTime(0, start);
  amp.gain.linearRampToValueAtTime(gain, start + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(amp).connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

export function soundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("sound") !== "off";
  } catch {
    return true;
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    window.localStorage.setItem("sound", on ? "on" : "off");
  } catch {
    /* storage may be unavailable in private mode */
  }
}

export function unlockAudio() {
  const ac = context();
  if (ac && ac.state === "suspended") void ac.resume();
}

export function playOpen() {
  if (!soundEnabled()) return;
  const ac = context();
  if (!ac) return;
  const t = ac.currentTime;
  [392, 523.25, 659.25, 783.99].forEach((f, i) => tone(f, t + i * 0.09, 0.5, 0.09));
}

export function playSuccess() {
  if (!soundEnabled()) return;
  const ac = context();
  if (!ac) return;
  const t = ac.currentTime;
  [523.25, 659.25, 783.99].forEach((f, i) => tone(f, t + i * 0.07, 0.35, 0.07));
}

export function playTick() {
  if (!soundEnabled()) return;
  const ac = context();
  if (!ac) return;
  tone(1200, ac.currentTime, 0.06, 0.02, "sine");
}
