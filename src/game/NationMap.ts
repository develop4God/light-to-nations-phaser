import { Physics, Scene, Tilemaps } from 'phaser';

export interface NationMapConfig
{
    mapKey: string;
    tilesetName: string;
    tilesetImageKey: string;
    groundLayer: string;
    obstacleLayers: string[];
}

export class NationMap
{
    tilemap: Tilemaps.Tilemap;
    obstacles: Physics.Arcade.StaticGroup;
    groundLayer: Tilemaps.TilemapLayer;

    constructor (scene: Scene, config: NationMapConfig)
    {
        this.tilemap = scene.make.tilemap({ key: config.mapKey });

        const tileset = this.tilemap.addTilesetImage(config.tilesetName, config.tilesetImageKey);
        if (!tileset) {
            throw new Error(`NationMap: tileset "${config.tilesetName}" not found in map "${config.mapKey}"`);
        }

        const groundLayer = this.tilemap.createLayer(config.groundLayer, tileset);
        if (!groundLayer) {
            throw new Error(`NationMap: ground layer "${config.groundLayer}" not found in map "${config.mapKey}"`);
        }
        this.groundLayer = groundLayer;

        this.obstacles = scene.physics.add.staticGroup();
        for (const layerName of config.obstacleLayers) {
            this.obstacles.addMultiple(
                this.tilemap.createFromObjects(layerName, { classType: Physics.Arcade.Sprite })
            );
        }
        this.obstacles.refresh();
    }

    get widthInPixels (): number
    {
        return this.tilemap.widthInPixels;
    }

    get heightInPixels (): number
    {
        return this.tilemap.heightInPixels;
    }
}
