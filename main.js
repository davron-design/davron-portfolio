/**
 * @version 0.2.5
 * @author davron-design.com
 */

'use strict';
console.log('local dev');

/**
TODO List
- Optimize for mobile!
- Refine Swiper animations
- Create horizontal slider inside swiper for about section
- Create Modal Animation for services
- Create Barba transitions

- Create Gallery
- Create Stills
 */

//--GLOBAL
// Selects
const buttonTop = document.querySelector('.button-top');
const modalContact = document.querySelectorAll('.modal-card.is-contact');

// Heading Selects
const headingContent = document.querySelector('[dn-heading="content"]');
const headingContact = document.querySelector('.heading-contact');

// Sections
const sections = gsap.utils.toArray('[dn-section]');
const sectionSlide = gsap.utils.toArray('[dn-slide]');
const homeComponent = document.querySelector('.home_component');
const aboutComponent = document.querySelector('.about_component');
const worksComponent = document.querySelector('.work_component');
const servicesComponent = document.querySelector('.services_component');
const footer = document.querySelector('.footer');

// Links
const navLink = document.querySelectorAll('.nav-link');
const footerLinks = document.querySelectorAll('[dn-footer-link]');

//--COMP Back to top button
buttonTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

window.addEventListener('load', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   footerLinks.forEach((link) => {
//     link.addEventListener('click', () => {
//       setTimeout(removeHash);
//     });
//   });
// });

// function removeHash() {
//   history.replaceState(
//     null,
//     document.title,
//     `${window.location.origin}${window.location.pathname}${window.location.search}`
//   );
// }

//--LENIS
// Lenis Selectors
const lenisStart = document.querySelectorAll('[data-lenis-start]');
const lenisStop = document.querySelectorAll('[data-lenis-stop]');
const lenisToggle = document.querySelectorAll('[data-lenis-toggle]');

//--> Lenis Init
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1.2,
  infinite: false,
  gestureOrientation: 'vertical',
  normalizeWheel: false,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Lenis Event Listeners
lenisStart.forEach((e) => {
  e.addEventListener('click', () => {
    lenis.start();
  });
});

lenisStop.forEach((e) => {
  e.addEventListener('click', () => {
    lenis.stop();
  });
});

lenisToggle.forEach((e) => {
  e.addEventListener('click', () => {
    e.classList.toggle('stop-scroll');
    if (e.classList.contains('stop-scroll')) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });
});

// Lenis ScrollTrigger Init
function connectToScrollTrigger() {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
}

connectToScrollTrigger();

//--SWIPER
function createSwiper(className) {
  return new Swiper(`.swiper.${className}`, {
    // General Parameters
    resistanceRatio: 0,
    cssMode: false,

    // Navigation
    grabCursor: true,
    keyboard: { enabled: true },
    navigation: {
      prevEl: `.swiper-button-prev.${className}`,
      nextEl: `.swiper-button-next.${className}`,
    },
  });
}

createSwiper('is-about');
createSwiper('is-works');
createSwiper('is-services');

//--GSAP
gsap.registerPlugin(ScrollTrigger);

//--> Scrolling Animations

// Header Section
function headerAnim() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: homeComponent,
        start: 'top ',
        end: 'bottom ',
        scrub: 1.5,
      },
    })
    .fromTo(
      homeComponent,
      {
        scale: 1,
        yPercent: 0,
      },
      {
        scale: 0.8,
        yPercent: 35,
        ease: 'sine.out',
      },
      '<'
    )
    .fromTo(
      homeComponent,
      {
        borderRadius: '0rem',
      },
      {
        borderRadius: '2rem',
      },
      '<'
    )
    .fromTo(
      '.heading-insert',
      {
        borderTopLeftRadius: '2rem',
        borderTopRightRadius: '2rem',
      },
      {
        borderTopLeftRadius: '0rem',
        borderTopRightRadius: '0rem',
      },
      '>'
    );
}

headerAnim();

// Sections
function sectionsAnim() {
  sectionSlide.forEach((e, i) => {
    gsap.fromTo(
      e,
      { borderRadius: '2rem', scale: 0.8 },
      {
        borderRadius: '0rem',
        scale: 1,
        scrollTrigger: {
          trigger: e,
          start: 'top',
          end: 'bottom center',
          // markers: true,
          scrub: 1.5,
        },
      }
    );
  });
}

sectionsAnim();

//--> Heading Animations
function headingAnim() {
  const headings = gsap.utils.toArray(headingContent.children);

  headings.forEach((e, i) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.heading-insert',
        start: 'top center',
        scrub: 1,
        ease: 'linear',
      },
    });

    const scaleVar = 1;
    tl.fromTo(
      e,
      { opacity: 0, yPercent: 0, scale: scaleVar },
      {
        opacity: 1,
        yPercent: -25 * i,
        scale: scaleVar + 0.1 * i,
        delay: 0.3 * i,
      }
    ).to(e, { filter: `blur(${(headings.length - i - 1) * 0.5}rem)` });
  });

  let tlEnd = gsap.timeline({
    scrollTrigger: {
      trigger: servicesComponent,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      ease: 'none',
    },
  });

  tlEnd
    .fromTo(headingContent, { display: 'flex' }, { display: 'none' })
    .fromTo(headingContact, { display: 'none' }, { display: 'flex' });
}

headingAnim();

//--> Footer Reveal
function footerFadeIn() {
  gsap.fromTo(
    footer,
    { opacity: 0 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: servicesComponent,
        start: 'bottom bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    }
  );
}

footerFadeIn();
