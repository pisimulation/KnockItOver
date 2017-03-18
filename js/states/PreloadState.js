var Knock = Knock || {};

Knock.PreloadState = {
    //load assets
    preload: function() {
        this.load.spritesheet('cat', 'assets/cat.png', 32, 32);
        this.load.spritesheet('neko', 'assets/neko.png');
        this.load.image('floor', 'assets/floor.png');
        
        //load level data
        //this.load.text('normalLevel', 'assets/data/normalLevel.json');
        
    },
    
    create: function() {
        this.game.state.start('HomeState');
    }
};