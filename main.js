/**
 * @version 0.2.5
 * @author davron-design.com
 */

'use strict';
console.log('local dev');

//--GLOBAL
// Selects
const bgBrand = document.querySelector('#bg-brand');
const brandLogo = document.querySelector('#brand-logo');
const brandLink = document.querySelector('#brand-link');
const buttonContact = document.querySelector('#button-contact');

// Nav Selects
const navLink = document.querySelectorAll('.nav-link');
const navContainer = document.querySelector('.nav-container');
const navMenu = document.querySelector('.nav-menu');
const navMenuSidebar = document.querySelector('.nav-menu-sidebar');
const navButton = document.querySelector('.nav-button');

//--SWIPER

//--> Swiper Main [Horizontal]
const classRemover = function () {
  const classesToRemove = [
    'text-color-main',
    'text-color-a1',
    'text-color-a2',
    'text-color-a3',
    'text-color-a4',
    'text-color-stroke-main',
    'text-color-stroke-a1',
    'text-color-stroke-a2',
    'text-color-stroke-a3',
    'text-color-stroke-a4',
    'is-main',
    'is-about',
    'is-work',
    'is-service',
    'is-contact',
    'is-active',
  ];

  brandLogo.classList.remove(...classesToRemove);
  bgBrand.classList.remove(...classesToRemove);
  buttonContact.classList.remove(...classesToRemove);
};

const classMap = {
  0: {
    textColor: 'text-color-main',
    strokeColor: 'text-color-stroke-main',
    contactClass: 'is-main',
  },
  1: {
    textColor: 'text-color-a1',
    strokeColor: 'text-color-stroke-a1',
    contactClass: 'is-about',
  },
  2: {
    textColor: 'text-color-a2',
    strokeColor: 'text-color-stroke-a2',
    contactClass: 'is-work',
  },
  3: {
    textColor: 'text-color-a3',
    strokeColor: 'text-color-stroke-a3',
    contactClass: 'is-service',
  },
  4: {
    textColor: 'text-color-a4',
    strokeColor: 'text-color-stroke-a4',
    contactClass: 'is-contact',
  },
};

const swiperMain = new Swiper('.swiper.is-main', {
  mousewheel: { enabled: false },
  threshold: 5,
  observer: true,
  observeParents: true,
  loop: true,
  watchSlidesProgress: true,
  grabCursor: true,
  effect: 'creative',
  slidesPerGroupAuto: false,
  creativeEffect: {
    next: { shadow: true, translate: ['100%', 0, 0] },
    prev: {
      rotate: [0, 40, 0],
      shadow: true,
      translate: ['-100%', '0%', -2000],
    },
    limitProgress: 5,
  },
  speed: 600,
  keyboard: { enabled: true },
  freeMode: {
    sticky: true,
    enabled: true,
    // momentum: true,
    // momentumBounce: true,
    // momentumRatio: 0.5,
  },
  resistanceRatio: 1,
  on: {
    slideChange: function () {
      const realIndex = swiperMain.realIndex;
      classRemover();

      if (classMap.hasOwnProperty(realIndex)) {
        const { textColor, strokeColor, contactClass } = classMap[realIndex];
        brandLogo.classList.add(textColor);
        bgBrand.classList.add(strokeColor);
        buttonContact.classList.add(contactClass);
      }

      if (realIndex === 0 || realIndex === 3) {
        brandLink.classList.remove('is-white');
      } else {
        brandLink.classList.add('is-white');
      }
    },
  },

  // hashNavigation: {
  //   watchState: true,
  // },

  // history: {
  //   enabled: true,
  //   keepQuery: false,
  //   replaceState: true,
  //   key: '',
  // },
});

swiperMain.init();

//--> Swiper Sections [Vertical]
function swiperSection(className) {
  {
    return new Swiper('.swiper.' + className, {
      direction: 'vertical',
      grabCursor: true,
      effect: 'creative',
      coverflowEffect: { depth: 1000, rotate: 90, scale: 1.25, modifier: 1.3 },
      cubeEffect: { slideShadows: false, shadow: false, shadowScale: 1 },
      creativeEffect: {
        prev: {
          translate: ['0%', 0, -500],
          rotate: [60, 0, 0],
          scale: 0.5,
          shadow: false,
        },
        next: {
          translate: ['0%', '120%', 0],
          rotate: [-60, 0, 0],
          scale: 0.5,
          shadow: false,
        },
        limitProgress: 5,
      },
      speed: 900,
      mousewheel: { enabled: true },
      parallax: { enabled: true },
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      threshold: 5,
      slidesPerGroupAuto: false,

      keyboard: { enabled: true },
      mousewheel: { enabled: true },
      slidesPerGroupAuto: false,

      resistanceRatio: 0.5,
      pagination: {
        type: 'progressbar',
        clickable: true,
        dynamicBullets: true,
        el: '.swiper-pagination.' + className,
      },
    });
  }
}

const swiperHome = swiperSection('is-home');
const swiperAbout = swiperSection('is-about');
const swiperWork = swiperSection('is-work');
const swiperService = swiperSection('is-service');

//--> Swiper Embedded
const swiperCarousel = new Swiper('.swiper.is-carousel', {
  centeredSlides: true, // Important!
  nested: true, // Important!
  slidesPerView: 'auto',

  // spaceBetween: 16,
  // autoHeight: true,
  // grabCursor: true,
  slideToClickedSlide: true,
  freeMode: {
    enabled: true,
    momentum: true,
    momentumBounce: false,
    momentumRatio: 0.2,
  },
  keyboard: { enabled: true },
  watchSlidesProgress: true,
  observer: true,
  observeParents: true,
  threshold: 5,
});

//--GSAP
// const toggleMenu = function () {
//   const nav = gsap.timeline({ paused: true });
//   gsap.set(navMenu, { display: 'none' });
//   nav
//     .fromTo(
//       navContainer,
//       { width: '4rem', height: '4rem' },
//       {
//         width: '23rem',
//         height: '26rem',
//         duration: 0.25,
//         ease: 'sine.in',
//       }
//     )
//     .set(navMenu, { display: 'flex' }, '>')
//     .fromTo(
//       navMenu,
//       { opacity: 0, yPercent: 15 },
//       {
//         opacity: 1,
//         yPercent: 0,
//         duration: 0.5,
//         ease: 'none',
//       },
//       '<'
//     );

//   let isActive = false;

//   navButton.addEventListener('click', () => {
//     isActive = !isActive;
//     if (isActive) {
//       nav.play();
//     } else {
//       nav.reverse();
//     }
//   });
// };
