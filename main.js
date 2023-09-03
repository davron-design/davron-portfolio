/**
 * @version 1.0.6
 * @author davron-design.com
 */

'use strict';
console.log(
  '%c Welcome to D_DESIGN v1.0.6',
  'background: #ff5621; color: #121212; display: block; padding:5px; padding-right: 10px; border-radius:4px;'
);

document.addEventListener('DOMContentLoaded', function () {
  //--GLOBAL
  // Home Selectors
  const headingContent = document.querySelector('[dn-heading="content"]');
  const headingContact = document.querySelector('.heading-contact');
  const sectionSlide = gsap.utils.toArray('[dn-slide]');
  const homeComponent = document.querySelector('.home_component');
  const servicesComponent = document.querySelector('.services_component');

  // Works Selectors
  const projectHeader = document.querySelector('[dn-section="project-header"]');
  const workHeadingContent = document.querySelector(
    '[dn-heading="content-project"]'
  );

  //--COMP Top Button
  const buttonTop = document.querySelector('.button-top');
  buttonTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  //--LENIS
  // Lenis Selectors
  const lenisStart = document.querySelectorAll('[data-lenis-start]');
  const lenisStop = document.querySelectorAll('[data-lenis-stop]');
  const lenisToggle = document.querySelectorAll('[data-lenis-toggle]');

  // Lenis Init
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
    gsap.ticker.lagSmoothing(0);
  }

  connectToScrollTrigger();

  //--SWIPER

  //--> Home Section Swiper
  function createSwiper(className) {
    return new Swiper(`.swiper.${className}`, {
      // General Parameters
      speed: 700,
      threshold: 5,
      watchSlidesProgress: true,
      slidesPerGroupAuto: false,
      lazy: {
        enabled: true,
        loadPrevNext: true,
      },

      // Navigation
      grabCursor: true,
      keyboard: { enabled: true },
      pagination: {
        type: 'progressbar',
        el: `.swiper-pagination.${className}`,
      },
      navigation: {
        prevEl: `.swiper-arrow-prev.${className}`,
        nextEl: `.swiper-arrow-next.${className}`,
      },
      rewind: true,

      // Effects
      parallax: { enabled: false },
      effect: 'creative',
      creativeEffect: {
        next: { shadow: true, translate: ['100%', 0, 100] },
        prev: { shadow: true, translate: ['-50%', 0, -1] },
        limitProgress: 5,
      },
    });
  }

  createSwiper('is-about');
  createSwiper('is-works');
  createSwiper('is-services');

  //--> Stills Swiper
  function stillsSwiper(className) {
    return new Swiper(`.swiper.${className}`, {
      // General Parameters
      speed: 1000,
      threshold: 5,
      watchSlidesProgress: true,
      slidesPerGroupAuto: false,
      lazy: {
        enabled: true,
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

  //--GSAP

  let mm = gsap.matchMedia();

  //--> Home Header ANimation
  function headerAnim(component, yVal) {
    gsap.to(component, {
      borderRadius: '2rem',
      scale: 0.8,
      yPercent: yVal,
      ease: 'sine.out',
      scrollTrigger: {
        trigger: component,
        start: 'top ',
        end: 'bottom center',
        scrub: 1.5,
      },
    });
  }

  headerAnim(homeComponent, 20);
  headerAnim(projectHeader, 10);

  //--> Heading Insert Animation
  function headingAnim(headingComp, scalMobVal, yVal, start, end) {
    // Check if headingContent is available
    if (!headingComp) {
      return;
    }
    const headings = gsap.utils.toArray(headingComp.children);
    const scaleDesktop = 1;
    const scaleMobile = scalMobVal;

    headings.forEach((e, i) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.heading-insert',
          start: `${start}`,
          end: `${end}`,
          scrub: 0.75,
          ease: 'linear',
        },
      });

      // mobile version
      mm.add('(max-width: 768px)', () => {
        tl.fromTo(
          e,
          { opacity: 0, yPercent: 0, scale: scaleMobile },
          {
            opacity: 1,
            yPercent: yVal * i,
            scale: scaleMobile + 0.1 * i,
            delay: 0.3 * i,
          }
        ).to(e, { opacity: `${(i - 0.5) * 0.5}` });
      });

      // desktop version
      mm.add('(min-width: 767px)', () => {
        tl.fromTo(
          e,
          { opacity: 0, yPercent: 0, scale: scaleDesktop },
          {
            opacity: 1,
            yPercent: yVal * i,
            scale: scaleDesktop + 0.1 * i,
            delay: 0.3 * i,
          }
        ).to(e, { filter: `blur(${(headings.length - i - 1) * 0.5}rem)` });
      });
    });
  }

  headingAnim(headingContent, 0.75, -25, 'top center', 'bottom top');
  headingAnim(workHeadingContent, 0.8, 100, 'top center+=25%', 'bottom center');

  //--> Section Scroll Animations
  function sectionsAnim() {
    sectionSlide.forEach((e, i) => {
      gsap.to(e, {
        borderRadius: '0rem',
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: e,
          start: 'top',
          end: 'bottom center+=15%',
          ease: 'sine.in',
          scrub: 1,
        },
      });
    });
  }

  sectionsAnim();

  //--> Helper: Swap Heading with Contact
  function headingSwap() {
    const tlEnd = gsap.timeline({
      scrollTrigger: {
        trigger: servicesComponent,
        start: 'top top',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      },
    });
    tlEnd
      .set(headingContent, { display: 'none' })
      .set(headingContact, { display: 'flex' });
  }

  headingSwap();

  //--JS

  //--> Close Modal
  function modalCloser() {
    const modalComponent = document.querySelectorAll('.modal-component');
    const closeButton = document.querySelectorAll(
      '.modal-card.is-close-button'
    );
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

  //--> Reload Page on Resize
  let windowWidth = window.innerWidth;
  window.addEventListener('resize', function () {
    if (windowWidth !== window.innerWidth) {
      windowWidth = window.innerWidth;
      location.reload();
      modalCloser();
      lenis.start();
      ScrollTrigger.update();
    }
  });
});
