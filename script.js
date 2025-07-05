// Halo Reach Website Interactive Features

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Weapon switching functionality
const weaponData = {
    'ASSAULT RIFLE': {
        name: 'MA37 ASSAULT RIFLE',
        damage: 70,
        range: 60,
        rateOfFire: 85,
        description: 'Standard UNSC infantry weapon'
    },
    'DMR': {
        name: 'M392 DESIGNATED MARKSMAN RIFLE',
        damage: 90,
        range: 95,
        rateOfFire: 45,
        description: 'Semi-automatic precision rifle'
    },
    'SHOTGUN': {
        name: 'M45 TACTICAL SHOTGUN',
        damage: 100,
        range: 25,
        rateOfFire: 30,
        description: 'Close-quarters combat weapon'
    },
    'SNIPER RIFLE': {
        name: 'SRS99 SNIPER RIFLE SYSTEM',
        damage: 100,
        range: 100,
        rateOfFire: 20,
        description: 'Long-range precision weapon'
    },
    'ROCKET LAUNCHER': {
        name: 'M41 SURFACE-TO-SURFACE ROCKET LAUNCHER',
        damage: 100,
        range: 80,
        rateOfFire: 10,
        description: 'Anti-vehicle heavy weapon'
    }
};

const weaponButtons = document.querySelectorAll('.weapon-btn');
const weaponCard = document.querySelector('.weapon-card');

weaponButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        weaponButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update weapon display
        const weaponName = button.textContent;
        const weapon = weaponData[weaponName];
        
        if (weapon) {
            updateWeaponDisplay(weapon);
        }
    });
});

function updateWeaponDisplay(weapon) {
    const weaponTitle = weaponCard.querySelector('h3');
    const damageBar = weaponCard.querySelector('.stat-row:nth-child(1) .stat-fill');
    const rangeBar = weaponCard.querySelector('.stat-row:nth-child(2) .stat-fill');
    const rateBar = weaponCard.querySelector('.stat-row:nth-child(3) .stat-fill');
    
    // Update weapon name with animation
    weaponTitle.style.opacity = '0';
    setTimeout(() => {
        weaponTitle.textContent = weapon.name;
        weaponTitle.style.opacity = '1';
    }, 200);
    
    // Update stat bars with animation
    setTimeout(() => {
        damageBar.style.width = weapon.damage + '%';
        rangeBar.style.width = weapon.range + '%';
        rateBar.style.width = weapon.rateOfFire + '%';
    }, 300);
}

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animations to cards
document.querySelectorAll('.noble-card, .covenant-card, .weapon-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(card);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic threat level animation
function animateThreatLevel() {
    const threatFill = document.querySelector('.threat-fill');
    if (threatFill) {
        let width = 0;
        const targetWidth = 85;
        const interval = setInterval(() => {
            if (width >= targetWidth) {
                clearInterval(interval);
                return;
            }
            width += 2;
            threatFill.style.width = width + '%';
        }, 50);
    }
}

// Trigger threat level animation when section comes into view
const threatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateThreatLevel();
            threatObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const covenantSection = document.querySelector('.covenant-section');
if (covenantSection) {
    threatObserver.observe(covenantSection);
}

// Noble Team card interaction
const nobleCards = document.querySelectorAll('.noble-card');
nobleCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add pulse effect
        card.style.animation = 'pulse 0.5s ease-in-out';
    });
    
    card.addEventListener('animationend', () => {
        card.style.animation = '';
    });
});

// Add pulse animation to CSS dynamically
const pulseKeyframes = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = pulseKeyframes;
document.head.appendChild(styleSheet);

// Sound effects simulation (visual feedback)
function createSoundEffect(element, color = '#00d4ff') {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = color;
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect CSS
const rippleKeyframes = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleKeyframes;
document.head.appendChild(rippleStyle);

// Add sound effects to interactive elements
document.querySelectorAll('.cta-button, .weapon-btn, .noble-card').forEach(element => {
    element.addEventListener('click', function(e) {
        createSoundEffect(this);
    });
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }
});

// Health bar animations for Covenant cards
function animateHealthBars() {
    const healthFills = document.querySelectorAll('.health-fill');
    healthFills.forEach((fill, index) => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 200 + (index * 100));
    });
}

// Trigger health bar animations when Covenant section is visible
const covenantObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateHealthBars();
            covenantObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const covenantGrid = document.querySelector('.covenant-grid');
if (covenantGrid) {
    covenantObserver.observe(covenantGrid);
}

// Header background opacity on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
        
        // Show message
        const message = document.createElement('div');
        message.textContent = 'SPARTAN PROGRAM ACTIVATED';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'rgba(0, 212, 255, 0.9)';
        message.style.color = 'white';
        message.style.padding = '1rem 2rem';
        message.style.borderRadius = '5px';
        message.style.fontSize = '1.2rem';
        message.style.fontWeight = 'bold';
        message.style.zIndex = '10000';
        message.style.fontFamily = 'Orbitron, sans-serif';
        message.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        konamiCode = [];
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize weapon display
    if (Object.keys(weaponData).length > 0) {
        updateWeaponDisplay(weaponData['ASSAULT RIFLE']);
    }
});