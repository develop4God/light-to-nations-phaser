import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SaveManager } from './SaveManager';

describe('SaveManager', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('starts with zero XP and no completed encounters', () => {
        const save = new SaveManager();

        expect(save.faithXP).toBe(0);
        expect(save.isCompleted('healingLame')).toBe(false);
    });

    it('records completion and awards faith XP', () => {
        const save = new SaveManager();

        save.markCompleted('healingLame', 20);

        expect(save.isCompleted('healingLame')).toBe(true);
        expect(save.faithXP).toBe(20);
    });

    it('does not award XP twice for the same encounter', () => {
        const save = new SaveManager();

        save.markCompleted('healingLame', 20);
        save.markCompleted('healingLame', 20);

        expect(save.faithXP).toBe(20);
    });

    it('persists progress across instances via localStorage', () => {
        new SaveManager().markCompleted('healingLame', 20);

        const reloaded = new SaveManager();

        expect(reloaded.isCompleted('healingLame')).toBe(true);
        expect(reloaded.faithXP).toBe(20);
    });

    it('falls back to a fresh save when stored data is corrupt', () => {
        localStorage.setItem('light-to-nations-save', '{not json');

        const save = new SaveManager();

        expect(save.faithXP).toBe(0);
    });

    it('falls back to a fresh save when the stored version is outdated', () => {
        localStorage.setItem('light-to-nations-save', JSON.stringify({
            version: 0, faithXP: 999, encountersCompleted: ['healingLame']
        }));

        const save = new SaveManager();

        expect(save.faithXP).toBe(0);
        expect(save.isCompleted('healingLame')).toBe(false);
    });

    it('keeps working in memory when localStorage throws', () => {
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('quota exceeded');
        });

        const save = new SaveManager();
        expect(() => save.markCompleted('healingLame', 20)).not.toThrow();
        expect(save.isCompleted('healingLame')).toBe(true);

        setItemSpy.mockRestore();
    });
});
