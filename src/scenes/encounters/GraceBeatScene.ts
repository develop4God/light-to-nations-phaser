import { GameObjects, Scene } from 'phaser';
import { GraceBeatData } from '../../game/encounters/types';

const PALETTE = { bg: 0x1b1812, glow: 0xd3ac5c, text: '#efe6d4', dim: '#a99d86' };

/**
 * Generic deliverance scene: an ambient glow and a sequence of lines the
 * player advances through at their own pace. No fail state -- grace is
 * received, not won. Content-only per encounter -- build once, instantiate
 * per GraceBeatData.
 */
export class GraceBeatScene extends Scene
{
    private lineIndex = 0;
    private lineText!: GameObjects.Text;
    private glow!: GameObjects.Arc;

    constructor (private content: GraceBeatData)
    {
        super(content.key);
    }

    init (): void
    {
        this.lineIndex = 0;
    }

    create (): void
    {
        const { width, height } = this.scale;

        this.add.rectangle(width / 2, height / 2, width, height, PALETTE.bg);

        this.glow = this.add.circle(width / 2, height * 0.35, 36, PALETTE.glow, 0.9);
        this.tweens.add({
            targets: this.glow,
            scale: { from: 1, to: 1.12 },
            alpha: { from: 0.85, to: 1 },
            duration: 1300,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.lineText = this.add.text(width / 2, height * 0.6, '', {
            fontSize: '18px', color: PALETTE.text, wordWrap: { width: width - 160 }, align: 'center'
        }).setOrigin(0.5);

        const hint = this.add.text(width / 2, height * 0.85, 'Tap, or press SPACE, to continue', {
            fontSize: '13px', color: PALETTE.dim
        }).setOrigin(0.5);

        this.input.keyboard?.on('keydown-SPACE', () => this.advance());
        this.input.on('pointerdown', () => this.advance());

        this.events.once('shutdown', () => {
            this.input.keyboard?.removeAllListeners('keydown-SPACE');
        });

        this.showLine();
        void hint;
    }

    private showLine (): void
    {
        this.lineText.setText(this.content.lines[this.lineIndex]);
    }

    private advance (): void
    {
        this.lineIndex++;
        if (this.lineIndex >= this.content.lines.length) {
            this.finish();
            return;
        }
        this.showLine();
    }

    private finish (): void
    {
        this.events.emit('encounter-complete', { success: true, faithXPReward: this.content.faithXPReward });
    }
}
