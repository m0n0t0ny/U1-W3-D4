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

document
  .getElementById("generate-player-cards")
  .addEventListener("click", function () {
    const numberOfCards = parseInt(
      document.getElementById("number-of-cards").value
    );
    const container = document.querySelector(".player-cards");

    function generateRandomNumbers(count) {
      const numbers = [];
      while (numbers.length < count) {
        const randomNum = Math.floor(Math.random() * 90) + 1;
        if (!numbers.includes(randomNum)) {
          numbers.push(randomNum);
        }
      }
      return numbers;
    }

    container.innerHTML = "";

    for (let i = 0; i < numberOfCards; i++) {
      const playerCard = document.createElement("div");
      playerCard.className = "player-card";

      const table = document.createElement("table");
      const tbody = document.createElement("tbody");

      for (let row = 0; row < 3; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < 5; col++) {
          const td = document.createElement("td");
          const numbers = generateRandomNumbers(15);
          td.textContent = numbers[col + row * 5];
          td.classList.add("card-number-" + numbers[col + row * 5]);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }

      table.appendChild(tbody);
      playerCard.appendChild(table);
      container.appendChild(playerCard);
    }
  });
