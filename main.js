# test
document.addEventListener('DOMContentLoaded', function() {
  // Quiz variabelen
  let currentQuestionIndex = 0;
  let score = 0;
  const vragen = [
      {
          vraag: "Wat betekent SQL?",
          antwoorden: [
              "Structured Query Language",
              "Simple Question Language",
              "Standard Query Logic",
              "System Query Language",
          ],
          correctAntwoord: 0,
      },
      {
          vraag: "Welk commando gebruik je om gegevens uit een tabel te selecteren?",
          antwoorden: ["GET", "SELECT", "EXTRACT", "QUERY"],
          correctAntwoord: 1,
      },
      {
          vraag: "Hoe verwijder je alle records uit een tabel zonder de tabel zelf te verwijderen?",
          antwoorden: [
              "DELETE TABLE",
              "DROP TABLE",
              "TRUNCATE TABLE",
              "REMOVE TABLE",
          ],
          correctAntwoord: 2,
      },
      {
          vraag: "Welk sleutelwoord gebruik je om dubbele rijen uit queryresultaten te verwijderen?",
          antwoorden: ["UNIQUE", "DISTINCT", "DIFFERENT", "ONLY"],
          correctAntwoord: 1,
      },
      {
          vraag: "Welke functie telt het aantal rijen in een resultaat?",
          antwoorden: ["NUMBER()", "AMOUNT()", "COUNT()", "SUM()"],
          correctAntwoord: 2,
      },
      {
          vraag: "Hoe voeg je een nieuwe rij toe aan een tabel?",
          antwoorden: ["ADD ROW", "CREATE ROW", "INSERT INTO", "NEW RECORD"],
          correctAntwoord: 2,
      },
      {
          vraag: "Wat is de standaard poort voor MySQL?",
          antwoorden: ["80", "3306", "5432", "1521"],
          correctAntwoord: 1,
      },
      {
          vraag: "Welk commando gebruik je om een database te maken?",
          antwoorden: [
              "CREATE DATABASE",
              "MAKE DATABASE",
              "NEW DATABASE",
              "BUILD DATABASE",
          ],
          correctAntwoord: 0,
      },
      {
          vraag: "Welk type join retourneert alle rijen uit beide tabellen?",
          antwoorden: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
          correctAntwoord: 3,
      },
      {
          vraag: "Hoe wijzig je de structuur van een bestaande tabel?",
          antwoorden: ["CHANGE TABLE", "MODIFY TABLE", "ALTER TABLE", "UPDATE TABLE"],
          correctAntwoord: 2,
      },
  ];

  // DOM elementen
  const questionElement = document.getElementById('question');
  const answerButtons = document.querySelectorAll('.btn');
  const nextButton = document.getElementById('Next-button');
  const scoreElement = document.querySelector('.score p:first-child');
  const questionCountElement = document.querySelector('.score p:last-child');
  const newGameButton = document.querySelector('.New-Game');
  const showHighscoreButton = document.querySelector('.Show-Higscore');
  const saveGameButton = document.querySelector('.Save-Game');
  const loadGameButton = document.querySelector('.Load-Game');
  const homeButton = document.querySelector('.Home-btn');

  // Initialiseer de quiz
  function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      showQuestion();
      updateScore();
  }

  // Toon de huidige vraag
  function showQuestion() {
      const currentQuestion = vragen[currentQuestionIndex];
      questionElement.textContent = currentQuestion.vraag;

      answerButtons.forEach((button, index) => {
          button.textContent = currentQuestion.antwoorden[index];
          button.dataset.index = index;
          button.classList.remove('correct', 'incorrect');
          button.disabled = false;
      });

      questionCountElement.textContent = `Question: ${currentQuestionIndex + 1}/${vragen.length}`;
      nextButton.style.display = 'none';
  }

  // Controleer het antwoord
  function checkAnswer(selectedIndex) {
      const currentQuestion = vragen[currentQuestionIndex];
      const isCorrect = selectedIndex === currentQuestion.correctAntwoord;

      if (isCorrect) {
          score++;
          answerButtons[selectedIndex].classList.add('correct');
      } else {
          answerButtons[selectedIndex].classList.add('incorrect');
          answerButtons[currentQuestion.correctAntwoord].classList.add('correct');
      }

      updateScore();
      disableAllButtons();
      nextButton.style.display = 'block';
  }

  // Update de score
  function updateScore() {
      scoreElement.textContent = `Score: ${score} |`;
  }

  // Schakel alle antwoordknoppen uit
  function disableAllButtons() {
      answerButtons.forEach(button => {
          button.disabled = true;
      });
  }

  // Toon de volgende vraag of eindig de quiz
  function showNextQuestion() {
      currentQuestionIndex++;
      if (currentQuestionIndex < vragen.length) {
          showQuestion();
      } else {
          endQuiz();
      }
  }

  // Eindig de quiz
  function endQuiz() {
      questionElement.textContent = `Quiz afgerond! Je score is ${score}/${vragen.length}`;
      answerButtons.forEach(button => {
          button.style.display = 'none';
      });
      nextButton.style.display = 'none';
      
      // Toon highscore knop
      showHighscoreButton.style.display = 'block';
  }

  // Sla het spel op
  function saveGame() {
      const gameState = {
          currentQuestionIndex,
          score
      };
      localStorage.setItem('quizGameState', JSON.stringify(gameState));
      alert('Spel opgeslagen!');
  }

  // Laad het spel
  function loadGame() {
      const savedGame = localStorage.getItem('quizGameState');
      if (savedGame) {
          const gameState = JSON.parse(savedGame);
          currentQuestionIndex = gameState.currentQuestionIndex;
          score = gameState.score;
          showQuestion();
          updateScore();
          alert('Spel geladen!');
      } else {
          alert('Geen opgeslagen spel gevonden.');
      }
  }

  // Toon highscore
  function showHighscore() {
      const highscore = localStorage.getItem('quizHighscore') || 0;
      alert(`Je hoogste score is: ${highscore}`);
  }

  // Update highscore
  function updateHighscore() {
      const currentHighscore = localStorage.getItem('quizHighscore') || 0;
      if (score > currentHighscore) {
          localStorage.setItem('quizHighscore', score);
      }
  }

  // Event listeners
  answerButtons.forEach(button => {
      button.addEventListener('click', () => {
          checkAnswer(parseInt(button.dataset.index));
      });
  });

  nextButton.addEventListener('click', showNextQuestion);
  newGameButton.addEventListener('click', startQuiz);
  showHighscoreButton.addEventListener('click', showHighscore);
  saveGameButton.addEventListener('click', saveGame);
  loadGameButton.addEventListener('click', loadGame);

  // Home knop - ga terug naar index.html
  if (homeButton) {
      homeButton.addEventListener('click', () => {
          window.location.href = 'index.html';
      });
  }

  // Start de quiz
  startQuiz();
});
