// --- NAV hide on scroll ---
(() => {
  let lastScroll = 0;
  const nav = document.getElementById('nav');

  const onScroll = () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.classList.add('hide');
    } else {
      nav.classList.remove('hide');
    }
    lastScroll = currentScroll;

    // Parallax: animate the hero section
    if (currentScroll < window.innerHeight) {
      const hero = document.querySelector('#hero');
      if (hero) hero.style.transform = `translateY(${currentScroll * 0.5}px)`;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// --- Mobile menu toggle ---
(() => {
  const menu = document.getElementById('nav-menu');
  const toggleBtn = document.querySelector('[data-toggle="menu"]');
  if (!menu || !toggleBtn) return;

  const toggleMenu = () => {
    const isActive = menu.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', String(isActive));
  };

  const closeMenu = () => {
    menu.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Κλείσιμο με click σε links του menu
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
})();

// --- Intersection Observer for section animations ---
(() => {
  const options = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, options);

  document.querySelectorAll('section').forEach((section) => observer.observe(section));
})();

// --- Contact form: mailto handler ---
(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const subject = encodeURIComponent(formData.get('subject'));
    const body = encodeURIComponent(
      `Name: ${formData.get('name')}\n` +
      `Email: ${formData.get('email')}\n\n` +
      `Message:\n${formData.get('message')}`
    );

    window.location.href = `mailto:letisjamuco@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
})();

// --- Smooth scroll για εσωτερικά links ---
(() => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      // Αν το href είναι μόνο "#", αγνόησέ το
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

document.querySelector('.contact-form').addEventListener('submit', e => {
  e.target.reset();
  alert('Thank you! Your message has been sent successfully.');
});
