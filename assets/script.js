// Added variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');


const startingSeconds = 60;
let time = 60;

const countdownEl = document.getElementById("countdown");
var timer;

let shuffledQuestions, currentQuestionIndex

// Created event listener for Starting the game 
startButton.addEventListener('click', startGame);

// Created event listener for generating the next question
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
});

// function starts the game, hides the questions until it is selected, and begins countdown timer on click
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()

  timer = setInterval(updateCountdown, 1000);
};

// Ensures a random question is displayed next 
function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex])
};


// function displays the question and determines if question is correct or incorrect
function showQuestion(question) {
  questionElement.innerText = question.question
  answerButtonsElement.innerHTML = ''
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
};

// function resets the page and adds the next button
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
};

// function subtracts time if selected button is not correct 
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct

  if(selectedButton !== correct){
    time -=10
    countdownEl.textContent = time;
  }

  // function activates game over
  setStatusClass(document.body, correct)

  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    gameOver();
    startButton.classList.remove('hide')
  }
};

// function sets the status class and adds incorrect or correct 
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('incorrect')
  }
};

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('incorrect')
};

// Questions and possible answers for the quiz
const questions = [
  {
    question: "What is the purpose of JavaScript?",
    answers: [
      { text: "Creates the structure of the webpage", correct: false },
      { text: "Adds functionality and interactivity to the webpage", correct: true },
      { text: "Something to do with coffee", correct: false },
      { text: "Allows you to open and close the webpage", correct: false }
    ]
  },
  {
    question: "What is a funciton",
    answers: [
      { text: "Allows you to perform a task or calculates a value", correct: true },
      { text: "Allows you to change the title of the webpage", correct: false },
      { text: "Provides a faster loading time", correct: false },
      { text: "Only works with math equations", correct: false }
    ]
  },
  {
    question: "What does Console.log perform?",
    answers: [
      { text: "Adds style to the HTML", correct: false },
      { text: "Changes the layout of the HTML", correct: false },
      { text: "Runs a function", correct: false },
      { text: "Logs in the console in dev tools", correct: true }
    ]
  },
  {
    question: "Which is not a primitive value",
    answers: [
      { text: "Line", correct: true },
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Symbol", correct: false }
    ]
  }
]

// function for count down timer
function updateCountdown() {

  time--;

  countdownEl.textContent = time;


  if (time <= 0) {
     
    gameOver()
  }

}

// Function ends the game 
function gameOver() {
  clearInterval(timer)

  // need to display an input box and button to submit score and initials
  questionContainerElement.classList.add('hide')

  document.getElementById('initialsContainer').classList.remove('hide')

  var input =  document.createElement('input')
  input.setAttribute('id', 'initials')
  var submitBtn = document.createElement('button')
  submitBtn.textContent = 'SUBMIT'

  submitBtn.addEventListener('click', saveUser)

  document.getElementById('initialsContainer').append(input, submitBtn)

}

// function saves the users information upon submission
function saveUser(){
  var userInitials = document.getElementById('initials')
 console.log(userInitials.value)
 console.log(time)
}
