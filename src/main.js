import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import './styles/global.css';
import './shared/ui/ui.css';

import { gsap, ScrollTrigger, mm, reducedMotion } from './app/motion.js';
import { buildPage } from './app/page.js';
import { initReveals } from './effects/reveal/reveal.js';
import { initPreloader } from './modules/preloader/preloader.js';
import { initInkMenu } from './modules/nav/inkMenu.js';
import { initAnchorWipes } from './effects/svg-wipe/svgWipe.js';

const ctx = { gsap, ScrollTrigger, mm, reduced: reducedMotion() };

buildPage(ctx);
initReveals();
initPreloader();
initInkMenu(ctx);
initAnchorWipes(ctx);

// Triggers recalculam depois que as fontes chegam (lição upmind: posições
// cacheadas com fonte fallback ficam obsoletas).
document.fonts?.ready?.then(() => ScrollTrigger.refresh());
