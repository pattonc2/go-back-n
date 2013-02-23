

function foo(){
document.write("This is a test");
}

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
	ctx.font = "bold 22px Arial";
	ctx.fillText(i,(rectangle.x+6),(rectangle.y+22));
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
	sentRectangles.push(coord1);
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
	
	function initialize(){
		var handle = setInterval(drawPacket, speed);
		}
	
	function drawPacket(){
		ctx.clearRect(x,temp,j,k);
		ctx.fillStyle = fillColour;
		ctx.fillRect(x,y,j,k);
		ctx.fill();
		ctx.fillStyle = "black";
		ctx.font = "bold 22px Arial";
		ctx.fillText(numberText,x+6,y+22);
		temp = y;
		y += dx;
		if (y > 32){
			drawActivatedRectangles();
			drawCoordinateNoNumber(x,temp2,j,k,"red");
		}
		if (y==y2){
			dx = dx * -1;
			fillColour = "yellow";
			receivedRectangles.push(coord2);
			drawActivatedRectangles();
		}
		if (y==temp2){
		ctx.fillStyle = "red";
		ctx.fillRect(x,y,j,k);
		ctx.fill();
		drawActivatedRectangles();
		dx = 0;
		clearInterval(handle);
		handle = 0;
		
		
		}
	drawRectangles();
	}
	initialize();
}	


function Packet(x,y,z,k,alive,number,coord1,coord2){
	this.x = x;
	this.y = y;
	this.z = z;
	this.k = k;
	this.alive = alive;
	this.number = number;
	this.coord1 = coord1;
	this.coord2 = coord2;
	this.showPacket = showPacket;
	this.send = send;
	
	 function showPacket(){
		if(alive){
		document.write(coord2.x);
		}
		else {
		document.write("Zeds dead");
		}
	} 
	
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



