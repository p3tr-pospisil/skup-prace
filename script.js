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

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.answers = [];
    }
}