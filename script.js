document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const navLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
                    if (navLink) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.5
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Link clicked!');
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                console.log('Target section found:', target);
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade out hero gradient on scroll
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrollPosition = window.scrollY;

        // Adjust the opacity based on the scroll position
        let opacity = 1 - (scrollPosition / 400); // Adjust 400 to control the fade distance
        opacity = Math.max(0, opacity); // Ensure opacity is not negative

        hero.style.background = `linear-gradient(to bottom, rgba(13, 13, 13, ${opacity}), rgba(13, 13, 13, 0))`;
    });

    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const faqCard = this.closest('.faq-card');
            const faqContent = this.nextElementSibling;

            // Close other open FAQ cards
            document.querySelectorAll('.faq-card.active').forEach(card => {
                if (card !== faqCard) {
                    card.classList.remove('active');
                    card.querySelector('.faq-content').style.display = 'none';
                }
            });

            faqCard.classList.toggle('active');

            if (faqCard.classList.contains('active')) {
                faqContent.style.display = 'block';
            } else {
                faqContent.style.display = 'none';
            }
        });
    });
});