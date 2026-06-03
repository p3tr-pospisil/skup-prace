"use strict";
// TODO: Vzhled (Otázky jsou dlouhé), Obtížnost, Doplnit data, refator, chore

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

// Databáze pro naše kvízy
// TODO: Naplnit naši 'databázi' využítím třídy Question
// hint: Mělo by to být jedno velké pole plné new Question('obtiznost', 'Text otázky', [pole s odpověďmi], číslo indexu správné odpovědi)
const questionsData = {
  easy: [
    new Question('easy', "Jak je těžký tank?", ["10 tun", "60 tun", "200 tun", "5 tun"], 1),
    new Question('easy', "Kolik bitů tvoří jeden bajt?", ["4 bity", "8 bitů", "16 bitů", "32 bitů"], 1),
    new Question('easy', "Který protokol se standardně používá pro bezpečné prohlížení webových stránek?", ["HTTP", "FTP", "HTTPS", "SMTP"], 2),
    new Question('easy', "V jaké číselné soustavě pracují digitální počítače na nejnižší úrovni?", ["Binární (dvojkové)", "Šestnáctkové", "Desítkové", "Osmičkové"], 0),
    new Question('easy', "Který z následujících pojmů označuje škodlivý software?", ["Shareware", "Firmware", "Freeware", "Malware"], 3)
  ]
};

class Question {
    constructor(difficulty, questionText, answers, rightAnswer) {
        this.difficulty = difficulty;
        this.questionText = questionText;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
    }

    // Vratí aktualní otázku
    getCurrentQuestion() {
        return this.questions[this.currentQuestion];
    }

    // Uloží odpověď a posune kvíz dál
    saveAnswer(currentIndex) {
      const currentQuestionData = this.getCurrentQuestion();

      // porovnání odpovědí a případný inkrement skore
      if (currentIndex === currentQuestionData.rightAnswer) {
        this.score++;
      }

      this.currentQuestion++;
    }

    // Zjistí jestli jsme na konci kvízu
    isQuizActive(){
      return this.currentQuestion < this.questions.length;
    }
}

const questionEl = document.querySelector(".question");
const answerEls = document.querySelectorAll(".answer");
const quizContainer = document.querySelector(".quizContainer");
// TODO: Přidat propojení s obztížnostmi
const difficultyBtns


// Vykreslení otázky a kontrola konce
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

// Zpracování kliknutí na odpověď
function handleClick(event, quiz){
  const vybranyIndex = parseInt(event.target.dataset.index);

  quiz.saveAnswer(vybranyIndex);

  printQuestion(quiz);
}

// Kód pro quiz.html
// TODO: fix: Vylepšit podmínku abychom zabránili redundanci kódu
// hint: Zkusme využít to co už máme o pár řádků výše
if (document.querySelector(".quizContainer")) { // <-- vylepšení podmínky

  // TODO: načtení obtížnosti z localStorage
  // hint: localStorage.getItem('ItemCoHledame')
  // Otázka k zamyšlení: Co když uživatel nevybral obtížnost?
  const difficulty

  // TODO: Vyfiltrovat otázky podle obtížnosti
  // hint: Využijte vestavěnou metodu .filter(item => podminka)
  const questionsFiltered

  // Vytvoř nový kvíz
  // TODO: Použij již vyfiltrované otázky
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

// Kód pro obtiznost.html
// TODO: Doplnit logiku
// hint: Zkusme využít to co už máme o pár řádků výše u té podmínky
if (/* Jestli jsme na stránce obtiznost.html */) {

  // TODO: přidat posluchače na tlačítka s obtížnostmi a uložit si jejich hodnotu do localStorage
  // hint: localStorage.setItem('JmenoItemuCoUkladame', item),
  // použijte .trim() metodu pro event.target.textContent 
  // přidání posluchačů bude stejné jako u answerEls,
  // pro přesměrování na další stránku využíte window.location.href = "quiz.html"
}