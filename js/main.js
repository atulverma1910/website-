/* EXPN AI / Follow-Up Desk — v3 */

const BOOKING_URL = "https://calendly.com/v-atul1910/30min";

function openBooking() { window.open(BOOKING_URL, '_blank'); }

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
navToggle?.addEventListener('click', e => {
    e.stopPropagation();
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});
document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('open'); navLinks.classList.remove('open'); document.body.style.overflow = '';
    }
});
navLinks?.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
    navToggle.classList.remove('open'); navLinks.classList.remove('open'); document.body.style.overflow = '';
}));

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const h = this.getAttribute('href'); if (h === '#') return;
        const t = document.querySelector(h);
        if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 20, behavior: 'smooth' }); }
    });
});

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    const staggerObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((c, i) => {
                    setTimeout(() => c.classList.add('visible'), prefersReduced ? 0 : i * 120);
                });
                staggerObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.stagger-parent').forEach(el => staggerObs.observe(el));

    if (!prefersReduced) {
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    const duration = 1000;
                    const start = performance.now();
                    function tick(now) {
                        const p = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        el.textContent = Math.round(eased * target).toLocaleString();
                        if (p < 1) requestAnimationFrame(tick);
                        else el.classList.add('counted');
                    }
                    requestAnimationFrame(tick);
                    counterObs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));
    } else {
        document.querySelectorAll('[data-target]').forEach(el => {
            el.textContent = parseInt(el.dataset.target).toLocaleString();
        });
    }

    const barObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const d = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => entry.target.querySelector('.bar-fill')?.classList.add('animate'), prefersReduced ? 0 : d);
                barObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.bar-row').forEach(el => barObs.observe(el));

    if (!prefersReduced) initHeroLoop();
    if (!prefersReduced && window.innerWidth > 1024) initCursorGlow();
});

function initHeroLoop() {
    const steps = document.querySelectorAll('.wf-step');
    const status = document.getElementById('wfStatus');
    if (!steps.length) return;

    function runLoop() {
        steps.forEach(s => s.classList.remove('visible'));
        if (status) { status.textContent = ''; status.className = 'wf-status'; }

        steps.forEach((step, i) => {
            setTimeout(() => {
                step.classList.add('visible');
                if (status) {
                    const states = ['Analyzing...', 'Responding...', 'Qualifying...', 'Ready for agent'];
                    const classes = ['wf-status', 'wf-status', 'wf-status', 'wf-status wf-status-ready'];
                    status.textContent = states[i] || '';
                    status.className = classes[i] || 'wf-status';
                }
            }, i * 1400);
        });

        setTimeout(runLoop, steps.length * 1400 + 4000);
    }

    const heroObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { runLoop(); heroObs.unobserve(entries[0].target); }
    }, { threshold: 0.2 });
    heroObs.observe(document.getElementById('heroWorkflow'));
}

function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    let x = 0, y = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
    function move() {
        cx += (x - cx) * 0.08; cy += (y - cy) * 0.08;
        glow.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
        requestAnimationFrame(move);
    }
    move();
}