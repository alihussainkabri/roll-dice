
var computerScore = 0;
var userScore = 0;
var turn = 'user';
var turnCount = 0;
var arrResult = [];
var currentScore = 0;
var confirmationDialogue = false;
var enabledKey = false;
var currentPlayer = 'You';


function checkPatterns()
{

/*	arrColors = [];
	for( var i =0; i<arrSubmittedColors.length; i++)
	{
		arrColors.push(rgbToHex(arrSubmittedColors[i]));
	}
	
	
	
	
	0: "ff0000"
	3: "ffff00"
	2: "0000ff"
	2: "00ff00
	1: "800080"
	0: "ffa500"
	
*/	
	
	//2+2+2
	//arrColors = new Array('0000ff','0000ff','0000','0000','00ff00','00ff00');
	
	//3+3
	//arrColors = new Array('0000ff','0000ff','0000ff','00ff00','00ff00','00ff00');
	
	//4+2
	//arrColors = new Array('0000ff','0000ff','0000ff','0000ff','00ff00','00ff00');
	
	//5 of a color
	//arrColors = new Array('0000ff','0000ff','0000ff','0000ff','0000ff','00ff00');
	
	//rainbow
	//arrColors = new Array('0000ff','000ff0','00ff00','0ff000','ff0000','00ff12');
	
	//6 of a color
	//arrColors = new Array('0000ff','0000ff','0000ff','0000ff','0000ff','0000ff');
	
	//console.log('and the colors are ',arrColors);
	
	//arrColors = [1,1,1,2,1,2];
	

	confirmationDialogue = false;
	var countingItem;
	arrResult = [];
	
	if(turn == 'user'){
		while(arrColors.length > 0)
		{
			countingItem = arrColors.pop();
			var result = 1;
			
			for( i = arrColors.length -1; i>= 0; i--)
			{
				if (arrColors[i] == countingItem)
				{
					result++;
					arrColors.splice(i,1);
				}
			}
			//console.log(countingItem,' is found this times ',result);
			arrResult.push({item:countingItem,repeatCount:result});
			//countItems(countingItem,arr);
		}
/*	
	if(turn == 'user')
		totalScore = userScore;
	else
		totalScore = computerScore;	
*/	//console.log(arrResult);
	
		evaluateScore();
		if(confirmationDialogue == false)
			checkCounts();  
	}
	else{//machine.js
		checkRoll();
		
	}
	
	
	
	//console.log('arrcolors score is ',arrColors);
}

function evaluateScore()
{
	if(arrResult.length == 1){
		//win 6 of color
		//"You got 6 of a color and won the game!"
		showTextMessage(currentPlayer + ' got 6 of a color and won the game!');
		//document.getElementById("audioRobotLose").play();
		document.getElementById("audioPlayerWin").play();
		userScore = 100;
		glowScore(1);
	}
	else if(arrResult.length == 6){
		//rainbow
		//"You ROLLED-A-RAINBOW for 50 points! " + (this.currentRoll < 2 ? "Keep this score?" : ""
		currentScore = 50;
		if(turnCount<3){
				showTextMessage(currentPlayer + 'ROLLED-A-RAINBOW for 50 points! Keep this score?');
				showConfirmationDialogues();
			}
			else{
				showTextMessage(currentPlayer + ' ROLLED-A-RAINBOW for 50 points!');
				keepScore();
			}
		document.getElementById("audioRainbow").play();
		//userScore += 50;
		glowScore(2);
		
	}
	else if(arrResult.length == 2) {//can be 5 of color, 4+2, 3+3
		if(arrResult[0].repeatCount == 5 || arrResult[1].repeatCount == 5)	
		{//5 of color
			//"You got 5 of a kind for 40 points! " + (this.currentRoll < 2 ? "Keep this score?" : ""
			currentScore = 40;
			if(turnCount<3){
				showTextMessage(currentPlayer + 'got 5 of a kind for 40 points! Keep this score?');
				document.getElementById("audioRainbow").play();
				showConfirmationDialogues();
			}
			else{
				showTextMessage(currentPlayer + ' got 5 of a kind for 40 points!');
				keepScore();
			}	
			
			if(turnCount == 3 && userScore > 60)
				document.getElementById("audioSad").play();
			else
				document.getElementById("audioPlayerScore").play();
				
			//userScore += 40;	
			glowScore(3);
			
		}
		else if(arrResult[0].repeatCount == 4 || arrResult[1].repeatCount == 4)	{//4+2
			//"You got 4 of a kind with a pair for 30 points! " + (this.currentRoll < 2 ? "Keep this score?" : ""
			
			currentScore = 30;
			if(turnCount<3){
				showTextMessage(currentPlayer + 'got 4 of a kind with a pair for 30 points! Keep this score?');
				showConfirmationDialogues();
			}
			else{
				showTextMessage(currentPlayer + ' got 4 of a kind with a pair for 30 points!');
				keepScore();
			}	
			if(turnCount == 3 && userScore > 70)
				document.getElementById("audioSad").play();
			else
				document.getElementById("audioPlayerScore").play();
			//userScore += 30;
			glowScore(4);	
			
		}
		else if(arrResult[0].repeatCount == 3 || arrResult[1].repeatCount == 3)	
		{//3+3
			//"You got 2 groups of 3 colors for 20 points! " + (this.currentRoll < 2 ? "Keep this score?" : ""
			
			currentScore = 20;	
			if(turnCount<3){
			
				showTextMessage(currentPlayer + 'got 2 groups of 3 colors for 20 points! Keep this score?');
				showConfirmationDialogues();
			}
			else{
				showTextMessage(currentPlayer + ' got 2 groups of 3 colors for 20 points!');
				keepScore();
			}
			
			if(turnCount == 3 && userScore > 80)
				document.getElementById("audioSad").play();
			else
				document.getElementById("audioPlayerScore").play();
							
	
			//userScore += 20;
			glowScore(5);	
			
		}
	}
	else if(arrResult.length == 3){// can be 2+2+2
		if(arrResult[0].repeatCount == 2 && arrResult[1].repeatCount == 2 && arrResult[2].repeatCount == 2)	
		{//2+2+2
			//"You got 3 color pairs for 10 points! " + (this.currentRoll < 2 ? "Keep this score?" : ""
			currentScore = 10;
			if(turnCount<3)
			{
				showTextMessage(currentPlayer + 'got 3 color pairs for 10 points! Keep this score?');
				showConfirmationDialogues();
			}
			else{
				showTextMessage(currentPlayer + ' got 3 color pairs for 10 points!');	
				keepScore();
			}
			document.getElementById("audioPlayerScore").play();
			//userScore += 10;
			glowScore(6);
				
		}
	}
	
	;
	if(userScore == 100){
		//this.replayButton.visible = true;
		showTextMessage('You won the game. Congratulations !');
		document.getElementById("audioPlayerWin").play();
		showReplay();
	}

}


function checkCounts(){
	
	
    
    if(turnCount == 3){
	    turnCount = 0;
	    document.getElementById('roll-btn').style.visibility = 'hidden';
	    
	    if(turn == 'user')
		{
			turn = 'computer';
			currentPlayer = 'The computer';
			$('#player-div').removeClass('active-player').addClass('deactive-player');
			document.getElementById('player-turn').style.visibility = 'hidden';
			$('#comp-div').removeClass('deactive-player').addClass('active-player');
			document.getElementById('comp-turn').style.visibility = 'visible';    
			showTextMessage("It's the computer's turn.");
			setTimeout(startRoll,2000);
		}
		else{
			turn = 'user';
			currentPlayer = 'You';
			$('#comp-div').removeClass('active-player').addClass('deactive-player');
			document.getElementById('comp-turn').style.visibility = 'hidden';
			$('#player-div').removeClass('deactive-player').addClass('active-player');
			document.getElementById('player-turn').style.visibility = 'visible';
			
			document.getElementById('player-turn').style.visibility = 'hidden';
			document.getElementById('roll-btn').style.visibility = 'visible';    
			showTextMessage("Its your turn. Roll the dice!");
	    }
	    
	    
	    
	    
	}
	else{
		
		if(turn == 'computer')
		{	
			//automate roll btn
			setTimeout(startRoll,2000);
			//turnCount++;
			//$('#comp-turn-count').text(turnCount);
		}
		else{
			document.getElementById('roll-btn').style.visibility = 'visible';
			showTextMessage("Click on the colors (or press 1-6 on your keyboard) you want to keep. Then roll again.");
			enabledKey = true;
		}
	}
	
	
}	 


function updateScore(){
	
	if(turn == 'user')
	{
		//update user Score
		// 
		if(userScore>100){
			userScore = userScore - 100;
			
		}
		
		$('#user-score').html(userScore);
	}
	else
	{
		//update computer Score
		//alert('computers new score is ',computerScore);
		if(computerScore>100){
			computerScore = computerScore - 100;
			
		}
		$('#computer-score').html(computerScore);
	}
		
}
	    


function showConfirmationDialogues(){
	//$('#h2-second').hide();
	$('#roll-btn').hide();
	$('#confirm-btn-div').show();
	//$('#result-score-confirmation').html(currentScore);
	confirmationDialogue = true;
}



//if third time, automatically score should be accepted

// keep score
function keepScore(){
    //let score = $('#player-turn-span-score').html();
    //let new_score = $('#result-score-confirmation').html();
    //let total_score = parseInt(score) + parseInt(new_score);
    //$('#player-turn-span-score').html(total_score);
    //$('#h2-second').show();
    $('#roll-btn').show();
    $('#confirm-btn-div').hide();
    turnCount = 0;
    // alert('User score should be updated and users new score is ' + currentScore);
/*    
    if(turn == 'user'){
		userScore = userScore + currentScore;
		//alert(userScore);	
	}
	else{
		computerScore = computerScore + currentScore;	
		//alert(computerScore);
	}
*/	
	userScore = userScore + currentScore;
	updateScore();
	
	if(userScore == 100){
		//this.replayButton.visible = true;
		showTextMessage('You won the game. Congratulations !');
		document.getElementById("audioPlayerWin").play();
		showReplay();
	}
	else{
		checkCounts();
		document.getElementById("audioGo").play();
		showTextMessage("It's your turn. Roll the dice!");
    }
    //currentScore = 0;
    // Turn should be reset and invisible as well
    // Score should be updated

}



// discard the score
function discardScore(){
    //$('#h2-second').show();
    $('#roll-btn').show();
    $('#confirm-btn-div').hide();
    showTextMessage("Click on the colors (or press 1-6 on your keyboard) you want to keep. Then roll again.");
    enabledKey = true;
    checkCounts();
}

function showTextMessage(msg){
	$('#h2-second').show();
    $('#h2-second').text(msg);
}




document.addEventListener('keypress', function (e) {
            const current_key = e.key;

            
            if (current_key >0 && current_key<7 && enabledKey) {
            	console.log(arrPlanes,' pressed key is ',current_key);
            	toggleTick(current_key - 1);	            
            }
            
            
            
        })


function showReplay(){
    $('#game-over-div').show();
    // this function is to show game over message with replay btn
}
function replay(){
    // replay btn function
    
    currentScore = 0;
    computerScore = 0;
	userScore = 0;
	updateScore();
		
	arrResult = [];
//var currentScore = 0;
	confirmationDialogue = false;
	
	var opponentScoreLevel = 0;
	var arrComputerSelectionMap = [];
	arrColors = ['x','x','x','x','x','x'];
	arrPlanes = ['x','x','x','x','x','x'];


	$('#game-over-div').hide();
	
	turnCount = 3;
	turn = 'computer';
	checkCounts()
			
//	showTextMessage("It's your turn. Roll the dice!");
//   document.getElementById("audioGo").play();
    
}


function randomRange(minNum, maxNum) 
{
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}



//It's your turn. Roll the dice!
//Click on the colors (or press 1-6 on your keyboard) you want to keep. Then roll again.
