'use strict';

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
    pagination: { type: 'progressbar', el: `.swiper-pagination.${className}` },
    loop: true,

    // Effects
    modules: [EffectTinder],
    parallax: { enabled: true },
    effect: 'tinder',
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
        trigger: homeComponent,
        start: 'top ',
        end: 'bottom ',
        scrub: 1.5,
      },
    })
    .to(homeComponent, {
      borderRadius: '2rem',
      scale: 0.8,
      yPercent: 35,
      ease: 'sine.out',
    })
    .to(
      '.heading-insert',
      {
        borderTopLeftRadius: '0rem',
        borderTopRightRadius: '0rem',
      },
      '>'
    );
}

headerAnim();

// Slide Sections
function sectionsAnim() {
  sectionSlide.forEach((e, i) => {
    gsap.to(e, {
      borderRadius: '0rem',
      scale: 1,
      scrollTrigger: {
        trigger: e,
        start: 'top',
        end: 'bottom center',
        // markers: true,
        scrub: 1.5,
      },
    });
  });
}

sectionsAnim();

// Heading Animations
function headingAnim() {
  const headings = gsap.utils.toArray(headingContent.children);
  let scaleVar = 1;
  function updateScaleVar() {
    scaleVar = window.matchMedia('(max-width: 575px)').matches ? 0.8 : 1;
  }

  updateScaleVar();
  window.addEventListener('resize', updateScaleVar());

  headings.forEach((e, i) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.heading-insert',
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
        ease: 'linear',
      },
    });

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
    .to(headingContent, { display: 'none' })
    .to(headingContact, { display: 'flex' });
}

headingAnim();

//--COMP Close Modal
function modalCloser() {
  const modalComponent = document.querySelectorAll('.modal-component');
  const closeButton = document.querySelectorAll('.modal-card.is-close-button');
  const buttonView = document.querySelectorAll('.button-view');

  buttonView.forEach((button) => {
    button.addEventListener('click', () => {
      modalComponent.forEach((container) => {
        container.scrollY = 0;
      });
    });
  });

  modalComponent.forEach((container) => {
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

modalCloser();

let windowWidth = window.innerWidth;
window.addEventListener('resize', function () {
  if (windowWidth !== window.innerWidth) {
    windowWidth = window.innerWidth;
    headingAnim();
    modalCloser();
    lenis.start();
  }
});
