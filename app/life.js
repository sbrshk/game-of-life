var n = 120,
	m = 120, 
	st = false, 
	gen = 0;

var field = [];
for (var i = 0; i < n; i++) {
  	field[i] = [];
  	for (var j = 0; j < m; j++) {
    	field[i][j] = 0;
  	}
}

function drawField() {
	var canvas = document.getElementById("cnvs"),
	context = canvas.getContext("2d");
	canvas.width = canvas.width;
	
	for (var i = 1; i < n - 1; i++)
			for (var j = 1; j < m - 1; j++) {
				if (field[i][j] === 1) context.fillRect(i*5, j*5, 5, 5);
			}
	
	for (var x = 0.5; x < 601; x += 5) {
      context.moveTo(x, 0);
      context.lineTo(x, 600);
    }
	
    for (var y = 0.5; y < 601; y += 5) {
      context.moveTo(0, y);
      context.lineTo(600, y);
    }
	
    context.strokeStyle = "#aaa";
    context.stroke();
}

function initField() {
	stop();
	st = false;
	gen = 0;
	
	for (var i = 0; i < n; i++)
		for (var j = 0; j < m; j++)
			field[i][j] = 0;
	
	drawField();
	
	var gnrtn = document.getElementById("generation");
	gnrtn.innerHTML = '<span> </span>';
	//updGeneration();
}

function stop() {
	st = true;
}

function continueUpdating() {
	st = false;
	setTimeout(updateField, 100);
}

function updGeneration() {
	var gnrtn = document.getElementById("generation");
	gnrtn.innerHTML = '<span>Generation ' + gen +'</span>';
}

function initRandom() {
	initField();
	stop();
	st = false;
	gen = 1;
	
	for (var i = 1; i < n - 1; i++)
		for (var j = 1; j < m - 1; j++) 
			field[i][j] = Math.floor(Math.random()*2);
	
	drawField();
	setTimeout(updateField, 100);
}

function initGrid() {
	initField();
	gen = 1;
	
	for (var i = 1; i < n - 1; i++)
		for (var j = 1; j < m - 1; j++) {
			if (i%3 === 0 || j%3 === 0) field[i][j] = 0;
			else field[i][j] = 1;
		}
	
	field[n/2][m/2 - 1] = 1;
	
	drawField();
	setTimeout(updateField, 100);
}

function updateField() {
	var field_2 = [];
	for (var i = 0; i < n; i++) {
		field_2[i] = [];
		for (var j = 0; j < m; j++)
			field_2[i][j] = 0;
	}
	
	for (var i = 1; i < n - 1; i++)
		for (var j = 1; j < m - 1; j++) {
			
			var neigbours = field[i+1][j] + field[i-1][j] + field[i][j+1] + field[i][j-1] + field[i+1][j+1] + field[i+1][j-1] + field[i-1][j+1] + field[i-1][j-1];
			
			if ((neigbours === 3) || (neigbours === 2) && (field[i][j] === 1)) field_2[i][j] = 1;
			else field_2[i][j] = 0;
		}
	
	field = field_2;
	
	drawField();
	
	gen++;
	updGeneration();
	
	if (!st) setTimeout(updateField, 100);
}

function initGun() {
	initField();
	
	var gun = [];
	for (var i = 0; i < 36; i++) {
		gun[i] = [];
		for (var j = 0; j < 9; j++)
			gun[i][j] = 0;
	}
	gun[0] = gun[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0];
	gun[34] = gun[35] = [0, 0, 1, 1, 0, 0, 0, 0, 0];
	gun[10] = gun[16] = [0, 0, 0, 0, 1, 1, 1, 0, 0];
	gun[11] = gun[15] = [0, 0, 0, 1, 0, 0, 0, 1, 0];
	gun[12] = gun[13] = [0, 0, 1, 0, 0, 0, 0, 0, 1];
	gun[14][5] = gun[17][5] = 1;
	gun[20] = gun[21] = [0, 0, 1, 1, 1, 0, 0, 0, 0];
	gun[22] = [0, 1, 0, 0, 0, 1, 0, 0, 0];
	gun[24] = [1, 1, 0, 0, 0, 1, 1, 0, 0];
	
	for (var i = 0; i < 36; i++)
		for (var j = 0; j < 9; j++)
			field[i+1][j+1] = gun[i][j];
	
	drawField();
	setTimeout(updateField, 100);
}

function initBiGun() {
	initField();
	
	var bigun = [];
	for (var i = 0; i < 50; i++) {
		bigun[i] = [];
		for (var j = 0; j < 15; j++)
			bigun[i][j] = 0;
	}
	bigun[0] = bigun[1] = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0];
	bigun[48] = bigun[49] = [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
	bigun[9] = [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
	bigun[10] = [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0];
	bigun[11] = [1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0];
	bigun[14] = bigun[15] = [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
	bigun[40] = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0];
	bigun[39] = [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0];
	bigun[38] = [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1];
	bigun[35] = bigun[34] = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
	
	for (var i = 0; i < 50; i++)
		for (var j = 0; j < 15; j++)
			field[i+35][j+53] = bigun[i][j];
	
	drawField();
	setTimeout(updateField, 100);
}