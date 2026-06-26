document.addEventListener('DOMContentLoaded', () => {
  
  /* ── SCROLL REVEAL (INTERSECTION OBSERVER) ──────────────── */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        // Unobserve to run the animation only once
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  /* ── TYPEWRITER EFFECT ──────────────────────────────────── */
  const typewriterElement = document.getElementById('typewriter');
  const words = [
    "Product Engineer", 
    "UI/UX Designer", 
    "AI Developer"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Remove a character
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Delete faster
    } else {
      // Add a character
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 120; // Type slightly slower
    }

    // Word is fully typed
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at the end of the word
    } 
    // Word is fully deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex++;
      // Loop back to the first word
      if (wordIndex === words.length) {
        wordIndex = 0;
      }
      typeSpeed = 500; // Pause before typing the next word
    }

    setTimeout(type, typeSpeed);
  }

  // Start the typewriter effect
  if (typewriterElement) {
    setTimeout(type, 1000); // Initial delay before it starts
  }

});