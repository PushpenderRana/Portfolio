// script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Effect on Home Page ---
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const textArray = ["Backend Developer", "Python Enthusiast", "SQL Expert"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000; // Delay between current and next text
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }
        
        // Start the effect if the element exists
        setTimeout(type, newTextDelay + 250);
    }


    // --- Active Nav Link ---
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPath = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        // Handle home page case where path is empty or index.html/home.html
        if (currentPath === '' || currentPath === 'home.html' || currentPath === 'index.html') {
            if (link.getAttribute('href') === 'home.html') {
                link.classList.add('active');
            }
        } else if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar ul');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.navbar ul a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));


// --- Contact Form Submission ---
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // 1. Stop the page from reloading
    e.preventDefault();

    // Find the submit button inside your form
    const submitButton = contactForm.querySelector('button[type="submit"]');

    // 2. THIS IS THE FIX: Disable the button immediately
    // This makes it impossible to click a second time.
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...'; // Optional: Change button text

    const formContainer = document.querySelector('.contact-form');
    const formData = new FormData(contactForm);

    // 3. Send the data to the server
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRFToken': formData.get('csrfmiddlewaretoken')
      }
    })
    .then(response => {
      if (response.ok) {
        // Show the success message
        formContainer.innerHTML = '<h3>Thank you for your message!</h3><p>I will get back to you shortly.</p>';
      } else {
        // If there's an error, show a message and re-enable the button
        formContainer.innerHTML = '<h3>Oops! Something went wrong.</h3><p>Please try again later.</p>';
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    })
    .catch(error => {
      // Handle network errors and re-enable the button
      console.error('Error:', error);
      formContainer.innerHTML = '<h3>Network Error</h3><p>Could not submit the form.</p>';
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    });
  });
    }})