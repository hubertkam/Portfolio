document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.project-carousel__container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.project-carousel__track');
        const slides = carousel.querySelectorAll('.project-carousel__slide');
        const prevButton = carousel.parentElement.querySelector('.project-carousel__button--prev');
        const nextButton = carousel.parentElement.querySelector('.project-carousel__button--next');
        const indicators = carousel.parentElement.querySelectorAll('.project-carousel__indicator');
        const counter = carousel.parentElement.querySelector('.project-carousel__counter');
        
        if (!track || slides.length === 0) return;
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
            
            if (counter) {
                counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
            }
            
            if (prevButton) {
                prevButton.disabled = currentIndex === 0;
            }
            if (nextButton) {
                nextButton.disabled = currentIndex === totalSlides - 1;
            }
        }
        
        function nextSlide() {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateCarousel();
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
        
        function goToSlide(index) {
            if (index >= 0 && index < totalSlides) {
                currentIndex = index;
                updateCarousel();
            }
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        carousel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
        
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        carousel.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
        
        updateCarousel();
        
        carousel.setAttribute('tabindex', '0');
    });
});
