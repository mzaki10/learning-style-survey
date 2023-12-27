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

  console.log("Current Question Number:", currentQuestionNumber);
  console.log("Selected Option:", selectedOption);

  if (selectedOption) {
    userResponses[`q${currentQuestionNumber}`] = selectedOption;

    // Calculate learning style percentages
    const visualPercentage = calculatePercentage("1", "visual");
    const auditoryPercentage = calculatePercentage("2", "auditory");
    const tactilePercentage = calculatePercentage("3", "tactile");

    console.log("Visual Percentage:", visualPercentage);
    console.log("Auditory Percentage:", auditoryPercentage);
    console.log("Tactile Percentage:", tactilePercentage);

    // Display results on the results.html page
    const visualResultElement = document.getElementById("visual-percentage");
    const auditoryResultElement = document.getElementById("auditory-percentage");
    const tactileResultElement = document.getElementById("tactile-percentage");

    // Check if the elements exist before setting textContent
    if (visualResultElement && auditoryResultElement && tactileResultElement) {
      visualResultElement.textContent = `${visualPercentage}%`;
      auditoryResultElement.textContent = `${auditoryPercentage}%`;
      tactileResultElement.textContent = `${tactilePercentage}%`;
    } else {
      console.error("Result elements not found!");
    }

    // Navigate to the results.html page
    console.log("Redirecting to results.html");
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
