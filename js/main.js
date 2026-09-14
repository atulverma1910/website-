/* =========================================
   EXPN AI — Main JavaScript
   ========================================= */

// ---- CALENDLY CONFIGURATION ----
// Paste your Calendly link below
const CALENDLY_URL = "PASTE_CALENDLY_LINK_HERE";

function openCalendly() {
    if (CALENDLY_URL && CALENDLY_URL !== "PASTE_CALENDLY_LINK_HERE") {
        window.open(CALENDLY_URL, '_blank');
    } else {
        console.log("Calendly URL not configured. Set CALENDLY_URL in main.js");
        // Scroll to CTA section as fallback
        document.querySelector('.section-cta')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ---- SCROLL ANIMATIONS ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with delays
function initScrollAnimations() {
    // Fade-up sections
    document.querySelectorAll('.section-header, .system-card, .step-card, .compare-col, .role-col, .paid-block, .cta-block, .nurture-block, .research-block').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // Timeline points
    document.querySelectorAll('.tl-point').forEach(el => observer.observe(el));

    // Bar chart rows
    document.querySelectorAll('.bar-row').forEach(el => observer.observe(el));

    // Bar fill animation
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.querySelector('.bar-fill')?.classList.add('animate');
                }, delay);
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.bar-row').forEach(el => barObserver.observe(el));
}

// ---- HERO WORKFLOW ANIMATION ----
function initHeroAnimation() {
    const steps = document.querySelectorAll('.wf-step');
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                steps.forEach(step => {
                    const delay = parseInt(step.dataset.delay) || 0;
                    setTimeout(() => step.classList.add('visible'), delay);
                });
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const heroWorkflow = document.getElementById('heroWorkflow');
    if (heroWorkflow) heroObserver.observe(heroWorkflow);
}

// ---- SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = navbar.offsetHeight + 20;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initHeroAnimation();
});