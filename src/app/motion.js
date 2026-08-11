// Única fonte de GSAP do projeto. Nenhum módulo importa 'gsap' direto:
// isso garante registro único de plugins e um gate central de reduced-motion.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export const mm = gsap.matchMedia();

export function reducedMotion() {
  return !window.matchMedia(MOTION_OK).matches;
}

export { gsap, ScrollTrigger };
