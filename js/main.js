var Knock = Knock || {};

Knock.game = new Phaser.Game(600, 400, Phaser.AUTO);

Knock.game.state.add('GameState', Knock.GameState);
Knock.game.state.add('HomeState', Knock.HomeState);
Knock.game.state.add('PreloadState', Knock.PreloadState);
Knock.game.state.start('PreloadState');
