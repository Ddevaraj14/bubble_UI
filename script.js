// BUBBLE CONFIGURATION VARIABLES - Easy to edit manually
const BUBBLE_MARGIN = 20; // Margin from viewport edges (px)
const BUBBLE_CONFIG = [
    {
        id: 'travel-music',
        title: 'Travel Music', 
        icon: '🎵', 
        color: 'linear-gradient(135deg, #a855f7, #ec4899)',
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
        icon: '▶️', 
        color: 'linear-gradient(135deg, #60a5fa, #06b6d4)',
        x: 50, y: 35, z: 120,
        sizeMultiplier: 0.9, // Larger bubble
        zIndex: 10,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'trending',
        title: 'Trending', 
        icon: '⭐', 
        color: 'linear-gradient(135deg, #fb7185, #f97316)',
        x: 15, y: 50, z: 25,
        sizeMultiplier: 0.1,
        zIndex: 3,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'suspense-horror',
        title: 'Suspense Horror', 
        icon: '📷', 
        color: 'linear-gradient(135deg, #fbbf24, #eab308)',
        x: 75, y: 30, z: 90,
        sizeMultiplier: 0.7,
        zIndex: 12,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'friends-la',
        title: 'Friends In LA', 
        icon: '👥', 
        color: 'linear-gradient(135deg, #4ade80, #10b981)',
        x: 85, y: 60, z: 40,
        sizeMultiplier: 0.8,
        zIndex: 5,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'romantic-drama',
        title: 'Romantic Drama', 
        icon: '❤️', 
        color: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        x: 28, y: 70, z: 80,
        sizeMultiplier: 0.9,
        zIndex: 10,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'edge-escapes',
        title: 'Edge-T Or Escapes', 
        icon: '🌍', 
        color: 'linear-gradient(135deg, #f97316, #ef4444)',
        x: 68, y: 72, z: 50,
        sizeMultiplier: 0.85,
        zIndex: 6,
        preserve3D: true // Enable 3D perspective
    },
    {
        id: 'slice-life',
        title: 'Slice Of Life', 
        icon: '⚡', 
        color: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
        x: 48, y: 75, z: 100,
        sizeMultiplier: 0.7,
        zIndex: 50,
        preserve3D: true // Enable 3D perspective
    }
];

// Calculate constrained position within viewport margins
function getConstrainedPosition(xPercent, yPercent, bubbleSize) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Convert percentage to pixels
    let xPx = (xPercent / 100) * vw;
    let yPx = (yPercent / 100) * vh;
    
    // Calculate bubble radius
    const bubbleRadius = bubbleSize / 2;
    
    // Apply constraints with margins
    const minX = BUBBLE_MARGIN + bubbleRadius;
    const maxX = vw - BUBBLE_MARGIN - bubbleRadius;
    const minY = BUBBLE_MARGIN + bubbleRadius;
    const maxY = vh - BUBBLE_MARGIN - bubbleRadius;
    
    // Clamp positions within bounds
    xPx = Math.max(minX, Math.min(maxX, xPx));
    yPx = Math.max(minY, Math.min(maxY, yPx));
    
    // Convert back to percentage for CSS
    return {
        x: (xPx / vw) * 100,
        y: (yPx / vh) * 100
    };
}

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
            const hoverScale = originalScale * 1.2; // 40% larger on hover
            
            console.log(`🔍 Scaling focused bubble to ${hoverScale}x (original: ${originalScale}x)`);
            
            // Direct style application - CSS transitions will handle smoothness
            bubble.style.transform = `translate(-50%, -50%) translateZ(${originalZDepth}px) scale(${hoverScale})`;
            bubble.style.filter = `brightness(1.3) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))`;
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
            bubble.style.filter = `brightness(${brightnessValue}) contrast(0.9)`;
            bubble.style.zIndex = `${newZIndex}`;
            
            console.log(`📍 Moving bubble ${distance.toFixed(0)}px away - Scale: ${proximityScale.toFixed(2)}`);
        }
    });
}

function applyDirectionalSpread(hoveredBubble) {
    console.log('🌊 Applying proximity ripple effect');
    
    const allBubbles = document.querySelectorAll('.bubble');
    const hoveredRect = hoveredBubble.getBoundingClientRect();
    const hoveredCenterX = hoveredRect.left + hoveredRect.width / 2;
    const hoveredCenterY = hoveredRect.top + hoveredRect.height / 2;
    
    allBubbles.forEach(bubble => {
        if (bubble === hoveredBubble) {
            // Highlight the focused bubble
            bubble.style.transform = 'translate(-50%, -50%) scale(1.2)';
            bubble.style.filter = 'brightness(1.2) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))';
            bubble.style.zIndex = '100';
            bubble.style.transition = 'all 0.3s ease-out';
            return;
        }
        
        const rect = bubble.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = centerX - hoveredCenterX;
        const dy = centerY - hoveredCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Simple proximity effect - if within 400px, move away
        if (distance < 400 && distance > 20) {
            const pushDistance = Math.max(80, 200 - distance/2); // Push further if closer
            const directionX = (dx / distance) * pushDistance;
            const directionY = (dy / distance) * pushDistance;
            
            bubble.style.transform = `translate(calc(-50% + ${directionX}px), calc(-50% + ${directionY}px)) scale(0.9)`;
            bubble.style.filter = 'brightness(0.8)';
            bubble.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            bubble.style.zIndex = '5';
            
            console.log(`📍 Moving bubble ${distance.toFixed(0)}px away - Direction: ${directionX.toFixed(0)}, ${directionY.toFixed(0)}`);
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
        bubble.classList.add('zoom-effect');
        setTimeout(() => bubble.classList.remove('zoom-effect'), 600);
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
    
    // Apply 3D z-depth transformation for layered effect
    const zDepth = data.z || data.zDepth || 0;
    const scaleFromDepth = 0.8 + (zDepth / 150) * 0.4; // Scale based on depth (0.8 to 1.2)
    const brightnessFromDepth = 0.7 + (zDepth / 150) * 0.5; // Brightness based on depth (0.7 to 1.2)
    
    const initialTransform = `translate(-50%, -50%) translateZ(${zDepth}px) scale(${scaleFromDepth})`;
    bubble.style.transform = initialTransform;
    bubble.style.filter = `brightness(${brightnessFromDepth}) drop-shadow(0 ${zDepth/5}px ${zDepth/3}px rgba(0, 0, 0, ${0.1 + zDepth/1000}))`;
    
    bubble.innerHTML = `<div class="bubble-inner" style="background: ${data.color};">
        <div class="bubble-content">
            <div class="bubble-icon">${data.icon}</div>
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
    });
    bubble.addEventListener('mouseleave', resetBubblePositions);
    applyClickZoom(bubble);
    addIdleFloatAnimation(bubble);

    return bubble;
}

function initBubbles() {
    const container = document.getElementById('bubblesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    BUBBLE_CONFIG.forEach((config, i) => {
        // Calculate size first to determine constraints
        const bubbleSize = getFixedSizeValue(config);
        
        // Get constrained position within viewport margins
        const constrainedPos = getConstrainedPosition(config.x, config.y, bubbleSize);
        
        // Create bubble data object
        const bubbleData = {
            id: config.id,
            title: config.title,
            icon: config.icon,
            color: config.color,
            x: constrainedPos.x,
            y: constrainedPos.y,
            z: config.z,
            zDepth: config.z,
            zIndex: config.zIndex,
            size: bubbleSize,
            sizeMultiplier: config.sizeMultiplier
        };
        
        const bubble = createBubble(bubbleData);
        container.appendChild(bubble);
        
        console.log(`✅ Created bubble "${config.title}" at (${constrainedPos.x.toFixed(1)}%, ${constrainedPos.y.toFixed(1)}%) with size ${bubbleSize}px`);
    });
}

document.addEventListener('DOMContentLoaded', initBubbles);

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