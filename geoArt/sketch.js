let greenCreater, greenCreaterX, greenCreaterY
let speed = -0.5;
let speedc = -0.48;
let speedb = -0.3;

function setup() {
    let wrap = select('.wrap');
    let bgCanvas = createCanvas(windowWidth, windowHeight);
    bgCanvas.parent(wrap);
    background(0);
    drawDress()
    greenCreater = createImg("./img/tracher.png", "");
    whiteCreater = createImg("./img/bear.png", "");
    heart = createImg("./img/heart.png", "");
    greenCreaterY = windowHeight - 290;
    greenCreaterX = 4.2 * windowWidth / 6;

    whiteCreaterY = windowHeight/4;
    whiteCreaterX = windowWidth/7;

    heartX = 4.2 * windowWidth / 6 + 210;
    heartY = windowHeight - 250;
    heart.position(heartX, heartY)
    greenCreater.position(greenCreaterX, greenCreaterY);
    whiteCreater.position(whiteCreaterX, whiteCreaterY);
    greenCreater.style("width", "300px");
}
function draw() {
    drawDuck();
    drawheart();
    drawBear();
}
function colorCreate() {
    let colorArray = []
    do {
        let color = int(random(0, 8));
        if (!colorArray.includes(color)) {
            colorArray.push(color);
        }
    } while (colorArray.length < 4)
    return colorArray
}
function drawDress() {
    for (let x = 0; x < width; x += 100) {
        for (let y = 0; y - 150 < height; y += 100) {
            let baseColor = "#b9c6ce-#f4b7a9-#dccbdd-#f4a59f-#d0e0e6-#ddcea9-#f2cc97-#e0e4d6".split("-")
            let colors = colorCreate();
            push()
            noStroke();
            translate(x, y)//把畫面移動到中央
            rectMode(CENTER)//物件的中心點

            fill(baseColor[colors[0]])
            rect(0, 0, 100, 100)

            fill(baseColor[colors[1]])
            ellipse(0, 0, 10, 10)
            ellipse(0, -20, 10, 10)
            ellipse(0, 20, 10, 10)

            fill(baseColor[colors[2]])
            smooth();
            triangle(-50, -50, 0, -50, -25, -25)
            triangle(0, -50, 50, -50, 25, -25)

            pop()
        }
    }
}
function drawDuck() {
    greenCreaterY = greenCreaterY + speed;
    if (greenCreaterY < windowHeight - 290 -40) {
        speed = -speed
    } else if (greenCreaterY > windowHeight - 290) {
        speed = -speed
    }
    greenCreater.position(greenCreaterX, greenCreaterY);
}
function drawheart() {
    heartY = heartY + speedc;
    if (heartY < windowHeight - 250 - 40) {
        speedc = -speedc
    } else if (heartY > windowHeight - 250) {
        speedc = -speedc
    }
    heart.position(heartX, heartY);
}
function drawBear() {
    whiteCreaterX = whiteCreaterX + speedb;
    
    if (whiteCreaterX < windowWidth/7-50) {
        speedb = -speedb
    } else if (whiteCreaterX > windowWidth/7) {
        speedb = -speedb
    }
    whiteCreater.position(whiteCreaterX, whiteCreaterY);
}

  
