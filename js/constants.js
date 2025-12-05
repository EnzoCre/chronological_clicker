export const ERAS = {
    'stone_age': {
        name: 'Âge de Pierre',
        clickerText: 'Rassembler des pierres',
        nextEra: 'bronze_age',
        nextEraCost: 100,
        previousEra: null,
    },
    'bronze_age': {
        name: 'Âge du Bronze',
        clickerText: 'Forger des outils',
        nextEra: 'iron_age',
        nextEraCost: 5000,
        previousEra: 'stone_age',
    },
    'iron_age': {
        name: 'Âge du Fer',
        clickerText: 'Extraire du minerai',
        nextEra: null,
        nextEraCost: 999999,
        previousEra: 'bronze_age',
    }
};