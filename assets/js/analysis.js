var LEVEL1 = [0, 3, 0, 0, 0, 0];
var LEVEL2 = [0, 0, 2, 0, 0, 0];
var LEVEL3 = [0, 1, 0, 1, 0, 0];
var LEVEL4 = [1, 0, 0, 0, 1, 0];
var LEVEL5 = [6, 0, 0, 0, 0, 0];
var LEVEL6 = [0, 0, 0, 0, 0, 1];


/*
	static private function configWeight(config:Array):int{
			var weight:int = 0;
			var i:int;
			for(i = 0 ; i < config.length ; i++){
				weight += (i + 1) * config[i];
			}
			
			return weight;
		}
*/		

function configWeight(config){
	var weight = 0;

	for (var i = 0; i < config.length ; i++){
			weight += (i + 1) * config[i];
		}
			
		return weight;
}

/*
	static private function configDistincts(config:Array):int{
			var distincts:int = 0;
			var i:int;
			for(i = 0 ; i < config.length ; i++){
				distincts += config[i];
			}
			
			return distincts;
		}
*/

function configDistincts(config){
	var distincts = 0;
	for (var i = 0; i < config.length ; i++){
		distincts += config[i];
	}
	
	return distincts;
}
/*
static private function getPoints(config:Array, currentScore:int):int{
			var points:int;
			
			if(equals(config, LEVEL1)){
				points = 10;
			}
			if(equals(config, LEVEL2)){
				points = currentScore > 80 ? -80 : 20;
			}
			if(equals(config, LEVEL3)){
				points = currentScore > 70 ? -70 : 30;
			}
			if(equals(config, LEVEL4)){
				points = currentScore > 60 ? -60 : 40;
			}
			if(equals(config, LEVEL5)){
				points = currentScore > 50 ? -50 : 50;
			}
			if(equals(config, LEVEL6)){
				points = 100 - currentScore;
			}
			
			return points;
		}		
*/


function getPoints(config, currentScore){
	var points = 0;
	
	if(equals(config, LEVEL1)){
		points = 10;
	}
	if(equals(config, LEVEL2)){
		points = currentScore > 80 ? -80 : 20;
	}
	if(equals(config, LEVEL3)){
		points = currentScore > 70 ? -70 : 30;
	}
	if(equals(config, LEVEL4)){
		points = currentScore > 60 ? -60 : 40;
	}
	if(equals(config, LEVEL5)){
		points = currentScore > 50 ? -50 : 50;
	}
	if(equals(config, LEVEL6)){
		points = 100 - currentScore;
	}
	
	return points;
}

/*
static private function getNextOutcomes(config:Array, chance:Number):Array{
			var outcomes:Array = [];
			var newConfig:Array;
			var i:int;
			for(i = 0 ; i < config.length - 1 ; i++){
				if(config[i] > 0){
					newConfig = config.concat();
					newConfig[i]--;
					newConfig[i + 1]++;
					outcomes.push({config:newConfig, chance: chance * config[i] / config.length});
				}
			}
			newConfig = config.concat();
			newConfig[0]++;
			outcomes.push({config:newConfig, chance: chance * (1 - configDistincts(config) / config.length)});
			
			return outcomes;
		}
*/


function getNextOutcomes(config, chance){
	var outcomes = [];
	var newConfig = [];
	for(var i = 0 ; i < config.length - 1 ; i++){
		if(config[i] > 0){
			newConfig = config.concat();
			newConfig[i]--;
			newConfig[i + 1]++;
			outcomes.push({config:newConfig, chance: chance * config[i] / config.length});
		}
	}
	newConfig = config.concat();
	newConfig[0]++;
	outcomes.push({config:newConfig, chance: chance * (1 - configDistincts(config) / config.length)});
	
	return outcomes;
}		

/*
	static private function configValue(config:Array, currentScore:int):Number{
			var outcomes:Array = getDistinctOutcomes(config, 6 - configWeight(config));
			
			var value:Number = 0;
			
			for each(var outcome:Object in outcomes){
				value += outcome.chance * getPoints(outcome.config, currentScore);
			}
			return value;
		}
*/		
function configValue(config, currentScore){
	var outcomes = getDistinctOutcomes(config, 6 - configWeight(config));
	
	var value = 0;
	
  /*
	for each(var outcome:Object in outcomes){
		value += outcome.chance * getPoints(outcome.config, currentScore);
	}*/
  
  outcomes.forEach((number, index) => {
  var ss = getPoints(number.config,currentScore);
	value += number.chance * ss;
  //console.log(value,'  ',ss,' and ',number.chance);
});

	return value;
}

/*
	static private function getPossibleSelections(config:Array, trailing:int = 0):Array{
			var selections:Array = [];
			
			var pivotCount:int = config[config.length - 1] + 1;
			var i:int;
			var subselections:Array;
			var subselection:Array;
			for(i = 0 ; i < pivotCount + trailing ; i++){
				if(config.length > 1){
					subselections = getPossibleSelections(config.slice(0, -1), trailing + (pivotCount - i - 1));
				}else{
					subselections = [[]];
				}
				
				for each(subselection in subselections){
					selections.push(subselection.concat(i));
				}
			}
			
			return selections;
		}
*/

function getPossibleSelections(config, trailing = 0){
	var selections = [];
	
	var pivotCount = config[config.length - 1] + 1;
	var subselections = [];
	var subselection = [];
	
	for(var i = 0 ; i < pivotCount + trailing ; i++){
		if(config.length > 1){
			subselections = getPossibleSelections(config.slice(0, -1), trailing + (pivotCount - i - 1));
		}else{
			subselections = [[]];
		}
		
    /*
		for each(subselection in subselections){
			selections.push(subselection.concat(i));
		}*/
    
    subselections.forEach((number, index) => {
    	selections.push(number.concat(i));
	//value += number.chance * getPoints(number.config,currentScore);
});
	}
	
	return selections;
}


/*
	static private function getBestFinalSelection(config:Array, currentScore:int):Object{
			
			var selections:Array = getPossibleSelections(config).slice(0, -1);
			
			var bestSelections:Array;
			var bestValue:Number = Number.NEGATIVE_INFINITY;
			var value:Number;
			
			for each(var selection:Array in selections){
				
				value = configValue(selection, currentScore);
				
				if(value > bestValue){
					bestSelections = [selection];
					bestValue = value;
				}else{
					if(value == bestValue){
						bestSelections.push(selection);
					}
				}
			}
			
			return {config: bestSelections[int(Math.random() * bestSelections.length)], value:bestValue};
		}
*/

function getBestFinalSelection(config = [], currentScore){
			
	var selections = getPossibleSelections(config).slice(0, -1);
	
	var bestSelections = [];
	var bestValue = Number.NEGATIVE_INFINITY;
	var value;
	
  /*
	for each(var selection in selections){
		
		value = configValue(selection, currentScore);
		
		if(value > bestValue){
			bestSelections = [selection];
			bestValue = value;
		}else{
			if(value == bestValue){
				bestSelections.push(selection);
			}
		}
	}
  */
  
  selections.forEach((number, index) => {

  
  value = configValue(number, currentScore);
		
		if(value > bestValue){
			bestSelections = [number];
			bestValue = value;
		}else{
			if(value == bestValue){
				bestSelections.push(number);
			}
		}
    
});
	
	return {config: bestSelections[parseInt(Math.random() * bestSelections.length)], value:bestValue};
}


/*
	
	static private function getBestSelection(config:Array, lastTurn:Boolean, currentScore:int):Object{
			if(lastTurn){
				return getBestFinalSelection(config, currentScore);
			}
			
			var outcomes:Array;
			var selections:Array = getPossibleSelections(config).slice(0, -1);
			var selectionValue:Number;
			var bestValue:Number = Number.NEGATIVE_INFINITY;
			var bestSelections:Array;
			var points:int;
			var discardValue:Number;
			
			for each(var selection:Array in selections){
				selectionValue = 0;
				
				outcomes = getDistinctOutcomes(selection, 6 - configWeight(selection));
				
				for each(var outcome:Object in outcomes){
					points = getPoints(outcome.config, currentScore);
					
					discardValue = getBestFinalSelection(outcome.config, currentScore).value;
					
					if(discardValue > points){
						selectionValue += outcome.chance * discardValue;
					}else{
						selectionValue += outcome.chance * points;
					}
				}
				
				if(selectionValue > bestValue){
					bestValue = selectionValue;
					bestSelections = [selection];
				}else{
					if(selectionValue == bestValue){
						bestSelections.push(selection);
					}
				}
			}
			
			return {config: bestSelections[int(Math.random() * bestSelections.length)], value: bestValue};
		}
*/


function getBestSelection(config, lastTurn, currentScore){


	if(lastTurn){
		return getBestFinalSelection(config, currentScore);
	}
	
	var outcomes = [];
	var selections = getPossibleSelections(config).slice(0, -1);
	var selectionValue;
	var bestValue = Number.NEGATIVE_INFINITY;
	var bestSelections =[];
	var points;
	var discardValue;
/*	
	for each(var selection in selections){
		selectionValue = 0;
		
		outcomes = getDistinctOutcomes(selection, 6 - configWeight(selection));
		
		for each(var outcome in outcomes){
			points = getPoints(outcome.config, currentScore);
			
			discardValue = getBestFinalSelection(outcome.config, currentScore).value;
			
			if(discardValue > points){
				selectionValue += outcome.chance * discardValue;
			}else{
				selectionValue += outcome.chance * points;
			}
		}
		
		if(selectionValue > bestValue){
			bestValue = selectionValue;
			bestSelections = [selection];
		}else{
			if(selectionValue == bestValue){
				bestSelections.push(selection);
			}
		}
	}
  */
  
  selections.forEach((number, index) => {
	//value += number.chance * getPoints(number.config,currentScore);
  
  selectionValue = 0;
		
		outcomes = getDistinctOutcomes(number, 6 - configWeight(number));
		/*
		for each(var outcome in outcomes){
			points = getPoints(outcome.config, currentScore);
			
			discardValue = getBestFinalSelection(outcome.config, currentScore).value;
			
			if(discardValue > points){
				selectionValue += outcome.chance * discardValue;
			}else{
				selectionValue += outcome.chance * points;
			}
		}
    */
		 outcomes.forEach((numbers, index) => {
       points = getPoints(numbers.config, currentScore);

        discardValue = getBestFinalSelection(numbers.config, currentScore).value;

        if(discardValue > points){
          selectionValue += numbers.chance * discardValue;
        }else{
          selectionValue += numbers.chance * points;
        }
     
     });
		if(selectionValue > bestValue){
			bestValue = selectionValue;
			bestSelections = [number];
		}else{
			if(selectionValue == bestValue){
				bestSelections.push(number);
			}
		}
    
});

	
	return {config: bestSelections[parseInt(Math.random() * bestSelections.length)], value: bestValue};
  
//  return {config: bestSelections[int(Math.random() * bestSelections.length)], value: bestValue};
}

/*
	static private function getOutcomes(selection:Array, turns:int, currentChance:Number = 1):Array{
			var nextOutcomes:Array = getNextOutcomes(selection, currentChance);
			
			if(turns == 1){
				return nextOutcomes;
			}else{
				var outcomes:Array = [];
				for each(var outcome:Object in nextOutcomes){
					outcomes = outcomes.concat(getOutcomes(outcome.config, turns - 1, outcome.chance));
				}
			}
			
			return outcomes;
		}
	
*/
	
function getOutcomes(selection, turns, currentChance = 1){
	var nextOutcomes = getNextOutcomes(selection, currentChance);
  var outcomes;
	
	if(turns == 1){
		return nextOutcomes;
	}else{
		outcomes = [];
    /*
		for each(var outcome in nextOutcomes){
			outcomes = outcomes.concat(getOutcomes(outcome.config, turns - 1, outcome.chance));
		}
    */
    
         nextOutcomes.forEach((number, index) => {
            outcomes = outcomes.concat(getOutcomes(number.config, turns - 1, number.chance));	
      });
	}
	
	return outcomes;
}

/*
	static private function getDistinctOutcomes(selection:Array, turns:int):Array{
			var outcomes:Array = getOutcomes(selection, turns);
			
			var i:int;
			var j:int;
			for(i = 0 ; i < outcomes.length - 1 ; i++){
				for(j = i + 1 ; j < outcomes.length ; j++){
					if(equals(outcomes[i].config, outcomes[j].config)){
						outcomes[i].chance += outcomes[j].chance;
						outcomes.splice(j--, 1);
					}
				}
			}
			
			return outcomes;
		}
*/

function getDistinctOutcomes(selection, turns){

	var outcomes = getOutcomes(selection, turns);
	
	var i;
	var j;
	for(i = 0 ; i < outcomes.length - 1 ; i++){
		for(j = i + 1 ; j < outcomes.length ; j++){
			if(equals(outcomes[i].config, outcomes[j].config)){
				outcomes[i].chance += outcomes[j].chance;
				outcomes.splice(j--, 1);
			}
		}
	}
	
	return outcomes;
}

/*
	static private function mapSelectionConfig(roll:Array, selected:Array):Array{
			
			var positions:Array = [[], [], [], [] ,[], []];
			var i:int;
			for(i = 0 ; i < roll.length ; i++){
				positions[roll[i]].push(i);
			}
			
			var hits:Array = [[], [], [], [], [], [], []];
			for(i = 0 ; i < positions.length ; i++){
				hits[positions[i].length].push(i);
			}
			
			var j:int;
			var k:int;
			var pool:Array;
			var color:int;
			var map:Array = [0, 0, 0, 0, 0, 0];
			for(i = selected.length - 1 ; i >= 0 ; i--){
				pool = [];
				for(j = i + 1 ; j < hits.length ; j++){
					pool = pool.concat(hits[j]);
				}
				while(selected[i] > 0){
					k = int(Math.random() * pool.length);
					color = pool[k];
					pool.splice(k, 1);
					
					hits[positions[color].length].splice(hits[positions[color].length].indexOf(color), 1);
					
					for(j = 0 ; j < i + 1 ; j++){
						k = int(Math.random() * positions[color].length);
						map[positions[color][k]] = 1;
						positions[color].splice(k, 1);
					}
					
					selected[i]--;
				}
			}
			
			return map;
			
		}
*/

function mapSelectionConfig(roll, selected=[]){
	//	debugger;	
	var positions = [[], [], [], [] ,[], []];
	var i;
	for(i = 0 ; i < roll.length ; i++){
		positions[roll[i]].push(i);
	}
	
	var hits = [[], [], [], [], [], [], []];
	for(i = 0 ; i < positions.length ; i++){
		hits[positions[i].length].push(i);
	}
	
	var j;
	var k;
	var pool;
	var color;
	var map = [0, 0, 0, 0, 0, 0];
	for(i = selected.length - 1 ; i >= 0 ; i--){
		pool = [];
		for(j = i + 1 ; j < hits.length ; j++){
			pool = pool.concat(hits[j]);
		}
		while(selected[i] > 0){
			k = parseInt(Math.random() * pool.length);
      //console.log('1k ',k);
			color = pool[k];
			pool.splice(k, 1);
			
			hits[positions[color].length].splice(hits[positions[color].length].indexOf(color), 1);
			
			for(j = 0 ; j < i + 1 ; j++){
				k = parseInt(Math.random() * positions[color].length);
        //      console.log('2k ',k);
				map[positions[color][k]] = 1;
				positions[color].splice(k, 1);
			}
			
			selected[i]--;
		}
	}
	
	return map;
	
}	


/*
	static private function getCode(config:Array):int{
			var code:int;
			var i:int;
			for(i = 5 ; i >= 0 ; i--){
				code += config[i] * Math.pow(7, i);
			}
			
			return code;
		}
		
		
		*/

function getCode(config = []){

	var code = 0;
	var i;
	for(i = 5 ; i >= 0 ; i--){
		code += config[i] * Math.pow(7, i);
	}
	
	return code;
}
/*
static private function equals(config1:Array, config2:Array):Boolean{
			return getCode(config1) == getCode(config2);
		}	
*/

function equals(config1, config2){
	return getCode(config1) == getCode(config2);
}								

/*
	static private function getConfig(roll:Array):Array{
			var colorHits:Array = [0, 0, 0, 0, 0, 0];
			var config:Array = [0, 0, 0, 0, 0, 0];
			var i:int;
			for(i = 0 ; i < roll.length ; i++){
				colorHits[roll[i]]++;
			}
			for(i = 0 ; i < colorHits.length ; i++){
				if(colorHits[i] > 0){
					config[colorHits[i] - 1]++;
				}
			}
			return config;
		}
*/

function getConfig(roll){
	var colorHits = [0, 0, 0, 0, 0, 0];
	var config = [0, 0, 0, 0, 0, 0];
	var i;
	for(i = 0 ; i < roll.length ; i++){
		colorHits[roll[i]]++;
	}
	for(i = 0 ; i < colorHits.length ; i++){
		if(colorHits[i] > 0){
			config[colorHits[i] - 1]++;
		}
	}
	return config;
}

/*
	
	//public methods
		
		static public function getScoreLevel(roll:Array):int{
			var config:Array = getConfig(roll);
			if(equals(config, LEVEL1)){
				return 1;
			}
			if(equals(config, LEVEL2)){
				return 2;
			}
			if(equals(config, LEVEL3)){
				return 3;
			}
			if(equals(config, LEVEL4)){
				return 4;
			}
			if(equals(config, LEVEL5)){
				return 5;
			}
			if(equals(config, LEVEL6)){
				return 6;
			}
			return 0;
		}
		
*/

function getScoreLevel(roll){
	
	var config = getConfig(roll);
	if(equals(config, LEVEL1)){
		return 1;
	}
	if(equals(config, LEVEL2)){
		return 2;
	}
	if(equals(config, LEVEL3)){
		return 3;
	}
	if(equals(config, LEVEL4)){
		return 4;
	}
	if(equals(config, LEVEL5)){
		return 5;
	}
	if(equals(config, LEVEL6)){
		return 6;
	}
	return 0;
}		

/*
	static public function discardRoll(roll:Array, lastTurn:Boolean, currentScore:int):Array{

			var config:Array = getConfig(roll);
			
			var selection:Object = getBestSelection(config, lastTurn, currentScore);
			if(selection.value <= getPoints(config, currentScore)){
				return null;
			}else{
				return mapSelectionConfig(roll, selection.config);
			}
		}
*/

function discardRoll(roll, lastTurn, currentScore){

	var config = getConfig(roll);
	
	var selection = getBestSelection(config, lastTurn, currentScore);
	if(selection.value <= getPoints(config, currentScore)){
		return null;
	}else{
		return mapSelectionConfig(roll, selection.config);
	}
}

/*
	static public function chooseSelection(roll:Array, lastTurn:Boolean, currentScore:int):Array{

			var config:Array = getConfig(roll);
			
			var selected:Array = getBestSelection(config, lastTurn, currentScore).config;
			
			return mapSelectionConfig(roll, selected);
		}
*/

function chooseSelection(roll, lastTurn, currentScore){
	var config = getConfig(roll);
	//console.log('config is ',config);


	var selected = getBestSelection(config, lastTurn, currentScore).config;
	//console.log('selected is ',selected);
  
	return mapSelectionConfig(roll, selected);
}

var sd = chooseSelection([3,1,0,5,2,1],false,0)

console.log('and sd is ',sd);
/*
1)	roll = 2,1,3,4,3,0
2) config = 4,1,0,0,0,0
3) selected = 5,0,0,0,0,0
* map = 1,1,0,1,1,1 	*selected = 0,0,0,0,0,0
4) computerSelectionMap = 1,1,0,1,1,1

*/

		