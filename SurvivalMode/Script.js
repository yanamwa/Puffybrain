// QUIZ QUESTIONS
// type: "mcq" = multiple choice, "typing" = type the answer
const questions = [
  {
    type: "mcq",
    q: "What is the primary purpose of a 'router' in a home network?",
    options: [
      "To connect all wired devices into a single network.",
      "To create a wireless Wi-Fi signal for devices.",
      "To forward data between your home network and the internet.",
      "To protect the network from viruses and unauthorized access."
    ],
    correct: 2
  },
  {
    type: "mcq",
    q: "Which device extends Wi-Fi coverage?",
    options: [
      "Network Switch",
      "Modem",
      "Wi-Fi Repeater/Extender",
      "Hub"
    ],
    correct: 2
  },
  {
    type: "typing",
    q: "What does the acronym LAN stand for?",
    answer: "local area network"
  },
  {
    type: "typing",
    q: "What is the primary function of a computer's CPU (Central Processing Unit)?",
    answer: "execute instructions and perform calculations"
  }
];

let lives = 3;
let current = 0;
let score = 0;

loadQuestion();

function loadQuestion() {
  const question = questions[current];

  document.getElementById("question-text").textContent = question.q;
  document.getElementById("counter").textContent =
    `Question ${current + 1} of ${questions.length}`;

  updateProgress(current + 1, questions.length);

  const optionBox = document.getElementById("options-container");
  const typingBox = document.getElementById("typing-container");

  optionBox.innerHTML = "";
  typingBox.style.display = "none";

  // MULTIPLE CHOICE
  if (question.type === "mcq") {
    let html = "";
    question.options.forEach((opt, i) => {
      html += `<button class="option" data-index="${i}">${opt}</button>`;
    });

    optionBox.innerHTML = html;
    optionBox.style.display = "block";
    typingBox.style.display = "none";

    attachEvents();
  }

  // TYPING QUESTION
  else {
    optionBox.style.display = "none";
    typingBox.style.display = "block";

    document.getElementById("typing-answer").value = "";

    document.getElementById("submit-typing").onclick = () => {
      const userAns = document.getElementById("typing-answer").value.trim().toLowerCase();
      const correctAns = question.answer.toLowerCase();

      if (userAns === correctAns) {
        score++;
      } else {
        loseLife();
      }

      nextQuestion();
    };
  }
}

function attachEvents() {
  const buttons = document.querySelectorAll(".option");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.disabled = true);

      const selectedIndex = parseInt(btn.dataset.index);
      const correctIndex = questions[current].correct;

      if (selectedIndex === correctIndex) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
        loseLife();
      }

      setTimeout(nextQuestion, 1000);
    });
  });
}

function nextQuestion() {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    localStorage.setItem("score", score);
    window.location.href = "Result.html";
  }
}

function updateProgress(current, total) {
  const progress = document.getElementById("progress");
  progress.style.width = (current / total) * 100 + "%";
}

function loseLife() {
  lives--;

  const heart = document.getElementById(`heart${lives + 1}`);
  if (heart) heart.classList.add("lost");

  if (lives <= 0) {
    localStorage.setItem("score", score);
    localStorage.setItem("outOfLives", "true"); // 👈 FLAG
    window.location.href = "Result.html";
  }
}
