import { describe, expect, it } from 'vitest';
import { applyDebateChoice, isDebateSuccess } from './debateLogic';

describe('applyDebateChoice', () => {
    it('adds the option effect to both meters', () => {
        const result = applyDebateChoice(
            { conviction: 20, intimidation: 20 },
            { conviction: 30, intimidation: -10 }
        );

        expect(result).toEqual({ conviction: 50, intimidation: 10 });
    });

    it('clamps conviction and intimidation to 0-100', () => {
        const result = applyDebateChoice(
            { conviction: 90, intimidation: 5 },
            { conviction: 30, intimidation: -10 }
        );

        expect(result.conviction).toBe(100);
        expect(result.intimidation).toBe(0);
    });
});

describe('isDebateSuccess', () => {
    it('holds firm when conviction outweighs or matches intimidation', () => {
        expect(isDebateSuccess({ conviction: 60, intimidation: 40 })).toBe(true);
        expect(isDebateSuccess({ conviction: 50, intimidation: 50 })).toBe(true);
    });

    it('wavers when intimidation outweighs conviction', () => {
        expect(isDebateSuccess({ conviction: 40, intimidation: 60 })).toBe(false);
    });
});
