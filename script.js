
const questions = [
  {
    q: "Bagaimanakah teknologi membantu pembentukan negara bangsa?",
    options: [
      "Menyebarkan maklumat tanpa semakan",
      "Menghubungkan rakyat dan menggalakkan kerjasama",
      "Mengasingkan masyarakat",
      "Menggantikan semua interaksi sosial"
    ],
    answer: 1,
    explain: "Teknologi membantu komunikasi dan kerjasama apabila digunakan secara bertanggungjawab."
  },
  {
    q: "Apa yang patut dilakukan apabila menerima berita sensitif yang belum disahkan?",
    options: [
      "Terus berkongsi",
      "Menambah andaian",
      "Menyemak sumber dan bukti",
      "Menyalahkan satu komuniti"
    ],
    answer: 2,
    explain: "Semak sumber, tarikh dan bukti sebelum mempercayai atau berkongsi berita."
  },
  {
    q: "Apakah contoh kesan negatif teknologi?",
    options: [
      "Pembelajaran dalam talian",
      "Kerjasama antara negeri",
      "Penyebaran maklumat palsu",
      "Perkongsian warisan budaya"
    ],
    answer: 2,
    explain: "Maklumat palsu boleh menimbulkan salah faham dan menjejaskan keharmonian."
  },
  {
    q: "Apakah maksud menghormati maruah manusia dalam ruang digital?",
    options: [
      "Menghina pandangan berbeza",
      "Menyebarkan gambar tanpa izin",
      "Mengkritik idea secara sopan",
      "Memaksa orang bersetuju"
    ],
    answer: 2,
    explain: "Kita boleh berbeza pendapat tanpa menghina identiti atau latar belakang orang lain."
  },
  {
    q: "Pilih tindakan yang menyokong perpaduan.",
    options: [
      "Membina projek digital tentang budaya pelbagai komuniti",
      "Menyebarkan kandungan kebencian",
      "Mengabaikan fakta",
      "Menyebarkan khabar angin"
    ],
    answer: 0,
    explain: "Projek digital yang inklusif boleh meningkatkan persefahaman antara masyarakat."
  }
];

let current = 0;
let score = 0;
let answered = false;
let selectedVote = "";

function startQuiz() {
  current = 0;
  score = 0;
  renderQuestion();
}

function renderQuestion() {
  const q = questions[current];
  const question = document.getElementById("question");
  const options = document.getElementById("options");
  const feedback = document.getElementById("feedback");
  const next = document.getElementById("next");
  const result = document.getElementById("result");
  const progress = document.getElementById("progress");

  if (!question || !options) return;

  answered = false;
  question.textContent = q.q;
  options.innerHTML = "";
  feedback.textContent = "";
  result.textContent = "";
  next.disabled = true;
  next.textContent = current === questions.length - 1
    ? "Lihat keputusan 🏆"
    : "Soalan seterusnya →";

  document.getElementById("count").textContent =
    `Soalan ${current + 1} daripada ${questions.length}`;

  progress.style.width = `${current / questions.length * 100}%`;

  q.options.forEach((text, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = `${String.fromCharCode(65 + index)}. ${text}`;
    button.onclick = () => chooseAnswer(index, button);
    options.appendChild(button);
  });
}

function chooseAnswer(index, chosenButton) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const all = document.querySelectorAll("#options .option");

  all.forEach((button, i) => {
    button.disabled = true;
    if (i === q.answer) button.classList.add("correct");
  });

  if (index === q.answer) {
    score++;
    document.getElementById("feedback").textContent =
      "✅ Betul! " + q.explain;
  } else {
    chosenButton.classList.add("wrong");
    document.getElementById("feedback").textContent =
      "Belum tepat. " + q.explain;
  }

  document.getElementById("next").disabled = false;
}

function nextQuestion() {
  if (!answered) return;

  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    document.getElementById("question").textContent = "Misi selesai!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("count").textContent = "Keputusan akhir";
    document.getElementById("progress").style.width = "100%";
    document.getElementById("next").disabled = true;

    const result = document.getElementById("result");
    result.innerHTML = `
      <h2>🏆 Skor anda: ${score}/${questions.length}</h2>
      <p>${score >= 4
        ? "Hebat! Anda memahami peranan teknologi dalam pembentukan negara bangsa."
        : "Teruskan belajar dan cuba lagi untuk meningkatkan skor anda."}</p>
      <button class="btn primary" onclick="startQuiz()">Cuba semula ↻</button>
      <a class="btn secondary" href="index.html">Kembali ke utama</a>
    `;
  }
}

function selectVote(button, value) {
  selectedVote = value;
  document.querySelectorAll(".vote-option").forEach(item => {
    item.classList.remove("correct");
  });
  button.classList.add("correct");
  document.getElementById("voteMessage").textContent =
    "Pilihan anda: " + value;
}

function submitVote() {
  const message = document.getElementById("voteMessage");

  if (!selectedVote) {
    message.textContent = "Pilih satu jawapan dahulu.";
    return;
  }

  message.textContent =
    "Terima kasih! Undian demo anda ialah: " + selectedVote +
    ". Untuk mengumpulkan undian semua audiens, sambungkan borang dalam talian.";
}

function submitFeedback() {
  const input = document.getElementById("comment");
  const message = document.getElementById("commentMessage");

  if (!input.value.trim()) {
    message.textContent = "Sila tulis maklum balas dahulu.";
    return;
  }

  message.textContent =
    "Terima kasih atas maklum balas anda. Nota ini hanya dipaparkan dalam pelayar ini.";
}

document.addEventListener("DOMContentLoaded", renderQuestion);
