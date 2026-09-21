import { GameObjects, Math as PhaserMath, Scene } from 'phaser';

/**
 * Dev-only readout: click anywhere on the map to print its tile and pixel
 * coordinates on screen and in the console, for placing objects by hand.
 */
export class CoordinateOverlay
{
    private text: GameObjects.Text;
    private marker: GameObjects.Arc;

    constructor (scene: Scene, tileWidth: number, tileHeight: number)
    {
        this.text = scene.add.text(8, scene.scale.height - 24, 'Click the map to see tile coordinates', {
            fontSize: '14px', color: '#ffffff', backgroundColor: '#000000'
        }).setScrollFactor(0).setDepth(2000);

        this.marker = scene.add.circle(0, 0, 4, 0xff0000)
            .setVisible(false)
            .setDepth(2000);

        scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const tileX = PhaserMath.Snap.Floor(pointer.worldX, tileWidth) / tileWidth;
            const tileY = PhaserMath.Snap.Floor(pointer.worldY, tileHeight) / tileHeight;
            const pixelX = tileX * tileWidth;
            const pixelY = tileY * tileHeight;

            const message = `tile: ${tileX}, ${tileY}  (px: ${pixelX}, ${pixelY})`;
            this.text.setText(message);
            this.marker.setPosition(pointer.worldX, pointer.worldY).setVisible(true);
            console.log('[CoordinateOverlay]', message);
        });
    }
}
