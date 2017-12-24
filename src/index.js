import 'pixi'
import 'p2'
import Phaser from 'phaser'


var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('logo', './assets/images/phaser.png');
}

var upK, downK, leftK, rightK, man;

function create() {
     man = game.add.graphics(0, 0);

    //Fon

    game.stage.backgroundColor = '#999';

    // graphics.lineStyle(2, 0xffd900, 1);

    man.beginFill(0xFFFA62, .9);
    man.drawRect(200,200,50,50);


    upK = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downK = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftK = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightK = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    man

    game.physics.enable(man, Phaser.Physics.ARCADE)

};

function update() {
    // ¯ \_(ツ)_/¯
    // "surprise me"

    // Mouse
    if (game.input.mousePointer.isDown)
    {
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(man, 400);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(man.body, game.input.x, game.input.y))
        {
            man.body.velocity.setTo(0, 0);
        }
    }
    else
    {
        man.body.velocity.setTo(0, 0);
    }

    //Speed

    var velocity = 5;

    // KeyHandle

    if(upK.isDown) {
        man.y = man.y-- - velocity;
    }
    if(downK.isDown) {
        man.y = man.y++ + velocity;
    }
    if(rightK.isDown) {
        man.x = man.x++ + velocity;
    }
    if(leftK.isDown) {
        man.x = man.x-- - velocity;
    }
}