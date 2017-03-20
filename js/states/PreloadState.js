var Knock = Knock || {};

Knock.PreloadState = {
    //load assets
    preload: function() {
        this.load.spritesheet('cat', 'assets/cat.png', 31, 33);
        this.load.spritesheet('neko', 'assets/neko.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('ledge', 'assets/ledge.png');
        
        //load level data
        //this.load.text('normalLevel', 'assets/data/normalLevel.json');
        
    },
    
    create: function() {
        this.game.state.start('HomeState');
    }
};