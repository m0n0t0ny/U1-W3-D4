const resetGame = () => {
  const extractedElements = document.querySelectorAll(
    ".board-extracted-number"
  );
  extractedElements.forEach((element) => {
    element.classList.remove("board-extracted-number");
    element.classList.remove("called");
  });
  numbersExtracted = [];
};

let numbersExtracted = [];

const getRandomNumber = () => {
  let randomNum;
  do {
    randomNum = Math.ceil(Math.random() * 90);
  } while (numbersExtracted.includes(randomNum));
  return randomNum;
};

const newGameButton = document.querySelector("#new-game-button");
const extractNewNumber = document.querySelector("#extract-new-number");
const boardNumber = document.querySelectorAll("bingo-board td");

extractNewNumber.addEventListener("click", () => {
  const randomNumber = getRandomNumber();
  const newNumber = document.querySelector("#new-extracted-number");
  const playerCards = document.querySelectorAll(".player-card");
  playerCards.forEach((playerCard) => {
    const playerCardNumbers = playerCard.querySelectorAll("td");
    playerCardNumbers.forEach((td) => {
      const number = parseInt(td.textContent);
      if (number === randomNumber) {
        td.classList.add("player-extracted-number");
        td.classList.add("called");
      }
    });
  });
  if (!numbersExtracted.includes(randomNumber)) {
    newNumber.innerHTML = randomNumber;
    numbersExtracted.push(randomNumber);
    numbersExtracted.forEach((number) => {
      const boardTd = document.querySelector(`.board-number-${number}`);
      if (boardTd) {
        boardTd.classList.add("board-extracted-number");
        boardTd.classList.add("called");
      }
    });

    checkForBingoBoardCinquina();
  }

  playerCards.forEach((playerCard) => {
    const playerCardRows = playerCard.querySelectorAll("tr");
    playerCardRows.forEach((row) => {
      if (areAllTDCalled(row)) {
        row.classList.add("cinquina");
        console.log("Cinquina!");
      }
    });

    if (areAllRowsCinquina(playerCard)) {
      playerCard.classList.add("tombola");
    }
  });
});

function areAllTDCalled(row) {
  const tds = row.querySelectorAll("td");
  for (const td of tds) {
    if (!td.classList.contains("called")) {
      return false;
    }
  }
  return true;
}

function areAllRowsCinquina(playerCard) {
  const rows = playerCard.querySelectorAll("tr.cinquina");
  return rows.length === 3;
}

function checkForBingoBoardCinquina() {
  const bingoBoardRows = document.querySelectorAll("bingo-board tr");
  bingoBoardRows.forEach((row) => {
    if (areAtLeast5TDCalled(row)) {
      console.log("Cinquina!");
    }
  });
}

newGameButton.addEventListener("click", resetGame);

document.getElementById("generate-player-cards");
newGameButton.addEventListener("click", function () {
  const numberOfCards = parseInt(
    document.getElementById("number-of-cards").value
  );
  const container = document.querySelector(".player-cards");

  container.innerHTML = "";

  for (let i = 0; i < numberOfCards; i++) {
    const playerCard = document.createElement("div");
    playerCard.className = "player-card";

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    const numbersInCard = [];

    for (let row = 0; row < 3; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 5; col++) {
        const td = document.createElement("td");
        let currentNumber;
        do {
          currentNumber = getRandomNumber();
        } while (numbersInCard.includes(currentNumber));
        numbersInCard.push(currentNumber);
        td.textContent = currentNumber;
        td.classList.add("card-number-" + currentNumber);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    playerCard.appendChild(table);
    container.appendChild(playerCard);
  }
});
