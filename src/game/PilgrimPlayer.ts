import { Physics, Scene } from 'phaser';

const SPEED = 200;

export class PilgrimPlayer extends Physics.Arcade.Sprite
{
    constructor (scene: Scene, x: number, y: number)
    {
        super(scene, x, y, 'pilgrim');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setCircle(this.width / 2);
    }

    move (direction: { x: number, y: number })
    {
        const body = this.body as Physics.Arcade.Body;
        body.setVelocity(direction.x * SPEED, direction.y * SPEED);
    }
}
