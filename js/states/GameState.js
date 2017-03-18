var Knock = Knock || {};

Knock.GameState = {
    
    //init game config
    init: function() {
        //use all area
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //init physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.PLAYER_SPEED = 150;
        this.FLOOR_SPEED = -100;
        this.WIDTH = this.game.world.width;
        this.HEIGHT = this.game.world.height;
        
    },
    
    create: function() {
        //floor
        this.background = this.add.tileSprite(0,0,this.WIDTH,this.HEIGHT,'floor');
        this.background.autoScroll(this.FLOOR_SPEED,0);
        
        //player
        this.player = this.add.sprite(50, this.HEIGHT - 60, 'cat', 25);
        this.player.anchor.setTo(0.5);
        this.player.scale.x = 2;
        this.player.scale.y = 2;
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('walk',[24,25,26], 6, true);
        this.player.animations.play('walk');
    },
    
    update: function() {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.velocity.x -= this.PLAYER_SPEED;
        }
        else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.velocity.x += this.PLAYER_SPEED;
        }
        //else if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            //jump;
            
        //}
        /*
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.loadingJump == false) {
            this.loadingJump = true;
        } else if (this.loadingJump == true) {
            player.body.velocity.y = -350;
            this.loadingJump = false;
            timer = 0;
        }*/

    },
}