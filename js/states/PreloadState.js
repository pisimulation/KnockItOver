var Knock = Knock || {};

Knock.PreloadState = {
    preload: function() {
        this.load.spritesheet('cat', 'assets/cat.png', 31, 33);
        this.load.spritesheet('neko', 'assets/neko.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('ledge', 'assets/ledge.png');
        this.load.image('purple', 'assets/purple.png');
        this.load.image('floor', 'assets/floor.png');
        this.load.image('dude', 'assets/dude.jpg');
        
    },
    
    create: function() {
        this.game.state.start('HomeState');
    }
};