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
/*
window.addEventListener('load', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

*/

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

//--COMP
const classMap = {
  0: {
    textColor: 'text-color-main',
    contactClass: 'is-main',
    brandLinkClass: 'is-black',
  },
  1: {
    textColor: 'text-color-a1',
    contactClass: 'is-about',
    brandLinkClass: 'is-white',
  },
  2: {
    textColor: 'text-color-a2',
    contactClass: 'is-works',
    brandLinkClass: 'is-white',
  },
  3: {
    textColor: 'text-color-a3',
    contactClass: 'is-service',
    brandLinkClass: 'is-black',
  },
  4: {
    textColor: 'text-color-a4',
    contactClass: 'is-contact',
    brandLinkClass: 'is-white',
  },
};

const classRemover = function () {
  const classesToRemove = [
    'text-color-main',
    'text-color-a1',
    'text-color-a2',
    'text-color-a3',
    'text-color-a4',
    'is-main',
    'is-about',
    'is-works',
    'is-service',
    'is-contact',
    'is-white',
    'is-black',
  ];

  brandLogo.classList.remove(...classesToRemove);
  buttonContact.classList.remove(...classesToRemove);
  brandLink.classList.remove(...classesToRemove);
};

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

//--> Footer Fade In
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

//--> Nav Color Change
function navColorChange() {
  function toggleClasses(index) {
    classRemover();
    const { textColor, contactClass, brandLinkClass } = classMap[index];
    brandLogo.classList.add(textColor);
    buttonContact.classList.add(contactClass);
    brandLink.classList.add(brandLinkClass);
  }

  ScrollTrigger.create({
    trigger: homeComponent,
    start: 'top center',
    end: 'bottom center',
    // markers: true,
    onEnterBack: () => toggleClasses(0),
    onEnter: () => toggleClasses(0),
    onLeaveBack: () => toggleClasses(0),
    onLeave: () => toggleClasses(0),
  });

  ScrollTrigger.create({
    trigger: homeComponent,
    start: 'bottom center',
    end: 'bottom center',
    onEnterBack: () => toggleClasses(1),
    onEnter: () => toggleClasses(1),
    onLeaveBack: () => toggleClasses(1),
    onLeave: () => toggleClasses(1),
  });

  ScrollTrigger.create({
    trigger: worksComponent,
    start: 'top center',
    end: 'bottom center',
    onEnterBack: () => toggleClasses(2),
    onEnter: () => toggleClasses(2),
    onLeaveBack: () => toggleClasses(2),
    onLeave: () => toggleClasses(2),
  });

  ScrollTrigger.create({
    trigger: servicesComponent,
    start: 'top center',
    end: 'bottom center',
    onEnterBack: () => toggleClasses(3),
    onEnter: () => toggleClasses(3),
    onLeaveBack: () => toggleClasses(3),
    onLeave: () => toggleClasses(3),
  });

  ScrollTrigger.create({
    trigger: '.main-wrapper',
    start: 'bottom center',
    onEnterBack: () => toggleClasses(4),
    onEnter: () => toggleClasses(4),
    onLeaveBack: () => toggleClasses(4),
    onLeave: () => toggleClasses(4),
  });
}
