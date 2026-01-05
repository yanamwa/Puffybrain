const questions = [
  {
    q: "What is the primary purpose of a router in a home network?",
    answers: [
      "to forward data between the home network and the internet",
      "forward data between your home network and the internet"
    ]
  },
  {
    q: "Which network device is used to amplify a Wi-Fi signal to extend the coverage area of a wireless network?",
    answers: [
      "wi-fi repeater",
      "wifi repeater",
      "wi-fi extender",
      "wifi extender"
    ]
  },
  {
    q: "What does the acronym LAN commonly stand for?",
    answers: ["local area network"]
  }
];
let current = 0;
let score = 0;

loadQuestion();
function loadQuestion() {
  const question = questions[current];

  document.getElementById("question-text").textContent = question.q;
  updateProgress(current + 1, questions.length);

  const typingContainer = document.getElementById("typing-container");
  const input = document.getElementById("typing-answer");

  // 🔥 SHOW the input
  typingContainer.style.display = "block";

  input.value = "";
  input.classList.remove("correct", "wrong");
  input.focus();

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      checkAnswer(input.value, question.answers);
    }
  };
}


function checkAnswer(userInput, correctAnswers) {
  const input = document.getElementById("typing-answer");
  const userAns = userInput.trim().toLowerCase();

  // reset styles
  input.classList.remove("correct", "wrong");

  const isCorrect = correctAnswers.some(
    ans => ans.toLowerCase() === userAns
  );

  if (isCorrect) {
    input.classList.add("correct");
    score++;
  } else {
    input.classList.add("wrong");
  }

  // short delay so user can see red/green
  setTimeout(() => {
    nextQuestion();
  }, 500); // 500ms = half a second
}


function nextQuestion() {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    localStorage.setItem("score", score);
    window.location.href = "result.html";
  }
}

function updateProgress(current, total) {
  const progress = document.getElementById("progress");
  progress.style.width = (current / total) * 100 + "%";
}
