
var score, activePlayer, roundScore, dice_output, gamePlaying, lastDice1, lastDice2;

dice_output1 = document.querySelector('.dice1');
dice_output2 = document.querySelector('.dice2');

function initial() {
  //initially all the scores must be 0

  score = [0, 0]; //global score
  roundScore = 0;
  activePlayer = 0;
  winscore = 100;

  //everytime a game initialises gameplaying must be true
  gamePlaying = true;


//initially when the game begins, no dice should appear
  dice_output1.style.display = "none";
  dice_output2.style.display = "none";

  //for player 1
  document.getElementById('score-0').innerText = '0';
  document.getElementById('current-0').innerText = '0';

  //for player 2
  document.getElementById('score-1').innerText = '0';
  document.getElementById('current-1').innerText = '0';

  //remove winner from previous winner player
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  //change previous winner heading to individual player name
  document.getElementById('name-0').innerText = 'Player 1';
  document.getElementById('name-1').innerText = 'Player 2';

  //remove previous player class from active state
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  //make player 1 active class
  document.querySelector('.player-0-panel').classList.add('active');

}


//game start

initial();

//when roll dice is clicked

document.querySelector('.btn-roll').addEventListener('click', function() {
if(gamePlaying){
  dice_output1.style.display = "block";
  dice_output2.style.display = "block";
  var dice1 = Math.floor((Math.random() * 6) + 1);
  dice_output1.src = "dice-" + dice1 + ".png";

  var dice2 = Math.floor((Math.random() * 6) + 1);
  dice_output2.src = "dice-" + dice2 + ".png";


    // // lastDice stores previous dice roll outcome
    // if(dice1 == 6 && lastDice1 == 6 || dice2 == 6 && lastDice2 == 6){
    //   score[activePlayer] = 0;
    //   document.querySelector('#score-' + activePlayer).innerText = 0;
    //   playerChange();
    // }

    //catering other outcomes
   if (dice1 !== 1 && dice2 !== 1) {

     //roundScore must be sum of both the roll outcomes
      roundScore += dice1 + dice2;
    document.getElementById('current-' + activePlayer).innerText = roundScore;
    }
       else {
      playerChange();
    }

    // //after each roll last dice value must be stored for first dice
    // lastDice1 = dice1;
    //
    // //after each roll last dice value must be stored for second dice
    // lastDice2 = dice2;
}
});


//when a user wants to hold the game
document.querySelector('.btn-hold').addEventListener('click', function() {

  if(gamePlaying){

    //add roundScore to the globalScore
    score[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).innerText = score[activePlayer];

    //player winning criteria

    //entering winning score
    var winscore = document.getElementById('winscore').value;

    //if score[activePlayer] > combined score of both the dice, then it wins
    if (score[activePlayer] >= winscore) {
      document.getElementById('name-' + activePlayer).innerText = 'Winner!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      //both the dices must disappear
      dice_output1.style.display = "none";
      dice_output2.style.display = "none";

      //gamePlaying must be turned to false
      gamePlaying = false;
    }
    else {
      playerTurn();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', initial);


//function to change turn of Player

function playerChange() {

  (activePlayer === 0) ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById('current-0').innerText = '0';
  document.getElementById('current-1').innerText = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  
}
