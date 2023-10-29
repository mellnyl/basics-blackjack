var currentGameMode = 'First deal';
var playerCard = [];
var compCard = [];
var playerCardSum;
var compCardSum;

// Creating Card Deck
var makeDeck = function () {

  // Creating an empty deck
  var cardDeck = [];

  // Define suits array
  var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];

  // Loop over suits array
  for (var i = 0; i < suits.length; i += 1) {

    // Creating all 13 cards for each suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardPoint = rankCounter;

      if (cardName == 1) {
        cardName = 'Ace';
        cardPoint = 11;
      } else if (cardName == 11) {
        cardName = 'Jack';
        cardPoint = 10;
      } else if (cardName == 12) {
        cardName = 'Queen';
        cardPoint = 10;
      } else if (cardName == 13) {
        cardName = 'King';
        cardPoint = 10;
      };

      var card = {
        name: cardName,
        suit: suits[i],
        rank: rankCounter,
        point: cardPoint
      };

      cardDeck.push(card);

      rankCounter += 1;
    };
  };

  return cardDeck;

};

// Random Index for Shuffling
var getRandomIndex = function (max) {
  return Math.floor (Math.random() * max);
};

// Shuffling Card Deck
var shuffleDeck = function (cardDeck) {
  
  // Looping over card deck
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {

    // Random index to extract random card
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];

    // Extract current card
    var currentCard = cardDeck[currentIndex];

    // Swap positions of current & random cards
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex += 1;
  };
  return cardDeck;
};

// Print Card Output
var printCardArray = function (cardArray) {
  // Convert card array to string
  return cardArray.map(card => ' ' + card.name + ' of ' + card.suit);
};

var cardScore = function (currentHand) {
  var score = 0;
  for (var i = 0; i < currentHand.length; i += 1){
    score += currentHand[i].point;
  };
  return score;
};

var cardDeck = makeDeck();
var shuffledDeck = shuffleDeck(cardDeck);

var main = function (input) {

  // First Deal
  if (currentGameMode == 'First deal'){
    playerCard = [shuffledDeck.pop(), shuffledDeck.pop()];
    playerCardSum = cardScore(playerCard);
    compCard = [shuffledDeck.pop(), shuffledDeck.pop()];
    compCardSum = cardScore(compCard);
    console.log('Player Card', playerCard);
    console.log('Computer Card', compCard);

    if (compCardSum == 21) {
      currentGameMode = 'Game over';
      return `Computer got blackjack! You lose.`;

    } else if (playerCardSum == 21) {
      currentGameMode = 'Game over';
      return `You got blackjack, you win!`;

    } else {
      currentGameMode = 'Player move';
      return `Your cards are: ${printCardArray(playerCard)}, summing to ${playerCardSum}. <br>
      The computer's cards are: ${printCardArray(compCard)}, summing to ${compCardSum}. <br>
      Enter 'hit' or 'stand' to make your next move.`;
    };
  };
  
  // Player Hit
  if (currentGameMode == 'Player move') {

    while (input === 'hit') {

      // Player only can hit if less than 21
      if (playerCardSum < 21) {
        playerCard.push(shuffledDeck.pop());
        playerCardSum = cardScore(playerCard);
        console.log('Player Card', playerCard);
        console.log('Computer Card', compCard);

        if (playerCardSum >= 21) {
          for (i = 0; i < playerCard.length; i += 1){
            if (playerCard[i].name == 'Ace'){
              playerCard[i].point = 1;
              playerCardSum = cardScore(playerCard);
              return `Your cards are ${printCardArray(playerCard)}, summing to ${playerCardSum}. <br>
              The computer's cards are ${printCardArray(compCard)}, summing to ${compCardSum}. <br>
              Enter 'hit' or 'stand' to make your next move.`;
            };
          };
        };
        return `Your cards are ${printCardArray(playerCard)}, summing to ${playerCardSum}. <br>
        The computer's cards are ${printCardArray(compCard)}, summing to ${compCardSum}. <br>
        Enter 'hit' or 'stand' to make your next move.`;

      // Score above 21, check if there are Aces
      } else if (playerCardSum >= 21) {
          return `Your cards are ${printCardArray(playerCard)}, summing to ${playerCardSum}. <br>
          The computer's cards are ${printCardArray(compCard)}, summing to ${compCardSum}. <br>
          You cannot hit another card with your current sum. <br>
          Please enter 'stand' to continue the game.`;
          // };
      };
    };

  // Player Stand
   if (input === 'stand') {
    
    // Hit if Computer < 17, assume cannot hit if > 17
    while (compCardSum < 17) {
      compCard.push(shuffledDeck.pop());
      compCardSum = cardScore(compCard);
    };
    
    console.log('Player Card', playerCard);
    console.log('Computer Card', compCard);
    currentGameMode = 'Conclude game';
    } 

  // Conclude Game
  if (currentGameMode == 'Conclude game'){

    // Player <= 21
    if (playerCardSum <= 21) {
      
      if (playerCardSum < compCardSum && compCardSum <= 21) {
        return `Your cards are ${printCardArray(playerCard)}, summing to ${playerCardSum}. <br>
        The computer's cards are ${printCardArray(compCard)}, summing to ${compCardSum}. <br>
        You lose!`;

      } else if (playerCardSum > compCardSum) {
        return `Your cards are ${printCardArray(playerCard)}, summing to ${playerCardSum}. <br>
        The computer's cards are ${printCardArray(compCard)}, summing to ${compCardSum}. <br>
        You win!`;

      } else if (playerCardSum == compCardSum) {
        return `Your cards are ${printCardArray(playerCard)}, summing to ${playerCardSum}. <br>
        The computer's cards are ${printCardArray(compCard)}, summing to ${compCardSum}. <br>
        It's a draw!`;
      }

    } else {
      
      if (compCardSum <= 21) {
        return `Your cards are ${printCardArray(playerCard)}, summing to ${playerCardSum}. <br>
        The computer's cards are ${printCardArray(compCard)}, summing to ${compCardSum}. <br>
        You lose!`;

      } else {
        return `Your cards are ${printCardArray(playerCard)}, summing to ${playerCardSum}. <br>
        The computer's cards are ${printCardArray(compCard)}, summing to ${compCardSum}. <br>
        You both lose!`;
      }
    };
  };
};
};