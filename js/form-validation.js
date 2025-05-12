// Contact form validation and submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim()
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
        alert('Please fill in all fields');
        return;
    }

    if (!validateEmail(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // In a real implementation, you would send this data to your server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! We will contact you soon.');
    contactForm.reset();
    contactModal.style.display = 'none';
});

// Email validation helper function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}