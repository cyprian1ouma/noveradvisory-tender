// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for service navigation
    document.querySelectorAll('.service-nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active state
                document.querySelectorAll('.service-nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // View Details Button Click
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            openServiceModal(service);
        });
    });

    // Function to open service modal
    function openServiceModal(service) {
        // Map service types to modal IDs
        const modalMap = {
            'bid-compilation': 'bidCompilationModal',
            'bill-quantities': 'billQuantitiesModal',
            'quotation-supply': 'quotationSupplyModal',
            'technical-proposal': 'technicalProposalModal',
            'financial-statements': 'financialStatementsModal',
            'tender-profile': 'tenderProfileModal',
            'business-name': 'businessNameModal',
            'private-limited': 'privateLimitedModal',
            'ngo-registration': 'ngoRegistrationModal',
            'ifmis-upload': 'ifmisUploadModal',
            'ifmis-recovery': 'ifmisRecoveryModal',
            'company-stamps': 'companyStampsModal',
            'company-seals': 'companySealsModal'
        };

        const modalId = modalMap[service];
        if (modalId) {
            const modal = new bootstrap.Modal(document.getElementById(modalId));
            modal.show();
        } else {
            // Fallback to generic modal
            alert('Service details will be displayed here. Modal for ' + service + ' is under development.');
        }
    }

    // Intersection Observer for scroll animations
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

    // Observe service cards and tables
    document.querySelectorAll('.service-card, .service-table').forEach(element => {
        observer.observe(element);
    });

    // Update active nav based on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.service-category-section');
        const navItems = document.querySelectorAll('.service-nav-item');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === currentSection) {
                item.classList.add('active');
            }
        });
    });

    // Add some decorative elements to the page
    addDecorativeElements();
});

// Function to add decorative elements
function addDecorativeElements() {
    const sections = document.querySelectorAll('.service-category-section');
    
    sections.forEach((section, index) => {
        // Add different background patterns based on section index
        if (index % 2 === 0) {
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            
            const pattern = document.createElement('div');
            pattern.className = 'section-pattern';
            pattern.innerHTML = '📋📄💼📊🏗️';
            pattern.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                font-size: 8rem;
                opacity: 0.03;
                z-index: 0;
                pointer-events: none;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: center;
            `;
            section.appendChild(pattern);
        }
    });
}

