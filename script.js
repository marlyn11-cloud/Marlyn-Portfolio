// Typewriter Effect
const phrases = [
    'Product Engineer',
    'UI/UX Designer',
    'AI Builder',
    'Full-Stack Developer',
];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
    if (!el) return; // Guard clause prevents crashes
    const current = phrases[pi];
    
    if (!deleting) {
        el.textContent = current.slice(0, ++ci);
        if (ci === current.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
    } else {
        el.textContent = current.slice(0, --ci);
        if (ci === 0) {
            deleting = false;
            pi = (pi + 1) % phrases.length;
            setTimeout(type, 300);
            return;
        }
    }
    setTimeout(type, deleting ? 45 : 75);
}

// Scroll Reveal with Independent Delay
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Removed 'i' index to ensure consistent fade-in timing
            setTimeout(() => entry.target.classList.add('visible'), 50);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => obs.observe(el));

// Precise Active Nav Highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(s => {
        // getBoundingClientRect calculates positions relative to the viewport
        const rect = s.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            current = s.id;
        }
    });

    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--off-white)' : '';
    });
}, { passive: true });

// Safely initialize the script once DOM loads
document.addEventListener('DOMContentLoaded', () => {
    type();
});
