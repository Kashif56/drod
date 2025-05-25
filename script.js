document.addEventListener('DOMContentLoaded', function() {
    // Fixed Contact Button functionality
    const fixedContactBtn = document.querySelector('.fixed-contact-btn');
    const contactPopup = document.querySelector('.contact-popup');
    const closePopupBtn = document.querySelector('.close-popup-btn');
    
    if (fixedContactBtn && contactPopup && closePopupBtn) {
        // Open popup when contact button is clicked
        fixedContactBtn.addEventListener('click', function() {
            contactPopup.classList.add('active');
        });
        
        // Close popup when close button is clicked
        closePopupBtn.addEventListener('click', function() {
            contactPopup.classList.remove('active');
        });
        
        // Close popup when clicking outside
        document.addEventListener('click', function(e) {
            if (!contactPopup.contains(e.target) && e.target !== fixedContactBtn && !fixedContactBtn.contains(e.target)) {
                contactPopup.classList.remove('active');
            }
        });
    }
    
    // Testimonials Carousel functionality
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-btn.prev-btn');
    const nextBtn = document.querySelector('.testimonial-btn.next-btn');
    
    if (testimonialsWrapper && testimonialCards.length > 0) {
        let currentPosition = 0;
        const cardWidth = testimonialCards[0].offsetWidth;
        const gap = 20; // Gap between cards in pixels
        const totalCards = testimonialCards.length;
        const visibleCards = window.innerWidth < 768 ? 1 : 4;
        const maxPosition = Math.max(0, totalCards - visibleCards);
        
        // Function to update carousel position
        const updateCarouselPosition = () => {
            const translateX = currentPosition * -(cardWidth + gap);
            testimonialsWrapper.style.transform = `translateX(${translateX}px)`;
            
            // Add animation to visible cards
            testimonialCards.forEach((card, index) => {
                card.style.animation = 'none';
                if (index >= currentPosition && index < currentPosition + visibleCards) {
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.5s ease-out forwards';
                    }, 50);
                }
            });
            
            // Update button states
            prevBtn.disabled = currentPosition === 0;
            nextBtn.disabled = currentPosition >= maxPosition;
            
            // Update button opacity based on disabled state
            prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
            nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        };
        
        // Initialize carousel
        updateCarouselPosition();
        
        // Add event listeners to buttons
        prevBtn.addEventListener('click', () => {
            if (currentPosition > 0) {
                currentPosition--;
                updateCarouselPosition();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentPosition < maxPosition) {
                currentPosition++;
                updateCarouselPosition();
            }
        });
        
        // Update on window resize
        window.addEventListener('resize', () => {
            // Recalculate visible cards based on window width
            const newVisibleCards = window.innerWidth < 768 ? 1 : 4;
            const newMaxPosition = Math.max(0, totalCards - newVisibleCards);
            
            // Adjust current position if needed
            if (currentPosition > newMaxPosition) {
                currentPosition = newMaxPosition;
            }
            
            // Update carousel
            updateCarouselPosition();
        });
    }

    // Flip card functionality
    const flipCards = document.querySelectorAll('.flip-card');
    const moreDetailsButtons = document.querySelectorAll('.more-details-btn');
    const backButtons = document.querySelectorAll('.back-btn');
    
    // Make the More Details buttons flip the cards
    moreDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent the card click event from firing
            const card = this.closest('.flip-card');
            const cardFront = card.querySelector('.flip-card-front');
            const cardBack = card.querySelector('.flip-card-back');
            
            // Apply matching background class to back card
            if (cardFront.classList.contains('purple-card')) {
                cardBack.classList.add('purple-back');
            } else if (cardFront.classList.contains('blue-card')) {
                cardBack.classList.add('blue-back');
            } else if (cardFront.classList.contains('dark-card')) {
                cardBack.classList.add('dark-back');
            }
            
            card.classList.add('flipped');
        });
    });
    
    // Make the Back buttons flip the cards back
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent the card click event from firing
            const card = this.closest('.flip-card');
            card.classList.remove('flipped');
        });
    });
    
    // Make cards clickable (but not when clicking buttons)
    flipCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't flip if clicking on a button
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
            
            // Toggle flipped state
            this.classList.toggle('flipped');
        });
    });
    
    // Card image carousel functionality
    const setupCardCarousels = () => {
        const cardImagesContainers = document.querySelectorAll('.card-image-carousel');
        
        cardImagesContainers.forEach(container => {
            const images = container.querySelectorAll('img');
            if (images.length <= 1) return; // Skip if there's only one image
            
            let currentImageIndex = 0;
            const totalImages = images.length;
            
            // Hide all images except the first one
            images.forEach((img, index) => {
                if (index !== 0) img.style.display = 'none';
            });
            
            // Create navigation buttons
            const prevButton = document.createElement('button');
            prevButton.className = 'carousel-nav prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            const nextButton = document.createElement('button');
            nextButton.className = 'carousel-nav next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            container.appendChild(prevButton);
            container.appendChild(nextButton);
            
            // Add event listeners to buttons
            prevButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card flip
                images[currentImageIndex].style.display = 'none';
                currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
                images[currentImageIndex].style.display = 'block';
            });
            
            nextButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card flip
                images[currentImageIndex].style.display = 'none';
                currentImageIndex = (currentImageIndex + 1) % totalImages;
                images[currentImageIndex].style.display = 'block';
            });
        });
    };
    
    // Run the carousel setup
    setupCardCarousels();

    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    // Initialize the first FAQ item as open
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Button hover effects for non-flip buttons
    const regularButtons = document.querySelectorAll('button:not(.more-details-btn):not(.back-btn)');
    
    regularButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add animation classes to flip cards when they come into view
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.flip-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.classList.add('animate-in');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
