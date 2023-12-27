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
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2 id="question-text">Question ${currentQuestion}: What kind of book would you like to read for fun?</h2>
    <div class="answer-options">
      <label><input type="radio" name="q${currentQuestion}" value="1">A book with lots of pictures in it</label>
      <label><input type="radio" name="q${currentQuestion}" value="2">A book with lots of words in it</label>
      <label><input type="radio" name="q${currentQuestion}" value="3">A book with word searches or crossword puzzles</label>
    </div>
    <p id="error-message" class="hidden">Please select an answer before proceeding.</p>
    <button onclick="nextQuestion()">Next</button>
  `;
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
