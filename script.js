// Welcome Animation
const welcomeTexts = [
    "তানভীরের ২০ বছরের প্রতিশ্রুতি...",
    "নাইমার জন্য চিরস্থায়ী ভালোবাসা...",
    "একটি ডিজিটাল প্রমাণ..."
];

let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isTyping = true;

function typeWriter() {
    const typingText = document.getElementById('typingText');
    const currentText = welcomeTexts[currentTextIndex];
    
    if (isTyping) {
        if (charIndex < currentText.length) {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            isTyping = false;
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000);
        }
    } else if (isDeleting) {
        if (charIndex > 0) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, 50);
        } else {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % welcomeTexts.length;
            isTyping = true;
            setTimeout(typeWriter, 500);
        }
    }
}

// Enter Website Function
function enterWebsite() {
    const welcomeScreen = document.getElementById('welcomeAnimation');
    const mainWebsite = document.getElementById('mainWebsite');
    
    // Fade out welcome screen
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainWebsite.style.display = 'block';
        
        // Fade in main website
        setTimeout(() => {
            mainWebsite.style.opacity = '1';
            mainWebsite.style.transform = 'translateY(0)';
        }, 50);
    }, 500);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    typeWriter();
    
    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Initialize FAB
    initFAB();
    
    // Initialize language
    initLanguage();
    
    // Initialize animations
    initAnimations();
});

// Countdown Timer
const targetDate = new Date('November 28, 2044 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Calculate time units
    const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    document.getElementById('cdYears').textContent = years.toString().padStart(2, '0');
    document.getElementById('cdDays').textContent = days.toString().padStart(2, '0');
    document.getElementById('cdHours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('cdMinutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('cdSeconds').textContent = seconds.toString().padStart(2, '0');
    
    // Update progress
    const totalDuration = 20 * 365 * 24 * 60 * 60 * 1000;
    const elapsed = totalDuration - distance;
    const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    
    document.getElementById('progressPercent').textContent = `${progressPercent.toFixed(2)}%`;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
}

// Floating Action Button
function initFAB() {
    const fabMain = document.getElementById('fabMain');
    const fabMenu = document.querySelector('.fab-menu');
    
    fabMain.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        fabMenu.classList.toggle('show');
    });
    
    // Close FAB when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.fab-container')) {
            fabMain.classList.remove('active');
            fabMenu.classList.remove('show');
        }
    });
    
    // Animation selection
    document.querySelectorAll('.fab-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const animType = this.getAttribute('data-anim');
            activateAnimation(animType);
            
            // Update active state
            document.querySelectorAll('.fab-option').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Close menu
            fabMain.classList.remove('active');
            fabMenu.classList.remove('show');
        });
    });
}

// Language System
const translations = {
    bn: {
        // Welcome
        "tanvir": "তানভীর",
        "naima": "নাইমা",
        
        // Navigation
        "hearts": "হার্টস",
        "particles": "পার্টিকেলস",
        "butterflies": "প্রজাপতি",
        "fireworks": "আতশবাজি",
        "snow": "তুষার",
        "stars": "তারারা",
        
        // Headers
        "promiseVideo": "প্রতিশ্রুতি ভিডিও",
        "countdown": "২০ বছর কাউন্টডাউন",
        "loveLetter": "প্রেমপত্র",
        
        // Buttons
        "fullscreen": "ফুলস্ক্রীন",
        "download": "ডাউনলোড",
        "verified": "প্রমাণিত",
        "print": "প্রিন্ট",
        "save": "সেভ",
        "share": "শেয়ার",
        
        // Time units
        "years": "বছর",
        "days": "দিন",
        "hours": "ঘন্টা",
        "minutes": "মিনিট",
        "seconds": "সেকেন্ড",
        
        // Text
        "progress": "সময় পার হয়েছে:",
        "targetDate": "২৮ নভেম্বর, ২০৪৪",
        "letterDate": "২৮ নভেম্বর, ২০২৪",
        "salutation": "প্রিয় নাইমা,",
        "signature": "তোমারই তানভীর",
        "developer": "তৈরি করেছেন",
        "friendTag": "তানভীরের বন্ধু",
        "hosted": "গিটহাব + ভের্সেলে হোস্টেড",
        "preserved": "২০৪৪ সাল পর্যন্ত সংরক্ষিত",
        "loveMessage": "With Love for Tanvir & Naima"
    },
    
    en: {
        // Welcome
        "tanvir": "Tanvir",
        "naima": "Naima",
        
        // Navigation
        "hearts": "Hearts",
        "particles": "Particles",
        "butterflies": "Butterflies",
        "fireworks": "Fireworks",
        "snow": "Snow",
        "stars": "Stars",
        
        // Headers
        "promiseVideo": "Promise Video",
        "countdown": "20 Years Countdown",
        "loveLetter": "Love Letter",
        
        // Buttons
        "fullscreen": "Fullscreen",
        "download": "Download",
        "verified": "Verified",
        "print": "Print",
        "save": "Save",
        "share": "Share",
        
        // Time units
        "years": "Years",
        "days": "Days",
        "hours": "Hours",
        "minutes": "Minutes",
        "seconds": "Seconds",
        
        // Text
        "progress": "Time passed:",
        "targetDate": "November 28, 2044",
        "letterDate": "November 28, 2024",
        "salutation": "Dear Naima,",
        "signature": "Yours forever, Tanvir",
        "developer": "Created by",
        "friendTag": "Tanvir's Friend",
        "hosted": "Hosted on GitHub + Vercel",
        "preserved": "Preserved until 2044",
        "loveMessage": "With Love for Tanvir & Naima"
    }
};

function initLanguage() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            
            // Update active button
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Animation System
let currentAnimation = null;
const animationCanvases = {};

function initAnimations() {
    const animationTypes = ['hearts', 'particles', 'butterflies', 'fireworks', 'snow', 'stars'];
    
    animationTypes.forEach(type => {
        const canvas = document.getElementById(`${type}Canvas`);
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            animationCanvases[type] = {
                canvas,
                ctx: canvas.getContext('2d'),
                active: false,
                animationId: null
            };
        }
    });
    
    // Start with hearts animation
    activateAnimation('hearts');
}

function activateAnimation(type) {
    // Deactivate current animation
    if (currentAnimation && animationCanvases[currentAnimation]) {
        animationCanvases[currentAnimation].active = false;
        if (animationCanvases[currentAnimation].animationId) {
            cancelAnimationFrame(animationCanvases[currentAnimation].animationId);
        }
        animationCanvases[currentAnimation].canvas.style.opacity = '0';
    }
    
    // Activate new animation
    currentAnimation = type;
    if (animationCanvases[type]) {
        animationCanvases[type].active = true;
        animationCanvases[type].canvas.style.opacity = '1';
        
        // Start animation based on type
        switch(type) {
            case 'hearts':
                startHeartsAnimation();
                break;
            case 'particles':
                startParticlesAnimation();
                break;
            case 'butterflies':
                startButterfliesAnimation();
                break;
            case 'fireworks':
                startFireworksAnimation();
                break;
            case 'snow':
                startSnowAnimation();
                break;
            case 'stars':
                startStarsAnimation();
                break;
        }
    }
}

// Heart Animation
function startHeartsAnimation() {
    const { canvas, ctx } = animationCanvases['hearts'];
    let hearts = [];
    
    class Heart {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 50;
            this.size = Math.random() * 20 + 10;
            this.speed = Math.random() * 2 + 1;
            this.color = `hsl(${Math.random() * 60 + 300}, 100%, 65%)`;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.05 - 0.025;
        }
        
        update() {
            this.y -= this.speed;
            this.x += Math.sin(this.y * 0.01) * 1.5;
            this.rotation += this.rotationSpeed;
            
            if (this.y < -50) {
                this.reset();
            }
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 50;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            
            for (let i = 0; i < 20; i++) {
                const angle = i * Math.PI * 2 / 20;
                const radius = this.size / (Math.sin(angle) ** 4 + Math.cos(angle) ** 4) ** 0.25;
                const x = radius * Math.cos(angle);
                const y = -radius * Math.sin(angle);
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Create hearts
    for (let i = 0; i < 40; i++) {
        hearts.push(new Heart());
    }
    
    function animate() {
        if (!animationCanvases['hearts'].active) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        
        animationCanvases['hearts'].animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Particles Animation (similar pattern for others)
function startParticlesAnimation() {
    const { canvas, ctx } = animationCanvases['particles'];
    let particles = [];
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsl(${Math.random() * 60 + 200}, 100%, 60%)`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
                this.reset();
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        if (!animationCanvases['particles'].active) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255,77,148,${0.3 * (1 - distance/80)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        animationCanvases['particles'].animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Add other animation functions similarly...

// Verify Promise Function
function verifyPromise() {
    const verifyBtn = document.querySelector('.verify-btn');
    
    // Add verified badge
    verifyBtn.innerHTML = '<i class="fas fa-check-double"></i> <span>প্রমাণিত ✔️</span>';
    verifyBtn.style.background = '#4CAF50';
    
    // Show confirmation message
    const message = document.createElement('div');
    message.className = 'verification-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>এই প্রতিশ্রুতি ডিজিটালি প্রমাণিত!</p>
        <small>গিটহাবে সংরক্ষিত, ২০৪৪ সাল পর্যন্ত বৈধ</small>
    `;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        z-index: 1000;
        animation: fadeIn 0.5s;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// Handle window resize
window.addEventListener('resize', () => {
    Object.keys(animationCanvases).forEach(type => {
        if (animationCanvases[type]) {
            animationCanvases[type].canvas.width = window.innerWidth;
            animationCanvases[type].canvas.height = window.innerHeight;
        }
    });
});
