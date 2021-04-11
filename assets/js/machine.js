var opponentScoreLevel = 0;
var arrComputerSelectionMap = [];
var sudRepeat = false;


function checkRoll(){
	var automaticWin = false;
	sudRepeat = false;
	//arrColors = [2, 2, 2, 2, 2, 4];
	//arrColors = tmp[dummyCount];
	//console.log(' FINAL ARR COLORS ARE ',arrColors);
	//trace('for Analysing scoreLevel, board list are ',this.board.rolledList);
	var scoreLevel = getScoreLevel(arrColors);
	
	opponentScoreLevel = scoreLevel;
	console.log(scoreLevel,' is score level');
	//scoreLevel = 1;
	
	if(scoreLevel > 0 && scoreLevel <= 6){
		if(turnCount == 3){
			opponentScored();
		}
	}
	else if(scoreLevel == 6){
		this.opponentScored();
		automaticWin = true;	
	}
	
	
	
	if(!automaticWin){
		
				
		if(turnCount == 3){

				if(computerScore != 100){
					//turnCount = 0;
					//this.robotTimer.start();
					if(sudRepeat){
						turnCount = 0;
						setTimeout(computerCheck,2000,null);
					}
					else
						checkCounts();
					
				}	
		}else{
			
				var selectionMap = [];
				if(opponentScoreLevel > 0){
					arrComputerSelectionMap = discardRoll(arrColors, turnCount == 2, computerScore);
					if(!arrComputerSelectionMap){
						turnCount = 0;
						opponentScored();
					}
				}else{
					arrComputerSelectionMap = chooseSelection(arrColors, turnCount == 2, computerScore);
					console.log('computerSelectionMap ',arrComputerSelectionMap);
				}
				if(computerScore != 100){
					//this.robotTimer.start();
					setTimeout(computerCheck,2000,arrComputerSelectionMap);
				}
				
			
		}
				
	}
}
			
	
	function opponentScored(){
			
			
				var message;
				var skipSounds = false;
				//var overflow = false;
				var str = '';
				console.log('opponent score ',opponentScoreLevel);
				
				switch(this.opponentScoreLevel){
					case 1:
						sudRepeat = true;
						computerScore += 10;
						glowScore(6);
						str = "The computer hit 3 color pairs for 10 points"
						
						if(computerScore == 100){
							skipSounds = true;
							showTextMessage(str + " and won.");
							document.getElementById("audioRobotWin").play();
						}
						else
							showTextMessage(str);	

						
						//message = this.activePlayer.name + "The computer hit 3 color pairs for 10 points";
						//this.addScore(10);
						//message += this.activePlayer.score == 100 ? " and won." : ".";
						//this.hint222.play();
						break;
					case 2:
						str = "The computer hit 2 groups of 3 colors for 20 points";
						sudRepeat = true;
						computerScore += 20;
						glowScore(5);
						if(computerScore == 100){
							skipSounds = true;
							showTextMessage(str + " and won.");
							document.getElementById("audioRobotWin").play();
						}
						else
							showTextMessage(str);
							
						
									
						//this.addScore(20);
						//message += this.activePlayer.score == 100 ? " and won." : ".";
						//this.hint33.play();
						//overflow = computerScore < 20;
						break;
					case 3:
						sudRepeat = true;
						str = "The computer hit 4 of a kind with a pair for 30 points";
						computerScore += 30;
						glowScore(4);
						if(computerScore == 100){
							skipSounds = true;
							showTextMessage(str + " and won.");
							document.getElementById("audioRobotWin").play();
						}
						else
							showTextMessage(str);
							
						//this.addScore(30);
						//message += this.activePlayer.score == 100 ? " and won." : ".";
						//this.hint42.play();
						//overflow = computerScore < 30;
						break;
					case 4:
						str = "The computer hit 5 of a kind for 40 points";
						sudRepeat = true;
						
						glowScore(3);
						
							
						
						
						computerScore += 40;
						
						if(computerScore == 100){
							skipSounds = true;
							showTextMessage(str + " and won.");
							document.getElementById("audioRobotWin").play();
						}
						else
							showTextMessage(str);	
								
						//this.addScore(40);
						//message += this.activePlayer.score == 100 ? " and won." : ".";
						//this.hint5.play();
						//overflow = computerScore < 40;
						break;
					case 5:
						str = "The computer ROLLED-A-RAINBOW";
						sudRepeat = true;
						turnCount = 0;
						computerScore += 50;
						glowScore(2);
						if(computerScore == 100){
							showTextMessage(str + " and won.");
							document.getElementById("audioRobotWin").play();
						}
						else{	
							showTextMessage(str);	
							document.getElementById("audioRainbow").play();
						}//this.addScore(50);	
						//message += this.activePlayer.score == 100 ? " and won." : ".";
						//this.hintRainbow.play();
						
						//SoundManager.playRainbow();
						skipSounds = true;
						break;
					case 6:
						str = "The computer hit 6 of a color and won.";
						turnCount = 0;
						computerScore = 100;
						glowScore(1);
						if(computerScore == 100)
							showTextMessage(str);
						//else
						//	showTextMessage(str);	
						//this.hint6.play();
						//if(this.withComputer){
						//	document.getElementById("audioRobotLose").play();
							//SoundManager.playRobotLose();
							//this.replayButton.visible = true;
						//}else{
							//document.getElementById("audioPlayerLose").play();
							document.getElementById("audioRobotWin").play();
							//SoundManager.playHumanLose();
						//}
						skipSounds = true;
						break;
				}
				
				if(!skipSounds){
					if(turnCount == 3 && computerScore > 100)
						document.getElementById("audioSad").play();
					else
						document.getElementById("audioRobotScore").play();
					
					//turnCount = 0;	
				}
				
				updateScore();
				
				
				//this.inform(message);
				
				if(computerScore == 100){
					//this.replayButton.visible = true;
					showReplay();
				}
				
		}
		
	
	
	
	
			
	
	
	function computerCheck(arr){//arrComputerSelectionMap
		
		
		if(computerScore != 100){
			if(turnCount > 0 && turnCount < 3 )
				putTick(arr);
			console.log(turnCount,' after putting tick arrColor is ',arrColors);	
			dummyCount++;
			checkCounts();
		}

		//startRoll();
		//roll again
		
	}




/*
private function onRobotTimerComplete(event:TimerEvent):void{
			if(this.currentRoll >= 0){
				for(var i:int = 0 ; i < 6 ; i++){
					this.board.markDice(i, this.computerSelectionMap[i] > 0);
				}
			}
			
			this.inform("It's the computer's turn.")
			this.currentRoll++;
			this.board.roll(this.currentRoll == 0 ? [7, 7, 7, 7, 7, 7] : this.board.selection);
		}	
		
*/		