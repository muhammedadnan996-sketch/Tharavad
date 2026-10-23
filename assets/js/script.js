// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Form Submission handling -> Send to WhatsApp
const form = document.getElementById('bookingForm') || document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('clientName')?.value.trim() || '';
        const phone = document.getElementById('clientPhone')?.value.trim() || '';
        const shootType = document.getElementById('shootType')?.value || '';
        const slot = document.getElementById('preferredSlot')?.value || '';
        const date = document.getElementById('shootDate')?.value || '';

        // Format message for WhatsApp
        const whatsappNumber = '919746443855';
        const messageText = `*New Photoshoot Inquiry - Tharavad*

*Name:* ${name}
*Phone:* ${phone}
*Shoot Type:* ${shootType}
*Preferred Slot:* ${slot}
*Date:* ${date}

Hello, I would like to check availability and book this slot at Maliyakkal Tharavad.`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Redirecting to WhatsApp...';
        btn.style.opacity = '0.85';

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');

        setTimeout(() => {
            btn.innerText = 'Inquiry Sent!';
            btn.style.backgroundColor = '#25D366';
            btn.style.borderColor = '#25D366';
            btn.style.color = '#fff';
            btn.style.opacity = '1';
            form.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 3000);
        }, 800);
    });
}
