// BUBBLE CONFIGURATION VARIABLES - Easy to edit manually
const BUBBLE_MARGIN = 20; // Margin from viewport edges (px)
const BUBBLE_CONFIG = [
    {
        id: 'travel-music',
        title: 'Travel Music',
        color: 'linear-gradient(135deg, #a855f7, #ec4899)',
        backgroundImage: 'img/Travel_Music.png',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        // Position as percentage (will be constrained to viewport with margins)
        x: 32, y: 30, z: 30,
        // Size multiplier (1.0 = base size, 0.8 = smaller, 1.2 = larger)
        sizeMultiplier: 0.70,
        zIndex: 8,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'live-sports',
        title: 'Live Sports',
        color: 'linear-gradient(135deg, #60a5fa, #06b6d4)',
        backgroundImage: 'img/Live_Sports.png',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        x: 50, y: 35, z: 120,
        sizeMultiplier: 0.9, // Larger bubble
        zIndex: 10,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'trending',
        title: 'Trending',
        color: 'linear-gradient(135deg, #fb7185, #f97316)',
        backgroundImage: 'img/Trending.png',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        x: 15, y: 50, z: 25,
        sizeMultiplier: 0.1,
        zIndex: 3,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'suspense-horror',
        title: 'Suspense Horror',
        color: 'linear-gradient(135deg, #fbbf24, #eab308)',
        backgroundImage: 'img/Suspense_Horror.png',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        x: 75, y: 30, z: 90,
        sizeMultiplier: 0.7,
        zIndex: 12,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'friends-la',
        title: 'Friends In LA',
        color: 'linear-gradient(135deg, #4ade80, #10b981)',
        backgroundImage: 'img/Friends.png',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        x: 85, y: 60, z: 40,
        sizeMultiplier: 0.8,
        zIndex: 5,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'romantic-drama',
        title: 'Romantic Drama',
        color: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        backgroundImage: 'img/Romantic_Drama.png',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        x: 28, y: 70, z: 80,
        sizeMultiplier: 0.9,
        zIndex: 10,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'edge-escapes',
        title: 'Edge-T Or Escapes',
        color: 'linear-gradient(135deg, #f97316, #ef4444)',
        backgroundImage: 'img/Edge_Escapes.png',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        x: 68, y: 72, z: 50,
        sizeMultiplier: 0.85,
        zIndex: 6,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'slice-life',
        title: 'Slice Of Life',
        color: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
        backgroundImage: 'img/Nostalgie.png',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        x: 48, y: 75, z: 100,
        sizeMultiplier: 0.7,
        zIndex: 50,
        preserve3D: true // Enable 3D perspective
    }
];

// Generate responsive bubble positions based on screen size with constraints
function getResponsivePositions() {
    return BUBBLE_CONFIG.map(config => ({
        x: config.x,
        y: config.y,
        z: config.z
    }));
}

function getFixedSizeValue(config) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let baseSize;

    if (vw <= 480) {
        baseSize = Math.floor(vw * 0.25); // Smaller on mobile
    } else if (vw <= 768) {
        baseSize = Math.floor(vw * 0.22); // Medium on tablet
    } else if (vw <= 1200) {
        baseSize = 280; // Fixed size for desktop
    } else {
        baseSize = 320; // Larger on big screens
    }

    // Ensure minimum and maximum sizes
    baseSize = Math.max(baseSize, 100); // Minimum size
    baseSize = Math.min(baseSize, 450); // Maximum size

    // Apply size multiplier from config
    const multiplier = config.sizeMultiplier || 1.0;
    return Math.floor(baseSize * multiplier);
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Enhanced proximity ripple effect with proper bubble container scaling
 * When hovering on a bubble, nearby bubbles move away creating a ripple effect
 */
function applyProximityRipple(hoveredBubble) {
    console.log('🎯 Applying proximity ripple effect');
    const allBubbles = document.querySelectorAll('.bubble');
    const hoveredRect = hoveredBubble.getBoundingClientRect();
    const hoveredCenterX = hoveredRect.left + hoveredRect.width / 2;
    const hoveredCenterY = hoveredRect.top + hoveredRect.height / 2;
    
    allBubbles.forEach(bubble => {
        if (bubble === hoveredBubble) {
            // Get original values for proper scaling
            const originalZDepth = bubble.dataset.originalZDepth || '0';
            const originalScale = parseFloat(bubble.dataset.originalScale) || 1;
            const hoverScale = originalScale * 1.4; // 40% larger on hover
            
            console.log(`🔍 Scaling focused bubble to ${hoverScale}x (original: ${originalScale}x)`);
            
            // Direct style application - CSS transitions will handle smoothness
            bubble.style.transform = `translate(-50%, -50%) translateZ(${originalZDepth}px) scale(${hoverScale})`;
            bubble.style.filter = `brightness(1.05) contrast(0.85) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))`;
            bubble.style.zIndex = '100';
            return;
        }
        
        const rect = bubble.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = centerX - hoveredCenterX;
        const dy = centerY - hoveredCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 400 && distance > 20) {
            const pushDistance = Math.max(80, 200 - distance / 2);
            const directionX = (dx / distance) * pushDistance;
            const directionY = (dy / distance) * pushDistance;
            
            const proximityFactor = 1 - (distance / 400);
            const originalScale = parseFloat(bubble.dataset.originalScale) || 1;
            const proximityScale = originalScale * (0.85 + proximityFactor * 0.1);
            const brightnessValue = 0.7 + (proximityFactor * 0.2);
            const newZIndex = Math.floor(50 + (proximityFactor * 40));
            const originalZDepth = bubble.dataset.originalZDepth || '0';
            
            // Direct style application
            bubble.style.transform = `translate(calc(-50% + ${directionX}px), calc(-50% + ${directionY}px)) translateZ(${originalZDepth}px) scale(${proximityScale})`;
            bubble.style.filter = `brightness(${brightnessValue}) contrast(0.75)`;
            bubble.style.zIndex = `${newZIndex}`;
            
            console.log(`📍 Moving bubble ${distance.toFixed(0)}px away - Scale: ${proximityScale.toFixed(2)}`);
        }
    });
}

/**
 * Reset all bubbles to their original positions
 */
function resetBubblePositions() {
    console.log('🔄 Resetting all bubble positions');
    const allBubbles = document.querySelectorAll('.bubble');
    
    allBubbles.forEach(bubble => {
        const originalLeft = parseFloat(bubble.dataset.originalLeft);
        const originalTop = parseFloat(bubble.dataset.originalTop);
        const originalZDepth = bubble.dataset.originalZDepth || '0';
        const originalScale = parseFloat(bubble.dataset.originalScale) || 1;
        
        // Only reset transform, filter, and z-index - don't change left/top positions
        bubble.style.transform = `translate(-50%, -50%) translateZ(${originalZDepth}px) scale(${originalScale})`;
        bubble.style.filter = `brightness(${0.7 + (parseFloat(originalZDepth) / 150) * 0.5}) drop-shadow(0 ${originalZDepth/5}px ${originalZDepth/3}px rgba(0, 0, 0, ${0.1 + originalZDepth/1000}))`;
        bubble.style.zIndex = bubble.dataset.originalZIndex || '10';
        
        console.log(`↩️ Reset bubble to scale: ${originalScale}x, keeping position: ${originalLeft}%, ${originalTop}%`);
    });
}

function addIdleFloatAnimation(bubble) {
    // Disable JavaScript animation to prevent conflicts with hover effects
    // CSS animation will handle the floating effect
}

function applyClickZoom(bubble) {
    bubble.addEventListener('click', () => {
        // Prevent multiple clicks during transition
        if (bubble.classList.contains('transitioning')) return;
        
        bubble.classList.add('zoom-effect', 'transitioning');
        
        // Preload the sports streaming page
        preloadSportsPage().then(() => {
            // Create smooth page transition with reveal effect
            createRevealTransition(bubble);
        });
        
        setTimeout(() => bubble.classList.remove('zoom-effect'), 600);
    });
}

function preloadSportsPage() {
    return new Promise((resolve, reject) => {
        // Create hidden iframe to preload the page
        const preloadFrame = document.createElement('iframe');
        preloadFrame.src = 'sports-streaming.html';
        preloadFrame.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border: none;
            opacity: 0;
            pointer-events: none;
            z-index: -1;
        `;
        
        preloadFrame.onload = () => {
            console.log('Sports page preloaded successfully');
            resolve(preloadFrame);
        };
        
        preloadFrame.onerror = () => {
            console.warn('Failed to preload sports page, proceeding anyway');
            resolve(null);
        };
        
        document.body.appendChild(preloadFrame);
        
        // Fallback timeout
        setTimeout(() => {
            resolve(preloadFrame);
        }, 1000);
    });
}

function createRevealTransition(clickedBubble) {
    console.log('Starting seamless fullscreen scaling transition');
    
    // Exit other bubbles immediately
    exitOtherBubbles(clickedBubble);
    
    // Create black transition overlay
    const blackOverlay = document.createElement('div');
    blackOverlay.className = 'black-transition-overlay';
    document.body.appendChild(blackOverlay);
    
    // Get bubble position and viewport dimensions
    const bubbleRect = clickedBubble.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxDimension = Math.max(vw, vh);
    const bubbleSize = parseFloat(clickedBubble.style.width) || 200;
    const fullscreenScale = (maxDimension * 1.5) / bubbleSize; // Scale to cover entire screen
    
    // Setup clicked bubble for smooth scaling
    clickedBubble.style.zIndex = '10001'; // Above black overlay
    clickedBubble.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    clickedBubble.style.transformOrigin = 'center center';
    clickedBubble.classList.add('scaling-to-fullscreen');
    
    // Activate black overlay immediately
    setTimeout(() => {
        blackOverlay.classList.add('active');
    }, 50);
    
    // Start seamless scaling immediately
    setTimeout(() => {
        // Scale bubble to fullscreen
        clickedBubble.style.left = '50%';
        clickedBubble.style.top = '50%';
        clickedBubble.style.transform = `translate(-50%, -50%) scale(${fullscreenScale})`;
        clickedBubble.style.borderRadius = '0%';
        clickedBubble.style.opacity = '1';
        
        console.log(`Seamless scaling: Bubble to ${fullscreenScale}x with black background`);
    }, 16); // Single frame delay for smooth animation start
    
    // Navigate to actual page at the right moment for seamless transition
    setTimeout(() => {
        window.location.href = 'sports-streaming.html';
    }, 600); // Navigate earlier while bubble is still scaling
}

function exitOtherBubbles(clickedBubble) {
    const allBubbles = document.querySelectorAll('.bubble');
    const clickedRect = clickedBubble.getBoundingClientRect();
    const clickedCenterX = clickedRect.left + clickedRect.width / 2;
    const clickedCenterY = clickedRect.top + clickedRect.height / 2;
    
    allBubbles.forEach((bubble, index) => {
        if (bubble === clickedBubble) return;
        
        // Calculate exit direction from clicked bubble
        const bubbleRect = bubble.getBoundingClientRect();
        const bubbleCenterX = bubbleRect.left + bubbleRect.width / 2;
        const bubbleCenterY = bubbleRect.top + bubbleRect.height / 2;
        
        const deltaX = bubbleCenterX - clickedCenterX;
        const deltaY = bubbleCenterY - clickedCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Normalize direction and create dramatic exit
        const exitDistance = Math.max(window.innerWidth, window.innerHeight) * 1.5;
        const exitX = (deltaX / distance) * exitDistance;
        const exitY = (deltaY / distance) * exitDistance;
        
        // Add exit animation class and styles
        bubble.classList.add('exiting-bubble');
        bubble.style.transition = `all 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        bubble.style.zIndex = '9000';
        
        // Stagger the exit animations
        setTimeout(() => {
            bubble.style.transform = `translate(calc(-50% + ${exitX}px), calc(-50% + ${exitY}px)) scale(0.2) rotateX(${Math.random() * 180}deg) rotateY(${Math.random() * 180}deg)`;
            bubble.style.opacity = '0';
            
            console.log(`Exiting bubble ${index + 1}`);
        }, index * 40); // Reduced stagger for faster exits
    });
}

// main.js
function createBubble(data) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${data.x}%`;
    bubble.style.top = `${data.y}%`;
    bubble.style.width = `${data.size}px`;
    bubble.style.height = `${data.size}px`;
    bubble.style.zIndex = data.zIndex || 1;
    
    // Apply 3D z-depth transformation for layered effect (without brightness)
    const zDepth = data.z || data.zDepth || 0;
    const scaleFromDepth = 0.8 + (zDepth / 150) * 0.4; // Scale based on depth (0.8 to 1.2)
    
    const initialTransform = `translate(-50%, -50%) translateZ(${zDepth}px) scale(${scaleFromDepth})`;
    bubble.style.transform = initialTransform;
    
    // Create layered background - content image behind bubble texture
    const backgroundStyle = data.backgroundImage 
        ? `background-image: url('img/bubble_img.png'), url('${data.backgroundImage}'); 
           background-size: cover, cover; 
           background-position: center, center; 
           background-repeat: no-repeat, no-repeat;
           background-blend-mode: hard-light;`
        : `background-image: url('img/bubble_img.png'); 
           background-size: cover; 
           background-position: center; 
           background-repeat: no-repeat;`;

    // Create bubble content with video and poster
    const videoElement = data.videoUrl 
        ? `<video class="bubble-video" muted loop preload="metadata">
               <source src="${data.videoUrl}" type="video/mp4">
           </video>` 
        : '';

    bubble.innerHTML = `<div class="bubble-inner" style="${backgroundStyle}">
        ${videoElement}
        <div class="bubble-poster" style="${backgroundStyle}"></div>
        <div class="bubble-overlay"></div>
        <div class="bubble-content">
            <div class="bubble-title">${data.title}</div>
        </div>
    </div>`;

    // Store original values for proximity effects
    bubble.dataset.originalZIndex = data.zIndex || 1;
    bubble.dataset.originalZDepth = zDepth;
    bubble.dataset.originalScale = scaleFromDepth;
    bubble.dataset.originalTransform = initialTransform;
    bubble.dataset.originalLeft = data.x;  // Store original left percentage
    bubble.dataset.originalTop = data.y;   // Store original top percentage

    bubble.addEventListener('mouseenter', () => {
        console.log('🌊 Applying proximity ripple effect');
        applyProximityRipple(bubble);
        // Start video on hover
        playVideoOnHover(bubble);
    });
    bubble.addEventListener('mouseleave', () => {
        resetBubblePositions();
        // Stop video on mouse leave
        stopVideoOnLeave(bubble);
    });
    applyClickZoom(bubble);
    addIdleFloatAnimation(bubble);

    return bubble;
}

// Video hover functionality
function playVideoOnHover(bubble) {
    const video = bubble.querySelector('.bubble-video');
    const poster = bubble.querySelector('.bubble-poster');
    
    if (video && poster) {
        console.log('🎬 Starting video playback on hover');
        
        // Fade out poster and fade in video
        poster.style.transition = 'opacity 0.5s ease-in-out';
        poster.style.opacity = '0';
        
        video.style.transition = 'opacity 0.5s ease-in-out';
        video.style.opacity = '1';
        
        // Start video playback
        video.currentTime = 0; // Start from beginning
        video.play().catch(err => {
            console.log('Video autoplay blocked:', err);
        });
    }
}

function stopVideoOnLeave(bubble) {
    const video = bubble.querySelector('.bubble-video');
    const poster = bubble.querySelector('.bubble-poster');
    
    if (video && poster) {
        console.log('🎬 Stopping video playback on mouse leave');
        
        // Fade out video and fade in poster
        video.style.transition = 'opacity 0.5s ease-in-out';
        video.style.opacity = '0';
        
        poster.style.transition = 'opacity 0.5s ease-in-out';
        poster.style.opacity = '1';
        
        // Stop and reset video
        video.pause();
        video.currentTime = 0;
    }
}

function initBubbles() {
    const container = document.getElementById('bubblesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    BUBBLE_CONFIG.forEach((config, i) => {
        // Calculate size first
        const bubbleSize = getFixedSizeValue(config);
        
        // Use original percentage positions directly (no viewport-based constraints)
        const bubbleData = {
            id: config.id,
            title: config.title,
            color: config.color,
            backgroundImage: config.backgroundImage, // Pass background image if available
            videoUrl: config.videoUrl, // Pass video URL for hover functionality
            x: config.x,  // Use original percentage directly
            y: config.y,  // Use original percentage directly
            z: config.z,
            zDepth: config.z,
            zIndex: config.zIndex,
            size: bubbleSize,
            sizeMultiplier: config.sizeMultiplier
        };
        
        const bubble = createBubble(bubbleData);
        container.appendChild(bubble);
        
        console.log(`✅ Created bubble "${config.title}" at (${config.x}%, ${config.y}%) with size ${bubbleSize}px`);
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    // Handle search input events
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchBubbles(query);
    });
    
    // Handle Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.toLowerCase().trim();
            if (query) {
                performSearch(query);
            }
        }
    });
    
    // Handle search button click
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query) {
            performSearch(query);
        } else {
            searchInput.focus();
        }
    });
    
    // Clear search when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchInput.value = '';
            clearSearch();
        }
    });
}

function searchBubbles(query) {
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach(bubble => {
        const title = bubble.querySelector('.bubble-title')?.textContent.toLowerCase() || '';
        const bubbleId = bubble.id.replace('-bubble', '').replace('-', ' ');
        
        if (query === '' || title.includes(query) || bubbleId.includes(query)) {
            bubble.style.opacity = '1';
            bubble.style.transform = bubble.dataset.originalTransform || bubble.style.transform;
        } else {
            bubble.style.opacity = '0.3';
            bubble.style.transform = (bubble.dataset.originalTransform || bubble.style.transform) + ' scale(0.8)';
        }
    });
}

function performSearch(query) {
    console.log(`🔍 Searching for: "${query}"`);
    
    // Find matching bubble
    const matchingBubble = BUBBLE_CONFIG.find(config => 
        config.title.toLowerCase().includes(query) || 
        config.id.toLowerCase().includes(query)
    );
    
    if (matchingBubble) {
        const bubbleElement = document.getElementById(`${matchingBubble.id}-bubble`);
        if (bubbleElement) {
            // Highlight the matching bubble
            bubbleElement.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
            bubbleElement.style.transform = bubbleElement.dataset.originalTransform + ' scale(1.1)';
            
            // Remove highlight after 2 seconds
            setTimeout(() => {
                bubbleElement.style.boxShadow = '';
                bubbleElement.style.transform = bubbleElement.dataset.originalTransform;
            }, 2000);
        }
    } else {
        // Show "no results" feedback
        console.log(`❌ No results found for: "${query}"`);
    }
}

function clearSearch() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        bubble.style.opacity = '1';
        bubble.style.transform = bubble.dataset.originalTransform || bubble.style.transform;
        bubble.style.boxShadow = '';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initBubbles();
    initSearch();
});

// Recalculate bubble positions on window resize to maintain margins
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('🔄 Recalculating bubble positions for new viewport size');
        initBubbles();
    }, 250); // Debounce resize events
});

// Add to CSS
/*
.zoom-effect {
    animation: zoom-burst 0.6s ease-in-out;
}

@keyframes zoom-burst {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}
*/