document.addEventListener('DOMContentLoaded', function() {
    // Video Testimonials Carousel
    function setupVideoTestimonialsCarousel() {
        const videoTestimonials = document.querySelectorAll('.video-testimonial');
        const prevVideoBtn = document.querySelector('.video-nav-btn.prev-btn');
        const nextVideoBtn = document.querySelector('.video-nav-btn.next-btn');
        
        if (!videoTestimonials.length || !prevVideoBtn || !nextVideoBtn) {
            console.log('Missing elements for video testimonials carousel');
            return;
        }
        
        let currentIndex = 0;
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            videoTestimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
                testimonial.classList.remove('active');
            });
            
            // Show the selected testimonial
            videoTestimonials[index].style.display = 'block';
            videoTestimonials[index].classList.add('active');
            
            console.log('Showing testimonial at index:', index);
        }
        
        // Initialize - show the first testimonial
        showTestimonial(currentIndex);
        
        // Previous button click handler
        prevVideoBtn.onclick = function() {
            currentIndex = (currentIndex - 1 + videoTestimonials.length) % videoTestimonials.length;
            showTestimonial(currentIndex);
            console.log('Previous button clicked, new index:', currentIndex);
        };
        
        // Next button click handler
        nextVideoBtn.onclick = function() {
            currentIndex = (currentIndex + 1) % videoTestimonials.length;
            showTestimonial(currentIndex);
            console.log('Next button clicked, new index:', currentIndex);
        };
        
        // For desktop view, we'll show all testimonials
        function handleResize() {
            if (window.innerWidth > 768) {
                // Desktop view - show all testimonials
                videoTestimonials.forEach(testimonial => {
                    testimonial.style.display = 'block';
                });
            } else {
                // Mobile view - only show the current testimonial
                showTestimonial(currentIndex);
            }
        }
        
        // Handle resize events
        window.addEventListener('resize', handleResize);
        
        // Initial setup based on current window size
        handleResize();
        
        console.log('Video testimonials carousel initialized');
    }
    
    // Set up the carousel
    setupVideoTestimonialsCarousel();

    // Fixed Contact Button functionality
    const fixedContactBtn = document.querySelector('.fixed-contact-btn');
    const contactPopup = document.querySelector('.contact-popup');
    const closePopupBtn = document.querySelector('.close-popup-btn');
    
    // Create popup overlay and detail popup elements
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    document.body.appendChild(popupOverlay);
    
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
    
    // Get modal elements
    const modal = document.getElementById('cardModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Handle More Details buttons based on screen size
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
            
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                // Show modal in mobile view
                showCardModal(card);
            } else {
                // Flip card in desktop view
                card.classList.add('flipped');
            }
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
    
    // Function to show card modal
    function showCardModal(card) {
        // Get content from the front and back of the card
        const frontContent = card.querySelector('.flip-card-front');
        const backContent = card.querySelector('.flip-card-back');
        
        // Get the title from front card and list items from back card
        const frontTitle = frontContent.querySelector('h3').textContent;
        const listItems = Array.from(backContent.querySelectorAll('li')).map(item => item.textContent);
        
        // Get images from the card carousel
        const cardImageCarousel = frontContent.querySelector('.card-image-carousel');
        const modalImageCarousel = document.getElementById('modalImageCarousel');
        
        // Clear previous content
        modalImageCarousel.innerHTML = '';
        
        // Add images to modal carousel
        if (cardImageCarousel && cardImageCarousel.querySelectorAll('img').length > 0) {
            const images = Array.from(cardImageCarousel.querySelectorAll('img'));
            
            // Make sure the carousel is visible
            modalImageCarousel.style.display = 'block';
            
            // Clone and add each image to the modal carousel
            images.forEach((img, index) => {
                const clonedImg = img.cloneNode(true);
                // Set display style directly
                clonedImg.style.display = index === 0 ? 'block' : 'none';
                if (index === 0) {
                    clonedImg.classList.add('active');
                }
                modalImageCarousel.appendChild(clonedImg);
            });
            
            // Only add navigation buttons if there are multiple images
            if (images.length > 1) {
                const prevButton = document.createElement('button');
                prevButton.className = 'modal-carousel-nav prev';
                prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
                
                const nextButton = document.createElement('button');
                nextButton.className = 'modal-carousel-nav next';
                nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
                
                modalImageCarousel.appendChild(prevButton);
                modalImageCarousel.appendChild(nextButton);
                
                // Set up carousel navigation
                let currentImageIndex = 0;
                const totalImages = images.length;
                
                prevButton.addEventListener('click', () => {
                    const modalImages = modalImageCarousel.querySelectorAll('img');
                    modalImages[currentImageIndex].style.display = 'none';
                    modalImages[currentImageIndex].classList.remove('active');
                    
                    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
                    
                    modalImages[currentImageIndex].style.display = 'block';
                    modalImages[currentImageIndex].classList.add('active');
                });
                
                nextButton.addEventListener('click', () => {
                    const modalImages = modalImageCarousel.querySelectorAll('img');
                    modalImages[currentImageIndex].style.display = 'none';
                    modalImages[currentImageIndex].classList.remove('active');
                    
                    currentImageIndex = (currentImageIndex + 1) % totalImages;
                    
                    modalImages[currentImageIndex].style.display = 'block';
                    modalImages[currentImageIndex].classList.add('active');
                });
            }
        } else {
            // Hide carousel container if no images
            modalImageCarousel.style.display = 'none';
        }
        
        // Update modal content
        modalTitle.textContent = frontTitle;
        modalBody.innerHTML = `<ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>`;
        
        // Show modal and overlay
        modal.classList.add('show');
        modalOverlay.classList.add('show');
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('show');
        modalOverlay.classList.remove('show');
    }
    
    // Close modal when clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking the overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
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
    
    // Countdown Timer functionality
    function startCountdownTimer() {
        const countdown = document.querySelector('.countdown');
        if (!countdown) return;
        
        // Get the time values from HTML
        const timeValues = countdown.querySelectorAll('.time-value');
        if (timeValues.length !== 3) return;
        
        // Initial values (hours, minutes, seconds)
        let hours = parseInt(timeValues[0].textContent);
        let minutes = parseInt(timeValues[1].textContent);
        let seconds = parseInt(timeValues[2].textContent);
        
        // Update the countdown every second
        const timer = setInterval(function() {
            // Decrease seconds
            seconds--;
            
            // Handle time rollover
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    
                    if (hours < 0) {
                        // Timer completed
                        clearInterval(timer);
                        hours = 0;
                        minutes = 0;
                        seconds = 0;
                    }
                }
            }
            
            // Update the display
            timeValues[0].textContent = hours.toString().padStart(2, '0');
            timeValues[1].textContent = minutes.toString().padStart(2, '0');
            timeValues[2].textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }
    
    // Start the countdown timer
    startCountdownTimer();
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        // Close any open popups on resize
        const detailPopup = document.querySelector('.detail-popup');
        if (detailPopup && detailPopup.classList.contains('active')) {
            detailPopup.classList.remove('active');
            popupOverlay.classList.remove('active');
        }
    });
});
