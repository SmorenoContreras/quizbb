let currentQuestionIndex = 0;
let score = 0;
let timer;

const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const timerElement = document.getElementById('timer');
const gameOverContainer = document.getElementById('game-over');
const scoreElement = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const saveScoreBtn = document.getElementById('save-score-btn');

startBtn.addEventListener('click', startQuiz);

saveScoreBtn.addEventListener('click', saveScore);

// Sample quiz data
const quizData = [
    { question: 'Who is the goodest boy?', options: ['Nugget Mushu', 'Templeton', 'Satoru', 'All of the above'], correctAnswer: 'All of the above' },
    { question: 'In the film Ratatouille, Remy the rat, was an excellent', options: ['chef', 'sailor', 'pilot', 'doctor'], correctAnswer: 'chef' },
    { question: 'What is the name of the mad scientist in Phineas and Ferb?', options: ['Dr. Candace', 'Dr. Fischer', 'Mojo Jojo', 'Dr. Doofenshmirtz'], correctAnswer: 'Dr. Doofenshmirtz' },
    { question: 'What is the relationship between Rick and Morty?', options: ['Grandfather and grandson', 'Father and Son', 'Neighbors', 'Siblings'], correctAnswer: 'Grandfather and grandson' },
    // Add more questions as needed
];


function startQuiz() {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion();
    timer = setInterval(updateTimer, 1000);
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    } else {
        // Subtract time for incorrect answer
        // For simplicity, subtracting 10 seconds
        // You can customize the penalty as needed
        updateTimer(-10);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function updateTimer(seconds = 1) {
    const currentTimer = parseInt(timerElement.textContent, 10);
    const newTimer = Math.max(0, currentTimer + seconds);
    timerElement.textContent = newTimer;

    if (newTimer === 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    gameOverContainer.style.display = 'block';
    scoreElement.textContent = score;
}

function saveScore() {
    const initials = initialsInput.value.trim();

    if (initials !== '') {
        // Save the score and initials to your backend or local storage
        // For simplicity, just logging them in this example
        console.log('Initials:', initials);
        console.log('Score:', score);
    }

    // Reload the page or redirect to another page as needed
    location.reload();
}