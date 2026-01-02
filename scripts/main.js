// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const headerNav = document.getElementById('headerNav');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.header__nav-link');
    
    function closeMenu() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (headerNav) headerNav.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        if (menuToggle) menuToggle.classList.add('active');
        if (headerNav) headerNav.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Toggle mobile menu
    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (headerNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close button in menu
        if (menuClose) {
            menuClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeMenu();
            });
        }
        
        // Close menu when clicking on overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && headerNav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Prevent menu from closing when clicking inside it
        headerNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Ensure menu works on touch devices
        if (menuToggle) {
            menuToggle.addEventListener('touchend', function(e) {
                e.preventDefault();
                menuToggle.click();
            });
        }
        
        // Fix for iOS Safari
        if (menuOverlay) {
            menuOverlay.addEventListener('touchstart', function(e) {
                e.preventDefault();
            });
            menuOverlay.addEventListener('touchend', function(e) {
                e.preventDefault();
                closeMenu();
            });
        }
    }
    
    // Smooth scroll for anchor links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize EmailJS
    // Replace 'YOUR_PUBLIC_KEY' with your EmailJS public key
    // Get it from: https://dashboard.emailjs.com/admin/integration
    // should be in env but YOLO
    (function() {
        emailjs.init("6kEwmB4NqQhd0k81i"); // Replace with your EmailJS Public Key
    })();
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Disable submit button and show loading state
            if (submitButton) {
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.textContent = 'SENDING...';
                submitButton.style.opacity = '0.7';
                submitButton.style.cursor = 'not-allowed';
                
                // Prepare email parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_name: 'Hubert Kamiński' // Your name
                };
                
                // Send email using EmailJS
                // should be in env but YOLO
                // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS service and template IDs
                emailjs.send('service_ijob117', 'template_vffjf3r', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        showMessage('Thank you for your message! I will get back to you soon.', 'success');
                        contactForm.reset();
                        
                        // Re-enable submit button
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = originalText;
                            submitButton.style.opacity = '1';
                            submitButton.style.cursor = 'pointer';
                        }
                    }, function(error) {
                        console.error('FAILED...', error);
                        showMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
                        
                        // Re-enable submit button
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = originalText;
                            submitButton.style.opacity = '1';
                            submitButton.style.cursor = 'pointer';
                        }
                    });
            }
        });
    }
    
    // Function to show messages to user
    function showMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.textContent = message;
        
        // Insert message before submit button
        const submitButton = document.querySelector('.btn--submit');
        if (submitButton && submitButton.parentNode) {
            submitButton.parentNode.insertBefore(messageEl, submitButton);
        } else {
            // Fallback: append to form
            const form = document.getElementById('contactForm');
            if (form) {
                form.appendChild(messageEl);
            }
        }
        
        // Auto remove message after 5 seconds
        setTimeout(function() {
            if (messageEl.parentNode) {
                messageEl.style.opacity = '0';
                messageEl.style.transform = 'translateY(-10px)';
                setTimeout(function() {
                    messageEl.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--color-bg-primary)';
            header.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
});

