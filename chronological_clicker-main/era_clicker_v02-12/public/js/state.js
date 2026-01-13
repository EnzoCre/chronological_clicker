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
        'medieval_age': [], // Plus de bronze ni de fer ici
        'modern_age': [],
    }
};

export let upgrades = {
    // --- ÂGE DE PIERRE ---
    'sharp_stone': {
        name: 'Pierre taillée', description: '+1 Connaissance par clic',
        baseCost: 10, costMultiplier: 1.15, type: 'click', value: 1,
        owned: 0, requiredEra: 'stone_age', icon: '🪨'
    },
    'mammouth': {
        name: 'Mammouth', description: '+10 Connaissance par clic',
        baseCost: 100, costMultiplier: 2, type: 'click', value: 10,
        owned: 0, requiredEra: 'stone_age', icon: '🦣'
    },
    'forager': {
        name: 'Cueilleur', description: '+1 Connaissance par seconde',
        baseCost: 25, costMultiplier: 1.20, type: 'auto', value: 1,
        owned: 0, requiredEra: 'stone_age', icon: '🧑‍🌾'
    },

    // --- MOYEN ÂGE ---
    'parchment': {
        name: 'Parchemin', description: '+50 Connaissance par clic',
        baseCost: 250, costMultiplier: 1.5, type: 'click', value: 50,
        owned: 0, requiredEra: 'medieval_age', icon: '📜'
    },
    'monastery': {
        name: 'Eglise', description: '+100 Connaissance par seconde',
        baseCost: 100, costMultiplier: 1.3, type: 'auto', value: 100,
        owned: 0, requiredEra: 'medieval_age', icon: '⛪'
    },
    'bread': {
        name: 'Pain', description: '+150 Connaissance par clic',
        baseCost: 200, costMultiplier: 1.4, type: 'click', value: 150,
        owned: 0, requiredEra: 'medieval_age', icon: '🥖'
    },

    'oil_barrel': {
        name: 'Baril de pétrole', description: '+500 Connaissance par clic',
        baseCost: 500, costMultiplier: 1.5, type: 'click', value: 500,
        owned: 0, requiredEra: 'modern_age', icon: '🛢️'
    },
    'computer': {
        name: 'Ordinateur', description: '+1000 Connaissance par seconde',
        baseCost: 200, costMultiplier: 1.3, type: 'auto', value: 1000,
        owned: 0, requiredEra: 'modern_age', icon: '💻'
    },
    'skyscraper': {
        name: 'Gratte-ciel', description: '+5000 Connaissance par seconde',
        baseCost: 100, costMultiplier: 1.4, type: 'auto', value: 5000,
        owned: 0, requiredEra: 'modern_age', icon: '🏙️'
    }
};