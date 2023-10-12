const resetGame = () => {
  const extractedElements = document.querySelectorAll(
    ".board-extracted-number"
  );
  extractedElements.forEach((element) => {
    element.classList.remove("board-extracted-number");
  });
};

// * creazione un contenitore per i numeri estratti
const numbersExtracted = [];

// * generazione un numero randomico 0-90
const getRandomNumber = () => {
  return Math.ceil(Math.random() * 90);
};

// * dichiarazione del bottone nuova partita
const newGameButton = document.querySelector("#new-game-button");

// * dichiarazione del bottone estrai numero
const extractNewNumber = document.querySelector("#extract-new-number");

// * dichiarazione il nome della cella del cartellone
const boardNumber = document.querySelectorAll("bingo-board td");

//* messa in ascolto il bottone estrai numero per mostrare il numero estratto
extractNewNumber.addEventListener("click", () => {
  const randomNumber = getRandomNumber();
  const newNumber = document.querySelector("#new-extracted-number");
  if (!numbersExtracted.includes(randomNumber)) {
    newNumber.innerHTML = randomNumber;
    numbersExtracted.push(randomNumber);
    numbersExtracted.forEach((number) => {
      const boardTd = document.querySelector(`.board-number-${number}`);
      if (boardTd) {
        boardTd.classList.add("board-extracted-number");
      }
    });
  }
});

newGameButton.addEventListener("click", resetGame);
