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
var button = document.createElement("button");
button.setAttribute("id", "start-quiz");
button.textContent = "Start Quiz!";
quiz.appendChild(button);
