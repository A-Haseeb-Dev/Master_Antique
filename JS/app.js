(function () {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const hero = document.getElementById('hero');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }

  if (navbar) {
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      navbar.classList.toggle('scrolled', currentScroll > 60);
    }, { passive: true });
  }

  if (hero) {
    (function () {
      const track = hero.querySelector('.hero-track');
      const slides = Array.from(track.children);
      const prevBtn = hero.querySelector('.prev');
      const nextBtn = hero.querySelector('.next');
      const indicatorsContainer = hero.querySelector('.hero-indicators');
      const progressBar = hero.querySelector('.hero-progress');

      if (!track || slides.length === 0) return;

      slides.forEach(function (s, i) { s.dataset.index = i; });

      let current = 0;
      const count = slides.length;
      const autoplayInterval = 6000;
      let autoplayTimer = null;
      let progressTimer = null;
      let progressStart = null;

      slides.forEach(function (_, i) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hero-dot';
        btn.setAttribute('aria-label', 'Slide ' + (i + 1));
        if (i === 0) btn.classList.add('active');
        btn.addEventListener('click', function () { goTo(i); restartAutoplay(); });
        indicatorsContainer.appendChild(btn);
      });
      const indicators = Array.from(indicatorsContainer.children);

      function update() {
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        indicators.forEach(function (b, i) {
          b.classList.toggle('active', i === current);
        });
        slides.forEach(function (s, i) {
          s.classList.toggle('active', i === current);
        });
        if (progressBar) progressBar.style.width = '0%';
      }

      function goTo(index) {
        current = ((index % count) + count) % count;
        update();
      }

      if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); restartAutoplay(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); restartAutoplay(); });

      function startProgress() {
        if (!progressBar) return;
        stopProgress();
        progressStart = Date.now();
        (function frame() {
          var elapsed = Date.now() - progressStart;
          var pct = Math.min((elapsed / autoplayInterval) * 100, 100);
          progressBar.style.width = pct + '%';
          if (pct < 100) progressTimer = requestAnimationFrame(frame);
        })();
      }

      function stopProgress() { if (progressTimer) { cancelAnimationFrame(progressTimer); progressTimer = null; } }

      function startAutoplay() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        stopAutoplay();
        startProgress();
        autoplayTimer = setInterval(function () { goTo(current + 1); }, autoplayInterval);
      }

      function stopAutoplay() { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } stopProgress(); }
      function restartAutoplay() { stopAutoplay(); startAutoplay(); }

      hero.addEventListener('mouseenter', stopAutoplay);
      hero.addEventListener('mouseleave', startAutoplay);
      hero.addEventListener('focusin', stopAutoplay);
      hero.addEventListener('focusout', startAutoplay);

      hero.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { goTo(current - 1); restartAutoplay(); }
        if (e.key === 'ArrowRight') { goTo(current + 1); restartAutoplay(); }
      });

      var startX = 0, deltaX = 0, isTouching = false;
      hero.addEventListener('touchstart', function (e) {
        isTouching = true; startX = e.touches[0].clientX; deltaX = 0;
        track.style.transition = 'none'; stopAutoplay();
      }, { passive: true });

      hero.addEventListener('touchmove', function (e) {
        if (!isTouching) return;
        deltaX = e.touches[0].clientX - startX;
        track.style.transform = 'translateX(calc(-' + (current * 100) + '% + ' + deltaX + 'px))';
      }, { passive: true });

      hero.addEventListener('touchend', function () {
        isTouching = false; track.style.transition = '';
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) goTo(current - 1); else goTo(current + 1);
        } else { goTo(current); }
        startAutoplay();
      });

      window.addEventListener('resize', update);
      update();
      startAutoplay();
    })();
  }

  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  var currentPage = window.location.pathname.split('/').pop() || 'Index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === currentPage || href === './' + currentPage) {
      a.classList.add('active');
    }
  });

  var statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var text = el.textContent;
          var num = parseFloat(text.replace(/[^0-9.]/g, ''));
          var suffix = text.replace(/[0-9.]/g, '');
          if (!isNaN(num) && num < 10000) {
            var duration = 2000;
            var startTime = null;
            (function animate(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.floor(eased * num) + suffix;
              if (progress < 1) requestAnimationFrame(animate);
              else el.textContent = text;
            })(performance.now());
          }
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(function (el) { statObserver.observe(el); });
  }

  /* ─── Contact Form ─── */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {
        name: document.getElementById('contact-name') ? document.getElementById('contact-name').value.trim() : '',
        email: document.getElementById('contact-email') ? document.getElementById('contact-email').value.trim() : '',
        phone: document.getElementById('contact-phone') ? document.getElementById('contact-phone').value.trim() : '',
        reference: document.getElementById('contact-reference') ? document.getElementById('contact-reference').value.trim() : '',
        message: document.getElementById('contact-message') ? document.getElementById('contact-message').value.trim() : '',
        date: new Date().toLocaleString(),
        read: false
      };
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in name, email, and message.');
        return;
      }
      var inquiries = [];
      try { inquiries = JSON.parse(localStorage.getItem('ma_inquiries')) || []; } catch (e) {}
      inquiries.push(data);
      localStorage.setItem('ma_inquiries', JSON.stringify(inquiries));
      contactForm.reset();
      alert('Thank you for your inquiry. Our team will respond within 24 hours.');
    });
  }

  /* ─── Social Tray Toggle ─── */
  document.querySelectorAll('.social-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var tray = this.closest('.social-float');
      tray.classList.toggle('open');
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.social-float.open').forEach(function (tray) {
      if (!tray.contains(e.target)) tray.classList.remove('open');
    });
  });

  var hoverCards = document.querySelectorAll('.product-card, .featured-card, .value-card, .testimonial-card, .contact-info-card');
  hoverCards.forEach(function (card) {
    card.addEventListener('mouseenter', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });

})();
