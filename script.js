"use strict";
// TODO: Logika projektu
// reference na tlačítka apod
// class Quiz (atributy metody)

// Promíchání pole
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // The loop repeats until there are elements to mix
    randomIndex = Math.floor(Math.random() * currentIndex); // Select the remaining element.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Swapping with the current element.
    array[randomIndex], array[currentIndex]];
  }
  return array; // Returning the shuffled array
}

// Data pro naše kvízy
const questionsData = [
  { 
    text: "Jak je těžký tank?", 
    answers: ["10 tun", "60 tun", "200 tun", "5 tun"], 
    rightAnswer: 1 // index
  },
  // TODO: Doplnit data
]

// Naše hlavní třída pro kvíz
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
    }

    // Vratí aktualní otázku
    getCurrentQuestion(){
      // TODO
    }

    // Uloží odpověď a posune kvíz dál
    saveAnswer(currentIndex){
      // TODO: porovnání odpovědí a případný inkrement skore
      // inkrement currentIndex
    }

    // Zjistí jestli jsme na konci kvízu
    isQuizActive(){
      // TODO
    }
}

// TODO: Propojení s HTML
// hint: question, answer, quizContainter

const questionEl = document.querySelector(".question");
const answerEls = document.querySelectorAll(".answer");
const quizContainer = document.querySelector(".quizContainer");


// TODO: napsat funkci pro vykreslení otázky a kontrolu konce
function printQuestion(quiz){

  // KONEC KVÍZU
  if (!quiz.isQuizActive()) {
    questionEl.textContent = `Konec kvízu! Score: ${quiz.score}`;
    answerEls.forEach(el => {
      el.style.display = "none";
    });
    return;
  }

  // AKTUÁLNÍ OTÁZKA
  const question = quiz.getCurrentQuestion();

  questionEl.textContent = question.text;

  // ODPOVĚDI
  answerEls.forEach((element, index) => {
    element.textContent = question.answers[index];
    element.dataset.index = index;
  });
}

function handleClick(event, quiz){
  const vybranyIndex = parseInt(event.target.dataset.index);

  quiz.saveAnswer(vybranyIndex);

  printQuestion(quiz);
}

// Kód se musí spustit pouze pokud jsme na quiz.html
if (document.querySelector(".quizContainer")) {

  // Vytvoř nový kvíz
  const quiz = new Quiz(questionsData);

  // Posluchače pro každou odpověď
  answerEls.forEach((element) => {
    element.addEventListener("click", (event) => {
      handleClick(event, quiz);
    });
  });

  // Vykresli první otázku
  printQuestion(quiz);
}