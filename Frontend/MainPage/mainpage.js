function generatePlan(event) {
    event.preventDefault();

    // Get form values
    const bodyType = document.getElementById('bodyType').value;
    const goal = document.getElementById('goal').value;
    const experience = document.getElementById('experience').value;

    // Elements to display the plan
    const resultDiv = document.getElementById('result');
    const workoutPlan = document.getElementById('workoutPlan');
    const dietPlan = document.getElementById('dietPlan');
    const maintenanceDiv = document.getElementById('maintenance');

    // Reset visibility
    resultDiv.style.display = 'block';
    maintenanceDiv.style.display = 'none';

    // Logic based on the flowchart
    let workout = '';
    let diet = '';

    // Path: Train Your Body
    if (bodyType === 'skinny' && goal === 'weightGain') {
        if (experience === 'beginner') {
            workout = 'Bodyweight exercises: 3 sets of 10 push-ups, 3 sets of 15 squats.';
            diet = 'High-calorie diet: 3 meals + 2 snacks (e.g., chicken breast, rice, peanut butter).';
        } else if (experience === 'intermediate') {
            workout = 'Dumbbell exercises: 3 sets of 12 bicep curls, 3 sets of 10 lunges.';
            diet = 'Structured meal plan with calorie surplus: 4 meals (e.g., eggs, oats, beef, sweet potatoes).';
        } else if (experience === 'experienced') {
            workout = 'Advanced weight training: 4 sets of 8 barbell squats, 4 sets of 8 deadlifts.';
            diet = 'High-protein diet with supplements: 5 meals (e.g., whey protein, salmon, quinoa).';
        }
    } else if (bodyType === 'lean' && goal === 'transform') {
        if (experience === 'beginner') {
            workout = 'Basic strength training: 3 sets of 10 bodyweight squats, 3 sets of 10 push-ups.';
            diet = 'Balanced diet: 3 meals (e.g., grilled chicken, brown rice, veggies).';
        } else if (experience === 'intermediate') {
            workout = 'Circuit training: 3 rounds of 15 kettlebell swings, 10 pull-ups, 20 sit-ups.';
            diet = 'Calorie maintenance diet: 4 meals (e.g., turkey, quinoa, avocado).';
        } else if (experience === 'experienced') {
            workout = 'HIIT: 5 rounds of 30-second sprints, 10 burpees, 15 mountain climbers.';
            diet = 'Macronutrient-focused diet: 5 meals (e.g., lean beef, sweet potatoes, broccoli).';
        }
    } else if (bodyType === 'obese' && goal === 'weightLoss') {
        if (experience === 'beginner') {
            workout = 'Low-impact cardio: 30 minutes of walking, 10 minutes of stretching.';
            diet = 'Calorie-deficit diet: 3 meals (e.g., grilled fish, steamed veggies, small portion of rice).';
        } else if (experience === 'intermediate') {
            workout = 'Cardio + Light strength: 20 minutes of cycling, 2 sets of 10 dumbbell curls.';
            diet = 'Calorie-deficit diet with portion control: 3 meals (e.g., chicken salad, soup).';
        } else if (experience === 'experienced') {
            workout = 'HIIT + Resistance: 4 rounds of 20 jumping jacks, 10 squats, 10 push-ups.';
            diet = 'Low-carb, high-protein diet: 4 meals (e.g., eggs, spinach, grilled chicken).';
        }
    } else {
        workout = 'Please select a valid combination of body type and goal.';
        diet = 'N/A';
    }

    // Display the plan
    workoutPlan.textContent = workout;
    dietPlan.textContent = diet;

    return false; // Prevent form submission
}

function maintainBody() {
    // Elements to display the maintenance plan
    const resultDiv = document.getElementById('result');
    const maintenanceDiv = document.getElementById('maintenance');
    const dailyExercise = document.getElementById('dailyExercise');
    const maintenanceDiet = document.getElementById('maintenanceDiet');

    // Hide training plan, show maintenance plan
    resultDiv.style.display = 'none';
    maintenanceDiv.style.display = 'block';

    // Mock maintenance plan (you can expand this)
    const experience = document.getElementById('experience').value;
    let exercise = '';
    let diet = '';

    if (experience === 'beginner') {
        exercise = 'Basic: 15-minute morning stretch, 10-minute walk.';
        diet = 'Balanced diet: 3 meals (e.g., oatmeal, salad, grilled chicken).';
    } else if (experience === 'intermediate') {
        exercise = 'Yoga: 30-minute session (e.g., sun salutations, warrior poses).';
        diet = 'Plant-based diet: 3 meals (e.g., quinoa salad, lentil soup).';
    } else if (experience === 'experienced') {
        exercise = 'Advanced: 45-minute CrossFit session (e.g., burpees, kettlebell swings).';
        diet = 'High-protein diet: 4 meals (e.g., eggs, chicken, broccoli).';
    }

    // Display the maintenance plan
    dailyExercise.textContent = exercise;
    maintenanceDiet.textContent = diet;
}

function backToTraining() {
    // Show training plan, hide maintenance plan
    document.getElementById('result').style.display = 'block';
    document.getElementById('maintenance').style.display = 'none';
}