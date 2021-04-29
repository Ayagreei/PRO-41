class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 1000);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        fill("red")
        textSize(43)
        text("PLayer1-Score:"+ A,100,100);
        text("PLayer2-Score:"+ B,100,200);

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            if (index === player.index){
                fill(0);
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25)
            }
        }


        // Give movements for the players using arrow keys
        if(keyIsDown(RIGHT_ARROW))
        {
            player.distance -=10;
            player.update();
        } 
        if(keyIsDown(LEFT_ARROW))
        {
            player.distance +=10;
            player.update();
        }



        // Create and spawn fruits randomly
        if ( frameCount % 20 ===0){
            fruits = createSprite(random(0,1000),0,100,100);
            fruits.velocityY = 8;
            fruits.lifetime = 65;
            var ran = Math.round(random(1,5))
            switch(ran){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break
                case 2: fruits.addImage("fruit1",fruit2_img);
                break
                case 3: fruits.addImage("fruit1",fruit3_img);
                break
                case 4: fruits.addImage("fruit1",fruit4_img);
                break
                case 5: fruits.addImage("fruit1",fruit5_img);
                break
            }
            fruitGroup.add(fruits);
        }
        
    }

    end(){
       console.log("Game Ended");
    }
}