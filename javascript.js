//Add game modal

const boardDiv = document.querySelector("#game-board");
const totalMovesScore = document.querySelector(".total-moves");
const matchingPairsScore = document.querySelector(".matching-pairs-score");
const modal = document.querySelector(".modal");
const winningMessage = document.querySelector(".winning-message");

let cards = ["🎉", "🍕", "🦄", "🐶", "🍻", "🔥", "🦊", "🤑", "🍔", "🌮"];
let cardsPaired = [];
let totalMoves = 0;
let matchingPairMoves = 0;
let nameMatch = [];
let flipCount = 0;
let matchingCards = [];
let j = 0;

function gameReset() {
  document.getElementById("game-board").innerHTML = "";
  totalMovesScore.textContent = 0;
  matchingPairsScore.textContent = 0;
  cardsPaired = [];
  totalMoves = 0;
  matchingPairMoves = 0;
  nameMatch = [];
  flipCount = 0;
  matchingCards = [];
  j = 0;
}

function main() {
  //Create card pairs array
  for (let i = 0; i < cards.length * 2; i++) {
    if (j >= cards.length) j = 0;
    cardsPaired.push(cards[j]);
    j++;
  }

  //Randomize cards
  cardsPaired.sort(() => 0.5 - Math.random());

  //Create cards
  for (let i = 0; i < cardsPaired.length; i++) {
    const flipCard = document.createElement("div");
    const flipCardInner = document.createElement("div");
    const flipCardFront = document.createElement("div");
    const flipCardBack = document.createElement("div");

    flipCard.classList.add("flip-card");
    flipCardInner.classList.add("flip-card-inner");
    flipCardFront.classList.add("flip-card-front");
    flipCardBack.classList.add("flip-card-back");

    boardDiv.appendChild(flipCard);
    flipCard.appendChild(flipCardInner);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);

    flipCardBack.textContent = cardsPaired[i];
  }

  document.querySelectorAll(".flip-card-inner").forEach((flipCard) => {
    flipCard.addEventListener("click", () => {
      //Flip card on card click
      flipCard.classList.add("flip-card-flip", "disable-click");

      //Add card name to array to compare matching cards with conditional later.
      nameMatch.push(flipCard.textContent);

      //Count each time the cards are clicked/flipped
      flipCount++;

      //Match the card values if two are flipped
      if (flipCount >= 2) {
        //Add to totalMoves count

        totalMoves++;
        totalMovesScore.textContent = totalMoves;

        //disable clicks after 2 cards have been flipped
        document.querySelectorAll(".flip-card-inner").forEach((flipCard) => {
          flipCard.classList.add("disable-click");
        });

        //If cards flipped do match
        if (nameMatch[0] === nameMatch[1]) {
          //Add card value to matching cards array
          matchingCards.push(flipCard.textContent);

          //Enable clicking again, except for matching cards
          document.querySelectorAll(".flip-card-inner").forEach((flipCard) => {
            if (!matchingCards.includes(flipCard.textContent))
              flipCard.classList.remove("disable-click");
          });

          matchingPairMoves++;
          matchingPairsScore.textContent = matchingPairMoves;

          //Else they don't match
        } else {
          //Delay flip back
          window.setTimeout(function () {
            //Skip every card thats already matched (on matchingCard Array)
            document
              .querySelectorAll(".flip-card-inner")
              .forEach((flipCard) => {
                //IF name is in matchingCards, don't not flip back
                if (!matchingCards.includes(flipCard.textContent))
                  flipCard.classList.remove("flip-card-flip", "disable-click");
              });
          }, 1000);
        }

        //Display winning modal display
        if (matchingPairMoves >= 10 && totalMoves < 30) {
          modal.classList.remove("hide1");
          console.log("Hey");
          winningMessage.textContent = "Grand Prize";
        } else if (matchingPairMoves >= 10) {
          modal.textContent = "Here's your participation trophy";
          modal.classList.remove("hide2");
        }
        //Reset variables / clear array
        flipCount = 0;
        nameMatch = [];
      }
    });
  });
}
//Change card array based on difficulty
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    gameReset();
    main();
  });
});
main();
