var banana,obstacle,obstacleGroup,background_img,score, monkey_running,ground,Monkey,foodGroup;

var Background;
function preload()
{
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  
  background_img = loadImage("jungle.jpg");
  banana = loadImage("banana.png");
  obstacle = loadImage("stone.png");
}



function setup() {
  createCanvas(400, 400);
  Background = createSprite(200,200);
  Background.addImage("background",background_img);
  Background.velocityX = -2;
  
  Monkey = createSprite(60,365,1,1);
  Monkey.addAnimation("monkey",monkey_running);
  Monkey.scale = 0.1;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  ground = createSprite(200,380,400,10);
  ground.visible = false;
  
  score = 0;
  
}

function draw() {
 background(220);
  
 
  
  if (Background.x < 0)
  {
    Background.x = Background.width/2;
  }
  
  if (keyDown("space") && Monkey.y >= 300)
      {
        Monkey.velocityY = -10;
      }
  
  Monkey.velocityY = Monkey.velocityY + 0.8;
  
  if (Monkey.isTouching(foodGroup))
      {
         foodGroup.destroyEach();
         score = score + 2;
      }
  
  switch (score)
  {
    case 10: Monkey.scale = 0.12;
      break;
    case 20: Monkey.scale = 0.14;
      break;
    case 30: Monkey.scale = 0.16;
      break;  
    case 40: Monkey.scale = 0.18;
      break;
    case 50: Monkey.scale = 0.20;
      break;  
    case 60: Monkey.scale = 0.22;
      break;  
      
      default: break;  
  }
  
  if (obstacleGroup.isTouching(Monkey))
      {
        Monkey.scale = 0.1;
        score = 0;
      }
    
  food();
  obstacles();
  
  Monkey.collide(ground);
  drawSprites();
   stroke("white");
  textSize(20);
  fill("white");
  text("score : " + score,300,50);
}



function food(){
  if (frameCount % 80 === 0){
   var bananas = createSprite(random(230,340),random(200,260));
    bananas.addImage(banana);
    bananas.scale = 0.05;
    bananas.velocityX = -5;
    bananas.lifetime = 70;
    foodGroup.add(bananas);
  }
   
  
}

function obstacles()
{
  if (frameCount % 300 === 0)
  {
    var obstacles = createSprite(350,365,1,1);
    obstacles.addImage(obstacle);
    obstacles.velocityX = -5;
    obstacles.scale = 0.15;
    obstacles.lifetime = 100;
    obstacles.setCollider("rectangle",0,0,60,60);

    obstacleGroup.add(obstacles);
  }
}