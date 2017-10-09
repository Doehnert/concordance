var vehicles = [];
var points;

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
	createCanvas(1200, 400);
	background(51);
	console.log('running');
	var button = select('#submit');
	button.mousePressed(submitWord);

	points = font.textToPoints("Procure!", 20, 200, 192, {
        sampleFactor: 0.25
    });

    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }

	//loadJSON('/all', gotData);
}

function submitWord() {
	console.log('submitting');
	var word = select('#search').value();
	loadJSON('/search/' + word, gotData);
}

function gotData(data) {
	
	var word = data.word;
	var count = data.count;

	var x = random(width);
	var y = random(height);

	fill(255);
	textSize(16);
	//text(word + ':' + count, x, y);
	var txt = word + ':' + count;
	points = font.textToPoints(txt, 20, 200, 192, {
        sampleFactor: 0.1
	});
	
    var numVeics = vehicles.length;

    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        if (vehicles[i]) {
            vehicles[i].setTarget(pt.x, pt.y);
        }
    }

    for (var i = points.length; i < numVeics; i++) {
        vehicles[i].setTarget(width / 2, height);
    }

	console.log(word);
}

function draw() {
    background(51);
    for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].behaviour();
        vehicles[i].update();
        vehicles[i].show();
    }
}