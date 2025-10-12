// Your code here
//Should be 5 questions at least
var questionsArr = [
  {
    question: "Which one is a dog breed?",
    answer: "Schipperke",
    options: ["British Shorthair", "Spynx", "Korat", "Schipperke"],
  },
  {
    question: "Where did the Australian Shepherd originate from?",
    answer: "United States",
    options: ["England", "Australia", "United States", "Mexico"],
  },
  {
    question: "Where does the Shiba Inu originate from?",
    answer: "Japan",
    options: ["Japan", "China", "Korea", "Vietnam"],
  },
  {
    question: "What is not a dog from Japan?",
    answer: "Chow Chow",
    options: ["Shiba Inu", "Akita", "Chow Chow", "Kai Ken"],
  },
  {
    question: "What is the most common dog name?",
    answer: "Luna",
    options: ["Kevin", "Luna", "Dave", "Stuart"],
  },
];

//Create start button with ID start-quiz, append to the div quiz
var timerId;
var questionNum = 0;
var correctAnswer = 0;
var score;
var quiz = document.getElementById("quiz");
var scoreDisplay = document.createElement("p");
var startBtn = document.createElement("button");
var question = document.createElement("p");
var divBtns = document.createElement("div");
var option1 = document.createElement("button");
var option2 = document.createElement("button");
var option3 = document.createElement("button");
var option4 = document.createElement("button");
var countDown = document.createElement("p");
startBtn.setAttribute("id", "start-quiz");
startBtn.textContent = "Start Quiz!";
quiz.appendChild(startBtn);

//Start the game, initial state
startBtn.onclick = function () {
  startBtn.remove();
  quizGame();
  startTimer();
};

function quizGame() {
  if (questionNum >= questionsArr.length) {
    console.log("end of game");
    endGame();
  } else {
    question.textContent = questionsArr[questionNum].question;
    option1.textContent = questionsArr[questionNum].options[0];
    option2.textContent = questionsArr[questionNum].options[1];
    option3.textContent = questionsArr[questionNum].options[2];
    option4.textContent = questionsArr[questionNum].options[3];
    countDown.textContent = "30";
    quiz.appendChild(question);
    quiz.appendChild(divBtns);
    divBtns.appendChild(option1);
    divBtns.appendChild(option2);
    divBtns.appendChild(option3);
    divBtns.appendChild(option4);
    quiz.appendChild(countDown);
  }
}

quiz.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" && e.target.textContent !== "Start Quiz!") {
    if (e.target.textContent === questionsArr[questionNum].answer) {
      console.log("correct");
      correctAnswer += 1;
      questionNum += 1;
      quizGame();
    } else {
      console.log("wrong");
      questionNum += 1;
      quizGame();
    }
    if (questionNum >= questionsArr.length) {
      questionNum = 0;
      quizGame();
    }
  }
});

//end game function
function endGame() {
  score = (correctAnswer / questionsArr.length) * 100;
  scoreDisplay.textContent = "Your Results: " + Math.round(score) + "%";
  questionNum = 0;
  correctAnswer = 0;
  quiz.appendChild(scoreDisplay);
  quiz.appendChild(startBtn);
  question.remove();
  divBtns.remove();
  countDown.remove();
  stopTimer();
}

//timer function
function startTimer() {
  timerId = setInterval(function () {
    var time = Number(countDown.textContent);
    if (time > 0) {
      countDown.textContent = time - 1;
    } else {
      console.log("timed out");
      questionNum += 1;
      quizGame();
    }
  }, 1000);
}

//stop timer
function stopTimer() {
  clearInterval(timerId);
}
