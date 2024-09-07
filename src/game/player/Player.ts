import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    speed: number = 200;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        console.log("constructuer called")

        // Add player to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Initialize player physics properties
        this.setCollideWorldBounds(true);

        // Initialize keyboard controls safely
        this.cursorKeys = this.scene.input.keyboard!.createCursorKeys();
    }

    override update(): void {
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(0);

        // Safely check if keys are down
        if (this.cursorKeys.left?.isDown || this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)?.isDown) {
            body.setVelocityX(-this.speed);
        } else if (this.cursorKeys.right?.isDown || this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)?.isDown) {
            body.setVelocityX(this.speed);
        }

        if (this.cursorKeys.up?.isDown || this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W)?.isDown) {
            body.setVelocityY(-this.speed);
        } else if (this.cursorKeys.down?.isDown || this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)?.isDown) {
            body.setVelocityY(this.speed);
        }

        body.velocity.normalize().scale(this.speed);
    }
}