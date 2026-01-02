/**
 * Project Image Carousel
 * Handles slideshow functionality for project images
 * Manual navigation only - no autoplay
 */

document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(carousel => {
        initCarousel(carousel);
    });
    
    function initCarousel(carousel) {
        const slides = carousel.querySelectorAll('.project-carousel__slide');
        const prevButton = carousel.querySelector('.project-carousel__button--prev');
        const nextButton = carousel.querySelector('.project-carousel__button--next');
        const indicators = carousel.querySelectorAll('.project-carousel__indicator');
        const totalSlides = slides.length;
        
        if (totalSlides <= 1) {
            // Hide navigation if only one slide
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            if (indicators.length > 0) {
                indicators.forEach(ind => ind.style.display = 'none');
            }
            return;
        }
        
        let currentSlide = 0;
        
        // Show initial slide
        showSlide(currentSlide);
        
        // Previous button
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                goToSlide(currentSlide - 1);
            });
        }
        
        // Next button
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
        }
        
        // Indicator buttons
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentSlide + 1);
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    goToSlide(currentSlide + 1);
                } else {
                    // Swipe right - previous slide
                    goToSlide(currentSlide - 1);
                }
            }
        }
        
        function goToSlide(index) {
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            showSlide(currentSlide);
        }
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            });
            
            // Show current slide
            slides[index].classList.add('active');
            slides[index].setAttribute('aria-hidden', 'false');
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.add('active');
                    indicator.setAttribute('aria-current', 'true');
                } else {
                    indicator.classList.remove('active');
                    indicator.setAttribute('aria-current', 'false');
                }
            });
            
            // Update slide counter if exists
            const counter = carousel.querySelector('.project-carousel__counter');
            if (counter) {
                counter.textContent = `${index + 1} / ${totalSlides}`;
            }
        }
    }
});
