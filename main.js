/**
 * @version 0.1
 * @author davron-design.com
 */

'use strict';
console.log(`local dev`);

//////////////////////////////////////////////////////////////////////////////
//--SWIPER

//--> Swiper Main [Horizontal]
const swiperMain = new Swiper('.swiper.is-main', {
  mousewheel: { enabled: true },
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
      translate: ['-100%', '0%', -1000],
    },
    limitProgress: 5,
  },
  lazy: { enabled: true },
  speed: 500,
  keyboard: { enabled: true },
  freeMode: { sticky: true, enabled: true },
  resistanceRatio: 1,
});

//--> Swiper Sections [Vertical]
const swiperHome = new Swiper('.swiper.is-home', {
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  loop: true,

  direction: 'vertical',
});

const swiperAbout = new Swiper('.swiper.is-about', {
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  loop: true,

  direction: 'vertical',
});

const swiperWork = new Swiper('.swiper.is-work', {
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  loop: true,

  direction: 'vertical',
});

const swiperService = new Swiper('.swiper.is-service', {
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  loop: true,

  direction: 'vertical',
});

const swiperContact = new Swiper('.swiper.is-contact', {
  threshold: 5,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  grabCursor: true,
  loop: true,

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
