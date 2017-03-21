var Knock = Knock || {};

Knock.GameState = {
    
    //init game config
    init: function() {
        this.scale.maxWidth = this.game.width;
        this.scale.maxHeight = this.game.height;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //init physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.PLAYER_SPEED = 800;
        this.FLOOR_SPEED = -100;
        this.WIDTH = this.game.world.width;
        this.HEIGHT = this.game.world.height;
        this.THINGFREQ = 15;
        this.DURATION = 30;
        
    },
    
    create: function() {
        //floor
        this.background = this.add.tileSprite(0,0,this.WIDTH*10000,this.HEIGHT*10000,'wall');
        
        //player
        this.player = this.add.sprite(50, this.HEIGHT - 80, 'cat', 25);
        this.player.anchor.setTo(0.5);
        this.player.scale.x = 2;
        this.player.scale.y = 2;
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 4000;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('stand',[25], 6, false);
        this.player.animations.add('standback',[13], 6, false);
        this.player.animations.add('walk',[24,25,26], 6, true);
        this.player.animations.add('walkback',[12,13,14], 6, true);
        this.player.animations.add('jump',[26], 6, false);
        this.player.animations.add('jumpback',[14], 6, false);
        this.game.camera.follow(this.player);
        this.player.backward = false;
        
        //platform
        this.platform = this.add.sprite(0, this.HEIGHT - 20, 'floor');
        this.game.physics.arcade.enable(this.platform);
        this.platform.body.immovable = true;
        this.platform.body.allowGravity = false;
        this.platform.scale.x = 10000;
        
        //ledges
        var platformData = [
          {"x": 140, "y": 200},
          {"x": 1500, "y": 140},
          {"x": 2970, "y": 210},
          {"x": 3150, "y": 80},
          {"x": 4150, "y": 110},
          {"x": 5150, "y": 220},
          {"x": 6150, "y": 290},
          {"x": 7150, "y": 290},
          {"x": 8150, "y": 210},
          {"x": 9150, "y": 200},
          {"x": 10150, "y": 140},
          {"x": 11150, "y": 270},
          {"x": 12150, "y": 200},
          {"x": 13150, "y": 170},
          {"x": 14150, "y": 90},
          {"x": 15150, "y": 190},
          {"x": 16150, "y": 290},
          {"x": 17150, "y": 80},
          {"x": 18150, "y": 220},
          {"x": 19150, "y": 180},
          {"x": 20150, "y": 100},
          {"x": 21150, "y": 200},
          {"x": 22150, "y": 190},
          {"x": 23150, "y": 220},
        ];

        this.ledges = this.add.group();
        this.ledges.enableBody = true;

        platformData.forEach(function(element){
          this.ledges.create(element.x, element.y, 'ledge');
        }, this);

        this.ledges.setAll('body.immovable', true);
        this.ledges.setAll('body.allowGravity', false);
        this.ledges.setAll('scale.x', 60);
        this.ledges.setAll('scale.y', 10);
        
        //things
        this.things = this.game.add.group();
        this.things.enableBody = true;
        this.things.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 250; i++)
        {
            var thing = this.things.create(this.game.rnd.between(110,25000),10, 'purple');
            
            //This allows your sprite to collide with the world bounds like they were rigid objects
            thing.body.gravity.x = 0;
            thing.body.gravity.y = 100 + Math.random() * 100;
            thing.body.bounce.setTo(0.1, 0.1);
            thing.knocked = false;
            thing.knockedNum = 0;
        }
        this.knockedNum = 0;
        
        //timer
        this.startTime = new Date();
        this.createTimer(this.DURATION);
        this.gameTimer = this.game.time.events.loop(100, this.updateTimer, this, this.DURATION);
        
    },
    
    update: function() {
        this.game.world.setBounds(0,0,-this.player.xChange,this.game.width-200);
        this.game.physics.arcade.collide(this.player, this.ledges);
        this.game.physics.arcade.collide(this.things, this.ledges, null, this.knocked, this);
        this.game.physics.arcade.collide(this.player, this.things, this.knock, null, this);
        this.game.physics.arcade.collide(this.things, this.things);
        this.game.physics.arcade.collide(this.things, this.platform, this.fell, null, this);
        this.game.physics.arcade.collide(this.player, this.platform);
        
        this.player.body.velocity.x = 0;
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.velocity.x -= this.PLAYER_SPEED;
            this.player.animations.play('walkback');
            this.player.backward = true;
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.velocity.x += this.PLAYER_SPEED;
            this.player.animations.play('walk');
            this.player.backward = false;
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.player.body.velocity.y = -550;
            if(this.player.backward) {
                this.player.animations.play('jumpback');
            }
            else {
                this.player.animations.play('jump');
            }
        }
        else {
            if(this.player.backward) {
                this.player.animations.play('standback');
            }
            else {
                this.player.animations.play('stand');
            }
        }
        
        if(this.timeoutLabel.text == "00:00") {
            this.gameOver();
        }
        
    },
    
    knock: function(player, thing) {
        thing.knocked = true;
        thing.body.velocity.x = 0;
        if (thing.knockedNum == 0) {
            this.knockedNum += 1;    
        }
        thing.knockedNum += 1;
    },
    
    fell: function(player, thing) {
        thing.knockedNum += 1;  
    },
    
    knocked: function(thing, platform) {
        return thing.knocked ? false : true;
    },
    
    createTimer: function(totalTime){
        this.timeremaining = this.game.add.text(20, 20, "Time remaining", {font: "18px Arial", fill: "#fff"}); 
        this.timeoutLabel = 
        this.game.add.text(60, 40, totalTime, {font: "30px Arial", fill: "#fff"}); 
        this.timeoutLabel.anchor.setTo(0.5, 0);
        this.timeoutLabel.align = 'center';
        this.timeremaining.fixedToCamera = true
        this.timeoutLabel.fixedToCamera = true

    },
    
    updateTimer: function(totalTime){

        var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();

        //Time elapsed in seconds
        this.timeElapsed = Math.abs(timeDifference / 1000);

        //Time remaining in seconds
        this.timeRemaining = totalTime - this.timeElapsed;
        

        //Convert seconds into minutes and seconds
        var minutes = Math.floor(this.timeRemaining / 60);
        var seconds = Math.floor(this.timeRemaining) - (60 * minutes);

        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes; 

        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 

        this.timeoutLabel.text = result;
 
    },
    
    gameOver: function() {
        this.game.paused = true;
        this.game.add.text(this.player.body.x - 250, this.player.body.y, "You knocked " + this.knockedNum, {font: "40px Arial", fill: "#fff"});
        this.game.add.text(this.player.body.x - 250, this.player.body.y + 40, 'ENTER to restart', { font: '30px Arial', fill: '#007', fontWeight: 'bold'});
        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(function() {
            location.reload();
            
        }, this);
    }
}