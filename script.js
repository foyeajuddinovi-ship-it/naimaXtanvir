// ============================
// ১. গ্লোবাল ভেরিয়েবলস
// ============================
let currentLang = 'bn';
let currentAnimation = 'hearts';
let animationInterval = null;
let particles = [];
let animationRunning = true;

// ============================
// ২. ট্রান্সলেশন সিস্টেম (সম্পূর্ণ)
// ============================
const translations = {
    bn: {
        // Header
        "tanvir": "তানভীর",
        "naima": "নাইমা",
        "promise": "\"আজ থেকে ২০ বছর পরও আমার গার্লফ্রেন্ডের নাম হবে নাইমা\"",
        
        // Countdown
        "countdownTitle": "২০ বছর কাউন্টডাউন",
        "years": "বছর",
        "days": "দিন",
        "hours": "ঘন্টা",
        "minutes": "মিনিট",
        "seconds": "সেকেন্ড",
        "startDate": "শুরু: ২০২৪",
        "progress": "০% পার হয়েছে",
        "endDate": "শেষ: ২০৪৪",
        "completeDate": "২০ বছর পূর্ণ হবে: ২৮ নভেম্বর, ২০৪৪",
        
        // Video
        "videoTitle": "প্রতিশ্রুতি ভিডিও",
        "videoError": "ভিডিও লোড হচ্ছে না",
        "videoErrorText": "promise.mp4 ফাইলটি চেক করুন",
        "fullscreen": "ফুলস্ক্রীন",
        "verify": "প্রমাণিত",
        "share": "শেয়ার",
        "retry": "আবার চেষ্টা করুন",
        
        // Letter
        "letterTitle": "প্রেমপত্র",
        "letterDate": "২৮ নভেম্বর, ২০২৪",
        "salutation": "প্রিয় নাইমা,",
        "letterPara1": "আজ থেকে ঠিক ২০ বছর পর, যখন তুমি এই ওয়েবসাইটটি দেখবে, আমি চাই তুমি জানতে যে আমি এখনও তোমাকে ঠিক ততটাই ভালোবাসি যতটা আজ ভালোবাসি।",
        "letterPara2": "প্রতিটি সকাল তোমার নাম দিয়ে শুরু হয়, প্রতিটি রাত্রি তোমার নাম দিয়ে শেষ হয়। এই ২০ বছর শুধু সংখ্যা নয়, এটা আমাদের ভালোবাসার অমরত্বের প্রমাণ।",
        "highlightPromise": "আমি তানভীর আজ ঘোষণা করছি যে, ২০৪৪ সালেও আমার গার্লফ্রেন্ডের নাম হবে নাইমা। এই ওয়েবসাইট আমাদের ভালোবাসার স্থায়ী সাক্ষী।",
        "letterPara3": "এই ডিজিটাল সময়কapsuleটি প্রমাণ করবে যে ভালোবাসা সময়ের সীমা মানে না। আজ থেকে ২০ বছর পরও আমি তোমাকে বলবো, \"আমি তোমাকে ভালোবাসি নাইমা\"।",
        "signature": "তোমারই তানভীর",
        
        // Developer
        "developedBy": "তৈরি করেছেন",
        "devRole": "তানভীরের বন্ধু",
        "hosted": "গিটহাব + ভের্সেলে হোস্টেড",
        "preserved": "২০৪৪ সাল পর্যন্ত সংরক্ষিত",
        "forever": "তানভীর ❤️ নাইমা চিরকাল"
    },
    
    en: {
        // Header
        "tanvir": "Tanvir",
        "naima": "Naima",
        "promise": "\"Even after 20 years, my girlfriend's name will be Naima\"",
        
        // Countdown
        "countdownTitle": "20 Years Countdown",
        "years": "Years",
        "days": "Days",
        "hours": "Hours",
        "minutes": "Minutes",
        "seconds": "Seconds",
        "startDate": "Start: 2024",
        "progress": "0% Complete",
        "endDate": "End: 2044",
        "completeDate": "20 Years Complete: November 28, 2044",
        
        // Video
        "videoTitle": "Promise Video",
        "videoError": "Video not loading",
        "videoErrorText": "Check promise.mp4 file",
        "fullscreen": "Fullscreen",
        "verify": "Verified",
        "share": "Share",
        "retry": "Retry",
        
        // Letter
        "letterTitle": "Love Letter",
        "letterDate": "November 28, 2024",
        "salutation": "Dear Naima,",
        "letterPara1": "Exactly 20 years from now, when you see this website, I want you to know that I still love you just as much as I do today.",
        "letterPara2": "Every morning starts with your name, every night ends with your name. These 20 years are not just numbers, they are proof of our eternal love.",
        "highlightPromise": "I, Tanvir, declare today that even in 2044, my girlfriend's name will be Naima. This website is a permanent witness to our love.",
        "letterPara3": "This digital time capsule will prove that love knows no boundaries of time. 20 years from today, I will still tell you, \"I love you Naima\".",
        "signature": "Yours forever, Tanvir",
        
        // Developer
        "developedBy": "Created by",
        "devRole": "Tanvir's Friend",
        "hosted": "Hosted on GitHub + Vercel",
        "preserved": "Preserved until 2044",
        "forever": "Tanvir ❤️ Naima Forever"
    }
};

function changeLanguage(lang) {
    currentLang = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update countdown
    updateCountdown();
}

// ============================
// ৩. কাউন্টডাউন সিস্টেম (২০২৫ সালের জন্য আপডেটেড)
// ============================
const targetDate = new Date('November 28, 2044 00:00:00').getTime();
const startDate = new Date('November 28, 2024 00:00:00').getTime();

function updateCountdown() {
    try {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Calculate time difference from start
        const totalDuration = targetDate - startDate;
        const elapsed = now - startDate;
        const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        
        // Update progress bar and text
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }
        
        if (progressText) {
            const text = currentLang === 'bn' 
                ? `${progressPercent.toFixed(2)}% পার হয়েছে`
                : `${progressPercent.toFixed(2)}% Complete`;
            progressText.textContent = text;
        }
        
        // If time has already passed
        if (distance <= 0) {
            document.getElementById('years').textContent = "00";
            document.getElementById('days').textContent = "00";
            document.getElementById('hours').textContent = "00";
            document.getElementById('minutes').textContent = "00";
            document.getElementById('seconds').textContent = "00";
            return;
        }
        
        // Calculate remaining time
        const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById('years').textContent = years.toString().padStart(2, '0');
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
    } catch (error) {
        console.error('Countdown Error:', error);
    }
}

// Start countdown
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// ============================
// ৪. ভিডিও সিস্টেম
// ============================
function loadVideo() {
    const video = document.getElementById('loveVideo');
    const fallback = document.getElementById('videoFallback');
    
    if (video) {
        video.load();
        video.style.display = 'block';
        if (fallback) fallback.style.display = 'none';
    }
}

function toggleFullscreen() {
    const video = document.getElementById('loveVideo');
    
    if (!video) return;
    
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

function verifyPromise() {
    const btn = event?.target.closest('.video-btn') || document.querySelector('.video-btn:nth-child(2)');
    if (btn) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check-double"></i> ✓ Verified';
        btn.style.background = '#4CAF50';
        
        // Show notification
        showNotification(
            currentLang === 'bn' 
                ? 'প্রতিশ্রুতি প্রমাণিত হয়েছে!' 
                : 'Promise Verified!',
            'success'
        );
        
        // Reset after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 3000);
    }
}

function shareVideo() {
    const url = window.location.href;
    const text = currentLang === 'bn' 
        ? 'দেখো তানভীরের নাইমার জন্য ২০ বছরের প্রতিশ্রুতি!' 
        : 'See Tanvir\'s 20-year promise to Naima!';
    
    if (navigator.share) {
        navigator.share({
            title: 'Tanvir ❤️ Naima',
            text: text,
            url: url
        });
    } else {
        // Fallback for desktop
        navigator.clipboard.writeText(url).then(() => {
            showNotification(
                currentLang === 'bn' 
                    ? 'লিংক কপি হয়েছে!' 
                    : 'Link Copied!',
                'success'
            );
        });
    }
}

// ============================
// ৫. এনিমেশন সিস্টেম
// ============================
function initAnimations() {
    const canvas = document.getElementById('animationCanvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Start default animation
    startHeartsAnimation();
}

function startHeartsAnimation() {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    // Clear previous animation
    if (animationInterval) {
        cancelAnimationFrame(animationInterval);
        particles = [];
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 15 + 10,
            speed: Math.random() * 1 + 0.5,
            color: `hsl(${Math.random() * 60 + 300}, 100%, 65%)`,
            rotation: Math.random() * Math.PI * 2
        });
    }
    
    function animate() {
        if (!animationRunning) return;
        
        // Clear with fade effect
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            // Update position
            particle.y -= particle.speed;
            particle.x += Math.sin(particle.y * 0.01);
            particle.rotation += 0.02;
            
            // Reset if off screen
            if (particle.y < -50) {
                particle.y = canvas.height + 50;
                particle.x = Math.random() * canvas.width;
            }
            
            // Draw heart
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation);
            ctx.fillStyle = particle.color;
            
            // Heart shape
            ctx.beginPath();
            const topCurveHeight = particle.size * 0.3;
            ctx.moveTo(0, 0 + particle.size / 4);
            
            // Left top curve
            ctx.bezierCurveTo(
                0, 0,
                -particle.size / 2, 0,
                -particle.size / 2, particle.size / 4
            );
            
            // Left bottom curve
            ctx.bezierCurveTo(
                -particle.size / 2, particle.size / 2,
                0, particle.size * 0.75,
                0, particle.size
            );
            
            // Right bottom curve
            ctx.bezierCurveTo(
                0, particle.size * 0.75,
                particle.size / 2, particle.size / 2,
                particle.size / 2, particle.size / 4
            );
            
            // Right top curve
            ctx.bezierCurveTo(
                particle.size / 2, 0,
                0, 0,
                0, particle.size / 4
            );
            
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });
        
        animationInterval = requestAnimationFrame(animate);
    }
    
    animate();
}

function startStarsAnimation() {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    if (animationInterval) {
        cancelAnimationFrame(animationInterval);
        particles = [];
    }
    
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            brightness: Math.random() * 0.5 + 0.5,
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }
    
    function animate() {
        if (!animationRunning) return;
        
        ctx.fillStyle = 'rgba(10, 10, 26, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(star => {
            star.brightness += star.twinkleSpeed;
            if (star.brightness > 1 || star.brightness < 0.3) {
                star.twinkleSpeed *= -1;
            }
            
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        animationInterval = requestAnimationFrame(animate);
    }
    
    animate();
}

function startFirefliesAnimation() {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    if (animationInterval) {
        cancelAnimationFrame(animationInterval);
        particles = [];
    }
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `hsl(${Math.random() * 60 + 50}, 100%, 60%)`,
            glow: Math.random() * 0.5 + 0.5
        });
    }
    
    function animate() {
        if (!animationRunning) return;
        
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(fly => {
            // Update position
            fly.x += fly.speedX + Math.sin(Date.now() * 0.001 + fly.x) * 0.3;
            fly.y += fly.speedY + Math.cos(Date.now() * 0.001 + fly.y) * 0.3;
            
            // Bounce off walls
            if (fly.x < 0 || fly.x > canvas.width) fly.speedX *= -1;
            if (fly.y < 0 || fly.y > canvas.height) fly.speedY *= -1;
            
            // Glow effect
            fly.glow = 0.5 + Math.sin(Date.now() * 0.002 + fly.x) * 0.5;
            
            // Draw glow
            const gradient = ctx.createRadialGradient(fly.x, fly.y, 0, fly.x, fly.y, fly.size * 3);
            gradient.addColorStop(0, `${fly.color}${Math.floor(fly.glow * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(fly.x, fly.y, fly.size * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw firefly
            ctx.fillStyle = fly.color;
            ctx.beginPath();
            ctx.arc(fly.x, fly.y, fly.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        animationInterval = requestAnimationFrame(animate);
    }
    
    animate();
}

function startLoveAnimation() {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    if (animationInterval) {
        cancelAnimationFrame(animationInterval);
        particles = [];
    }
    
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 50,
            text: ['LOVE', '❤️', 'তানভীর', 'নাইমা', 'প্রেম', 'ভালোবাসা'][Math.floor(Math.random() * 6)],
            size: Math.random() * 20 + 15,
            speed: Math.random() * 1.5 + 0.5,
            color: `hsl(${Math.random() * 360}, 100%, 65%)`,
            rotation: Math.random() * Math.PI * 2
        });
    }
    
    function animate() {
        if (!animationRunning) return;
        
        ctx.fillStyle = 'rgba(10, 10, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.y -= particle.speed;
            particle.x += Math.sin(particle.y * 0.01) * 1.2;
            particle.rotation += 0.01;
            
            // Reset if off screen
            if (particle.y < -50) {
                particle.y = canvas.height + 50;
                particle.x = Math.random() * canvas.width;
                particle.text = ['LOVE', '❤️', 'তানভীর', 'নাইমা', 'প্রেম', 'ভালোবাসা'][Math.floor(Math.random() * 6)];
            }
            
            // Draw text
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation);
            ctx.fillStyle = particle.color;
            ctx.font = `${particle.size}px 'Hind Siliguri', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(particle.text, 0, 0);
            ctx.restore();
        });
        
        animationInterval = requestAnimationFrame(animate);
    }
    
    animate();
}

function changeAnimation(type) {
    currentAnimation = type;
    animationRunning = true;
    
    // Update active button
    document.querySelectorAll('.anim-option').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Start new animation
    switch(type) {
        case 'hearts':
            startHeartsAnimation();
            break;
        case 'stars':
            startStarsAnimation();
            break;
        case 'fireflies':
            startFirefliesAnimation();
            break;
        case 'love':
            startLoveAnimation();
            break;
    }
}

function stopAnimations() {
    animationRunning = false;
    if (animationInterval) {
        cancelAnimationFrame(animationInterval);
    }
    
    // Clear canvas
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // Update button
    document.querySelectorAll('.anim-option').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// ============================
// ৬. ইউটিলিটি ফাংশন
// ============================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: inherit;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================
// ৭. ইভেন্ট হ্যান্ডলার
// ============================
function toggleAnimMenu() {
    const menu = document.getElementById('animOptions');
    menu.classList.toggle('show');
}

// ============================
// ৮. ইনিশিয়ালাইজেশন
// ============================
function initializeWebsite() {
    console.log('🚀 ওয়েবসাইট শুরু হচ্ছে...');
    
    // ১. ট্রান্সলেশন সেটআপ
    changeLanguage('bn');
    
    // ২. কাউন্টডাউন শুরু
    updateCountdown();
    
    // ৩. ভিডিও চেক
    const video = document.getElementById('loveVideo');
    const fallback = document.getElementById('videoFallback');
    
    if (video) {
        video.addEventListener('error', function() {
            if (fallback) {
                fallback.style.display = 'flex';
                video.style.display = 'none';
            }
        });
        
        video.addEventListener('loadeddata', function() {
            console.log('✅ ভিডিও লোড হয়েছে');
            if (fallback) fallback.style.display = 'none';
        });
    }
    
    // ৪. এনিমেশন শুরু
    initAnimations();
    
    // ৫. উইন্ডো রিসাইজ হ্যান্ডেল
    window.addEventListener('resize', function() {
        const canvas = document.getElementById('animationCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
    
    // ৬. ইভেন্ট লিসেনার যোগ
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.getAttribute('data-lang'));
        });
    });
    
    document.querySelectorAll('.anim-option[data-anim]').forEach(btn => {
        btn.addEventListener('click', function() {
            changeAnimation(this.getAttribute('data-anim'));
        });
    });
    
    document.getElementById('animToggle').addEventListener('click', toggleAnimMenu);
    
    // ৭. বাইরে ক্লিক করলে মেনু বন্ধ
    document.addEventListener('click', function(event) {
        const animControl = document.querySelector('.animation-control');
        if (!animControl.contains(event.target)) {
            document.getElementById('animOptions').classList.remove('show');
        }
    });
    
    console.log('✅ ওয়েবসাইট প্রস্তুত!');
}

// ============================
// ৯. পেজ লোড হলে শুরু করুন
// ============================
window.addEventListener('DOMContentLoaded', initializeWebsite);
window.addEventListener('load', function() {
    console.log('🎯 সবকিছু লোড হয়েছে');
    showNotification(
        currentLang === 'bn' 
            ? 'স্বাগতম! তানভীরের ২০ বছরের প্রতিশ্রুতি দেখুন' 
            : 'Welcome! See Tanvir\'s 20-year promise',
        'success'
    );
});

// CSS animations add
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(animationStyles);
