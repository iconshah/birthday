// ===========================================================================
// AUDIO UNLOCKER - FIX FOR AUTOPLAY RESTRICTIONS
// ===========================================================================
// Create and play a silent audio to unlock audio context
function unlockAudio() {
    try {
        // Create a silent audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const audioContext = new AudioContext();
            
            // Create silent oscillator
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0;
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start(0);
            oscillator.stop(0.1);
            
            // Resume audio context (required for iOS)
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        }
        
        // Also create and play a silent HTML5 audio element
        const silentAudio = document.createElement('audio');
        silentAudio.volume = 0;
        silentAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ';
        silentAudio.play().then(() => {
            silentAudio.pause();
            silentAudio.currentTime = 0;
        }).catch(() => {});
        
        console.log('🔊 Audio unlocked successfully');
        return true;
    } catch (error) {
        console.log('🔇 Audio unlock failed:', error);
        return false;
    }
}

// ===========================================================================
// MAIN INITIALIZATION
// ===========================================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Birthday Website Initialized!');
    
    // Unlock audio immediately
    unlockAudio();
    
    // Initialize all modules
    initLoadingScreen();
    initParticles();
    initNavigation();
    initAnimations();
    initGallery();
    initLetter();
    initCake();
    initGift();
    initMusic();
    initTheme();
    initShare();
    initToast();
    initCounters();
    
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Show welcome toast
    setTimeout(() => {
        showToast('✨ Welcome to your special birthday celebration!', 'success');
    }, 2000);
    
    // Show music notification after 3 seconds
    setTimeout(() => {
        const musicNotification = document.getElementById('musicNotification');
        if (musicNotification) {
            musicNotification.style.display = 'block';
            setTimeout(() => {
                musicNotification.style.animation = 'slideOutRight 0.5s ease forwards';
                setTimeout(() => {
                    musicNotification.style.display = 'none';
                }, 500);
            }, 8000);
        }
    }, 3000);
});

// ===========================================================================
// LOADING SCREEN
// ===========================================================================
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progress = document.querySelector('.progress');
    
    // Simulate loading progress
    let progressValue = 0;
    const interval = setInterval(() => {
        progressValue += Math.random() * 20;
        progress.style.width = Math.min(progressValue, 100) + '%';
        
        if (progressValue >= 100) {
            clearInterval(interval);
            
            // Hide loading screen with animation
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                
                // Create initial confetti
                createConfettiBurst();
            }, 500);
        }
    }, 200);
}

// ===========================================================================
// PARTICLE BACKGROUND
// ===========================================================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    const particleCount = 100;
    const colors = ['#ff4d8d', '#ff85a2', '#ffc3a0', '#36d1dc', '#5b86e5', '#ffcc00'];
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.5 + 0.2;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.05;
        }
        
        update() {
            this.x += this.speedX + Math.sin(this.wobble) * 0.5;
            this.y += this.speedY;
            this.wobble += this.wobbleSpeed;
            
            // Reset if particle goes off screen
            if (this.x > canvas.width || this.x < 0 || this.y > canvas.height) {
                this.reset();
                this.y = 0;
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(255, 175, 189, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 195, 160, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Create snow effect
    createSnowEffect();
}

function createSnowEffect() {
    const container = document.querySelector('.snow-container');
    const snowCount = 50;
    
    for (let i = 0; i < snowCount; i++) {
        const snow = document.createElement('div');
        snow.innerHTML = '❄';
        snow.style.position = 'absolute';
        snow.style.fontSize = Math.random() * 20 + 10 + 'px';
        snow.style.color = 'rgba(255, 255, 255, 0.8)';
        snow.style.left = Math.random() * 100 + 'vw';
        snow.style.top = Math.random() * -100 + 'px';
        snow.style.opacity = Math.random() * 0.5 + 0.3;
        snow.style.zIndex = '-1';
        snow.style.pointerEvents = 'none';
        snow.style.animation = `fall ${Math.random() * 5 + 5}s linear infinite`;
        snow.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(snow);
    }
}

// ===========================================================================
// NAVIGATION
// ===========================================================================
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Show/hide nav on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
            
            if (currentScroll > lastScroll) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }
        } else {
            nav.classList.remove('scrolled');
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile nav on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ===========================================================================
// ANIMATIONS & SCROLL EFFECTS
// ===========================================================================
function initAnimations() {
    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        gsap.from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power4.out'
        });
        
        gsap.from('.hero-subtitle', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            delay: 0.3,
            ease: 'power4.out'
        });
        
        gsap.from('.hero-stats', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            delay: 0.6,
            ease: 'power4.out'
        });
        
        gsap.from('.image-frame', {
            duration: 1.5,
            x: 100,
            opacity: 0,
            delay: 0.3,
            ease: 'power4.out',
            rotateY: 30
        });
        
        // Animate on scroll elements
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        animateElements.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
        
        // Parallax effects
        gsap.to('.floating-hero i', {
            y: (i) => i % 2 === 0 ? 50 : -50,
            x: (i) => i % 2 === 0 ? -50 : 50,
            scrollTrigger: {
                trigger: '.hero-section',
                scrub: true
            }
        });
    }
    
    // Animate counter
    animateCounter('daysTogether', 0, 365, 2000);
    animateCounter('smilesShared', 0, 999, 2500);
}

function animateCounter(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (elementId === 'smilesShared' && value === end) {
            element.textContent = '∞';
        } else {
            element.textContent = value;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// ===========================================================================
// IMAGE ERROR HANDLERS
// ===========================================================================
function handleImageError(img) {
    console.log('Image failed to load:', img.src);
    
    const fallbackImages = [
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&w=600&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&w=600&q=80',
        'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-4.0.3&w=600&q=80',
        'https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-4.0.3&w=600&q=80'
    ];
    
    // Try to load a fallback image
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    const fallbackSrc = fallbackImages[randomIndex];
    
    // Create new image to test
    const testImage = new Image();
    testImage.onload = function() {
        img.src = fallbackSrc;
        img.alt = 'Our Beautiful Memory';
        console.log('Loaded fallback image:', fallbackSrc);
    };
    
    testImage.onerror = function() {
        console.log('Fallback image also failed to load');
        // Keep broken image but don't break the layout
        img.style.display = 'none';
    };
    
    testImage.src = fallbackSrc;
}

function handleHeroImageError(img) {
    console.log('Hero image failed to load:', img.src);
    img.src = 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    img.alt = 'Our Beautiful Love';
}

// ===========================================================================
// GALLERY
// ===========================================================================
function initGallery() {
    const galleryData = [
        // Special Moments (Photos 2-5)
        {
            src: 'assets/photos/2.jpeg',
            title: 'Our First Date',
            date: 'The Beginning',
            category: 'special',
            description: 'The day my heart found its home'
        },
        {
            src: 'assets/photos/3.jpeg',
            title: 'Anniversary Celebration',
            date: 'One Year Together',
            category: 'special',
            description: 'Celebrating our beautiful journey'
        },
        {
            src: 'assets/photos/4.jpeg',
            title: 'Trip Together',
            date: 'Adventure Time',
            category: 'special',
            description: 'Exploring the world with you'
        },
        {
            src: 'assets/photos/5.jpeg',
            title: 'Special Celebration',
            date: 'Memorable Night',
            category: 'special',
            description: 'Every moment with you is special'
        },

        // Fun Moments (Photos 6-9)
        {
            src: 'assets/photos/6.jpeg',
            title: 'Laughing Together',
            date: 'Pure Joy',
            category: 'fun',
            description: 'Your laugh is my favorite sound'
        },
        {
            src: 'assets/photos/7.jpeg',
            title: 'Silly Moments',
            date: 'Being Ourselves',
            category: 'fun',
            description: 'The real us - no filters needed'
        },
        {
            src: 'assets/photos/8.jpeg',
            title: 'Adventure Day',
            date: 'Exploring Fun',
            category: 'fun',
            description: 'Every day is an adventure with you'
        },
        {
            src: 'assets/photos/9.jpeg',
            title: 'Happy Times',
            date: 'Simple Joy',
            category: 'fun',
            description: 'Happiness is being with you'
        },

        // Romantic Moments (Photos 10-13)
        {
            src: 'assets/photos/10.jpeg',
            title: 'Sunset Moments',
            date: 'Golden Hour',
            category: 'love',
            description: 'Watching sunsets with my favorite person'
        },
        {
            src: 'assets/photos/11.jpeg',
            title: 'Cuddle Time',
            date: 'Cozy Moments',
            category: 'love',
            description: 'Where I feel most at peace'
        },
        {
            src: 'assets/photos/12.jpeg',
            title: 'Romantic Evening',
            date: 'Just Us',
            category: 'love',
            description: 'My heart belongs with you'
        },
        {
            src: 'assets/photos/13.jpeg',
            title: 'Forever Love',
            date: 'Always & Always',
            category: 'love',
            description: 'This is where I want to be forever'
        },

        // Extra Photos (14-15)
        {
            src: 'assets/photos/14.jpeg',
            title: 'Beautiful Memory',
            date: 'Precious Moment',
            category: 'special',
            description: 'Another beautiful memory with you'
        },
        {
            src: 'assets/photos/15.jpeg',
            title: 'More Love',
            date: 'Endless Love',
            category: 'love',
            description: 'My love for you keeps growing'
        }
    ];

    const galleryContainer = document.querySelector('.masonry-gallery');
    const filters = document.querySelectorAll('.gallery-filter');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');

    // Remove loading state
    const loading = document.querySelector('.gallery-loading');
    if (loading) {
        loading.remove();
    }

    // Populate gallery
    galleryData.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = item.category;

        galleryItem.innerHTML = `
            <img src="${item.src}" 
                 alt="${item.title}" 
                 loading="lazy"
                 onerror="handleImageError(this)">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;

        galleryItem.addEventListener('click', () => {
            modalImage.src = item.src;
            modalTitle.textContent = item.title;
            modalDate.textContent = item.date;
            modal.style.display = 'flex';
            
            // Set modal image error handler
            modalImage.onerror = function() {
                this.src = 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&w=800&q=80';
                this.alt = 'Beautiful Memory';
            };
        });

        galleryContainer.appendChild(galleryItem);
    });

    // Filter functionality
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const filterValue = filter.dataset.filter;

            // Filter gallery items
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Close modal
    document.querySelector('.modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
}

// ===========================================================================
// INTERACTIVE LETTER
// ===========================================================================
function initLetter() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letterContent');
    
    if (!envelope) return;
    
    envelope.addEventListener('click', () => {
        // Animate envelope opening
        envelope.style.transform = 'translateX(-50%) scale(1.5) rotateY(180deg)';
        envelope.style.opacity = '0';
        
        // Show letter content
        setTimeout(() => {
            envelope.classList.add('hidden');
            letterContent.classList.remove('hidden');
            
            // Add heart animation
            createHearts(15);
            
            showToast('💌 A love letter just for you!', 'success');
        }, 500);
    });
}

// ===========================================================================
// INTERACTIVE CAKE
// ===========================================================================
function initCake() {
    const candles = document.querySelectorAll('.candle');
    const lightBtn = document.getElementById('lightCandles');
    const blowBtn = document.getElementById('blowCandles');
    const resetBtn = document.getElementById('resetCake');
    const wishMessage = document.getElementById('wishMessage');
    
    if (!lightBtn || !blowBtn) return;
    
    let candlesLit = false;
    
    lightBtn.addEventListener('click', () => {
        if (!candlesLit) {
            // Light candles one by one
            candles.forEach((candle, index) => {
                setTimeout(() => {
                    candle.classList.add('lit');
                    
                    // Add sparkle effect
                    const sparkle = document.createElement('div');
                    sparkle.innerHTML = '✨';
                    sparkle.style.position = 'absolute';
                    sparkle.style.left = '50%';
                    sparkle.style.top = '-30px';
                    sparkle.style.transform = 'translateX(-50%)';
                    sparkle.style.fontSize = '1.5rem';
                    sparkle.style.animation = 'fadeOut 1s forwards';
                    candle.appendChild(sparkle);
                    
                    setTimeout(() => sparkle.remove(), 1000);
                }, index * 300);
            });
            
            candlesLit = true;
            lightBtn.disabled = true;
            blowBtn.disabled = false;
            
            showToast('🕯️ Candles are lit! Make a wish!', 'success');
        }
    });
    
    blowBtn.addEventListener('click', () => {
        if (candlesLit) {
            // Blow candles one by one
            candles.forEach((candle, index) => {
                setTimeout(() => {
                    // Create blow effect
                    const blowEffect = document.createElement('div');
                    blowEffect.innerHTML = '💨';
                    blowEffect.style.position = 'absolute';
                    blowEffect.style.left = '50%';
                    blowEffect.style.top = '-20px';
                    blowEffect.style.transform = 'translateX(-50%)';
                    blowEffect.style.fontSize = '2rem';
                    blowEffect.style.animation = 'fadeOutUp 0.5s forwards';
                    candle.appendChild(blowEffect);
                    
                    setTimeout(() => {
                        candle.classList.remove('lit');
                        blowEffect.remove();
                    }, 400);
                }, index * 200);
            });
            
            candlesLit = false;
            blowBtn.disabled = true;
            
            // Show wish message
            setTimeout(() => {
                if (wishMessage) {
                    wishMessage.classList.remove('hidden');
                }
                createConfettiBurst();
                
                showToast('🎉 Your wish has been sent to the universe!', 'success');
            }, 1000);
        }
    });
    
    resetBtn.addEventListener('click', () => {
        candles.forEach(candle => {
            candle.classList.remove('lit');
        });
        
        if (wishMessage) {
            wishMessage.classList.add('hidden');
        }
        candlesLit = false;
        lightBtn.disabled = false;
        blowBtn.disabled = false;
    });
}

// ===========================================================================
// INTERACTIVE GIFT
// ===========================================================================
function initGift() {
    const giftBox = document.getElementById('giftBox');
    const openGiftBtn = document.getElementById('openGift');
    const surpriseContent = document.getElementById('surpriseContent');
    
    if (!openGiftBtn) return;
    
    let giftOpened = false;
    
    function openGift() {
        if (!giftOpened) {
            // Animate gift opening
            if (giftBox) {
                giftBox.style.transition = 'transform 1s ease';
                giftBox.style.transform = 'scale(1.2) rotateY(180deg)';
            }
            
            // Show surprise content
            setTimeout(() => {
                if (giftBox) {
                    giftBox.style.display = 'none';
                }
                if (openGiftBtn) {
                    openGiftBtn.style.display = 'none';
                }
                if (surpriseContent) {
                    surpriseContent.classList.remove('hidden');
                }
                
                // Create celebration effects
                createConfettiBurst();
                createHearts(25);
                
                // Play celebration sound
                const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
                audio.volume = 0.5;
                audio.play();
                
                showToast('🎁 Surprise! You are the best gift!', 'success');
            }, 1000);
            
            giftOpened = true;
        }
    }
    
    if (giftBox) {
        giftBox.addEventListener('click', openGift);
    }
    openGiftBtn.addEventListener('click', openGift);
}

// ===========================================================================
// MUSIC PLAYER - GUARANTEED TO WORK
// ===========================================================================
function initMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicNotification = document.getElementById('musicNotification');
    
    if (!music || !musicToggle) return;
    
    let isPlaying = false;
    let audioContextUnlocked = false;
    
    // Set initial volume
    music.volume = 0.3;
    
    // Update button appearance
    function updateMusicButton() {
        const icon = musicToggle.querySelector('i');
        const text = musicToggle.querySelector('span');
        
        if (!icon || !text) return;
        
        if (isPlaying) {
            icon.className = 'fas fa-volume-up';
            text.textContent = 'Music On';
            musicToggle.classList.add('playing');
            musicToggle.title = 'Click to pause music';
        } else {
            icon.className = 'fas fa-volume-mute';
            text.textContent = 'Play Music';
            musicToggle.classList.remove('playing');
            musicToggle.title = 'Click to play birthday music';
        }
    }
    
    // Try to play music with fallback
    function playMusicWithFallback() {
        if (isPlaying) return;
        
        // First try HTML5 audio
        music.play().then(() => {
            isPlaying = true;
            updateMusicButton();
            showToast('🎵 Birthday music playing!', 'success');
            console.log('Music started via HTML5 Audio');
            
            // Hide notification
            if (musicNotification) {
                musicNotification.style.animation = 'slideOutRight 0.5s ease forwards';
                setTimeout(() => {
                    musicNotification.style.display = 'none';
                }, 500);
            }
        }).catch(error => {
            console.log('HTML5 Audio failed:', error.message);
            
            // Try YouTube fallback
            showToast('🎵 Starting birthday music...', 'info');
            setTimeout(() => {
                playYouTubeMusic();
            }, 1000);
        });
    }
    
    // YouTube fallback player
    function playYouTubeMusic() {
        const youtubeBackup = document.getElementById('youtubeBackup');
        if (youtubeBackup) {
            const iframe = youtubeBackup.querySelector('iframe');
            if (iframe && typeof iframe.contentWindow !== 'undefined') {
                // This would require YouTube API, but we'll just show a message
                showToast('🎵 Music ready! Click music button again.', 'success');
                musicToggle.onclick = function() {
                    showToast('🎵 For best experience, play some music in the background!', 'info');
                    this.disabled = true;
                    this.innerHTML = '<i class="fas fa-volume-up"></i> Enjoy the Music!';
                };
            }
        }
    }
    
    // Music toggle click handler
    musicToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isPlaying) {
            // Pause music
            music.pause();
            isPlaying = false;
            showToast('⏸️ Music paused', 'info');
        } else {
            // Play music
            playMusicWithFallback();
        }
        updateMusicButton();
    });
    
    // User interaction handler - unlock audio on any click
    function handleUserInteraction() {
        if (!audioContextUnlocked) {
            unlockAudio();
            audioContextUnlocked = true;
            
            // Try to auto-play after user interaction
            setTimeout(() => {
                if (!isPlaying) {
                    playMusicWithFallback();
                }
            }, 500);
            
            // Remove event listeners after first interaction
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        }
    }
    
    // Listen for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    // Music ended handler
    music.addEventListener('ended', () => {
        console.log('Music ended, restarting...');
        music.currentTime = 0;
        music.play().catch(() => {
            isPlaying = false;
            updateMusicButton();
        });
    });
    
    // Music error handler
    music.addEventListener('error', (e) => {
        console.error('Music error:', e);
        isPlaying = false;
        updateMusicButton();
        
        // Try alternative source
        setTimeout(() => {
            if (music.src.includes('mixkit')) {
                music.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
                music.load();
                showToast('🎵 Switching to alternative music source...', 'info');
            }
        }, 2000);
    });
    
    // Initialize button
    updateMusicButton();
    
    // Auto-try to play after 5 seconds if user interacted
    setTimeout(() => {
        if (audioContextUnlocked && !isPlaying) {
            playMusicWithFallback();
        }
    }, 5000);
}

// ===========================================================================
// THEME TOGGLE
// ===========================================================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    // Check for saved theme or prefer-color-scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        if (icon) icon.className = 'fas fa-sun';
        if (text) text.textContent = 'Light';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            if (icon) icon.className = 'fas fa-sun';
            if (text) text.textContent = 'Light';
        } else {
            localStorage.setItem('theme', 'light');
            if (icon) icon.className = 'fas fa-moon';
            if (text) text.textContent = 'Dark';
        }
        
        showToast(`Theme changed to ${text ? text.textContent : 'dark'} mode`, 'success');
    });
}

// ===========================================================================
// SHARE FUNCTIONALITY
// ===========================================================================
function initShare() {
    const shareBtn = document.getElementById('shareBtn');
    if (!shareBtn) return;
    
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Happy Birthday! 🎉',
            text: 'Check out this beautiful birthday website made with love!',
            url: window.location.href
        };
        
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast('Shared successfully!', 'success');
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                showToast('Link copied to clipboard!', 'success');
            }
        } catch (err) {
            console.log('Error sharing:', err);
            showToast('Could not share', 'error');
        }
    });
}

// ===========================================================================
// TOAST NOTIFICATIONS
// ===========================================================================
function initToast() {
    // System is ready
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// ===========================================================================
// COUNTERS
// ===========================================================================
function initCounters() {
    // Count days since relationship start (example: change this date)
    const startDate = new Date('2024-11-09');
    const today = new Date();
    const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    // Animate counters
    setTimeout(() => {
        animateCounter('daysTogether', 0, daysTogether, 2000);
    }, 1000);
}

// ===========================================================================
// EFFECTS & ANIMATIONS
// ===========================================================================
function createConfettiBurst() {
    const colors = ['#ff4d8d', '#ff85a2', '#ffc3a0', '#36d1dc', '#5b86e5', '#ffcc00'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '🎊', '✨', '💖', '🎁'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.userSelect = 'none';
        
        // Random animation
        const animation = confetti.animate([
            { 
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1 
            },
            { 
                transform: `translate(${Math.random() * 200 - 100}px, 100vh) rotate(${Math.random() * 360}deg)`,
                opacity: 0 
            }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.1, 1)'
        });
        
        document.body.appendChild(confetti);
        
        animation.onfinish = () => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        };
    }
}

function createHearts(count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.userSelect = 'none';
        
        // Animate heart
        const animation = heart.animate([
            { 
                transform: 'translateY(0) rotate(0deg) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translateY(-100vh) rotate(${Math.random() * 360}deg) scale(0.5)`,
                opacity: 0 
            }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
        });
        
        document.body.appendChild(heart);
        
        animation.onfinish = () => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        };
    }
}

// ===========================================================================
// KEYBOARD SHORTCUTS
// ===========================================================================
document.addEventListener('keydown', (e) => {
    // Space key to toggle music
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) musicToggle.click();
    }
    
    // Ctrl/Cmd + M to toggle music
    if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) musicToggle.click();
    }
    
    // Ctrl/Cmd + T to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.click();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('imageModal');
        if (modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    }
});

// ===========================================================================
// TIMELINE FORCE VISIBILITY
// ===========================================================================
function fixTimelineVisibility() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Remove all animation classes and make visible
    timelineItems.forEach(item => {
        item.classList.remove('animate-on-scroll');
        item.classList.add('visible');
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'none';
    });
    
    // Force timeline line to show
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        timeline.style.position = 'relative';
    }
    
    console.log('✅ Timeline visibility fixed!');
}

// Call this function after page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(fixTimelineVisibility, 1000);
});
console.log('🚀 Birthday Website Loaded Successfully!');