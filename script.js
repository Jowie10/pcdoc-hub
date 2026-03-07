// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoader();
    initNavigation();
    initTypingEffect();
    initScrollProgress();
    initStatsCounter();
    initBackToTop();
    initTestimonialSlider();
    initNewsletterForm();
    initServiceCards();
    initScrollAnimations();
    initParticles();
});

// ===== LOADER =====
function initLoader() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 500);
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    if (!typedTextSpan) return;

    const words = ['Web Developers', 'Computer Experts', 'Digital Innovators', 'IT Consultants', 'Your Tech Partners'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
            }, 2000);
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typingSpeed = isDeleting ? 100 : 200;
        const delay = isWaiting ? 2000 : typingSpeed;

        setTimeout(type, delay);
    }

    type();
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.closest('.stat-item').getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + (target === 24 ? '/7' : '+');
                }
            };
            
            updateCounter();
        });
    }

    // Check if stats are in viewport
    function checkStats() {
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection || animated) return;

        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            animateStats();
            animated = true;
        }
    }

    window.addEventListener('scroll', checkStats);
    checkStats(); // Check on load
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== TESTIMONIAL SLIDER =====
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalSlides = testimonials.length;

function initTestimonialSlider() {
    const container = document.getElementById('testimonialContainer');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!container || totalSlides === 0) return;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('onclick', `goToSlide(${i})`);
        dotsContainer.appendChild(dot);
    }

    updateSlider();
    startAutoSlide();
}

function updateSlider() {
    const container = document.getElementById('testimonialContainer');
    const dots = document.querySelectorAll('.dot');
    
    if (!container) return;

    container.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevTestimonial() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function startAutoSlide() {
    setInterval(() => {
        nextTestimonial();
    }, 5000);
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const messageDiv = document.getElementById('newsletterMessage');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;

        // Show loading state
        button.textContent = 'Subscribing...';
        button.disabled = true;

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Validate email
            if (isValidEmail(email)) {
                showMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
                form.reset();
                
                // Track subscription
                trackUserAction('newsletter_subscription', { email });
            } else {
                throw new Error('Invalid email address');
            }
        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('newsletterMessage');
    messageDiv.textContent = message;
    messageDiv.className = `newsletter-message ${type}`;
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = 'newsletter-message';
    }, 5000);
}

// ===== SERVICE CARDS =====
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Progress bar animation on hover
        card.addEventListener('mouseenter', () => {
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                const percentage = [85, 95, 90][index]; // Different percentages for each service
                progressBar.style.width = percentage + '%';
            }
        });

        card.addEventListener('mouseleave', () => {
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        });

        // Click handler
        card.addEventListener('click', () => {
            showServiceDetails(index + 1);
        });
    });
}

function showServiceDetails(serviceId) {
    const serviceDetails = {
        1: {
            title: 'Web Development',
            description: 'We create stunning, responsive websites that help your business grow.',
            price: 'Starting at $500',
            duration: '2-4 weeks'
        },
        2: {
            title: 'Computer Repair',
            description: 'Fast and reliable repair services for all computer issues.',
            price: 'Starting at $50',
            duration: '24-48 hours'
        },
        3: {
            title: 'Computer Sales',
            description: 'Quality new and used computers at affordable prices.',
            price: 'Varies by model',
            duration: 'Immediate pickup'
        }
    };

    const service = serviceDetails[serviceId];
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="service-info">
                <p><strong>Price:</strong> ${service.price}</p>
                <p><strong>Duration:</strong> ${service.duration}</p>
            </div>
            <button class="btn btn-primary" onclick="window.location.href='contact.html'">
                Book Now
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Close modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(particle);
    }
}

// Add particle styles dynamically
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255,255,255,0.5);
        border-radius: 50%;
        animation: floatParticle linear infinite;
        pointer-events: none;
    }

    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
        }
    }

    .service-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .service-modal.show {
        opacity: 1;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }

    .service-modal.show .modal-content {
        transform: scale(1);
    }

    .close-modal {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 1.5rem;
        cursor: pointer;
        color: #999;
        transition: color 0.3s ease;
    }

    .close-modal:hover {
        color: #333;
    }

    .service-info {
        margin: 1rem 0;
        padding: 1rem;
        background: #f9f9f9;
        border-radius: 5px;
    }
`;

document.head.appendChild(style);

// ===== USER TRACKING (Analytics) =====
function trackUserAction(action, data = {}) {
    // This would send to your analytics service
    console.log('User Action:', action, data);
    
    // Store in localStorage for session tracking
    const sessionData = JSON.parse(localStorage.getItem('userSession') || '{}');
    sessionData[action] = {
        timestamp: new Date().toISOString(),
        data: data
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
}

// ===== PAGE VISIBILITY API =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left the page');
        // Pause animations or videos
    } else {
        console.log('User returned to the page');
        // Resume animations
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    trackUserAction('error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// ===== NETWORK STATUS =====
window.addEventListener('online', () => {
    showMessage('You are back online!', 'success');
});

window.addEventListener('offline', () => {
    showMessage('You are offline. Check your connection.', 'error');
});

// ===== LAZY LOADING IMAGES =====
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== PRODUCT FILTERING =====
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const tabs = document.querySelectorAll('.category-tab');
    
    // Update active tab
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(category) || 
            (category === 'all' && tab.textContent === 'All Products')) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Filter products
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// ===== QUICK VIEW MODAL =====
function quickView(productId) {
    const modal = document.getElementById('quickViewModal');
    const modalContent = document.getElementById('modalContent');
    
    // Product details database
    const productDetails = {
        'dell-xps-15': {
            title: 'Dell XPS 15',
            price: 'UGX 4,500,000',
            description: 'Premium ultrabook with stunning 4K display, ideal for professionals and creators.',
            specs: [
                'Intel Core i7-11800H',
                '16GB DDR4 RAM',
                '512GB NVMe SSD',
                '15.6" 4K OLED Display',
                'NVIDIA GeForce RTX 3050',
                'Windows 11 Pro',
                '1 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=Dell+XPS+15'
        },
        'hp-elitebook-840': {
            title: 'HP EliteBook 840',
            price: 'UGX 2,800,000',
            description: 'Business-class laptop with excellent performance and security features.',
            specs: [
                'Intel Core i5-1135G7',
                '8GB DDR4 RAM',
                '256GB NVMe SSD',
                '14" Full HD Display',
                'Windows 11 Pro',
                'Fingerprint Reader',
                '1 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=HP+EliteBook'
        },
        'lenovo-thinkpad-t14': {
            title: 'Lenovo ThinkPad T14',
            price: 'UGX 3,200,000',
            description: 'Durable and reliable business laptop with AMD processing power.',
            specs: [
                'AMD Ryzen 5 Pro',
                '16GB DDR4 RAM',
                '512GB NVMe SSD',
                '14" Full HD Display',
                'Windows 11 Pro',
                'Military-Grade Durability',
                '3 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=Lenovo+ThinkPad'
        },
        'hp-pavilion-desktop': {
            title: 'HP Pavilion Desktop',
            price: 'UGX 2,200,000',
            description: 'Versatile desktop for home and office use.',
            specs: [
                'Intel Core i5-11400',
                '8GB DDR4 RAM',
                '1TB HDD + 256GB SSD',
                'Windows 11 Home',
                'USB 3.0 Ports',
                'HDMI Output',
                '1 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=HP+Pavilion'
        },
        'dell-optiplex-7080': {
            title: 'Dell OptiPlex 7080',
            price: 'UGX 3,500,000',
            description: 'Powerful business desktop for demanding applications.',
            specs: [
                'Intel Core i7-10700',
                '16GB DDR4 RAM',
                '512GB NVMe SSD',
                'Windows 10 Pro',
                'Multiple Display Support',
                '3 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=Dell+OptiPlex'
        },
        'logitech-mouse': {
            title: 'Logitech Wireless Mouse',
            price: 'UGX 45,000',
            description: 'Reliable wireless mouse with silent click technology and long battery life.',
            specs: [
                '2.4GHz Wireless',
                'Silent Click Technology',
                '12-Month Battery Life',
                'Plug-and-Play USB Receiver',
                'Comfortable Ergonomic Design',
                '1 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=Logitech+Mouse'
        },
        'mechanical-keyboard': {
            title: 'RGB Mechanical Keyboard',
            price: 'UGX 85,000',
            description: 'Gaming keyboard with mechanical switches and customizable RGB lighting.',
            specs: [
                'Blue Mechanical Switches',
                'RGB Backlighting',
                'Wired USB Connection',
                'Anti-Ghosting',
                'Durable Construction',
                '6-Month Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=Mechanical+Keyboard'
        },
        'samsung-ssd': {
            title: 'Samsung 870 EVO SSD',
            price: 'UGX 280,000',
            description: 'High-performance SSD for faster boot times and application loading.',
            specs: [
                '1TB Capacity',
                'SATA III Interface',
                'Read Speed: 560MB/s',
                'Write Speed: 530MB/s',
                'Samsung V-NAND Technology',
                '5 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=Samsung+SSD'
        },
        'wd-external-hdd': {
            title: 'WD 2TB External HDD',
            price: 'UGX 320,000',
            description: 'Portable external hard drive for backups and extra storage.',
            specs: [
                '2TB Capacity',
                'USB 3.0 Interface',
                'Portable Design',
                'Plug-and-Play',
                'Password Protection',
                '2 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=WD+External+HDD'
        },
        'sandisk-usb': {
            title: 'SanDisk Ultra USB 3.0',
            price: 'From UGX 35,000',
            description: 'High-speed USB flash drive for quick file transfers.',
            specs: [
                '64GB/128GB/256GB Options',
                'USB 3.0 Interface',
                'Read Speed: 150MB/s',
                'Retractable Design',
                '5 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=SanDisk+USB'
        },
        'gaming-headset': {
            title: 'Gaming Headset',
            price: 'UGX 120,000',
            description: 'Immersive gaming headset with surround sound.',
            specs: [
                '7.1 Surround Sound',
                'RGB Lighting',
                'Noise-Cancelling Microphone',
                'Comfortable Ear Cushions',
                'Multi-Platform Compatible',
                '1 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=Gaming+Headset'
        },
        'laptop-stand': {
            title: 'Adjustable Laptop Stand',
            price: 'UGX 65,000',
            description: 'Ergonomic laptop stand for better posture and cooling.',
            specs: [
                'Aluminum Construction',
                'Foldable Design',
                '7 Height Adjustments',
                'Ventilation Design',
                'Non-Slip Pads',
                '1 Year Warranty'
            ],
            image: 'https://via.placeholder.com/400x300?text=Laptop+Stand'
        }
    };
    
    const product = productDetails[productId] || {
        title: 'Product Details',
        price: 'Contact for price',
        description: 'Please contact us for more information about this product.',
        specs: ['Contact us for full specifications'],
        image: 'logo.png'
    };
    
    modalContent.innerHTML = `
        <div class="modal-grid">
            <div class="modal-image">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='logo.png'">
            </div>
            <div class="modal-details">
                <h2>${product.title}</h2>
                <div class="modal-price">${product.price}</div>
                <div class="modal-description">${product.description}</div>
                <div class="modal-specs">
                    <h4>Key Specifications:</h4>
                    <ul>
                        ${product.specs.map(spec => `<li><i class="fas fa-check-circle"></i> ${spec}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-actions" style="justify-content: flex-start;">
                    <button class="btn btn-primary" onclick="addToCart('${product.title}')">
                        <i class="fas fa-shopping-cart"></i> Inquire Now
                    </button>
                    <button class="btn btn-secondary" onclick="window.location.href='contact.html'">
                        <i class="fas fa-envelope"></i> Contact Us
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== CLOSE QUICK VIEW MODAL =====
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== ADD TO CART / INQUIRE =====
function addToCart(productName) {
    // Show inquiry message
    alert(`Thank you for your interest in ${productName}!\n\nA member of our team will contact you shortly with more information.`);
    
    // Track the inquiry
    if (typeof trackUserAction === 'function') {
        trackUserAction('product_inquiry', { product: productName });
    }
}

// ===== TESTIMONIAL SLIDER - MODIFIED FOR SLOWER TRANSITION =====
// Replace the existing testimonial slider functions with these:


let autoSlideInterval;

function initTestimonialSlider() {
    testimonials = document.querySelectorAll('.testimonial');
    const container = document.getElementById('testimonialContainer');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!container || testimonials.length === 0) return;
    
    totalSlides = testimonials.length;

    // Create dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('onclick', `goToSlide(${i})`);
        dotsContainer.appendChild(dot);
    }

    // Set container width
    container.style.width = `${totalSlides * 100}%`;
    testimonials.forEach(testimonial => {
        testimonial.style.width = `${100 / totalSlides}%`;
    });

    updateSlider();
    startAutoSlide();
}

function updateSlider() {
    const container = document.getElementById('testimonialContainer');
    const dots = document.querySelectorAll('.dot');
    
    if (!container) return;

    container.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
    
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    
    // Reset auto slide timer
    resetAutoSlide();
}

function prevTestimonial() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    
    // Reset auto slide timer
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    
    // Reset auto slide timer
    resetAutoSlide();
}

function startAutoSlide() {
    // Change slide every 8 seconds instead of 5 for better readability
    autoSlideInterval = setInterval(() => {
        nextTestimonial();
    }, 8000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// ===== MODAL CLICK OUTSIDE =====
document.addEventListener('click', function(event) {
    const modal = document.getElementById('quickViewModal');
    if (event.target === modal) {
        closeQuickView();
    }
});

// ===== INITIALIZE PRODUCT FILTERS =====
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.category-tab');
    if (filterButtons.length > 0) {
        filterProducts('all');
    }
}

// Add to DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoader();
    initNavigation();
    initTypingEffect();
    initScrollProgress();
    initStatsCounter();
    initBackToTop();
    initTestimonialSlider(); // This now uses the slower version
    initNewsletterForm();
    initServiceCards();
    initScrollAnimations();
    initParticles();
    initProductFilters(); // Add this line
    
    // Add smooth scroll for anchor links
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
});