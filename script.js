document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when a navigation link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // FAQ functionality
    document.querySelectorAll('.faq-header').forEach(button => {
        button.addEventListener('click', () => {
            const faqCard = button.closest('.faq-card');
            faqCard.classList.toggle('active');
        });
    });
});