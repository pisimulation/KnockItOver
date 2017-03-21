var Knock = Knock || {};

Knock.HomeState = {
    create: function() {
        this.scale.maxWidth = this.game.width;
        this.scale.maxHeight = this.game.height;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.dude = this.game.add.sprite(120,0,'dude');
        this.dude.scale.setTo(0.7, 0.7);
        this.game.add.text(40, this.game.world.height - 90, 'ENTER TO START KNOCKING', { font: '50px Impact', fill: '#ADFF2F', fontWeight: 'bold'});
        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(function() {
            this.game.state.start('GameState');
        }, this);
    }
};