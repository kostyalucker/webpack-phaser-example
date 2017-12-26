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
    game.load.image('logo', './assets/images/phaser.png');
}

function create() {
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
};

function update() {
    // ¯ \_(ツ)_/¯
    // "surprise me"
}