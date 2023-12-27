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
  const nextPage = `question${currentQuestion}.html`;
  window.location.href = nextPage;
}

function showResults() {
  const nextPage = "results.html";
  window.location.href = nextPage;
}

document.addEventListener("DOMContentLoaded", showQuestion);
