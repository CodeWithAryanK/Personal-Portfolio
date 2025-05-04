// Contact form submission handler for Formspree
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Disable submit button and show loading state
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  submitBtn.textContent = 'SENDING...';
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      formStatus.textContent = 'Message sent successfully!';
      formStatus.className = 'form-status success';
      form.reset();
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    formStatus.textContent = 'Oops! There was a problem sending your message.';
    formStatus.className = 'form-status error';
  } finally {
    // Re-enable submit button and remove loading state
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'SEND MESSAGE';
  }
});

// Sticky Navbar and Section Observer
const nav = document.querySelector('.sticky-nav');
const heroSection = document.querySelector('.main-center');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const aboutLink = document.querySelector('.nav-link[href="#"]');

// Sticky Navbar Scroll Handler
window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
});

// Section Observer Options
const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
};

// Main Section Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});

// Hero Section Observer
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      aboutLink.classList.add('active');
    }
  });
}, { threshold: 0.5 });

heroObserver.observe(heroSection);
