/** Zwischenspiele (Blueprint F): Branchenband, Strahl mit sechs Stationen. */
import { gsap, ScrollTrigger, $, $$, mode } from './base.js';

export function initInterludes() {
  // I · Branchenband: scrollgesteuert, nie Autoplay; neigt sich bei schnellem Scrollen bis 4° (nur Desktop)
  const band = $('[data-band]');
  if (band) {
    const track = $('.band-track', band);
    gsap.to(track, {
      xPercent: -25, ease: 'none',
      scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    if (mode === 'desktop') {
      const tilt = gsap.quickTo(band, 'rotation', { duration: 0.6, ease: 'power3.out' });
      ScrollTrigger.create({
        trigger: band, start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => tilt(gsap.utils.clamp(-4, 4, self.getVelocity() / -400)),
        onLeave: () => tilt(0), onLeaveBack: () => tilt(0),
      });
    }
  }

  // II · Strahl mit sechs Stationen, die beim Scrollen aufklappen (Sticky-Bühne, Länge aus der Konfiguration)
  const weg = $('.interlude-weg');
  if (weg && (mode === 'desktop' || mode === 'mobile')) {
    const fill = $('[data-beam-fill]', weg);
    const steps = $$('[data-step]', weg);
    ScrollTrigger.create({
      trigger: weg, start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(fill, { scaleX: Math.min(1, p / 0.8) });
        steps.forEach((s, i) => s.classList.toggle('is-on', p >= 0.06 + i * 0.13));
      },
    });
  }
}
