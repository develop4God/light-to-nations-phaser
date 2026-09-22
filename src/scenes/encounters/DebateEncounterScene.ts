import { GameObjects, Scene, Time } from 'phaser';
import { DebateEncounterData, DebateOption } from '../../game/encounters/types';
import { applyDebateChoice, DebateMeters, isDebateSuccess, TIMED_OUT_OPTION } from '../../game/encounters/debateLogic';

const PALETTE = {
    bg: 0x1b1812, panel: 0x26221a, line: 0x3c3527,
    good: 0x6fbf94, danger: 0xe08579, gold: 0xd3ac5c,
    text: '#efe6d4', dim: '#a99d86'
};

/**
 * Generic "cost of faith" scene: a timed interrogation. Each round offers
 * bold/hedge/silent responses that move conviction vs. intimidation meters.
 * Content-only per encounter -- build once, instantiate per DebateEncounterData.
 */
export class DebateEncounterScene extends Scene
{
    private roundIndex = 0;
    private meters: DebateMeters = { conviction: 20, intimidation: 20 };
    private locked = false;
    private timerEvent?: Time.TimerEvent;

    private questionText!: GameObjects.Text;
    private optionButtons: GameObjects.Text[] = [];
    private convictionBar!: GameObjects.Rectangle;
    private intimidationBar!: GameObjects.Rectangle;
    private timerBar!: GameObjects.Rectangle;

    private readonly barWidth = 160;

    constructor (private content: DebateEncounterData)
    {
        super(content.key);
    }

    init (): void
    {
        this.roundIndex = 0;
        this.meters = { conviction: 20, intimidation: 20 };
        this.locked = false;
    }

    create (): void
    {
        const { width, height } = this.scale;

        this.add.rectangle(width / 2, height / 2, width, height, PALETTE.bg);

        this.questionText = this.add.text(width / 2, height * 0.16, '', {
            fontSize: '19px', fontStyle: 'italic', color: PALETTE.text,
            wordWrap: { width: width - 140 }, align: 'center'
        }).setOrigin(0.5);

        this.timerBar = this.add.rectangle(width / 2, height * 0.28, width * 0.5, 6, PALETTE.gold);

        this.add.text(width * 0.3, height * 0.75, 'Conviction', { fontSize: '12px', color: PALETTE.dim }).setOrigin(0.5);
        this.add.rectangle(width * 0.3, height * 0.8, this.barWidth, 10, PALETTE.line);
        this.convictionBar = this.add.rectangle(width * 0.3 - this.barWidth / 2, height * 0.8, 0, 10, PALETTE.good).setOrigin(0, 0.5);

        this.add.text(width * 0.7, height * 0.75, 'Intimidation', { fontSize: '12px', color: PALETTE.dim }).setOrigin(0.5);
        this.add.rectangle(width * 0.7, height * 0.8, this.barWidth, 10, PALETTE.line);
        this.intimidationBar = this.add.rectangle(width * 0.7 - this.barWidth / 2, height * 0.8, 0, 10, PALETTE.danger).setOrigin(0, 0.5);

        this.events.once('shutdown', () => this.timerEvent?.remove());

        this.renderMeters();
        this.loadRound();
    }

    private renderMeters (): void
    {
        this.convictionBar.width = this.barWidth * (this.meters.conviction / 100);
        this.intimidationBar.width = this.barWidth * (this.meters.intimidation / 100);
    }

    private loadRound (): void
    {
        this.locked = false;
        const round = this.content.rounds[this.roundIndex];
        this.questionText.setText(round.question);

        this.optionButtons.forEach((btn) => btn.destroy());
        this.optionButtons = [];

        const { width, height } = this.scale;
        const startY = height * 0.42;

        round.options.forEach((option, i) => {
            const label = this.add.text(width / 2, startY + i * 40, option.label, {
                fontSize: '15px', color: PALETTE.text, backgroundColor: '#26221a',
                padding: { x: 12, y: 8 }, wordWrap: { width: width - 160 }
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            label.on('pointerover', () => label.setColor('#d3ac5c'));
            label.on('pointerout', () => label.setColor(PALETTE.text));
            label.on('pointerdown', () => this.resolveChoice(option));

            this.optionButtons.push(label);
        });

        this.timerEvent?.remove();
        this.timerBar.setScale(1, 1);
        const roundMs = this.content.roundSeconds * 1000;
        const start = this.time.now;

        this.timerEvent = this.time.addEvent({
            delay: 50,
            loop: true,
            callback: () => {
                const remaining = Math.max(0, 1 - (this.time.now - start) / roundMs);
                this.timerBar.scaleX = remaining;
                if (remaining <= 0 && !this.locked) {
                    this.resolveChoice({ kind: 'silent', label: 'Time runs out.', ...TIMED_OUT_OPTION });
                }
            }
        });
    }

    private resolveChoice (option: DebateOption): void
    {
        if (this.locked) return;
        this.locked = true;
        this.timerEvent?.remove();

        this.meters = applyDebateChoice(this.meters, option);
        this.renderMeters();

        this.roundIndex++;
        this.time.delayedCall(700, () => {
            if (this.roundIndex < this.content.rounds.length) {
                this.loadRound();
            } else {
                this.finish();
            }
        });
    }

    private finish (): void
    {
        const success = isDebateSuccess(this.meters);
        this.optionButtons.forEach((btn) => btn.destroy());
        this.optionButtons = [];
        this.questionText.setText(success ? this.content.successLine : this.content.failLine);

        this.time.delayedCall(1600, () => {
            this.events.emit('encounter-complete', { success, faithXPReward: this.content.faithXPReward });
        });
    }
}
