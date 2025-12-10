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

// Gallery data - using YOUR actual image filenames with captions :3
const galleryData = [
    { src: "images/HAAAAAAAAAHAHA.png", caption: "Dzang you look sad, why???" },
    { src: "images/I don't think Maha wants to watch the show with me.png", caption: "Oh wow you must have been DISGUSTED here" },
    { src: "images/MAHAGEISHA.png", caption: "MAHA GEISHA!!!" },
    { src: "images/Screenshot 2024-02-15 201756.png", caption: "STRAIGHT AURA istg" },
    { src: "images/Screenshot 2025-11-14 195602.png", caption: "ooo you mad" },
    { src: "images/Screenshot 2025-11-14 195608.png", caption: "DANG YOU REAL MAD????" },
    { src: "images/Screenshot 2025-11-14 195612.png", caption: "The Hulkess LMAO" },
    { src: "images/mahawatchingkorbakai5.png", caption: "Batwoman with long nails" },
    { src: "images/mahawatchingkorbakai8.png", caption: "my FAV pic ever" },
    { src: "images/mahawatchingkorbakai9.png", caption: "Aftermath of mocks representation fr" },
    { src: "images/mahawithanantenna.png", caption: "Communicating with the mothership" },
    { src: "images/mahsgonnacrywhensheseesthis.png", caption: "I'm imagining the sound you're making in my head" },
    { src: "images/picklewater.png", caption: "Eugh" },
    { src: "images/queenwhat.png", caption: "HMM?" }
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
    
    // Initialize Taylor Swift Snake Game
    const taylorGame = new TaylorSnakeGame();
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
        captionElement.textContent = galleryData[0].caption; // FIXED: now shows caption
        currentImgElement.textContent = 1;
    }
    
    // Next button functionality
    nextBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = galleryData[currentIndex].caption; // FIXED: now shows caption
        currentImgElement.textContent = currentIndex + 1;
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = galleryData[currentIndex].caption; // FIXED: now shows caption
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

// Taylor Swift Snake Game
class TaylorSnakeGame {
    constructor() {
        this.boardSize = 15;
        this.taylorPosition = { x: 7, y: 7 };
        this.direction = { x: 0, y: 0 };
        this.microphones = [];
        this.snakes = [];
        this.powerUps = [];
        this.score = 0;
        this.highScore = localStorage.getItem('taylorSnakeHighScore') || 0;
        this.lives = 3;
        this.level = 1;
        this.gameRunning = false;
        this.gameInterval = null;
        this.gameSpeed = 200;
        this.microphonesCollected = 0;
        this.microphonesPerLevel = 10;
        
        this.initializeGame();
        this.setupEventListeners();
    }
    
    initializeGame() {
        // Set initial high score display
        document.getElementById('high-score').textContent = this.highScore;
        
        // Create game board
        this.createGameBoard();
        
        // Add initial microphones
        this.addMicrophone();
        this.addMicrophone();
        this.addMicrophone();
        
        // Add initial snakes
        this.addSnake();
        this.addSnake();
        
        // Update game status
        this.updateGameStatus();
    }
    
    createGameBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        // Set grid template
        gameBoard.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${this.boardSize}, 1fr)`;
        
        // Create cells
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'game-cell';
                cell.id = `cell-${col}-${row}`;
                gameBoard.appendChild(cell);
            }
        }
        
        this.updateBoard();
    }
    
    updateBoard() {
        // Clear all special cells
        document.querySelectorAll('.game-cell').forEach(cell => {
            cell.className = 'game-cell';
            cell.textContent = '';
        });
        
        // Update Taylor's position
        const taylorCell = document.getElementById(`cell-${this.taylorPosition.x}-${this.taylorPosition.y}`);
        taylorCell.classList.add('taylor');
        taylorCell.textContent = '👑'; // Taylor crown emoji
        
        // Update microphones
        this.microphones.forEach(mic => {
            const micCell = document.getElementById(`cell-${mic.x}-${mic.y}`);
            micCell.classList.add('microphone');
            micCell.textContent = '🎤';
        });
        
        // Update snakes
        this.snakes.forEach(snake => {
            const snakeCell = document.getElementById(`cell-${snake.x}-${snake.y}`);
            snakeCell.classList.add('snake');
            snakeCell.textContent = '🐍';
        });
        
        // Update power-ups
        this.powerUps.forEach(power => {
            const powerCell = document.getElementById(`cell-${power.x}-${power.y}`);
            powerCell.classList.add(power.type);
            powerCell.textContent = power.emoji;
        });
    }
    
    addMicrophone() {
        const x = Math.floor(Math.random() * this.boardSize);
        const y = Math.floor(Math.random() * this.boardSize);
        
        // Make sure it doesn't spawn on Taylor or existing items
        if (!this.isPositionOccupied(x, y)) {
            this.microphones.push({ x, y });
        }
    }
    
    addSnake() {
        const x = Math.floor(Math.random() * this.boardSize);
        const y = Math.floor(Math.random() * this.boardSize);
        
        // Make sure it doesn't spawn on Taylor or microphones
        if (!this.isPositionOccupied(x, y) && 
            (Math.abs(x - this.taylorPosition.x) > 3 || Math.abs(y - this.taylorPosition.y) > 3)) {
            this.snakes.push({ x, y });
        }
    }
    
    addPowerUp() {
        const types = [
            { type: 'star', emoji: '🌟', points: 25 },
            { type: 'diamond', emoji: '💎', effect: 'life' }
        ];
        
        const powerUp = types[Math.floor(Math.random() * types.length)];
        const x = Math.floor(Math.random() * this.boardSize);
        const y = Math.floor(Math.random() * this.boardSize);
        
        if (!this.isPositionOccupied(x, y)) {
            this.powerUps.push({ ...powerUp, x, y });
        }
    }
    
    isPositionOccupied(x, y) {
        // Check Taylor
        if (x === this.taylorPosition.x && y === this.taylorPosition.y) return true;
        
        // Check microphones
        if (this.microphones.some(mic => mic.x === x && mic.y === y)) return true;
        
        // Check snakes
        if (this.snakes.some(snake => snake.x === x && snake.y === y)) return true;
        
        // Check power-ups
        if (this.powerUps.some(power => power.x === x && power.y === y)) return true;
        
        return false;
    }
    
    moveTaylor() {
        if (!this.gameRunning || (this.direction.x === 0 && this.direction.y === 0)) return;
        
        // Calculate new position
        let newX = this.taylorPosition.x + this.direction.x;
        let newY = this.taylorPosition.y + this.direction.y;
        
        // Wrap around the board
        if (newX < 0) newX = this.boardSize - 1;
        if (newX >= this.boardSize) newX = 0;
        if (newY < 0) newY = this.boardSize - 1;
        if (newY >= this.boardSize) newY = 0;
        
        this.taylorPosition = { x: newX, y: newY };
        this.checkCollisions();
        this.updateBoard();
    }
    
    checkCollisions() {
        // Check microphone collection
        const micIndex = this.microphones.findIndex(mic => 
            mic.x === this.taylorPosition.x && mic.y === this.taylorPosition.y
        );
        
        if (micIndex !== -1) {
            // Collect microphone
            this.microphones.splice(micIndex, 1);
            this.score += 10;
            this.microphonesCollected++;
            
            // Add new microphone
            this.addMicrophone();
            
            // Occasionally add power-up
            if (Math.random() < 0.3) {
                this.addPowerUp();
            }
            
            // Check level up
            if (this.microphonesCollected >= this.microphonesPerLevel) {
                this.levelUp();
            }
            
            // Play sound effect (in real implementation)
            this.showMessage("You got a microphone! +10 points 🎤");
        }
        
        // Check snake collision
        const snakeIndex = this.snakes.findIndex(snake =>
            snake.x === this.taylorPosition.x && snake.y === this.taylorPosition.y
        );
        
        if (snakeIndex !== -1) {
            this.lives--;
            this.snakes.splice(snakeIndex, 1);
            this.addSnake();
            
            if (this.lives <= 0) {
                this.gameOver();
            } else {
                this.showMessage("Watch out for snakes! Lost 1 life 🐍");
            }
        }
        
        // Check power-up collection
        const powerIndex = this.powerUps.findIndex(power =>
            power.x === this.taylorPosition.x && power.y === this.taylorPosition.y
        );
        
        if (powerIndex !== -1) {
            const powerUp = this.powerUps[powerIndex];
            this.powerUps.splice(powerIndex, 1);
            
            if (powerUp.type === 'star') {
                this.score += powerUp.points;
                this.showMessage(`Shake It Off! +${powerUp.points} points ${powerUp.emoji}`);
            } else if (powerUp.type === 'diamond') {
                this.lives = Math.min(this.lives + 1, 3);
                this.showMessage(`Extra life! ${powerUp.emoji}`);
            }
        }
        
        // Update displays
        this.updateDisplays();
    }
    
    levelUp() {
        this.level++;
        this.microphonesCollected = 0;
        this.gameSpeed = Math.max(100, this.gameSpeed - 20); // Speed up
        
        // Add more snakes
        this.addSnake();
        
        // Update level display
        document.getElementById('current-level').textContent = this.level;
        
        // Show level up message
        this.showMessage(`Level ${this.level}! Speed increased! 🚀`);
        
        // Restart game loop with new speed
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.startGameLoop();
        }
    }
    
    updateDisplays() {
        document.getElementById('game-score').textContent = this.score;
        document.getElementById('lives').textContent = '❤️'.repeat(this.lives);
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            document.getElementById('high-score').textContent = this.highScore;
            localStorage.setItem('taylorSnakeHighScore', this.highScore);
        }
    }
    
    updateGameStatus() {
        this.updateDisplays();
        document.getElementById('current-level').textContent = this.level;
    }
    
    showMessage(message) {
        const messageElement = document.getElementById('game-message');
        messageElement.textContent = message;
        
        // Clear message after 2 seconds
        setTimeout(() => {
            if (messageElement.textContent === message) {
                messageElement.textContent = this.gameRunning ? 
                    "Keep collecting microphones! 🎶" : 
                    "Press START to begin your Eras Tour! 🎶";
            }
        }, 2000);
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.showMessage("Game started! Collect those microphones! 🎤");
        this.startGameLoop();
        
        // Update button states
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Playing...';
        document.getElementById('start-game').disabled = true;
    }
    
    startGameLoop() {
        this.gameInterval = setInterval(() => {
            this.moveTaylor();
            this.moveSnakes();
        }, this.gameSpeed);
    }
    
    moveSnakes() {
        // Simple AI: snakes move randomly
        this.snakes.forEach(snake => {
            const directions = [
                { x: 1, y: 0 }, { x: -1, y: 0 },
                { x: 0, y: 1 }, { x: 0, y: -1 }
            ];
            
            const randomDir = directions[Math.floor(Math.random() * directions.length)];
            let newX = snake.x + randomDir.x;
            let newY = snake.y + randomDir.y;
            
            // Wrap around
            if (newX < 0) newX = this.boardSize - 1;
            if (newX >= this.boardSize) newX = 0;
            if (newY < 0) newY = this.boardSize - 1;
            if (newY >= this.boardSize) newY = 0;
            
            // Only move if not occupied by another snake
            if (!this.snakes.some(s => s.x === newX && s.y === newY && s !== snake)) {
                snake.x = newX;
                snake.y = newY;
            }
        });
        
        this.updateBoard();
    }
    
    pauseGame() {
        if (!this.gameRunning) return;
        
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        this.showMessage("Game Paused");
        
        // Update button states
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Resume';
        document.getElementById('start-game').disabled = false;
    }
    
    resetGame() {
        this.pauseGame();
        
        // Reset game state
        this.taylorPosition = { x: 7, y: 7 };
        this.direction = { x: 0, y: 0 };
        this.microphones = [];
        this.snakes = [];
        this.powerUps = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.microphonesCollected = 0;
        this.gameSpeed = 200;
        
        // Reinitialize
        this.initializeGame();
        
        // Reset button
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Start Game';
        document.getElementById('start-game').disabled = false;
        
        this.showMessage("Game reset! Ready to play? 🎮");
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        
        // Show final score
        this.showMessage(`Game Over! Final Score: ${this.score} 🏆`);
        
        // Reset button
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Start New Game';
        document.getElementById('start-game').disabled = false;
        
        // Launch confetti for celebration
        if (typeof startConfetti === 'function') {
            startConfetti();
        }
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.key.toLowerCase()) {
                case 'arrowup':
                case 'w':
                    if (this.direction.y !== 1) {
                        this.direction = { x: 0, y: -1 };
                    }
                    break;
                case 'arrowdown':
                case 's':
                    if (this.direction.y !== -1) {
                        this.direction = { x: 0, y: 1 };
                    }
                    break;
                case 'arrowleft':
                case 'a':
                    if (this.direction.x !== 1) {
                        this.direction = { x: -1, y: 0 };
                    }
                    break;
                case 'arrowright':
                case 'd':
                    if (this.direction.x !== -1) {
                        this.direction = { x: 1, y: 0 };
                    }
                    break;
            }
        });
        
        // Mobile controls
        document.getElementById('up-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.y !== 1) {
                this.direction = { x: 0, y: -1 };
            }
        });
        
        document.getElementById('down-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.y !== -1) {
                this.direction = { x: 0, y: 1 };
            }
        });
        
        document.getElementById('left-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.x !== 1) {
                this.direction = { x: -1, y: 0 };
            }
        });
        
        document.getElementById('right-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.x !== -1) {
                this.direction = { x: 1, y: 0 };
            }
        });
        
        // Game control buttons
        document.getElementById('start-game').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('pause-game').addEventListener('click', () => {
            this.pauseGame();
        });
        
        document.getElementById('reset-game').addEventListener('click', () => {
            this.resetGame();
        });
    }
}// Timeline Data
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

// Gallery data - using YOUR actual image filenames with captions :3
const galleryData = [
    { src: "images/HAAAAAAAAAHAHA.png", caption: "Dzang you look sad, why???" },
    { src: "images/I don't think Maha wants to watch the show with me.png", caption: "Oh wow you must have been DISGUSTED here" },
    { src: "images/MAHAGEISHA.png", caption: "MAHA GEISHA!!!" },
    { src: "images/Screenshot 2024-02-15 201756.png", caption: "STRAIGHT AURA istg" },
    { src: "images/Screenshot 2025-11-14 195602.png", caption: "ooo you mad" },
    { src: "images/Screenshot 2025-11-14 195608.png", caption: "DANG YOU REAL MAD????" },
    { src: "images/Screenshot 2025-11-14 195612.png", caption: "The Hulkess LMAO" },
    { src: "images/mahawatchingkorbakai5.png", caption: "Batwoman with long nails" },
    { src: "images/mahawatchingkorbakai8.png", caption: "my FAV pic ever" },
    { src: "images/mahawatchingkorbakai9.png", caption: "Aftermath of mocks representation fr" },
    { src: "images/mahawithanantenna.png", caption: "Communicating with the mothership" },
    { src: "images/mahsgonnacrywhensheseesthis.png", caption: "I'm imagining the sound you're making in my head" },
    { src: "images/picklewater.png", caption: "Eugh" },
    { src: "images/queenwhat.png", caption: "HMM?" }
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
    
    // Initialize Taylor Swift Snake Game
    const taylorGame = new TaylorSnakeGame();
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
        captionElement.textContent = galleryData[0].caption; // FIXED: now shows caption
        currentImgElement.textContent = 1;
    }
    
    // Next button functionality
    nextBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = galleryData[currentIndex].caption; // FIXED: now shows caption
        currentImgElement.textContent = currentIndex + 1;
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = galleryData[currentIndex].caption; // FIXED: now shows caption
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

// Taylor Swift Snake Game
class TaylorSnakeGame {
    constructor() {
        this.boardSize = 15;
        this.taylorPosition = { x: 7, y: 7 };
        this.direction = { x: 0, y: 0 };
        this.microphones = [];
        this.snakes = [];
        this.powerUps = [];
        this.score = 0;
        this.highScore = localStorage.getItem('taylorSnakeHighScore') || 0;
        this.lives = 3;
        this.level = 1;
        this.gameRunning = false;
        this.gameInterval = null;
        this.gameSpeed = 200;
        this.microphonesCollected = 0;
        this.microphonesPerLevel = 10;
        
        this.initializeGame();
        this.setupEventListeners();
    }
    
    initializeGame() {
        // Set initial high score display
        document.getElementById('high-score').textContent = this.highScore;
        
        // Create game board
        this.createGameBoard();
        
        // Add initial microphones
        this.addMicrophone();
        this.addMicrophone();
        this.addMicrophone();
        
        // Add initial snakes
        this.addSnake();
        this.addSnake();
        
        // Update game status
        this.updateGameStatus();
    }
    
    createGameBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        // Set grid template
        gameBoard.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${this.boardSize}, 1fr)`;
        
        // Create cells
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'game-cell';
                cell.id = `cell-${col}-${row}`;
                gameBoard.appendChild(cell);
            }
        }
        
        this.updateBoard();
    }
    
    updateBoard() {
        // Clear all special cells
        document.querySelectorAll('.game-cell').forEach(cell => {
            cell.className = 'game-cell';
            cell.textContent = '';
        });
        
        // Update Taylor's position
        const taylorCell = document.getElementById(`cell-${this.taylorPosition.x}-${this.taylorPosition.y}`);
        taylorCell.classList.add('taylor');
        taylorCell.textContent = '👑'; // Taylor crown emoji
        
        // Update microphones
        this.microphones.forEach(mic => {
            const micCell = document.getElementById(`cell-${mic.x}-${mic.y}`);
            micCell.classList.add('microphone');
            micCell.textContent = '🎤';
        });
        
        // Update snakes
        this.snakes.forEach(snake => {
            const snakeCell = document.getElementById(`cell-${snake.x}-${snake.y}`);
            snakeCell.classList.add('snake');
            snakeCell.textContent = '🐍';
        });
        
        // Update power-ups
        this.powerUps.forEach(power => {
            const powerCell = document.getElementById(`cell-${power.x}-${power.y}`);
            powerCell.classList.add(power.type);
            powerCell.textContent = power.emoji;
        });
    }
    
    addMicrophone() {
        const x = Math.floor(Math.random() * this.boardSize);
        const y = Math.floor(Math.random() * this.boardSize);
        
        // Make sure it doesn't spawn on Taylor or existing items
        if (!this.isPositionOccupied(x, y)) {
            this.microphones.push({ x, y });
        }
    }
    
    addSnake() {
        const x = Math.floor(Math.random() * this.boardSize);
        const y = Math.floor(Math.random() * this.boardSize);
        
        // Make sure it doesn't spawn on Taylor or microphones
        if (!this.isPositionOccupied(x, y) && 
            (Math.abs(x - this.taylorPosition.x) > 3 || Math.abs(y - this.taylorPosition.y) > 3)) {
            this.snakes.push({ x, y });
        }
    }
    
    addPowerUp() {
        const types = [
            { type: 'star', emoji: '🌟', points: 25 },
            { type: 'diamond', emoji: '💎', effect: 'life' }
        ];
        
        const powerUp = types[Math.floor(Math.random() * types.length)];
        const x = Math.floor(Math.random() * this.boardSize);
        const y = Math.floor(Math.random() * this.boardSize);
        
        if (!this.isPositionOccupied(x, y)) {
            this.powerUps.push({ ...powerUp, x, y });
        }
    }
    
    isPositionOccupied(x, y) {
        // Check Taylor
        if (x === this.taylorPosition.x && y === this.taylorPosition.y) return true;
        
        // Check microphones
        if (this.microphones.some(mic => mic.x === x && mic.y === y)) return true;
        
        // Check snakes
        if (this.snakes.some(snake => snake.x === x && snake.y === y)) return true;
        
        // Check power-ups
        if (this.powerUps.some(power => power.x === x && power.y === y)) return true;
        
        return false;
    }
    
    moveTaylor() {
        if (!this.gameRunning || (this.direction.x === 0 && this.direction.y === 0)) return;
        
        // Calculate new position
        let newX = this.taylorPosition.x + this.direction.x;
        let newY = this.taylorPosition.y + this.direction.y;
        
        // Wrap around the board
        if (newX < 0) newX = this.boardSize - 1;
        if (newX >= this.boardSize) newX = 0;
        if (newY < 0) newY = this.boardSize - 1;
        if (newY >= this.boardSize) newY = 0;
        
        this.taylorPosition = { x: newX, y: newY };
        this.checkCollisions();
        this.updateBoard();
    }
    
    checkCollisions() {
        // Check microphone collection
        const micIndex = this.microphones.findIndex(mic => 
            mic.x === this.taylorPosition.x && mic.y === this.taylorPosition.y
        );
        
        if (micIndex !== -1) {
            // Collect microphone
            this.microphones.splice(micIndex, 1);
            this.score += 10;
            this.microphonesCollected++;
            
            // Add new microphone
            this.addMicrophone();
            
            // Occasionally add power-up
            if (Math.random() < 0.3) {
                this.addPowerUp();
            }
            
            // Check level up
            if (this.microphonesCollected >= this.microphonesPerLevel) {
                this.levelUp();
            }
            
            // Play sound effect (in real implementation)
            this.showMessage("You got a microphone! +10 points 🎤");
        }
        
        // Check snake collision
        const snakeIndex = this.snakes.findIndex(snake =>
            snake.x === this.taylorPosition.x && snake.y === this.taylorPosition.y
        );
        
        if (snakeIndex !== -1) {
            this.lives--;
            this.snakes.splice(snakeIndex, 1);
            this.addSnake();
            
            if (this.lives <= 0) {
                this.gameOver();
            } else {
                this.showMessage("Watch out for snakes! Lost 1 life 🐍");
            }
        }
        
        // Check power-up collection
        const powerIndex = this.powerUps.findIndex(power =>
            power.x === this.taylorPosition.x && power.y === this.taylorPosition.y
        );
        
        if (powerIndex !== -1) {
            const powerUp = this.powerUps[powerIndex];
            this.powerUps.splice(powerIndex, 1);
            
            if (powerUp.type === 'star') {
                this.score += powerUp.points;
                this.showMessage(`Shake It Off! +${powerUp.points} points ${powerUp.emoji}`);
            } else if (powerUp.type === 'diamond') {
                this.lives = Math.min(this.lives + 1, 3);
                this.showMessage(`Extra life! ${powerUp.emoji}`);
            }
        }
        
        // Update displays
        this.updateDisplays();
    }
    
    levelUp() {
        this.level++;
        this.microphonesCollected = 0;
        this.gameSpeed = Math.max(100, this.gameSpeed - 20); // Speed up
        
        // Add more snakes
        this.addSnake();
        
        // Update level display
        document.getElementById('current-level').textContent = this.level;
        
        // Show level up message
        this.showMessage(`Level ${this.level}! Speed increased! 🚀`);
        
        // Restart game loop with new speed
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.startGameLoop();
        }
    }
    
    updateDisplays() {
        document.getElementById('game-score').textContent = this.score;
        document.getElementById('lives').textContent = '❤️'.repeat(this.lives);
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            document.getElementById('high-score').textContent = this.highScore;
            localStorage.setItem('taylorSnakeHighScore', this.highScore);
        }
    }
    
    updateGameStatus() {
        this.updateDisplays();
        document.getElementById('current-level').textContent = this.level;
    }
    
    showMessage(message) {
        const messageElement = document.getElementById('game-message');
        messageElement.textContent = message;
        
        // Clear message after 2 seconds
        setTimeout(() => {
            if (messageElement.textContent === message) {
                messageElement.textContent = this.gameRunning ? 
                    "Keep collecting microphones! 🎶" : 
                    "Press START to begin your Eras Tour! 🎶";
            }
        }, 2000);
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.showMessage("Game started! Collect those microphones! 🎤");
        this.startGameLoop();
        
        // Update button states
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Playing...';
        document.getElementById('start-game').disabled = true;
    }
    
    startGameLoop() {
        this.gameInterval = setInterval(() => {
            this.moveTaylor();
            this.moveSnakes();
        }, this.gameSpeed);
    }
    
    moveSnakes() {
        // Simple AI: snakes move randomly
        this.snakes.forEach(snake => {
            const directions = [
                { x: 1, y: 0 }, { x: -1, y: 0 },
                { x: 0, y: 1 }, { x: 0, y: -1 }
            ];
            
            const randomDir = directions[Math.floor(Math.random() * directions.length)];
            let newX = snake.x + randomDir.x;
            let newY = snake.y + randomDir.y;
            
            // Wrap around
            if (newX < 0) newX = this.boardSize - 1;
            if (newX >= this.boardSize) newX = 0;
            if (newY < 0) newY = this.boardSize - 1;
            if (newY >= this.boardSize) newY = 0;
            
            // Only move if not occupied by another snake
            if (!this.snakes.some(s => s.x === newX && s.y === newY && s !== snake)) {
                snake.x = newX;
                snake.y = newY;
            }
        });
        
        this.updateBoard();
    }
    
    pauseGame() {
        if (!this.gameRunning) return;
        
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        this.showMessage("Game Paused");
        
        // Update button states
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Resume';
        document.getElementById('start-game').disabled = false;
    }
    
    resetGame() {
        this.pauseGame();
        
        // Reset game state
        this.taylorPosition = { x: 7, y: 7 };
        this.direction = { x: 0, y: 0 };
        this.microphones = [];
        this.snakes = [];
        this.powerUps = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.microphonesCollected = 0;
        this.gameSpeed = 200;
        
        // Reinitialize
        this.initializeGame();
        
        // Reset button
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Start Game';
        document.getElementById('start-game').disabled = false;
        
        this.showMessage("Game reset! Ready to play? 🎮");
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        
        // Show final score
        this.showMessage(`Game Over! Final Score: ${this.score} 🏆`);
        
        // Reset button
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Start New Game';
        document.getElementById('start-game').disabled = false;
        
        // Launch confetti for celebration
        if (typeof startConfetti === 'function') {
            startConfetti();
        }
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.key.toLowerCase()) {
                case 'arrowup':
                case 'w':
                    if (this.direction.y !== 1) {
                        this.direction = { x: 0, y: -1 };
                    }
                    break;
                case 'arrowdown':
                case 's':
                    if (this.direction.y !== -1) {
                        this.direction = { x: 0, y: 1 };
                    }
                    break;
                case 'arrowleft':
                case 'a':
                    if (this.direction.x !== 1) {
                        this.direction = { x: -1, y: 0 };
                    }
                    break;
                case 'arrowright':
                case 'd':
                    if (this.direction.x !== -1) {
                        this.direction = { x: 1, y: 0 };
                    }
                    break;
            }
        });
        
        // Mobile controls
        document.getElementById('up-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.y !== 1) {
                this.direction = { x: 0, y: -1 };
            }
        });
        
        document.getElementById('down-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.y !== -1) {
                this.direction = { x: 0, y: 1 };
            }
        });
        
        document.getElementById('left-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.x !== 1) {
                this.direction = { x: -1, y: 0 };
            }
        });
        
        document.getElementById('right-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.x !== -1) {
                this.direction = { x: 1, y: 0 };
            }
        });
        
        // Game control buttons
        document.getElementById('start-game').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('pause-game').addEventListener('click', () => {
            this.pauseGame();
        });
        
        document.getElementById('reset-game').addEventListener('click', () => {
            this.resetGame();
        });
    }
}// Timeline Data
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

// Gallery data - using YOUR actual image filenames with captions :3
const galleryData = [
    { src: "images/HAAAAAAAAAHAHA.png", caption: "Dzang you look sad, why???" },
    { src: "images/I don't think Maha wants to watch the show with me.png", caption: "Oh wow you must have been DISGUSTED here" },
    { src: "images/MAHAGEISHA.png", caption: "MAHA GEISHA!!!" },
    { src: "images/Screenshot 2024-02-15 201756.png", caption: "STRAIGHT AURA istg" },
    { src: "images/Screenshot 2025-11-14 195602.png", caption: "ooo you mad" },
    { src: "images/Screenshot 2025-11-14 195608.png", caption: "DANG YOU REAL MAD????" },
    { src: "images/Screenshot 2025-11-14 195612.png", caption: "The Hulkess LMAO" },
    { src: "images/mahawatchingkorbakai5.png", caption: "Batwoman with long nails" },
    { src: "images/mahawatchingkorbakai8.png", caption: "my FAV pic ever" },
    { src: "images/mahawatchingkorbakai9.png", caption: "Aftermath of mocks representation fr" },
    { src: "images/mahawithanantenna.png", caption: "Communicating with the mothership" },
    { src: "images/mahsgonnacrywhensheseesthis.png", caption: "I'm imagining the sound you're making in my head" },
    { src: "images/picklewater.png", caption: "Eugh" },
    { src: "images/queenwhat.png", caption: "HMM?" }
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
    
    // Initialize Taylor Swift Snake Game
    const taylorGame = new TaylorSnakeGame();
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
        captionElement.textContent = galleryData[0].caption; // FIXED: now shows caption
        currentImgElement.textContent = 1;
    }
    
    // Next button functionality
    nextBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = galleryData[currentIndex].caption; // FIXED: now shows caption
        currentImgElement.textContent = currentIndex + 1;
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = galleryData[currentIndex].caption; // FIXED: now shows caption
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

// Taylor Swift Snake Game
class TaylorSnakeGame {
    constructor() {
        this.boardSize = 15;
        this.taylorPosition = { x: 7, y: 7 };
        this.direction = { x: 0, y: 0 };
        this.microphones = [];
        this.snakes = [];
        this.powerUps = [];
        this.score = 0;
        this.highScore = localStorage.getItem('taylorSnakeHighScore') || 0;
        this.lives = 3;
        this.level = 1;
        this.gameRunning = false;
        this.gameInterval = null;
        this.gameSpeed = 200;
        this.microphonesCollected = 0;
        this.microphonesPerLevel = 10;
        
        this.initializeGame();
        this.setupEventListeners();
    }
    
    initializeGame() {
        // Set initial high score display
        document.getElementById('high-score').textContent = this.highScore;
        
        // Create game board
        this.createGameBoard();
        
        // Add initial microphones
        this.addMicrophone();
        this.addMicrophone();
        this.addMicrophone();
        
        // Add initial snakes
        this.addSnake();
        this.addSnake();
        
        // Update game status
        this.updateGameStatus();
    }
    
    createGameBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        // Set grid template
        gameBoard.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${this.boardSize}, 1fr)`;
        
        // Create cells
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'game-cell';
                cell.id = `cell-${col}-${row}`;
                gameBoard.appendChild(cell);
            }
        }
        
        this.updateBoard();
    }
    
    updateBoard() {
        // Clear all special cells
        document.querySelectorAll('.game-cell').forEach(cell => {
            cell.className = 'game-cell';
            cell.textContent = '';
        });
        
        // Update Taylor's position
        const taylorCell = document.getElementById(`cell-${this.taylorPosition.x}-${this.taylorPosition.y}`);
        taylorCell.classList.add('taylor');
        taylorCell.textContent = '👑'; // Taylor crown emoji
        
        // Update microphones
        this.microphones.forEach(mic => {
            const micCell = document.getElementById(`cell-${mic.x}-${mic.y}`);
            micCell.classList.add('microphone');
            micCell.textContent = '🎤';
        });
        
        // Update snakes
        this.snakes.forEach(snake => {
            const snakeCell = document.getElementById(`cell-${snake.x}-${snake.y}`);
            snakeCell.classList.add('snake');
            snakeCell.textContent = '🐍';
        });
        
        // Update power-ups
        this.powerUps.forEach(power => {
            const powerCell = document.getElementById(`cell-${power.x}-${power.y}`);
            powerCell.classList.add(power.type);
            powerCell.textContent = power.emoji;
        });
    }
    
    addMicrophone() {
        const x = Math.floor(Math.random() * this.boardSize);
        const y = Math.floor(Math.random() * this.boardSize);
        
        // Make sure it doesn't spawn on Taylor or existing items
        if (!this.isPositionOccupied(x, y)) {
            this.microphones.push({ x, y });
        }
    }
    
    addSnake() {
        const x = Math.floor(Math.random() * this.boardSize);
        const y = Math.floor(Math.random() * this.boardSize);
        
        // Make sure it doesn't spawn on Taylor or microphones
        if (!this.isPositionOccupied(x, y) && 
            (Math.abs(x - this.taylorPosition.x) > 3 || Math.abs(y - this.taylorPosition.y) > 3)) {
            this.snakes.push({ x, y });
        }
    }
    
    addPowerUp() {
        const types = [
            { type: 'star', emoji: '🌟', points: 25 },
            { type: 'diamond', emoji: '💎', effect: 'life' }
        ];
        
        const powerUp = types[Math.floor(Math.random() * types.length)];
        const x = Math.floor(Math.random() * this.boardSize);
        const y = Math.floor(Math.random() * this.boardSize);
        
        if (!this.isPositionOccupied(x, y)) {
            this.powerUps.push({ ...powerUp, x, y });
        }
    }
    
    isPositionOccupied(x, y) {
        // Check Taylor
        if (x === this.taylorPosition.x && y === this.taylorPosition.y) return true;
        
        // Check microphones
        if (this.microphones.some(mic => mic.x === x && mic.y === y)) return true;
        
        // Check snakes
        if (this.snakes.some(snake => snake.x === x && snake.y === y)) return true;
        
        // Check power-ups
        if (this.powerUps.some(power => power.x === x && power.y === y)) return true;
        
        return false;
    }
    
    moveTaylor() {
        if (!this.gameRunning || (this.direction.x === 0 && this.direction.y === 0)) return;
        
        // Calculate new position
        let newX = this.taylorPosition.x + this.direction.x;
        let newY = this.taylorPosition.y + this.direction.y;
        
        // Wrap around the board
        if (newX < 0) newX = this.boardSize - 1;
        if (newX >= this.boardSize) newX = 0;
        if (newY < 0) newY = this.boardSize - 1;
        if (newY >= this.boardSize) newY = 0;
        
        this.taylorPosition = { x: newX, y: newY };
        this.checkCollisions();
        this.updateBoard();
    }
    
    checkCollisions() {
        // Check microphone collection
        const micIndex = this.microphones.findIndex(mic => 
            mic.x === this.taylorPosition.x && mic.y === this.taylorPosition.y
        );
        
        if (micIndex !== -1) {
            // Collect microphone
            this.microphones.splice(micIndex, 1);
            this.score += 10;
            this.microphonesCollected++;
            
            // Add new microphone
            this.addMicrophone();
            
            // Occasionally add power-up
            if (Math.random() < 0.3) {
                this.addPowerUp();
            }
            
            // Check level up
            if (this.microphonesCollected >= this.microphonesPerLevel) {
                this.levelUp();
            }
            
            // Play sound effect (in real implementation)
            this.showMessage("You got a microphone! +10 points 🎤");
        }
        
        // Check snake collision
        const snakeIndex = this.snakes.findIndex(snake =>
            snake.x === this.taylorPosition.x && snake.y === this.taylorPosition.y
        );
        
        if (snakeIndex !== -1) {
            this.lives--;
            this.snakes.splice(snakeIndex, 1);
            this.addSnake();
            
            if (this.lives <= 0) {
                this.gameOver();
            } else {
                this.showMessage("Watch out for snakes! Lost 1 life 🐍");
            }
        }
        
        // Check power-up collection
        const powerIndex = this.powerUps.findIndex(power =>
            power.x === this.taylorPosition.x && power.y === this.taylorPosition.y
        );
        
        if (powerIndex !== -1) {
            const powerUp = this.powerUps[powerIndex];
            this.powerUps.splice(powerIndex, 1);
            
            if (powerUp.type === 'star') {
                this.score += powerUp.points;
                this.showMessage(`Shake It Off! +${powerUp.points} points ${powerUp.emoji}`);
            } else if (powerUp.type === 'diamond') {
                this.lives = Math.min(this.lives + 1, 3);
                this.showMessage(`Extra life! ${powerUp.emoji}`);
            }
        }
        
        // Update displays
        this.updateDisplays();
    }
    
    levelUp() {
        this.level++;
        this.microphonesCollected = 0;
        this.gameSpeed = Math.max(100, this.gameSpeed - 20); // Speed up
        
        // Add more snakes
        this.addSnake();
        
        // Update level display
        document.getElementById('current-level').textContent = this.level;
        
        // Show level up message
        this.showMessage(`Level ${this.level}! Speed increased! 🚀`);
        
        // Restart game loop with new speed
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.startGameLoop();
        }
    }
    
    updateDisplays() {
        document.getElementById('game-score').textContent = this.score;
        document.getElementById('lives').textContent = '❤️'.repeat(this.lives);
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            document.getElementById('high-score').textContent = this.highScore;
            localStorage.setItem('taylorSnakeHighScore', this.highScore);
        }
    }
    
    updateGameStatus() {
        this.updateDisplays();
        document.getElementById('current-level').textContent = this.level;
    }
    
    showMessage(message) {
        const messageElement = document.getElementById('game-message');
        messageElement.textContent = message;
        
        // Clear message after 2 seconds
        setTimeout(() => {
            if (messageElement.textContent === message) {
                messageElement.textContent = this.gameRunning ? 
                    "Keep collecting microphones! 🎶" : 
                    "Press START to begin your Eras Tour! 🎶";
            }
        }, 2000);
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.showMessage("Game started! Collect those microphones! 🎤");
        this.startGameLoop();
        
        // Update button states
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Playing...';
        document.getElementById('start-game').disabled = true;
    }
    
    startGameLoop() {
        this.gameInterval = setInterval(() => {
            this.moveTaylor();
            this.moveSnakes();
        }, this.gameSpeed);
    }
    
    moveSnakes() {
        // Simple AI: snakes move randomly
        this.snakes.forEach(snake => {
            const directions = [
                { x: 1, y: 0 }, { x: -1, y: 0 },
                { x: 0, y: 1 }, { x: 0, y: -1 }
            ];
            
            const randomDir = directions[Math.floor(Math.random() * directions.length)];
            let newX = snake.x + randomDir.x;
            let newY = snake.y + randomDir.y;
            
            // Wrap around
            if (newX < 0) newX = this.boardSize - 1;
            if (newX >= this.boardSize) newX = 0;
            if (newY < 0) newY = this.boardSize - 1;
            if (newY >= this.boardSize) newY = 0;
            
            // Only move if not occupied by another snake
            if (!this.snakes.some(s => s.x === newX && s.y === newY && s !== snake)) {
                snake.x = newX;
                snake.y = newY;
            }
        });
        
        this.updateBoard();
    }
    
    pauseGame() {
        if (!this.gameRunning) return;
        
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        this.showMessage("Game Paused");
        
        // Update button states
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Resume';
        document.getElementById('start-game').disabled = false;
    }
    
    resetGame() {
        this.pauseGame();
        
        // Reset game state
        this.taylorPosition = { x: 7, y: 7 };
        this.direction = { x: 0, y: 0 };
        this.microphones = [];
        this.snakes = [];
        this.powerUps = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.microphonesCollected = 0;
        this.gameSpeed = 200;
        
        // Reinitialize
        this.initializeGame();
        
        // Reset button
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Start Game';
        document.getElementById('start-game').disabled = false;
        
        this.showMessage("Game reset! Ready to play? 🎮");
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        
        // Show final score
        this.showMessage(`Game Over! Final Score: ${this.score} 🏆`);
        
        // Reset button
        document.getElementById('start-game').innerHTML = '<i class="fas fa-play"></i> Start New Game';
        document.getElementById('start-game').disabled = false;
        
        // Launch confetti for celebration
        if (typeof startConfetti === 'function') {
            startConfetti();
        }
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.key.toLowerCase()) {
                case 'arrowup':
                case 'w':
                    if (this.direction.y !== 1) {
                        this.direction = { x: 0, y: -1 };
                    }
                    break;
                case 'arrowdown':
                case 's':
                    if (this.direction.y !== -1) {
                        this.direction = { x: 0, y: 1 };
                    }
                    break;
                case 'arrowleft':
                case 'a':
                    if (this.direction.x !== 1) {
                        this.direction = { x: -1, y: 0 };
                    }
                    break;
                case 'arrowright':
                case 'd':
                    if (this.direction.x !== -1) {
                        this.direction = { x: 1, y: 0 };
                    }
                    break;
            }
        });
        
        // Mobile controls
        document.getElementById('up-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.y !== 1) {
                this.direction = { x: 0, y: -1 };
            }
        });
        
        document.getElementById('down-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.y !== -1) {
                this.direction = { x: 0, y: 1 };
            }
        });
        
        document.getElementById('left-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.x !== 1) {
                this.direction = { x: -1, y: 0 };
            }
        });
        
        document.getElementById('right-btn').addEventListener('click', () => {
            if (this.gameRunning && this.direction.x !== -1) {
                this.direction = { x: 1, y: 0 };
            }
        });
        
        // Game control buttons
        document.getElementById('start-game').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('pause-game').addEventListener('click', () => {
            this.pauseGame();
        });
        
        document.getElementById('reset-game').addEventListener('click', () => {
            this.resetGame();
        });
    }
}
