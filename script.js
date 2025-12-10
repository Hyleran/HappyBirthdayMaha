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
const galleryData = [
    { src: "images/maha1.jpg", caption: "That time we tried to take a serious photo but ended up laughing" },
    { src: "images/maha2.jpg", caption: "Our attempt at a cute friendship picture that turned out awkward" },
    { src: "images/maha3.jpg", caption: "When we discovered a mutual love for terrible selfie angles" },
    { src: "images/maha4.jpg", caption: "Proof that we can't take a normal photo together" },
    { src: "images/maha5.jpg", caption: "That 'serious' conversation that dissolved into giggles" },
    { src: "images/maha6.jpg", caption: "Our 'model' phase that thankfully didn't last long" },
    { src: "images/maha7.jpg", caption: "When we tried to be artsy but ended up with blurry photos" },
    { src: "images/maha8.jpg", caption: "That embarrassing moment captured forever (thanks, camera!)" },
    { src: "images/maha9.jpg", caption: "Our 'we just woke up' photo session that went wrong" },
    { src: "images/maha10.jpg", caption: "The picture that sums up our entire friendship - perfectly imperfect" }
];

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
        captionElement.textContent = galleryData[0].caption;
        currentImgElement.textContent = 1;
    }
    
    // Next button functionality
    nextBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = galleryData[currentIndex].caption;
        currentImgElement.textContent = currentIndex + 1;
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].classList.add('active');
        captionElement.textContent = galleryData[currentIndex].caption;
        currentImgElement.textContent = currentIndex + 1;
    });
    
    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        nextBtn.click();
    }, 5000);
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
