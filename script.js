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
    const visualResultElement = document.getElementById("visual-percentage");
    const auditoryResultElement = document.getElementById("auditory-percentage");
    const tactileResultElement = document.getElementById("tactile-percentage");

    // Check if the elements exist before setting textContent
    if (visualResultElement) {
      visualResultElement.textContent = `${visualPercentage}%`;
    } else {
      console.error("Visual Result Element not found!");
    }

    if (auditoryResultElement) {
      auditoryResultElement.textContent = `${auditoryPercentage}%`;
    } else {
      console.error("Auditory Result Element not found!");
    }

    if (tactileResultElement) {
      tactileResultElement.textContent = `${tactilePercentage}%`;
    } else {
      console.error("Tactile Result Element not found!");
    }

    // Navigate to the results.html page
    window.location.href = "results.html";
  } else {
    displayErrorMessage();
  }
}

// Function to calculate the percentage for a learning style
function calculatePercentage(answerChoice, learningStyle) {
  const answeredQuestions = Object.keys(userResponses).filter(question => userResponses[question] !== undefined);
  const matchingAnswers = answeredQuestions.filter(question => userResponses[question] === answerChoice);

  const totalQuestions = answeredQuestions.length;
  const matchingCount = matchingAnswers.length;

  const percentage = totalQuestions > 0 ? ((matchingCount / totalQuestions) * 100).toFixed(2) : "0.00";

  return percentage;
}

// Other functions remain unchanged...
