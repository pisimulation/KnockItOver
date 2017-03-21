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
        
        this.PLAYER_SPEED = 400;
        this.FLOOR_SPEED = -100;
        this.WIDTH = this.game.world.width;
        this.HEIGHT = this.game.world.height;
        
    },
    
    create: function() {
        //floor
        this.background = this.add.tileSprite(0,0,this.WIDTH*1000,this.HEIGHT*1000,'wall');
        
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
        
        
        //ledges
        var platformData = [
          {"x": 140, "y": 200},
          //{"x": 300, "y": 140},
          //{"x": 270, "y": 210},
          //{"x": 150, "y": 20}
        ];

        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        platformData.forEach(function(element){
          this.platforms.create(element.x, element.y, 'ledge');
        }, this);

        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('scale.x', 60);
        this.platforms.setAll('scale.y', 10);
        
        //things
        this.things = this.game.add.group();
        this.things.enableBody = true;
        this.things.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 10; i++)
        {
            var thing = this.things.create(0 + i * 48,50, 'purple');

            //This allows your sprite to collide with the world bounds like they were rigid objects
            thing.body.collideWorldBounds=true;
            thing.body.gravity.x = 0;
            thing.body.gravity.y = 100 + Math.random() * 100;
            thing.body.bounce.setTo(0.1, 0.1);
            thing.knocked = false;
        }
        
    },
    
    update: function() {
        this.game.world.setBounds(0,0,-this.player.xChange,this.game.width-200);
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.things, this.platforms, null, this.knocked, this);
        this.game.physics.arcade.collide(this.player, this.things, this.knock, null, this);
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
    },
    
    knock: function(player, thing) {
        thing.knocked = true;
        thing.body.velocity.x = 0;
    },
    
    knocked: function(thing, platform) {
        return thing.knocked ? false : true;
    }
}