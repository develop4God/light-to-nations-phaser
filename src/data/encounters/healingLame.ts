import { TimingEncounterData } from '../../game/encounters/types';

// Acts 3:1-10 -- Peter heals the lame man at the temple gate called Beautiful.
export const healingLame: TimingEncounterData = {
    key: 'healingLame',
    prompt: 'A man lame from birth reaches out for alms. "Look at us," Peter says.',
    successLine: 'Miracle! He walked, and leaped, and praised God.',
    failLine: 'The moment passes -- wait for it, and reach again.',
    zoneStart: 0.4,
    zoneEnd: 0.6,
    speed: 0.55,
    faithXPReward: 20
};
