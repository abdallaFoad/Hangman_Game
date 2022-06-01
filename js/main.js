const theLetters = 'abcdefghijklmnopqrstuvwxyz';

let lettersArray = Array.from(theLetters);

let lettersContainer = document.querySelector('.letters');

//Genrate Letters
lettersArray.forEach(letter => {
  let span = document.createElement('span');
  let textSpan = document.createTextNode(letter);
  span.className = 'letter-box';
  span.appendChild(textSpan);
  lettersContainer.appendChild(span);
});

// Object of words and categoreis
let words = {
  programming: ['php', 'java script', 'html', 'css', 'python', 'go', 'my sql'],
  movies: ['Snakes', 'A Shawshank', ' A Clockwork', 'Psycho', 'Strange love', 'A pocalyps'],
  people: ['Steve Jobs', 'mark', 'Keith Raniere', 'Donald Trump', 'Stephen Hawking', 'Coco','Up'],
  countries: ['The Egypt', 'Lebanon', 'Morocco', 'Oman', 'Qatar', 'Saudi Arabia', 'Syria']
};
//Get random proprty

let theKeys = Object.keys(words);
//Get random number from keys length
let randomPorpNumber = Math.floor(Math.random() * theKeys.length);
//Category
let randomPropName = theKeys[randomPorpNumber];
//Category Words
let randomPropValue = words[randomPropName];

//Random number from words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
//Choose word 
let randomValueValue = randomPropValue[randomValueNumber];

//Set category info
document.querySelector('.game-info .category span').innerHTML = randomPropName;

//Get the letters guess container
let letterGuessContainer = document.querySelector('.letters-geuss');

//Add the random word in array
let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach(letter => {
  //create span
  let span = document.createElement('span');

  //if word has space
  if(letter === ' '){
    span.className = 'has-space';
  }
  //Append span in the letter guess container
  letterGuessContainer.appendChild(span);
});

let gessSpans = document.querySelectorAll('.letters-geuss span');

//The default wrong
let wrong = 0;

//Select the draw element
let theDraw  = document.querySelector('.hangman-draw');

// Default Choose States 
let theStatus = false;

document.addEventListener('click', (e) => {

  // Default Choose States 
  let theStatus = false;

  if(e.target.className === 'letter-box'){
    e.target.classList.add('clicked');

    //The clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();

    //The chosen word
    let chooseWord = Array.from(randomValueValue.toLowerCase());

    chooseWord.forEach((wordLetter, wordIndex) => {
      if(clickedLetter == wordLetter){
        
        //Status correct
        theStatus = true;

        gessSpans.forEach((span, spanIndex) => {
          if(wordIndex === spanIndex){
            span.innerHTML = clickedLetter;
          }
        });
      }
    });

    //If letter is wrong
    if(theStatus !== true){
      //Incremant wrong
      wrong++;
      //Add class wrong on the draw element
      theDraw.classList.add(`Wrong-${wrong}`);
      //Play fail sound
      document.getElementById('fail').play();

      //If the number worng over 8
      if(wrong === 2){
        //Add class finised on the letter container
        lettersContainer.classList.add('finised');
        //End game function
        endGame();
      }
    } else {
      //Play success sound
      document.getElementById('success').play();
    }

  }
});

//End game function
function endGame() {
  //Create div
  let div = document.createElement('div');
  //Create span
  let span = document.createElement('span');
  //Create text node
  let textDiv = document.createTextNode(`Game Over The Word is ${randomValueValue}`);
  //Append text in the span
  span.appendChild(textDiv);
  //Add class name on the span
  span.className = 'span';
  //Append text in the div
  div.appendChild(span);
  //Add class name on the div
  div.className = 'popup';
  //Add div in the body
  document.body.appendChild(div);
}
