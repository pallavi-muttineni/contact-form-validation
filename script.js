document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    // Function to show an error message
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    // Function to hide an error message
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // Function to validate email format using regex
    function isValidEmail(email) {
        // A simple regex for email validation
        // Source: https://emailregex.com/ (commonly used simple one)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Main validation function
    function validateForm() {
        let isValid = true; // Assume valid until an error is found

        // 1. Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameError, 'Name is required.');
            isValid = false;
        } else {
            hideError(nameError);
        }

        // 2. Validate Email
        if (emailInput.value.trim() === '') {
            showError(emailError, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideError(emailError);
        }

        // 3. Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageError, 'Message is required.');
            isValid = false;
        } else {
            hideError(messageError);
        }

        return isValid; // Return true if all inputs are valid, false otherwise
    }

    // Event listener for form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Hide any previous success message
        hideError(successMessage);

        if (validateForm()) {
            // If validation passes, display success message
            successMessage.textContent = 'Form submitted successfully! (No actual sending)';
            successMessage.style.display = 'block';

            // Optionally, clear the form fields
            contactForm.reset();
        } else {
            // If validation fails, error messages are already displayed by validateForm()
            // Ensure success message is hidden if there were previous errors
            hideError(successMessage);
        }
    });

    // Optional: Add real-time validation feedback on input
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            hideError(nameError);
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) {
            hideError(emailError);
        }
    });

    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim() !== '') {
            hideError(messageError);
        }
    });
});