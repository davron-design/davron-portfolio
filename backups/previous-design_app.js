/**
 * @version 0.5.3
 * @author davron-design.com
 */

'use strict';
console.log(`local dev`);

/*
/home remaining List
- fix navbar resizing issue
- add the same circle animation to the normal buttons, as in button-contact
- fix mobile designs picture sizes
- fix mobile landscape home-about scroll section
✅ fix services contact arrow svg
✅ add link to services contact



TODO List
- Create Barba transitions
- Gallery, create a 3d scroll like a jukebox


BUG Report
- Edges of blurred background video of horz-section becomes visible after a while


NOTES
- home-about section text bug was due to section_horz-scroll being over 100vh!
- ScrollTrigger.noramlize(true) conflicts with overflow:hidden to stop scroll!
- Use gsap.utils.toArray and stagger to animate a bunch of stuff easily
*/

//////////////////////////////////////////////////////////////////////////////
// --JS
//--> Natural Horz Scrolling
function setTrackHeights() {
  let sectionHeights = document.querySelectorAll('[dn-section="horizontal"]');
  sectionHeights.forEach(function (sectionHeight) {
    let trackWidth = sectionHeight.querySelector(
      '[dn-element="horizontal-track"]'
    ).offsetWidth;
    sectionHeight.style.height = trackWidth + 'px';
  });
}
setTrackHeights();
window.addEventListener('resize', function () {
  setTrackHeights();
});

//////////////////////////////////////////////////////////////////////////////
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

//--GSAP
gsap.registerPlugin(ScrollTrigger, Flip);

let matchMedia = gsap.matchMedia();

//GLOBAL

// Text Selects
const textSlideUp = document.querySelectorAll('[dn-text-anim="slide-up"]'),
  textFadeIn = document.querySelectorAll('[dn-text-anim="fade-in"]'),
  textScrub = document.querySelectorAll('[dn-text-anim="scrub"]');

// Nav Selects
const navLink = document.querySelectorAll('.nav-link');
const navButton = document.querySelector('[dn-nav="button"]');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('[dn-menu="overlay"]');
const menuLink = gsap.utils.toArray('.menu-link');

// Element Selects
const brandLogo = document.querySelectorAll('[dn-brand="logo"]');
const brandLink = document.querySelectorAll('[dn-brand="link"]');
const buttonContact = document.querySelector('[dn-button="contact"]');
const buttonTop = document.querySelector('[dn-button="top"]');

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

//--COMP prevent scroll during preloader
let timer;
lenis.stop();
timer = setTimeout(() => {
  homeHeaderLoad();
  lenis.start();
}, 1500);

//--COMP Nav Button Hover
const navButtonHover = function () {
  gsap.to(navButton, {
    scale: 1.2,
    duration: 0.3,
    ease: 'sine.out',
    paused: true,
  });

  navButton.addEventListener('mouseenter', () => {
    gsap.to(navButton, { scale: 1.2 });
  });

  navButton.addEventListener('mouseleave', () => {
    gsap.to(navLink, { opacity: 1 });
    gsap.to(navButton, { scale: 1 });
  });
};

navButtonHover();

//--COMP Menu Overlay Animation

// Toggle Menu function
const toggleMenu = function () {
  // Close button animations
  const closeButton = gsap
    .timeline({ paused: true })
    .to(navButton, {
      xPercent: -100,
      opacity: 0,
      rotate: -180,
      ease: 'power2.inOut',
    })
    .to(navLink, { opacity: 0 }, '<')
    .set(navLink, { display: 'none' })
    .set(navButton, {
      color: 'var(--color-white)',
      backgroundColor: 'var(--color-UIRed)',
      scale: 1.2,
    })
    .to(
      navMenu,
      {
        padding: 0,
        width: '2.5rem',
        height: '2.5rem',
        backgroundColor: 'rgba(0,0,0,0)',
        backdropFilter: 'blur(0px)',
        boxShadow: 'none',
      },
      '<'
    )
    .to(
      navButton,
      {
        xPercent: 0,
        opacity: 1,
        rotate: -45,
      },
      '<'
    );
  let isActive = false;

  // Overlay animation
  const tlOverlay = gsap.timeline({ paused: true });
  tlOverlay
    .set(menuOverlay, { display: 'none' })
    .set(menuOverlay, { display: 'block' })
    .fromTo(
      menuOverlay,
      {
        opacity: 0,
      },
      { opacity: 1, duration: 0.5, ease: 'power0.easeNone' }
    )
    .from(
      menuLink,
      {
        xPercent: 50,
        stagger: { amount: 0.5, from: 'random' },
        opacity: 0,
      },
      0
    );
  gsap.set(menuOverlay, { display: 'none', opacity: 0 });

  // Play the animation on click
  navButton.addEventListener('click', () => {
    isActive = !isActive; //toggle
    if (isActive) {
      tlOverlay.play();
      closeButton.play();
    } else {
      tlOverlay.reverse();
      closeButton.reverse();
    }
  });

  // Hide the overlay on Esc key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isActive) {
      tlOverlay.reverse();
      closeButton.reverse();
      isActive = false;
    }
  });
};

toggleMenu();

//--COMP Blur heading on Scroll
function blurOnScroll(element, trigger) {
  gsap.to(element, {
    duration: 1,
    filter: 'blur(1rem)',
    scrollTrigger: {
      trigger: `${trigger}`,
      start: 'top 35%',
      end: 'top',
      scrub: 0.5,
      // markers: true,
    },
  });
}

//--COMP Class Toggler
const classToggler = function (triggerStart, triggerEnd, target, className) {
  ScrollTrigger.create({
    trigger: triggerStart,
    start: 'top',
    endTrigger: triggerEnd,
    end: 'bottom',
    // markers: true,
    toggleClass: {
      targets: `${target}`,
      className: `${className}`,
    },
  });
};

//--COMP Split Type Reusable Animations

// Split Type Init
let splitText;

const runSplit = function () {
  // Splitting text
  splitText = new SplitType('[dn-split-type]', {
    types: 'words, chars, lines',
    tagName: 'span',
  });

  // Scrub Text Anim
  textScrub.forEach(function (element) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'bottom center',
        scrub: 1,
        // markers: true,
      },
    });
    tl.from(element.getElementsByClassName('char'), {
      opacity: 0.1,
      duration: 0.2,
      ease: 'expo.out',
      stagger: { each: 0.1 },
    });
  });

  // avoid text jump
  gsap.set('[text-split]', { opacity: 1 });
};

runSplit();

//Brand Logo Animation to Japanese
function brandLogoSplit() {
  let tls = [];
  brandLogo.forEach((el, i) => {
    let tl = gsap
      .timeline({ paused: true })
      .to(el.getElementsByClassName('word'), {
        yPercent: -100,
        ease: 'sine.inOut',
        stagger: { amount: 0.5, from: 'end' },
      });
    tls.push(tl);
  });

  brandLink.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      tls.forEach((tl) => {
        tl.play();
      });
    });

    el.addEventListener('mouseleave', () => {
      tls.forEach((tl) => tl.reverse());
    });
  });
}

brandLogoSplit();

// SplitType Resize Re-split
let windowWidth = window.innerWidth;
window.addEventListener('resize', function () {
  if (windowWidth !== window.innerWidth) {
    windowWidth = window.innerWidth;
    splitText.revert();
    runSplit();
    brandLogoSplit();
  }
});

//////////////////////////////////////////////////////////////////////////////
// HOME SELECTIONS

// All Sections
const sectionHomeHeader = document.querySelector('.section_home-header'),
  sectionHomeAbout = document.querySelector('.section_home-about'),
  sectionHomeIntro = document.querySelector('.section_home-intro'),
  sectionHomeProjects = document.querySelector('.section_home-projects');

// Section - Home Header
const headerTitle = document.querySelector('[dn-title="home-header"]');
const headerImage = document.querySelector('[dn-element="header-image"]');
const headerOverlay = document.querySelector('[dn-element="header-overlay"]');

// Section - Horizontal Scroll
const brandingPanel = document.querySelector(
    '[dn-horizontal-panel="branding"]'
  ),
  brandingTitle = document.querySelector('[dn-horizontal-title="branding"]'),
  webPanel = document.querySelector('[dn-horizontal-panel="web"]'),
  webTitle = document.querySelector('[dn-horizontal-title="web"]'),
  productPanel = document.querySelector('[dn-horizontal-panel="product"]'),
  productTitle = document.querySelector('[dn-horizontal-title="product"]'),
  outroPanel = document.querySelector('[dn-horizontal-panel="outro"]'),
  outroTitle = document.querySelector('[dn-horizontal-title="outro"]'),
  outroImage = document.querySelector('[dn-element="outro-image"]');

// Section - About
const aboutHeading = document.querySelector('[dn-element="heading-about"]');
const aboutImage = document.querySelector('[dn-element="image-about"]');

// Section - Projects
const projectsHeading = document.querySelector(
  '[dn-element="heading-project"]'
);
const projectList = document.querySelector('.home-projects_list');
const projectLink = gsap.utils.toArray('.home-projects_item-link'),
  projectTitleWrapper = gsap.utils.toArray('.home-projects_item-wrapper'),
  projectImageWrapper = gsap.utils.toArray('.home-projects_image-wrapper'),
  projectTypeWrapper = gsap.utils.toArray('.home-projects_type-wrapper'),
  projectRevealer = gsap.utils.toArray('.home-projects_revealer');

// Section - Services
const servicesHeading = document.querySelector(
  '[dn-element="heading-services"]'
);

// Section - Designs
const designsHeading = document.querySelector('[dn-element="heading-designs"]');
const designsComponent = document.querySelector('[dn-component="designs"]');

// --GSAP ScrollTrigger

//--> Headings [Blur onScroll]
blurOnScroll(aboutHeading, '.home-about_scroll-content');
blurOnScroll(aboutImage, '.home-about_scroll-content');
blurOnScroll(projectsHeading, '.home-projects_list');
blurOnScroll(servicesHeading, '.home-services_cards-container');

function blurOnScrollDesigns(element, trigger) {
  gsap.to(element, {
    duration: 1,
    filter: 'blur(1rem)',
    scrollTrigger: {
      trigger: `${trigger}`,
      start: 'top 65%',
      end: 'top center-=15%',
      scrub: 1,
    },
  });
}
blurOnScrollDesigns(designsHeading, '.home-designs_list');

//--> .brand-logo & .button-contact Toggle Class
classToggler(
  sectionHomeIntro,
  sectionHomeAbout,
  '[dn-brand="logo"]',
  'is-white'
);

classToggler(
  sectionHomeIntro,
  sectionHomeAbout,
  '[dn-button="contact"]',
  'is-white'
);

//--> .section_home-header onLoad ✅ Refactor complete
const homeHeaderLoad = function () {
  // CMS image animation on load
  let ease = 'expo.out';
  let duration = 5;

  gsap.from(headerImage, {
    opacity: 0,
    y: '-5svh',
    duration: duration,
    ease: ease,
  });

  document.querySelectorAll('.text-style-outline').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: '-25%' },
      {
        opacity: 1,
        delay: i * 0.2,
        y: '0%',
        duration: duration,
        ease: ease,
      }
    );
  });

  document.querySelectorAll('.swiper-slide-text').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: '25%' },
      {
        opacity: 1,
        delay: i * 0.2,
        y: '0%',
        duration: duration,
        ease: ease,
      }
    );
  });
};

//--> .section_home-header Swiper 3D effect
const swiperContentWrapper = document.querySelectorAll(
  '.swiper-content-wrapper'
);

const swiperHomeHeader = new Swiper('.swiper.is-home-header', {
  effect: 'cube',
  cubeEffect: { slideShadows: false, shadow: false },
  speed: 325,
  loop: true,
  autoplay: { delay: 50, disableOnInteraction: false, enabled: true },
  watchSlidesProgress: true,
  slidesPerGroupAuto: false,
  noSwiping: true,
  allowTouchMove: false,
  initialSlide: Math.floor(Math.random() * 4),
  on: {
    slideChange: function () {
      // Reset the filter blur for all swiperContentWrapper elements
      swiperContentWrapper.forEach(function (element) {
        gsap.to(element, { filter: 'none', duration: 0.5 });
      });

      // Get the active slide's index
      const activeSlideIndex = this.realIndex;

      // Apply the filter blur to non-active slides
      swiperContentWrapper.forEach(function (element, index) {
        if (index !== activeSlideIndex) {
          gsap.to(element, {
            filter: 'blur(0.5rem)',
            duration: 0.5,
            opacity: 0.75,
          });
        } else {
          gsap.fromTo(
            element,
            { filter: 'blur(0.5rem)' },
            {
              filter: 'blur(0rem)',
              duration: 0.5,
              opacity: 1,
            }
          );
        }
      });
    },
  },
});

// Swiper 3D effect Init
setTimeout(() => {
  swiperHomeHeader.params.speed = 1000;
  swiperHomeHeader.params.autoplay.delay = 5000;
}, 1500);

//--> .section_home-header Parallex Scroll Out
const homeHeaderParallax = function (trigger) {
  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top top+=1',
        scrub: 2,
        ease: 'Power1.easeIn',
        markers: true,
      },
    })
    .to('.swiper-slide-content', { yPercent: -40 })
    .to('.home-header_item-content', { yPercent: -20 }, { yPercent: 0 });
};

homeHeaderParallax(sectionHomeHeader);

//--> .section_horz-scroll Intro ✅ Refactor complete
const horzScrollIntro = function (trigger) {
  const bodyBlackout = gsap
    .timeline()
    .fromTo(
      headerOverlay,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: trigger,
          start: 'top 25%',
          end: 'top top',
          // markers: true,
          scrub: 1,
        },
      }
    )
    .to(
      'body',
      {
        scrollTrigger: {
          trigger: trigger,
          toggleClass: 'background-color-black',
          start: 'top top',
          end: 'bottom bottom',
          // markers: true,
        },
      },
      '<'
    );

  // section_horz-scroll [Scale IN]
  const horzScale = gsap.fromTo(
    brandingPanel,
    { ease: 'none', scale: 0.25, borderRadius: '10rem' },
    {
      ease: 'none',
      scale: 1.0,
      borderRadius: '0rem',
      scrollTrigger: {
        trigger: brandingPanel,
        start: 'top bottom',
        end: 'top 25%',
        scrub: 0.5,
        ease: 'power4.in',
      },
    }
  );
};

horzScrollIntro(sectionHomeIntro);

//--> .section_horz-scroll Panel Animations ✅ Refactor complete

// Horizontal Scroller Init
let tlHorz = gsap
  .timeline({
    scrollTrigger: {
      trigger: sectionHomeIntro,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  })
  .to('[dn-element="horizontal-track"]', {
    xPercent: -100,
    ease: 'none',
  });

gsap.timeline({
  scrollTrigger: {
    trigger: brandingPanel,
    start: 'left left',
    end: 'right right',
    scrub: true,
    containerAnimation: tlHorz,
    // markers: true,
  },
});

// Horizontal Scroll Panels
const horzTitles = function (
  title,
  panel,
  xStart = -100,
  xEnd = 100,
  start = 'left 100%',
  end = 'left -100%'
) {
  gsap.fromTo(
    title,
    {
      xPercent: xStart,
    },
    {
      xPercent: xEnd,
      ease: 'none',
      scrollTrigger: {
        containerAnimation: tlHorz,
        trigger: panel,
        start: start,
        end: end,
        scrub: true,
        // markers: true,
        ease: 'none',
      },
    }
  );
};

horzTitles(brandingTitle, brandingPanel, 0, 100, 'center 50%', 'center -50%');
horzTitles(webTitle, webPanel);
horzTitles(productTitle, productPanel);
horzTitles(outroTitle, outroPanel, -75, 25);

// Outro Image [Scale IN]
gsap.fromTo(
  outroImage,
  {
    scale: 0.25,
    borderRadius: '5rem',
    xPercent: -100,
    opacity: 0,
  },
  {
    scale: 1.05,
    borderRadius: '0rem',
    xPercent: 50,
    opacity: 0.8,
    ease: 'none',
    scrollTrigger: {
      containerAnimation: tlHorz,
      trigger: outroPanel,
      start: 'left 50%',
      end: 'right right',
      scrub: true,
      // markers: true,
      ease: 'none',
    },
  }
);

//--> .section_home-about parallex ✅ Refactor complete

// .home-about_title [Reveal Animation]
document.querySelectorAll('#home-about_title').forEach(function (element) {
  gsap.fromTo(
    element.getElementsByClassName('word'),
    {
      opacity: 0,
      y: '50%',
    },
    {
      y: '0%',
      opacity: 1,
      duration: 3,
      ease: 'expo.out',
      stagger: 0.3,
      onComplete: () => SplitType.revert(element),
      scrollTrigger: {
        trigger: sectionHomeIntro,
        start: 'bottom top',
      },
    }
  );
});

const aboutScrollImage = gsap.utils.toArray('.home-about_scroll-image-wrapper');
const aboutScrollText = gsap.utils.toArray('.home-about_scroll-text');

aboutScrollImage.forEach((el, i) => {
  gsap.to(el, {
    yPercent: -(i - 1) * 5 - 100,
    scrollTrigger: {
      trigger: el,
      start: 'top-=25 bottom+=25',
      end: 'top top',
      scrub: 1,
    },
  });
});

//--> .section_home-projects

// .home-projects_revealer [Reveal]
const revealProjects = function () {
  projectRevealer.forEach(function (el, i) {
    gsap.to(el, {
      width: '100%',
      duration: 0.75,
      delay: i * 0.2,
      repeat: 1,
      onStart: () => {
        projectList.classList.add('pointer-events-off');
      },
      onComplete: () => {
        projectList.classList.remove('pointer-events-off');
      },
      yoyo: true,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: sectionHomeAbout,
        start: 'bottom center',
        // markers: true,
      },
    });
  });

  projectTitleWrapper.forEach(function (el, i) {
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: i * 0.3,
        ease: 'power4.in',
        scrollTrigger: {
          trigger: sectionHomeAbout,
          start: 'bottom center',
          // markers: true,
        },
      }
    );
  });
};

revealProjects();

//home-projects_item-link [Hover]
projectLink.forEach((el, i) => {
  const tl = gsap
    .timeline({
      paused: true,
      zIndex: `${(i + 1) * 3}`,
      defaults: { duration: 0.5, ease: 'sine.inOut' },
    })
    .to(projectTitleWrapper[i], {
      color: 'var(--color-key)',
      padding: '0rem',
    })
    .fromTo(
      projectTypeWrapper[i],
      { opacity: 0, yPercent: 25 },
      {
        opacity: 1,
        yPercent: 0,
      },
      '<'
    )
    .from(
      projectImageWrapper[i],
      {
        height: '0rem',
      },
      '<'
    );

  el.addEventListener('mouseenter', () => {
    gsap.to(projectTitleWrapper, { opacity: 0.25 });
    gsap.to(projectTitleWrapper[i], { opacity: 1, duration: 0.5 });
    tl.play();
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(projectTitleWrapper, { opacity: 1, duration: 0.5 });
    tl.reverse();
  });
});

//--> .section_home-services Card Animations
const servicesComponent = gsap.utils.toArray('[dn-component="services"]');

const servicesFadeIn = function () {
  servicesComponent.forEach(function (el, i) {
    gsap.fromTo(
      el.children,
      { opacity: 0, xPercent: -99 },
      {
        opacity: 1,
        xPercent: 0,
        stagger: { amount: 0.3, from: 'random' },
        ease: 'sine.out',
        scrollTrigger: {
          trigger: el.children,
          start: 'top bottom',
          end: 'bottom center-=15%',
          toggleActions: 'play none none reverse',
          scrub: 1,
        },
      }
    );
  });
};

servicesFadeIn();

//--> .section_home-designs Scroll Animation
const designsScroll = function () {
  document
    .querySelectorAll('.home-designs_item:nth-child(even)')
    .forEach(function (el, i) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      tl.to(el, {
        yPercent: -100,
        duration: 2,
      });
    });

  document
    .querySelectorAll('.home-designs_item:nth-child(odd)')
    .forEach(function (el, i) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      tl.to(el, {
        yPercent: 25,
        duration: 2,
      });
    });
};

designsScroll();

//////////////////////////////////////////////////////////////////////////////
// --GSAP Flip

// // Flip Selectors
// const brandButtonContainer = document.querySelector('.brand-button-container');
// const footerButtonContainer = document.querySelector(
//   '.footer-button-container'
// );

// //--> .button-contact FLIP into brand container
// function moveButtonInto(element) {
//   let state = Flip.getState(buttonContact);
//   element.appendChild(buttonContact);
//   Flip.from(state, {
//     duration: 1,
//     ease: 'power4.out',
//   });
// }

// // When scrolling out-of and back-into the hero
// ScrollTrigger.create({
//   trigger: footerButtonContainer,
//   start: 'top center',
//   end: 'bottom center',
//   // markers: true,
//   onEnter: () => {
//     moveButtonInto(footerButtonContainer);
//     buttonContact.classList.add('is-white');
//   },
//   onLeaveBack: () => {
//     moveButtonInto(brandButtonContainer);
//     buttonContact.classList.remove('is-white');
//   },
// });

//////////////////////////////////////////////////////////////////////////////
// --BARBA

//////////////////////////////////////////////////////////////////////////////
//--OTHER
