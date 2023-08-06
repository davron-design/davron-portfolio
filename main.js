/**
 * @version 0.9.2.5
 * @author davron-design.com
 */

'use strict';
console.log('local dev');

/**
TODO List
  - Optimize for mobile! ✅
  - Fix Nav with keydown action ✅
  - Create preLoader animation ✅
  - Refine Swiper animations ✅                     
  - create header animation video ✅
  - fix anchor links in footer and nav ✅
  - Create horizontal slider inside swiper for about section ✅
  - Create Modal Animation for services ✅
  - Create mobile works header animation ✅
- Fix SNS on mobile view
- Fix mobile gallery reveal animation
- Fix mobile landscape video
- Fix mobile landscape works heading crashing with brand header
- Fix jumping footer when scrolling
- Add swiper lazy loading animations
- Defer all scripts!
- Add aria-labels!

- Create Gallery ✅
- Create Stills ✅
- Create Projects
- Integrate Google Analytics
- Create OGP and Logo

// Version 2:
- Create Barba transitions
- Add swiper to gallery for multiple images

BUG Report
- Peformance issue was due to blur on the headings to create the halation effect
- Very high GPU usage -> One reason is that SVG render uses too much gpu!
 */

//--GLOBAL
//--COMP Top Button
document.querySelector('.button-top').addEventListener('click', (e) => {
  e.preventDefault();
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
});

gsap.registerPlugin(ScrollTrigger);

//--LENIS
// Lenis Selectors
const lenisStart = document.querySelectorAll('[data-lenis-start]');
const lenisStop = document.querySelectorAll('[data-lenis-stop]');
const lenisToggle = document.querySelectorAll('[data-lenis-toggle]');

//--> Lenis Init
const lenis = new Lenis({
  lerp: 0.15,
  wheelMultiplier: 1,
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

// Home Selects
const buttonTop = document.querySelector('.button-top');
const modalContact = document.querySelectorAll('.modal-card.is-contact');
const headingContent = document.querySelector('[dn-heading="content"]');
const headingContact = document.querySelector('.heading-contact');
const sectionSlide = gsap.utils.toArray('[dn-slide]');
const homeComponent = document.querySelector('.home_component');
const servicesComponent = document.querySelector('.services_component');

// Works Selects
const projectHeader = document.querySelector('[dn-section="project-header"]');

//--SWIPER
// Swiper Home
function createSwiper(className) {
  return new Swiper(`.swiper.${className}`, {
    // General Parameters
    speed: 700,
    threshold: 5,
    watchSlidesProgress: true,
    slidesPerGroupAuto: false,
    lazy: {
      loadPrevNext: true,
    },

    // Navigation
    grabCursor: true,
    keyboard: { enabled: true },
    pagination: { type: 'progressbar', el: `.swiper-pagination.${className}` },
    navigation: {
      prevEl: `.swiper-arrow-prev.${className}`,
      nextEl: `.swiper-arrow-next.${className}`,
    },
    rewind: true,

    // Effects
    parallax: { enabled: true },
    effect: 'creative',
    creativeEffect: {
      next: { shadow: true, translate: ['100%', 0, 100] },
      prev: { shadow: true, translate: ['-50%', 0, -1] },
      limitProgress: 5,
    },
  });
}

createSwiper('is-about');
createSwiper('is-works');
createSwiper('is-services');

// Swiper Stills
function stillsSwiper(className) {
  return new Swiper(`.swiper.${className}`, {
    // General Parameters
    speed: 1000,
    threshold: 5,
    watchSlidesProgress: true,
    slidesPerGroupAuto: false,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },

    // Navigation
    grabCursor: true,
    keyboard: { enabled: true },
    pagination: {
      clickable: true,
      type: 'fraction',
      dynamicBullets: true,
      el: `.swiper-pagination.${className}`,
    },
    navigation: {
      prevEl: `.swiper-arrow-prev.${className}`,
      nextEl: `.swiper-arrow-next.${className}`,
    },
    loop: true,
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
      enabled: true,
    },

    // Effects
    modules: [EffectPanorama],
    parallax: { enabled: true },
    effect: 'panorama',
  });
}

stillsSwiper('is-stills');

//--GSAP

let mm = gsap.matchMedia();

//--> Scrolling Animations
// Header Section
function headerAnim(component, yValue) {
  mm.add('(min-width: 767px)', () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: component,
          start: 'top ',
          end: 'bottom ',
          scrub: 1.5,
        },
      })
      .to(component, {
        borderRadius: '2rem',
        scale: 0.8,
        yPercent: yValue,
        ease: 'sine.out',
      });
  });
}

headerAnim(homeComponent, 20);
headerAnim(projectHeader, 0);

function sectionsAnim() {
  mm.add('(min-width: 767px)', () => {
    sectionSlide.forEach((e, i) => {
      gsap.to(e, {
        borderRadius: '0rem',
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: e,
          start: 'top',
          end: 'bottom center+=15%',
          ease: 'sine.in',
          scrub: 1,
        },
      });
    });
  });
}

sectionsAnim();

// Heading Animations
function headingAnim() {
  const headings = gsap.utils.toArray(headingContent.children);
  const scaleDesktop = 1;
  const scaleMobile = 0.75;

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

    // mobile version
    mm.add('(max-width: 768px)', () => {
      tl.fromTo(
        e,
        { opacity: 0, yPercent: 0, scale: scaleMobile },
        {
          opacity: 1,
          yPercent: -25 * i,
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
          yPercent: -25 * i,
          scale: scaleDesktop + 0.1 * i,
          delay: 0.3 * i,
        }
      ).to(e, { filter: `blur(${(headings.length - i - 1) * 0.5}rem)` });
    });
  });
}

headingAnim();

function headingSwap() {
  const tlEnd = gsap.timeline({
    scrollTrigger: {
      trigger: servicesComponent,
      start: 'top top',
      end: 'bottom bottom',
      toggleActions: 'play none none reverse',
    },
  });
  tlEnd
    .set(headingContent, { display: 'none' })
    .set(headingContact, { display: 'flex' });
}

headingSwap();

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
    location.reload();
    headingAnim();
    modalCloser();
    lenis.start();
  }
});
