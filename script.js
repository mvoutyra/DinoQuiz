
const questions = [
  {
    text: "Ποιος είχε τρία κέρατα στο κεφάλι;",
    image: "https://cdn.pixabay.com/photo/2016/12/06/18/27/dinosaur-1880838_960_720.jpg",
    options: [
      { color: "red", label: "Τρικεράτοπας", correct: true },
      { color: "green", label: "Στεγόσαυρος", correct: false },
      { color: "yellow", label: "Βραχιόσαυρος", correct: false }
    ]
  },
  {
    text: "Ποιος είχε τεράστια δόντια;",
    image: "https://cdn.pixabay.com/photo/2020/03/01/21/25/tyrannosaurus-4894392_960_720.jpg",
    options: [
      { color: "green", label: "Τυραννόσαυρος Ρεξ", correct: true },
      { color: "red", label: "Τρικεράτοπας", correct: false },
      { color: "yellow", label: "Σπινόσαυρος", correct: false }
    ]
  }
];

let current = 0;
let score = 0;
let selectedVoice = null;

const colorToGreek = {
  red: "κόκκινο",
  green: "πράσινο",
  yellow: "κίτρινο"
};

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "el-GR";
  if (selectedVoice) utterance.voice = selectedVoice;
  window.speechSynthesis.speak(utterance);
};

const selectVoice = () => {
  return new Promise((resolve) => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      selectedVoice = voices.find(v => v.lang === "el-GR" && /female|γυν/i.test(v.name)) ||
                      voices.find(v => v.lang === "el-GR");
      resolve();
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    }
  });
};

const showQuestion = () => {
  const q = questions[current];
  quiz.innerHTML = `
    <img id="dinoImg" src="${q.image}" alt="Εικόνα Δεινόσαυρου" />
    <div class="question">${q.text}</div>
    <div class="answers">
      ${q.options.map(opt => `<button class="answer ${opt.color}" data-correct="${opt.correct}">${opt.label}</button>`).join('')}
    </div>
  `;

  speak(q.text + '. ' + q.options.map(o => colorToGreek[o.color] + ': ' + o.label).join(', '));

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

document.getElementById("startBtn").addEventListener("click", async () => {
  current = 0;
  score = 0;
  await selectVoice();
  showQuestion();
});
