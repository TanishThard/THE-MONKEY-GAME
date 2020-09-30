var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running ;
var ground,groundImage;
var obstacle,obstacleImage,obstaclesGroup;
var banana,bananaImage,bananasGroup;
var survivalTime=0;
 

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 

  
  
obstacleImage=
  loadImage("obstacle.png");
  
  bananaImage=
    loadImage("banana.png");
}

function setup() {
   createCanvas(500,450);
monkey=createSprite(80,315,20,20);
monkey.addAnimation("monkey",monkey_running);  
monkey.scale=0.09  

  
  
ground=createSprite(10,315,550,3);
ground.velocityX=-6;
 ground.x = ground.width /2;
    
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  survivalTime=0;
  
  }

function draw() {
  background("lightblue");
  
   if(gameState === PLAY){
  
survivalTime = survivalTime + Math.round(getFrameRate()/60);
 
   text("Survival Time: "+ survivalTime, 200,50);
  
  
  if (keyDown("space")&&monkey.y>=285.7){
  monkey.velocityY=-10;
    
  }
  
    if (ground.x < 500){
      ground.x = ground.width/2;
    }

  monkey.velocityY=monkey.velocityY+0.8;
 monkey.collide(ground);
  
 
  
  if(obstaclesGroup.isTouching(monkey)){
  
    
    gameState = END;
    
  }
  
  if(bananasGroup.isTouching(monkey)){

    bananasGroup.destroyEach();
     
  }  
     spawnObstacles();
  spawnBananas();
  
   }
  else if(gameState===END){
          
    textSize(50);
    text("GameOver",100,200);    
  
    ground.velocityX=0;
   
   
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    
     obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);

    
 monkey.collide(ground);
    
     
          }
  
  
    
     drawSprites();
  
}

function spawnObstacles(){
 if (frameCount % 50 === 0){
  
   
   var obstacle = createSprite(400,300,10,40);
   obstacle.addImage(obstacleImage);
  obstacle.velocityX=-17;
   
   obstacle.scale = 0.09;
    obstacle.lifetime = 300;
   
    
   obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    obstaclesGroup.add(obstacle);   
 }
}

function spawnBananas(){
 if (frameCount % 50 === 0){
  
   
   var banana = createSprite(400,230,10,40);
   banana.addImage(bananaImage);
   banana.velocityX=-17;
   
   banana.scale = 0.09;
    banana.lifetime = 300;
   
   banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
   
    bananasGroup.add(banana);  
 }
}





