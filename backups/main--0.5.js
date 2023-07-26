/**
 * @description Last SwiperJS implementation file. Switched due to big peformance issues
 * @version 0.4.5
 * @author davron-design.com
 */

'use strict';
console.log('local dev');

//--GLOBAL
// Selects
const bgBrand = document.querySelector('#bg-brand');
const brandLogo = document.querySelector('#brand-logo');
const brandLink = document.querySelector('#brand-link');
const buttonContact = document.querySelector('.button-contact');
const modalContact = document.querySelectorAll('.modal-card.is-contact');

// Nav Selects
const navLink = document.querySelectorAll('.nav-link');

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
  // General Parameters
  direction: 'horizontal',
  watchSlidesProgress: true,
  resistanceRatio: 1,

  // Navigation Parameters
  keyboard: { enabled: true },
  threshold: 5,
  grabCursor: true,

  // Animation Parameters
  effect: 'slide',
  speed: 1000,

  // Color Change on Slide Change
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

//--> Swiper Sections [Vertical]
function swiperSection(className) {
  {
    const slides = document.getElementsByClassName('swiper-slide');
    const slidesLength = slides.length;

    return new Swiper('.swiper.' + className, {
      // General Parameters
      nested: true,
      direction: 'vertical',
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      touchReleaseOnEdges: true,
      slidesPerGroupAuto: false,
      resistanceRatio: 0.7,

      // Navigation Parameters
      mousewheel: { enabled: true },
      keyboard: { enabled: true },
      threshold: 5,

      // Animation Parameters
      effect: 'creative',
      creativeEffect: {
        prev: {
          translate: ['0%', '0%', -1000],
          rotate: [45, 0, 0],
          scale: 1,
        },
        next: {
          translate: ['0%', '100%', -50],
          rotate: [-90, 0, 0],
          scale: 0.5,
        },
        limitProgress: 5,
      },
      parallax: { enabled: true },
      speed: 1000,

      // Pagination Parameters
      pagination: {
        type: 'progressbar',
        clickable: true,
        dynamicBullets: true,
        el: '.swiper-pagination.' + className,
      },

      // Smooth Slide Change
    });
  }
}

const swiperHome = swiperSection('is-home');
const swiperAbout = swiperSection('is-about');
const swiperWork = swiperSection('is-work');
const swiperService = swiperSection('is-service');

//--> Swiper About Nested
const swiperCarousel = new Swiper('.swiper.is-carousel', {
  centeredSlides: true, // Important!
  nested: true, // Important!
  slidesPerView: 'auto',

  grabCursor: false,
  slideToClickedSlide: true,
  freeMode: {
    enabled: true,
    momentumRatio: 0.5,
    momentumVelocityRatio: 0.5,
    momentumBounceRatio: 0.5,
  },
  watchSlidesProgress: true,
  observer: false,
  observeParents: true,
  threshold: 5,
});

//--COMP Functions

//--> Swiper Nav Goto
function goToSlide() {
  const navLinks = navLink.forEach((link, index) => {
    link.addEventListener('click', () => {
      swiperMain.slideToLoop(index, 1000);
    });
  });
}

goToSlide();

//--> Contact Button
function contactButton() {
  buttonContact.addEventListener('click', () => {
    swiperMain.slideToLoop(4, 1000);
  });

  modalContact.forEach((button) => {
    button.addEventListener('click', () => {
      swiperMain.slideToLoop(4, 1000);
    });
  });
}

contactButton();

//--> Service Details Modal
function modalScroll() {
  const scrollContainer = document.querySelectorAll('.swiper-slide-service');

  scrollContainer.forEach((container) => {
    container.addEventListener('mouseenter', () => {
      swiperService.disable();
    });
    container.addEventListener('mouseleave', () => {
      swiperService.enable();
    });
  });
}

modalScroll();

//--> Service Details Modal Mobile
function modalScrollMobile() {
  const scrollContainer = document.querySelectorAll(
    '.swiper-slide-service.no-scrollbar.is-mobile-modal'
  );
  const buttonView = document.querySelectorAll('.button-view.is-service');
  const closeButton = document.querySelectorAll('.modal-card.is-close-button');

  buttonView.forEach((button) => {
    button.addEventListener('click', () => {
      swiperService.disable();
    });
  });

  closeButton.forEach((button) => {
    button.addEventListener('click', () => {
      swiperService.enable();
    });
  });

  scrollContainer.forEach((container) => {
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

modalScrollMobile();
