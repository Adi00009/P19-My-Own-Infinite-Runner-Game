var waves, wavesImg;
var surfer, surferImg;
var coin, coinGroup;
var rock, rockImg, rockGroup;
var gameState = "play";
var score = 0;

function preload() {
  wavesImg = loadImage("Waves.jpg");
  surferImg = loadImage("surfer.jpg");
  rockImg = loadImage("rock.png");
}

function setup() {
  // createCanvas(600, 768);
  createCanvas(1000, 486);

  // waves = createSprite(0, 768/2, 600, 768);
  waves = createSprite(1000/2, 486/2, 1094, 486);
  waves.addImage(wavesImg);
  waves.velocityX = -5;

  surfer = createSprite(50, 768/2);
  surfer.addImage(surferImg);
  surfer.scale = 0.175;

  rockGroup = new Group();
  coinGroup = new Group();
}

function draw() {
  if (gameState == "play") {
    if (waves.x < 300) {
      waves.x = width/2;
    }

    surfer.y = mouseY;

    spawnCoin();
    spawnRock();

    if (surfer.isTouching(coinGroup)) {
      score += 10;
    } else if (surfer.isTouching(rockGroup)) {
      gameState = "end";
    }

    score += Math.round(getFrameRate()/60);

    drawSprites();
  } else if (gameState == "end") {
    waves.velocityX = 0;
    coinGroup.destroyEach();
    rockGroup.destroyEach();
    score = "Game Over";
  }

  drawSprites();

  textSize(20);
  fill("blue");
  stroke("darkBlue");
  text(score, 300, 768/2 - 50);
}


function spawnCoin() {
  if (frameCount % 50 == 0) {
    coin = createSprite(1010, Math.round(random(0, 768)));
    coin.addImage(loadImage("coin" + Math.round(random(1, 3)) + ".png"));
    coin.scale = 0.5;
    coin.velocityX = -5;
    coinGroup.add(coin);
  }
}


function spawnRock() {
  if (frameCount % 110 == 0) {
    rock = createSprite(900, Math.round(random(0, 768)));
    rock.addImage(loadImage("rock.png"));
    rock.scale = 0.2;
    rock.velocityX = -5;
    rockGroup.add(rock);
  }
}
