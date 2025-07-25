// Sports Streaming Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add page entry animation
    initializePageEntryAnimation();
    
    // Initialize the page
    initializeInteractions();
    setupHoverEffects();
    setupResponsiveFeatures();
    initializeCarousels();
});

function handleBackButton() {
    console.log('Navigating back to bubble UI...');
    window.location.href = 'index.html';
}

// Carousel functionality
function scrollCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const cardWidth = carousel.querySelector('.content-card').offsetWidth + 16; // card width + gap
    const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time
    
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function initializeCarousels() {
    // Add mouse wheel scrolling support for carousels
    const carousels = document.querySelectorAll('.content-grid');
    
    carousels.forEach(carousel => {
        carousel.addEventListener('wheel', (e) => {
            e.preventDefault();
            carousel.scrollBy({
                left: e.deltaY * 2,
                behavior: 'smooth'
            });
        });
    });
    
    // Update arrow states based on scroll position
    const carouselContainers = document.querySelectorAll('.carousel-container');
    
    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.content-grid');
        const leftArrow = container.querySelector('.carousel-arrow.left');
        const rightArrow = container.querySelector('.carousel-arrow.right');
        
        function updateArrowStates() {
            // Check if at the beginning
            if (carousel.scrollLeft <= 0) {
                leftArrow.disabled = true;
            } else {
                leftArrow.disabled = false;
            }
            
            // Check if at the end
            if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                rightArrow.disabled = true;
            } else {
                rightArrow.disabled = false;
            }
        }
        
        // Initial state
        updateArrowStates();
        
        // Update on scroll
        carousel.addEventListener('scroll', updateArrowStates);
    });
}

function initializePageEntryAnimation() {
    // Create entry animation from bubble transition
    const body = document.body;
    body.style.opacity = '0';
    body.style.transform = 'scale(0.95)';
    body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    // Animate page in
    setTimeout(() => {
        body.style.opacity = '1';
        body.style.transform = 'scale(1)';
    }, 100);
    
    // Add staggered animation to content sections
    const sections = document.querySelectorAll('.content-section, .hero-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
}

function initializeInteractions() {
    // Add click handlers for cards
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.addEventListener('click', handleCardClick);
        card.addEventListener('mouseenter', handleCardHover);
    });

    // Add click handlers for hero buttons
    const watchBtn = document.querySelector('.btn-primary');
    const moreInfoBtn = document.querySelector('.btn-secondary');
    
    if (watchBtn) {
        watchBtn.addEventListener('click', handleWatchClick);
    }
    
    if (moreInfoBtn) {
        moreInfoBtn.addEventListener('click', handleMoreInfoClick);
    }
}

function handleCardClick(event) {
    const card = event.currentTarget;
    const title = card.querySelector('h3')?.textContent || 'Content';
    const isLive = card.querySelector('.live-badge');
    
    // Add click animation
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    // Simulate content action
    console.log(`Playing: ${title}${isLive ? ' (LIVE)' : ''}`);
    
    // You can add navigation logic here
    // window.location.href = `/watch/${encodeURIComponent(title)}`;
}

function handleCardHover(event) {
    const card = event.currentTarget;
    const image = card.querySelector('img');
    
    if (image) {
        // Add subtle glow effect
        card.style.boxShadow = '0px 0px 0px 3px rgba(237, 237, 237, 1)';
    }
    
    // Remove effect on mouse leave
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    }, { once: true });
}

function handleWatchClick() {
    console.log('Starting to watch Africa Cup of Nations...');
    // Add watch functionality here
    showNotification('Starting stream...', 'success');
}

function handleMoreInfoClick() {
    console.log('Showing more info for Africa Cup of Nations...');
    // Add more info functionality here
    showMoreInfoModal();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#4CAF50' : '#2196F3'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function showMoreInfoModal() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: '1000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'modal-content';
    Object.assign(modal.style, {
        backgroundColor: '#2a2a2a',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '90%',
        color: 'white',
        transform: 'scale(0.9)',
        transition: 'transform 0.3s ease'
    });
    
    modal.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h2 style="margin: 0; font-size: 1.5rem;">Africa Cup of Nations</h2>
            <button class="close-modal" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
        </div>
        <div style="margin-bottom: 1rem;">
            <strong>Time:</strong> 9:00 - 11:00 PM
        </div>
        <div style="margin-bottom: 1rem;">
            <strong>Type:</strong> Live Sports Event
        </div>
        <div style="margin-bottom: 1.5rem;">
            <strong>Description:</strong> Watch the exciting Africa Cup of Nations live. Experience the passion, skill, and drama of African football at its finest.
        </div>
        <div style="display: flex; gap: 1rem;">
            <button class="modal-watch-btn" style="flex: 1; padding: 0.8rem; background: white; color: black; border: none; border-radius: 4px; font-weight: 600; cursor: pointer;">
                ▶ Watch Now
            </button>
            <button class="modal-reminder-btn" style="flex: 1; padding: 0.8rem; background: rgba(109, 109, 110, 0.7); color: white; border: none; border-radius: 4px; font-weight: 600; cursor: pointer;">
                🔔 Set Reminder
            </button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 100);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    const watchBtn = modal.querySelector('.modal-watch-btn');
    const reminderBtn = modal.querySelector('.modal-reminder-btn');
    
    function closeModal() {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    
    watchBtn.addEventListener('click', () => {
        closeModal();
        handleWatchClick();
    });
    
    reminderBtn.addEventListener('click', () => {
        closeModal();
        showNotification('Reminder set for Africa Cup of Nations', 'success');
    });
}

function setupHoverEffects() {
    // Hero mouse interaction removed per user request
}

function setupResponsiveFeatures() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            adjustLayoutForScreenSize();
        }, 250);
    });
    
    // Initial adjustment
    adjustLayoutForScreenSize();
}

function adjustLayoutForScreenSize() {
    const screenWidth = window.innerWidth;
    const contentGrids = document.querySelectorAll('.content-grid');
    
    contentGrids.forEach(grid => {
        if (screenWidth <= 480) {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(140px, 1fr))';
        } else if (screenWidth <= 768) {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
        } else {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        }
    });
}

// Intersection Observer for lazy loading and animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all content cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize intersection observer when page loads
document.addEventListener('DOMContentLoaded', setupIntersectionObserver);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.click();
        }
    }
});
