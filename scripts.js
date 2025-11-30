document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize AOS
    AOS.init({ duration: 800, offset: 50, once: true });

    // 2. Dark Mode Toggle
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = toggleBtn.querySelector('i');

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    toggleBtn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 3. Scroll Spy (Highlights Nav Menu on Scroll)
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links .nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });
});

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('active');
}