// Navbar Hamburger functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Carousel functionality
    // const slides = document.querySelector(".slides");
    // const images = document.querySelectorAll(".slides img");
    // const prevBtn = document.querySelector(".prev");
    // const nextBtn = document.querySelector(".next");

    // let index = 0;

    // function showSlide(i) {
    //   index = (i + images.length) % images.length;
    //   slides.style.transform = `translateX(-${index * 100}%)`;
    // }

    // prevBtn.addEventListener("click", () => showSlide(index - 1));
    // nextBtn.addEventListener("click", () => showSlide(index + 1));

    // setInterval(() => showSlide(index + 1), 4000); // Auto slide every 4s



    // CAROUSEL logic (IIFE to avoid globals)
  (function(){
    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    const track = document.getElementById('track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const indicatorsContainer = document.getElementById('indicators');

    let current = 0;
    const count = slides.length;
    const autoplayInterval = 4000; // ms
    let autoplayTimer = null;

    // create indicators
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', `Go to slide ${i+1}`);
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => { goTo(i); restartAutoplay(); });
      indicatorsContainer.appendChild(btn);
    });
    const indicators = Array.from(indicatorsContainer.children);

    function update(){
      // position track
      track.style.transform = `translateX(-${current * 100}%)`;
      // active indicator
      indicators.forEach((b, i) => b.classList.toggle('active', i === current));
    }

    function goTo(index){
      current = ((index % count) + count) % count; // positive modulo
      update();
    }

    prevBtn.addEventListener('click', ()=> { goTo(current - 1); restartAutoplay(); });
    nextBtn.addEventListener('click', ()=> { goTo(current + 1); restartAutoplay(); });

    // autoplay with single timer
    function startAutoplay(){
      // do not autoplay if user prefers reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      stopAutoplay();
      autoplayTimer = setInterval(()=> goTo(current + 1), autoplayInterval);
    }
    function stopAutoplay(){ if (autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer = null; } }
    function restartAutoplay(){ stopAutoplay(); startAutoplay(); }

    // pause on hover/focus
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // keyboard navigation when carousel focused
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { goTo(current - 1); restartAutoplay(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); restartAutoplay(); }
    });

    // touch/swipe support
    let startX = 0, deltaX = 0, isTouching = false;
    carousel.addEventListener('touchstart', (e) => {
      isTouching = true;
      startX = e.touches[0].clientX;
      deltaX = 0;
      // temporarily disable transition for direct follow
      track.style.transition = 'none';
      stopAutoplay();
    }, {passive:true});

    carousel.addEventListener('touchmove', (e) => {
      if (!isTouching) return;
      deltaX = e.touches[0].clientX - startX;
      track.style.transform = `translateX(calc(-${current * 100}% + ${deltaX}px))`;
    }, {passive:true});

    carousel.addEventListener('touchend', () => {
      isTouching = false;
      // restore transition (empty string unsets inline style so CSS rule applies)
      track.style.transition = '';
      const threshold = 50; // px
      if (Math.abs(deltaX) > threshold){
        if (deltaX > 0) goTo(current - 1);
        else goTo(current + 1);
      } else {
        goTo(current);
      }
      startAutoplay();
    });

    // on resize ensure correct transform (keeps track in right position)
    window.addEventListener('resize', update);

    // initialize
    update();
    startAutoplay();
  })();