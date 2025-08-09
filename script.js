// DinoQuiz – Φωνητική εκφώνηση με πιο «παιδικό» τόνο μέσω pitch/rate
// Αν ο browser έχει περισσότερες φωνές, μπορείς να διαλέξεις από το dropdown.

const colorToGreek = { red: "κόκκινο", green: "πράσινο", yellow: "κίτρινο" };

// ΠΑΡΑΜΕΤΡΟΙ ΦΩΝΗΣ
const PITCH = 1.4;   // πιο «γλυκιά»/παιδική χροιά
const RATE  = 0.95;  // λίγο πιο αργό για καθαρότητα

// 20 ερωτήσεις με placeholders εικόνων
const quiz = [
  { question: "Ποιος πέταγε στον ουρανό;", image: "image1.jpg",
    options: [
      { color: "green", label: "Πτερόσαυρος", correct: true },
      { color: "red", label: "Τρικεράτοπας", correct: false },
      { color: "yellow", label: "Ιγκουανόδοντας", correct: false }
    ]},
  { question: "Ποιος είχε πλάκες στην πλάτη του;", image: "image2.jpg",
    options: [
      { color: "green", label: "Στεγόσαυρος", correct: true },
      { color: "red", label: "Βελοσιράπτορας", correct: false },
      { color: "yellow", label: "Παχυκεφαλόσαυρος", correct: false }
    ]},
  { question: "Ποιος είχε τεράστια νύχια στα χέρια;", image: "image3.jpg",
    options: [
      { color: "green", label: "Τερίζινοσαυρος", correct: true },
      { color: "red", label: "Τυρανόσαυρος Ρεξ", correct: false },
      { color: "yellow", label: "Διπλόδοκος", correct: false }
    ]},
  { question: "Ποιος έμοιαζε με πουλί και έτρεχε γρήγορα;", image: "image4.jpg",
    options: [
      { color: "green", label: "Ορνιθομίμους", correct: true },
      { color: "red", label: "Καρνοτόσαυρος", correct: false },
      { color: "yellow", label: "Ανκιλόσαυρος", correct: false }
    ]},
  { question: "Ποιος είχε τρία κέρατα;", image: "image5.jpg",
    options: [
      { color: "green", label: "Τρικεράτοπας", correct: true },
      { color: "red", label: "Γκαλιμίμους", correct: false },
      { color: "yellow", label: "Μπρακιοσόραυρος", correct: false }
    ]},
  { question: "Ποιος είχε μακρύ λαιμό και έφτανε τα ψηλά δέντρα;", image: "image6.jpg",
    options: [
      { color: "green", label: "Μπρακιοσόραυρος", correct: true },
      { color: "red", label: "Τυρανόσαυρος Ρεξ", correct: false },
      { color: "yellow", label: "Στεγόσαυρος", correct: false }
    ]},
  { question: "Ποιος είχε πανοπλία στην πλάτη και ουρά με ρόπαλο;", image: "image7.jpg",
    options: [
      { color: "green", label: "Ανκιλόσαυρος", correct: true },
      { color: "red", label: "Πτερόσαυρος", correct: false },
      { color: "yellow", label: "Ιγκουανόδοντας", correct: false }
    ]},
  { question: "Ποιος είχε φτερά αλλά δεν πετούσε;", image: "image8.jpg",
    options: [
      { color: "green", label: "Βελοσιράπτορας", correct: true },
      { color: "red", label: "Τρικεράτοπας", correct: false },
      { color: "yellow", label: "Παχυκεφαλόσαυρος", correct: false }
    ]},
  { question: "Ποιος κυνηγούσε σε αγέλες;", image: "image9.jpg",
    options: [
      { color: "green", label: "Βελοσιράπτορας", correct: true },
      { color: "red", label: "Γκαλιμίμους", correct: false },
      { color: "yellow", label: "Ορνιθομίμους", correct: false }
    ]},
  { question: "Ποιος είχε το πιο δυνατό δάγκωμα;", image: "image10.jpg",
    options: [
      { color: "green", label: "Τυρανόσαυρος Ρεξ", correct: true },
      { color: "red", label: "Ιγκουανόδοντας", correct: false },
      { color: "yellow", label: "Τρικεράτοπας", correct: false }
    ]},
  { question: "Ποιος έμοιαζε με σαύρα και είχε μεγάλα δόντια;", image: "image11.jpg",
    options: [
      { color: "green", label: "Αλλόσαυρος", correct: true },
      { color: "red", label: "Διπλόδοκος", correct: false },
      { color: "yellow", label: "Ανκιλόσαυρος", correct: false }
    ]},
  { question: "Ποιος είχε σχήμα κεφαλής σαν θόλο;", image: "image12.jpg",
    options: [
      { color: "green", label: "Παχυκεφαλόσαυρος", correct: true },
      { color: "red", label: "Στεγόσαυρος", correct: false },
      { color: "yellow", label: "Τερίζινοσαυρος", correct: false }
    ]},
  { question: "Ποιος είχε μακρύτερη ουρά από σώμα;", image: "image13.jpg",
    options: [
      { color: "green", label: "Διπλόδοκος", correct: true },
      { color: "red", label: "Αλλόσαυρος", correct: false },
      { color: "yellow", label: "Τρικεράτοπας", correct: false }
    ]},
  { question: "Ποιος έτρωγε ψάρια;", image: "image14.jpg",
    options: [
      { color: "green", label: "Σπινόσαυρος", correct: true },
      { color: "red", label: "Ιγκουανόδοντας", correct: false },
      { color: "yellow", label: "Παχυκεφαλόσαυρος", correct: false }
    ]},
  { question: "Ποιος ήταν μικρός αλλά έξυπνος;", image: "image15.jpg",
    options: [
      { color: "green", label: "Τροοδόντας", correct: true },
      { color: "red", label: "Αλλόσαυρος", correct: false },
      { color: "yellow", label: "Καρνοτόσαυρος", correct: false }
    ]},
  { question: "Ποιος είχε πτερύγια σαν φάλαινα;", image: "image16.jpg",
    options: [
      { color: "green", label: "Ιχθυόσαυρος", correct: true },
      { color: "red", label: "Πτερόσαυρος", correct: false },
      { color: "yellow", label: "Ορνιθομίμους", correct: false }
    ]},
  { question: "Ποιος ήταν πιο βαρύς από όλους;", image: "image17.jpg",
    options: [
      { color: "green", label: "Αργεντινόσαυρος", correct: true },
      { color: "red", label: "Τυρανόσαυρος Ρεξ", correct: false },
      { color: "yellow", label: "Μπρακιοσόραυρος", correct: false }
    ]},
  { question: "Ποιος είχε λοφίο στο κεφάλι του;", image: "image18.jpg",
    options: [
      { color: "green", label: "Παρασαυρόλοφος", correct: true },
      { color: "red", label: "Τρικεράτοπας", correct: false },
      { color: "yellow", label: "Γκαλιμίμους", correct: false }
    ]},
  { question: "Ποιος ήταν φυτοφάγος και περπατούσε στα 4;", image: "image19.jpg",
    options: [
      { color: "green", label: "Ιγκουανόδοντας", correct: true },
      { color: "red", label: "Αλλόσαυρος", correct: false },
      { color: "yellow", label: "Τερίζινοσαυρος", correct: false }
    ]},
  { question: "Ποιος είχε μακρύ ρύγχος σαν κροκόδειλος;", image: "image20.jpg",
    options: [
      { color: "green", label: "Σπινόσαυρος", correct: true },
      { color: "red", label: "Ορνιθομίμους", correct: false },
      { color: "yellow", label: "Ιχθυόσαυρος", correct: false }
    ]},
];

let current = 0;
let selectedVoice = null;
let voicesList = [];

// Helpers για στοιχεία DOM
const voiceSelectEl = () => document.getElementById("voiceSelect");

function loadVoices() {
  voicesList = window.speechSynthesis.getVoices();
  const greek = voicesList.filter(v => (v.lang || "").toLowerCase().startsWith("el"));

  const sel = voiceSelectEl();
  if (!sel) return;
  sel.innerHTML = "";

  const list = greek.length ? greek : voicesList;
  list.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})`;
    sel.appendChild(opt);
  });

  const savedName = localStorage.getItem("dinoquiz.voiceName");
  if (savedName && list.find(v => v.name === savedName)) {
    sel.value = savedName;
  }

  selectedVoice = list.find(v => v.name === sel.value) || list[0] || null;
}

function attachVoiceHandlers() {
  const sel = voiceSelectEl();
  if (sel) {
    sel.addEventListener("change", () => {
      const chosen = voicesList.find(v => v.name === sel.value);
      if (chosen) {
        selectedVoice = chosen;
        localStorage.setItem("dinoquiz.voiceName", chosen.name);
      }
    });
  }
  const testBtn = document.getElementById("testVoice");
  if (testBtn) {
    testBtn.addEventListener("click", () => {
      speak("Γεια σου! Ας παίξουμε με τους δεινόσαυρους!");
    });
  }
}

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "el-GR";
  u.pitch = PITCH;
  u.rate  = RATE;
  if (selectedVoice) u.voice = selectedVoice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderQuestion() {
  const q = quiz[current];
  const img = document.getElementById("dinoImg");
  img.src = q.image; // θα «σπάει» μέχρι να μπουν τα αρχεία imageX.jpg
  img.alt = "Εικόνα: " + q.image;

  const qEl = document.getElementById("question");
  qEl.textContent = q.question;

  const answersEl = document.getElementById("answers");
  answersEl.innerHTML = "";
  const shuffled = shuffle(q.options.map(o => ({...o})));
  shuffled.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "answer " + opt.color;
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      speak(opt.correct ? "Μπράβο!" : "Όχι, δοκίμασε ξανά!");
      if (opt.correct) setTimeout(() => nextQuestion(), 700);
    });
    answersEl.appendChild(btn);
  });

  const colorName = c => ({red:"κόκκινο", green:"πράσινο", yellow:"κίτρινο"})[c] || c;
  const spoken = q.question + ". " + shuffled.map(o => `${colorName(o.color)}: ${o.label}`).join(", ");
  speak(spoken);
}

function nextQuestion() {
  current = (current + 1) % quiz.length;
  renderQuestion();
}

window.addEventListener("DOMContentLoaded", () => {
  // Φόρτωση φωνών: σε κάποιους browsers έρχονται ασύγχρονα
  if (window.speechSynthesis.getVoices().length) loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  attachVoiceHandlers();

  renderQuestion();
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
});
