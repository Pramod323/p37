//..
// May 19, 2021
var food;
var dog, m, dogImage, lazyDogImg, milkImg, database, foodStock;
var fedTime, lastFed, currentTime, timeSinceLastFed;
var readState, gameState;
var feedDog, addFood;

function preload(){
  dogImage = loadImage("images/dog.png");
  milkImg = loadImage("images/Milk.png");
  lazyDogImg = loadImage("images/Lazy.png");
}


function setup(){
  database = firebase.database();
	createCanvas(493,801);
  
  dog = createSprite(259,573);
  dog.addImage(dogImage);
  dog.scale = 0.434; 

  food = new Food();
  food.getFoodStock();
  food.feedDogButton();
  food.addFoodButton();
}

function draw(){
  bg();
  //background(46, 139, 87);
  currentTime = hour();
  if(currentTime>=fedTime){
    timeSinceLastFed = currentTime - fedTime;
  }else{
    timeSinceLastFed = (currentTime+24) - fedTime;
  }

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  }); 
  
  food.updateFoodStock();
  food.display();
  food.addFoodFunction();
  drawSprites();
  
  lastFed = database.ref('LastFed');
  lastFed.on("value", function (data) {
  fedTime = data.val();
  })

  fill("white");
  textSize(24);
  textAlign(CENTER, TOP);

  //text(mouseX+ " : "+ mouseY, 50,20);

  if(fedTime>=13){
    text("Last Fed: "+fedTime%12 + " PM" ,130,50);
  }else if(fedTime==12){
    text("Last Fed: 12 PM",130,50);
  }else if(fedTime==0){
    text("Last Fed: 12 AM" ,130,50);
  }else{
    text("Last Fed: "+ fedTime +" AM" ,130,50);
  }
}


function creatingMilkSprite() {
  if(foodStock>0){
    m = createSprite(261,256);
    m.addImage(milkImg);
    m.scale=0.08;
    m.velocityX = -5;
    m.velocityY = 23;
    m.lifetime = 11;
  }
}


function bg() {
  if(timeSinceLastFed===1||timeSinceLastFed===0){
    dog.remove();
    feedDog.hide();
    addFood.position(165+17,124);
    food.garden();
    database.ref('/').update({
      gameState: "Garden"
    })
  }else if(timeSinceLastFed===2){
    dog.remove();
    feedDog.hide();
    addFood.position(165+17,124);
    food.livingRom();
    database.ref('/').update({
      gameState: "Living Room"
    })
  }else if(timeSinceLastFed===3){
    dog.remove();
    feedDog.hide();
    addFood.position(165+17,124);
    food.washroom();
    database.ref('/').update({
      gameState: "Washroom"
    })
  }else if(timeSinceLastFed===4){
    dog.remove();
    feedDog.hide();
    addFood.position(165+17,124);
    food.bedroom();
    database.ref('/').update({
      gameState: "Bedroom"
    })
  }else{
    background(46, 139, 87);
    dog.addImage(lazyDogImg); 
    database.ref('/').update({
      gameState: "Hungry"
    })
  }
}



//Pramod Prasad Singh