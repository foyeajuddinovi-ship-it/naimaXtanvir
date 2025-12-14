// ==================== ১. ট্রান্সলেশন সিস্টেম ====================
const translations = {
    bn: {
        // Buttons & Titles
        "videoTitle": "প্রতিশ্রুতি ভিডিও",
        "countdownTitle": "২০ বছর কাউন্টডাউন",
        "letterTitle": "প্রেমপত্র",
        "fullscreen": "ফুলস্ক্রীন",
        "verify": "প্রমাণিত",
        
        // Countdown
        "years": "বছর",
        "days": "দিন",
        "hours": "ঘন্টা",
        "minutes": "মিনিট",
        "seconds": "সেকেন্ড",
        "until": "পূর্ণ হবে",
        
        // Animations
        "hearts": "হার্টস",
        "particles": "পার্টিকেলস",
        "stars": "তারারা",
        "confetti": "কনফেটি",
        
        // Footer
        "createdBy": "তৈরি করেছেন",
        "tanvirFriend": "তানভীরের বন্ধু",
        
        // Love Letter
        "letterContent": `
            <p>প্রিয় নাইমা,</p>
            <br>
            <p>আজ থেকে ঠিক ২০ বছর পর, ২০৪৪ সালের ২৮ নভেম্বর, যখন তুমি এই ওয়েবসাইটটি দেখবে, আমি চাই তুমি জানতে যে আমি এখনও তোমাকে ঠিক ততটাই ভালোবাসি যতটা আজ ভালোবাসি।</p>
            <br>
            <p>এই ডিজিটাল প্রতিশ্রুতিই প্রমাণ করবে, সময় যতই বদলাক, পৃথিবী যতই এগিয়ে যাক, তানভীরের হৃদয় শুধু নাইমার জন্য।</p>
            <br>
            <p style="font-style: italic; color: #ff4d94;">
                "আজ থেকেই বলছি, ২০৪৪ সালেও আমার গার্লফ্রেন্ডের নাম হবে নাইমা"
            </p>
        `
    },
    
    en: {
        // Buttons & Titles
        "videoTitle": "Promise Video",
        "countdownTitle": "20 Years Countdown",
        "letterTitle": "Love Letter",
        "fullscreen": "Fullscreen",
        "verify": "Verified",
        
        // Countdown
        "years": "Years",
        "days": "Days",
        "hours": "Hours",
        "minutes": "Minutes",
        "seconds": "Seconds",
        "until": "Until",
        
        // Animations
        "hearts": "Hearts",
        "particles": "Particles",
        "stars": "Stars",
        "confetti": "Confetti",
        
        // Footer
        "createdBy": "Created by",
        "tanvirFriend": "Tanvir's Friend",
        
        // Love Letter
        "letterContent": `
            <p>Dear Naima,</p>
            <br>
            <p>Exactly 20 years from today, on November 28, 2044, when you see this website, I want you to know that I still love you just as much as I do today.</p>
            <br>
            <p>This digital promise will prove that no matter how time changes, no matter how the world progresses, Tanvir's heart belongs only to Naima.</p>
            <br>
            <p style="font-style: italic; color: #ff4d94;">
                "I declare today, even in 2044 my girlfriend's name will be Naima"
            </p>
        `
    }
};

let currentLang = 'bn';

function changeLanguage(lang) {
    currentLang = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            if (key === 'letterContent') {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// ==================== ২. কাউন্টডাউন সিস্টেম ====================
const targetDate = new Date('November 28, 2044 00:00:00').getTime();

function updateCountdown() {
    try {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // Calculate time
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
        
        // Update progress bar
        const totalDuration = 20 * 365 * 24 * 60 * 60 * 1000;
        const elapsed = totalDuration - distance;
        const progressPercent = (elapsed / totalDuration) * 100;
        
        document.getElementById('progressFill').style.width = `${Math.max(0, Math.min(100, progressPercent))}%`;
        
        // Update target date display
        const targetDateElement = document.getElementById('targetDate');
        if (targetDateElement) {
            const date = new Date(targetDate);
            targetDateElement.textContent = currentLang === 'bn' 
                ? date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })
                : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        
    } catch (error) {
        console.error("Countdown error:", error);
    }
}

// ==================== ৩. ভিডিও সিস্টেম ====================
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
    const btn = event.target.closest('.btn');
    if (!btn) return;
    
    btn.innerHTML = '<i class="fas fa-check-double"></i> প্রমাণিত ✓';
    btn.style.background = '#4CAF50';
    
    // Show notification
    showNotification('প্রতিশ্রুতি প্রমাণিত হয়েছে!', 'success');
}

// ==================== ৪. এনিমেশন সিস্টেম ====================
let currentAnimation = 'hearts';
let animationInterval = null;

function toggleAnimMenu() {
    const menu = document.getElementById('fabMenu');
    menu.classList.toggle('show');
}

function changeAnimation(type) {
    currentAnimation = type;
    
    // Hide all canvases
    document.querySelectorAll('canvas').forEach(canvas => {
        canvas.style.display = 'none';
    });
    
    // Show selected canvas
    const selectedCanvas = document.getElementById(`${type}Canvas`);
    if (selectedCanvas) {
        selectedCanvas.style.display = 'block';
    }
    
    // Start animation
    startAnimation(type);
    
    // Close menu
    document.getElementById('fabMenu').classList.remove('show');
}

function startAnimation(type) {
    // Clear previous animation
    if (animationInterval) {
        clearInterval(animationInterval);
    }
    
    // Get canvas
    const canvas = document.getElementById(`${type}Canvas`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Start animation based on type
    switch(type) {
        case 'hearts':
            animateHearts(ctx, canvas);
            break;
        case 'particles':
            animateParticles(ctx, canvas);
            break;
        case 'stars':
            animateStars(ctx, canvas);
            break;
        case 'confetti':
            animateConfetti(ctx, canvas);
            break;
    }
}

function animateHearts(ctx, canvas) {
    let hearts = [];
    
    // Create hearts
    for (let i = 0; i < 30; i++) {
        hearts.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 50,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 60 + 300}, 100%, 65%)`,
            rotation: Math.random() * Math.PI * 2
        });
    }
    
    function draw() {
        // Clear with slight fade for trail effect
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw hearts
        hearts.forEach(heart => {
            ctx.save();
            ctx.translate(heart.x, heart.y);
            ctx.rotate(heart.rotation);
            ctx.fillStyle = heart.color;
            
            // Draw heart shape
            ctx.beginPath();
            const topCurveHeight = heart.size * 0.3;
            ctx.moveTo(0, 0 + heart.size / 4);
            
            // Bezier curves for heart shape
            ctx.bezierCurveTo(
                0, 0,
                -heart.size / 2, 0,
                -heart.size / 2, heart.size / 4
            );
            
            ctx.bezierCurveTo(
                -heart.size / 2, heart.size / 2,
                0, heart.size * 0.75,
                0, heart.size
            );
            
            ctx.bezierCurveTo(
                0, heart.size * 0.75,
                heart.size / 2, heart.size / 2,
                heart.size / 2, heart.size / 4
            );
            
            ctx.bezierCurveTo(
                heart.size / 2, 0,
                0, 0,
                0, heart.size / 4
            );
            
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            
            // Update position
            heart.y -= heart.speed;
            heart.x += Math.sin(heart.y * 0.01) * 1.5;
            heart.rotation += 0.02;
            
            // Reset if off screen
            if (heart.y < -100) {
                heart.y = canvas.height + 50;
                heart.x = Math.random() * canvas.width;
            }
        });
        
        animationInterval = requestAnimationFrame(draw);
    }
    
    draw();
}

function animateParticles(ctx, canvas) {
    let particles = [];
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`
        });
    }
    
    function draw() {
        // Clear with fade
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 77, 148, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw particles
        particles.forEach(particle => {
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        
        animationInterval = requestAnimationFrame(draw);
    }
    
    draw();
}

function animateStars(ctx, canvas) {
    let stars = [];
    
    // Create stars
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            brightness: Math.random() * 0.5 + 0.5,
            twinkleSpeed: Math.random() * 0.05 + 0.01
        });
    }
    
    function draw() {
        // Dark background
        ctx.fillStyle = 'rgba(10, 10, 26, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        stars.forEach(star => {
            const brightness = star.brightness + Math.sin(Date.now() * star.twinkleSpeed) * 0.5;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Twinkle effect
            star.brightness += star.twinkleSpeed;
            if (star.brightness > 1 || star.brightness < 0.3) {
                star.twinkleSpeed *= -1;
            }
        });
        
        animationInterval = requestAnimationFrame(draw);
    }
    
    draw();
}

function animateConfetti(ctx, canvas) {
    let confetti = [];
    
    // Create confetti
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -100,
            size: Math.random() * 10 + 5,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.1 - 0.05,
            shape: Math.random() > 0.5 ? 'circle' : 'rect'
        });
    }
    
    function draw() {
        // Clear with slight fade
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(c => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rotation);
            ctx.fillStyle = c.color;
            
            if (c.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-c.size/2, -c.size/2, c.size, c.size);
            }
            
            ctx.restore();
            
            // Update position
            c.x += c.speedX;
            c.y += c.speedY;
            c.rotation += c.rotationSpeed;
            
            // Add gravity
            c.speedY += 0.05;
            
            // Reset if off screen
            if (c.y > canvas.height + 50) {
                c.y = -50;
                c.x = Math.random() * canvas.width;
                c.speedY = Math.random() * 3 + 2;
            }
        });
        
        animationInterval = requestAnimationFrame(draw);
    }
    
    draw();
}

// ==================== ৫. ইউটিলিটি ফাংশন ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==================== ৬. ইনিশিয়ালাইজেশন ====================
function initializeWebsite() {
    console.log('🌐 ওয়েবসাইট ইনিশিয়ালাইজ হচ্ছে...');
    
    // ১. ট্রান্সলেশন সেটআপ
    changeLanguage('bn');
    
    // ২. কাউন্টডাউন শুরু
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // ৩. ভিডিও চেক
    const video = document.getElementById('loveVideo');
    if (video) {
        video.addEventListener('loadeddata', function() {
            console.log('✅ ভিডিও সফলভাবে লোড হয়েছে');
            showNotification('ভিডিও প্রস্তুত', 'success');
        });
        
        video.addEventListener('error', function() {
            console.error('❌ ভিডিও লোড করতে সমস্যা');
            showNotification('ভিডিও ফাইল চেক করুন (promise.mp4)', 'error');
        });
    }
    
    // ৪. এনিমেশন শুরু
    startAnimation('hearts');
    
    // ৫. উইন্ডো রিসাইজ হ্যান্ডেল
    window.addEventListener('resize', function() {
        document.querySelectorAll('canvas').forEach(canvas => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    });
    
    console.log('✅ সবকিছু প্রস্তুত!');
}

// ==================== ৭. পেজ লোড হলে শুরু করুন ====================
window.onload = initializeWebsite;

// Fallback যদি window.onload কাজ না করে
document.addEventListener('DOMContentLoaded', function() {
    if (!window.initialized) {
        initializeWebsite();
        window.initialized = true;
    }
});
