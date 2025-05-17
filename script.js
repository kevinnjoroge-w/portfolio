// Smooth scrolling for navigation
document.querySelector('a[href^="#"]').forEach(anchor=> {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    })
})

// Toggle navigation for mobile
const contactForm = document.querySelector('form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Here you would typically send the form data to your server
                // For this example, we'll just show an alert
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            });
        }
