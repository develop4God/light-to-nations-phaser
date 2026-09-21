import { GameObjects, Math as PhaserMath, Scene } from 'phaser';

const BASE_RADIUS = 60;
const THUMB_RADIUS = 28;

export class VirtualJoystick
{
    scene: Scene;
    base: GameObjects.Arc;
    thumb: GameObjects.Arc;
    pointerId: number | null = null;
    force = new PhaserMath.Vector2(0, 0);

    constructor (scene: Scene, x: number, y: number)
    {
        this.scene = scene;

        this.base = scene.add.circle(x, y, BASE_RADIUS, 0xffffff, 0.2)
            .setScrollFactor(0)
            .setDepth(1000)
            .setVisible(false);
        this.thumb = scene.add.circle(x, y, THUMB_RADIUS, 0xffffff, 0.5)
            .setScrollFactor(0)
            .setDepth(1001)
            .setVisible(false);

        scene.input.on('pointerdown', this.onPointerDown, this);
        scene.input.on('pointermove', this.onPointerMove, this);
        scene.input.on('pointerup', this.onPointerUp, this);
    }

    private onPointerDown (pointer: Phaser.Input.Pointer)
    {
        if (this.pointerId !== null) return;
        if (pointer.x > this.scene.scale.width / 2) return;

        this.pointerId = pointer.id;
        this.base.setPosition(pointer.x, pointer.y).setVisible(true);
        this.thumb.setPosition(pointer.x, pointer.y).setVisible(true);
    }

    private onPointerMove (pointer: Phaser.Input.Pointer)
    {
        if (pointer.id !== this.pointerId) return;

        const dx = pointer.x - this.base.x;
        const dy = pointer.y - this.base.y;
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), BASE_RADIUS);
        const angle = Math.atan2(dy, dx);

        this.thumb.setPosition(
            this.base.x + Math.cos(angle) * distance,
            this.base.y + Math.sin(angle) * distance
        );

        this.force.set(Math.cos(angle) * (distance / BASE_RADIUS), Math.sin(angle) * (distance / BASE_RADIUS));
    }

    private onPointerUp (pointer: Phaser.Input.Pointer)
    {
        if (pointer.id !== this.pointerId) return;

        this.pointerId = null;
        this.force.set(0, 0);
        this.base.setVisible(false);
        this.thumb.setVisible(false);
    }
}
