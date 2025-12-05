export let gameState = {
    knowledge: 0,
    kps: 0,
    clickValue: 1,
    currentEra: 'stone_age',
    maxEraReached: 'stone_age',
    visualState: {
        'stone_age': [],
        'bronze_age': [],
        'iron_age': [],
    }
};

// Les améliorations sont ici car leur propriété "owned" change
export let upgrades = {
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
    'bronze_pickaxe': {
        name: 'Pioche en bronze', description: '+10 Connaissance par clic',
        baseCost: 120, costMultiplier: 1.15, type: 'click', value: 10,
        owned: 0, requiredEra: 'bronze_age', icon: '⛏️'
    },
    'small_mine': {
        name: 'Petite mine', description: '+15 Connaissance par seconde',
        baseCost: 600, costMultiplier: 1.20, type: 'auto', value: 15,
        owned: 0, requiredEra: 'bronze_age', icon: '⛰️'
    },
    'iron_sword': {
        name: 'Épée en fer', description: '+20 Connaissance par clic',
        baseCost: 600, costMultiplier: 1.6, type: 'click', value: 20,
        owned: 0, requiredEra: 'iron_age', icon: '⚔️'
    },
    'forge': {
        name: 'Forge', description: '+25 Connaissance par seconde',
        baseCost: 5000, costMultiplier: 1.4, type: 'auto', value: 25,
        owned: 0, requiredEra: 'iron_age', icon: '⚒️'
    }
};