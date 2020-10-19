
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,backgroundImage;
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage =  loadImage("jungle.jpg");
  gameOvr= loadImage("gameover.jpg");
}



function setup() {
  
 createCanvas(500, 400);
  
  var survivalTime=0;
  
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
   
   //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  backgroundImage.velocityX = -3; 

    if (backgroundImage.x < 0){
      backgroundImage.x = backgroundImage.width/2;
    }
  score = 0;
  
  
}


function draw() {

  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  ground.visible=false;
  background.velocityX = -5;


    if (background.x < 0){
      background.x = background.width/2;
      }
  
    if(keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -10;
    }

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);  
  
  if(obstaclesGroup.isTouching(monkey)){
    
        obstaclesGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
       
      reset();
    }
  
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);

  stroke("black");
  textSize(20);
  fill("white");
 
    survivalTime=Math.ceil(frameCount/30)
    text("Survival Time: "+  survivalTime, 100,50);
  
   }

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(550,320,10,10);
    obstacle.velocityX = -5;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

function spawnBanana() {
   if (frameCount % 80 === 0) {
    banana = createSprite(600,250,10,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
     
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
     foodGroup.add(banana);
  }
}

function reset() {
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  frameCount=0;
  }