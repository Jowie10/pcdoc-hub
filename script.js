// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing features');
    
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
    initProductFilters();
    initDarkMode(); // Add dark mode initialization
    
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

// ===== LOADER =====
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
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
    
    if (!hamburger || !navMenu || !navbar) return;

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

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
    
    if (!typedTextSpan || !cursorSpan) return;

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
    if (!progressBar) return;
    
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
            const statItem = stat.closest('.stat-item');
            if (!statItem) return;
            
            const target = parseInt(statItem.getAttribute('data-target'));
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
    if (!backToTop) return;
    
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
let testimonials = [];
let totalSlides = 0;
let autoSlideInterval;

function initTestimonialSlider() {
    testimonials = document.querySelectorAll('.testimonial');
    const container = document.getElementById('testimonialContainer');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!container || testimonials.length === 0) return;
    
    totalSlides = testimonials.length;

    // Clear existing dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        
        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('onclick', `goToSlide(${i})`);
            dotsContainer.appendChild(dot);
        }
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
    resetAutoSlide();
}

function prevTestimonial() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(() => {
        nextTestimonial();
    }, 8000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const messageDiv = document.getElementById('newsletterMessage');
    
    if (!form || !messageDiv) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput) return;
        
        const email = emailInput.value;
        const button = form.querySelector('button');
        const originalText = button.textContent;

        button.textContent = 'Subscribing...';
        button.disabled = true;

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (isValidEmail(email)) {
                showMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
                form.reset();
                
                if (typeof trackUserAction === 'function') {
                    trackUserAction('newsletter_subscription', { email });
                }
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
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = `newsletter-message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = 'newsletter-message';
    }, 5000);
}

// ===== SERVICE CARDS =====
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                const percentage = [85, 95, 90][index];
                progressBar.style.width = percentage + '%';
            }
        });

        card.addEventListener('mouseleave', () => {
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        });

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
    if (!service) return;
    
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

    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });

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

// ===== USER TRACKING =====
function trackUserAction(action, data = {}) {
    console.log('User Action:', action, data);
    
    try {
        const sessionData = JSON.parse(localStorage.getItem('userSession') || '{}');
        sessionData[action] = {
            timestamp: new Date().toISOString(),
            data: data
        };
        localStorage.setItem('userSession', JSON.stringify(sessionData));
    } catch (e) {
        console.error('Error tracking user action:', e);
    }
}

// ===== PAGE VISIBILITY API =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left the page');
    } else {
        console.log('User returned to the page');
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// ===== NETWORK STATUS =====
window.addEventListener('online', () => {
    showMessage('You are back online!', 'success');
});

window.addEventListener('offline', () => {
    showMessage('You are offline. Check your connection.', 'error');
});

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

initLazyLoading();

// ===== PRODUCT FILTERING =====
function filterProducts(category) {
    console.log('Filtering products by:', category);
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
    console.log('Quick view for:', productId);
    const modal = document.getElementById('quickViewModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) {
        console.error('Modal elements not found');
        alert('Quick view modal is not available. Please contact us directly for product details.');
        return;
    }
    
    // Product details database - Simplified to match your actual products
    const productDetails = {
        // Laptops
        'dell-xps-15': {
            title: 'Dell XPS 15',
            price: 'UGX 5,200,000',
            description: 'Premium ultrabook with stunning display, ideal for professionals and creators.',
            specs: [
                'Intel Core i7-13700H',
                '32GB DDR5 RAM',
                '1TB NVMe SSD',
                'NVIDIA RTX 4050 6GB',
                'Windows 11 Pro',
                '2 Year Warranty'
            ],
            image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/black/notebook-xps-15-9530--black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3500&hei=2405&qlt=100,1&resMode=sharp2&size=3500,2405'
        },
        'hp-elitebook-840': {
            title: 'HP EliteBook 840 G10',
            price: 'UGX 3,900,000',
            description: 'Business-class laptop with enterprise-grade security and exceptional performance.',
            specs: [
                'Intel Core i7-1365U',
                '16GB DDR4 RAM',
                '512GB NVMe SSD',
                '14" Full HD Display',
                'Windows 11 Pro',
                '3 Year Warranty'
            ],
            image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08581396.png'
        },
        'lenovo-x1-carbon': {
            title: 'Lenovo ThinkPad X1 Carbon',
            price: 'UGX 4,500,000',
            description: 'Ultra-lightweight business laptop with legendary ThinkPad durability.',
            specs: [
                'Intel Core i7-1365U',
                '16GB LPDDR5 RAM',
                '1TB NVMe SSD',
                '14" 2.8K OLED Display',
                'Windows 11 Pro',
                '3 Year Warranty'
            ],
            image: 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjU2MDQ3fGltYWdlL3BuZ3xoY2UvaDc4LzE0MjM1MTUyMzYyMjM4LnBuZ3xjMTVlZGY1YjQwMjAxYjFhYTQ1YTBlNmFjNjU4YjY5YzIxMmRmYjQzZTYyYmM2Y2UyYzA3MzQ4YjQzZTNlMjE2/Lenovo-Laptops-ThinkPad-X1-Carbon-Gen-11-hero.png'
        },
        'asus-rog-g16': {
            title: 'ASUS ROG Strix G16',
            price: 'UGX 5,800,000',
            description: 'High-performance gaming laptop with advanced cooling and stunning visuals.',
            specs: [
                'Intel Core i9-13980HX',
                '32GB DDR5 RAM',
                '1TB NVMe SSD',
                'NVIDIA RTX 4070 8GB',
                'Windows 11 Home',
                '2 Year Warranty'
            ],
            image: 'https://dlcdnwebimgs.asus.com/gain/23efe61e-5ae0-4e8f-9077-7bf3d5d2ab7d/'
        },
        'acer-swift-3': {
            title: 'Acer Swift 3',
            price: 'UGX 2,300,000',
            description: 'Thin and light laptop perfect for students and everyday use.',
            specs: [
                'Intel Core i5-1240P',
                '8GB LPDDR4X RAM',
                '512GB NVMe SSD',
                '14" Full HD IPS Display',
                'Windows 11 Home',
                '1 Year Warranty'
            ],
            image: 'https://static.acer.com/up/Resource/Acer/Laptops/Swift/SF314-511/Images/20220317/Acer-Swift-3-SF314-511-home--01.png'
        },
        
        // Desktops
        'hp-pavilion-desktop': {
            title: 'HP Pavilion Desktop',
            price: 'UGX 2,500,000',
            description: 'Versatile desktop for home and office use with ample storage.',
            specs: [
                'Intel Core i5-13400',
                '16GB DDR4 RAM',
                '512GB NVMe SSD + 1TB HDD',
                'Windows 11 Home',
                'WiFi 6',
                '1 Year Warranty'
            ],
            image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08080083.png'
        },
        'dell-optiplex-7080': {
            title: 'Dell OptiPlex 7080',
            price: 'UGX 3,800,000',
            description: 'Powerful business desktop for demanding professional applications.',
            specs: [
                'Intel Core i7-10700',
                '32GB DDR4 RAM',
                '1TB NVMe SSD',
                'Windows 10 Pro',
                'Multiple Display Support',
                '3 Year Warranty'
            ],
            image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/optiplex-desktops/7080-tower/media-gallery/desktop-optiplex-7080-tower-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3500&hei=2405&qlt=100,1&resMode=sharp2&size=3500,2405'
        },
        'mac-mini': {
            title: 'Apple Mac Mini',
            price: 'UGX 3,200,000',
            description: 'Compact desktop with incredible performance and efficiency.',
            specs: [
                'Apple M2 Pro Chip',
                '16GB Unified Memory',
                '512GB SSD Storage',
                'HDMI 2.1',
                '2 Thunderbolt 4 Ports',
                '1 Year Warranty'
            ],
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1670557187454'
        },
        
        // Accessories
        'mx-master-3s': {
            title: 'Logitech MX Master 3S',
            price: 'UGX 185,000',
            description: 'Master-level precision and speed with quiet clicks and 8K DPI tracking.',
            specs: [
                '8K DPI Optical Sensor',
                'MagSpeed Electromagnetic Wheel',
                'USB-C Charging',
                '70-Day Battery Life',
                'Bluetooth + USB Receiver',
                '1 Year Warranty'
            ],
            image: 'https://resource.logitech.com/w_1600,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-graphite-top-view.png?v=1'
        },
        'keychron-k2': {
            title: 'Keychron K2 Pro',
            price: 'UGX 250,000',
            description: 'Wireless mechanical keyboard with hot-swappable switches and RGB backlight.',
            specs: [
                'Gateron G Pro Switches',
                'Hot-swappable PCB',
                'RGB Backlighting',
                'Bluetooth 5.1',
                '4000mAh Battery',
                '1 Year Warranty'
            ],
            image: 'https://cdn.shopify.com/s/files/1/0059/0630/1017/products/Keychron-K2-wireless-mechanical-keyboard-for-mac-windows-ios_1800x1800.jpg?v=1676613033'
        },
        'dell-ultrasharp': {
            title: 'Dell UltraSharp 27" 4K',
            price: 'UGX 1,800,000',
            description: 'Professional 4K monitor with exceptional color accuracy.',
            specs: [
                '27" 4K UHD (3840x2160)',
                'IPS Panel',
                '99% sRGB Coverage',
                'USB-C Hub with 90W Power Delivery',
                'Height Adjustable Stand',
                '3 Year Warranty'
            ],
            image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/peripherals/output-devices/dell/monitors/u-series/u2723qe/media-gallery/ultrasharp-27-4k-u2723qe-monitor-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3500&hei=2405&qlt=100,1&resMode=sharp2&size=3500,2405'
        },
        'arctis-nova-pro': {
            title: 'SteelSeries Arctis Nova Pro',
            price: 'UGX 550,000',
            description: 'Premium wireless gaming headset with active noise cancellation.',
            specs: [
                'Active Noise Cancellation',
                'Premium High-Fidelity Drivers',
                'Wireless + Bluetooth 5.0',
                'Dual Battery System',
                'ClearCast Gen 2 Mic',
                '2 Year Warranty'
            ],
            image: 'https://media.steelseriescdn.com/thumbs/catalogue/products/arctis-nova-pro-wireless/b87728c951d54b2b9d5cc10e9125f292.png.500x400_q100_crop-fit_optimize.png'
        },
        
        // Storage
        'samsung-990-pro': {
            title: 'Samsung 990 Pro 2TB',
            price: 'UGX 450,000',
            description: 'Ultra-fast NVMe SSD for gamers and professionals.',
            specs: [
                '2TB Capacity',
                'PCIe 4.0 NVMe M.2',
                'Read Speed: 7,450 MB/s',
                'Write Speed: 6,900 MB/s',
                'Samsung V-NAND Technology',
                '5 Year Warranty'
            ],
            image: 'https://images.samsung.com/is/image/samsung/p6pim/uk/mz-v8p2t0bw/gallery/uk-990-pro-mz-v8p2t0bw-535071673?$720_576_PNG$'
        },
        'wd-black-p10': {
            title: 'WD Black P10 4TB',
            price: 'UGX 480,000',
            description: 'High-capacity external HDD optimized for gaming.',
            specs: [
                '4TB Capacity',
                'USB 3.2 Gen 1',
                'Read Speed: 140 MB/s',
                'Rugged Design',
                'No External Power Needed',
                '2 Year Warranty'
            ],
            image: 'https://www.wd.com/content/dam/western-digital/product/external/desktop/wd-black-p10-game-drive/hero/wd-black-p10-game-drive-4tb.png'
        },
        'sandisk-extreme-pro': {
            title: 'SanDisk Extreme Pro 256GB',
            price: 'UGX 85,000',
            description: 'High-performance USB drive for fast file transfers.',
            specs: [
                '256GB Capacity',
                'USB 3.2 Gen 1',
                'Read Speed: 420 MB/s',
                'Write Speed: 380 MB/s',
                'Aluminum Housing',
                '5 Year Warranty'
            ],
            image: 'https://www.westerndigital.com/content/dam/store/en-us/assets/products/usb-flash-drives/sandisk-extreme-pro-usb-3-2-solid-state-flash-drive/sandisk-extreme-pro-usb-3-2-solid-state-flash-drive-128gb.png'
        },
        
        // Components
        'i9-13900k': {
            title: 'Intel Core i9-13900K',
            price: 'UGX 1,200,000',
            description: 'Flagship desktop processor for extreme performance.',
            specs: [
                '24 Cores (8P + 16E)',
                '32 Threads',
                'Max Turbo: 5.8 GHz',
                '36MB L3 Cache',
                'LGA1700 Socket',
                '3 Year Warranty'
            ],
            image: 'https://www.intel.com/content/dam/products/hero/foreground/processor-core-i9-13900k.png'
        },
        'rtx-4080': {
            title: 'NVIDIA RTX 4080 16GB',
            price: 'UGX 3,500,000',
            description: 'High-end graphics card for 4K gaming and creative work.',
            specs: [
                '16GB GDDR6X Memory',
                '9728 CUDA Cores',
                'Ray Tracing Cores',
                'DLSS 3 Support',
                '2.5 GHz Boost Clock',
                '3 Year Warranty'
            ],
            image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4080/geforce-rtx-4080-shop-600x336.png'
        },
        'corsair-vengeance': {
            title: 'Corsair Vengeance 32GB',
            price: 'UGX 280,000',
            description: 'High-performance DDR5 RAM with RGB lighting.',
            specs: [
                '32GB (2x16GB) Kit',
                'DDR5-6000MHz',
                'CL36 Latency',
                'RGB Lighting',
                'Lifetime Warranty'
            ],
            image: 'https://www.corsair.com/medias/sys_master/images/images/h90/hd9/9398511378462/vengeance-rgb-pro-black/CMW32GX4M4C3200C16/-hero-01.png'
        },
        'asus-rog-z790': {
            title: 'ASUS ROG Maximus Z790',
            price: 'UGX 950,000',
            description: 'Premium motherboard for high-end gaming PCs.',
            specs: [
                'Intel Z790 Chipset',
                'LGA1700 Socket',
                'DDR5 Support',
                'PCIe 5.0 Slots',
                'WiFi 6E + Bluetooth 5.3',
                '3 Year Warranty'
            ],
            image: 'https://dlcdnwebimgs.asus.com/gain/4A2B1C8D-9F3E-4F5E-8A7B-9C1D2E3F4A5B'
        },
        
        // Networking
        'tp-link-ax73': {
            title: 'TP-Link Archer AX73',
            price: 'UGX 380,000',
            description: 'High-speed WiFi 6 router for seamless connectivity.',
            specs: [
                'AX5400 Dual-Band',
                'WiFi 6 Technology',
                '6 External Antennas',
                '4 Gigabit LAN Ports',
                'HomeShield Security',
                '2 Year Warranty'
            ],
            image: 'https://static.tp-link.com/uploads/product/archer_ax73/1681794429437-archer-ax73-v1-01.png'
        },
        'unifi-u6-pro': {
            title: 'Ubiquiti UniFi U6 Pro',
            price: 'UGX 420,000',
            description: 'Enterprise-grade WiFi 6 access point.',
            specs: [
                'WiFi 6 (802.11ax)',
                '5.3 Gbps Throughput',
                '4x4 MIMO',
                'PoE Powered',
                'Managed via UniFi Controller',
                '1 Year Warranty'
            ],
            image: 'https://dl.ubnt.com/image/u6-pro/datasheet/u6-pro-hero.png'
        },
        'cisco-9200': {
            title: 'Cisco Catalyst 9200',
            price: 'UGX 2,800,000',
            description: 'Enterprise managed switch for business networks.',
            specs: [
                '24 Gigabit Ethernet Ports',
                '4 SFP+ Uplinks',
                'Managed Switch',
                'Layer 3 Features',
                'Limited Lifetime Warranty'
            ],
            image: 'https://www.cisco.com/c/dam/en/us/products/collateral/switches/catalyst-9200-series-switches/c9200-24p-4g-a.png'
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
                <img src="${product.image}" alt="${product.title}" style="max-width:100%; height:auto; border-radius:10px;" onerror="this.src='logo.png'">
            </div>
            <div class="modal-details">
                <h2 style="color:#c0392b;">${product.title}</h2>
                <div class="modal-price" style="font-size:1.8rem; font-weight:bold; color:#c0392b; margin:1rem 0;">${product.price}</div>
                <div class="modal-description" style="margin:1rem 0; line-height:1.6;">${product.description}</div>
                <div class="modal-specs" style="background:#f5f5f5; padding:1.5rem; border-radius:8px; margin:1.5rem 0;">
                    <h4 style="margin-bottom:1rem; color:#333;">Key Specifications:</h4>
                    <ul style="list-style:none; padding:0;">
                        ${product.specs.map(spec => `<li style="margin:0.8rem 0;"><i class="fas fa-check-circle" style="color:#c0392b; margin-right:0.8rem;"></i> ${spec}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-actions" style="display:flex; gap:1rem; margin-top:2rem;">
                    <button class="btn btn-primary" onclick="addToCart('${product.title}')" style="flex:1; padding:1rem;">
                        <i class="fas fa-shopping-cart"></i> Inquire Now
                    </button>
                    <button class="btn btn-secondary" onclick="window.location.href='contact.html'" style="flex:1; padding:1rem;">
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
    alert(`Thank you for your interest in ${productName}!\n\nA member of our team will contact you shortly with more information. You can also reach us directly at +256 704210089.`);
    
    if (typeof trackUserAction === 'function') {
        trackUserAction('product_inquiry', { product: productName });
    }
}

// ===== MODAL CLICK OUTSIDE =====
document.addEventListener('click', function(event) {
    const modal = document.getElementById('quickViewModal');
    if (modal && event.target === modal) {
        closeQuickView();
    }
});

// ===== INITIALIZE PRODUCT FILTERS =====
function initProductFilters() {
    // Check if we're on the services page with product filters
    const filterButtons = document.querySelectorAll('.category-tab');
    if (filterButtons.length > 0) {
        filterProducts('all');
        console.log('Product filters initialized');
    }
}

// ===== DARK MODE TOGGLE =====
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return; // Exit if button doesn't exist on this page
    
    const icon = themeToggle.querySelector('i');
    
    // Check for saved preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update icon
        if (icon) {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
        
        // Save preference
        localStorage.setItem('darkMode', isDark);
    });
}

// Add dynamic styles if not already in CSS
if (!document.querySelector('#dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
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

        .service-modal .modal-content {
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
        
        .quick-view-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 1001;
            justify-content: center;
            align-items: center;
        }

        .quick-view-modal.active {
            display: flex;
        }

        .quick-view-modal .modal-content {
            background: white;
            max-width: 900px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 15px;
            position: relative;
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .modal-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
        }

        @media (max-width: 768px) {
            .modal-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);

}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.addEventListener('DOMContentLoaded', function() {
    // Select all links that have hash links (like #services, #contact)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty links
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
});
