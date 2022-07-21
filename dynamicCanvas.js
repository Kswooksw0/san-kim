// let cols = 20;
// let rows = 20;
// let inc = 0.03
// let xoff = 10;
// let yoff = 10;
// let zoff = 10;
let doge;
let myFont;
let yDisp;
let xDisp;
let fontSize;
let shapeArr = [];
let shapeCount = 40;
let limit;
let velLimit = 1;

preload = function () {
	doge = loadImage("./src/doge.png");
	// loadImage("../NFTs/Blocks #4.png")
	// myFont = loadFont("../OTF/Satoshi-Medium.otf");
};
setup = function () {
	// setting pixel density
	let d = pixelDensity(2);
	// inserting canvas into the div element with class 'homepage'
	let cnv = createCanvas(windowWidth, windowHeight);
	console.log(cnv);
	let homepage = document.getElementsByClassName("homepage");
	// let body = document.querySelector('body')
	cnv.parent(homepage[0]);
	// sizing doge
	doge.resize(doge.width * 0.25, doge.height * 0.25);
	// varying variable values upon resizing window
	if (width > 640) {
		fontSize = 300;
		limit = 100;
		shapeCount = 100;
		velLimit = 1;
	} else {
		fontSize = 170;
		limit = 80;
		velLimit = 0.8;
	}
	// preparing array container for shapes
	for (let i = 0; i < shapeCount; i++) {
		let xPos = random(width);
		let yPos = random(height);
		let vx = random(-velLimit, velLimit);
		let vy = random(-velLimit, velLimit);
		let vec = new Vector(vx, vy);
		let shape;
		let shapeType = Math.floor(random(3));
		if (shapeType == 0) {
			shape = new Shape(xPos, yPos, vec, "circle");
		} else if (shapeType == 1) {
			shape = new Shape(xPos, yPos, vec, "rectangle");
		} else {
			shape = new Shape(xPos, yPos, vec, "triangle");
		}
		shapeArr.push(shape);
	}
};

function draw() {
	
	background("#0D0D0E");
	// settings for placing letters
	xDisp = 0.5 * width;
	yDisp = 0.47 * height;
	textFont('Arial');
	// textFont(myFont);
	textSize(fontSize);
	noFill();
	// tripe A
	stroke("#B13CC9");
	strokeWeight(2);
	textAlign(RIGHT);
	text("A", xDisp + fontSize * 0.22, yDisp);
	stroke("#FACC48");
	strokeWeight(2);
	textAlign(CENTER);
	text("A", xDisp, yDisp);
	stroke("#3BC9B2");
	strokeWeight(2);
	textAlign(LEFT);
	text("A", xDisp - fontSize * 0.22, yDisp);
	// S
	fill(255);
	noStroke();
	textAlign(LEFT);
	text("S", xDisp - fontSize * 1.02, yDisp);
	// N
	fill(255);
	noStroke();
	textAlign(RIGHT);
	text("N", xDisp + fontSize * 1.1, yDisp);
	// introduction
	fill(255);
	textSize(fontSize * 0.15);
	textAlign(LEFT);
	text(
		"Creative Web Developer",
		xDisp - fontSize + fontSize * 0.05,
		1.2 * yDisp
	);
	text("Photographer", xDisp - fontSize + fontSize * 0.05, 1.37 * yDisp);
	text("NFT Artist", xDisp - fontSize + fontSize * 0.05, 1.55 * yDisp);
	// interactive element
	textAlign(CENTER);
	textSize(fontSize * 0.08);
	text("press and drag anywhere", xDisp, 1.8 * yDisp);

	// drawing shapes
	for (let i = 0; i < shapeArr.length; i++) {
		let shape = shapeArr[i];
		noFill();
		if (shape.x >= width) {
			shape.x = 0;
		} else if (shape.x <= 0) {
			shape.x = width;
		}
		if (shape.y >= height) {
			shape.y = 0;
		} else if (shape.y <= 0) {
			shape.y = height;
		}
		if (shape.shapeClass == "circle") {
			stroke("#FACC48");
			ellipse(shape.x, shape.y, 16);
		} else if (shape.shapeClass == "rectangle") {
			stroke("#B13CC9");
			rectMode(CENTER);
			rect(shape.x, shape.y, 12);
		} else {
			stroke("#3BC9B2");
			angleMode(DEGREES);
			let halfBase = 10;
			let upperY = shape.y - halfBase * (2 / sqrt(3));
			let belowY = shape.y + halfBase / sqrt(3);
			let x1 = shape.x - halfBase;
			let x2 = shape.x + halfBase;
			triangle(x1, belowY, shape.x, upperY, x2, belowY);
		}
		// drawing lines
		for (let j = 0; j < shapeArr.length; j++) {
			if (j == i) {
				continue;
			} else {
				let otherShape = shapeArr[j];
				let distance = shape.dist(otherShape);
				if (distance <= limit) {
					stroke(255);
					let thickness = map(distance, 0, limit, 2.5, 0.02);
					strokeWeight(thickness);
					line(shape.x, shape.y, otherShape.x, otherShape.y);
				}
			}
		}
		shape.updatePos();
	}
}
// mouse interaction
mouseDragged = function () {
	noLoop();
	fill(255);
	stroke(0);
	let x = doge.width / 2;
	let y = doge.height / 2;
	image(doge, mouseX - x, mouseY - y);
};
mouseReleased = function () {
	clear();
	loop();
};
// Shape class
class Shape {
	constructor(x, y, vector, shapeClass) {
		this.x = x;
		this.y = y;
		this.vector = vector;
		this.shapeClass = shapeClass;
	}
	updatePos() {
		this.x += this.vector.vx;
		this.y += this.vector.vy;
	}
	dist(otherShape) {
		let dx = Math.abs(otherShape.x - this.x);
		let dy = Math.abs(otherShape.y - this.y);
		let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		return d;
	}
}
// Vector class
class Vector {
	constructor(vx, vy) {
		this.vx = vx;
		this.vy = vy;
	}
}

// function preload
// let cells = cols * rows;
// let cellWidth = Math.floor(width / cols);
// let cellHeight = Math.floor(height / rows);
// for (let i = 0; i < cells; i++) {
// 	let w = i % cols;
// 	let h = Math.floor(i / cols);
// 	let xcoor = w * cellWidth;
// 	let ycoor = h * cellHeight;
// 	push();
// 	translate(xcoor, ycoor);
//     console.log(xcoor, ycoor);
//     let x = map(xcoor,0,width,0,1)
//     let y = map(ycoor,0,height,0,1)
// 	let opacity = map(noise(x,y,zoff), 0, 1, 0, 255);
// 	fill(180, opacity);
//     noStroke()
//     strokeWeight(0.5)
// 	rect(0, 0, cellWidth, cellHeight);
// 	pop();
// }
// zoff += 0.02
// }
