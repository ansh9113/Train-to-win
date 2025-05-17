// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Login Form Validation (for index.html)
    window.validateForm = function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        if (username === '' || password === '') {
            errorMessage.textContent = 'Please fill in all fields.';
            errorMessage.style.display = 'block';
            return false;
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.username === username && userData.password === password) {
                const loginTime = new Date().toLocaleString();
                localStorage.setItem('lastLogin', loginTime);
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'dashboard.html';
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

    // Sign-Up Form Validation (for index2.html)
    window.validateSignupForm = function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        if (username === '' || email === '' || password === '') {
            errorMessage.textContent = 'Please fill in all fields.';
            errorMessage.style.display = 'block';
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.style.display = 'block';
            return false;
        }

        if (password.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters long.';
            errorMessage.style.display = 'block';
            return false;
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.username === username) {
                errorMessage.textContent = 'Username already exists. Please choose a different one.';
                errorMessage.style.display = 'block';
                return false;
            }
        }

        const userData = {
            username: username,
            email: email,
            password: password,
            joinDate: new Date().toLocaleDateString()
        };
        localStorage.setItem('user', JSON.stringify(userData));

        alert('Sign-up successful! Please log in to continue.');
        window.location.href = 'index.html';
        return true;
    };

    // Yoga Plan Generator (for yoga-plan.html)
    if (window.location.pathname.includes('yoga-plan.html')) {
        const form = document.getElementById('yoga-form');
        const resetButton = document.getElementById('reset-form');
        const saveButton = document.getElementById('save-plan');
        const resultSection = document.getElementById('result-section');
        const resultDiv = document.getElementById('result');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            generateYogaPlan();
        });

        resetButton.addEventListener('click', () => {
            form.reset();
            resultSection.style.display = 'none';
            resultDiv.innerHTML = '';
        });

        if (saveButton) {
            saveButton.addEventListener('click', () => {
                const planHtml = resultDiv.innerHTML;
                try {
                    localStorage.setItem('savedYogaPlan', planHtml);
                    alert('Your yoga plan has been saved!');
                } catch (error) {
                    console.error('Error saving yoga plan:', error);
                    alert('Failed to save your yoga plan. Please try again.');
                }
            });
        }

        function generateYogaPlan() {
            try {
                const experience = document.getElementById('experience').value;
                const sessionTime = parseInt(document.getElementById('session-time').value);
                const goal = document.getElementById('goal').value;

                if (!experience || !sessionTime || !goal) {
                    throw new Error('Please fill out all fields.');
                }

                if (sessionTime <= 0) {
                    throw new Error('Session time must be a positive number.');
                }

                let yogaPlan = '';
                let guidedVideos = '';

                if (goal === 'relaxation') {
                    if (experience === 'beginner') {
                        yogaPlan = `
                            <h4>Yoga Plan (Beginner - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Gentle Flow</h5>
                            <ul>
                                <li>Child’s Pose: 2 minutes</li>
                                <li>Cat-Cow Stretch: 2 minutes</li>
                                <li>Seated Forward Bend: 2 minutes</li>
                            </ul>
                            <h5>Day 2: Restorative Yoga</h5>
                            <ul>
                                <li>Supine Twist: 2 minutes per side</li>
                                <li>Legs Up the Wall: 3 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to relax and breathe deeply.</p>
                            <h5>Day 4: Gentle Flow</h5>
                            <ul>
                                <li>Downward Dog: 1 minute</li>
                                <li>Thread the Needle: 1 minute per side</li>
                                <li>Savasana: 3 minutes</li>
                            </ul>
                            <h5>Day 5: Restorative Yoga</h5>
                            <ul>
                                <li>Supported Bridge Pose: 3 minutes</li>
                                <li>Reclining Bound Angle Pose: 3 minutes</li>
                            </ul>
                            <h5>Day 6: Gentle Flow</h5>
                            <ul>
                                <li>Seated Side Stretch: 1 minute per side</li>
                                <li>Low Lunge: 1 minute per side</li>
                                <li>Savasana: 2 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Focus on deep breathing and relaxation.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Child’s Pose (Beginner)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else if (experience === 'intermediate') {
                        yogaPlan = `
                            <h4>Yoga Plan (Intermediate - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Restorative Flow</h5>
                            <ul>
                                <li>Thread the Needle: 2 minutes per side</li>
                                <li>Supported Fish Pose: 3 minutes</li>
                                <li>Savasana: 5 minutes</li>
                            </ul>
                            <h5>Day 2: Gentle Vinyasa</h5>
                            <ul>
                                <li>Sun Salutation A: 3 rounds</li>
                                <li>Low Lunge with Twist: 2 minutes per side</li>
                                <li>Seated Forward Bend: 3 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to relax.</p>
                            <h5>Day 4: Restorative Flow</h5>
                            <ul>
                                <li>Reclining Bound Angle Pose: 4 minutes</li>
                                <li>Legs Up the Wall: 4 minutes</li>
                                <li>Savasana: 5 minutes</li>
                            </ul>
                            <h5>Day 5: Gentle Vinyasa</h5>
                            <ul>
                                <li>Sun Salutation B: 3 rounds</li>
                                <li>Warrior II: 2 minutes per side</li>
                                <li>Seated Twist: 2 minutes per side</li>
                            </ul>
                            <h5>Day 6: Restorative Flow</h5>
                            <ul>
                                <li>Supported Bridge Pose: 4 minutes</li>
                                <li>Supine Twist: 2 minutes per side</li>
                                <li>Savasana: 5 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Focus on deep breathing and relaxation.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Sun Salutation (Intermediate)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else {
                        yogaPlan = `
                            <h4>Yoga Plan (Advanced - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Deep Restorative</h5>
                            <ul>
                                <li>Yin Yoga Pigeon Pose: 5 minutes per side</li>
                                <li>Supported Fish Pose: 5 minutes</li>
                                <li>Savasana with Bolster: 7 minutes</li>
                            </ul>
                            <h5>Day 2: Vinyasa Flow</h5>
                            <ul>
                                <li>Sun Salutation C: 5 rounds</li>
                                <li>Warrior III: 2 minutes per side</li>
                                <li>Seated Forward Bend with Twist: 3 minutes per side</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Deep Restorative</h5>
                            <ul>
                                <li>Yin Yoga Dragon Pose: 5 minutes per side</li>
                                <li>Reclining Bound Angle Pose: 5 minutes</li>
                                <li>Savasana: 7 minutes</li>
                            </ul>
                            <h5>Day 5: Vinyasa Flow</h5>
                            <ul>
                                <li>Chaturanga Flow: 5 rounds</li>
                                <li>Crow Pose: 1 minute</li>
                                <li>Seated Meditation Pose: 5 minutes</li>
                            </ul>
                            <h5>Day 6: Deep Restorative</h5>
                            <ul>
                                <li>Yin Yoga Butterfly Pose: 5 minutes</li>
                                <li>Legs Up the Wall: 5 minutes</li>
                                <li>Savasana: 7 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Focus on deep breathing.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Crow Pose (Advanced)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    }
                } else if (goal === 'flexibility') {
                    if (experience === 'beginner') {
                        yogaPlan = `
                            <h4>Yoga Plan (Beginner - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Gentle Stretching</h5>
                            <ul>
                                <li>Seated Forward Bend: 2 minutes</li>
                                <li>Butterfly Pose: 2 minutes</li>
                                <li>Cat-Cow Stretch: 2 minutes</li>
                            </ul>
                            <h5>Day 2: Hip Openers</h5>
                            <ul>
                                <li>Low Lunge: 1 minute per side</li>
                                <li>Thread the Needle: 1 minute per side</li>
                                <li>Savasana: 2 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to relax.</p>
                            <h5>Day 4: Gentle Stretching</h5>
                            <ul>
                                <li>Standing Side Stretch: 1 minute per side</li>
                                <li>Seated Twist: 1 minute per side</li>
                                <li>Savasana: 2 minutes</li>
                            </ul>
                            <h5>Day 5: Hip Openers</h5>
                            <ul>
                                <li>Pigeon Pose (Modified): 1 minute per side</li>
                                <li>Reclining Bound Angle Pose: 2 minutes</li>
                            </ul>
                            <h5>Day 6: Gentle Stretching</h5>
                            <ul>
                                <li>Downward Dog: 1 minute</li>
                                <li>Child’s Pose: 2 minutes</li>
                                <li>Savasana: 2 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Focus on deep breathing.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Seated Forward Bend (Beginner)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else if (experience === 'intermediate') {
                        yogaPlan = `
                            <h4>Yoga Plan (Intermediate - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Dynamic Stretching</h5>
                            <ul>
                                <li>Sun Salutation A: 3 rounds</li>
                                <li>Low Lunge with Twist: 2 minutes per side</li>
                                <li>Seated Forward Bend: 3 minutes</li>
                            </ul>
                            <h5>Day 2: Hip and Hamstring Focus</h5>
                            <ul>
                                <li>Pigeon Pose: 3 minutes per side</li>
                                <li>Standing Forward Bend: 3 minutes</li>
                                <li>Savasana: 3 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Dynamic Stretching</h5>
                            <ul>
                                <li>Sun Salutation B: 3 rounds</li>
                                <li>Warrior II with Side Stretch: 2 minutes per side</li>
                                <li>Seated Twist: 2 minutes per side</li>
                            </ul>
                            <h5>Day 5: Hip and Hamstring Focus</h5>
                            <ul>
                                <li>Lizard Pose: 3 minutes per side</li>
                                <li>Wide-Legged Forward Bend: 3 minutes</li>
                                <li>Savasana: 3 minutes</li>
                            </ul>
                            <h5>Day 6: Dynamic Stretching</h5>
                            <ul>
                                <li>Thread the Needle: 2 minutes per side</li>
                                <li>Downward Dog with Leg Lift: 2 minutes per side</li>
                                <li>Savasana: 3 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Focus on deep breathing.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Pigeon Pose (Intermediate)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else {
                        yogaPlan = `
                            <h4>Yoga Plan (Advanced - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Deep Stretching</h5>
                            <ul>
                                <li>Yin Yoga Dragon Pose: 5 minutes per side</li>
                                <li>Hanumanasana (Splits Prep): 5 minutes per side</li>
                                <li>Savasana: 5 minutes</li>
                            </ul>
                            <h5>Day 2: Dynamic Flow</h5>
                            <ul>
                                <li>Sun Salutation C: 5 rounds</li>
                                <li>Warrior III with Twist: 2 minutes per side</li>
                                <li>Seated Forward Bend with Twist: 3 minutes per side</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Deep Stretching</h5>
                            <ul>
                                <li>Yin Yoga Pigeon Pose: 5 minutes per side</li>
                                <li>Thread the Needle with Leg Extension: 3 minutes per side</li>
                                <li>Savasana: 5 minutes</li>
                            </ul>
                            <h5>Day 5: Dynamic Flow</h5>
                            <ul>
                                <li>Chaturanga Flow: 5 rounds</li>
                                <li>Side Plank with Leg Lift: 2 minutes per side</li>
                                <li>Seated Meditation Pose: 5 minutes</li>
                            </ul>
                            <h5>Day 6: Deep Stretching</h5>
                            <ul>
                                <li>Yin Yoga Butterfly Pose: 5 minutes</li>
                                <li>Wide-Legged Forward Bend with Twist: 5 minutes</li>
                                <li>Savasana: 5 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Focus on deep breathing.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Hanumanasana (Advanced)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    }
                } else {
                    if (experience === 'beginner') {
                        yogaPlan = `
                            <h4>Yoga Plan (Beginner - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Gentle Flow</h5>
                            <ul>
                                <li>Child’s Pose: 2 minutes</li>
                                <li>Cat-Cow Stretch: 2 minutes</li>
                                <li>Downward Dog: 1 minute</li>
                            </ul>
                            <h5>Day 2: Strength Building</h5>
                            <ul>
                                <li>Low Lunge: 1 minute per side</li>
                                <li>Plank Pose: 30 seconds</li>
                                <li>Savasana: 2 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to relax.</p>
                            <h5>Day 4: Gentle Flow</h5>
                            <ul>
                                <li>Seated Forward Bend: 2 minutes</li>
                                <li>Thread the Needle: 1 minute per side</li>
                                <li>Savasana: 2 minutes</li>
                            </ul>
                            <h5>Day 5: Strength Building</h5>
                            <ul>
                                <li>Warrior I: 1 minute per side</li>
                                <li>Plank Pose: 45 seconds</li>
                                <li>Savasana: 2 minutes</li>
                            </ul>
                            <h5>Day 6: Gentle Flow</h5>
                            <ul>
                                <li>Standing Side Stretch: 1 minute per side</li>
                                <li>Low Lunge: 1 minute per side</li>
                                <li>Savasana: 2 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Focus on deep breathing.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Warrior I (Beginner)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else if (experience === 'intermediate') {
                        yogaPlan = `
                            <h4>Yoga Plan (Intermediate - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Vinyasa Flow</h5>
                            <ul>
                                <li>Sun Salutation A: 3 rounds</li>
                                <li>Warrior II: 2 minutes per side</li>
                                <li>Plank Pose: 1 minute</li>
                            </ul>
                            <h5>Day 2: Strength Building</h5>
                            <ul>
                                <li>Warrior I: 2 minutes per side</li>
                                <li>Side Plank: 1 minute per side</li>
                                <li>Savasana: 3 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Vinyasa Flow</h5>
                            <ul>
                                <li>Sun Salutation B: 3 rounds</li>
                                <li>Extended Side Angle Pose: 2 minutes per side</li>
                                <li>Plank Pose: 1 minute</li>
                            </ul>
                            <h5>Day 5: Strength Building</h5>
                            <ul>
                                <li>Warrior III: 2 minutes per side</li>
                                <li>Chaturanga Push-Ups: 10 reps</li>
                                <li>Savasana: 3 minutes</li>
                            </ul>
                            <h5>Day 6: Vinyasa Flow</h5>
                            <ul>
                                <li>Sun Salutation A: 3 rounds</li>
                                <li>Triangle Pose: 2 minutes per side</li>
                                <li>Savasana: 3 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Focus on deep breathing.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Warrior III (Intermediate)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else {
                        yogaPlan = `
                            <h4>Yoga Plan (Advanced - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Dynamic Flow</h5>
                            <ul>
                                <li>Sun Salutation C: 5 rounds</li>
                                <li>Warrior III: 2 minutes per side</li>
                                <li>Chaturanga Push-Ups: 15 reps</li>
                            </ul>
                            <h5>Day 2: Strength Building</h5>
                            <ul>
                                <li>Side Plank with Leg Lift: 2 minutes per side</li>
                                <li>Crow Pose: 1 minute</li>
                                <li>Savasana: 5 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Dynamic Flow</h5>
                            <ul>
                                <li>Sun Salutation B: 5 rounds</li>
                                <li>Extended Side Angle Pose: 2 minutes per side</li>
                                <li>Plank Pose: 2 minutes</li>
                            </ul>
                            <h5>Day 5: Strength Building</h5>
                            <ul>
                                <li>Handstand Prep: 2 minutes</li>
                                <li>Chaturanga Flow: 5 rounds</li>
                                <li>Savasana: 5 minutes</li>
                            </ul>
                            <h5>Day 6: Dynamic Flow</h5>
                            <ul>
                                <li>Sun Salutation A: 5 rounds</li>
                                <li>Triangle Pose with Twist: 2 minutes per side</li>
                                <li>Savasana: 5 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Focus on deep breathing.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Handstand Prep (Advanced)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    }
                }

                const resultHtml = `
                    <h3>Your Personalized Yoga Plan</h3>
                    <p><strong>Goal:</strong> ${goal.charAt(0).toUpperCase() + goal.slice(1)}</p>
                    <p><strong>Experience Level:</strong> ${experience.charAt(0).toUpperCase() + experience.slice(1)}</p>
                    ${yogaPlan}
                    <div id="exercise-videos">
                        <h4>Guided Videos</h4>
                        ${guidedVideos}
                    </div>
                    <h6>Note: Consult a professional before starting any new yoga practice.</h6>
                `;

                resultDiv.innerHTML = resultHtml;
                resultSection.style.display = 'block';
                resultSection.classList.add('fade-in');

                resultSection.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.error('Error generating yoga plan:', error);
                alert(error.message || 'An unexpected error occurred. Please try again.');
            }
        }
    }

    // Meditation Plan Generator (for meditation-plan.html)
    if (window.location.pathname.includes('meditation-plan.html')) {
        const form = document.getElementById('meditation-form');
        const resetButton = document.getElementById('reset-form');
        const saveButton = document.getElementById('save-plan');
        const resultSection = document.getElementById('result-section');
        const resultDiv = document.getElementById('result');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            generateMeditationPlan();
        });

        resetButton.addEventListener('click', () => {
            form.reset();
            resultSection.style.display = 'none';
            resultDiv.innerHTML = '';
        });

        if (saveButton) {
            saveButton.addEventListener('click', () => {
                const planHtml = resultDiv.innerHTML;
                try {
                    localStorage.setItem('savedMeditationPlan', planHtml);
                    alert('Your meditation plan has been saved!');
                } catch (error) {
                    console.error('Error saving meditation plan:', error);
                    alert('Failed to save your meditation plan. Please try again.');
                }
            });
        }

        function generateMeditationPlan() {
            try {
                const experience = document.getElementById('experience').value;
                const sessionTime = parseInt(document.getElementById('session-time').value);
                const goal = document.getElementById('goal').value;

                if (!experience || !sessionTime || !goal) {
                    throw new Error('Please fill out all fields.');
                }

                if (sessionTime <= 0) {
                    throw new Error('Session time must be a positive number.');
                }

                let meditationPlan = '';
                let guidedVideos = '';

                if (goal === 'relaxation') {
                    if (experience === 'beginner') {
                        meditationPlan = `
                            <h4>Meditation Plan (Beginner - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Body Scan</h5>
                            <ul>
                                <li>Focus on relaxing each part of your body: 5 minutes</li>
                            </ul>
                            <h5>Day 2: Breath Awareness</h5>
                            <ul>
                                <li>Inhale for 4 counts, exhale for 6 counts: 5 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to relax.</p>
                            <h5>Day 4: Body Scan</h5>
                            <ul>
                                <li>Focus on releasing tension: 5 minutes</li>
                            </ul>
                            <h5>Day 5: Breath Awareness</h5>
                            <ul>
                                <li>Inhale for 4 counts, hold for 2, exhale for 6: 5 minutes</li>
                            </ul>
                            <h5>Day 6: Guided Relaxation</h5>
                            <ul>
                                <li>Follow a guided relaxation meditation: 5 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Reflect on your practice.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Body Scan Meditation (Beginner)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else if (experience === 'intermediate') {
                        meditationPlan = `
                            <h4>Meditation Plan (Intermediate - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Guided Relaxation</h5>
                            <ul>
                                <li>Focus on releasing tension: 10 minutes</li>
                            </ul>
                            <h5>Day 2: Breath Awareness</h5>
                            <ul>
                                <li>Inhale for 5 counts, hold for 5, exhale for 7: 10 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Guided Relaxation</h5>
                            <ul>
                                <li>Visualize a peaceful place: 10 minutes</li>
                            </ul>
                            <h5>Day 5: Breath Awareness</h5>
                            <ul>
                                <li>Box Breathing (4-4-4-4): 10 minutes</li>
                            </ul>
                            <h5>Day 6: Body Scan</h5>
                            <ul>
                                <li>Deep body scan meditation: 10 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Reflect on your practice.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Guided Relaxation (Intermediate)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else {
                        meditationPlan = `
                            <h4>Meditation Plan (Advanced - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Deep Relaxation</h5>
                            <ul>
                                <li>Focus on complete surrender: 15 minutes</li>
                            </ul>
                            <h5>Day 2: Breath Awareness</h5>
                            <ul>
                                <li>Alternate Nostril Breathing: 15 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Deep Relaxation</h5>
                            <ul>
                                <li>Visualize energy flow: 15 minutes</li>
                            </ul>
                            <h5>Day 5: Breath Awareness</h5>
                            <ul>
                                <li>Kapalabhati (Breath of Fire): 10 minutes</li>
                            </ul>
                            <h5>Day 6: Chakra Balancing</h5>
                            <ul>
                                <li>Focus on energy centers: 15 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Reflect on your practice.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Chakra Balancing (Advanced)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    }
                } else if (goal === 'mindfulness') {
                    if (experience === 'beginner') {
                        meditationPlan = `
                            <h4>Meditation Plan (Beginner - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Mindfulness Meditation</h5>
                            <ul>
                                <li>Focus on your breath: 5 minutes</li>
                            </ul>
                            <h5>Day 2: Gratitude Meditation</h5>
                            <ul>
                                <li>Reflect on things you’re grateful for: 5 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to relax.</p>
                            <h5>Day 4: Mindfulness Meditation</h5>
                            <ul>
                                <li>Observe your thoughts without judgment: 5 minutes</li>
                            </ul>
                            <h5>Day 5: Gratitude Meditation</h5>
                            <ul>
                                <li>Reflect on positive aspects of your day: 5 minutes</li>
                            </ul>
                            <h5>Day 6: Body Awareness</h5>
                            <ul>
                                <li>Notice sensations in your body: 5 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Reflect on your practice.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Mindfulness Meditation (Beginner)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else if (experience === 'intermediate') {
                        meditationPlan = `
                            <h4>Meditation Plan (Intermediate - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Mindfulness Meditation</h5>
                            <ul>
                                <li>Observe thoughts without judgment: 10 minutes</li>
                            </ul>
                            <h5>Day 2: Loving-Kindness Meditation</h5>
                            <ul>
                                <li>Send positive thoughts to yourself and others: 10 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Mindfulness Meditation</h5>
                            <ul>
                                <li>Focus on the present moment: 10 minutes</li>
                            </ul>
                            <h5>Day 5: Loving-Kindness Meditation</h5>
                            <ul>
                                <li>Extend kindness to a wider circle: 10 minutes</li>
                            </ul>
                            <h5>Day 6: Body Awareness</h5>
                            <ul>
                                <li>Deep body awareness meditation: 10 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Reflect on your practice.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Loving-Kindness Meditation (Intermediate)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else {
                        meditationPlan = `
                            <h4>Meditation Plan (Advanced - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Zen Meditation</h5>
                            <ul>
                                <li>Focus on breath and posture: 15 minutes</li>
                            </ul>
                            <h5>Day 2: Transcendental Meditation</h5>
                            <ul>
                                <li>Use a mantra for focus: 15 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Zen Meditation</h5>
                            <ul>
                                <li>Deep focus on breath: 15 minutes</li>
                            </ul>
                            <h5>Day 5: Transcendental Meditation</h5>
                            <ul>
                                <li>Deepen your mantra practice: 15 minutes</li>
                            </ul>
                            <h5>Day 6: Mindfulness Meditation</h5>
                            <ul>
                                <li>Observe thoughts and emotions: 15 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Reflect on your practice.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Zen Meditation (Advanced)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    }
                } else {
                    if (experience === 'beginner') {
                        meditationPlan = `
                            <h4>Meditation Plan (Beginner - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Focus Meditation</h5>
                            <ul>
                                <li>Focus on a single point (e.g., candle flame): 5 minutes</li>
                            </ul>
                            <h5>Day 2: Breath Awareness</h5>
                            <ul>
                                <li>Inhale for 4 counts, exhale for 4 counts: 5 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to relax.</p>
                            <h5>Day 4: Focus Meditation</h5>
                            <ul>
                                <li>Focus on a sound (e.g., soft music): 5 minutes</li>
                            </ul>
                            <h5>Day 5: Breath Awareness</h5>
                            <ul>
                                <li>Inhale for 4 counts, hold for 2, exhale for 4: 5 minutes</li>
                            </ul>
                            <h5>Day 6: Visualization</h5>
                            <ul>
                                <li>Visualize a goal or positive outcome: 5 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Reflect on your practice.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Focus Meditation (Beginner)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else if (experience === 'intermediate') {
                        meditationPlan = `
                            <h4>Meditation Plan (Intermediate - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Focus Meditation</h5>
                            <ul>
                                <li>Focus on a mantra: 10 minutes</li>
                            </ul>
                            <h5>Day 2: Breath Awareness</h5>
                            <ul>
                                <li>Box Breathing (4-4-4-4): 10 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Focus Meditation</h5>
                            <ul>
                                <li>Focus on a single thought: 10 minutes</li>
                            </ul>
                            <h5>Day 5: Breath Awareness</h5>
                            <ul>
                                <li>Alternate Nostril Breathing: 10 minutes</li>
                            </ul>
                            <h5>Day 6: Visualization</h5>
                            <ul>
                                <li>Visualize achieving a goal: 10 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Reflect on your practice.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Alternate Nostril Breathing (Intermediate)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    } else {
                        meditationPlan = `
                            <h4>Meditation Plan (Advanced - ${sessionTime} minutes)</h4>
                            <h5>Day 1: Focus Meditation</h5>
                            <ul>
                                <li>Deep focus on a mantra: 15 minutes</li>
                            </ul>
                            <h5>Day 2: Breath Awareness</h5>
                            <ul>
                                <li>Kapalabhati (Breath of Fire): 10 minutes</li>
                            </ul>
                            <h5>Day 3: Rest</h5>
                            <p>Take a day to reflect.</p>
                            <h5>Day 4: Focus Meditation</h5>
                            <ul>
                                <li>Focus on a single point of energy: 15 minutes</li>
                            </ul>
                            <h5>Day 5: Breath Awareness</h5>
                            <ul>
                                <li>Advanced Alternate Nostril Breathing: 15 minutes</li>
                            </ul>
                            <h5>Day 6: Visualization</h5>
                            <ul>
                                <li>Visualize energy flow through chakras: 15 minutes</li>
                            </ul>
                            <h5>Day 7: Rest</h5>
                            <p>Reflect on your practice.</p>
                        `;
                        guidedVideos = `
                            <div>
                                <h5>Kapalabhati (Advanced)</h5>
                                <iframe src="https://www.youtube.com/embed/8zK0X9gXg4k" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `;
                    }
                }

                const resultHtml = `
                    <h3>Your Personalized Meditation Plan</h3>
                    <p><strong>Goal:</strong> ${goal.charAt(0).toUpperCase() + goal.slice(1)}</p>
                    <p><strong>Experience Level:</strong> ${experience.charAt(0).toUpperCase() + experience.slice(1)}</p>
                    ${meditationPlan}
                    <div id="exercise-videos">
                        <h4>Guided Videos</h4>
                        ${guidedVideos}
                    </div>
                    <h6>Note: Ensure a quiet space for your meditation practice.</h6>
                `;

                resultDiv.innerHTML = resultHtml;
                resultSection.style.display = 'block';
                resultSection.classList.add('fade-in');

                resultSection.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.error('Error generating meditation plan:', error);
                alert(error.message || 'An unexpected error occurred. Please try again.');
            }
        }
    }

    // Dashboard Functionality (for dashboard.html)
    if (window.location.pathname.includes('dashboard.html')) {
        const loggedIn = localStorage.getItem('loggedIn');
        if (!loggedIn) {
            window.location.href = 'index.html';
            return;
        }

        const userData = JSON.parse(localStorage.getItem('user')) || {};
        document.getElementById('username').textContent = userData.username || 'User';
        document.getElementById('email').textContent = userData.email || 'user@example.com';
        document.getElementById('joinDate').textContent = userData.joinDate || 'April 02, 2025';

        const lastLogin = localStorage.getItem('lastLogin') || 'Not available';
        document.getElementById('lastLogin').textContent = lastLogin;

        const loginStatus = document.getElementById('loginStatus');
        if (loggedIn) {
            loginStatus.textContent = 'Currently Logged In';
            loginStatus.classList.add('logged-in');
        } else {
            loginStatus.textContent = 'Not Logged In';
            loginStatus.classList.add('not-logged-in');
        }

        const savedYogaPlan = localStorage.getItem('savedYogaPlan');
        const savedYogaPlanDiv = document.getElementById('saved-yoga-plan');
        if (savedYogaPlan) {
            savedYogaPlanDiv.innerHTML = savedYogaPlan;
        }

        const savedMeditationPlan = localStorage.getItem('savedMeditationPlan');
        const savedMeditationPlanDiv = document.getElementById('saved-meditation-plan');
        if (savedMeditationPlan) {
            savedMeditationPlanDiv.innerHTML = savedMeditationPlan;
        }

        const progress = JSON.parse(localStorage.getItem('progress')) || { yogaSessions: 0, meditationSessions: 0 };
        document.getElementById('yoga-sessions-completed').textContent = progress.yogaSessions;
        document.getElementById('meditation-sessions-completed').textContent = progress.meditationSessions;

        document.getElementById('logout').addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'logout.html';
        });
    }

    // Logout Page Functionality (for logout.html)
    if (window.location.pathname.includes('logout.html')) {
        localStorage.removeItem('loggedIn');

        let countdown = 3;
        const countdownElement = document.getElementById('countdown');
        countdownElement.textContent = countdown;

        const interval = setInterval(() => {
            countdown -= 1;
            countdownElement.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(interval);
                window.location.href = 'index.html';
            }
        }, 1000);
    }

    // Progress Update Functionality (for dashboard.html)
    window.updateProgress = function (type) {
        let progress = JSON.parse(localStorage.getItem('progress')) || { yogaSessions: 0, meditationSessions: 0 };

        if (type === 'yoga-sessions') {
            progress.yogaSessions = (parseInt(progress.yogaSessions) || 0) + 1;
            document.getElementById('yoga-sessions-completed').textContent = progress.yogaSessions;
        } else if (type === 'meditation-sessions') {
            progress.meditationSessions = (parseInt(progress.meditationSessions) || 0) + 1;
            document.getElementById('meditation-sessions-completed').textContent = progress.meditationSessions;
        }

        localStorage.setItem('progress', JSON.stringify(progress));
    };
});