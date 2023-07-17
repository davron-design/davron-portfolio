/**
 * @version 0.1.5
 * @author davron-design.com
 */

'use strict';
console.log(`local dev`);

//--> Selects
const bgBrand = document.querySelector('#bg-brand');
const brandLogo = document.querySelector('#brand-logo');
const brandLink = document.querySelector('#brand-link');
const buttonContact = document.querySelector('#button-contact');

//////////////////////////////////////////////////////////////////////////////
//--SWIPER

//--> Swiper Main [Horizontal]
const classRemover = function () {
  brandLogo.classList.remove(
    'text-color-main',
    'text-color-a1',
    'text-color-a2',
    'text-color-a3',
    'text-color-a4'
  );
  bgBrand.classList.remove(
    'text-color-stroke-main',
    'text-color-stroke-a1',
    'text-color-stroke-a2',
    'text-color-stroke-a3',
    'text-color-stroke-a4'
  );
};

const classMap = {
  0: 'text-color-main',
  1: 'text-color-a1',
  2: 'text-color-a2',
  3: 'text-color-a3',
  4: 'text-color-a4',
};

const classStrokeMap = {
  0: 'text-color-stroke-main',
  1: 'text-color-stroke-a1',
  2: 'text-color-stroke-a2',
  3: 'text-color-stroke-a3',
  4: 'text-color-stroke-a4',
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
  lazy: { enabled: true },
  speed: 500,
  keyboard: { enabled: true },
  freeMode: { sticky: true, enabled: true },
  resistanceRatio: 1,
  on: {
    slideChange: function () {
      const realIndex = swiperMain.realIndex;
      classRemover();

      if (classMap.hasOwnProperty(realIndex)) {
        const newClass = classMap[realIndex];
        bgBrand.classList.add(newClass);
        brandLogo.classList.add(newClass);
      }

      if (classMap.hasOwnProperty(realIndex)) {
        const newClass = classMap[realIndex];
        const newClassStroke = classStrokeMap[realIndex];
        brandLogo.classList.add(newClass);
        bgBrand.classList.add(newClassStroke);
      }

      if (realIndex === 0 || realIndex === 3) {
        brandLink.classList.remove('is-white');
        buttonContact.classList.remove('is-white');
      } else {
        brandLink.classList.add('is-white');
        buttonContact.classList.add('is-white');
      }
    },
  },
});

//--> Swiper Sections [Vertical]
const swiperHome = new Swiper('.swiper.is-home', {
  modules: [SwiperGL],
  effect: 'gl',
  gl: { shader: 'morph-y' },

  mousewheel: { enabled: true },
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  resistanceRatio: 0.5,
  direction: 'vertical',
  pagination: {
    type: 'progressbar',
    clickable: true,
    dynamicBullets: true,
    el: '.swiper-pagination.is-home',
  },
});

const swiperAbout = new Swiper('.swiper.is-about', {
  modules: [SwiperGL],
  effect: 'gl',
  gl: { shader: 'morph-y' },

  mousewheel: { enabled: true },
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  resistanceRatio: 0.5,
  direction: 'vertical',
  pagination: {
    type: 'progressbar',
    clickable: true,
    dynamicBullets: true,
    el: '.swiper-pagination.is-about',
  },
});

const swiperWork = new Swiper('.swiper.is-work', {
  modules: [SwiperGL],
  effect: 'gl',
  gl: { shader: 'morph-y' },

  mousewheel: { enabled: true },
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  resistanceRatio: 0.5,
  direction: 'vertical',
  pagination: {
    type: 'progressbar',
    clickable: true,
    dynamicBullets: true,
    el: '.swiper-pagination.is-work',
  },
});

const swiperService = new Swiper('.swiper.is-service', {
  modules: [SwiperGL],
  effect: 'gl',
  gl: { shader: 'morph-y' },

  mousewheel: { enabled: true },
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  resistanceRatio: 0.5,
  direction: 'vertical',
  pagination: {
    type: 'progressbar',
    clickable: true,
    dynamicBullets: true,
    el: '.swiper-pagination.is-service',
  },
});

const swiperContact = new Swiper('.swiper.is-contact', {
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  resistanceRatio: 0.5,
  direction: 'vertical',
});

// let swiperNav = new Swiper('.swiper.is-nav', {
//   threshold: 5,
//   observer: true,
//   observeParents: true,
//   loop: true,
//   watchSlidesProgress: true,
//   grabCursor: true,
//   pagination: { type: 'progressbar' },
//   keyboard: { enabled: true },
//   centeredSlides: true,
//   slidesPerView: 3,
// });

// swiperNav.controller.control = swiperMain;
// swiperMain.controller.control = swiperNav;

// const swiperHome = new Swiper('.swiper.is-home', {
//   direction: 'vertical',
//   grabCursor: true,
//   keyboard: { enabled: true },
//   parallax: { enabled: true },
//   watchSlidesProgress: true,
//   observer: true,
//   observeParents: true,
//   resistanceRatio: 0,
//   threshold: 5,
//   slidesPerGroupAuto: false,
// });

// const swiperAbout = new Swiper('.swiper.is-about', {
//   direction: 'vertical',
//   grabCursor: true,
//   keyboard: { enabled: true },
//   parallax: { enabled: true },
//   watchSlidesProgress: true,
//   observer: true,
//   observeParents: true,
//   resistanceRatio: 0,
//   threshold: 5,
//   slidesPerGroupAuto: false,
// });

// const swiperCarousel = new Swiper('.swiper.is-carousel', {
//   slidesPerView: 2,
//   slidesPerGroup: 2,
//   centeredSlides: true,
//   grabCursor: true,
//   speed: 500,
//   freeMode: {
//     enabled: true,
//     sticky: true,
//     momentumBounceRatio: 0.2,
//     momentumRatio: 0.3,
//     momentumVelocityRatio: 0.3,
//   },
//   keyboard: { enabled: true },
//   watchSlidesProgress: true,
//   observer: true,
//   observeParents: true,
//   resistanceRatio: 0,
//   threshold: 5,
//   slidesPerGroupAuto: false,
// });
