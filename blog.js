 // Mobile Menu Toggle
 const hamburger = document.getElementById('hamburger');
 const navLinks = document.querySelector('.nav-links');

 hamburger.addEventListener('click', () => {
     navLinks.classList.toggle('active');
 });

 // Close mobile menu when clicking on a link
 document.querySelectorAll('.nav-links a').forEach(link => {
     link.addEventListener('click', () => {
         navLinks.classList.remove('active');
     });
 });

 // Dark/Light Mode Toggle
 const themeToggle = document.getElementById('themeToggle');
 const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

 // Check for saved theme preference or use the system preference
 const currentTheme = localStorage.getItem('theme');
 if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
     document.body.classList.add('dark-mode');
 }

 themeToggle.addEventListener('click', () => {
     document.body.classList.toggle('dark-mode');
     const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
     localStorage.setItem('theme', theme);
 });

 // Reading Progress Bar
 const readingProgress = document.getElementById('readingProgress');
 window.addEventListener('scroll', () => {
     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
     const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
     const scrollPercentage = (scrollTop / scrollHeight) * 100;
     readingProgress.style.width = scrollPercentage + '%';
 });

 // Back to Top Button
 const backToTop = document.getElementById('backToTop');
 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 300) {
         backToTop.classList.add('visible');
     } else {
         backToTop.classList.remove('visible');
     }
 });

 backToTop.addEventListener('click', (e) => {
     e.preventDefault();
     window.scrollTo({
         top: 0,
         behavior: 'smooth'
     });
 });

 // Carousel Navigation
 const carousel = document.getElementById('featuredCarousel');
 const carouselNav = document.getElementById('carouselNav');
 const carouselItems = document.querySelectorAll('.carousel-item');

 // Create navigation dots
 carouselItems.forEach((_, index) => {
     const dot = document.createElement('div');
     dot.classList.add('carousel-dot');
     if (index === 0) dot.classList.add('active');
     dot.addEventListener('click', () => {
         carousel.scrollTo({
             left: carouselItems[index].offsetLeft - carousel.offsetLeft,
             behavior: 'smooth'
         });
     });
     carouselNav.appendChild(dot);
 });

 // Update active dot on scroll
 carousel.addEventListener('scroll', () => {
     const scrollPosition = carousel.scrollLeft + carousel.offsetWidth / 2;
     carouselItems.forEach((item, index) => {
         const dot = carouselNav.children[index];
         if (item.offsetLeft <= scrollPosition && item.offsetLeft + item.offsetWidth > scrollPosition) {
             dot.classList.add('active');
         } else {
             dot.classList.remove('active');
         }
     });
 });

 // Search Functionality
 const searchInput = document.getElementById('searchInput');
 const noResults = document.getElementById('noResults');
 const postCards = document.querySelectorAll('.post-card');

 searchInput.addEventListener('input', () => {
     const searchTerm = searchInput.value.toLowerCase();
     let hasResults = false;

     postCards.forEach(card => {
         const title = card.getAttribute('data-title');
         const content = card.getAttribute('data-content');

         if (title.includes(searchTerm) || content.includes(searchTerm)) {
             card.style.display = 'block';
             hasResults = true;
         } else {
             card.style.display = 'none';
         }
     });

     noResults.style.display = hasResults ? 'none' : 'block';
 });

 // Like Button Functionality
 const likeButtons = document.querySelectorAll('.like-btn');

 likeButtons.forEach(button => {
     const postId = button.getAttribute('data-post');
     const likeCount = button.querySelector('.like-count');

     // Check if post is liked in localStorage
     if (localStorage.getItem(`post_${postId}_liked`)) {
         button.classList.add('liked');
     }

     button.addEventListener('click', () => {
         const isLiked = button.classList.contains('liked');
         let count = parseInt(likeCount.textContent);

         if (isLiked) {
             button.classList.remove('liked');
             count--;
             localStorage.removeItem(`post_${postId}_liked`);
         } else {
             button.classList.add('liked');
             count++;
             localStorage.setItem(`post_${postId}_liked`, 'true');
         }

         likeCount.textContent = count;
     });
 });

 // Newsletter Form Submission
 const newsletterForm = document.getElementById('newsletterForm');
 const newsletterMessage = document.getElementById('newsletterMessage');

 newsletterForm.addEventListener('submit', (e) => {
     e.preventDefault();
     const email = document.getElementById('newsletterEmail').value;

     // Simple validation
     if (email.includes('@') && email.includes('.')) {
         newsletterMessage.textContent = 'Thank you for subscribing!';
         newsletterMessage.classList.remove('error');
         newsletterMessage.classList.add('success');
         newsletterForm.reset();

         // In a real app, you would send this to your backend
         console.log('Subscribed email:', email);
     } else {
         newsletterMessage.textContent = 'Please enter a valid email address';
         newsletterMessage.classList.remove('success');
         newsletterMessage.classList.add('error');
     }
 });

 // Comment Form Submission
 const commentForm = document.getElementById('commentForm');
 const commentsList = document.getElementById('commentsList');

 // Sample comments data
 const sampleComments = [{
     name: "Alex Johnson",
     date: "June 10, 2023",
     text: "Great post! I've been looking for ways to incorporate more nature into my life and this was really helpful."
 }, {
     name: "Sam Wilson",
     date: "June 8, 2023",
     text: "I completely agree with your points about technology. It's amazing how fast things are changing!"
 }];

 // Display sample comments
 function displayComments() {
     commentsList.innerHTML = '';

     sampleComments.forEach(comment => {
         const commentElement = document.createElement('div');
         commentElement.className = 'comment';
         commentElement.innerHTML = `
             <div class="comment-avatar">
                 <img src="image/profile-11.jpg" alt="${comment.name}">
         
             </div>
             <div class="comment-body">
                 <h4 class="comment-author">${comment.name}</h4>
                 <div class="comment-meta">${comment.date}</div>
                 <p class="comment-text">${comment.text}</p>
                 <a href="#" class="comment-reply">Reply</a>
             </div>
         `;
         commentsList.appendChild(commentElement);
     });
 }

 // Handle form submission
 commentForm.addEventListener('submit', function(e) {
     e.preventDefault();

     const name = document.getElementById('name').value;
     const commentText = document.getElementById('comment').value;
     const date = new Date().toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
     });

     // Add new comment to the array
     sampleComments.unshift({
         name: name,
         date: date,
         text: commentText
     });

     // Update comments display
     displayComments();

     // Reset form
     commentForm.reset();

     // Show success message
     alert('Thank you for your comment!');
 });

 // Initialize comments on page load
 document.addEventListener('DOMContentLoaded', displayComments);

 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();

         const targetId = this.getAttribute('href');
         if (targetId === '#') return;

         const targetElement = document.querySelector(targetId);
         if (targetElement) {
             window.scrollTo({
                 top: targetElement.offsetTop - 80,
                 behavior: 'smooth'
             });
         }
     });
 });

 // Animation on scroll
 function animateOnScroll() {
     const elements = document.querySelectorAll('.animated');

     elements.forEach(element => {
         const elementPosition = element.getBoundingClientRect().top;
         const screenPosition = window.innerHeight / 1.2;

         if (elementPosition < screenPosition) {
             element.style.opacity = '1';
             element.style.transform = 'translateY(0)';
         }
     });
 }

 // Run on load and scroll
 window.addEventListener('load', animateOnScroll);
 window.addEventListener('scroll', animateOnScroll);




 // With this:
 document.querySelectorAll('.read-more').forEach(button => {
     button.addEventListener('click', (e) => {
         e.preventDefault(); // Prevent default anchor behavior
         window.location.href = 'recipes.html';
     });
 });