// Define main Game values
        let min = 1,
            max = 10,
            winningNum = Math.floor(Math.random()*(max-min+1)+min), //defined a function which will return a random INTEGER between min & max
            guessesLeft = 3;
        // NEW LEARN: we don't have to use 'let' or 'const' every time to define a variable. Just use ','(comma) instead of ';'(semicolon) and you can keep defining using 'let' or 'const' {& at the end, use the ';'}

// UI Elements
        const game = document.querySelector('#game'),
              minNum = document.querySelector('.min-num'),
              maxNum = document.querySelector('.max-num'),
              guessBtn = document.querySelector('#guess-btn'),
              guessInput = document.querySelector('#guess-input'),
              message = document.querySelector('.message');

//To Display the Min & Max in UI 
        minNum.textContent = min;
        maxNum.textContent = max;

// Play again event listener
        game.addEventListener('mousedown', function(e){
          if(e.target.className === 'play-again'){ //so th
            window.location.reload();
          }
        });
      
// Taking in the Guess & Processing The Guess
        guessBtn.addEventListener('click', function(){
          let guess = parseInt(guessInput.value);  // to convert the 'string'(which is the form in which the input will be logged) to 'number'
          //this will also give NaN in the console if we just click submit btn leaving the input blank
          
          // To check if the Input is valid of not
          // Player must guess a number between a min and max
          if(isNaN(guess) || guess < min || guess > max){
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
          }
            // Check if won
            else{
              if(guess === winningNum){
              // Game over - WON
                gameOver(true, `${winningNum} is correct, YOU WIN!`);

            } else {
              // Wrong number
                guessesLeft -= 1; //to decrease the no. of guesses

              if(guessesLeft === 0){
                // Game over - LOST
                  // Notify the player of the correct answer when loose
                    gameOver(false, `Game Over, YOU LOST! The correct number was ${winningNum}`);
              } else {
                // Game continues - answer wrong

                // Change border color
                guessInput.style.borderColor = 'red';

                // Clear Input
                guessInput.value = '';

                // Notify player of - wrong number & guesses remaining
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
              }
            }
          }
        });

// Game over
        function gameOver(won, msg){
          let color;
          won === true ? color = 'green' : color = 'red';

          // Disable input
          guessInput.disabled = true; //so that user can't enter any other no. after winning or losing, until they click play again 
          // Change border color
          guessInput.style.borderColor = color;
          // Set text color
          message.style.color = color;
          // Set message
          setMessage(msg);

          // PLay Again option At the end
          guessBtn.value = 'Play Again';
          guessBtn.className += 'play-again';
        }

// Set message
        function setMessage(msg, color){
          message.style.color = color;
          message.textContent = msg;
        }