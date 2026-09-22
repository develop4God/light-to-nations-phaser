/** Act of faith -- timing/precision (e.g. Acts 3, healing the lame man). */
export interface TimingEncounterData
{
    key: string;
    prompt: string;
    successLine: string;
    failLine: string;
    /** 0-1 fraction of the track marking the success zone. */
    zoneStart: number;
    zoneEnd: number;
    /** Fraction of the track crossed per second. */
    speed: number;
    faithXPReward: number;
}

/** Cost of faith -- debate under pressure (e.g. Acts 4, before the Sanhedrin). */
export interface DebateOption
{
    kind: 'bold' | 'hedge' | 'silent';
    label: string;
    conviction: number;
    intimidation: number;
}

export interface DebateRound
{
    question: string;
    options: DebateOption[];
}

export interface DebateEncounterData
{
    key: string;
    rounds: DebateRound[];
    roundSeconds: number;
    successLine: string;
    failLine: string;
    faithXPReward: number;
}

/** Deliverance -- low/no-fail grace beat (e.g. Acts 5, the jail). */
export interface GraceBeatData
{
    key: string;
    lines: string[];
    faithXPReward: number;
}
