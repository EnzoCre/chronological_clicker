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
        nextEra: 'cyberpunk_age',            
        nextEraCost: 100000,   // 100 Millions (exemple)
        previousEra: 'medieval_age',
    },
    'cyberpunk_age': {
        name: 'Cyberpunk',
        clickerText: '',
        nextEra: 'transcendant_age',            
        nextEraCost: 1000000,   // 100 Millions (exemple)
        previousEra: 'modern_age',
    },
    'transcendant_age': {
        name: 'Âge Transcendant',
        clickerText: '',
        nextEra: null,            
        nextEraCost: null,   // 100 Millions (exemple)
        previousEra: 'cyberpunk_age',

    }

};