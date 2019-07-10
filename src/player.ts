import * as PhaserCE from 'phaser-ce';

export class Player {

    protected game: PhaserCE.Game = null;
    protected playerSprite: PhaserCE.Sprite = null;
    protected websocket: WebSocket = null;
    protected wasd = null;
    protected receivedX: number = 0;
    protected receivedY: number = 0;
    protected receivedAngle: number = 0;

    constructor(x: number,
                y: number,
                game: PhaserCE.Game,
                spriteName: string,
                height: number,
                width: number,
                websocket: WebSocket,
                cameraFollow: boolean) {
        this.game = game;
        this.playerSprite = this.game.add.sprite(x, y, spriteName);
        this.playerSprite.width = width;
        this.playerSprite.height = height;
        this.playerSprite.anchor.setTo(0.5, 0.5);
        if (cameraFollow) {
            this.websocket = websocket;
            this.game.camera.follow(this.playerSprite);
            this.wasd = {
                up: this.game.input.keyboard.addKey(PhaserCE.Keyboard.W),
                left: this.game.input.keyboard.addKey(PhaserCE.Keyboard.A),
                down: this.game.input.keyboard.addKey(PhaserCE.Keyboard.S),
                right: this.game.input.keyboard.addKey(PhaserCE.Keyboard.D)
            };
        }
    }

    public update() {
        this.playerSprite.x = this.receivedX;
        this.playerSprite.y = this.receivedY;
        this.playerSprite.rotation = this.receivedAngle;

    }

    public moveTo(x:number, y:number, angle:number) {
        this.receivedX = x;
        this.receivedY = y;
        this.receivedAngle = angle;
    }


}