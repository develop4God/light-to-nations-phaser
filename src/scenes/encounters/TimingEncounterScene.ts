import { GameObjects, Scene } from 'phaser';
import { TimingEncounterData } from '../../game/encounters/types';
import { advanceMarker, isTimingHit } from '../../game/encounters/timingLogic';

const PALETTE = { bg: 0x1b1812, track: 0x3c3527, zone: 0xa9822f, marker: 0xb5563c, text: '#efe6d4', dim: '#a99d86' };

/**
 * Generic "act of faith" scene: a marker sweeps a track, the player commits
 * at the right moment. Content-only per encounter -- build once, instantiate
 * per TimingEncounterData.
 */
export class TimingEncounterScene extends Scene
{
    private markerT = 0;
    private direction: 1 | -1 = 1;
    private locked = false;

    private marker!: GameObjects.Rectangle;
    private statusText!: GameObjects.Text;
    private trackX = 0;
    private trackWidth = 0;

    constructor (private content: TimingEncounterData)
    {
        super(content.key);
    }

    init (): void
    {
        this.markerT = 0;
        this.direction = 1;
        this.locked = false;
    }

    create (): void
    {
        const { width, height } = this.scale;

        this.add.rectangle(width / 2, height / 2, width, height, PALETTE.bg);
        this.add.text(width / 2, height * 0.2, this.content.prompt, {
            fontSize: '22px', color: PALETTE.text, wordWrap: { width: width - 120 }, align: 'center'
        }).setOrigin(0.5);

        this.trackWidth = width * 0.6;
        this.trackX = width / 2 - this.trackWidth / 2;
        const trackY = height / 2;

        this.add.rectangle(width / 2, trackY, this.trackWidth, 14, PALETTE.track);

        const zoneWidth = this.trackWidth * (this.content.zoneEnd - this.content.zoneStart);
        const zoneX = this.trackX + this.trackWidth * this.content.zoneStart + zoneWidth / 2;
        this.add.rectangle(zoneX, trackY, zoneWidth, 14, PALETTE.zone);

        this.marker = this.add.rectangle(this.trackX, trackY, 6, 26, PALETTE.marker);

        this.statusText = this.add.text(width / 2, trackY + 60, 'Press SPACE, or tap, at the right moment', {
            fontSize: '16px', color: PALETTE.dim
        }).setOrigin(0.5);

        this.input.keyboard?.once('keydown-SPACE', () => this.attempt());
        this.input.once('pointerdown', () => this.attempt());

        this.events.once('shutdown', () => {
            this.input.keyboard?.removeAllListeners('keydown-SPACE');
        });
    }

    update (_time: number, delta: number): void
    {
        if (this.locked) return;

        const next = advanceMarker(this.markerT, this.direction, this.content.speed, delta);
        this.markerT = next.markerT;
        this.direction = next.direction;

        this.marker.x = this.trackX + this.trackWidth * this.markerT;
    }

    private attempt (): void
    {
        if (this.locked) return;
        this.locked = true;

        const success = isTimingHit(this.markerT, this.content.zoneStart, this.content.zoneEnd);
        this.statusText.setText(success ? this.content.successLine : this.content.failLine);

        this.time.delayedCall(1200, () => this.finish(success));
    }

    private finish (success: boolean): void
    {
        this.events.emit('encounter-complete', { success, faithXPReward: this.content.faithXPReward });
    }
}
