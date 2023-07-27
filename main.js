/**
 * @version 0.2
 * @author davron-design.com
 */

'use strict';
console.log('local dev');

//--GLOBAL
// Selects
const bgBrand = document.querySelector('#bg-brand');
const brandLogo = document.querySelector('#brand-logo');
const brandSection = document.querySelector('#brand-section');
const brandLink = document.querySelector('#brand-link');
const buttonContact = document.querySelector('.button-contact');
const modalContact = document.querySelectorAll('.modal-card.is-contact');

// Heading Selects
const headingContent = document.querySelector('[dn-heading="content"]');
const headingContact = document.querySelector('.heading-contact');

// Sections
const sectionsArr = gsap.utils.toArray('[dn-section]');
const sectionHome = document.querySelector('.home_component');
const sectionAbout = document.querySelector('.about_component');
const sectionWorks = document.querySelector('.work_component');
const sectionServices = document.querySelector('.services_component');
const footer = document.querySelector('.footer');

// Links
const navLink = document.querySelectorAll('.nav-link');
const footerLinks = document.querySelectorAll('[dn-footer-link]');

//--COMP
const classMap = {
  0: {
    textColor: 'text-color-main',
    contactClass: 'is-main',
  },
  1: {
    textColor: 'text-color-a1',
    contactClass: 'is-about',
  },
  2: {
    textColor: 'text-color-a2',
    contactClass: 'is-works',
  },
  3: {
    textColor: 'text-color-a3',
    contactClass: 'is-service',
  },
  4: {
    textColor: 'text-color-a4',
    contactClass: 'is-contact',
  },
};

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
    grabCursor: true,
    cssMode: false,
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
        trigger: sectionHome,
        start: 'top',
        end: 'bottom center',
        // markers: true,
        scrub: 1.5,
      },
    })
    .fromTo(
      sectionHome.parentNode,
      {
        paddingLeft: '0rem',
        paddingRight: '0rem',
        yPercent: 0,
      },
      {
        paddingLeft: '3rem',
        paddingRight: '3rem',
        yPercent: 5,
      }
    )
    .fromTo(
      sectionHome,
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
  sectionsArr.forEach((e, i) => {
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
        // end: 'bottom top-=100%',
        markers: true,
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
      trigger: sectionServices,
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

//--> Footer Fade In
function footerFadeIn() {
  gsap.fromTo(
    footer,
    { opacity: 0 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: sectionServices,
        start: 'bottom bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    }
  );
}

footerFadeIn();
