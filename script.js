// Initialize variables
let visualScore = 0;
let auditoryScore = 0;
let tactileScore = 0;

// Function to update scores and navigate to the next question or results
function nextQuestion(questionNumber) {
  // Get the selected answer
  const selectedAnswer = document.querySelector(`input[name=q${questionNumber}]:checked`);

  // If an answer is selected, update scores
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
    const nextQuestionNumber = questionNumber + 1;
    const nextQuestionUrl = `question${nextQuestionNumber}.html`;

    // Check if the next question exists before navigating
    fetch(nextQuestionUrl)
      .then(response => {
        if (response.ok) {
          window.location.href = nextQuestionUrl;
        } else {
          // If the next question doesn't exist, show results
          showResults();
        }
      })
      .catch(error => {
        console.error('Error fetching next question:', error);
      });
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
