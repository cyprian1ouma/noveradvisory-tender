// ===== Careers Modal Functionality =====

document.addEventListener('DOMContentLoaded', function() {
    
    // Apply button functionality
    const applyButtons = document.querySelectorAll('.apply-btn');
    const applicationForm = document.getElementById('applicationForm');
    const selectedJobTitle = document.getElementById('selectedJobTitle');
    const closeFormBtn = document.querySelector('.close-form');
    
    // Show application form when Apply Now is clicked
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.getAttribute('data-job');
            selectedJobTitle.textContent = jobTitle;
            applicationForm.style.display = 'block';
            
            // Scroll to form
            applicationForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight the selected job
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('border-gold');
            });
            this.closest('.accordion-item')?.classList.add('border-gold');
        });
    });
    
    // Close form button
    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', function() {
            applicationForm.style.display = 'none';
        });
    }
    
    // View All Jobs button
    const viewAllJobsBtn = document.getElementById('viewAllJobs');
    if (viewAllJobsBtn) {
        viewAllJobsBtn.addEventListener('click', function() {
            // Close any open accordion items
            document.querySelectorAll('.accordion-collapse.show').forEach(item => {
                bootstrap.Collapse.getInstance(item)?.hide();
            });
            
            // Hide application form
            applicationForm.style.display = 'none';
            
            // Scroll to top of modal
            document.querySelector('.modal-body').scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // File upload functionality
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx';
    fileInput.style.display = 'none';
    
    if (uploadArea) {
        document.body.appendChild(fileInput);
        
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--gold)';
            this.style.background = 'rgba(212, 175, 55, 0.02)';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            this.style.borderColor = 'rgba(212, 175, 55, 0.3)';
            this.style.background = 'linear-gradient(135deg, #f8fafc, #ffffff)';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(212, 175, 55, 0.3)';
            this.style.background = 'linear-gradient(135deg, #f8fafc, #ffffff)';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
        
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files[0]);
            }
        });
        
        function handleFileUpload(file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload PDF or Word documents only');
                return;
            }
            
            // Update upload area to show selected file
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle fa-3x text-gold mb-3"></i>
                <h6 class="fw-semibold">${file.name}</h6>
                <p class="small text-muted mb-0">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button type="button" class="btn btn-link text-gold mt-2 change-file">
                    <i class="fas fa-sync-alt me-1"></i>Change File
                </button>
            `;
            
            // Add change file functionality
            const changeBtn = uploadArea.querySelector('.change-file');
            if (changeBtn) {
                changeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    resetUploadArea();
                });
            }
        }
        
        function resetUploadArea() {
            uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt fa-3x text-gold mb-3"></i>
                <h6 class="fw-semibold">Drag and drop your file here</h6>
                <p class="small text-muted mb-3">or</p>
                <button type="button" class="btn btn-outline-gold btn-sm px-4 rounded-pill">
                    <i class="fas fa-folder-open me-2"></i>Browse Files
                </button>
                <p class="small text-muted mt-3 mb-0">Supported: PDF, DOC, DOCX (Max 5MB)</p>
            `;
            fileInput.value = '';
        }
    }
    
    // Form submission
    const jobForm = document.getElementById('jobApplicationForm');
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual form submission)
            setTimeout(() => {
                // Show success message
                const formContainer = document.querySelector('.application-form');
                formContainer.innerHTML = `
                    <div class="text-center py-5 application-success">
                        <div class="success-icon mb-4">
                            <i class="fas fa-check-circle fa-5x text-gold"></i>
                        </div>
                        <h3 class="h4 fw-bold text-blue mb-3">Application Submitted!</h3>
                        <p class="text-muted mb-4">Thank you for applying. We'll review your application and get back to you within 48 hours.</p>
                        <button type="button" class="btn btn-gold px-4 rounded-pill close-success">
                            <i class="fas fa-times me-2"></i>Close
                        </button>
                    </div>
                `;
                
                // Close button for success message
                const closeSuccess = formContainer.querySelector('.close-success');
                if (closeSuccess) {
                    closeSuccess.addEventListener('click', function() {
                        applicationForm.style.display = 'none';
                        // Reset form for next time
                        setTimeout(() => {
                            location.reload(); // Simple reload, or you can rebuild the form
                        }, 300);
                    });
                }
            }, 2000);
        });
    }
    
    // Add border-gold class CSS
    const style = document.createElement('style');
    style.textContent = `
        .border-gold {
            border: 2px solid var(--gold) !important;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
        }
    `;
    document.head.appendChild(style);
});