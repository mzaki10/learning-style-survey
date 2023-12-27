// script.js

// Initialize an object to store user responses
const userResponses = {};

// Function to handle the next question
function nextQuestion() {
  const currentQuestionNumber = getCurrentQuestionNumber();
  const selectedOption = getSelectedOption(`q${currentQuestionNumber}`);

  if (selectedOption) {
    userResponses[`q${currentQuestionNumber}`] = selectedOption;
    clearErrorMessage();

    if (currentQuestionNumber < 20) {
      // Navigate to the next question
      window.location.href = `question${currentQuestionNumber + 1}.html`;
    }
  } else {
    displayErrorMessage();
  }
}

// Function to show results
function showResults() {
  const currentQuestionNumber = getCurrentQuestionNumber();

  // Check if the current question has been answered
  if (!userResponses[`q${currentQuestionNumber}`]) {
    displayErrorMessage();
    return;
  }

  // Calculate learning style percentages
  const visualPercentage = calculatePercentage("1");
  const auditoryPercentage = calculatePercentage("2");
  const tactilePercentage = calculatePercentage("3");

  // Display results on the results.html page
  displayResult("visual-percentage", visualPercentage);
  displayResult("auditory-percentage", auditoryPercentage);
  displayResult("tactile-percentage", tactilePercentage);

  // Navigate to the results.html page
  window.location.href = "results.html";
}

// Function to calculate the percentage for a learning style
function calculatePercentage(answerChoice) {
  const matchingCount = Object.values(userResponses).filter(response => response === answerChoice).length;
  const totalQuestions = Object.keys(userResponses).length;

  const percentage = totalQuestions > 0 ? ((matchingCount / totalQuestions) * 100).toFixed(2) : "0.00";
  return percentage;
}

// Function to display a result
function displayResult(elementId, percentage) {
  const resultElement = document.getElementById(elementId);

  if (resultElement) {
    resultElement.textContent = `${percentage}%`;
  } else {
    console.error(`${elementId} not found!`);
  }
}

// Function to get the current question number from the URL
function getCurrentQuestionNumber() {
  const currentUrl = window.location.href;
  const match = currentUrl.match(/question(\d+)\.html/);
  return match ? parseInt(match[1]) : 1;
}

// Function to get the selected option for a question
function getSelectedOption(questionName) {
  const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
  return selectedOption ? selectedOption.value : null;
}

// Function to display an error message
function displayErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.classList.remove("hidden");
}

// Function to clear the error message
function clearErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.classList.add("hidden");
}
