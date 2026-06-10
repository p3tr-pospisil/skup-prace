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

class Question {
    constructor(difficulty, questionText, answers, rightAnswer) {
        this.difficulty = difficulty;
        this.questionText = questionText;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    }
}

// Databáze pro naše kvízy
// TODO: Naplnit naši 'databázi' využítím třídy Question
// hint: Mělo by to být jedno velké pole plné new Question('obtiznost', 'Text otázky', [pole s odpověďmi], číslo indexu správné odpovědi)
const questionsData = [
    new Question('easy', "Jak je těžký tank?", ["10 tun", "60 tun", "200 tun", "5 tun"], 1),
    new Question('easy', "Kolik bitů tvoří jeden bajt?", ["4 bity", "8 bitů", "16 bitů", "32 bitů"], 1),
    new Question('easy', "Který protokol se standardně používá pro bezpečné prohlížení webových stránek?", ["HTTP", "FTP", "HTTPS", "SMTP"], 2),
    new Question('easy', "V jaké číselné soustavě pracují digitální počítače na nejnižší úrovni?", ["Binární (dvojkové)", "Šestnáctkové", "Desítkové", "Osmičkové"], 0),
    new Question('easy', "Který z následujících pojmů označuje škodlivý software?", ["Shareware", "Firmware", "Freeware", "Malware"], 3),

    new Question('normal', "Která komponenta počítače slouží jako superrychlá, ale dočasná paměť pro běžící aplikace?", ["SSD disk", "Pevný disk (HDD)", "Operační paměť (RAM)", "Flash disk"], 2),
    new Question('normal', "Jak se jmenuje operační systém s otevřeným zdrojovým kódem (open-source), jehož symbolem je tučňák Tux?", ["Windows", "macOS", "Linux", "Android"], 2),
    new Question('normal', "Co dělá v počítači grafická karta (GPU)?", ["Počítá zvukové efekty", "Zpracovává obrazová data a posílá je do monitoru", "Ukládá soubory uživatele", "Zajišťuje internetové připojení"], 1),
    new Question('normal', "Která legendární hra z roku 1993 zpopularizovala žánr stříleček z pohledu první osoby (FPS)?", ["Doom", "Minecraft", "Counter-Strike", "Pac-Man"], 0),
    new Question('normal', "Která zkratka označuje moderní, velmi rychlé úložiště bez pohyblivých částí?", ["HDD", "SSD", "DVD", "RAM"], 1),

    new Question('hard', "V kterém roce byl veřejnosti představen první iPhone, který odstartoval éru moderních smartphonů?", ["2005", "2007", "2009", "2010"], 1),
    new Question('hard', "Jak se jmenuje první programovatelný elektronický počítač na světě, dokončený v USA během 2. světové války?", ["ENIAC", "IBM PC", "Commodore 64", "Amiga"], 0),
    new Question('hard', "Co znamená zkratka IP v kontextu počítačové sítě (např. IP adresa)?", ["Internal Protocol", "Internet Protocol", "Information Path", "Instant Process"], 1),
    new Question('hard', "Který programovací jazyk, vytvořený v 90. letech Guidem van Rossumem, má ve svém znaku dva hady?", ["Java", "C++", "Python", "Ruby"], 2),
    new Question('hard', "Jak se říká útoku, při kterém se útočník snaží zahltit server obrovským množstvím požadavků z mnoha různých počítačů, aby ho shodil?", ["Phishing", "DDoS", "Spyware", "Ransomware"], 1)
]

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
const difficultyBtns = document.querySelectorAll(".difficulty-btn");

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

  questionEl.textContent = question.questionText;

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
if (quizContainer) {
  const difficulty = localStorage.getItem("difficulty");

  // Vyfiltrovat otázky podle obtížnosti
  const questionsFiltered = questionsData.filter(question => question.difficulty === difficulty);

  // Vytvoř nový kvíz
  // TODO: Použij již vyfiltrované otázky
  const quiz = new Quiz(questionsFiltered);


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
if (difficultyBtns.length > 0) {
  difficultyBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      const difficulty = event.target.textContent.trim().toLowerCase();

      localStorage.setItem("difficulty", difficulty);

      window.location.href = "quiz.html";
    }); 
  });
}