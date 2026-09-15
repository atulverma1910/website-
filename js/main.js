/* EXPN AI - Main JavaScript */

// ---- CALENDLY ----
const CALENDLY_URL = "https://calendly.com/v-atul1910/30min";

function openCalendly() {
    window.open(CALENDLY_URL, '_blank');
}

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    }
});
navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ---- SCROLL ANIMATIONS ----
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

function initScrollAnimations() {
    document.querySelectorAll('.section-header, .system-card, .step-card, .compare-col, .role-col, .paid-block, .cta-block, .nurture-block, .research-block').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
    document.querySelectorAll('.tl-point').forEach(el => observer.observe(el));
    document.querySelectorAll('.bar-row').forEach(el => observer.observe(el));

    const barObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const d = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => entry.target.querySelector('.bar-fill')?.classList.add('animate'), d);
                barObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.bar-row').forEach(el => barObs.observe(el));
}

// ---- HERO WORKFLOW ANIMATION ----
function initHeroAnimation() {
    const steps = document.querySelectorAll('.wf-step');
    const heroObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                steps.forEach(step => {
                    const d = parseInt(step.dataset.delay) || 0;
                    setTimeout(() => step.classList.add('visible'), d);
                });
                heroObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    const hw = document.getElementById('heroWorkflow');
    if (hw) heroObs.observe(hw);
}

// ---- COUNTER ANIMATION ----
function initCounter() {
    const el = document.getElementById('statNum');
    if (!el) return;
    const cObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let n = 0;
                const interval = setInterval(() => {
                    n++;
                    el.textContent = n;
                    if (n >= 8) clearInterval(interval);
                }, 120);
                cObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    cObs.observe(el);
}

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = navbar.offsetHeight + 20;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        }
    });
});

// ---- TILT on hero card ----
function initTilt() {
    const card = document.querySelector('.workflow-card');
    if (!card || window.innerWidth < 1024) return;
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initHeroAnimation();
    initCounter();
    initTilt();
});