/**
 * @version 0.9.1
 * @author davron-design.com
 */

'use strict';
console.log('local dev');

//--LENIS GSAP Connection
function connectToScrollTrigger() {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

connectToScrollTrigger();

//--GSAP
let mm = gsap.matchMedia();
const headingContent = document.querySelector('[dn-heading="content"]');

function headerAnim() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.section_project-header',
        start: 'top ',
        end: 'bottom ',
        scrub: 1.5,
      },
    })
    .to('.section_project-header', {
      borderRadius: '2rem',
      scale: 0.8,
      ease: 'sine.out',
    });
  //   mm.add('(min-width: 767px)', () => {});
}

headerAnim();

function headingAnim() {
  const headings = gsap.utils.toArray(headingContent.children);
  const scaleDesktop = 1;
  const scaleMobile = 0.75;

  headings.forEach((e, i) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.heading-insert',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        ease: 'linear',
      },
    });

    // mobile version
    mm.add('(max-width: 768px)', () => {
      tl.fromTo(
        e,
        { opacity: 0, yPercent: 0, scale: scaleMobile },
        {
          opacity: 1,
          yPercent: 100 * i + 1,
          scale: scaleMobile + 0.1 * i,
          delay: 0.3 * i,
        }
      ).to(e, { opacity: `${(i - 0.5) * 0.5}` });
    });

    // desktop version
    mm.add('(min-width: 767px)', () => {
      tl.fromTo(
        e,
        { opacity: 0, yPercent: 0, scale: scaleDesktop },
        {
          opacity: 1,
          yPercent: 100 * i + 1,
          scale: scaleDesktop + 0.1 * i,
          delay: 0.3 * i,
        }
      ).to(e, { filter: `blur(${(headings.length - i - 1) * 0.5}rem)` });
    });
  });
}

headingAnim();
