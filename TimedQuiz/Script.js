
// QUIZ QUESTIONS
// type: "mcq" = multiple choice, "typing" = type the answer
const questions = [
  {
    type: "mcq",
    q: "Which keyword is used to create object in Java?",
    options: [
      "make",
      "object",
      "new",
      "create."
    ],
    correct: 2
  },
  {
    type: "mcq",
    q: "What does DNS stand for?",
    options: [
      "Dynamic Network Storage",
      "Domain Name System",
      "Direct Node Security",
      "Digital Name System"
    ],
    correct: 1
  },
  {
    type: "mcq",
    q: "Which in the following is used to display output in Python?",
    options: [
      "echo()",
      "display()",
      "show()",
      "print()"
    ],
    correct: 3
  },

  
];

let lives = 3; 
let current = 0;
let score = 0;

loadQuestion();

function loadQuestion() {
  const question = questions[current];

  document.getElementById("question-text").textContent = question.q;
  document.getElementById("counter").textContent = `Question ${current + 1} of ${questions.length}`;
  updateProgress(current + 1, questions.length);

  const optionBox = document.getElementById("options-container");
  const typingBox = document.getElementById("typing-container");

  optionBox.innerHTML = "";
  typingBox.style.display = "none";

  // MULTIPLE CHOICE QUESTION
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
  else if (question.type === "typing") {
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
    window.location.href = "result.html";
  }
}

function updateProgress(current, total) {
  const progress = document.getElementById("progress");
  const percent = (current / total) * 100;
  progress.style.width = percent + "%";
}
function loseLife() {
    lives--;

    const heart = document.getElementById(`heart${lives + 1}`);
    if (heart) heart.classList.add("lost");

    if (lives <= 0) {
        localStorage.setItem("score", score);
        window.location.href = "Result.html";
    }
}

    let time = 120; 
    const timerEl = document.getElementById("timer");

function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    timerEl.textContent = `${minutes} : ${seconds.toString().padStart(2, '0')}`;

    if (time === 0) {
        clearInterval(timerInterval);

        // ✅ Save timeout info
        localStorage.setItem("score", score);
        localStorage.setItem("timeout", "true");

        // ✅ Go to result page
        window.location.href = "result.html";
        return;
    }

    time--;
}

    const timerInterval = setInterval(updateTimer, 1000);