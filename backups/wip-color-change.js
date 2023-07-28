//--> Nav Color Change
function navColorChange() {
  const logoColors = [
    'var(--color-main)',
    'var(--color-a1)',
    'var(--color-a2)',
    'var(--color-a3)',
    'var(--color-a4)',
  ];
  gsap.set(brandLogo, { color: gsap.utils.wrap(logoColors) });

  sections.forEach((e, i) => {
    console.log(e, logoColors[i]);
    ScrollTrigger.create({
      trigger: e,
      start: 'top center',
      end: 'bottom center',
      markers: true,
      animation: gsap.to(brandLogo, {
        color: logoColors[i],
        // immediateRender: false,
      }),
      // .to(buttonContact, { className: `${buttonClasses[i]}` }),
      toggleActions: 'play none none reverse',
    });
  });
}
navColorChange();

//--COMP
const classMap = {
  0: {
    textColor: 'text-color-main',
    contactClass: 'is-main',
    brandLinkClass: 'is-black',
  },
  1: {
    textColor: 'text-color-a1',
    contactClass: 'is-about',
    brandLinkClass: 'is-white',
  },
  2: {
    textColor: 'text-color-a2',
    contactClass: 'is-works',
    brandLinkClass: 'is-white',
  },
  3: {
    textColor: 'text-color-a3',
    contactClass: 'is-service',
    brandLinkClass: 'is-black',
  },
  4: {
    textColor: 'text-color-a4',
    contactClass: 'is-contact',
    brandLinkClass: 'is-white',
  },
};

const classRemover = function () {
  const classesToRemove = [
    'text-color-main',
    'text-color-a1',
    'text-color-a2',
    'text-color-a3',
    'text-color-a4',
    'is-main',
    'is-about',
    'is-works',
    'is-service',
    'is-contact',
    'is-white',
    'is-black',
  ];

  brandLogo.classList.remove(...classesToRemove);
  buttonContact.classList.remove(...classesToRemove);
  brandLink.classList.remove(...classesToRemove);
};
