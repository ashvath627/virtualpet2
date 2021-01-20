var dog,happyDogImg;
var database;
var foodS, foodStock;
var dogImg, foodObj, lastFed

function preload(){
  dogImg=loadImage("dogImg.png");
  happyDogImg=loadImage("dogImg1.png");
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();

  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createButton("Feed Max");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Get Food!");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
background(46, 139, 87);
foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
});
fill("black");
textSize(15);
stroke(40);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}
else if(lastFed==0){
   text("Last Feed : 12 AM",350,30);
}
else{
   text("Last Feed : "+ lastFed + " AM", 350,30);
}

drawSprites();  
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
  dog.addImage(dogImg);
}


