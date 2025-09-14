const teamA = localStorage.getItem('teamA') || "فريق 1";
const teamB = localStorage.getItem('teamB') || "فريق 2";
let scoreA = 0;
let scoreB = 0;
let currentQuestion = 0;
let currentTeam = true; // true للفريق الأول، false للثاني

function renderQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const container = document.getElementById('gameContainer');
  container.innerHTML = `
    <h2>السؤال للفريق: ${currentTeam ? teamA : teamB}</h2>
    <div class="question">${questions[currentQuestion].question}</div>
    <input type="text" id="answer" placeholder="اكتب الإجابة هنا">
    <button onclick="submitAnswer()">إرسال</button>
    <div class="scores">
      <span>${teamA}: ${scoreA}</span> | <span>${teamB}: ${scoreB}</span>
    </div>
  `;
}

window.submitAnswer = function() {
  const input = document.getElementById('answer');
  const answer = input.value.trim();
  if (answer === "") return alert("الرجاء كتابة الإجابة!");
  if (answer === questions[currentQuestion].answer) {
    if (currentTeam) scoreA++;
    else scoreB++;
    alert("إجابة صحيحة!");
  } else {
    alert("إجابة خاطئة!");
  }
  currentTeam = !currentTeam;
  if (!currentTeam) currentQuestion++;
  renderQuestion();
}

function showResults() {
  const container = document.getElementById('gameContainer');
  let winner = "";
  if (scoreA > scoreB) winner = `الفائز هو: ${teamA}`;
  else if (scoreB > scoreA) winner = `الفائز هو: ${teamB}`;
  else winner = "تعادل!";
  container.innerHTML = `
    <h2>انتهت المسابقة</h2>
    <div class="scores">
      <span>${teamA}: ${scoreA}</span> | <span>${teamB}: ${scoreB}</span>
    </div>
    <h3>${winner}</h3>
    <button onclick="window.location='index.html'">العودة للرئيسية</button>
  `;
}

renderQuestion();