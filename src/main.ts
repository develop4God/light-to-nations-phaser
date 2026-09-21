import { Game } from './scenes/Game';
import { AUTO, Game as PhaserGame, Scale, Types } from 'phaser';

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    input: {
        activePointers: 3
    },
    scene: [
        Game
    ]
};

export default new PhaserGame(config);
