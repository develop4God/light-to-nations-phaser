import { DebateEncounterData } from '../../game/encounters/types';

// Acts 4:1-22 -- Peter and John before the Sanhedrin council.
export const sanhedrinDebate: DebateEncounterData = {
    key: 'sanhedrinDebate',
    roundSeconds: 6,
    successLine: '"We must obey God rather than men." Peter and John are warned and released -- unshaken.',
    failLine: 'Peter is warned and released, but the fear in the room outweighed his answers.',
    faithXPReward: 30,
    rounds: [
        {
            question: 'The council demands: "By what power, or in what name, have you done this?"',
            options: [
                { kind: 'bold', label: '"Let it be known: by the name of Jesus Christ of Nazareth."', conviction: 30, intimidation: -10 },
                { kind: 'hedge', label: '"It... happened. I\'m not sure I can explain it."', conviction: 5, intimidation: 15 },
                { kind: 'silent', label: 'Say nothing.', conviction: -10, intimidation: 25 }
            ]
        },
        {
            question: 'They command him outright to stop speaking of this name at all.',
            options: [
                { kind: 'bold', label: '"We cannot but speak what we have seen and heard."', conviction: 30, intimidation: -10 },
                { kind: 'hedge', label: '"We\'ll try to be more careful about it."', conviction: 5, intimidation: 15 },
                { kind: 'silent', label: 'Look away, say nothing.', conviction: -10, intimidation: 25 }
            ]
        },
        {
            question: 'They threaten him further, weighing a punishment, and ask if he understands the cost.',
            options: [
                { kind: 'bold', label: '"Whether it is right to obey you rather than God, you judge."', conviction: 30, intimidation: -10 },
                { kind: 'hedge', label: '"I understand -- I\'ll consider your warning."', conviction: 5, intimidation: 15 },
                { kind: 'silent', label: 'Stay silent under the threat.', conviction: -10, intimidation: 25 }
            ]
        }
    ]
};
