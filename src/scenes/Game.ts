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
        this.load.tilemapTiledJSON('sample_village', 'assets/tiled/medieval_sample.json');
        this.load.image('medieval_tiles', 'assets/tiled/medieval_tilesheet.png');
    }

    create ()
    {
        const map = this.make.tilemap({ key: 'sample_village' });
        const tileset = map.addTilesetImage('medieval_tilesheet', 'medieval_tiles')!;

        map.createLayer('Land', tileset);

        const obstacles = this.physics.add.staticGroup();
        obstacles.addMultiple(map.createFromObjects('Buildings', { classType: Phaser.Physics.Arcade.Sprite }));
        obstacles.addMultiple(map.createFromObjects('Trees', { classType: Phaser.Physics.Arcade.Sprite }));
        obstacles.refresh();

        this.player = new PilgrimPlayer(this, 512, 512);
        this.physics.add.collider(this.player, obstacles);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true);

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
