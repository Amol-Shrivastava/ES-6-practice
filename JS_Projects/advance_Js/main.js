/* make a function constructor holding called Question-

- qUESTION
-ANSWER
-CORRECT ANSWER

 */
( function(){
  function Question(ques,arr,correct){
  this.question = ques;
  this.arr = arr;
  this.correct = correct;
  }

  //display of questions must be through a prototype
  Question.prototype.displayQuestion = function(){

  //'this' variable would point here to the question string
   console.log(this.question);

  //since options are in array we'd have to loop through all of them to display them
  for(let i = 0; i < this.arr.length ; i++){
   console.log(i + ': '+this.arr[i]);
  }

  }

  //to compare supplied answer with the correct answer we need a prototype

  Question.prototype.compareAnswer = function(answer , callback){
    let sc;

   if(answer === this.correct){
     console.log('Correct Answer!!!');
     sc = callback(true);
   }
   else{
     console.log('Wrong Answer.Try again:)');
     sc = callback(false);
   }

   this.displayScore(sc);
  }

  Question.prototype.displayScore = function(score){
    console.log('Your current score is: '+score);
    console.log('-----------------------------');
  }


//create a couple of questions

let q1 = new Question('What is the best scripting language?', ['Python', 'Ruby', 'JSON', 'Javascript'] , 3);

let q2 = new Question('Which is the most boring subject?' , ['English', 'DataStructure','Compiler Design'] , 2);

let q3 = new Question('Which is the most fun subject?' , ['English', 'WebDevelopement','Maths'] ,1);

let q4 = new Question('Which is the most important gadget?' , ['iphone', 'ipad','iMac'] ,0);

//store it in an array
let quest_bank = [q1, q2, q3 ,q4];

//we want score related things in a separate container --> score function can be made for it
function score(){
  var sc = 0;

  //return function need some parameter to update the score -->correct Answer
  return function(correct){
    if(correct){
      sc++;
    }

    return sc;
  }
}

//score function has to be used as object and also its return value i.e. sc needs to be stored
let keepScore = score();

//here due to closure, keepScore has access to sc variable of Score function


function nextQuestion(){

  //generate a random number
  let pull_number = Math.floor(Math.random() * (quest_bank.length));


  //Now we need to call this method for each question, hence for each question stored in the array
  quest_bank[pull_number].displayQuestion();

  //prompt for answer
  var answer = prompt('Please select your option');


if(answer !== 'exit'){

   //We need to check the answer only if ain't exit and convert it to integer for checking array thereafter
      quest_bank[pull_number].compareAnswer(parseInt(answer) ,keepScore);

  //recursively calls each time this Function inside only if the answer is not exit
      nextQuestion();
  }

}

//but we need to call this function first
nextQuestion();



})();

/* but we want that this code if transfered in some other program must not interfere in that program and
 for that we need to use IIFE */
