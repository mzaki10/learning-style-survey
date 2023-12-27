let currentQuestion = 1;
let userResponses = {};

function nextQuestion() {
  const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

  if (selectedOption) {
    userResponses[`q${currentQuestion}`] = selectedOption.value;
    currentQuestion++;

    if (currentQuestion <= 20) {
      showQuestion();
    } else {
      showResults();
    }
  } else {
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.remove("hidden");
  }
}

function showQuestion() {
  const questionText = document.getElementById("question-text");
  questionText.innerText = `Question ${currentQuestion}: What kind of book would you like to read for fun?`;

  const errorMessage = document.getElementById("error-message");
  errorMessage.classList.add("hidden");

  const answerOptions = document.querySelectorAll(`input[name="q${currentQuestion}"]`);
  answerOptions.forEach(option => (option.checked = false));

  if (currentQuestion === 20) {
    const nextButton = document.querySelector("button");
    nextButton.innerText = "Show Results";
  }
}

function showResults() {
  const surveyContainer = document.getElementById("survey-container");
  surveyContainer.style.display = "none";

  const resultContainer = document.getElementById("result-container");
  resultContainer.classList.remove("hidden");

  const visualPercentage = calculatePercentage("1");
  const auditoryPercentage = calculatePercentage("2");
  const tactilePercentage = calculatePercentage("3");

  const visualElement = document.getElementById("visual-percentage");
  const auditoryElement = document.getElementById("auditory-percentage");
  const tactileElement = document.getElementById("tactile-percentage");

  visualElement.innerText = `Visual: ${visualPercentage}%`;
  auditoryElement.innerText = `Auditory: ${auditoryPercentage}%`;
  tactileElement.innerText = `Tactile: ${tactilePercentage}%`;
}

function calculatePercentage(answer) {
  const count = Object.values(userResponses).filter(response => response === answer).length;
  return ((count / 20) * 100).toFixed(2);
}

document.addEventListener("DOMContentLoaded", showQuestion);
