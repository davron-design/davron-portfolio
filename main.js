/**
 * @version 0.7
 * @author davron-design.com
 */

'use strict';
console.log('local dev');

/**
TODO List
- Optimize for mobile! 
- Fix Nav with keydown action ✅
- Create preLoader animation ✅
- Refine Swiper animations ✅                     
- create header animation video ✅
- fix anchor links in footer and nav ✅
- Create horizontal slider inside swiper for about section ✅
- Create Modal Animation for services ✅

- Create Gallery ✅
- Create Stills
- Create Projects

// Version 2:
- Create Barba transitions
- Add swiper to gallery for multiple images
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

//--COMP Scroll back to top on load
window.addEventListener('load', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

//--COMP Top Button
document.querySelector('.button-top').addEventListener('click', (e) => {
  e.preventDefault();
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
});

//////////////////////////////////////////////////////////////
//--HOME
//////////////////////////////////////////////////////////////
gsap.registerPlugin(ScrollTrigger);

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
  gsap.ticker.lagSmoothing(0);
}

connectToScrollTrigger();

//--SWIPER
function createSwiper(className) {
  return new Swiper(`.swiper.${className}`, {
    // General Parameters
    speed: 1000,
    threshold: 5,
    watchSlidesProgress: true,
    slidesPerGroupAuto: false,

    // Navigation
    grabCursor: true,
    keyboard: { enabled: true },
    pagination: { type: 'progressbar', el: `.swiper-pagination.${className}` },
    loop: true,

    // Effects
    modules: [EffectTinder],
    parallax: { enabled: true },
    effect: 'tinder',
  });
}

createSwiper('is-about');
createSwiper('is-works');
createSwiper('is-services');

//--GSAP

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
    .to(homeComponent, {
      borderRadius: '2rem',
      scale: 0.8,
      yPercent: 35,
      ease: 'sine.out',
    })
    .to(
      '.heading-insert',
      {
        borderTopLeftRadius: '0rem',
        borderTopRightRadius: '0rem',
      },
      '>'
    );
}

headerAnim();

// Slide Sections
function sectionsAnim() {
  sectionSlide.forEach((e, i) => {
    gsap.to(e, {
      borderRadius: '0rem',
      scale: 1,
      scrollTrigger: {
        trigger: e,
        start: 'top',
        end: 'bottom center',
        // markers: true,
        scrub: 1.5,
      },
    });
  });
}

sectionsAnim();

// Heading Animations
function headingAnim() {
  const headings = gsap.utils.toArray(headingContent.children);
  let scaleVar = 1;
  function updateScaleVar() {
    scaleVar = window.matchMedia('(max-width: 575px)').matches ? 0.75 : 1;
  }

  updateScaleVar();
  window.addEventListener('resize', updateScaleVar());

  headings.forEach((e, i) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.heading-insert',
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
        ease: 'linear',
      },
    });

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
    .to(headingContent, { display: 'none' })
    .to(headingContact, { display: 'flex' });
}

headingAnim();

//--COMP Close Modal
function modalCloser() {
  const modalComponent = document.querySelectorAll('.modal-component');
  const closeButton = document.querySelectorAll('.modal-card.is-close-button');
  const buttonView = document.querySelectorAll('.button-view');

  buttonView.forEach((button) => {
    button.addEventListener('click', () => {
      modalComponent.forEach((container) => {
        container.scrollY = 0;
      });
    });
  });

  modalComponent.forEach((container) => {
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        closeButton.forEach((button) => {
          button.click();
        });
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeButton.forEach((button) => {
        button.click();
      });
    }
  });
}

modalCloser();

let windowWidth = window.innerWidth;
window.addEventListener('resize', function () {
  if (windowWidth !== window.innerWidth) {
    windowWidth = window.innerWidth;
    headingAnim();
    modalCloser();
    lenis.start();
  }
});
