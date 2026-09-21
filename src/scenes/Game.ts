import { Math as PhaserMath, Scene } from 'phaser';
import { PilgrimPlayer } from '../game/PilgrimPlayer';
import { VirtualJoystick } from '../ui/VirtualJoystick';

export class Game extends Scene
{
    player!: PilgrimPlayer;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    wasd!: { [key: string]: Phaser.Input.Keyboard.Key };
    joystick!: VirtualJoystick;

    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.image('pilgrim', 'assets/hero/pilgrim_placeholder.png');
    }

    create ()
    {
        this.player = new PilgrimPlayer(this, 512, 384);

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys('W,A,S,D') as { [key: string]: Phaser.Input.Keyboard.Key };

        this.joystick = new VirtualJoystick(this, 120, this.scale.height - 120);
    }

    update ()
    {
        const direction = new PhaserMath.Vector2(0, 0);

        if (this.cursors.left.isDown || this.wasd.A.isDown) direction.x -= 1;
        if (this.cursors.right.isDown || this.wasd.D.isDown) direction.x += 1;
        if (this.cursors.up.isDown || this.wasd.W.isDown) direction.y -= 1;
        if (this.cursors.down.isDown || this.wasd.S.isDown) direction.y += 1;

        if (direction.length() > 0) {
            direction.normalize();
        } else {
            direction.copy(this.joystick.force);
        }

        this.player.move(direction);
    }
}
