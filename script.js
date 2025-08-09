// DinoQuiz – Αρχική οθόνη με 'Ξεκινάμε!' για να δουλέψει η εκφώνηση από την πρώτη ερώτηση.
// Pitch/Rate sliders + επιλογέας φωνής (αποθήκευση σε localStorage).

const colorToGreek = { red: "κόκκινο", green: "πράσινο", yellow: "κίτρινο" };

// Προεπιλογές (θα διαβάζονται/γράφονται στο localStorage)
let PITCH = parseFloat(localStorage.getItem("dinoquiz.pitch") || "1.4");
let RATE  = parseFloat(localStorage.getItem("dinoquiz.rate")  || "0.95");

let current = 0;
let selectedVoice = null;
let voicesList = [];
let userInteracted = false;

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

// Helpers για DOM
const $ = s => document.querySelector(s);

function loadVoices() {
  const sel = $("#voiceSelect");
  voicesList = window.speechSynthesis.getVoices();
  const greek = voicesList.filter(v => (v.lang || "").toLowerCase().startsWith("el"));

  if (sel) {
    sel.innerHTML = "";
    const list = greek.length ? greek : voicesList;
    list.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v.name;
      opt.textContent = `${v.name} (${v.lang})`;
      sel.appendChild(opt);
    });
    const savedName = localStorage.getItem("dinoquiz.voiceName");
    if (savedName && list.find(v => v.name === savedName)) sel.value = savedName;
    selectedVoice = list.find(v => v.name === sel.value) || list[0] || null;

    sel.addEventListener("change", () => {
      const chosen = voicesList.find(v => v.name === sel.value);
      if (chosen) {
        selectedVoice = chosen;
        localStorage.setItem("dinoquiz.voiceName", chosen.name);
      }
    });
  }
}

function speak(text) {
  if (!userInteracted) return; // μέχρι να πατηθεί κουμπί, δεν κάνουμε speak (autoplay policy)
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
  const img = $("#dinoImg");
  img.src = q.image; // θα «σπάει» μέχρι να μπουν τα αρχεία
  img.alt = "Εικόνα: " + q.image;

  $("#question").textContent = q.question;

  const answersEl = $("#answers");
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

// Αρχικό setup
window.addEventListener("DOMContentLoaded", () => {
  // 1) Ρύθμιση sliders από/σε localStorage
  const pitchSlider = $("#pitchSlider");
  const rateSlider  = $("#rateSlider");
  const pitchVal = $("#pitchVal");
  const rateVal  = $("#rateVal");
  if (pitchSlider && rateSlider) {
    pitchSlider.value = String(PITCH);
    rateSlider.value  = String(RATE);
    if (pitchVal) pitchVal.textContent = PITCH.toFixed(2);
    if (rateVal)  rateVal.textContent  = RATE.toFixed(2);
    pitchSlider.addEventListener("input", () => {
      PITCH = parseFloat(pitchSlider.value);
      localStorage.setItem("dinoquiz.pitch", String(PITCH));
      if (pitchVal) pitchVal.textContent = PITCH.toFixed(2);
    });
    rateSlider.addEventListener("input", () => {
      RATE = parseFloat(rateSlider.value);
      localStorage.setItem("dinoquiz.rate", String(RATE));
      if (rateVal) rateVal.textContent = RATE.toFixed(2);
    });
  }

  // 2) Φόρτωση φωνών (μερικές φορές έρχονται αργότερα)
  if (window.speechSynthesis.getVoices().length) loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

  // 3) Κουμπί δοκιμής φωνής (μετράει ως user gesture)
  const testBtn = $("#testVoice");
  if (testBtn) {
    testBtn.addEventListener("click", () => {
      userInteracted = true;
      speak("Γεια σου! Ας παίξουμε με τους δεινόσαυρους!");
    });
  }

  // 4) Κουμπί έναρξης: κρύβει το startScreen, δείχνει το quiz, αποδίδει την πρώτη ερώτηση & εκφώνηση
  const startBtn = $("#startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      userInteracted = true; // δίνει δικαίωμα για ήχο
      $("#startScreen").classList.add("hidden");
      $("#quizScreen").classList.remove("hidden");

      // Επέλεξε φωνή με προτίμηση ελληνικών, αν δεν έχει οριστεί
      if (!selectedVoice) loadVoices();

      current = 0;
      renderQuestion();
      $("#nextBtn").addEventListener("click", nextQuestion);
    });
  }
});
