// Click Effect - Create particles on click
document.addEventListener('click', (e) => {
    createParticles(e.clientX, e.clientY);
});

function createParticles(x, y) {
    const particleContainer = document.getElementById('particle-container');
    const particleEmojis = ['✨', '⭐', '💫', '🔥', '💥', '⚡', '🎮', '🎯', '🏆'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random emoji
        const emoji = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
        particle.textContent = emoji;
        
        // Random position offset
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        // Set CSS variables for animation
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // Set position
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.transform = 'translate(-50%, -50%)';
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Game Card Click Effects
const gameCards = document.querySelectorAll('.game-card');

gameCards.forEach(card => {
    // Add ripple effect on click
    card.addEventListener('click', function(e) {
        // Don't prevent default - let the link work
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    // Double click effect
    card.addEventListener('dblclick', function(e) {
        e.preventDefault();
        createParticles(e.clientX, e.clientY);
        
        // Flash effect
        const cardContent = this.querySelector('.card-content');
        cardContent.style.animation = 'flash 0.3s ease-out';
        setTimeout(() => {
            cardContent.style.animation = '';
        }, 300);
    });
});

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes flash {
        0% {
            background-color: rgba(255, 107, 107, 0.5);
        }
        100% {
            background-color: transparent;
        }
    }
`;
document.head.appendChild(style);

// Game card interaction sound feedback (optional visual feedback)
gameCards.forEach(card => {
    const playBtn = card.querySelector('.play-btn');
    
    playBtn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    playBtn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.15)';
    });
    
    playBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1.1)';
    });
});

// Keyboard navigation
let currentCardIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentCardIndex = (currentCardIndex + 1) % gameCards.length;
        gameCards[currentCardIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        gameCards[currentCardIndex].style.borderColor = 'var(--primary-color)';
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentCardIndex = (currentCardIndex - 1 + gameCards.length) % gameCards.length;
        gameCards[currentCardIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        gameCards[currentCardIndex].style.borderColor = 'var(--primary-color)';
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const link = gameCards[currentCardIndex].querySelector('.play-btn');
        window.open(link.href, '_blank');
    }
});

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Random background particle effect (subtle stars)
const createStarField = () => {
    const container = document.querySelector('.container');
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.width = Math.random() * 2 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.background = '#fff';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.5;
        star.style.zIndex = '-1';
        star.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(255,255,255,${Math.random() * 0.5})`;
        
        // Twinkling animation
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        
        document.body.appendChild(star);
    }
};

// Add twinkle animation
const tweakStyle = document.createElement('style');
tweakStyle.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
`;
document.head.appendChild(tweakStyle);

createStarField();

// Mobile touch feedback
let touchStart = 0;

gameCards.forEach(card => {
    card.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientY;
        card.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', (e) => {
        card.style.transform = '';
        const touchEnd = e.changedTouches[0].clientY;
        if (Math.abs(touchEnd - touchStart) < 50) {
            createParticles(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
    });
});

// Console message for fun
console.log('%cWelcome to NUKES UBG! 🎮', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
console.log('%cHave fun playing! 🔥', 'color: #ffa500; font-size: 16px;');
