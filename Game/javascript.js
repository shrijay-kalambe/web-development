// Variables
var playing = false;
var score;
var timeRemaining;
var action;
var answer;
var questionCount;

// To start the game
document.getElementById("startreset").onclick = function() {
    // If we are already playing..
    if (playing == true) {
        // Reload the game..
        location.reload();
            
    }else{
        playing = true;
        
        // Set score to 0..
        questionCount = 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        
        show("timer");
        
        // Set timer to 60 sec..
        timeRemaining = 60;
        document.getElementById("remainingTime").innerHTML = timeRemaining;
        hide("gameover");
        // Change name to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        hide("instruction");
        startTimer();
        generateQA();
        questionCount += 1;
        document.getElementById("queCount").innerHTML = questionCount;

        
        
    }
}


// Functions...
function startTimer(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("remainingTime").innerHTML = timeRemaining;
        if (timeRemaining == 0) {
            stopCounting();
            show("gameover");
            if (score>=40) {
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>&#129321 Well Done!, Your Score is "+score+".</p>"
                
            } 
            else if(score>=20) {
                document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>&#128548 Good Job!, You can do better, Your Score is "+score+".</p>"
                    
                }
            else {
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>&#128549 Needs a little practice! Your Score is "+score+".</p>"
                
            }
            hide("correct");
            hide("wrong");
            hide("timer");
            
        } 
    }, 1000);
}

function generateQA() {
    var x = 1 + Math.round(Math.random()*9);
    var y = 1 + Math.round(Math.random()*9);
    answer = x*y;
    
    document.getElementById("question").innerHTML = x + " x " + y;

    var correctPosition = 1 + Math.round(Math.random()*3);
    document.getElementById("box"+ correctPosition).innerHTML = answer;
    var answerArray = [answer];

    
    for (let i = 1; i < 5; i++) {
        
        
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = ((1 + Math.round(Math.random()*9))*(1 + Math.round(Math.random()*9)));
            } while (answerArray.indexOf(wrongAnswer)>-1);
            
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answerArray.push(wrongAnswer);
        }
        // document.getElementById("box"+i).innerHTML = wrongAnswer;
    }

    

}

function stopCounting() {
    clearInterval(action);
}

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

function show(Id) {
    document.getElementById(Id).style.display = "block";
}
for (let m = 1; m < 5; m++) {//checking boxes one by one
    document.getElementById("box"+m).onclick = function(){//
        if (playing == true) {
            if (this.innerHTML == answer) {
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct");    
                }, 1000);
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                generateQA();
                questionCount += 1;
                document.getElementById("queCount").innerHTML = questionCount;
                
            } else {
                show("wrong");
                
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
                score--;
                document.getElementById("scorevalue").innerHTML = score;
                generateQA();
                questionCount += 1;
                document.getElementById("queCount").innerHTML = questionCount;
            }
        }
    }
}
