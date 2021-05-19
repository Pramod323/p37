var foodStockRef, gameState;
var feedDog;
var addFood;

class Food{
    constructor(){
        this.milk = loadImage("images/Milk.png");
        this.bedroomImg = loadImage("images/Bed Room.png");
        this.gardenImg = loadImage("images/Garden.png");
        this.washroomImg = loadImage("images/Wash Room.png");
        this.livingRoom = loadImage("images/Living Room.png");
    }

    bedroom(){
        background(this.bedroomImg);
    }
    
    garden(){
        background(this.gardenImg)
    }

    washroom(){
        background(this.washroomImg)
    }

    livingRom(){
        background(this.livingRoom);
    }

    getFoodStock(){
        foodStockRef = database.ref('Food');
        foodStockRef.on("value", function (data) {
            foodStock = data.val();
        })
    }

    feedDogButton(){
        feedDog = createButton("Feed Dog");
        feedDog.position(68,124);
        feedDog.size(140);
    }

    addFoodButton(){
        addFood = createButton("Add Food");
        addFood.position(281,124);
        addFood.size(140);
    }

    addFoodFunction(){
        addFood.mousePressed(abcde);

        function abcde(){
            console.log("Foodstock: "+ foodStock);
            if (foodStock>=20) {
                console.log("You cannot add food. Storage is full.");
            } else {
                foodStock++
                database.ref('/').update({
                    Food: foodStock
                })
            }
        }
    }

    updateFoodStock(){
        feedDog.mousePressed(abcd);
        function abcd(){
            creatingMilkSprite();
            writeStock(foodStock);
            database.ref('/').update({
                LastFed: hour()
            })
        }

        function writeStock(x){
            if(x<=0){
              x=0   
            }else{
              x = x - 1;
            }
            database.ref('/').update({
              Food:x
            })
        }
    }

    display(){
        var x=36,y=157;
        if(foodStock!=0){
            for(var i=0;i<foodStock;i++){
            if(i%10==0){
                x=36;
                y=y+60;
            }
            image(this.milk,x,y,62,62);
            x=x+40;
            }
        }
    }
}