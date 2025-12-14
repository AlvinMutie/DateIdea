/**
 * DateWithYou - Interactive Script
 * Handles scroll animations, form submission, receipt confirmation, and EmailJS integration
 */

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_wy0iqr9';
const EMAILJS_TEMPLATE_ID = 'template_3m5nhx9';
const EMAILJS_PUBLIC_KEY = '9LLwjBULRKf4teFCy';

// ============================================
// CONSTANTS
// ============================================

const SUGGESTED_DATE = 'Wednesday, 17th December 2025';
const SUGGESTED_DATE_ISO = '2025-12-17';
const TARGET_DATE = new Date('2025-12-17T10:00:00'); // 10 AM on the date

// Multiple surprise messages
const SURPRISE_MESSAGES = [
    "You're wonderful, just as you are.",
    "Your smile makes everything brighter.",
    "I'm grateful to know you.",
    "You bring so much light into the world.",
    "Being around you feels like home."
];

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Advanced scroll-triggered animations with IntersectionObserver
 */
function initScrollAnimations() {
    // Observer options for smooth triggering
    const observerOptions = {
        threshold: [0, 0.1, 0.5, 1], // Multiple thresholds for better control
        rootMargin: '0px 0px -10% 0px' // Trigger when 10% from bottom
    };

    // Main observer for entering viewport
    const enterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('leaving');
                entry.target.style.animation = '';
            } else if (entry.target.classList.contains('visible')) {
                // Element is leaving viewport
                entry.target.classList.add('leaving');
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe all scroll-triggered elements
    const scrollElements = document.querySelectorAll(
        '.fade-in-scroll, .slide-up-scroll, .scale-scroll'
    );
    
    scrollElements.forEach(el => {
        enterObserver.observe(el);
        el.style.willChange = 'opacity, transform';
    });

    // Get all fade elements for fallback
    const fadeElements = document.querySelectorAll('.fade-in-scroll, .slide-up-scroll, .scale-scroll, .fade-on-scroll');

    // Stagger animations for child elements
    const staggerContainers = document.querySelectorAll(
        '.appreciation-content, .response-container, .faq-container'
    );
    
    staggerContainers.forEach(container => {
        const children = container.querySelectorAll(':scope > *');
        children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Special handling for question text
    const questionText = document.getElementById('questionText');
    if (questionText) {
        const questionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateQuestionText();
                }
            });
        }, { threshold: 0.2 });

        questionObserver.observe(questionText);
    }

    // Special handling for location text
    const locationText = document.getElementById('locationText');
    if (locationText) {
        const locationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateLocationText();
                }
            });
        }, { threshold: 0.1 });

        locationObserver.observe(locationText);
    }
    
    // Immediate fallback: Show all elements after 0.5 seconds if they haven't been triggered
    setTimeout(() => {
        fadeElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
                el.style.animation = '';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 500);
    
    // Also trigger on page load if elements are already in viewport
    setTimeout(() => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInViewport && !el.classList.contains('visible')) {
                el.classList.add('visible');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 100);
}

/**
 * Animate hero title word by word
 */
function animateHeroTitle() {
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    
    if (!heroTitle) return;

    // Animate "Hey Sandra…"
    const titleWords = heroTitle.querySelectorAll('.word');
    let delay = 300;

    titleWords.forEach((word) => {
        setTimeout(() => {
            word.classList.add('visible');
        }, delay);
        delay += 200;
    });

    // Animate subtitle after title
    if (heroSubtitle) {
        setTimeout(() => {
            const subtitleWords = heroSubtitle.querySelectorAll('.word');
            subtitleWords.forEach((word, index) => {
                setTimeout(() => {
                    word.classList.add('visible');
                    word.style.opacity = '1';
                    word.style.transform = 'translateY(0)';
                }, delay + (index * 150));
            });
        }, delay + 500);
    }
}

/**
 * Animate question text word by word
 */
function animateQuestionText() {
    const questionText = document.getElementById('questionText');
    if (!questionText) return;

    const words = questionText.querySelectorAll('.word');
    let delay = 0;

    words.forEach((word) => {
        setTimeout(() => {
            word.classList.add('visible');
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, delay);
        delay += 150;
    });
}

/**
 * Animate location text word by word with shimmer
 */
function animateLocationText() {
    const locationText = document.getElementById('locationText');
    if (!locationText) return;

    const words = locationText.querySelectorAll('.location-word');
    let delay = 0;

    words.forEach((word) => {
        setTimeout(() => {
            word.classList.add('visible');
            word.style.opacity = '1';
            word.style.transform = 'scale(1)';
        }, delay);
        delay += 200;
    });

    // Add shimmer effect after all words are visible
    setTimeout(() => {
        locationText.classList.add('visible');
    }, delay + 300);
}

// ============================================
// SURPRISE BUTTON
// ============================================

/**
 * Initialize surprise button interaction with multiple messages
 */
function initSurpriseButton() {
    const surpriseButton = document.getElementById('surpriseButton');
    const surpriseMessage = document.getElementById('surpriseMessage');
    const surpriseText = document.getElementById('surpriseText');

    if (!surpriseButton || !surpriseMessage || !surpriseText) return;

    let isRevealed = false;
    let messageIndex = 0;

    surpriseButton.addEventListener('click', () => {
        if (!isRevealed) {
            // Get random message (or cycle through)
            messageIndex = Math.floor(Math.random() * SURPRISE_MESSAGES.length);
            surpriseText.textContent = SURPRISE_MESSAGES[messageIndex];
            surpriseMessage.classList.add('revealed');
            isRevealed = true;
        } else {
            // Cycle to next message
            messageIndex = (messageIndex + 1) % SURPRISE_MESSAGES.length;
            surpriseText.textContent = SURPRISE_MESSAGES[messageIndex];
            // Brief animation
            surpriseMessage.style.opacity = '0';
            setTimeout(() => {
                surpriseMessage.style.opacity = '1';
            }, 200);
        }
    });
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Initialize form and button handlers
 */
function initFormHandling() {
    const form = document.getElementById('responseForm');
    const finalYesButton = document.getElementById('finalYesButton');
    const finalNoButton = document.getElementById('finalNoButton');
    const finalResponseField = document.getElementById('responseType'); // Fixed: use correct ID
    const datePicker = document.getElementById('selected-date');
    const noReasonContainer = document.getElementById('noReasonContainer');
    const noReasonTextarea = document.getElementById('no-reason');
    const submitButtonContainer = document.getElementById('submitButtonContainer');
    const submitButton = document.getElementById('submitButton');

    if (!form || !finalYesButton || !finalNoButton) {
        console.warn('Form or buttons not found');
        return;
    }

    // Set default date picker value to suggested date
    if (datePicker) {
        datePicker.value = SUGGESTED_DATE_ISO;
    }
    
    // Handle Final Yes button - send email immediately
    finalYesButton.addEventListener('click', async () => {
        // Prevent multiple clicks
        if (finalYesButton.disabled) return;
        
        finalYesButton.disabled = true;
        finalYesButton.textContent = 'Sending...';
        
        if (finalResponseField) {
            finalResponseField.value = 'YES';
        }
        finalYesButton.classList.add('clicked');
        
        // Hide no reason field if shown
        if (noReasonContainer) {
            noReasonContainer.classList.remove('visible');
            noReasonContainer.style.display = 'none';
        }
        
        // Get form data
        const selectedDate = getSelectedDate();
        const suggestions = document.getElementById('suggestions')?.value || '';
        
        // Show sending status immediately
        showEmailStatusMessage(false, '⏳ Sending your response...');
        finalYesButton.textContent = 'Sending...';
        
        // Send email via EmailJS immediately
        console.log('Yes button clicked - sending email via EmailJS...');
        const emailResult = await sendEmailViaEmailJS('YES', {
            selectedDate: selectedDate,
            suggestions: suggestions,
            noReason: ''
        });
        
        // Show result with prominent confirmation
        if (emailResult.success) {
            console.log('✅ Email sent successfully!');
            
            // Update button to show success
            finalYesButton.textContent = '✓ Sent!';
            finalYesButton.style.background = 'linear-gradient(135deg, #4a7c4a, #7fa07f)';
            finalYesButton.style.opacity = '0.9';
            finalYesButton.style.cursor = 'default';
            
            // Show prominent success message
            showEmailStatusMessage(true, '✅ Your response has been sent successfully! I\'ll be in touch soon 🌿');
            
            // Show receipt overlay for clear confirmation
            const receiptOverlay = document.getElementById('receiptOverlay');
            const receiptBody = receiptOverlay?.querySelector('.receipt-body');
            if (receiptBody) {
                receiptBody.innerHTML = `
                    <p class="receipt-message" style="font-size: 1.2rem; color: var(--color-forest-green); margin-bottom: 1rem;">
                        ✅ Your response has been sent!
                    </p>
                    <p class="receipt-message">Thank you so much! 🌿</p>
                    <p class="receipt-message">I'm really looking forward to our date.</p>
                    <p class="receipt-message">I'll be in touch soon with more details.</p>
                `;
            }
            showReceipt();
            
            // Store acceptance and show countdown
            localStorage.setItem('dateAccepted', 'true');
            const countdownSection = document.getElementById('countdownSection');
            if (countdownSection) {
                countdownSection.style.display = 'flex';
                initCountdown();
                setTimeout(() => {
                    countdownSection.scrollIntoView({ behavior: 'smooth' });
                }, 3000);
            }
        } else {
            console.error('❌ Email failed to send:', emailResult.error);
            showEmailStatusMessage(false, `❌ Failed to send: ${emailResult.error || 'Unknown error'}. Please check console and try again.`);
            finalYesButton.disabled = false;
            finalYesButton.textContent = 'Yes 🌿';
            finalYesButton.classList.remove('clicked');
            finalYesButton.style.background = '';
            finalYesButton.style.opacity = '';
            finalYesButton.style.cursor = '';
        }
    });
    
    // Handle Final No button - send email immediately
    finalNoButton.addEventListener('click', async () => {
        // Prevent multiple clicks
        if (finalNoButton.disabled) return;
        
        finalNoButton.disabled = true;
        finalNoButton.textContent = 'Sending...';
        
        if (finalResponseField) {
            finalResponseField.value = 'NO';
        }
        finalNoButton.classList.add('clicked');
        
        // Show no reason field
        if (noReasonContainer) {
            noReasonContainer.style.display = 'block';
            setTimeout(() => {
                noReasonContainer.classList.add('visible');
                noReasonTextarea?.focus();
            }, 100);
        }
        
        // Wait a moment for user to optionally add reason, then send
        setTimeout(async () => {
            const selectedDate = getSelectedDate();
            const suggestions = document.getElementById('suggestions')?.value || '';
            const noReason = noReasonTextarea?.value || '';
            
            // Send email via EmailJS
            showEmailStatusMessage(false, '⏳ Sending your response...');
            finalNoButton.textContent = 'Sending...';
            
            console.log('No button clicked - sending email via EmailJS...');
            const emailResult = await sendEmailViaEmailJS('NO', {
                selectedDate: selectedDate,
                suggestions: suggestions,
                noReason: noReason
            });
            
            // Show result with prominent confirmation
            if (emailResult.success) {
                console.log('✅ Email sent successfully!');
                
                // Update button to show success
                finalNoButton.textContent = '✓ Sent!';
                finalNoButton.style.background = 'rgba(255, 255, 255, 0.9)';
                finalNoButton.style.opacity = '0.9';
                finalNoButton.style.cursor = 'default';
                
                // Show prominent success message
                showEmailStatusMessage(true, '✅ Thank you for your honest response 🤍');
                
                // Show receipt overlay
                const receiptOverlay = document.getElementById('receiptOverlay');
                const receiptBody = receiptOverlay?.querySelector('.receipt-body');
                if (receiptBody) {
                    receiptBody.innerHTML = `
                        <p class="receipt-message" style="font-size: 1.2rem; color: var(--color-forest-green); margin-bottom: 1rem;">
                            ✅ Your response has been sent!
                        </p>
                        <p class="receipt-message">Thank you for being honest with me.</p>
                        <p class="receipt-message">Your answer has been received. 🤍</p>
                    `;
                }
                showReceipt();
            } else {
                console.error('❌ Email failed to send:', emailResult.error);
                showEmailStatusMessage(false, `❌ Failed to send: ${emailResult.error || 'Unknown error'}. Please check console and try again.`);
                finalNoButton.disabled = false;
                finalNoButton.textContent = 'No 🤍';
                finalNoButton.classList.remove('clicked');
                finalNoButton.style.background = '';
                finalNoButton.style.opacity = '';
                finalNoButton.style.cursor = '';
            }
        }, 500);
    });

    // Handle form submission (backup/optional - EmailJS is primary)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // EmailJS handles the sending when buttons are clicked
        // This form submission is just a backup for Netlify Forms
        // Most of the logic is now in the button click handlers above
        
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Response 🌿';
        }
    });
}

/**
 * Get the selected date (either from date picker or suggested date)
 */
function getSelectedDate() {
    const datePicker = document.getElementById('selected-date');
    
    if (datePicker && datePicker.value) {
        // Parse date string to avoid timezone issues
        const [year, month, day] = datePicker.value.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return formatDate(date);
    }
    
    return SUGGESTED_DATE;
}

/**
 * Show thank you message for Yes response
 */
function showThankYouMessage() {
    const receiptOverlay = document.getElementById('receiptOverlay');
    const receiptBody = receiptOverlay?.querySelector('.receipt-body');
    
    if (receiptBody) {
        receiptBody.innerHTML = `
            <p class="receipt-message">Thank you so much! 🌿</p>
            <p class="receipt-message">I'm really looking forward to our date.</p>
            <p class="receipt-message">I'll be in touch soon with more details.</p>
        `;
    }
    
    showReceipt();
}

/**
 * Format date to readable format
 */
function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    const ordinal = getOrdinalSuffix(day);
    
    return `${dayName}, ${day}${ordinal} ${month} ${year}`;
}

/**
 * Get ordinal suffix for day (1st, 2nd, 3rd, etc.)
 */
function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// ============================================
// RECEIPT CONFIRMATION
// ============================================

/**
 * Show receipt confirmation overlay
 */
function showReceipt() {
    const receiptOverlay = document.getElementById('receiptOverlay');
    if (!receiptOverlay) return;

    receiptOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Close on click outside
    receiptOverlay.addEventListener('click', (e) => {
        if (e.target === receiptOverlay) {
            closeReceipt();
        }
    });
}

/**
 * Close receipt confirmation
 */
function closeReceipt() {
    const receiptOverlay = document.getElementById('receiptOverlay');
    if (!receiptOverlay) return;

    receiptOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

// ============================================
// THEME TOGGLE
// ============================================

/**
 * Initialize theme toggle
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }

    // Get current theme from HTML attribute (set by inline script)
    let currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    // Update icon based on current theme
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    // Add click handler
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with animation
        if (themeIcon) {
            themeIcon.style.transition = 'transform 0.3s ease';
            themeIcon.style.transform = 'rotate(360deg) scale(0.8)';
            setTimeout(() => {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
                themeIcon.style.transform = 'rotate(0deg) scale(1)';
            }, 150);
        }
        
        console.log('Theme changed to:', newTheme);
    });
    
    console.log('Theme toggle initialized. Current theme:', currentTheme);
}

// ============================================
// INTERACTIVE ELEMENTS
// ============================================

/**
 * Add interactive hover effects to appreciation cards
 */
function initInteractiveCards() {
    const cards = document.querySelectorAll('.appreciation-card');
    
    cards.forEach((card, index) => {
        // Add stagger delay for hover effects
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Add click interaction
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
}

// ============================================
// PROGRESS INDICATOR
// ============================================

/**
 * Initialize scroll progress indicator
 */
function initProgressIndicator() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================

/**
 * Initialize parallax scrolling effects
 */
function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    if (layers.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.1; // Different speeds for each layer
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// FAQ ACCORDION
// ============================================

/**
 * Initialize FAQ accordion functionality
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            const answer = question.nextElementSibling;
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                    const item = q.closest('.faq-item');
                    if (item) item.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                }
            });
            
            // Toggle current FAQ
            const faqItem = question.closest('.faq-item');
            if (isExpanded) {
                question.setAttribute('aria-expanded', 'false');
                faqItem.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                question.setAttribute('aria-expanded', 'true');
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// ============================================
// COUNTDOWN TIMER
// ============================================

/**
 * Initialize countdown timer (only shows if date is accepted)
 */
function initCountdown() {
    const countdownSection = document.getElementById('countdownSection');
    const countdownDays = document.getElementById('countdownDays');
    const countdownHours = document.getElementById('countdownHours');
    const countdownMinutes = document.getElementById('countdownMinutes');
    
    if (!countdownSection || !countdownDays || !countdownHours || !countdownMinutes) return;

    function updateCountdown() {
        const now = new Date();
        const difference = TARGET_DATE - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            if (countdownDays) countdownDays.textContent = days;
            if (countdownHours) countdownHours.textContent = hours;
            if (countdownMinutes) countdownMinutes.textContent = minutes;
        } else {
            if (countdownDays) countdownDays.textContent = '0';
            if (countdownHours) countdownHours.textContent = '0';
            if (countdownMinutes) countdownMinutes.textContent = '0';
        }
    }

    // Check if user accepted (stored in localStorage)
    const accepted = localStorage.getItem('dateAccepted') === 'true';
    if (accepted && countdownSection) {
        countdownSection.style.display = 'flex';
        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute
    }
    
    // Return update function for use after form submission
    return updateCountdown;
}

// ============================================
// ENHANCED PARALLAX SCROLLING
// ============================================

/**
 * Initialize enhanced parallax scrolling with multiple layers
 */
function initEnhancedParallax() {
    // Additional parallax for specific sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const scrollProgress = entry.intersectionRatio;
                    const parallaxSpeed = (index % 3) * 0.02;
                    section.style.transform = `translateY(${scrollProgress * parallaxSpeed * 100}px)`;
                }
            });
        }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
        
        observer.observe(section);
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================

/**
 * Initialize custom nature-themed cursor with smooth movement
 */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor) return;
    
    // Check if device supports hover (desktop only)
    const isHoverDevice = window.matchMedia('(hover: hover)').matches;
    
    if (!isHoverDevice) {
        // Mobile/touch device - hide custom cursor and restore default
        document.body.style.cursor = 'auto';
        cursor.style.display = 'none';
        return;
    }
    
    // Desktop - show custom cursor
    cursor.textContent = '🌿';
    cursor.style.display = 'flex';
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isAnimating = false;
    
    // Smooth cursor movement using requestAnimationFrame
    function updateCursor() {
        if (!isAnimating) {
            isAnimating = true;
        }
        
        // Easing for smooth movement (lerp) - higher value = faster/more responsive
        const ease = 0.35;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isAnimating) {
            // Start animation on first move
            cursorX = mouseX;
            cursorY = mouseY;
            updateCursor();
        }
    }, { passive: true });
    
    // Change cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .appreciation-card, .surprise-button, input, textarea, .response-btn, .date-picker');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursor.textContent = '🤍';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursor.textContent = '🌿';
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// ============================================
// EMAILJS INTEGRATION
// ============================================

/**
 * Initialize EmailJS with public key
 */
function initEmailJS() {
    // Wait for EmailJS SDK to load
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init(EMAILJS_PUBLIC_KEY);
            console.log('EmailJS initialized successfully with public key');
            return true;
        } catch (error) {
            console.error('Error initializing EmailJS:', error);
            return false;
        }
    } else {
        // Retry after a short delay if SDK hasn't loaded yet
        setTimeout(() => {
            if (typeof emailjs !== 'undefined') {
                try {
                    emailjs.init(EMAILJS_PUBLIC_KEY);
                    console.log('EmailJS initialized successfully (delayed)');
                    return true;
                } catch (error) {
                    console.error('Error initializing EmailJS (delayed):', error);
                    return false;
                }
            } else {
                console.warn('EmailJS SDK not loaded - check if script is included in HTML');
                return false;
            }
        }, 1000);
    }
    return false;
}

/**
 * Send email via EmailJS when Yes/No button is clicked
 */
async function sendEmailViaEmailJS(responseType, formData) {
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS SDK not loaded - ensure script is included in HTML');
        console.log('Checking for emailjs object:', typeof emailjs);
        return { success: false, error: 'EmailJS SDK not loaded. Check browser console for details.' };
    }
    
    console.log('📧 EmailJS SDK found, initializing...');
    
    // Ensure EmailJS is initialized with public key
    try {
        if (emailjs.init) {
            emailjs.init(EMAILJS_PUBLIC_KEY);
            console.log('✅ EmailJS initialized with public key');
        } else {
            console.warn('⚠️ emailjs.init not available, may already be initialized');
        }
    } catch (e) {
        // May already be initialized, continue
        console.log('ℹ️ EmailJS initialization check:', e.message || 'Already initialized');
    }
    
    // Verify service and template IDs
    console.log('📋 Using Service ID:', EMAILJS_SERVICE_ID);
    console.log('📋 Using Template ID:', EMAILJS_TEMPLATE_ID);
    console.log('📋 Using Public Key:', EMAILJS_PUBLIC_KEY.substring(0, 10) + '...');
    
    try {
        // Prepare template parameters
        // Match these to your EmailJS template variables
        const templateParams = {
            response_type: responseType === 'YES' ? 'Yes 🌿' : 'No 🤍',
            selected_date: formData.selectedDate || SUGGESTED_DATE,
            suggestions: formData.suggestions || 'None provided',
            no_reason: formData.noReason || 'N/A',
            timestamp: new Date().toLocaleString(),
            page_name: 'DateWithYou',
            message: responseType === 'YES' 
                ? `She said YES! Selected date: ${formData.selectedDate || SUGGESTED_DATE}`
                : `She said NO. Reason: ${formData.noReason || 'Not provided'}`
        };
        
        console.log('📤 Sending email via EmailJS with params:', templateParams);
        
        const result = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );
        
        console.log('✅ Email sent successfully via EmailJS!', result);
        console.log('📧 Status:', result.status);
        console.log('📧 Text:', result.text);
        return { success: true, result: result };
    } catch (error) {
        console.error('❌ EmailJS error details:', error);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error text:', error.text);
        
        // Provide more helpful error message
        let errorMessage = 'Unknown error';
        if (error.text) {
            errorMessage = error.text;
        } else if (error.message) {
            errorMessage = error.message;
        } else if (error.code) {
            errorMessage = `Error code: ${error.code}`;
        }
        
        return { success: false, error: errorMessage };
    }
}

/**
 * Show success/failure message on the page
 */
function showEmailStatusMessage(success, message) {
    // Remove any existing status message
    const existingMessage = document.getElementById('emailStatusMessage');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create status message element
    const statusMessage = document.createElement('div');
    statusMessage.id = 'emailStatusMessage';
    statusMessage.className = `email-status-message ${success ? 'success' : 'error'}`;
    statusMessage.textContent = message;
    statusMessage.setAttribute('role', 'alert');
    statusMessage.setAttribute('aria-live', 'polite');
    
    // Insert after the response buttons
    const finalResponseContainer = document.querySelector('.final-response-container');
    if (finalResponseContainer) {
        finalResponseContainer.insertAdjacentElement('afterend', statusMessage);
        
        // Scroll to message
        setTimeout(() => {
            statusMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        // Auto-remove success messages after 5 seconds
        if (success) {
            setTimeout(() => {
                statusMessage.style.opacity = '0';
                statusMessage.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (statusMessage.parentNode) {
                        statusMessage.remove();
                    }
                }, 300);
            }, 5000);
        }
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize theme toggle FIRST (before any other styling)
        initThemeToggle();
        
        // Initialize interactive cards
        initInteractiveCards();
        
        // Force show all sections immediately
        const allSections = document.querySelectorAll('section');
        allSections.forEach(section => {
            section.style.display = 'flex';
            section.style.visibility = 'visible';
            section.style.opacity = '1';
        });
        
        // Force show all fade-on-scroll elements immediately
        const allFadeElements = document.querySelectorAll('.fade-on-scroll');
        allFadeElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.visibility = 'visible';
        });
        
        // Mark as JS-loaded to prevent fallback animations
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        
        if (heroTitle) {
            heroTitle.classList.add('js-loaded');
            heroTitle.querySelectorAll('.word').forEach(word => {
                word.style.animation = '';
            });
        }
        
        if (heroSubtitle) {
            heroSubtitle.classList.add('js-loaded');
            heroSubtitle.querySelectorAll('.word').forEach(word => {
                word.style.animation = '';
            });
        }
        
        const locationText = document.getElementById('locationText');
        if (locationText) {
            locationText.classList.add('js-loaded');
            locationText.querySelectorAll('.location-word').forEach(word => {
                word.style.animation = '';
            });
        }
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Force show all sections immediately as backup
        setTimeout(() => {
            const sections = document.querySelectorAll('.appreciation-section, .safety-section, .faq-section, .response-section');
            sections.forEach(section => {
                section.style.display = 'flex';
                section.style.visibility = 'visible';
                section.style.opacity = '1';
            });
            
            // Force show all fade-on-scroll elements
            const fadeElements = document.querySelectorAll('.fade-on-scroll');
            fadeElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.visibility = 'visible';
            });
        }, 200);
        
        // Animate hero title after a short delay
        setTimeout(() => {
            try {
                animateHeroTitle();
            } catch (error) {
                console.error('Error animating hero title:', error);
                // Fallback: show all words immediately
                if (heroTitle) {
                    heroTitle.querySelectorAll('.word').forEach(word => {
                        word.classList.add('visible');
                        word.style.opacity = '1';
                        word.style.transform = 'translateY(0) scale(1)';
                    });
                }
                if (heroSubtitle) {
                    heroSubtitle.querySelectorAll('.word').forEach(word => {
                        word.classList.add('visible');
                        word.style.opacity = '1';
                        word.style.transform = 'translateY(0)';
                    });
                }
            }
        }, 500);
        
        // Initialize surprise button
        try {
            initSurpriseButton();
        } catch (error) {
            console.error('Error initializing surprise button:', error);
        }
        
        // Initialize form handling
        try {
            initFormHandling();
        } catch (error) {
            console.error('Error initializing form handling:', error);
        }
        
        // Initialize progress indicator
        try {
            initProgressIndicator();
        } catch (error) {
            console.error('Error initializing progress indicator:', error);
        }
        
        // Initialize parallax effects
        try {
            initParallax();
        } catch (error) {
            console.error('Error initializing parallax:', error);
        }
        
        // Initialize FAQ
        try {
            initFAQ();
        } catch (error) {
            console.error('Error initializing FAQ:', error);
        }
        
        // Initialize countdown
        try {
            initCountdown();
        } catch (error) {
            console.error('Error initializing countdown:', error);
        }
        
        // Initialize EmailJS - wait for SDK to load
        const initEmailJSWithRetry = (attempts = 0) => {
            if (typeof emailjs !== 'undefined') {
                try {
                    emailjs.init(EMAILJS_PUBLIC_KEY);
                    console.log('✅ EmailJS initialized successfully with public key:', EMAILJS_PUBLIC_KEY.substring(0, 10) + '...');
                    console.log('✅ Service ID:', EMAILJS_SERVICE_ID);
                    console.log('✅ Template ID:', EMAILJS_TEMPLATE_ID);
                } catch (error) {
                    console.error('❌ Error initializing EmailJS:', error);
                }
            } else {
                attempts++;
                if (attempts < 10) {
                    // Retry after delay (up to 10 times = 5 seconds)
                    console.log(`⏳ Waiting for EmailJS SDK to load... (attempt ${attempts}/10)`);
                    setTimeout(() => initEmailJSWithRetry(attempts), 500);
                } else {
                    console.error('❌ EmailJS SDK failed to load after 10 attempts. Check if script is included in HTML.');
                }
            }
        };
        
        try {
            initEmailJSWithRetry();
        } catch (error) {
            console.error('❌ Error setting up EmailJS initialization:', error);
        }
        
        // Initialize custom cursor (with delay to ensure DOM is ready)
        try {
            setTimeout(() => {
                initCustomCursor();
            }, 100);
        } catch (error) {
            console.error('Error initializing custom cursor:', error);
        }
        
        // Initialize enhanced parallax
        try {
            initEnhancedParallax();
        } catch (error) {
            console.error('Error initializing enhanced parallax:', error);
        }
        
    } catch (error) {
        console.error('Error initializing page:', error);
        // Emergency fallback: show all text immediately
        document.querySelectorAll('.word, .location-word').forEach(word => {
            word.style.opacity = '1';
            word.style.transform = 'none';
        });
    }
});

