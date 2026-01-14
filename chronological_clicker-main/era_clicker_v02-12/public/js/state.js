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
        'cyberpunk_age': [],
        'transcendant_age': [],
    }
};

export let upgrades = {
    // --- ÂGE DE PIERRE (Début - Unités ~1 à 100) ---
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

    // --- MOYEN ÂGE (Intermédiaire - Unités ~100 à 1k) ---
    'parchment': {
        name: 'Parchemin', description: '+50 Connaissance par clic',
        baseCost: 250, costMultiplier: 1.5, type: 'click', value: 50,
        owned: 0, requiredEra: 'medieval_age', icon: '📜'
    },
    'monastery': {
        name: 'Eglise', description: '+100 Connaissance par seconde',
        baseCost: 1000, costMultiplier: 1.3, type: 'auto', value: 100,
        owned: 0, requiredEra: 'medieval_age', icon: '⛪'
    },
    'bread': {
        name: 'Pain', description: '+150 Connaissance par clic',
        baseCost: 2000, costMultiplier: 1.4, type: 'click', value: 150,
        owned: 0, requiredEra: 'medieval_age', icon: '🥖'
    },

    // --- TEMPS MODERNE (Industriel - Unités ~1k à 10k) ---
    'oil_barrel': {
        name: 'Baril de pétrole', description: '+500 Connaissance par clic',
        baseCost: 5000, costMultiplier: 1.5, type: 'click', value: 500,
        owned: 0, requiredEra: 'modern_age', icon: '🛢️'
    },
    'computer': {
        name: 'Ordinateur', description: '+1 000 Connaissance par seconde',
        baseCost: 15000, costMultiplier: 1.3, type: 'auto', value: 1000,
        owned: 0, requiredEra: 'modern_age', icon: '💻'
    },
    'skyscraper': {
        name: 'Gratte-ciel', description: '+5 000 Connaissance par seconde',
        baseCost: 50000, costMultiplier: 1.4, type: 'auto', value: 5000,
        owned: 0, requiredEra: 'modern_age', icon: '🏙️'
    },

    // --- CYBERPUNK (Futur - Unités ~10k à 100k) ---
    // Note : Ici les coûts augmentent drastiquement pour préparer à la fin du jeu
    'robot': {
        name: 'Robot IA', description: '+10 000 Connaissance par seconde',
        baseCost: 250000, costMultiplier: 1.3, type: 'auto', value: 10000,
        owned: 0, requiredEra: 'cyberpunk_age', icon: '🤖'
    },
    'laser_gun': { // J'ai renommé 'furturist_gun' pour éviter la faute de frappe
        name: 'Arme Laser', description: '+25 000 Connaissance par clic',
        baseCost: 500000, costMultiplier: 1.4, type: 'click', value: 25000,
        owned: 0, requiredEra: 'cyberpunk_age', icon: '🔫'
    },
    'spaceship': {
        name: 'Vaisseau Spatial', description: '+50 000 Connaissance par seconde',
        baseCost: 1000000, costMultiplier: 1.35, type: 'auto', value: 50000,
        owned: 0, requiredEra: 'cyberpunk_age', icon: '🚀'
    },

    // --- TRANSCENDANT (Divin - Unités ~Millions/Milliards) ---
    // Note : Le "End Game", des coûts astronomiques pour des gains colossaux
    'crystal': {
        name: 'Cristal Cosmique', description: '+1 Million Connaissance par clic',
        baseCost: 50000000, costMultiplier: 1.5, type: 'click', value: 1000000,
        owned: 0, requiredEra: 'transcendant_age', icon: '💎'
    },
    'chalice': {
        name: 'Calice Sacré', description: '+5 Millions Connaissance par seconde',
        baseCost: 250000000, costMultiplier: 1.4, type: 'auto', value: 5000000,
        owned: 0, requiredEra: 'transcendant_age', icon: '🏆' 
    },
    'angel': {
        name: 'Être de Lumière', description: '+50 Millions Connaissance par seconde',
        baseCost: 1000000000, costMultiplier: 1.5, type: 'auto', value: 50000000,
        owned: 0, requiredEra: 'transcendant_age', icon: '😇'
    }
};