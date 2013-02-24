var alive = true;
var packetNumber = 0;
var message = "Ready to run. Press 'Send New' button to start."
var sentPacketCount = 0;
var packetsCompleted = 0;
var currentActivePackets = 0;
var speed1 = 50;  //100%
var speed2 = 150; //75%
var speed3 = 250; //50%
var speed4 = 350; //25%
var speed5 = 450; //Slowest
var speedMessage = "" + "Speed: ";

function drawCoordinate(rectangle, fillColour, i){
	var canvas = document.getElementById('MyCanvas');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');
    }
    ctx.fillStyle = fillColour;
    var temp1 = rectangle.x;
    var temp2 = rectangle.y;
    var temp3 = rectangle.j;
    var temp4 = rectangle.k;
    ctx.fillRect(temp1,temp2,temp3,temp4);
    ctx.fillStyle = "black";
	if( i < 10){
	ctx.font = "bold 22px Arial";
	ctx.fillText(i,(rectangle.x+6),(rectangle.y+22));
	}
	else {
	ctx.font = "bold 22px Arial";
	ctx.fillText(i,(rectangle.x-1),(rectangle.y+22));
	}
}

function drawCoordinateNoNumber(x,y,j,k,fillColour){
	var canvas = document.getElementById('MyCanvas');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');
    }
    ctx.fillStyle = fillColour;
    var temp1 = x;
    var temp2 = y;
    var temp3 = j;
    var temp4 = k;
    ctx.fillRect(temp1,temp2,temp3,temp4);
}


function drawRectangles(){
		var canvas = document.getElementById('MyCanvas');
        if (canvas.getContext){
          var ctx = canvas.getContext('2d');
        }
		
		for(var i=30;i<630;i += 30){
		ctx.strokeRect(i,32,22,30);
		}
		for(var j=30;j<630;j += 30){
		ctx.strokeRect(j,482,22,30);
		}
		
		
		ctx.fillStyle = "black";
		ctx.font = "bold 20px Arial";
		ctx.fillText("Sender",650,60);
		ctx.fillText("Receiver", 650, 500);
		
	}

	
function sendPacket(coord1,coord2,number){
	var canvas = document.getElementById('MyCanvas');
    if (canvas.getContext){
         var ctx = canvas.getContext('2d');
        }
	var x = coord1.x;
	var y = coord1.y;
	var j = coord1.j;
	var k = coord1.k;
	var x2 = coord2.x;
	var y2 = coord2.y;
	var j2 = coord2.j;
	var k2 = coord2.k;
	var temp = y;
	var temp2 = y;
	var dx = 30;
	var fillColour = "orange";
	var numberText = number;
	var handle = 0;
	var counter = 0;
	var thisSpeed = speed;
	
	function initialize(){
		handle = setInterval(checkAlive, thisSpeed);
		}
	
	function checkAlive(){
	  if (alive){
		drawPacket();
		}
	}
	
	function drawPacket(){
		thisSpeed = getSpeed();
		ctx.clearRect(x,temp,j,k);
		ctx.fillStyle = fillColour;
		ctx.fillRect(x,y,j,k);
		ctx.fill();
		ctx.fillStyle = "black";
		if (numberText < 10){
		ctx.font = "bold 22px Arial";
		ctx.fillText(numberText,x+6,y+22);}
		else {
		ctx.font = "bold 20px Arial";
		ctx.fillText(numberText,x-1,y+22);}
		temp = y;
		y += dx;
		if(counter == 0 && numberText == sentPacketCount){
			message = "Packet " + numberText + " sent.";
			updateMessageStatus();
			sentPacketCount++;
		}
		if (y > 32){
			drawActivatedRectangles();
			drawCoordinateNoNumber(x,temp2,j,k,"red");
			var currentWindow = windows[packetsCompleted];
			drawWindow(currentWindow);
		}
		if (y==y2){
			counter++;
			dx = dx * -1;
			fillColour = "yellow";
			receivedRectangles.push(coord2);
			drawCoordinateNoNumber(x,temp2,j,k,"red");
			message = "Packet " + numberText + " received, acknowledgement sent.";
			updateMessageStatus();
		}
		if (y==temp2){
		currentActivePackets--;
		sentRectangles.push(coord1);
		ctx.fillStyle = "red";
		ctx.clearRect(x,temp,j,k);
		ctx.fill();
		drawActivatedRectangles();
		dx = 0;
		clearInterval(handle);
		handle = 0;
		message = "Acknowledgement for packet " + numberText + " received.";
		updateMessageStatus();
		//update Window
		if (packetsCompleted == 14){
		var lastwindow = windows[15];
		drawWindow(lastwindow);}
		else {
		var oldWindow = windows[packetsCompleted];
		clearWindow(oldWindow);
		packetsCompleted++;
		var nextWindow = windows[packetsCompleted];
		drawWindow(nextWindow); }
		}
	drawRectangles();
	}
	initialize();
}	


function Packet(alive,number,coord1,coord2){
	this.alive = alive;
	this.number = number;
	this.coord1 = coord1;
	this.coord2 = coord2;
	this.send = send;
	
	 function send(){
	    sendPacket(coord1,coord2,number);
		}
}

function drawActivatedRectangles(){
	
	for(var i = 0;i<sentRectangles.length;i++){
		fillCol = "red";
		var rectangle = sentRectangles[i];
		drawCoordinate(rectangle,fillCol,i);
	}
	for(var j = 0;j<receivedRectangles.length;j++){
		fillCol = "blue";
		var rectangle2 = receivedRectangles[j];
		drawCoordinate(rectangle2,fillCol,j);
	}
}

function createPacket(){
	if (currentActivePackets < 5){
	currentActivePackets++;
	var packetName = "packet" + packetNumber;
	var coord1 = coordinatesSender[packetNumber];
	var coord2 = coordinatesReceiver[packetNumber];
	packetName = new Packet(true,packetNumber,coord1,coord2);
	packetName.send();
	packetNumber++;}
	
} 



