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

// TODO: napsat funkci pro vykreslení otázky a kontrolu konce
function printQuestion(quiz){
  // Kontrola jestli jsme nakonci a vypsání Konec Kvízu! + score
  // Vem aktualní otázku a přepiš text otázky v html

  // Přepiš text odpovědí 
  array.forEach(element, index => {
    
  });
}

function handleClick(event, quiz){
  const vybranyIndex = parseInt(udalost.target.dataset.index);

  quiz.saveAnswer(vybranyIndex);
  
  printQuestion(quiz);
}

// Kód se musí spustit pouze pokud jsme na quiz.html
if (/* existuje kvízová otázka a odpovědi */){

  // TODO
  // Vytvoř nový kvíz
  // Posluchače pro každou odpověď
  // hint: 
  // NazevOdpovedi.forEach(element => {
  // element.PridatPosluchače('click', (event) => {
  //    handleClick(event, newQuiz)
  //    });
  // });
  // Vykresli otázku

}