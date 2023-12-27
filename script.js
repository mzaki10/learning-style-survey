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
  const selectedOption = getSelectedOption(`q${currentQuestionNumber}`);

  if (selectedOption) {
    userResponses[`q${currentQuestionNumber}`] = selectedOption;

    // Calculate learning style percentages
    const visualPercentage = calculatePercentage("1", "visual");
    const auditoryPercentage = calculatePercentage("2", "auditory");
    const tactilePercentage = calculatePercentage("3", "tactile");

    // Display results on the results.html page
    document.getElementById("visual-percentage").textContent = `${visualPercentage}%`;
    document.getElementById("auditory-percentage").textContent = `${auditoryPercentage}%`;
    document.getElementById("tactile-percentage").textContent = `${tactilePercentage}%`;

    // Navigate to the results.html page
    window.location.href = "results.html";
  } else {
    displayErrorMessage();
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

// Function to calculate the percentage for a learning style
function calculatePercentage(answerChoice, learningStyle) {
  const styleCount = Object.values(userResponses).filter(response => response === answerChoice).length;
  const totalQuestions = 20;
  return ((styleCount / totalQuestions) * 100).toFixed(2);
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
