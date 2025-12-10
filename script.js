// Timeline Data
const timelineData = [
    {
        date: "26th Feb 2023",
        title: "Started Becoming Friends",
        description: "The day our friendship journey began. Little did we know where this would lead us!",
        icon: "fas fa-handshake"
    },
    {
        date: "16th March 2023",
        title: "First Hangout",
        description: "Our first proper hangout - the start of many adventures together!",
        icon: "fas fa-utensils"
    },
    {
        date: "26th June 2023",
        title: "Became More Closer",
        description: "This was when we started sharing more personal stories and realized we had a special connection.",
        icon: "fas fa-heart"
    },
    {
        date: "2nd Feb 2024",
        title: "Best Hangout",
        description: "That unforgettable hangout that we still talk about! Pure laughter and great memories.",
        icon: "fas fa-star"
    },
    {
        date: "6th Nov 2024",
        title: "Broke Off From Friend Group",
        description: "A challenging time that surprisingly brought us closer as we navigated changes together.",
        icon: "fas fa-users-slash"
    },
    {
        date: "8th Sept 2024",
        title: "First Late Night Call",
        description: "Just you and me, talking for hours about everything and nothing. The start of our deep conversations.",
        icon: "fas fa-phone"
    },
    {
        date: "13th Sept 2024",
        title: "Group Started to Fall, Pushing Us Closer",
        description: "As the group dynamics changed, we found ourselves leaning on each other more and more.",
        icon: "fas fa-people-arrows"
    },
    {
        date: "17th Oct 2024",
        title: "Realization & Becoming Even Closer",
        description: "The moment you started to realize our friendship was something special - and I felt it too!",
        icon: "fas fa-lightbulb"
    },
    {
        date: "4th Dec 2024",
        title: "First MUN Session",
        description: "Our first Model UN session together - debating, strategizing, and having intellectual fun!",
        icon: "fas fa-gavel"
    },
    {
        date: "17th Jan 2025",
        title: "First Time Going Out",
        description: "Our first official outing, just the two of us, creating memories that would last forever.",
        icon: "fas fa-map-marker-alt"
    }
];

// Gallery data - using placeholder images since actual images are in your folder
// In a real scenario, you would replace these with your actual image filenames
// Gallery data - using YOUR actual image filenames
const galleryData = [
    { src: "images/HAAAAAAAAAHAHA.png", caption: "" },
    { src: "images/I don't think Maha wants to watch the show with me.png", caption: "" },
    { src: "images/MAHAGEISHA.png", caption: "" },
    { src: "images/Screenshot 2024-02-15 201756.png", caption: "" },
    { src: "images/Screenshot 2025-11-14 195602.png", caption: "" },
    { src: "images/Screenshot 2025-11-14 195608.png", caption: "" },
    { src: "images/Screenshot 2025-11-14 195612.png", caption: "" },
    { src: "images/mahawatchingkorbakai5.png", caption: "" },
    { src: "images/mahawatchingkorbakai8.png", caption: "" },
    { src: "images/mahawatchingkorbakai9.png", caption: "" },
    { src: "images/mahawithanantenna.png", caption: "" },
    { src: "images/mahsgonnacrywhensheseesthis.png", caption: "" },
    { src: "images/picklewater.png", caption: "" },
    { src: "images/queenwhat.png", caption: "" }
];

// Vault functionality - PASSWORD IS "calendar" (case-insensitive)
const VAULT_PASSWORD = "CALENDAR"; // Changed to calendar
let attempts = 0;
const MAX_ATTEMPTS = 5;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Create timeline
    createTimeline();
    
    // Create gallery
    createGallery();
    
    // Setup confetti button
    setupConfetti();
    
    // Set total images count
    document.getElementById('total-imgs').textContent = galleryData.length;
    
    // Setup vault functionality
    setupVault();
});

// Function to create timeline
function createTimeline() {
    const timelineContainer = document.querySelector('.timeline');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const timelineContent = document.createElement('div');
        timelineContent.className = 'timeline-content';
        
        const timelineDate = document.createElement('div');
        timelineDate.className = 'timeline-date';
        timelineDate.innerHTML = `<i class="${item.icon}"></i> ${item.date}`;
        
        const timelineTitle = document.createElement('h3');
        timelineTitle.className = 'timeline-title';
        timelineTitle.textContent = item.title;
        
        const timelineDesc = document.createElement('p');
        timelineDesc.className = 'timeline-desc';
        timelineDesc.textContent = item.description;
        
        const timelineIcon = document.createElement('div');
        timelineIcon.className = 'timeline-icon';
        timelineIcon.innerHTML = `<i class="${item.icon}"></i>`;
        
        timelineContent.appendChild(timelineDate);
        timelineContent.appendChild(timelineTitle);
        timelineContent.appendChild(timelineDesc);
        
        timelineItem.appendChild(timelineContent);
        timelineItem.appendChild(timelineIcon);
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Function to create gallery
function createGallery() {
    const galleryContainer = document.querySelector('.gallery');
    const captionElement = document.getElementById('img-caption');
    const currentImgElement = document.getElementById('current-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0;
    
    // Create image elements
    galleryData.forEach((item, index) => {
        const img = document.createElement('img');
        img.className = 'gallery-img';
        img.src = item.src;
        img.alt = `Maha memory ${index + 1}`;
        img.dataset.caption = item.caption;
        img.dataset.index = index;
        
        // Add error handling for missing images
        img.onerror = function() {
            this.src = `https://picsum.photos/800/500?random=${index + 1}`;
            this.alt = "Placeholder image";
        };
        
        galleryContainer.appendChild(img);
    });
    
    // Show first image
    const images = document.querySelectorAll('.gallery-img');
    if (images.length > 0) {
        images[0].classList.add('active');
        captionElement.textContent = "";
        currentImgElement.textContent = 1;
    }
    
    // Next button functionality
    nextBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = "";
        currentImgElement.textContent = currentIndex + 1;
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = "";
        currentImgElement.textContent = currentIndex + 1;
    });
    
    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        nextBtn.click();
    }, 5000);
}

// Function to setup vault
function setupVault() {
    const vaultDoor = document.getElementById('vault-door');
    const vaultPasswordInput = document.getElementById('vault-password');
    const unlockVaultBtn = document.getElementById('unlock-vault');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const hintBtn = document.getElementById('hint-btn');
    const closeVaultBtn = document.getElementById('close-vault');
    const closeHintBtn = document.getElementById('close-hint');
    const hintModal = document.getElementById('hint-modal');
    const vaultContent = document.getElementById('vault-content');
    const attemptsCount = document.getElementById('attempts-count');
    const attemptsFill = document.getElementById('attempts-fill');
    const codeDisplay = document.getElementById('code-display');
    
    // Initialize attempts counter
    updateAttemptsDisplay();
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        const type = vaultPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        vaultPasswordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = this.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
    
    // Unlock vault button
    unlockVaultBtn.addEventListener('click', function() {
        const password = vaultPasswordInput.value.trim().toUpperCase(); // Convert to uppercase for case-insensitive comparison
        
        // Check if password is "CALENDAR" (case-insensitive)
        if (password === VAULT_PASSWORD) {
            // Correct password - open vault
            unlockVault();
        } else {
            // Wrong password
            attempts++;
            updateAttemptsDisplay();
            
            // Shake animation for wrong password
            vaultDoor.style.animation = 'shake 0.5s';
            setTimeout(() => {
                vaultDoor.style.animation = '';
            }, 500);
            
            // Update code display with wrong code
            updateCodeDisplay(password);
            
            // Show error message
            if (attempts < MAX_ATTEMPTS) {
                alert(`Incorrect password. You have ${MAX_ATTEMPTS - attempts} attempt${MAX_ATTEMPTS - attempts === 1 ? '' : 's'} left.`);
            } else {
                alert("You've used all your attempts! The vault will reset in 10 seconds.");
                setTimeout(() => {
                    attempts = 0;
                    updateAttemptsDisplay();
                    vaultPasswordInput.value = '';
                    updateCodeDisplay('----');
                    alert("Vault reset. Try again!");
                }, 10000);
            }
            
            // Clear password field
            vaultPasswordInput.value = '';
        }
    });
    
    // Allow pressing Enter to submit password
    vaultPasswordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            unlockVaultBtn.click();
        }
    });
    
    // Hint button
    hintBtn.addEventListener('click', function() {
        hintModal.classList.remove('hidden');
    });
    
    // Close hint modal
    closeHintBtn.addEventListener('click', function() {
        hintModal.classList.add('hidden');
    });
    
    // Close vault button
    closeVaultBtn.addEventListener('click', function() {
        vaultDoor.classList.remove('unlocked');
        vaultDoor.classList.add('locked');
        vaultContent.classList.add('hidden');
        vaultPasswordInput.value = '';
        updateCodeDisplay('----');
    });
    
    // Update attempts display
    function updateAttemptsDisplay() {
        attemptsCount.textContent = attempts;
        const fillPercentage = (attempts / MAX_ATTEMPTS) * 100;
        attemptsFill.style.width = `${fillPercentage}%`;
    }
    
    // Update code display
    function updateCodeDisplay(password) {
        if (password === '') {
            codeDisplay.textContent = '----';
        } else {
            // Show first 4 characters of password, or pad with -
            let display = password.substring(0, 4);
            while (display.length < 4) {
                display += '-';
            }
            codeDisplay.textContent = display;
        }
    }
    
    // Unlock vault function
    function unlockVault() {
        // Animate lock wheels
        animateLockWheels();
        
        // Open vault door after a delay
        setTimeout(() => {
            vaultDoor.classList.remove('locked');
            vaultDoor.classList.add('unlocked');
            
            // Show vault content after door opens
            setTimeout(() => {
                vaultContent.classList.remove('hidden');
                
                // Scroll to vault content
                vaultContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Launch confetti for celebration
                if (typeof startConfetti === 'function') {
                    startConfetti();
                }
            }, 800);
        }, 1500);
        
        // Reset attempts
        attempts = 0;
        updateAttemptsDisplay();
    }
    
    // Animate lock wheels
    function animateLockWheels() {
        const wheels = document.querySelectorAll('.lock-wheel');
        const finalNumbers = VAULT_PASSWORD.split('').map(char => {
            // Convert characters to numbers 0-9
            return char.charCodeAt(0) % 10;
        });
        
        // Ensure we have 4 numbers
        while (finalNumbers.length < 4) {
            finalNumbers.push(0);
        }
        
        wheels.forEach((wheel, index) => {
            // Spin animation
            let current = 0;
            const target = finalNumbers[index];
            const interval = setInterval(() => {
                wheel.textContent = current;
                current = (current + 1) % 10;
                
                // Stop when we reach the target
                if (current === target) {
                    clearInterval(interval);
                    wheel.textContent = target;
                }
            }, 50 + (index * 20));
        });
    }
}

// Function to setup confetti
function setupConfetti() {
    const confettiBtn = document.getElementById('confetti-btn');
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let confettiPieces = [];
    let animationId = null;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Confetti class
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 4 - 2;
            this.color = this.getRandomColor();
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
        }
        
        getRandomColor() {
            const colors = ['#ff4081', '#d32f2f', '#1976d2', '#7b1fa2', '#388e3c', '#f57c00'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            // Add some gravity
            this.speedY += 0.05;
            
            // Add some wind
            this.speedX += Math.random() * 0.2 - 0.1;
            
            return this.y < canvas.height;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            }
            
            ctx.restore();
        }
    }
    
    // Create confetti
    function createConfetti() {
        for (let i = 0; i < 150; i++) {
            confettiPieces.push(new Confetti());
        }
    }
    
    // Animate confetti
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < confettiPieces.length; i++) {
            if (!confettiPieces[i].update()) {
                confettiPieces.splice(i, 1);
                i--;
            } else {
                confettiPieces[i].draw();
            }
        }
        
        if (confettiPieces.length > 0) {
            animationId = requestAnimationFrame(animateConfetti);
        } else {
            animationId = null;
        }
    }
    
    // Start confetti animation
    function startConfetti() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            confettiPieces = [];
        }
        
        createConfetti();
        animateConfetti();
        
        // Stop after 5 seconds
        setTimeout(() => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            // Clear canvas after a moment
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 1000);
        }, 5000);
    }
    
    // Button click event
    confettiBtn.addEventListener('click', startConfetti);
    
    // Also trigger confetti when page loads after a delay
    setTimeout(() => {
        startConfetti();
    }, 1000);
}

// Add some interactive effects to timeline items
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
});

// Add shake animation for wrong password
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: perspective(1000px) rotateY(0deg) translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: perspective(1000px) rotateY(0deg) translateX(-10px); }
        20%, 40%, 60%, 80% { transform: perspective(1000px) rotateY(0deg) translateX(10px); }
    }
`;
document.head.appendChild(style);
