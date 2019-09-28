import * as PhaserCE from 'phaser-ce';

export class Player {

    protected game: PhaserCE.Game = null;
    protected playerSprite: PhaserCE.Sprite = null;
    protected websocket: WebSocket = null;
    protected wasd = null;
    protected gamepad: PhaserCE.Gamepad;
    protected receivedX: number = 0;
    protected receivedY: number = 0;
    protected receivedAngle: number = 0;
    protected engineForceLine: PhaserCE.Line;
    protected forcePointLine: PhaserCE.Line;
    protected angle: number;

    constructor(x: number,
                y: number,
                game: PhaserCE.Game,
                spriteName: string,
                height: number,
                width: number,
                websocket: WebSocket,
                cameraFollow: boolean) {
        this.angle = 0;
        this.game = game;
        this.gamepad = game.input.gamepad;
        this.gamepad.start();
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
        if (this.game.input.gamepad.supported && this.game.input.gamepad.active) {
            var xboxStickLeftX: number = this.gamepad.pad1.axis(PhaserCE.Gamepad.XBOX360_STICK_LEFT_X);
            var xboxStickLeftY: number = this.gamepad.pad1.axis(PhaserCE.Gamepad.XBOX360_STICK_LEFT_Y);
            if (xboxStickLeftX < -0.1 && xboxStickLeftX > 0.1 && xboxStickLeftY < -0.1 && xboxStickLeftY > 0.1) {
                var distance: number = Math.sqrt(xboxStickLeftX^2+xboxStickLeftY^2)   
                this.angle = Math.asin(xboxStickLeftY / distance)
            }
            if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_A))
            {
                
            }
            //this.websocket.send(JSON.stringify({angle: this.angle}))
        }
        this.playerSprite.x = this.receivedX;
        this.playerSprite.y = this.receivedY;
        this.playerSprite.rotation = this.receivedAngle + Math.PI / 2;

    }

    public moveTo(x:number, y:number, angle:number) {
        this.receivedX = x;
        this.receivedY = y;
        this.receivedAngle = angle;
    }


}
