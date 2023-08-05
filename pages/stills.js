'use strict';

console.log('stills dev');

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

//--GLOBAL
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

createSwiper('is-stills');
