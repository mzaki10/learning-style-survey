// Function to navigate to the next question
function nextQuestion(questionNumber) {
  const totalQuestions = 20;
  const nextQuestionNumber = questionNumber + 1;

  // Check if it's the last question
  if (nextQuestionNumber <= totalQuestions) {
    const nextQuestionUrl = `question${nextQuestionNumber}.html`;
    window.location.href = nextQuestionUrl;
  } else {
    // Redirect to results page when it's the last question
    window.location.href = 'results.html';
  }
}
