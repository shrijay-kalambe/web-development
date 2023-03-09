//If we click on start/reset button
var playing = false;
var score;
var timeremaining;
var action;
var correctAnswer;
document.getElementById("startreset").onclick=function(){
    
    //If we are playing
    if(playing == true){
        //Reload the page
        location.reload();
    }

    //If we are not playing
    else{
        //Reset the score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        playing=true;
        //show countdown
        // document.getElementById("remainingtime").style.display = "block";
        show("remainingtime");
        
        timeremaining = 60;
        document.getElementById("remainingtimevalue").innerHTML = timeremaining;
        startCountdown();
        //Reduce time by 1 sec

            //If time left 
                //Yes--> Continue
    }       //Else 
                //No-->Show Game Over Msg
                //Change Button to Start Game

        //Change button text to Reset Game
        document.getElementById("startreset").innerHTML = "Reset Game";
        //Hide Game Over Message
        hide("gameOver");
        //Generate new question and answer
        generateQA();
        
        
        

}
    
function startCountdown() {
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("remainingtimevalue").innerHTML=timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            // document.getElementById("gameOver").style.display = "block";
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your Score is "+ score +".</p>";
            // document.getElementById("remainingtime").style.display = "block";
            hide("remainingtime");
            hide("correct");
            hide("wrong");
            playing = false;
            //Change button text to Reset Game
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);

}   
        
function stopCountdown() {
    clearInterval(action);
}       
function show(Id) {
    document.getElementById(Id).style.display = "block";
}               
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}          
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x +"x"+ y;
    
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];
    
    for (let i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random()))*(1 + Math.round(9 * Math.random()));
            } while (answers.indexOf(wrongAnswer)>-1 );
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
        
    }
}

for (let j = 1; j < 5; j++) {
    document.getElementById("box"+j).onclick = function(){
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        } 
            
            
    };
    
    
}

//If we click on Answer box
    //If we are playing
        //If Ans is correct
            //Increase score by 1
            //Show correct answer for 1 sec
            //generate new QnA
        //If Answer is wrong
            //Show try again box for 1sec
        
    //If we are not playing
        //No action