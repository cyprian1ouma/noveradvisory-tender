// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Map
    initMap();
    
    // Form Validation
    initContactForm();
    
    // FAQ Toggle
    initFAQ();
    
    // Smooth Scroll for Map Link
    document.querySelectorAll('a[href="#map-section"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const mapSection = document.getElementById('map-section');
            if (mapSection) {
                mapSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Initialize Map
function initMap() {
    // Coordinates for Norwich Union Building, Nairobi (approximate)
    const nairobiCoords = [-1.286389, 36.817223]; // Nairobi coordinates
    const norwichUnionCoords = [-1.2833, 36.8167]; // Approximate location
    
    // Create map
    const map = L.map('map').setView(norwichUnionCoords, 16);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Custom icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin"><i class="fas fa-map-marker-alt"></i></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });
    
    // Add marker
    const marker = L.marker(norwichUnionCoords, { icon: customIcon }).addTo(map);
    
    // Add popup
    marker.bindPopup(`
        <div class="map-popup">
            <h5><i class="fas fa-building text-gold me-2"></i>Norwich Union Building</h5>
            <p class="mb-2">Opposite Former Hilton Hotel</p>
            <p class="mb-2">Nairobi, Kenya</p>
            <div class="mt-2">
                <a href="https://maps.google.com/?q=Norwich+Union+Building+Nairobi" 
                   target="_blank" class="btn btn-gold btn-sm">
                    <i class="fas fa-directions me-1"></i>Directions
                </a>
            </div>
        </div>
    `).openPopup();
    
    // Add custom marker styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-marker {
            background: none;
            border: none;
        }
        .marker-pin {
            width: 40px;
            height: 40px;
            background: var(--gold);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .marker-pin i {
            color: white;
            font-size: 1.5rem;
            transform: rotate(45deg);
        }
        .marker-pin::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: var(--gold-dark);
            border-radius: 50%;
            bottom: -10px;
            left: 10px;
        }
        .map-popup .leaflet-popup-content-wrapper {
            border-radius: 10px;
            padding: 10px;
        }
        .map-popup .leaflet-popup-content {
            margin: 0;
            padding: 10px;
        }
        .map-popup h5 {
            color: var(--blue);
            margin-bottom: 10px;
        }
        .map-popup p {
            color: var(--light-text);
            margin: 0;
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
}

// Initialize Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Show success message
                successMessage.classList.remove('d-none');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('d-none');
                }, 5000);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Log form data (in real app, send to server)
                console.log('Form submitted:', data);
                
            }, 1500);
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Validate single field
function validateField(field) {
    const value = field.value.trim();
    const feedback = field.parentElement.querySelector('.form-feedback');
    
    if (!feedback) return true;
    
    if (!value) {
        field.classList.add('is-invalid');
        feedback.textContent = 'This field is required';
        feedback.style.display = 'block';
        feedback.style.color = '#dc3545';
        return false;
    }
    
    // Email validation
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            feedback.textContent = 'Please enter a valid email address';
            feedback.style.display = 'block';
            feedback.style.color = '#dc3545';
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel') {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('is-invalid');
            feedback.textContent = 'Please enter a valid phone number';
            feedback.style.display = 'block';
            feedback.style.color = '#dc3545';
            return false;
        }
    }
    
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    feedback.style.display = 'none';
    return true;
}

// Clear field error
function clearFieldError(field) {
    const feedback = field.parentElement.querySelector('.form-feedback');
    if (feedback) {
        field.classList.remove('is-invalid');
        feedback.style.display = 'none';
    }
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Initialize FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const answer = item.querySelector('.faq-answer');
        
        toggle.addEventListener('click', function() {
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            document.querySelectorAll('.faq-toggle').forEach(tog => {
                tog.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                answer.classList.add('active');
                toggle.classList.add('active');
            }
        });
    });
}

// Add smooth scrolling for contact links
document.querySelectorAll('.contact-card-link').forEach(link => {
    if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});