// Define your questions with options and correct answers

window.onload = function()
{
    alert("WELCOME TO THE QUIZ !")
}

const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Ge", "Au", "Ag"],
        correctAnswer: "Au"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    }
];

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;
let timer;

// DOM elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const timerElement = document.getElementById('timer');


// Function to start the timer for the current question
function startTimer() {
    let timeRemaining = 30; // 30 seconds per question
    timer = setInterval(function () {
        timerElement.innerHTML = "Timer:"+timeRemaining;
        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            clearInterval(timer);
            checkAnswer(null); // Time's up, check answer with null (no selected option)
        }
    }, 1000); // Update every 1 second
    
}

// Function to display a question and its options
function displayQuestion() {
    
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(optionElement);
    });

    // Start the timer for this question
    startTimer();
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    clearInterval(timer); // Stop the timer

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Incorrect!";
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        nextButton.style.display = 'block';
    } else {
        displayFinalScore();
    }
}

// Function to display the final score
function displayFinalScore() {
    questionElement.textContent = '';
    optionsContainer.innerHTML = '';
    resultElement.textContent = '';
    scoreElement.textContent = `Your Score: ${score} out of ${questions.length}`;
    nextButton.style.display = 'none';
    restartButton.style.display = 'block';
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerHTML='';
    displayQuestion();
    restartButton.style.display = 'none';
}

// Add event listeners
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    }
});

restartButton.addEventListener('click', restartQuiz);

// Initialize the quiz by displaying the first question
displayQuestion();



