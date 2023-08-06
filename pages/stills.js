/**
 * @version 0.9.2.5
 * @author davron-design.com
 */

'use strict';

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
