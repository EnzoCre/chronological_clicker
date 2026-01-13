export const ERAS = {
    'stone_age': {
        name: 'Âge de Pierre',
        clickerText: '',
        nextEra: 'medieval_age',  // Lien direct vers le Moyen Âge
        nextEraCost: 1000,        // Coût pour passer au Moyen Âge (ajuste si tu veux)
        previousEra: null,
    },
    'medieval_age': {
        name: 'Moyen Âge',
        clickerText: '',
        nextEra: 'modern_age',            // Pas encore de suite
        nextEraCost: 1000,
        previousEra: 'stone_age', // Retour vers l'Âge de Pierre
    },
    'modern_age': {
        name: 'Temps Actuel',
        clickerText: '',
        nextEra: null,            // Ce sera le Cyberpunk plus tard
        nextEraCost: 100000000,   // 100 Millions (exemple)
        previousEra: 'medieval_age',
    }
};