import 'pixi'
import 'p2'
import Phaser from 'phaser'
// import helloWorld from './modules/helloWorld'
// var ecma5 = require('./modules/ecma5');
// require('./css/main.scss');



// ecma5();
//
// helloWorld.someF('hello from someF')
// helloWorld.test('hello from test')
//
//
//


// class Form {
//     constructor() {
//         console.log('You man Babel work');
//         let n = [5,10,15].map(number => number *2);
//
//
//         console.log(n)
//     }
//
// }
//
// new Form();

//GAME



var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky','assets/images/sky.png');
    game.load.image('ground','assets/images/platform.png');
    game.load.image('star','assets/images/star.png');
    game.load.spritesheet('dude','assets/images/dude.png', 32, 48);
}

var platforms,ground, ledge, player, cursors,stars,sun, score, scoreText,starsCount;

function create() {


    //arcade physic
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Fon
    game.add.sprite(0,0,'sky');

    //SUN
    sun = game.add.graphics(500,0);

   sun.enableBody = true;

   sun.beginFill('0xffbf00', .8);
   sun.drawCircle(100,50, 50);


    //Platforms

    platforms = game.add.group();

    //Physic
    platforms.enableBody = true;

    //Bottom
    ground = platforms.create(0, game.world.height - 64, 'ground');

    //size ground

    ground.scale.setTo(2,2);

    // Fix ground

    ground.body.immovable = true;

    // Vistupi

    ledge = platforms.create(400,400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-100,300, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(400,200, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(100,100, 'ground');

    ledge.scale.setTo(.25,1);

    ledge.body.immovable = true;

    //HERO

   // Hero physic
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    console.log(player);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    console.log(player.getAnimation);

    //CREATE STARS

    stars = game.add.group();
    stars.enableBody = true;

    starsCount = 12;

    for( let i = 0; i < starsCount; i++) {
        let star = stars.create(i*70, 0, 'star');

        star.body.gravity.y = 350;

        star.body.bounce.y = 0.5 + Math.random() * .2;
    }

   // Score
    score = 0;
    scoreText = game.add.text(16,16,'score: 0', { fontSize: '22px', fill: '#ccc'});

}

function update() {
    // ¯ \_(ツ)_/¯
    // "surprise me"
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, sun, takeSun,null, this);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    player.body.velocity.x = 0;

    if(cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if(cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else  {
        player.animations.stop();

        player.frame = 4;
    }

    //JUMP

    if(cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    } else if (cursors.down.isDown && !player.body.touching.down) {
        player.body.velocity.y = 200;
    }

    function collectStar(player, star) {
        star.kill();

        score += 10;
        scoreText.text = 'score: ' + score;
    }

    function takeSun(player, sun) {
        console.log('i take')
    }

    if(score == starsCount*10 ) {
        alert('Win!')
    }

}