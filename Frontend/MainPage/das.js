// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Login Form Validation (for index.html)
    window.validateForm = function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        // Simple validation (for demo purposes)
        if (username === '' || password === '') {
            errorMessage.textContent = 'Please fill in all fields.';
            errorMessage.style.display = 'block';
            return false;
        }

        // Simulate login (in a real app, this would be a backend API call)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.username === username && userData.password === password) {
                // Store login timestamp
                const loginTime = new Date().toLocaleString();
                localStorage.setItem('lastLogin', loginTime);
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'dashboard.html'; // Redirect to dashboard
                return true;
            } else {
                errorMessage.textContent = 'Invalid username or password.';
                errorMessage.style.display = 'block';
                return false;
            }
        } else {
            errorMessage.textContent = 'No user found. Please sign up.';
            errorMessage.style.display = 'block';
            return false;
        }
    };

    // Dashboard Functionality (for dashboard.html)
    if (window.location.pathname.includes('dashboard.html')) {
        // Check if user is logged in
        const loggedIn = localStorage.getItem('loggedIn');
        if (!loggedIn) {
            window.location.href = 'index.html'; // Redirect to login if not logged in
            return;
        }

        // Load user data
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        document.getElementById('username').textContent = userData.username || 'User';
        document.getElementById('email').textContent = userData.email || 'user@example.com';
        document.getElementById('joinDate').textContent = userData.joinDate || 'April 02, 2025';

        // Load last login time
        const lastLogin = localStorage.getItem('lastLogin') || 'Not available';
        document.getElementById('lastLogin').textContent = lastLogin;

        // Update login status
        const loginStatus = document.getElementById('loginStatus');
        if (loggedIn) {
            loginStatus.textContent = 'Currently Logged In';
            loginStatus.classList.add('logged-in');
        } else {
            loginStatus.textContent = 'Not Logged In';
            loginStatus.classList.add('not-logged-in');
        }

        // Load saved fitness plan
        const savedPlan = localStorage.getItem('savedFitnessPlan');
        const savedPlanDiv = document.getElementById('saved-plan');
        if (savedPlan) {
            savedPlanDiv.innerHTML = savedPlan;
        }

        // Load progress data
        const progress = JSON.parse(localStorage.getItem('progress')) || { weight: 'Not set', workouts: 0 };
        document.getElementById('current-weight').textContent = progress.weight;
        document.getElementById('workouts-completed').textContent = progress.workouts;

        // Logout functionality
        document.getElementById('logout').addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }

    // Progress Update Functionality (for dashboard.html)
    window.updateProgress = function (type) {
        let progress = JSON.parse(localStorage.getItem('progress')) || { weight: 'Not set', workouts: 0 };

        if (type === 'weight') {
            const newWeight = prompt('Enter your current weight (in kg):');
            if (newWeight && !isNaN(newWeight) && newWeight > 0) {
                progress.weight = `${newWeight} kg`;
                document.getElementById('current-weight').textContent = progress.weight;
            } else {
                alert('Please enter a valid weight.');
            }
        } else if (type === 'workouts') {
            progress.workouts = (parseInt(progress.workouts) || 0) + 1;
            document.getElementById('workouts-completed').textContent = progress.workouts;
        }

        localStorage.setItem('progress', JSON.stringify(progress));
    };
});