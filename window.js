
function Window(x,y,j,k){
	this.x = x;
	this.y = y;
	this.j = j;
	this.k = k;
}

window1 = new Window(26,28,150,38);
window2 = new Window(56,28,150,38);
window3 = new Window(86,28,150,38);
window4 = new Window(116,28,150,38);
window5 = new Window(146,28,150,38);
window6 = new Window(176,28,150,38);
window7 = new Window(206,28,150,38);
window8 = new Window(236,28,150,38);
window9 = new Window(266,28,150,38);
window10 = new Window(296,28,150,38);
window11 = new Window(326,28,150,38);
window12 = new Window(356,28,150,38);
window13 = new Window(386,28,150,38);
window14 = new Window(416,28,150,38);
window15 = new Window(446,28,150,38);
window16 = new Window(476,28,150,38);

var windows = new Array(window1,window2,window3,window4,window5,window6,window7,window8,window9,window10,
						window11,window12,window13,window14,window15,window16);

function drawWindow(window){
	var canvas = document.getElementById('MyCanvas');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');
    }
	temp1 = window.x;
	temp2 = window.y;
	temp3 = window.j;
	temp4 = window.k;
	ctx.fillStyle = "black";
	ctx.strokeRect(temp1,temp2,temp3,temp4);
	}
	
function clearWindow(window){
	var canvas = document.getElementById('MyCanvas');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');
    }
	temp1 = window.x - 5;
	temp2 = window.y - 5;
	temp3 = window.j + 10;
	temp4 = window.k + 10;
	ctx.clearRect(temp1,temp2,temp3,temp4);
	drawRectangles();
	drawActivatedRectangles();
}

