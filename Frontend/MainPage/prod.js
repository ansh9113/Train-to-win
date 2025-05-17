// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fitness-form');
    const resetButton = document.getElementById('reset-form');
    const saveButton = document.getElementById('save-plan');
    const resultSection = document.getElementById('result-section');
    const resultDiv = document.getElementById('result');

    // Form submission handler
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        generateFitnessPlan();
    });

    // Reset form handler
    resetButton.addEventListener('click', () => {
        form.reset();
        resultSection.style.display = 'none';
        resultDiv.innerHTML = '';
    });

    // Save plan handler
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const planHtml = resultDiv.innerHTML;
            try {
                localStorage.setItem('savedFitnessPlan', planHtml);
                alert('Your fitness plan has been saved!');
            } catch (error) {
                console.error('Error saving plan:', error);
                alert('Failed to save your plan. Please try again.');
            }
        });
    }

    // Function to generate the fitness plan
    function generateFitnessPlan() {
        try {
            // Get form values
            const gender = document.getElementById('gender').value;
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const experience = document.getElementById('experience').value;
            const workoutTime = parseInt(document.getElementById('workout-time').value);

            // Validate inputs
            if (!gender || !height || !weight || !experience || !workoutTime) {
                throw new Error('Please fill out all fields.');
            }

            if (height <= 0 || weight <= 0 || workoutTime <= 0) {
                throw new Error('Height, weight, and workout time must be positive numbers.');
            }

            // Calculate BMI
            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

            // Determine body type based on BMI
            let bodyType = '';
            let goal = '';
            if (bmi < 18.5) {
                bodyType = 'Skinny (Ectomorph)';
                goal = 'Weight Gain';
            } else if (bmi >= 18.5 && bmi < 25) {
                bodyType = 'Fit (Mesomorph)';
                goal = 'Transform';
            } else {
                bodyType = 'Overweight (Endomorph)';
                goal = 'Weight Loss';
            }

            // Initialize plan variables
            let workoutPlan = '';
            let dietPlan = '';
            let exerciseVideos = '';

            // Adjust calorie targets based on gender
            let baseCalories = gender === 'male' ? 2500 : gender === 'female' ? 2000 : 2250; // Average for 'others'

            // Generate plan based on body type, experience, and gender
            if (bodyType === 'Skinny (Ectomorph)') {
                baseCalories += 500; // Calorie surplus for weight gain
                if (experience === 'beginner') {
                    workoutPlan = `
                        <h4>Workout Plan (Beginner - ${workoutTime} minutes)</h4>
                        <h5>Day 1: Upper Body Push</h5>
                        <ul>
                            <li>Push-Ups: 3 sets of 10 reps</li>
                            <li>Seated Shoulder Press (Light Dumbbells): 3 sets of 12 reps</li>
                            <li>Tricep Dips (Using a Chair): 3 sets of 10 reps</li>
                        </ul>
                        <h5>Day 2: Lower Body</h5>
                        <ul>
                            <li>Bodyweight Squats: 3 sets of 15 reps</li>
                            <li>Lunges: 3 sets of 10 reps per leg</li>
                            <li>Calf Raises: 3 sets of 15 reps</li>
                        </ul>
                        <h5>Day 3: Rest or Light Cardio</h5>
                        <p>30-minute walk or light stretching</p>
                        <h5>Day 4: Upper Body Pull</h5>
                        <ul>
                            <li>Assisted Pull-Ups (or Inverted Rows): 3 sets of 8 reps</li>
                            <li>Dumbbell Rows (Light): 3 sets of 12 reps</li>
                            <li>Bicep Curls (Light Dumbbells): 3 sets of 12 reps</li>
                        </ul>
                        <h5>Day 5: Lower Body</h5>
                        <ul>
                            <li>Glute Bridges: 3 sets of 15 reps</li>
                            <li>Step-Ups (Using a Step): 3 sets of 10 reps per leg</li>
                            <li>Seated Calf Raises: 3 sets of 15 reps</li>
                        </ul>
                        <h5>Day 6: Core + Cardio</h5>
                        <ul>
                            <li>Plank: 3 sets of 20 seconds</li>
                            <li>Russian Twists: 3 sets of 15 reps per side</li>
                            <li>Light Cardio: 15-minute walk or jog</li>
                        </ul>
                        <h5>Day 7: Rest</h5>
                        <p>Stretching or yoga</p>
                    `;
                    dietPlan = `
                        <h4>Diet Plan</h4>
                        <p>Target Calories: ~${baseCalories} per day</p>
                        <ul>
                            <li>Breakfast: Scrambled eggs with avocado toast and a banana (500-600 calories)</li>
                            <li>Snack: Protein shake with peanut butter and oats (400 calories)</li>
                            <li>Lunch: Chicken with brown rice and veggies (600-700 calories)</li>
                            <li>Snack: Greek yogurt with granola and honey (300-400 calories)</li>
                            <li>Dinner: Salmon with quinoa and sweet potatoes (700-800 calories)</li>
                        </ul>
                    `;
                    exerciseVideos = `
                        <div>
                            <h5>Push-Ups (Beginner)</h5>
                            <iframe src="https://www.youtube.com/embed/IODxDxX7oi4" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            <h5>Squats (Beginner)</h5>
                            <iframe src="https://www.youtube.com/embed/aclHkVaku9U" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                } else if (experience === 'intermediate') {
                    workoutPlan = `
                        <h4>Workout Plan (Intermediate - ${workoutTime} minutes)</h4>
                        <h5>Day 1: Upper Body Push</h5>
                        <ul>
                            <li>Incline Dumbbell Press: 3 sets of 10 reps</li>
                            <li>Seated Shoulder Press: 3 sets of 10 reps</li>
                            <li>Tricep Cable Pushdowns: 3 sets of 12 reps</li>
                        </ul>
                        <h5>Day 2: Lower Body</h5>
                        <ul>
                            <li>Squats: 4 sets of 8 reps</li>
                            <li>Leg Press: 3 sets of 10 reps</li>
                            <li>Walking Lunges: 3 sets of 12 reps per leg</li>
                        </ul>
                        <h5>Day 3: Active Recovery/Cardio</h5>
                        <p>45-minute walk or cycling</p>
                        <h5>Day 4: Upper Body Pull</h5>
                        <ul>
                            <li>Lat Pulldowns: 3 sets of 10 reps</li>
                            <li>Seated Cable Rows: 3 sets of 12 reps</li>
                            <li>Barbell Bicep Curls: 3 sets of 10 reps</li>
                        </ul>
                        <h5>Day 5: Lower Body</h5>
                        <ul>
                            <li>Romanian Deadlifts: 4 sets of 8 reps</li>
                            <li>Bulgarian Split Squats: 3 sets of 10 reps per leg</li>
                            <li>Glute Bridges: 3 sets of 12 reps</li>
                        </ul>
                        <h5>Day 6: Cardio + Core</h5>
                        <ul>
                            <li>HIIT Cardio: 20-30 minutes</li>
                            <li>Plank: 3 sets of 30 seconds</li>
                            <li>Russian Twists: 3 sets of 20 reps per side</li>
                        </ul>
                        <h5>Day 7: Rest</h5>
                        <p>Stretching, foam rolling, yoga</p>
                    `;
                    dietPlan = `
                        <h4>Diet Plan</h4>
                        <p>Target Calories: ~${baseCalories} per day</p>
                        <ul>
                            <li>Breakfast: Eggs, whole-grain toast, and avocado (500-600 calories)</li>
                            <li>Snack: Protein bar and almonds (400 calories)</li>
                            <li>Lunch: Beef stir-fry with rice and broccoli (600-700 calories)</li>
                            <li>Snack: Cottage cheese with pineapple (300-400 calories)</li>
                            <li>Dinner: Chicken breast, quinoa, and mixed greens (700-800 calories)</li>
                        </ul>
                    `;
                    exerciseVideos = `
                        <div>
                            <h5>Dumbbell Press (Intermediate)</h5>
                            <iframe src="https://www.youtube.com/embed/VMz6X2LPG0w" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            <h5>Squats (Intermediate)</h5>
                            <iframe src="https://www.youtube.com/embed/YaXPRqUwItQ" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                } else {
                    workoutPlan = `
                        <h4>Workout Plan (Advanced - ${workoutTime} minutes)</h4>
                        <h5>Day 1: Upper Body Push</h5>
                        <ul>
                            <li>Barbell Bench Press: 4 sets of 8 reps</li>
                            <li>Incline Dumbbell Press: 3 sets of 10 reps</li>
                            <li>Seated Shoulder Press: 4 sets of 8 reps</li>
                            <li>Lateral Raises: 3 sets of 12 reps</li>
                            <li>Tricep Dips: 3 sets of 10 reps</li>
                            <li>Tricep Cable Push 🙂downs: 3 sets of 12 reps</li>
                        </ul>
                        <h5>Day 2: Lower Body</h5>
                        <ul>
                            <li>Squats: 4 sets of 8 reps</li>
                            <li>Deadlifts: 4 sets of 8 reps</li>
                            <li>Leg Press: 3 sets of 10 reps</li>
                            <li>Walking Lunges: 3 sets of 12 reps per leg</li>
                            <li>Calf Raises: 4 sets of 15 reps</li>
                        </ul>
                        <h5>Day 3: Active Recovery/Cardio</h5>
                        <p>45-minute walk or cycling</p>
                        <h5>Day 4: Upper Body Pull</h5>
                        <ul>
                            <li>Pull-Ups: 4 sets of 8 reps</li>
                            <li>Barbell Rows: 4 sets of 8 reps</li>
                            <li>Lat Pulldowns: 3 sets of 10 reps</li>
                            <li>Seated Cable Rows: 3 sets of 12 reps</li>
                            <li>Barbell Bicep Curls: 3 sets of 10 reps</li>
                            <li>Hammer Curls: 3 sets of 12 reps</li>
                        </ul>
                        <h5>Day 5: Lower Body</h5>
                        <ul>
                            <li>Romanian Deadlifts: 4 sets of 8 reps</li>
                            <li>Bulgarian Split Squats: 3 sets of 10 reps per leg</li>
                            <li>Leg Extensions: 3 sets of 12 reps</li>
                            <li>Glute Bridges: 3 sets of 12 reps</li>
                            <li>Standing Calf Raises: 4 sets of 15 reps</li>
                        </ul>
                        <h5>Day 6: Cardio + Core</h5>
                        <ul>
                            <li>HIIT Cardio: 20-30 minutes</li>
                            <li>Plank: 3 sets of 45 seconds</li>
                            <li>Russian Twists: 3 sets of 20 reps per side</li>
                            <li>Leg Raises: 3 sets of 15 reps</li>
                        </ul>
                        <h5>Day 7: Rest</h5>
                        <p>Stretching, foam rolling, yoga</p>
                    `;
                    dietPlan = `
                        <h4>Diet Plan</h4>
                        <p>Target Calories: ~${baseCalories} per day</p>
                        <ul>
                            <li>Breakfast: Protein shake with oats, berries, and flaxseeds (500-600 calories)</li>
                            <li>Snack: Hard-boiled eggs and almonds (400 calories)</li>
                            <li>Lunch: Grilled salmon, quinoa, and asparagus (600-700 calories)</li>
                            <li>Snack: Whey protein shake with peanut butter (400 calories)</li>
                            <li>Dinner: Lean beef, sweet potatoes, and spinach (700-800 calories)</li>
                        </ul>
                    `;
                    exerciseVideos = `
                        <div>
                            <h5>Bench Press (Advanced)</h5>
                            <iframe src="https://www.youtube.com/embed/rT7DgCr-3_I" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            <h5>Deadlifts (Advanced)</h5>
                            <iframe src="https://www.youtube.com/embed/op9kVnSso6Q" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                }
            } else if (bodyType === 'Fit (Mesomorph)') {
                baseCalories = gender === 'male' ? 2500 : gender === 'female' ? 2000 : 2250; // Maintenance calories
                if (experience === 'beginner') {
                    workoutPlan = `
                        <h4>Workout Plan (Beginner - ${workoutTime} minutes)</h4>
                        <h5>Day 1: Full Body</h5>
                        <ul>
                            <li>Bodyweight Squats: 3 sets of 15 reps</li>
                            <li>Push-Ups: 3 sets of 10 reps</li>
                            <li>Plank: 3 sets of 20 seconds</li>
                        </ul>
                        <h5>Day 2: Rest or Light Cardio</h5>
                        <p>30-minute walk or light stretching</p>
                        <h5>Day 3: Full Body</h5>
                        <ul>
                            <li>Lunges: 3 sets of 10 reps per leg</li>
                            <li>Assisted Pull-Ups (or Inverted Rows): 3 sets of 8 reps</li>
                            <li>Russian Twists: 3 sets of 15 reps per side</li>
                        </ul>
                        <h5>Day 4: Rest</h5>
                        <p>Stretching or yoga</p>
                        <h5>Day 5: Full Body</h5>
                        <ul>
                            <li>Glute Bridges: 3 sets of 15 reps</li>
                            <li>Seated Shoulder Press (Light Dumbbells): 3 sets of 12 reps</li>
                            <li>Plank: 3 sets of 20 seconds</li>
                        </ul>
                        <h5>Day 6: Cardio + Core</h5>
                        <ul>
                            <li>Light Cardio: 20-minute jog or cycle</li>
                            <li>Leg Raises: 3 sets of 15 reps</li>
                        </ul>
                        <h5>Day 7: Rest</h5>
                        <p>Stretching or yoga</p>
                    `;
                    dietPlan = `
                        <h4>Diet Plan</h4>
                        <p>Target Calories: ~${baseCalories} per day</p>
                        <ul>
                            <li>Breakfast: Greek yogurt with granola and berries (400-500 calories)</li>
                            <li>Lunch: Grilled chicken, brown rice, and steamed broccoli (500-600 calories)</li>
                            <li>Snack: Apple with almond butter (200-300 calories)</li>
                            <li>Dinner: Baked salmon, quinoa, and mixed greens (500-600 calories)</li>
                            <li>Post-Workout: Protein shake (200 calories)</li>
                        </ul>
                    `;
                    exerciseVideos = `
                        <div>
                            <h5>Push-Ups (Beginner)</h5>
                            <iframe src="https://www.youtube.com/embed/IODxDxX7oi4" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            <h5>Squats (Beginner)</h5>
                            <iframe src="https://www.youtube.com/embed/aclHkVaku9U" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                } else if (experience === 'intermediate') {
                    workoutPlan = `
                        <h4>Workout Plan (Intermediate - ${workoutTime} minutes)</h4>
                        <h5>Day 1: Upper Body Push</h5>
                        <ul>
                            <li>Dumbbell Bench Press: 3 sets of 10 reps</li>
                            <li>Seated Shoulder Press: 3 sets of 10 reps</li>
                            <li>Tricep Dips: 3 sets of 12 reps</li>
                        </ul>
                        <h5>Day 2: Lower Body</h5>
                        <ul>
                            <li>Squats: 4 sets of 8 reps</li>
                            <li>Romanian Deadlifts: 3 sets of 10 reps</li>
                            <li>Walking Lunges: 3 sets of 12 reps per leg</li>
                        </ul>
                        <h5>Day 3: Rest or Cardio</h5>
                        <p>30-minute jog or cycle</p>
                        <h5>Day 4: Upper Body Pull</h5>
                        <ul>
                            <li>Lat Pulldowns: 3 sets of 10 reps</li>
                            <li>Dumbbell Rows: 3 sets of 12 reps</li>
                            <li>Bicep Curls: 3 sets of 10 reps</li>
                        </ul>
                        <h5>Day 5: Lower Body</h5>
                        <ul>
                            <li>Leg Press: 3 sets of 10 reps</li>
                            <li>Bulgarian Split Squats: 3 sets of 10 reps per leg</li>
                            <li>Glute Bridges: 3 sets of 12 reps</li>
                        </ul>
                        <h5>Day 6: Cardio + Core</h5>
                        <ul>
                            <li>HIIT Cardio: 20 minutes</li>
                            <li>Plank: 3 sets of 30 seconds</li>
                            <li>Russian Twists: 3 sets of 20 reps per side</li>
                        </ul>
                        <h5>Day 7: Rest</h5>
                        <p>Stretching, foam rolling, yoga</p>
                    `;
                    dietPlan = `
                        <h4>Diet Plan</h4>
                        <p>Target Calories: ~${baseCalories} per day</p>
                        <ul>
                            <li>Breakfast: Eggs, spinach, and whole-grain toast (400-500 calories)</li>
                            <li>Snack: Protein bar (200 calories)</li>
                            <li>Lunch: Turkey wrap with veggies and hummus (500-600 calories)</li>
                            <li>Snack: Mixed nuts (200-300 calories)</li>
                            <li>Dinner: Grilled chicken, quinoa, and avocado (500-600 calories)</li>
                        </ul>
                    `;
                    exerciseVideos = `
                        <div>
                            <h5>Dumbbell Press (Intermediate)</h5>
                            <iframe src="https://www.youtube.com/embed/VMz6X2LPG0w" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            <h5>Squats (Intermediate)</h5>
                            <iframe src="https://www.youtube.com/embed/YaXPRqUwItQ" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                } else {
                    workoutPlan = `
                        <h4>Workout Plan (Advanced - ${workoutTime} minutes)</h4>
                        <h5>Day 1: Upper Body Push</h5>
                        <ul>
                            <li>Barbell Bench Press: 4 sets of 8 reps</li>
                            <li>Incline Dumbbell Press: 3 sets of 10 reps</li>
                            <li>Seated Shoulder Press: 4 sets of 8 reps</li>
                            <li>Lateral Raises: 3 sets of 12 reps</li>
                            <li>Tricep Dips: 3 sets of 10 reps</li>
                        </ul>
                        <h5>Day 2: Lower Body</h5>
                        <ul>
                            <li>Squats: 4 sets of 8 reps</li>
                            <li>Deadlifts: 4 sets of 8 reps</li>
                            <li>Leg Press: 3 sets of 10 reps</li>
                            <li>Walking Lunges: 3 sets of 12 reps per leg</li>
                            <li>Calf Raises: 4 sets of 15 reps</li>
                        </ul>
                        <h5>Day 3: Cardio</h5>
                        <p>45-minute run or cycle</p>
                        <h5>Day 4: Upper Body Pull</h5>
                        <ul>
                            <li>Pull-Ups: 4 sets of 8 reps</li>
                            <li>Barbell Rows: 4 sets of 8 reps</li>
                            <li>Lat Pulldowns: 3 sets of 10 reps</li>
                            <li>Seated Cable Rows: 3 sets of 12 reps</li>
                            <li>Barbell Bicep Curls: 3 sets of 10 reps</li>
                        </ul>
                        <h5>Day 5: Lower Body</h5>
                        <ul>
                            <li>Romanian Deadlifts: 4 sets of 8 reps</li>
                            <li>Bulgarian Split Squats: 3 sets of 10 reps per leg</li>
                            <li>Leg Extensions: 3 sets of 12 reps</li>
                            <li>Glute Bridges: 3 sets of 12 reps</li>
                            <li>Standing Calf Raises: 4 sets of 15 reps</li>
                        </ul>
                        <h5>Day 6: Cardio + Core</h5>
                        <ul>
                            <li>HIIT Cardio: 30 minutes</li>
                            <li>Plank: 3 sets of 45 seconds</li>
                            <li>Russian Twists: 3 sets of 20 reps per side</li>
                        </ul>
                        <h5>Day 7: Rest</h5>
                        <p>Stretching, foam rolling, yoga</p>
                    `;
                    dietPlan = `
                        <h4>Diet Plan</h4>
                        <p>Target Calories: ~${baseCalories} per day</p>
                        <ul>
                            <li>Breakfast: Protein shake with oats and berries (400-500 calories)</li>
                            <li>Snack: Hard-boiled eggs (200 calories)</li>
                            <li>Lunch: Lean beef, sweet potatoes, and broccoli (500-600 calories)</li>
                            <li>Snack: Whey protein shake (200 calories)</li>
                            <li>Dinner: Grilled salmon, quinoa, and spinach (500-600 calories)</li>
                        </ul>
                    `;
                    exerciseVideos = `
                        <div>
                            <h5>Bench Press (Advanced)</h5>
                            <iframe src="https://www.youtube.com/embed/rT7DgCr-3_I" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            <h5>Deadlifts (Advanced)</h5>
                            <iframe src="https://www.youtube.com/embed/op9kVnSso6Q" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                }
            } else {
                baseCalories -= 500; // Calorie deficit for weight loss
                if (experience === 'beginner') {
                    workoutPlan = `
                        <h4>Workout Plan (Beginner - ${workoutTime} minutes)</h4>
                        <h5>Day 1: Low-Impact Cardio</h5>
                        <ul>
                            <li>Brisk Walking: 20 minutes</li>
                            <li>Bodyweight Squats: 2 sets of 10 reps</li>
                            <li>Seated Leg Raises: 2 sets of 10 reps</li>
                        </ul>
                        <h5>Day 2: Rest or Light Stretching</h5>
                        <p>15-minute stretching session</p>
                        <h5>Day 3: Full Body</h5>
                        <ul>
                            <li>Chair Squats: 2 sets of 10 reps</li>
                            <li>Wall Push-Ups: 2 sets of 10 reps</li>
                            <li>Plank: 2 sets of 15 seconds</li>
                        </ul>
                        <h5>Day 4: Rest</h5>
                        <p>Rest or light walk</p>
                        <h5>Day 5: Low-Impact Cardio</h5>
                        <ul>
                            <li>Brisk Walking: 20 minutes</li>
                            <li>Glute Bridges: 2 sets of 10 reps</li>
                            <li>Seated Calf Raises: 2 sets of 15 reps</li>
                        </ul>
                        <h5>Day 6: Core + Light Cardio</h5>
                        <ul>
                            <li>Light Walk: 15 minutes</li>
                            <li>Seated Russian Twists: 2 sets of 10 reps per side</li>
                        </ul>
                        <h5>Day 7: Rest</h5>
                        <p>Stretching or yoga</p>
                    `;
                    dietPlan = `
                        <h4>Diet Plan</h4>
                        <p>Target Calories: ~${baseCalories} per day</p>
                        <ul>
                            <li>Breakfast: Oatmeal with berries (300-400 calories)</li>
                            <li>Lunch: Grilled fish, steamed veggies, and a small portion of rice (400-500 calories)</li>
                            <li>Snack: Apple slices (100 calories)</li>
                            <li>Dinner: Chicken salad with olive oil dressing (400-500 calories)</li>
                            <li>Evening: Herbal tea (0 calories)</li>
                        </ul>
                    `;
                    exerciseVideos = `
                        <div>
                            <h5>Brisk Walking (Beginner)</h5>
                            <iframe src="https://www.youtube.com/embed/3t6hD2iR9vA" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            <h5>Chair Squats (Beginner)</h5>
                            <iframe src="https://www.youtube.com/embed/5A_3Xku3ZkM" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                } else if (experience === 'intermediate') {
                    workoutPlan = `
                        <h4>Workout Plan (Intermediate - ${workoutTime} minutes)</h4>
                        <h5>Day 1: Cardio</h5>
                        <ul>
                            <li>Cycling or Treadmill Walking: 20 minutes</li>
                            <li>Dumbbell Lunges: 3 sets of 10 reps per leg</li>
                            <li>Plank: 3 sets of 30 seconds</li>
                        </ul>
                        <h5>Day 2: Rest or Light Stretching</h5>
                        <p>15-minute stretching session</p>
                        <h5>Day 3: Full Body</h5>
                        <ul>
                            <li>Squats: 3 sets of 10 reps</li>
                            <li>Dumbbell Rows: 3 sets of 12 reps</li>
                            <li>Russian Twists: 3 sets of 15 reps per side</li>
                        </ul>
                        <h5>Day 4: Rest</h5>
                        <p>Rest or light walk</p>
                        <h5>Day 5: Cardio</h5>
                        <ul>
                            <li>Brisk Walking or Jogging: 20 minutes</li>
                            <li>Glute Bridges: 3 sets of 12 reps</li>
                            <li>Seated Calf Raises: 3 sets of 15 reps</li>
                        </ul>
                        <h5>Day 6: Cardio + Core</h5>
                        <ul>
                            <li>HIIT Cardio: 15 minutes</li>
                            <li>Plank: 3 sets of 30 seconds</li>
                            <li>Leg Raises: 3 sets of 15 reps</li>
                        </ul>
                        <h5>Day 7: Rest</h5>
                        <p>Stretching or yoga</p>
                    `;
                    dietPlan = `
                        <h4>Diet Plan</h4>
                        <p>Target Calories: ~${baseCalories} per day</p>
                        <ul>
                            <li>Breakfast: Greek yogurt with chia seeds (300-400 calories)</li>
                            <li>Snack: Carrot sticks with hummus (100-200 calories)</li>
                            <li>Lunch: Grilled chicken salad with vinaigrette (400-500 calories)</li>
                            <li>Snack: A handful of almonds (200 calories)</li>
                            <li>Dinner: Baked cod, steamed broccoli, and cauliflower (400-500 calories)</li>
                        </ul>
                    `;
                    exerciseVideos = `
                        <div>
                            <h5>HIIT Cardio (Intermediate)</h5>
                            <iframe src="https://www.youtube.com/embed/50kH47ZztHs" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            <h5>Squats (Intermediate)</h5>
                            <iframe src="https://www.youtube.com/embed/YaXPRqUwItQ" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                } else {
                    workoutPlan = `
                        <h4>Workout Plan (Advanced - ${workoutTime} minutes)</h4>
                        <h5>Day 1: Cardio</h5>
                        <ul>
                            <li>Running: 30 minutes</li>
                            <li>Kettlebell Swings: 3 sets of 15 reps</li>
                            <li>Plank: 3 sets of 45 seconds</li>
                        </ul>
                        <h5>Day 2: Lower Body</h5>
                        <ul>
                            <li>Squats: 4 sets of 8 reps</li>
                            <li>Deadlifts: 4 sets of 8 reps</li>
                            <li>Walking Lunges: 3 sets of 12 reps per leg</li>
                        </ul>
                        <h5>Day 3: Rest or Cardio</h5>
                        <p>45-minute cycle</p>
                        <h5>Day 4: Upper Body</h5>
                        <ul>
                            <li>Bench Press: 4 sets of 8 reps</li>
                            <li>Pull-Ups: 4 sets of 8 reps</li>
                            <li>Barbell Bicep Curls: 3 sets of 10 reps</li>
                        </ul>
                        <h5>Day 5: Lower Body</h5>
                        <ul>
                            <li>Romanian Deadlifts: 4 sets of 8 reps</li>
                            <li>Bulgarian Split Squats: 3 sets of 10 reps per leg</li>
                            <li>Glute Bridges: 3 sets of 12 reps</li>
                        </ul>
                        <h5>Day 6: Cardio + Core</h5>
                        <ul>
                            <li>HIIT Cardio: 30 minutes</li>
                            <li>Plank: 3 sets of 45 seconds</li>
                            <li>Russian Twists: 3 sets of 20 reps per side</li>
                        </ul>
                        <h5>Day 7: Rest</h5>
                        <p>Stretching, foam rolling, yoga</p>
                    `;
                    dietPlan = `
                        <h4>Diet Plan</h4>
                        <p>Target Calories: ~${baseCalories} per day</p>
                        <ul>
                            <li>Breakfast: Eggs with spinach and mushrooms (300-400 calories)</li>
                            <li>Snack: Protein shake (200 calories)</li>
                            <li>Lunch: Grilled chicken, zucchini noodles, and avocado (400-500 calories)</li>
                            <li>Snack: Celery with almond butter (200 calories)</li>
                            <li>Dinner: Salmon, asparagus, and a side salad (400-500 calories)</li>
                        </ul>
                    `;
                    exerciseVideos = `
                        <div>
                            <h5>HIIT Cardio (Advanced)</h5>
                            <iframe src="https://www.youtube.com/embed/0dNg1W1ZHPQ" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div>
                            <h5>Deadlifts (Advanced)</h5>
                            <iframe src="https://www.youtube.com/embed/op9kVnSso6Q" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                }
            }

            // Generate the result HTML
            const resultHtml = `
                <h3>Your Personalized Fitness Plan</h3>
                <p><strong>Body Type:</strong> ${bodyType}</p>
                <p><strong>Goal:</strong> ${goal}</p>
                <p><strong>BMI:</strong> ${bmi} (Height: ${height} cm, Weight: ${weight} kg)</p>
                ${workoutPlan}
                <div id="exercise-videos">
                    <h4>Exercise Videos</h4>
                    ${exerciseVideos}
                </div>
                ${dietPlan}
                <h6>Note: Consult a doctor before starting any new fitness or diet plan.</h6>
            `;

            // Display the result
            resultDiv.innerHTML = resultHtml;
            resultSection.style.display = 'block';
            resultSection.classList.add('fade-in');

            // Scroll to the result section
            resultSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error generating fitness plan:', error);
            alert(error.message || 'An unexpected error occurred. Please try again.');
        }
    }
});