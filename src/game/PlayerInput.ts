import { Math as PhaserMath, Scene } from 'phaser';
import { VirtualJoystick } from '../ui/VirtualJoystick';

export class PlayerInput
{
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: { [key: string]: Phaser.Input.Keyboard.Key };
    private joystick: VirtualJoystick;

    constructor (scene: Scene, joystickX: number, joystickY: number)
    {
        this.cursors = scene.input.keyboard!.createCursorKeys();
        this.wasd = scene.input.keyboard!.addKeys('W,A,S,D') as { [key: string]: Phaser.Input.Keyboard.Key };
        this.joystick = new VirtualJoystick(scene, joystickX, joystickY);
    }

    getDirection (): PhaserMath.Vector2
    {
        const direction = new PhaserMath.Vector2(0, 0);

        if (this.cursors.left.isDown || this.wasd.A.isDown) direction.x -= 1;
        if (this.cursors.right.isDown || this.wasd.D.isDown) direction.x += 1;
        if (this.cursors.up.isDown || this.wasd.W.isDown) direction.y -= 1;
        if (this.cursors.down.isDown || this.wasd.S.isDown) direction.y += 1;

        if (direction.length() > 0) {
            return direction.normalize();
        }

        return direction.copy(this.joystick.force);
    }
}
