
const questions = [
  {
    text: "Ποιος είχε τρία κέρατα στο κεφάλι;",
    options: [
      { color: "red", label: "Τρικεράτοπας", correct: true },
      { color: "green", label: "Στεγόσαυρος", correct: false },
      { color: "yellow", label: "Βραχιόσαυρος", correct: false }
    ]
  },
  {
    text: "Ποιος είχε τεράστια δόντια;",
    options: [
      { color: "green", label: "Τυραννόσαυρος Ρεξ", correct: true },
      { color: "red", label: "Τρικεράτοπας", correct: false },
      { color: "yellow", label: "Σπινόσαυρος", correct: false }
    ]
  }
];

let current = 0;
let score = 0;

const quiz = document.getElementById("quiz");

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "el-GR";
  window.speechSynthesis.speak(utterance);
};

const showQuestion = () => {
  const q = questions[current];
  quiz.innerHTML = `
    <div id="image" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/1/11/Dino_icon.png');"></div>
    <div class="question">${q.text}</div>
    <div class="answers">
      ${q.options.map(opt => `<button class="answer ${opt.color}" data-correct="${opt.correct}">${opt.label}</button>`).join('')}
    </div>
  `;

  speak(q.text + '. ' + q.options.map(o => o.color + ': ' + o.label).join(', '));

  document.querySelectorAll('.answer').forEach(btn => {
    btn.addEventListener('click', () => {
      const correct = btn.dataset.correct === "true";
      if (correct) {
        speak("Μπράβο!");
        score++;
        current++;
        if (current < questions.length) {
          setTimeout(showQuestion, 1000);
        } else {
          quiz.innerHTML = `<h2>Τέλος! Σωστές απαντήσεις: ${score} / ${questions.length}</h2>`;
          speak("Μπράβο! Τέλος παιχνιδιού.");
        }
      } else {
        speak("Όχι, δοκίμασε ξανά!");
      }
    });
  });
};

document.getElementById("startBtn").addEventListener("click", () => {
  current = 0;
  score = 0;
  showQuestion();
});
