export const ERAS = {
    'stone_age': {
        name: 'Âge de Pierre',
        clickerText: '',
        nextEra: 'medieval_age',
        nextEraCost: 1000,  
        previousEra: null,
    },
    'medieval_age': {
        name: 'Moyen Âge',
        clickerText: '',
        nextEra: 'modern_age',
        nextEraCost: 1000,
        previousEra: 'stone_age',
    },
    'modern_age': {
        name: 'Temps Actuel',
        clickerText: '',
        nextEra: 'future_age',
        nextEraCost: 1000,   // 100 Millions (exemple)
        previousEra: 'medieval_age',
    },
    'future_age': {
        name: 'Ère Futuriste',
        clickerText: '',
        nextEra: 'transcendent_age',
        nextEraCost: 5000, // 50 Milliards (exemple)
        previousEra: 'modern_age',
    },
    'transcendent_age': {
        name: 'Transcendance',
        clickerText: '',
        nextEra: null,
        nextEraCost: 0,
        previousEra: 'future_age',
    }
};