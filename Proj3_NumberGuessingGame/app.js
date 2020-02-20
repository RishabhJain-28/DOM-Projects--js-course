const guessInput = document.getElementById('guess-input'),
      guessBtn = document.getElementById('guess-btn'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      UImessasge = document.querySelector('.message'),
      game = document.getElementById('game');

let min=1,
    max=10,
    guessesLeft=3,
    ans=generateAns();
minNum.textContent=min;
maxNum.textContent=max;
console.log(ans);
function generateAns(){
    return Math.floor(Math.random()*(max-min +1 ) + min);
}

function loadEventListener(){
    guessBtn.addEventListener('click',checkAns);
}

function checkAns(e){
    let guess = parseInt(guessInput.value);
 // console.log(guess);
    
    if( isNaN(guess) || guess<min || guess>max){ // cant do guess===NaN
        setMessage(`Please enter a number between ${min} and ${max}`,'red'); 
    }else if(guess===ans){
        gameOver(true,`${ans} is correct, You Win`);

    }else{
        guessesLeft--;
        
        if(guessesLeft===0){
            gameOver(false,`Game Over, you lost. The correct number was ${ans}.`);
        }else{
            guessInput.value='';
            guessInput.style.borderColor='red';
            setMessage(`Wrong ans, you have ${guessesLeft} guesses left`,'red')
        }
    }

}
function gameOver(won, msg){

   let col = ((won===true)? 'green':'red');
    guessInput.disabled = true; 
    guessInput.style.borderColor=col;
    setMessage(msg,col);
    guessBtn.value = 'Play again'; 

    guessBtn.removeEventListener('click',checkAns);
    guessBtn.addEventListener('click',reloadPage);   
    
}
function reloadPage(e){
    console.log(1);
    window.location.reload();
    
}

function setMessage(message,color){
    UImessasge.style.color =color;
    UImessasge.textContent = message; 
}

//main
loadEventListener();