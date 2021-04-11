var arrBoxes = [];
var renderer;
var scene;
var camera;
var geometry;
var planegeometry;
var audio = [];
var quats = [];
//var arrCubes = [];
var count = 0;
var refreshRate;
var arrColors = ['x','x','x','x','x','x'];
var arrPlanes = ['x','x','x','x','x','x'];
var arrTick = [];
var arrRemoveCubes = [];
var arrNewCubes = [];

var texture;
var checkMark;
var sprite2;


var tmp = [];
tmp[0] = [0, 0, 4, 5, 4, 2];
tmp[1] = [4, 3, 5, 1, 4, 3];
tmp[2] = [2, 5, 2, 5, 2, 5];
tmp[3] = [0, 0, 4, 5, 4, 2];
tmp[4] = [4, 3, 5, 1, 4, 3];

var dummyCount = 0;


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


function initCube() {


//console.log('scene is ',scene);

if(scene != undefined)
{
	
	 removeCubes();
	 //arrColors = [];
	 arrRemoveCubes.sort();
	 count = 0
	 createMissingCubes();
	 rollDice();
	 render();
	 return;
}
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 5);
  camera.lookAt(scene.position);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //document.body.appendChild(renderer.domElement);
  let mainCanvas = document.getElementById('mainCanvas');
  mainCanvas.append(renderer.domElement);

  var size = 0.6
  var size2 = size / 2;
  
  geometry = new THREE.BoxGeometry(size, size, size);
  planegeometry = new THREE.PlaneGeometry(size2, size2, size2);
  
  
  //  texture = new THREE.TextureLoader().load( 'assets/images/dice.png' );
  // immediately use the texture for material creation
//  checkMark = new THREE.MeshBasicMaterial( { map: texture } );
  
  
 /* 
  var crateTexture = THREE.ImageUtils.loadTexture( 'assets/images/dice.png' );
  var crateMaterial = new THREE.SpriteMaterial( { map: crateTexture, useScreenCoordinates: false, color: 0xff0000 } );
	sprite2 = new THREE.Sprite( crateMaterial );
	sprite2.position.set( -10, 50, 0 );
	sprite2.scale.set( 64, 64, 1.0 ); // imageWidth, imageHeight
*/	
	
  
// when the mouse moves, call the given function
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
/*
  // colors
  red = new THREE.Color(1, 0, 0);
  green = new THREE.Color(0, 1, 0);
  blue = new THREE.Color(0, 0, 1);
  yellow = new THREE.Color(0xffff00);
  purple = new THREE.Color(0x800080);
  orange = new THREE.Color(0xffa500);
  */
  
  red = new THREE.Color(0xff0000);
  green = new THREE.Color(0x00ff00);
  blue = new THREE.Color(0x0000ff);
  yellow = new THREE.Color(0xffff00);
  purple = new THREE.Color(0x800080);
  orange = new THREE.Color(0xffa500);

  var colors = [red, green, blue, yellow, orange, purple];
  //1 - red
  //Red, Orange, Yellow, Green, Blue, Indigo and Violet.



  for (var i = 0; i < 3; i++) {
    geometry.faces[4 * i].color = colors[i];
    geometry.faces[4 * i + 1].color = colors[i];
    geometry.faces[4 * i + 2].color = colors[i + 3];
    geometry.faces[4 * i + 3].color = colors[i + 3];
  }
  
 ///////////////////////////////////////////////////////////////////////////
  quats[0] = [new THREE.Quaternion(), green];
  quats[0][0].setFromAxisAngle(new THREE.Vector3(0, 0, 0), 0);

  quats[1] = [new THREE.Quaternion(), orange];
  quats[1][0].setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);

  quats[2] = [new THREE.Quaternion(), purple];
  quats[2][0].setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

  quats[3] = [new THREE.Quaternion(), red];
  quats[3][0].setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

  quats[4] = [new THREE.Quaternion(), blue];
  quats[4][0].setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI / 2);

  quats[5] = [new THREE.Quaternion(), yellow];
  quats[5][0].setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);

//////////////////////////////////////////////////////////////////////////////

  audio[0] = document.getElementById("myAudio1");
  audio[1] = document.getElementById("myAudio2");
  audio[2] = document.getElementById("myAudio3");
  audio[3] = document.getElementById("myAudio4");
  audio[4] = document.getElementById("myAudio5");
  audio[5] = document.getElementById("myAudio6");


count = 0
 createOriginaCubes();

 rollDice();
 
 
  var clock = new THREE.Clock();
  var time = 0;
  var delta = 0;
  var amplitude = 2;
  height = 10;
  //var bounce = document.getElementById("myAudio"); 

 
        render();


  return 'done';
}

function createMissingCubes()
{
	for (var i = 0; i < arrRemoveCubes.length; i++) 
	{
		var	material= new THREE.MeshBasicMaterial({

		      color: 0xffffff, vertexColors: true, opacity: 0.5,
		      transparent: true
		    });
	    
	    	arrBoxes[arrRemoveCubes[i]] = new THREE.Mesh(geometry, material);
	    	
	    	//arrRemoveCubes.push(i);
		
	}
	
	arrNewCubes = [];
}
function createOriginaCubes()
{
	var texture = new THREE.TextureLoader().load( 'assets/images/check1.png' );
	var checkMarkMesh = new THREE.MeshBasicMaterial( { map: texture,opacity:1,transparent:true } );
	
		
	for (var i = 0; i < 6; i++) {
		
		var	material= new THREE.MeshBasicMaterial({

		      color: 0xffffff, vertexColors: true, opacity: 0.5,
		      transparent: true
		    });
	    
	    	arrBoxes[i] = new THREE.Mesh(geometry, material);
	    	arrRemoveCubes.push(i);
	    	

    // plane
    
    var checkMarkPlane = new THREE.Mesh(planegeometry,checkMarkMesh);
    checkMarkPlane.overdraw = true;
    checkMarkPlane.name = 'T' + i;
    //checkMarkPlane.position.x = arrPlanes[0].position.x + 0.15;
    //checkMarkPlane.position.y = arrPlanes[0].position.y - 0.1;
    //checkMarkPlane.position.z = arrPlanes[0].position.z;
    //scene.add(checkMarkPlane);
    arrTick.push(checkMarkPlane);
	    	
	}
	arrNewCubes = [];
}

function rollDice()
{
 var interval = setInterval(function () {
   // var i = arrBoxes.length;
    
    arrBoxes[arrRemoveCubes[count]].position.x = -2.5 + arrRemoveCubes[count];
    
    //console.log('the new x position is ',arrBoxes[arrRemoveCubes[count]].position.x);

    var num = Math.round(Math.random() * (5));
    arrBoxes[arrRemoveCubes[count]].destinationQuat = quats[num][0];
    
/*   if(turn == 'computer')
    {
	    console.log(dummyCount, count, ' once again ', tmp[dummyCount][arrRemoveCubes[count]]);
	    	arrBoxes[arrRemoveCubes[count]].destinationColor = quats[tmp[dummyCount][arrRemoveCubes[count]]][1];
	    	console.log(arrRemoveCubes[count],' color for should be ',count, arrBoxes[arrRemoveCubes[count]].destinationColor);
    }else
*/	    arrBoxes[arrRemoveCubes[count]].destinationColor = quats[num][1];

    arrBoxes[arrRemoveCubes[count]].rotation.x = Math.random();
    arrBoxes[arrRemoveCubes[count]].rotation.y = Math.random();
    arrBoxes[arrRemoveCubes[count]].rotation.z = Math.random();


    arrBoxes[arrRemoveCubes[count]].amplitude = 2;
    arrBoxes[arrRemoveCubes[count]].clock = new THREE.Clock();
    arrBoxes[arrRemoveCubes[count]].time = 2;
    arrBoxes[arrRemoveCubes[count]].bounce = false;

    arrBoxes[arrRemoveCubes[count]].direction = 10000000000;
    arrBoxes[arrRemoveCubes[count]].audio = audio[arrRemoveCubes[count]];
    scene.add(arrBoxes[arrRemoveCubes[count]]);
    

    //arrCubes.push(arrBoxes[arrRemoveCubes[count]]);
    
    arrNewCubes.push(arrBoxes[arrRemoveCubes[count]]);
    count++;
    if (count === arrRemoveCubes.length){
      clearInterval(interval);

        }

  }, 300);
} 
  
 
 function removeCubes() {
	 if(arrRemoveCubes.length > 0)
	 {
		 cancelAnimationFrame( refreshRate );
		//for (var i = arrCubes.length-1; i >=0 ; i--) {
		for (var i = 0; i<arrRemoveCubes.length ; i++) {
			
			    scene.remove(arrBoxes[arrRemoveCubes[i]].plane);
			    scene.remove(arrBoxes[arrRemoveCubes[i]]);
			    arrBoxes[arrRemoveCubes[i]].geometry.dispose();
			    arrBoxes[arrRemoveCubes[i]].material.dispose();
			    arrBoxes[arrRemoveCubes[i]] = undefined; //clear any reference for it to be able to garbage collected
			    
			  /*  scene.remove(plane[i]);
			    plane[i].geometry.dispose();
			    plane[i].material.dispose();
			    plane[i] = undefined; //clear any reference for it to be able to garbage collected
			    */
			    //arrCubes.splice(arrRemoveCubes[i],1);
			    //arrCubes.pop();
			
	    }
	    renderer.render(scene, camera);
    }
} 

function removeAllTick(){
	
	for (var i = 0; i < arrPlanes.length; i++) {
		
		
		if(arrPlanes[i].tick == true){
	
			scene.remove(arrTick[i]);    
			arrPlanes[i].tick = false;
			arrRemoveCubes.push(i);
			//arrColors.splice(arrColors.indexOf(arrPlanes[i].material.color.getHexString()), 1);
		}
		
	}
	console.log('after removing all ticks ',arrColors);
		
}

function putTick(arr){
	
	//arrColors = ['x','x','x','x','x','x'];
	for(var i = 0 ; i < 6; i++){
		if(arr[i] > 0){
			toggleTick(i);
			//arrColors[i] = arr[i];
		}
		else{
			//arrColors.splice(getProperColorValue(arrColors.indexOf(arrPlanes[i].material.color.getHexString())), 1);
			
			//arrPlanes[i].tick = false;
			//arrRemoveCubes.push(i);
			arrColors[i] = 'x';
		}//remove the cubes from arrcolors
		
		/*
			scene.remove(arrTick[index]);    
		arrPlanes[index].tick = false;
		arrRemoveCubes.push(index);
		arrColors[index] = 'x';
		*/	
		}
		
	
}


function render() {
  
  refreshRate = requestAnimationFrame(render);

  for (var i = 0; i < arrNewCubes.length; i++) {
	//console.log(arrRemoveCubes[i],' inside render function  ',i);
    var delta = arrBoxes[arrRemoveCubes[i]].clock.getDelta();
    arrBoxes[arrRemoveCubes[i]].time += delta;
    arrBoxes[arrRemoveCubes[i]].amplitude -= delta / 1;
    
    if (!arrBoxes[arrRemoveCubes[i]].amplitude) 
    {
      var curr_quat = new THREE.Quaternion();
      arrBoxes[arrRemoveCubes[i]].getWorldQuaternion(curr_quat);
      /*const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );*/
      
      curr_quat.rotateTowards(arrBoxes[arrRemoveCubes[i]].destinationQuat, arrBoxes[arrRemoveCubes[i]].time / 10);
      
      if (!arrBoxes[arrRemoveCubes[i]].bounce) 
      {
        arrBoxes[arrRemoveCubes[i]].audio.play();
        arrBoxes[arrRemoveCubes[i]].bounce = true;
      }
      arrBoxes[arrRemoveCubes[i]].setRotationFromQuaternion(curr_quat);
      
      if (arrBoxes[arrRemoveCubes[i]].plane.position.y < arrBoxes[arrRemoveCubes[i]].position.y + 0.6)
        arrBoxes[arrRemoveCubes[i]].plane.position.y += 0.05;
      else
      {
	      //if(i == 5){
		    if(i == arrRemoveCubes.length-1){  
	      		 cancelAnimationFrame( refreshRate );	
	      		 //console.log('Finished arrColors',arrColors);
	      		 //animationEnded();
	      		 removeAllTick();
		  		 checkPatterns();
	      		 }
      }
	  //console.log('amplitude');
      continue;
    }
    
    
    if (arrBoxes[arrRemoveCubes[i]].amplitude <= 0) {
      arrBoxes[arrRemoveCubes[i]].amplitude = undefined;
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

      const plane = new THREE.Mesh(planegeometry, material);
      plane.name = 'p' + i;
      plane.tick = false;
      scene.add(plane);
	
      plane.position.x = arrBoxes[arrRemoveCubes[i]].position.x;
      plane.position.y = arrBoxes[arrRemoveCubes[i]].position.y;
      plane.position.z = arrBoxes[arrRemoveCubes[i]].position.z;
      plane.material.color = arrBoxes[arrRemoveCubes[i]].destinationColor;
      arrBoxes[arrRemoveCubes[i]].plane = plane;
      //console.log('hello hello ',arrBoxes[i].destinationColor.getHexString());
      
/*      if(turn == 'computer')
	  {
      	arrColors[arrRemoveCubes[i]] = tmp[dummyCount][arrRemoveCubes[i]];
      	console.log('at entering arrColors ',arrColors[arrRemoveCubes[i]]);
      }
      else
*/	    arrColors[arrRemoveCubes[i]] = getProperColorValue(arrBoxes[arrRemoveCubes[i]].destinationColor.getHexString());

      arrPlanes[arrRemoveCubes[i]] = plane;
      
      continue;
    }

    if (arrBoxes[arrRemoveCubes[i]].amplitude > 0.5) {
	
		//console.log('111');
      arrBoxes[arrRemoveCubes[i]].rotation.x = arrBoxes[arrRemoveCubes[i]].time * 6;
      arrBoxes[arrRemoveCubes[i]].rotation.y = arrBoxes[arrRemoveCubes[i]].time * 5;
      arrBoxes[arrRemoveCubes[i]].rotation.z = arrBoxes[arrRemoveCubes[i]].time * 4;
    }
    else {
     //console.log('222');
      var curr_quat = new THREE.Quaternion();
      arrBoxes[arrRemoveCubes[i]].getWorldQuaternion(curr_quat);
      /*const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );*/
      curr_quat.rotateTowards(arrBoxes[arrRemoveCubes[i]].destinationQuat, 1 / 10);
      arrBoxes[arrRemoveCubes[i]].setRotationFromQuaternion(curr_quat);
    }
    var direction = Math.round(Math.sin(arrBoxes[arrRemoveCubes[i]].time) / Math.abs(Math.sin(arrBoxes[arrRemoveCubes[i]].time)));
    
    //console.log('direction is ',direction);

    arrBoxes[arrRemoveCubes[i]].position.y = Math.abs(Math.sin(arrBoxes[arrRemoveCubes[i]].time * 3)) * arrBoxes[arrRemoveCubes[i]].amplitude - 1;
    arrBoxes[arrRemoveCubes[i]].material.opacity += 0.005;
    if (arrBoxes[arrRemoveCubes[i]].position.y < arrBoxes[arrRemoveCubes[i]].direction) {
      arrBoxes[arrRemoveCubes[i]].direction = arrBoxes[arrRemoveCubes[i]].position.y;
      arrBoxes[arrRemoveCubes[i]].bounce = false;
    }
    if (arrBoxes[arrRemoveCubes[i]].position.y > arrBoxes[arrRemoveCubes[i]].direction) {
      if (!arrBoxes[arrRemoveCubes[i]].bounce) {
        //console.log("Bounce");
        arrBoxes[arrRemoveCubes[i]].bounce = true;
        arrBoxes[arrRemoveCubes[i]].audio.play();

      }
      direction = arrBoxes[arrRemoveCubes[i]].position.y;
    }
    /*if(arrBoxes[i].position.y <= -0.970)
      console.log("Bounce");
      bounce.play();*/
  }


  renderer.render(scene, camera);
}


function onDocumentMouseDown( event ) 
{
	var rect = renderer.domElement.getBoundingClientRect();
	mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
	mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( arrPlanes);
	
	if(intersects.length > 0)
	{
			//console.log('click inside');	
			//scene.add(checkMark);
			//arrPlanes[0].add( checkMark );
			
	
	var indexNo = parseInt(String(intersects[0].object.name).replace(/[^0-9]/g, ''));
	
	toggleTick(indexNo);
	
	//console.log(arrPlanes[index].tick,' and ',scene.getObjectByName(intersects[0].object.name));
	
	
/*			
	var texture = new THREE.TextureLoader().load( 'assets/images/check1.png' );
	var checkMarkMesh = new THREE.MeshBasicMaterial( { map: texture,opacity:1,transparent:true } );

    // plane
    
    var checkMarkPlane = new THREE.Mesh(planegeometry,checkMarkMesh);
    checkMarkPlane.overdraw = true;
    checkMarkPlane.position.x = arrPlanes[0].position.x + 0.15;
    checkMarkPlane.position.y = arrPlanes[0].position.y - 0.1;
    checkMarkPlane.position.z = arrPlanes[0].position.z;
    scene.add(checkMarkPlane);

*/			
				
				
		

				//console.log('dice should be added');
				
				
	}
	
}


function toggleTick(index){
	
	if(arrPlanes[index].tick == false){
		arrTick[index].position.x = arrPlanes[index].position.x + 0.15;
	    arrTick[index].position.y = arrPlanes[index].position.y - 0.1;
	    arrTick[index].position.z = arrPlanes[index].position.z;
	    scene.add(arrTick[index]);
	    arrPlanes[index].tick = true;
	    console.log('arrColors in toggleTick ',arrColors);
	    arrColors[index] = getProperColorValue(arrPlanes[index].material.color.getHexString());
	    arrRemoveCubes = arrRemoveCubes.filter(item => item !== index)
	    
    }
    else{
		scene.remove(arrTick[index]);    
		arrPlanes[index].tick = false;
		arrRemoveCubes.push(index);
		arrColors[index] = 'x';
		//arrRemoveCubes.sort();
    }
	renderer.render( scene, camera );
}

function getProperColorValue(colorString){
	var returnString = colorString;
	
	switch(colorString){
		
		case 'ff0000':
			returnString = 0;
		break;
		
		case 'ffff00':
			returnString = 1;
		break;
		
		case '0000ff':
			returnString = 2;
		break;
		
		case '00ff00':
			returnString = 3;
		break;
		
		case '800080':
			returnString = 4;
		break;
		
		case 'ffa500':
			returnString = 5;
		break;
	}
	
	return returnString;
}

