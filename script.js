// Initialize variables
let currentQuestion = 1;
let visualScore = 0;
let auditoryScore = 0;
let tactileScore = 0;

// Function to show the next question
function nextQuestion() {
  // Get the selected answer
  const selectedAnswer = document.querySelector(`input[name=q${currentQuestion}]:checked`);

  // If an answer is selected, update scores and navigate to the next question
  if (selectedAnswer) {
    const selectedValue = parseInt(selectedAnswer.value);

    // Update scores based on the selected value
    if (selectedValue === 1) {
      visualScore++;
    } else if (selectedValue === 2) {
      auditoryScore++;
    } else if (selectedValue === 3) {
      tactileScore++;
    }

    // Move to the next question or show results if it's the last question
    if (currentQuestion < 20) {
      currentQuestion++;
      window.location.href = `question${currentQuestion}.html`;
    } else {
      showResults();
    }
  } else {
    // Show error message if no answer is selected
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.remove('hidden');
  }
}

// Function to show the results
function showResults() {
  // Calculate percentages
  const totalQuestions = 20;
  const visualPercentage = (visualScore / totalQuestions) * 100;
  const auditoryPercentage = (auditoryScore / totalQuestions) * 100;
  const tactilePercentage = (tactileScore / totalQuestions) * 100;

  // Display results on the results.html page
  window.location.href = 'results.html';
  document.getElementById('visual-percentage').textContent = visualPercentage.toFixed(2) + '%';
  document.getElementById('auditory-percentage').textContent = auditoryPercentage.toFixed(2) + '%';
  document.getElementById('tactile-percentage').textContent = tactilePercentage.toFixed(2) + '%';
}

// Function to hide error message when an answer is selected
function hideErrorMessage() {
  const errorMessage = document.getElementById('error-message');
  errorMessage.classList.add('hidden');
}
