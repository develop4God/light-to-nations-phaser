import { describe, expect, it } from 'vitest';
import { advanceMarker, isTimingHit } from './timingLogic';

describe('isTimingHit', () => {
    it('is true inside the zone, inclusive of both edges', () => {
        expect(isTimingHit(0.4, 0.4, 0.6)).toBe(true);
        expect(isTimingHit(0.5, 0.4, 0.6)).toBe(true);
        expect(isTimingHit(0.6, 0.4, 0.6)).toBe(true);
    });

    it('is false outside the zone', () => {
        expect(isTimingHit(0.39, 0.4, 0.6)).toBe(false);
        expect(isTimingHit(0.61, 0.4, 0.6)).toBe(false);
    });
});

describe('advanceMarker', () => {
    it('moves forward at the given speed', () => {
        const result = advanceMarker(0.5, 1, 1, 100);
        expect(result.markerT).toBeCloseTo(0.6);
        expect(result.direction).toBe(1);
    });

    it('bounces back at the top of the track', () => {
        const result = advanceMarker(0.95, 1, 1, 100);
        expect(result.markerT).toBe(1);
        expect(result.direction).toBe(-1);
    });

    it('bounces forward at the bottom of the track', () => {
        const result = advanceMarker(0.05, -1, 1, 100);
        expect(result.markerT).toBe(0);
        expect(result.direction).toBe(1);
    });
});
