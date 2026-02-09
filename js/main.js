const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// document.getElementById("year").textContent = new Date().getFullYear();


// Test if Bootstrap is loaded
console.log('Bootstrap loaded:', typeof bootstrap !== 'undefined');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Debug: Check if button exists
    const supportButtons = document.querySelectorAll('[data-bs-target="#supportModal"], .btn[href="#"]');
    console.log('Support buttons found:', supportButtons.length);
    
    // Debug: Check if modal exists
    const supportModal = document.getElementById('supportModal');
    console.log('Support modal element:', supportModal);
    
    // Add manual click handler for testing
    supportButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Support button clicked manually');
            
            if (supportModal) {
                console.log('Modal found, attempting to show...');
                
                // Check if Bootstrap Modal class exists
                if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                    console.log('Bootstrap Modal class available');
                    const modal = new bootstrap.Modal(supportModal);
                    modal.show();
                    console.log('Modal shown via Bootstrap');
                } else {
                    console.log('Bootstrap Modal class NOT available');
                    // Fallback: Show modal manually
                    supportModal.classList.add('show');
                    supportModal.style.display = 'block';
                    supportModal.setAttribute('aria-modal', 'true');
                    supportModal.removeAttribute('aria-hidden');
                    
                    // Add backdrop
                    const backdrop = document.createElement('div');
                    backdrop.className = 'modal-backdrop fade show';
                    document.body.appendChild(backdrop);
                }
            } else {
                console.log('Modal NOT found');
            }
        });
    });
    
    // Initialize Get Support Modal
    initSupportModal();
});

function initSupportModal() {
    console.log('Initializing support modal...');
    
    const modal = document.getElementById('supportModal');
    if (!modal) {
        console.log('Support modal not found for initialization');
        return;
    }
    
    console.log('Support modal found for initialization');
    
    const quickForm = document.getElementById('quickContactForm');
    const quickSuccess = document.getElementById('quickSuccess');
    
    // Quick Contact Form Submission
    if (quickForm) {
        console.log('Quick contact form found');
        quickForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const name = document.getElementById('quickName').value.trim();
            const phone = document.getElementById('quickPhone').value.trim();
            
            if (!name || !phone) {
                alert('Please fill in required fields (Name and Phone)');
                return;
            }
            
            // Get form data
            const formData = {
                name: name,
                phone: phone,
                service: document.getElementById('quickService').value,
                message: document.getElementById('quickMessage').value,
                whatsapp: document.getElementById('quickWhatsApp').checked
            };
            
            // Show loading state
            const submitBtn = quickForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                quickForm.reset();
                
                // Show success message
                if (quickSuccess) {
                    quickSuccess.classList.remove('d-none');
                }
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    if (quickSuccess) {
                        quickSuccess.classList.add('d-none');
                    }
                }, 3000);
                
                // Log form data
                console.log('Quick Support Request:', formData);
                
            }, 1000);
        });
    }
    
    // Book Appointment Link
    const appointmentLinks = document.querySelectorAll('.appointment-link');
    appointmentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close modal
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
            
            // Redirect to contact page with appointment focus
            setTimeout(() => {
                window.location.href = 'contact.html#contactForm';
            }, 300);
        });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('quickPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (!value.startsWith('254')) {
                    value = '254' + value;
                }
                
                // Format: +254 XXX XXX XXX
                let formatted = '+254 ';
                if (value.length > 3) {
                    formatted += value.substring(3, 6);
                }
                if (value.length > 6) {
                    formatted += ' ' + value.substring(6, 9);
                }
                if (value.length > 9) {
                    formatted += ' ' + value.substring(9, 12);
                }
                
                e.target.value = formatted.trim();
            }
        });
    }
}

// Function to send data to server (for future implementation)
function sendToServer(formData) {
    // This would be your actual API call
    /*
    fetch('/api/support-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */
}