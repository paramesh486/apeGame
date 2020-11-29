var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var girl
var obstaclesGroup,obstacle
var powersGroup,power
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
ground_image = loadImage("Background.png");
gameOverImage = loadImage("gameOver1.png")
restartImage = loadImage("restart1.png")
apeImage=loadImage("images/ape1.png")
}

function setup() {
 createCanvas(600,500);
  
ground=createSprite(200,150,0,0);
  ground.addImage("bground",ground_image)
  ground.shapeColor="white";
   ground.velocityX=-1
  
   girl=createSprite(300,420,20,30);
  girl.shapeColor = ("blue")
  
  ape=createSprite(50,410,20,30);
    ape.shapeColor = ("red")
    ape.addImage(apeImage);
    ape.scale=0.3

  //ape.debug=false;
  
  invisible_ground=createSprite(300,485,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup = new Group();
  powersGroup = new Group();
  
  score=0;
}

function draw() {
 background("black");
  
 // console.log(girl.y);
   //Gravity
girl.velocityY = girl.velocityY + 0.8;
girl.collide(invisible_ground); 
  
   //Gravity
ape.velocityY = ape.velocityY + 0.8;
ape.collide(invisible_ground); 
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   if (obstaclesGroup.isTouching(ape)){
     ape.velocityY=-12;
   }
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       //checkPointSound.play() 
    }
    
 if((keyDown("space")&& girl.y >= 220)) {
   girl.velocityY = -12;
    //jumpSound.play();
  }  
  
  if (girl.isTouching(obstaclesGroup)){
    gameState=END;
     //dieSound.play();
  }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     girl.velocityY = 0
     ape.x=girl.x;
  
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("pink");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
  obstaclesGroup.destroyEach();
  score=0;
  ape.x=50;
}

function spawnObstacles() {
   if (frameCount % 10 === 0){
   var obstacle = createSprite(600,470,20,20);
   obstacle.velocityX = ground.velocityX
     obstacle.shapeColor = ("yellow")
     obstacle.collide(ground)
      obstaclesGroup.add(obstacle);
    //obstacle.debug=false;
    obstacle.setCollider("circle",0,0,1);
   }
     
}
function spawnPowers() {
   if (frameCount % 100 === 0){
   var power = createSprite(600,250,0,10,40);
   obstacle.velocityX = ground.velocityX
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
     power.addImage(power);
   power.scale=0.1;
      powersGroup.add(power);
  power.setCollider("circle",0,0,1);
   }
     
}

