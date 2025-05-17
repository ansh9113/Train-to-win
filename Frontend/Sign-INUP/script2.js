function validateSignupForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    // Reset error message
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Validation checks
    if (username.length < 3) {
        errorMessage.textContent = 'Username must be at least 3 characters long.';
        errorMessage.style.display = 'block';
        return false;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.style.display = 'block';
        return false;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long.';
        errorMessage.style.display = 'block';
        return false;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        errorMessage.style.display = 'block';
        return false;
    }

    // Mock sign-up success (replace with actual backend logic)
    if (username && email && password && confirmPassword) {
        alert('Sign-up successful! Redirecting to login page...');
        // Redirect to the login page
        window.location.href = "../MainPage/mainpage.html";
    }

    return false; // Prevent form submission for now
}