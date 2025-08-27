// Enhanced main.js with complete phone validation and animations for MyEzz
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== IMPROVED MOBILE MENU FUNCTIONALITY =====
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.navbar .links');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isOpen = navbar.classList.contains('mobile-menu-open');
            if (isOpen) {
                // Closing animation
                navbar.classList.remove('mobile-menu-open');
                mobileMenuButton.classList.remove('menu-open');
            } else {
                // Opening animation
                navbar.classList.add('mobile-menu-open');
                mobileMenuButton.classList.add('menu-open');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navbar.classList.remove('mobile-menu-open');
                mobileMenuButton.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on a link
        if (navLinks) {
            navLinks.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') {
                    navbar.classList.remove('mobile-menu-open');
                    mobileMenuButton.classList.remove('menu-open');
                }
            });
        }
    }

    // ===== PAGE HIGHLIGHTING =====
    // This robust logic handles local files, Netlify's "pretty URLs" (e.g., /about/), and the root path.
    const currentPath = window.location.pathname;

    const allNavLinks = document.querySelectorAll('.navbar .links a');
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        // Get the base name of the link, e.g., 'about.html' -> 'about'
        const linkPageNameRaw = linkHref.split('/').pop().replace('.html', '');
        const finalLinkPageName = linkPageNameRaw === '' ? 'index' : linkPageNameRaw;

        // Get the base name of the current path, e.g., '/about/' -> 'about'
        const cleanPath = (currentPath.length > 1 && currentPath.endsWith('/')) ? currentPath.slice(0, -1) : currentPath;
        const currentPageNameRaw = cleanPath.split('/').pop().replace('.html', '');

        // Treat the root path ('') as 'index' for comparison
        const finalCurrentPageName = currentPageNameRaw === '' ? 'index' : currentPageNameRaw;

        if (finalLinkPageName === finalCurrentPageName) {
            setTimeout(() => link.classList.add('active'), 10);
        } else {
            link.classList.remove('active');
        }
    });

    // ===== ENHANCED PHONE INPUT VALIDATION (EXACTLY 10 DIGITS) =====
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(phoneInput => {
        // Set attributes for 10-digit validation
        phoneInput.setAttribute('maxlength', '10');
        phoneInput.setAttribute('pattern', '\\d{10}');
        phoneInput.setAttribute('title', 'Please enter exactly 10 digits');
        phoneInput.setAttribute('placeholder', '1234567890');
        
        // Real-time input validation
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value;
            
            // Remove all non-digit characters
            let cleanedValue = value.replace(/\D/g, '');
            
            // Limit to maximum 10 digits
            if (cleanedValue.length > 10) {
                cleanedValue = cleanedValue.slice(0, 10);
            }
            
            // Update the input value
            e.target.value = cleanedValue;
            
            // Visual feedback for length
            e.target.classList.remove('valid', 'incomplete');
            if (cleanedValue.length === 10) {
                e.target.classList.add('valid');
            } else if (cleanedValue.length > 0) {
                e.target.classList.add('incomplete');
            } 
        });

        // Handle paste events
        phoneInput.addEventListener('paste', function(e) {
            setTimeout(() => {
                let value = e.target.value;
                let cleanedValue = value.replace(/\D/g, '');
                if (cleanedValue.length > 10) {
                    cleanedValue = cleanedValue.slice(0, 10);
                }
                e.target.value = cleanedValue;
            }, 0);
        });
        
        // Prevent non-numeric key presses
        phoneInput.addEventListener('keypress', function(e) {
            const isControlKey = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key);
            const isCtrlCommand = e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase());
            const isNumeric = /^\d$/.test(e.key);

            if (isControlKey || isCtrlCommand) {
                return; // Allow control keys and shortcuts
            }

            if (!isNumeric) {
                e.preventDefault();
            }
        });

        // Handle country code prefix visibility
        const wrapper = phoneInput.closest('.phone-input-wrapper');
        if (wrapper) {
            const prefix = wrapper.querySelector('.country-prefix');
            const updatePrefixVisibility = () => prefix.style.opacity = phoneInput.value.length > 0 ? '0' : '1';
            phoneInput.addEventListener('input', updatePrefixVisibility);
            phoneInput.addEventListener('focus', updatePrefixVisibility);
            phoneInput.addEventListener('blur', updatePrefixVisibility);
            updatePrefixVisibility(); // Initial check
        }
    });

// ===== ENHANCED FORM HANDLING WITH FORMSPREE =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    // Add validation listeners
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        if (input.type !== 'tel') {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                clearFieldError(this);
            });
        }
    });

    // ===== FORMSPREE FORM SUBMISSION =====
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Remove existing messages
        const existingSuccess = this.querySelector('.success-message');
        const existingError = this.querySelector('.form-error-message');
        if (existingSuccess) existingSuccess.remove();
        if (existingError) existingError.remove();

        // Validate all fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // ===== SUBMIT BUTTON ANIMATION =====
            const submitButton = this.querySelector('button[type="submit"]');
            showSubmitAnimation(submitButton);

            // ===== ACTUAL FORMSPREE SUBMISSION =====
            const formData = new FormData(this);
            
            fetch('https://formspree.io/f/xblyzarl', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                hideSubmitAnimation(submitButton);
                if (response.ok) {
                    showSuccessMessage(this);
                    animateFormReset(this, inputs);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                hideSubmitAnimation(submitButton);
                showErrorMessage(this, 'Sorry, there was a problem sending your message. Please try again or contact us directly via WhatsApp.');
            });

        } else {
            // ===== ERROR SHAKE ANIMATION =====
            this.classList.add('shake-error');
            setTimeout(() => {
                this.classList.remove('shake-error');
            }, 600);

            const firstError = this.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                setTimeout(() => firstError.focus(), 300);
            }
        }
    });
}

function showErrorMessage(form, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message animated';
    errorMessage.innerHTML = `
        <div class="error-content">
            <div class="error-icon">✕</div>
            <div class="error-text">
                <strong>Message Failed to Send</strong>
                <p>${message}</p>
            </div>
        </div>
    `;
    
    form.appendChild(errorMessage);
    
    setTimeout(() => {
        errorMessage.classList.add('show');
    }, 100);

    setTimeout(() => {
        errorMessage.classList.add('fade-out');
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.remove();
            }
        }, 500);
    }, 5000);
}

    // ===== ANIMATED SUBMIT BUTTON FUNCTIONS =====
    function showSubmitAnimation(button) {
        button.disabled = true;
        button.classList.add('submitting');
        const originalText = button.innerHTML;
        button.dataset.originalText = originalText;
        button.innerHTML = `
            <span class="loading-spinner"></span>
            Sending Message...
        `;
    }

    function hideSubmitAnimation(button) {
        button.disabled = false;
        button.classList.remove('submitting');
        button.innerHTML = button.dataset.originalText || 'Send Message';
    }

    // ===== ANIMATED SUCCESS MESSAGE =====
    function showSuccessMessage(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message animated';
        successMessage.innerHTML = `
            <div class="success-stars">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
            </div>
            <div class="success-content">
                <div class="success-icon">✓</div>
                <div class="success-text">
                    <strong>Message Sent Successfully!</strong>
                    <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
            </div>
        `;
        
        form.appendChild(successMessage);
        
        // Trigger animation
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 100);

        // Auto hide after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('fade-out');
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.remove();
                }
            }, 500);
        }, 5000);
    }

    // ===== ANIMATED FORM RESET =====
    function animateFormReset(form, inputs) {
        setTimeout(() => {
            inputs.forEach((input, index) => {
                setTimeout(() => {
                    input.value = '';
                    input.classList.remove('error');
                    clearFieldError(input);
                    // Add subtle animation to each field
                    input.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        input.style.transform = 'scale(1)';
                    }, 150);
                }, index * 100); // Stagger the reset animation
            });
        }, 1000);
    }

    // ===== FIELD VALIDATION FUNCTIONS =====
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        clearFieldError(field);
        field.classList.remove('error');

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${getFieldLabel(field)} is required`;
            isValid = false;
        }
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        // Phone validation - exactly 10 digits
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(value)) {
                if (value.length < 10) {
                    errorMessage = 'Phone number must be exactly 10 digits';
                } else {
                    errorMessage = 'Please enter exactly 10 digits';
                }
                isValid = false;
            }
        }
        // Name validation
        else if ((fieldName === 'name' || fieldName === 'fullName') && value) {
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            }
        }
        // Message validation
        else if ((fieldName === 'message' || field.tagName.toLowerCase() === 'textarea') && value) {
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters long';
                isValid = false;
            }
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
            field.classList.add('error');
        }

        return isValid;
    }

    function showFieldError(field, message) {
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        // Insert error message after the field
        if (field.parentNode) {
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
    }

    function clearFieldError(field) {
        const existingError = field.parentNode?.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    function getFieldLabel(field) {
        const label = field.parentNode?.querySelector('label');
        if (label) {
            return label.textContent.replace('*', '').trim();
        }
        return field.name || field.placeholder || 'This field';
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

    // ===== ON-SCROLL FADE-IN ANIMATIONS =====
    const animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ===== INTERACTIVE AURORA BACKGROUND =====
    document.body.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for performance
        requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        });
    });
});
