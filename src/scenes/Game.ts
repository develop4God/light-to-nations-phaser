import { Scene } from 'phaser';
import { NationMap } from '../game/NationMap';
import { PilgrimPlayer } from '../game/PilgrimPlayer';
import { PlayerInput } from '../game/PlayerInput';
import { CoordinateOverlay } from '../ui/CoordinateOverlay';

export class Game extends Scene
{
    player!: PilgrimPlayer;
    playerInput!: PlayerInput;

    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.image('pilgrim', 'assets/hero/pilgrim_placeholder.png');
        this.load.tilemapTiledJSON('sample_village', 'assets/tiled/medieval_sample.json');
        this.load.image('medieval_tiles', 'assets/tiled/medieval_tilesheet.png');
        this.load.image('lush_meadow', 'assets/tiled/lush_meadow/lush-meadow-grass-001.png');
    }

    create ()
    {
        const nation = new NationMap(this, {
            mapKey: 'sample_village',
            tilesetName: 'medieval_tilesheet',
            tilesetImageKey: 'medieval_tiles',
            groundLayer: 'Land',
            obstacleLayers: ['Buildings', 'Trees']
        });

        nation.groundLayer.setVisible(false);
        this.add.tileSprite(0, 0, nation.widthInPixels, nation.heightInPixels, 'lush_meadow')
            .setOrigin(0, 0)
            .setDepth(-1);

        this.player = new PilgrimPlayer(this, 512, 512);
        this.physics.add.collider(this.player, nation.obstacles);

        this.physics.world.setBounds(0, 0, nation.widthInPixels, nation.heightInPixels);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.setBounds(0, 0, nation.widthInPixels, nation.heightInPixels);
        this.cameras.main.startFollow(this.player, true);

        this.playerInput = new PlayerInput(this, 120, this.scale.height - 120);

        new CoordinateOverlay(this, 64, 64);
    }

    update ()
    {
        this.player.move(this.playerInput.getDirection());
    }
}
