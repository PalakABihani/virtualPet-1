var dog,sadDog,happyDog, database;
var foodS,foodStock;
var foodObj;
var fedTime,lastFed,feed,addFood;


function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed= createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref('fedTime'); 
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  
  fill(255,255,254);
  textSize(15)
  if(lastFed >= 12) {
    text("Last Feed "+lastFed%12+"PM",320,30);
  } 
  else if(lastFed==0) {
    text("Last Feed: 12AM",320,30)
  }
 else{
   text("Last Feed:  "+lastFed+"AM" ,320,30);
 }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime : hour()
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
