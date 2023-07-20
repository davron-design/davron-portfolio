/**
 * @version 0.4
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
  mousewheel: { enabled: false },
  threshold: 5,
  observer: false,
  observeParents: false,
  loop: true,
  watchSlidesProgress: true,
  grabCursor: true,

  effect: 'creative',
  slidesPerGroupAuto: false,
  creativeEffect: {
    next: { shadow: false, translate: ['100%', 0, -500] },
    prev: {
      rotate: [0, 40, 0],
      shadow: false,
      translate: ['-100%', '0%', -2000],
    },
    limitProgress: 5,
  },
  speed: 800,

  // autoplay: {
  //   pauseOnMouseEnter: true,
  //   delay: 5000,
  //   enabled: true,
  // },

  keyboard: { enabled: true },
  freeMode: {
    sticky: true,
    enabled: true,
    momentumRatio: 0.5,
    momentumVelocityRatio: 1,
    momentumBounceRatio: 0.5,
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

//--> Swiper Sections [Vertical]
function swiperSection(className) {
  {
    const slides = document.getElementsByClassName('swiper-slide');
    const slidesLength = slides.length;

    return new Swiper('.swiper.' + className, {
      nested: true,
      direction: 'vertical',
      grabCursor: true,
      effect: 'creative',
      coverflowEffect: { depth: 1000, rotate: 90, scale: 1.25, modifier: 1.3 },
      cubeEffect: { slideShadows: false, shadow: false, shadowScale: 1 },
      creativeEffect: {
        prev: {
          translate: ['0%', '0%', -1000],
          rotate: [45, 0, 0],
          scale: 1,
          shadow: false,
        },
        next: {
          translate: ['0%', '100%', -50],
          rotate: [-90, 0, 0],
          scale: 0.5,
          shadow: false,
        },
        limitProgress: 5,
      },
      speed: 1000,
      mousewheel: { enabled: true, releaseOnEdges: false },
      touchReleaseOnEdges: true,
      parallax: { enabled: true },
      watchSlidesProgress: true,
      threshold: 5,
      slidesPerGroupAuto: false,

      on: {
        slideChange: (swiper) => {
          const { offsetTop } = swiper.el;
          window.scrollY !== offsetTop &&
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
        },
        slideChangeTransitionEnd: (swiper) => {
          const activeIndex = swiper.activeIndex;
          swiper.params.mousewheel.releaseOnEdges =
            activeIndex === 0 || activeIndex === slidesLength - 1;
        },
      },

      observer: false, // check if needed!
      observeParents: true, // check if needed!

      keyboard: { enabled: true },
      mousewheel: { enabled: true },
      slidesPerGroupAuto: false,
      lazy: { enabled: false },

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

//--> Swiper About Nested
const swiperCarousel = new Swiper('.swiper.is-carousel', {
  centeredSlides: true, // Important!
  nested: true, // Important!
  slidesPerView: 'auto',

  grabCursor: false,
  slideToClickedSlide: true,
  freeMode: {
    enabled: true,
    momentum: true,
    momentumBounce: false,
    momentumRatio: 0.2,
  },
  keyboard: { enabled: true },
  watchSlidesProgress: true,
  observer: false,
  observeParents: true,
  threshold: 5,
});

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
}

contactButton();

//--> Service Details Modal
function modalScroll() {
  const scrollContainer = document.querySelectorAll('.swiper-slide-service');

  scrollContainer.forEach((container) => {
    container.addEventListener('mouseenter', () => {
      swiperService.disable(); // Disable mousewheel control when the cursor enters the scroll container
    });
    container.addEventListener('mouseleave', () => {
      swiperService.enable(); // Enable mousewheel control when the cursor leaves the scroll container
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
