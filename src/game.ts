import 'pixi';
import 'p2';
import * as PhaserCE from 'phaser-ce';
import {Player} from "./player.ts";

declare const URL: string;

class GcarsGame {

    private game: PhaserCE.Game = null;
    private websocket: WebSocket = null;
    private currentPlayer: Player = null;

    constructor(width:number = window.innerWidth,
                height:number = window.innerHeight,
                renderer:number = PhaserCE.WEBGL) {
        this.game = new PhaserCE.Game(width, height, renderer, parent);
        var activeState = {
            preload: this.preload.bind(this),
            create: this.create.bind(this),
            update: this.update.bind(this),
            render: this.render.bind(this)
        };
        this.game.state.add('active', activeState);
        this.game.state.start('active');

    }

    preload() {
        this.game.load.image('background', 'assets/concrete1w.jpg');
        this.game.load.image('car', 'assets/car.png');
    }

    create() {
        this.game.add.tileSprite(0, 0, 8000, 8000, 'background');
        this.game.world.setBounds(0, 0, 8000, 8000);
        this.websocket = new WebSocket(URL);
        this.currentPlayer = new Player(
            4000,
            4000,
            this.game,
            'car',
            160,
            80,
            this.websocket,
            true);
        this.websocket.onmessage = (em) => {
            var data = JSON.parse(em.data);
            this.currentPlayer.moveTo(data.x, data.y, data.angle);
        };
        this.websocket.onclose = (em) => {
            console.log('Connection closed');
        };
        this.websocket.onopen = (em) => {
            console.log('Connection opened');
        };
        console.log('Connection created');
    }

    update() {
        this.currentPlayer.update();
    }

    render() {
        //this.game.debug.text(" Player x = " + this.currentPlayer.x() + "y = " + this.currentPlayer.y(), 200, 200);
    }

}

window.onload = () => {
    const game = new GcarsGame(window.innerWidth, window.innerHeight, PhaserCE.WEBGL);
};
