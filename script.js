// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== LOAD DYNAMIC CONTENT ==========
    loadServices();
    loadFeatures();
    loadContactInfo();
    
    // ========== NEWSLETTER FORM HANDLING ==========
    setupNewsletterForm();
    
    // ========== SMOOTH SCROLLING ==========
    setupSmoothScrolling();
    
    // ========== ACTIVE NAVIGATION HIGHLIGHT ==========
    highlightActiveNav();
    
    // ========== CONSULTATION BUTTON CLICK ==========
    setupConsultationButton();
    
});

// ========== SERVICES DATA ==========
function loadServices() {
    const servicesContainer = document.getElementById('servicesContainer');
    if (!servicesContainer) return;
    
    const services = [
        {
            icon: '💻',
            title: 'Website Design & Development',
            description: 'Custom, responsive websites tailored to your brand and business goals.'
        },
        {
            icon: '🖥️',
            title: 'Computer Sales & Buying',
            description: 'Quality new and used computers. We also buy used equipment.'
        },
        {
            icon: '🔧',
            title: 'Website Management & Repair',
            description: 'Ongoing maintenance, security updates, and troubleshooting.'
        },
        {
            icon: '⚡',
            title: 'Computer Repair',
            description: 'Fast, reliable repair services for desktops and laptops.'
        }
    ];
    
    let servicesHTML = '';
    services.forEach((service, index) => {
        servicesHTML += `
            <div class="service-card" data-service-id="${index}">
                <span class="service-icon">${service.icon}</span>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `;
    });
    
    servicesContainer.innerHTML = servicesHTML;
    
    // Add click events to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            showServiceDetails(serviceId);
        });
    });
}

// ========== FEATURES DATA ==========
function loadFeatures() {
    const featuresContainer = document.getElementById('featuresContainer');
    if (!featuresContainer) return;
    
    const features = [
        { icon: '⭐', title: '5+ Years Experience' },
        { icon: '🤝', title: '100+ Happy Clients' },
        { icon: '🚀', title: '24/7 Support' },
        { icon: '💰', title: 'Affordable Rates' }
    ];
    
    let featuresHTML = '';
    features.forEach(feature => {
        featuresHTML += `
            <div class="feature-item">
                <span class="feature-icon">${feature.icon}</span>
                <h4>${feature.title}</h4>
            </div>
        `;
    });
    
    featuresContainer.innerHTML = featuresHTML;
}

// ========== CONTACT INFORMATION ==========
function loadContactInfo() {
    const contactSection = document.getElementById('contactSection');
    if (!contactSection) return;
    
    const contactInfo = `
        <div class="contact-details">
            <p><span class="contact-icon">📧</span> <strong>Email:</strong> <a href="mailto:plwalanda@outlook.com">plwalanda@outlook.com</a></p>
            <p><span class="contact-icon">📞</span> <strong>Phone:</strong> <a href="tel:+256704210089">+256 704 210089</a></p>
            <p><span class="contact-icon">📍</span> <strong>Location:</strong> Suncity Arcade, Kampala Road</p>
            <p><span class="contact-icon">🕒</span> <strong>Hours:</strong> Mon - Fri: 9am - 6pm</p>
        </div>
        <div>
            <a href="pages/contact.html" class="cta-button">Send us a Message</a>
        </div>
    `;
    
    contactSection.innerHTML = contactInfo;
}

// ========== NEWSLETTER FORM ==========
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        const messageDiv = document.getElementById('newsletterMessage');
        
        // Simple email validation
        if (isValidEmail(email)) {
            // Here you would typically send this to your server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            messageDiv.textContent = 'Thank you for subscribing! Check your email for confirmation.';
            messageDiv.className = 'newsletter-message success';
            
            // Clear the form
            emailInput.value = '';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
                messageDiv.className = 'newsletter-message';
            }, 5000);
        } else {
            // Show error message
            messageDiv.textContent = 'Please enter a valid email address.';
            messageDiv.className = 'newsletter-message error';
        }
    });
}

// ========== EMAIL VALIDATION ==========
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== SMOOTH SCROLLING ==========
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// ========== SERVICE DETAILS MODAL (Example of additional functionality) ==========
function showServiceDetails(serviceId) {
    const serviceDetails = [
        {
            title: 'Website Design & Development',
            details: 'We create stunning, responsive websites that help your business stand out. Our process includes: consultation, design, development, testing, and launch.'
        },
        {
            title: 'Computer Sales & Buying',
            details: 'We offer quality new and used computers at competitive prices. We also buy used equipment in good condition. Contact us for a quote!'
        },
        {
            title: 'Website Management & Repair',
            details: 'Keep your website running smoothly with our management services. We handle updates, backups, security, and any technical issues that arise.'
        },
        {
            title: 'Computer Repair',
            details: 'Our expert technicians can fix any computer issue quickly and affordably. From hardware repairs to software troubleshooting, we\'ve got you covered.'
        }
    ];
    
    if (serviceDetails[serviceId]) {
        // You could create a modal here, but for now we'll just alert
        alert(`${serviceDetails[serviceId].title}\n\n${serviceDetails[serviceId].details}`);
    }
}

// ========== CONSULTATION BUTTON ==========
function setupConsultationButton() {
    const consultBtn = document.getElementById('consultationBtn');
    if (!consultBtn) return;
    
    consultBtn.addEventListener('click', function(e) {
        // You can add tracking or analytics here
        console.log('Consultation button clicked');
    });
}

// ========== LAZY LOADING IMAGES (Optional) ==========
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========== PAGE VISIBILITY API (Optional) ==========
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User left the page');
        // You could pause animations, videos, etc.
    } else {
        console.log('User returned to the page');
        // You could resume animations, refresh content, etc.
    }
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.message);
    // You could send this to a logging service
});