var Knock = Knock || {};

Knock.HomeState = {
    create: function() {
        //floor
        //this.background = this.add.tileSprite(0,
                                              //0,
                                              //this.game.world.width,
                                              //this.game.world.height,
                                              //'grass');
        this.game.add.text(30, this.game.world.height - 50, 'ENTER TO START', { font: '30px Arial', fill: '#315', fontWeight: 'bold'});
        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(function() {
            this.game.state.start('GameState');
        }, this);
    }
};