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
    answer: "Shiba Inu",
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
var quiz = document.getElementById("quiz");
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

//Display questions
startBtn.addEventListener("click", function () {
  startBtn.remove();
  question.textContent = questionsArr[0].question;
  option1.textContent = questionsArr[0].options[0];
  option2.textContent = questionsArr[0].options[1];
  option3.textContent = questionsArr[0].options[2];
  option4.textContent = questionsArr[0].options[3];
  countDown.textContent = "30";
  quiz.appendChild(question);
  quiz.appendChild(divBtns);
  divBtns.appendChild(option1);
  divBtns.appendChild(option2);
  divBtns.appendChild(option3);
  divBtns.appendChild(option4);
  quiz.appendChild(countDown);
  timer();
})

//timer function
function timer(){
var timerId = setInterval(function () {
  var time = Number(countDown.textContent);
  if (time > 0) {
    countDown.textContent = time - 1;
  } 
}, 1000);
}