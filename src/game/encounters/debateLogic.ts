import { DebateOption } from './types';

function clamp (value: number, min: number, max: number): number
{
    return Math.max(min, Math.min(max, value));
}

export interface DebateMeters
{
    conviction: number;
    intimidation: number;
}

/** Applies one chosen response's effect on the conviction/intimidation meters, clamped to 0-100. */
export function applyDebateChoice (meters: DebateMeters, option: Pick<DebateOption, 'conviction' | 'intimidation'>): DebateMeters
{
    return {
        conviction: clamp(meters.conviction + option.conviction, 0, 100),
        intimidation: clamp(meters.intimidation + option.intimidation, 0, 100)
    };
}

/** Held firm if conviction has not been outweighed by intimidation. */
export function isDebateSuccess (meters: DebateMeters): boolean
{
    return meters.conviction >= meters.intimidation;
}

export const TIMED_OUT_OPTION: Pick<DebateOption, 'conviction' | 'intimidation'> = { conviction: -10, intimidation: 25 };
