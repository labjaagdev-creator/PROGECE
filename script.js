/**
 * PROGECE - Script Principal
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Dark Mode
    function initDarkMode() {
        const saved = localStorage.getItem('theme');
        const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = (saved === 'dark') || (!saved && prefers) ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    function toggleDarkMode() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    initDarkMode();
    if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Navbar scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Mobile menu
    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    if (navToggle) navToggle.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) closeMenu();
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('http')) return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const top = target.offsetTop - navHeight;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });
    
    // Scroll animations
    const observerOptions = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 };
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                setTimeout(() => el.classList.add('animate-visible'), delay);
                animationObserver.unobserve(el);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-animate]').forEach(el => animationObserver.observe(el));
    
    // Form validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function showError(fieldId, msg) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById('error-' + fieldId);
        if (field && error) {
            field.classList.add('error');
            error.textContent = msg;
            error.classList.add('visible');
        }
    }
    
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById('error-' + fieldId);
        if (field && error) {
            field.classList.remove('error');
            error.textContent = '';
            error.classList.remove('visible');
        }
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            let valid = true;
            
            if (!nombre) { showError('nombre', 'El nombre es obligatorio'); valid = false; }
            if (!email) { showError('email', 'El correo es obligatorio'); valid = false; }
            else if (!validateEmail(email)) { showError('email', 'Correo inválido'); valid = false; }
            if (!mensaje) { showError('mensaje', 'El mensaje es obligatorio'); valid = false; }
            
            if (valid) {
                const success = document.getElementById('formSuccess');
                const btn = contactForm.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.textContent = 'Enviando...';
                
                setTimeout(() => {
                    success.classList.add('visible');
                    contactForm.reset();
                    btn.disabled = false;
                    btn.textContent = 'Enviar';
                    setTimeout(() => success.classList.remove('visible'), 5000);
                }, 1000);
            }
        });
        
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() { clearError(this.id); });
        });
    }
    
    // Back to top
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (backToTop) {
            if (window.scrollY > 500) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    console.log('%c PROGECE ', 'font-size: 24px; color: #1e3a5f;');
    console.log('Proyectos y Gestiones de Comercio Exterior');
});