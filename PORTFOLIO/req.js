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
