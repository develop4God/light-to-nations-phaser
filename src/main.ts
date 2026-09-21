import { Game } from './scenes/Game';
import { AUTO, Game as PhaserGame, Types } from 'phaser';

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Game
    ]
};

export default new PhaserGame(config);
