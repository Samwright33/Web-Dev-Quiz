    const startButton = document.getElementById('start-btn')
    const nextButton = document.getElementById('next-btn')
    const questionContainerElement = document.getElementById('question-container')
    const questionElement = document.getElementById('question')
    const answerButtonsElement = document.getElementById('answer-buttons')
    
    var timerElement = document.querySelector(".timer-count");
    var timer;
    var timerCount;
    var score;

    let shuffledQuestions, currentQuestionIndex
    
    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', () => {
      currentQuestionIndex++
      setNextQuestion()
    })
    
    function startGame() {
      startButton.classList.add('hide')
      shuffledQuestions = questions.sort(() => Math.random() - .5)
      currentQuestionIndex = 0
      questionContainerElement.classList.remove('hide')
      setNextQuestion()
      startTimer()
    }
    
    function setNextQuestion() {
      resetState()
      showQuestion(shuffledQuestions[currentQuestionIndex])
    }
    
    function showQuestion(question) {
      questionElement.innerText = question.question
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
    }
    
    function resetState() {
      clearStatusClass(document.body)
      nextButton.classList.add('hide')
      while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
      }
    }
    
    function selectAnswer(e) {
      const selectedButton = e.target
      const correct = selectedButton.dataset.correct
      setStatusClass(document.body, correct)
      Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
      })
      if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
      } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
      }
    }
    
    function setStatusClass(element, correct) {
      clearStatusClass(element)
      if (correct) {
        element.classList.add('correct')
      } else {
        element.classList.add('incorrect')
      }
    }
    
    function clearStatusClass(element) {
      element.classList.remove('correct')
      element.classList.remove('incorrect')
    }
    
    const questions = [
        {
    question: "What is javascript",
    answers: [
        { text: "4", correct: true },
        { text: "300", correct: false },
        { text: "Winter", correct: false },
        { text: "IDK", correct: false }
             ]
     },
     {
        question: "What is a funciton",
        answers: [
            { text: "4", correct: true },
            { text: "300", correct: false },
            { text: "Winter", correct: false },
            { text: "IDK", correct: false }
                 ]
     },
     {
        question: "What are third party APIs",
        answers: [
            { text: "4", correct: true },
            { text: "300", correct: false },
            { text: "Winter", correct: false },
            { text: "IDK", correct: false }
                 ]
     },
     {
        question: "What is the zoo",
        answers: [
            { text: "4", correct: true },
            { text: "300", correct: false },
            { text: "Winter", correct: false },
            { text: "IDK", correct: false }
                 ]
     }
    ]