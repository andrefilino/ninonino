// ============================
// Inisialisasi Lucide Icons
// ============================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// ============================
// LOADING SCREEN
// ============================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
        setTimeout(startCounterAnimation, 400);
    }, 1800);
});

// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        if (mobileMenu.classList.contains('show')) {
            closeMobileMenu();
        } else {
            mobileMenu.style.display = 'flex';
            mobileMenu.offsetHeight;
            mobileMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
}

function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('open');
    if (mobileMenu) {
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (!mobileMenu.classList.contains('show')) {
                mobileMenu.style.display = 'none';
            }
        }, 400);
    }
}

// ============================
// NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

// ============================
// SLIDESHOW
// ============================
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('slideDots');
let currentSlide = 0;
let slideInterval;

if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('slide-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
}

const dots = document.querySelectorAll('.slide-dot');

function goToSlide(index) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    let next = (currentSlide + direction + slides.length) % slides.length;
    goToSlide(next);
    resetSlideInterval();
}

function startSlideInterval() {
    if (slides.length > 0) {
        slideInterval = setInterval(() => changeSlide(1), 5000);
    }
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

startSlideInterval();

// ============================
// FILTER PRODUK
// ============================
function filterProducts(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const match = category === 'all' || card.getAttribute('data-category') === category;
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        if (match) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => { card.style.display = 'none'; }, 400);
        }
    });
}

// ============================
// VALIDASI FORM KONTAK
// ============================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('formName');
        const errorName = document.getElementById('errorName');
        if (name.value.trim().length < 3) {
            showFieldError(name, errorName); isValid = false;
        } else { showFieldSuccess(name, errorName); }

        const email = document.getElementById('formEmail');
        const errorEmail = document.getElementById('errorEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showFieldError(email, errorEmail); isValid = false;
        } else { showFieldSuccess(email, errorEmail); }

        const phone = document.getElementById('formPhone');
        const errorPhone = document.getElementById('errorPhone');
        const phoneClean = phone.value.replace(/[\s\-\+()]/g, '');
        if (phoneClean.length < 10 || !/^\d+$/.test(phoneClean)) {
            showFieldError(phone, errorPhone); isValid = false;
        } else { showFieldSuccess(phone, errorPhone); }

        const message = document.getElementById('formMessage');
        const errorMessage = document.getElementById('errorMessage');
        if (message.value.trim().length < 10) {
            showFieldError(message, errorMessage); isValid = false;
        } else { showFieldSuccess(message, errorMessage); }

        if (isValid) {
            showToast('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
            contactForm.reset();
            contactForm.querySelectorAll('.form-input').forEach(i => i.classList.remove('success'));
        } else {
            showToast('Mohon periksa kembali formulir Anda.', 'error');
        }
    });

    // Real-time validation
    contactForm.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorEl = this.parentElement.querySelector('.form-error');
            if (errorEl) errorEl.classList.remove('show');
        });
    });
}

function showFieldError(input, errorEl) {
    input.classList.add('error');
    input.classList.remove('success');
    if (errorEl) errorEl.classList.add('show');
}

function showFieldSuccess(input, errorEl) {
    input.classList.remove('error');
    input.classList.add('success');
    if (errorEl) errorEl.classList.remove('show');
}

// ============================
// TOAST NOTIFICATION
// ============================
function showToast(message, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.offsetHeight;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

// ============================
// ANIMASI COUNTER
// ============================
function animateCounter(elementId, target, suffix) {
    suffix = suffix || '';
    const el = document.getElementById(elementId);
    if (!el) return;
    let startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / 2000, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target + suffix;
    }
    requestAnimationFrame(update);
}

let counterStarted = false;
function startCounterAnimation() {
    if (counterStarted) return;
    counterStarted = true;
    animateCounter('statProjects', 127, '+');
    animateCounter('statClients', 89, '+');
    animateCounter('statYears', 6, '+');
}

// ============================
// SCROLL REVEAL
// ============================
function initReveal() {
    const elements = document.querySelectorAll('.reveal:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    elements.forEach(el => observer.observe(el));
}
initReveal();

// ============================
// PARTIKEL AMBIENT (Canvas)
// ============================
(function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;opacity:0.35;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h, animId;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((w * h) / 28000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.1, p.r), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212,168,67,' + p.alpha + ')';
            ctx.fill();
        });
        animId = requestAnimationFrame(draw);
    }

    resize(); createParticles(); draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });

    prefersReducedMotion.addEventListener('change', (e) => {
        if (e.matches) {
            cancelAnimationFrame(animId);
            ctx.clearRect(0, 0, w, h);
        } else {
            resize(); createParticles(); draw();
        }
    });
})();