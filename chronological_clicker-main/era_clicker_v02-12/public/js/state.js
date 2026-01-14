export let gameState = {
    playerName: null,
    playerPassword: null,
    knowledge: 0,
    kps: 0,
    clickValue: 1,
    currentEra: 'stone_age',
    maxEraReached: 'stone_age',
    visualState: {
        'stone_age': [],
        'medieval_age': [],
        'modern_age': [],
        'future_age': [],
        'transcendent_age': [],
    }
};

export let upgrades = {
    // --- ÂGE DE PIERRE ---
    'sharp_stone': {
        name: 'Silex Ancestral', description: '+1 Connaissance par clic',
        baseCost: 15, costMultiplier: 1.15, type: 'click', value: 1,
        owned: 0, requiredEra: 'stone_age', icon: '🪨'
    },
    'mammouth': {
        name: 'Mammouth Laineux', description: '+5 Connaissance par clic',
        baseCost: 100, costMultiplier: 1.2, type: 'click', value: 5,
        owned: 0, requiredEra: 'stone_age', icon: '🦣'
    },
    'forager': {
        name: 'Tribu Nomade', description: '+2 Connaissance par seconde',
        baseCost: 250, costMultiplier: 1.25, type: 'auto', value: 2,
        owned: 0, requiredEra: 'stone_age', icon: '🧑‍🌾'
    },

    // --- MOYEN ÂGE ---
    'parchment': {
        name: 'Manuscrit Interdit', description: '+50 Connaissance par clic',
        baseCost: 2500, costMultiplier: 1.3, type: 'click', value: 50,
        owned: 0, requiredEra: 'medieval_age', icon: '📜'
    },
    'monastery': {
        name: 'Abbaye Fortifiée', description: '+150 Connaissance par seconde',
        baseCost: 15000, costMultiplier: 1.35, type: 'auto', value: 150,
        owned: 0, requiredEra: 'medieval_age', icon: '⛪'
    },
    'bread': {
        name: 'Festin des Rois', description: '+300 Connaissance par clic',
        baseCost: 50000, costMultiplier: 1.4, type: 'click', value: 300,
        owned: 0, requiredEra: 'medieval_age', icon: '🥖'
    },

    // --- TEMPS ACTUEL ---
    'oil_barrel': {
        name: 'Or Noir Raffiné', description: '+1 000 Connaissance par clic',
        baseCost: 250000, costMultiplier: 1.4, type: 'click', value: 1000,
        owned: 0, requiredEra: 'modern_age', icon: '🛢️'
    },
    'computer': {
        name: 'Supercalculateur IA', description: '+5 000 Connaissance par seconde',
        baseCost: 1000000, costMultiplier: 1.45, type: 'auto', value: 5000,
        owned: 0, requiredEra: 'modern_age', icon: '💻'
    },
    'skyscraper': {
        name: 'Mégastructure Urbaine', description: '+20 000 Connaissance par seconde',
        baseCost: 5000000, costMultiplier: 1.5, type: 'auto', value: 20000,
        owned: 0, requiredEra: 'modern_age', icon: '🏙️'
    },

    // --- FUTUR ---
    'laser_gun': {
        name: 'Désintégrateur Plasma', description: '+100k Connaissance par clic',
        baseCost: 50000000, costMultiplier: 1.5, type: 'click', value: 100000,
        owned: 0, requiredEra: 'future_age', icon: '🔫'
    },
    'robot': {
        name: 'Nanobots Réplicants', description: '+500k Connaissance par seconde',
        baseCost: 250000000, costMultiplier: 1.55, type: 'auto', value: 500000,
        owned: 0, requiredEra: 'future_age', icon: '🤖'
    },
    'shuttle': {
        name: 'Croiseur Stellaire', description: '+2M Connaissance par seconde',
        baseCost: 1000000000, costMultiplier: 1.6, type: 'auto', value: 2000000,
        owned: 0, requiredEra: 'future_age', icon: '🚀'
    },

    // --- TRANSCENDANCE ---
    'soul_crystal': {
        name: 'Prisme de Réalité', description: '+50M Connaissance par clic',
        baseCost: 50000000000, costMultiplier: 1.7, type: 'click', value: 50000000,
        owned: 0, requiredEra: 'transcendent_age', icon: '💎'
    },
    'holy_chalice': {
        name: 'Source d\'Immortalité', description: '+250M Connaissance par seconde',
        baseCost: 250000000000, costMultiplier: 1.8, type: 'auto', value: 250000000,
        owned: 0, requiredEra: 'transcendent_age', icon: '🏆'
    },
    'seraph': {
        name: 'Archange Omniscient', description: '+1 Milliard Connaissance par seconde',
        baseCost: 1000000000000, costMultiplier: 2.0, type: 'auto', value: 1000000000,
        owned: 0, requiredEra: 'transcendent_age', icon: '👼'
    }
};