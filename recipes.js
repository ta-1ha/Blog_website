// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Hide header on scroll down, show on scroll up
let lastScroll = 0;
const header = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('hidden');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
        // Scroll down
        header.classList.add('hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
        // Scroll up
        header.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});

// Floating Action Button
const fab = document.getElementById('fab');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        fab.classList.add('show');
    } else {
        fab.classList.remove('show');
    }
});

fab.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Create confetti effect
    createConfetti();
});

function createConfetti() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Create floating ingredients in the background
function createFloatingIngredients() {
    const ingredients = [
        '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒',
        '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🥦', '🥬', '🥒',
        '🌶', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖',
        '🥨', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭',
        '🥪', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🥣'
    ];

    const container = document.querySelector('body');

    for (let i = 0; i < 20; i++) {
        const ingredient = document.createElement('div');
        ingredient.className = 'floating-ingredient';
        ingredient.textContent = ingredients[Math.floor(Math.random() * ingredients.length)];
        ingredient.style.left = Math.random() * 100 + 'vw';
        ingredient.style.fontSize = Math.random() * 20 + 20 + 'px';
        ingredient.style.animationDelay = Math.random() * 10 + 's';
        ingredient.style.animationDuration = Math.random() * 10 + 10 + 's';
        container.appendChild(ingredient);
    }
}

// Call the function to create floating ingredients
createFloatingIngredients();

// Recipe Filtering
const filterTags = document.querySelectorAll('.filter-tag');
const recipeCards = document.querySelectorAll('.recipe-card');
const clearFiltersBtn = document.getElementById('clearFilters');

filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Toggle active class with animation
        if (tag.dataset.filter === 'all') {
            filterTags.forEach(t => {
                t.classList.remove('active');
                t.style.transform = 'scale(1)';
            });
            tag.classList.add('active');
            tag.style.transform = 'scale(1.05)';
        } else {
            document.querySelector('[data-filter="all"]').classList.remove('active');
            document.querySelector('[data-filter="all"]').style.transform = 'scale(1)';

            tag.classList.toggle('active');
            tag.style.transform = tag.classList.contains('active') ? 'scale(1.05)' : 'scale(1)';
        }

        // Get active filters
        const activeFilters = Array.from(document.querySelectorAll('.filter-tag.active'))
            .map(t => t.dataset.filter)
            .filter(f => f !== 'all');

        // Filter recipes with animation
        recipeCards.forEach((card, index) => {
            const cardCategories = card.dataset.category.split(' ');

            if (activeFilters.length === 0 ||
                activeFilters.some(filter => cardCategories.includes(filter))) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
                card.style.animationDelay = `${index * 0.1}s`;
            } else {
                card.style.animation = 'fadeIn 0.3s ease reverse forwards';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

clearFiltersBtn.addEventListener('click', () => {
    filterTags.forEach(tag => {
        tag.classList.remove('active');
        tag.style.transform = 'scale(1)';
    });
    document.querySelector('[data-filter="all"]').classList.add('active');
    document.querySelector('[data-filter="all"]').style.transform = 'scale(1.05)';

    recipeCards.forEach((card, index) => {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s ease forwards';
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Save Recipe Functionality with enhanced animation
const saveRecipeBtns = document.querySelectorAll('.save-recipe');

saveRecipeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('saved');
        btn.innerHTML = btn.classList.contains('saved') ?
            '<i class="fas fa-bookmark"></i>' :
            '<i class="far fa-bookmark"></i>';

        // Create a heart animation
        const heart = document.createElement('div');
        heart.innerHTML = btn.classList.contains('saved') ?
            '<i class="fas fa-heart" style="color: #ff4757;"></i>' :
            '<i class="far fa-heart" style="color: #ff4757;"></i>';
        heart.style.position = 'absolute';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.transform = 'translate(-50%, -50%) scale(0)';
        heart.style.transition = 'all 0.5s ease';
        btn.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = 'translate(-50%, -50%) scale(1.5)';
            heart.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            heart.remove();
        }, 500);

        // Show floating feedback
        const feedback = document.createElement('div');
        feedback.textContent = btn.classList.contains('saved') ?
            'Recipe saved to favorites!' : 'Removed from favorites';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.right = '20px';
        feedback.style.backgroundColor = btn.classList.contains('saved') ? '#4CAF50' : '#f44336';
        feedback.style.color = 'white';
        feedback.style.padding = '12px 24px';
        feedback.style.borderRadius = '4px';
        feedback.style.zIndex = '1000';
        feedback.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        feedback.style.transform = 'translateX(100%)';
        feedback.style.transition = 'transform 0.3s ease';
        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateX(0) scale(0.9)';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    });
});

// Recipe Rating System with enhanced animation
const ratingStars = document.querySelectorAll('.rating-star');

ratingStars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);

        // Update star display with bounce animation
        ratingStars.forEach((s, index) => {
            if (index < rating) {
                s.classList.remove('far');
                s.classList.add('fas');
                s.classList.add('active');
            } else {
                s.classList.remove('fas');
                s.classList.remove('active');
                s.classList.add('far');
            }

            // Add bounce effect to each star
            s.style.animation = 'none';
            void s.offsetWidth; // Trigger reflow
            s.style.animation = 'bounce 0.5s ease';
        });

        // In a real app, you would save this to your backend
        console.log(`User rated this recipe ${rating} stars`);

        // Show thank you message
        if (rating >= 4) {
            showThankYouMessage('Thank you for your positive rating! ❤️');
        } else if (rating >= 2) {
            showThankYouMessage('Thanks for your feedback! We\'ll try to improve.');
        } else {
            showThankYouMessage('We\'re sorry to hear that. Please tell us how we can do better.');
        }
    });
});

function showThankYouMessage(message) {
    const existingMessage = document.querySelector('.rating-thank-you');
    if (existingMessage) existingMessage.remove();

    const thankYou = document.createElement('div');
    thankYou.className = 'rating-thank-you';
    thankYou.textContent = message;
    thankYou.style.position = 'fixed';
    thankYou.style.bottom = '20px';
    thankYou.style.left = '50%';
    thankYou.style.transform = 'translateX(-50%)';
    thankYou.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    thankYou.style.color = 'white';
    thankYou.style.padding = '10px 20px';
    thankYou.style.borderRadius = '4px';
    thankYou.style.zIndex = '1000';
    thankYou.style.animation = 'fadeIn 0.3s ease forwards';
    document.body.appendChild(thankYou);

    setTimeout(() => {
        thankYou.style.animation = 'fadeIn 0.3s ease reverse forwards';
        setTimeout(() => thankYou.remove(), 300);
    }, 3000);
}

// Shopping List Checkboxes with animation
const shoppingCheckboxes = document.querySelectorAll('.shopping-checkbox');

shoppingCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const text = checkbox.nextElementSibling;
        if (checkbox.checked) {
            text.classList.add('completed');

            // Add strike-through animation
            text.style.animation = 'none';
            void text.offsetWidth; // Trigger reflow
            text.style.animation = 'strikeThrough 0.3s ease forwards';
        } else {
            text.classList.remove('completed');
            text.style.animation = 'none';
        }
    });
});

// Cooking Timer with enhanced UI
let timerInterval;
let seconds = 0;
const timerDisplay = document.querySelector('.timer-display');
const startTimerBtn = document.getElementById('startTimer');
const pauseTimerBtn = document.getElementById('pauseTimer');
const resetTimerBtn = document.getElementById('resetTimer');

function updateTimerDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    timerDisplay.textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // Change color based on time
    if (seconds > 1800) { // More than 30 minutes
        timerDisplay.style.color = '#f44336';
    } else if (seconds > 900) { // More than 15 minutes
        timerDisplay.style.color = '#FF9800';
    } else {
        timerDisplay.style.color = '#4CAF50';
    }
}

startTimerBtn.addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();

            // Play tick sound every second
            if (seconds % 1 === 0) {
                playTickSound();
            }

            // Flash the timer every minute
            if (seconds % 60 === 0) {
                timerDisplay.style.animation = 'none';
                void timerDisplay.offsetWidth; // Trigger reflow
                timerDisplay.style.animation = 'pulse 0.5s ease';
            }
        }, 1000);

        startTimerBtn.innerHTML = '<i class="fas fa-play"></i> Running';
        startTimerBtn.style.backgroundColor = '#4CAF50';
    }
});

pauseTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    startTimerBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    startTimerBtn.style.backgroundColor = 'var(--primary)';
});

resetTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    updateTimerDisplay();
    startTimerBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    startTimerBtn.style.backgroundColor = 'var(--primary)';
});

function playTickSound() {
    // In a real app, you would play an actual sound
    console.log('Tick');
}

// Video Modal with enhanced animation
const watchVideoBtn = document.getElementById('watchVideoBtn');
const videoModal = document.getElementById('videoModal');
const closeModalBtn = document.getElementById('closeModal');

watchVideoBtn.addEventListener('click', () => {
    videoModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

closeModalBtn.addEventListener('click', () => {
    videoModal.classList.remove('show');
    document.body.style.overflow = ''; // Re-enable scrolling
});

window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Print Recipe with loading indicator
const printRecipeBtn = document.getElementById('printRecipeBtn');

printRecipeBtn.addEventListener('click', () => {
    // Show loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.position = 'fixed';
    spinner.style.top = '50%';
    spinner.style.left = '50%';
    spinner.style.transform = 'translate(-50%, -50%)';
    spinner.style.zIndex = '1001';
    document.body.appendChild(spinner);

    // Simulate loading (in a real app, this would be the actual print preparation)
    setTimeout(() => {
        spinner.remove();
        window.print();
    }, 1000);
});

// Share Recipe with more options
const shareRecipeBtn = document.getElementById('shareRecipeBtn');

shareRecipeBtn.addEventListener('click', async() => {
    try {
        await navigator.share({
            title: 'Creamy Garlic Pasta Recipe',
            text: 'Check out this delicious creamy garlic pasta recipe from Mindful Eats!',
            url: window.location.href + '#pasta'
        });
    } catch (err) {
        console.log('Error sharing:', err);
        // Fallback for browsers that don't support Web Share API
        showShareOptions();
    }
});

function showShareOptions() {
    const shareOptions = document.createElement('div');
    shareOptions.className = 'share-options';
    shareOptions.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; justify-content: center; align-items: center;">
                    <div style="background: white; padding: 20px; border-radius: 8px; max-width: 400px; width: 90%;">
                        <h3 style="margin-bottom: 15px;">Share Recipe</h3>
                        <p style="margin-bottom: 20px;">Copy the link below or share via:</p>
                        <input type="text" value="${window.location.href + '#pasta'}" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px;" readonly>
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href + '#pasta')}" target="_blank" style="flex: 1; background: #3b5998; color: white; text-align: center; padding: 10px; border-radius: 4px;">
                                <i class="fab fa-facebook-f"></i> Facebook
                            </a>
                            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href + '#pasta')}&text=Check out this delicious recipe from Mindful Eats!" target="_blank" style="flex: 1; background: #1da1f2; color: white; text-align: center; padding: 10px; border-radius: 4px;">
                                <i class="fab fa-twitter"></i> Twitter
                            </a>
                        </div>
                        <button id="closeShareOptions" style="width: 100%; padding: 10px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
                    </div>
                </div>
            `;

    document.body.appendChild(shareOptions);

    document.getElementById('closeShareOptions').addEventListener('click', () => {
        shareOptions.remove();
    });
}

// Newsletter form with validation and feedback
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector('.newsletter-input');
    const submitBtn = newsletterForm.querySelector('.newsletter-btn');

    // Validate email
    if (!emailInput.value || !emailInput.value.includes('@')) {
        emailInput.style.border = '2px solid #f44336';
        emailInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            emailInput.style.border = 'none';
            emailInput.style.animation = '';
        }, 500);
        return;
    }

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = '<i class="fas fa-check-circle" style="color: #4CAF50; margin-right: 10px;"></i> Thank you for subscribing!';
        successMsg.style.position = 'fixed';
        successMsg.style.bottom = '20px';
        successMsg.style.left = '50%';
        successMsg.style.transform = 'translateX(-50%)';
        successMsg.style.backgroundColor = 'white';
        successMsg.style.padding = '15px 25px';
        successMsg.style.borderRadius = '4px';
        successMsg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        successMsg.style.zIndex = '1000';
        successMsg.style.animation = 'fadeInUp 0.3s ease forwards';
        document.body.appendChild(successMsg);

        // Reset form
        submitBtn.innerHTML = 'Subscribe';
        submitBtn.disabled = false;
        emailInput.value = '';

        // Remove message after 3 seconds
        setTimeout(() => {
            successMsg.style.animation = 'fadeInUp 0.3s ease reverse forwards';
            setTimeout(() => successMsg.remove(), 300);
        }, 3000);
    }, 1500);
});

// Explore button animation
const exploreBtn = document.getElementById('exploreBtn');

exploreBtn.addEventListener('mouseenter', () => {
    exploreBtn.style.animation = 'pulse 1s infinite';
});

exploreBtn.addEventListener('mouseleave', () => {
    exploreBtn.style.animation = '';
});

// Animate recipe cards on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.recipe-card');
    const windowHeight = window.innerHeight;

    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = windowHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.classList.add('animate');
            element.style.animationDelay = `${index * 0.1}s`;
        }
    });
}

// Run on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Initialize recipe cards animation
setTimeout(() => {
    animateOnScroll();
}, 500);