import type { Game } from 'phaser';
import { SaveManager } from '../save/SaveManager';

export interface EncounterResult
{
    success: boolean;
    faithXPReward: number;
}

const FADE_MS = 200;

/**
 * Routes overworld <-> encounter transitions so scenes never reference each
 * other directly. An encounter scene only needs to emit 'encounter-complete'
 * on its own `this.events` -- this manager does the rest (save, resume, fade).
 */
export class GameStateManager
{
    readonly save: SaveManager;

    constructor (private game: Game, private overworldKey: string)
    {
        this.save = new SaveManager();
    }

    enterEncounter (encounterKey: string, data?: object): void
    {
        const sceneManager = this.game.scene;
        const overworld = sceneManager.getScene(this.overworldKey);
        if (!overworld) return;

        overworld.cameras.main.fadeOut(FADE_MS, 0, 0, 0);
        overworld.cameras.main.once('camerafadeoutcomplete', () => {
            overworld.scene.pause(this.overworldKey);
            overworld.scene.launch(encounterKey, data);

            sceneManager.getScene(encounterKey)?.events.once(
                'encounter-complete',
                (result: EncounterResult) => this.returnToOverworld(encounterKey, result)
            );
        });
    }

    private returnToOverworld (encounterKey: string, result: EncounterResult): void
    {
        if (result.success) {
            this.save.markCompleted(encounterKey, result.faithXPReward);
        }

        const overworld = this.game.scene.getScene(this.overworldKey);
        if (!overworld) return;

        overworld.scene.stop(encounterKey);
        overworld.scene.resume(this.overworldKey);
        overworld.events.emit('encounter-result', { encounterKey, ...result });
        overworld.cameras.main.fadeIn(FADE_MS, 0, 0, 0);
    }
}
