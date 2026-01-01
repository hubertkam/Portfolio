document.addEventListener('DOMContentLoaded', function() {
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
    
    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (headerNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        if (menuClose) {
            menuClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeMenu();
            });
        }
        
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && headerNav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        headerNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        if (menuToggle) {
            menuToggle.addEventListener('touchend', function(e) {
                e.preventDefault();
                menuToggle.click();
            });
        }
        
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
    
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
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
    
    (function() {
        emailjs.init("6kEwmB4NqQhd0k81i");
    })();
    
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            if (submitButton) {
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.textContent = 'SENDING...';
                submitButton.style.opacity = '0.7';
                submitButton.style.cursor = 'not-allowed';
                
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: message,
                    to_name: 'Hubert Kamiński'
                };
                
                emailjs.send('service_ijob117', 'template_vffjf3r', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        showMessage('Thank you for your message! I will get back to you soon.', 'success');
                        contactForm.reset();
                        
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = originalText;
                            submitButton.style.opacity = '1';
                            submitButton.style.cursor = 'pointer';
                        }
                    }, function(error) {
                        console.error('FAILED...', error);
                        showMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
                        
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
    
    function showMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.textContent = message;
        
        const submitButton = document.querySelector('.btn--submit');
        if (submitButton && submitButton.parentNode) {
            submitButton.parentNode.insertBefore(messageEl, submitButton);
        } else {
            const form = document.getElementById('contactForm');
            if (form) {
                form.appendChild(messageEl);
            }
        }
        
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
