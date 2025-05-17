function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    // Reset error message
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Basic validation
    if (username.length < 3) {
        errorMessage.textContent = 'Username must be at least 3 characters long.';
        errorMessage.style.display = 'block';
        return false;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long.';
        errorMessage.style.display = 'block';
        return false;
    }

    // Mock login success (replace with actual authentication logic)
    if (username && password) {
        alert('Login successful! Redirecting to dashboard...');
        // Redirect to the dashboard page (you can create this later)
        window.location.href = "../MainPage/mainpage.html";
    }

    return false; // Prevent form submission for now
}