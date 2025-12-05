// --- ÉTAPE 1: Gérer l'état du jeu ---
let gameState = {
    knowledge: 0,
    kps: 0, // Knowledge Per Second (Connaissance par seconde)
    clickValue: 1,
    currentEra: 'stone_age',
    maxEraReached: 'stone_age', // NOUVEAU : L'ère la plus avancée débloquée
    visualState: {
        'stone_age': [],
        'bronze_age': [],
        'iron_age': [],
    }
};

// --- ÉTAPE 2: Base de données des Ères et Améliorations ---
const ERAS = {
    'stone_age': {
        name: 'Âge de Pierre',
        clickerText: 'Rassembler des pierres',
        nextEra: 'bronze_age',
        nextEraCost: 100,
        previousEra: null, // NOUVEAU
    },
    'bronze_age': {
        name: 'Âge du Bronze',
        clickerText: 'Forger des outils',
        nextEra: 'iron_age',
        nextEraCost: 5000,
        previousEra: 'stone_age', // NOUVEAU
    },
    'iron_age': {
        name: 'Âge du Fer',
        clickerText: 'Extraire du minerai',
        nextEra: null, // Fin pour l'instant
        nextEraCost: 999999,
        previousEra: 'bronze_age', // NOUVEAU
    }
};

// On définit nos améliorations. (Inchangé)
let upgrades = {
    'sharp_stone': {
        name: 'Pierre taillée',
        description: '+1 Connaissance par clic',
        baseCost: 10,
        costMultiplier: 1.15,
        type: 'click', // 'click' (pour clic) ou 'auto' (pour KPS)
        value: 1,
        owned: 0,
        requiredEra: 'stone_age',
        icon: '🪨' // Icône pour le visuel
    },
    'mammouth': {
        name: 'Mammouth',
        description: '+10 Connaissance par clic',
        baseCost: 100,
        costMultiplier: 2,
        type: 'click', // 'click' (pour clic) ou 'auto' (pour KPS)
        value: 10,
        owned: 0,
        requiredEra: 'stone_age',
        icon: '🦣' // Icône pour le visuel
    },
    'forager': {
        name: 'Cueilleur',
        description: '+1 Connaissance par seconde',
        baseCost: 25,
        costMultiplier: 1.20,
        type: 'auto',
        value: 1,
        owned: 0,
        requiredEra: 'stone_age',
        icon: '🧑‍🌾' // Icône pour le visuel
    },
    'bronze_pickaxe': {
        name: 'Pioche en bronze',
        description: '+10 Connaissance par clic',
        baseCost: 120,
        costMultiplier: 1.15,
        type: 'click',
        value: 10,
        owned: 0,
        requiredEra: 'bronze_age',
        icon: '⛏️'
    },
    'small_mine': {
        name: 'Petite mine',
        description: '+15 Connaissance par seconde',
        baseCost: 600,
        costMultiplier: 1.20,
        type: 'auto',
        value: 15,
        owned: 0,
        requiredEra: 'bronze_age',
        icon: '⛰️'
    },
    'iron_sword': {
        name: 'Épée en fer',
        description: '+20 Connaissance par clic',
        baseCost: 600,
        costMultiplier: 1.6,
        type: 'click',
        value: 20,
        owned: 0,
        requiredEra: 'iron_age',
        icon: '⚔️'
    },
    'forge': {
        name: 'Forge',
        description: '+25 Connaissance par seconde',
        baseCost: 5000,
        costMultiplier: 1.4,
        type: 'auto',
        value: 25,
        owned: 0,
        requiredEra: 'iron_age',
        icon: '⚒️'
    }
};

// --- ÉTAPE 3: Références DOM ---
const knowledgeDisplay = document.getElementById('knowledge-display');
const kpsDisplay = document.getElementById('kps-display');
const eraDisplay = document.getElementById('era-display');
const clickValueDisplay = document.getElementById('click-value-display');
const mainClickButton = document.getElementById('main-click-button');
const upgradesContainer = document.getElementById('upgrades-container');
const advanceEraButton = document.getElementById('advance-era-button');
const visualCanvas = document.getElementById('visual-canvas');
// NOUVEAU : Boutons de navigation
const prevEraButton = document.getElementById('prev-era-button'); 
const nextEraButton = document.getElementById('next-era-button');

// --- ÉTAPE 4: Fonctions de Logique du Jeu ---

/**
 * NOUVELLE FONCTION : Change l'ère actuelle affichée
 */
function navigateToEra(eraId) {
    if (!ERAS[eraId]) return;

    gameState.currentEra = eraId;
    updateUI();
    populateUpgrades();
}

/**
 * NOUVELLE FONCTION : Gère le clic sur le bouton d'ère précédente
 */
function handlePrevEra() {
    const currentEra = ERAS[gameState.currentEra];
    if (currentEra.previousEra) {
        navigateToEra(currentEra.previousEra);
        renderVisualCanvas()
    }
}

/**
 * NOUVELLE FONCTION : Gère le clic sur le bouton d'ère suivante débloquée
 */
function handleNextEra() {
    const currentEra = ERAS[gameState.currentEra];
    // On peut naviguer vers l'avant si l'ère suivante existe ET que l'ère actuelle n'est pas la dernière débloquée
    if (currentEra.nextEra && gameState.currentEra !== gameState.maxEraReached) {
        navigateToEra(currentEra.nextEra);
        renderVisualCanvas()
    }
}

/**
 * Appelé à chaque clic sur le bouton principal (Inchangé)
 */
function handleMainClick() {
    gameState.knowledge += gameState.clickValue;
    updateUI(); 
    
}

/**
 * Gère l'achat d'une amélioration (Inchangé)
 */
function handleBuyUpgrade(event) {
    const upgradeButton = event.target.closest('.upgrade-button');
    if (!upgradeButton) return; 

    const upgradeId = upgradeButton.dataset.id;
    const upgrade = upgrades[upgradeId];
    const currentCost = calculateCost(upgrade);

    if (gameState.knowledge >= currentCost) {
        gameState.knowledge -= currentCost;
        
        upgrade.owned++;
        
        if (upgrade.type === 'click') {
            gameState.clickValue += upgrade.value;
        } else if (upgrade.type === 'auto') {
            gameState.kps += upgrade.value;
        }

        addVisualToCanvas(upgrade);
        updateUI();
    } else {
        upgradeButton.classList.add('shake');
        setTimeout(() => upgradeButton.classList.remove('shake'), 500);
    }
}

/**
 * NOUVELLE FONCTION : Ajoute un visuel sur le canvas (Inchangé)
 */
function addVisualToCanvas(upgrade) {
    if (!upgrade.icon) return;

    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    const rotation = Math.random() * 40 - 20;

    // 💾 Stocker les données de l'icône dans l'état visuel de l'ère actuelle
    gameState.visualState[gameState.currentEra].push({
        icon: upgrade.icon,
        name: upgrade.name,
        x: x,
        y: y,
        rotation: rotation
    });

    // 💡 Mise à jour immédiate pour l'affichage
    renderVisualCanvas(); 
}

/**
 * NOUVELLE FONCTION : Dessine le canvas visuel en fonction de l'ère actuelle
 */
function renderVisualCanvas() {
    // 🧹 Vider le canvas existant
    visualCanvas.innerHTML = '';
    
    const eraVisuals = gameState.visualState[gameState.currentEra];
    
    // 🖼️ Dessiner toutes les icônes stockées pour cette ère
    eraVisuals.forEach(visual => {
        const icon = document.createElement('span');
        icon.className = 'visual-upgrade-icon';
        icon.innerText = visual.icon;
        icon.title = visual.name;

        icon.style.left = `${visual.x}%`;
        icon.style.top = `${visual.y}%`;
        icon.style.transform = `rotate(${visual.rotation}deg)`;

        visualCanvas.appendChild(icon);
    });
}

/**
 * Gère le passage à l'ère suivante
 */
function handleAdvanceEra() {
    const currentEraData = ERAS[gameState.currentEra];
    
    // Vérifier si c'est la dernière ère débloquée et s'il y en a une suivante
    if (gameState.currentEra === gameState.maxEraReached && currentEraData.nextEra && gameState.knowledge >= currentEraData.nextEraCost) {
        
        gameState.knowledge -= currentEraData.nextEraCost;
        
        // Changer l'ère actuelle et mettre à jour l'ère MAXIMALE atteinte
        gameState.currentEra = currentEraData.nextEra;
        gameState.maxEraReached = currentEraData.nextEra; // 👈 CRUCIAL

        // Vider le canvas visuel
        visualCanvas.innerHTML = '';

        updateUI();
        populateUpgrades();
    }
}

function addKnowledge(amount) {
    // S'assurer que 'amount' est un nombre positif
    if (typeof amount === 'number') {
        gameState.knowledge += amount;
        console.log(`Ajouté ${formatNumber(amount)} connaissance(s). Total actuel: ${formatNumber(gameState.knowledge)}`);
        updateUI(); // Mettre à jour l'affichage
    } else {
        console.warn("Veuillez fournir un nombre positif valide.");
    }
}

/**
 * La boucle de jeu principale, appelée toutes les secondes (Inchangé)
 */
function gameLoop() {
    gameState.knowledge += gameState.kps;
    updateUI();
}

/**
 * Calcule le coût d'une amélioration (Inchangé)
 */
function calculateCost(upgrade) {
    return Math.ceil(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.owned));
}

// --- ÉTAPE 5: Fonctions de Mise à Jour de l'Interface ---

/**
 * Crée les boutons d'amélioration dans le HTML (Inchangé)
 */
function populateUpgrades() {
    upgradesContainer.innerHTML = ''; 

    for (const [id, upgrade] of Object.entries(upgrades)) {
        if (upgrade.requiredEra === gameState.currentEra) {
            const button = document.createElement('button');
            button.className = 'upgrade-button';
            button.dataset.id = id; 
            
            const cost = calculateCost(upgrade);

            button.innerHTML = `
                <div class="details">
                    <span class="upgrade-name">${upgrade.name}</span>
                    <span class="upgrade-cost">${formatNumber(cost)}</span>
                </div>
                <div class="details">
                    <span class="upgrade-info">${upgrade.description}</span>
                    <span class="upgrade-owned">Possédés : ${upgrade.owned}</span>
                </div>
            `;
            
            upgradesContainer.appendChild(button);
        }
    }
}

/**
 * Met à jour TOUS les éléments visuels avec les données du gameState
 */
function updateUI() {
    // Mettre à jour les stats
    knowledgeDisplay.innerText = formatNumber(gameState.knowledge);
    kpsDisplay.innerText = formatNumber(gameState.kps);
    clickValueDisplay.innerText = formatNumber(gameState.clickValue);

    // Mettre à jour les infos de l'ère
    const currentEraData = ERAS[gameState.currentEra];
    eraDisplay.innerText = currentEraData.name;
    mainClickButton.innerText = currentEraData.clickerText;

    // Mettre à jour la classe du body
    document.body.className = `era-${gameState.currentEra}`;

    // --- Gestion du bouton d'avancement d'ère ---
    // Le bouton "Avancer" n'est affiché que sur l'ère maximale atteinte
    if (gameState.currentEra === gameState.maxEraReached && currentEraData.nextEra) {
        advanceEraButton.style.display = 'block';
        const cost = currentEraData.nextEraCost;
        advanceEraButton.innerText = `Passer à l'Ère : ${ERAS[currentEraData.nextEra].name} (${formatNumber(cost)})`;
        advanceEraButton.disabled = gameState.knowledge < cost;
    } else {
        advanceEraButton.style.display = 'none';
    }


    // --- NOUVEAU : Gestion des boutons de navigation (flèches) ---

    // ⬅️ Bouton Précédent
    if (currentEraData.previousEra) {
        prevEraButton.style.display = 'inline-block';
        prevEraButton.innerText = `⬅️`; // Texte simple, le CSS le stylise
    } else {
        prevEraButton.style.display = 'none';
    }

    // ➡️ Bouton Suivant (pour naviguer vers une ère DÉBLOQUÉE)
    if (currentEraData.nextEra && gameState.currentEra !== gameState.maxEraReached) {
        nextEraButton.style.display = 'inline-block';
        nextEraButton.innerText = `➡️`; // Texte simple, le CSS le stylise
    } else {
        nextEraButton.style.display = 'none';
    }
    
    // Mettre à jour les boutons d'amélioration (coût et état désactivé)
    document.querySelectorAll('.upgrade-button').forEach(button => {
        const upgrade = upgrades[button.dataset.id];
        const cost = calculateCost(upgrade);
        
        button.querySelector('.upgrade-cost').innerText = formatNumber(cost);
        button.querySelector('.upgrade-owned').innerText = `Possédés : ${upgrade.owned}`;
        
        button.disabled = gameState.knowledge < cost;
    });
}

/**
 * Petite fonction utilitaire pour formater les grands nombres (Inchangé)
 */
function formatNumber(num) {
    return Math.floor(num).toLocaleString('fr-FR');
}

// --- ÉTAPE 6: Initialisation ---
function initializeGame() {
    // Attacher les écouteurs d'événements
    mainClickButton.addEventListener('click', handleMainClick);
    upgradesContainer.addEventListener('click', handleBuyUpgrade);
    advanceEraButton.addEventListener('click', handleAdvanceEra);
    // NOUVEAU : Écouteurs pour la navigation
    prevEraButton.addEventListener('click', handlePrevEra);
    nextEraButton.addEventListener('click', handleNextEra);

    // Charger les améliorations et l'UI pour la première fois
    populateUpgrades();
    updateUI();

    // Lancer la boucle de jeu
    setInterval(gameLoop, 1000);
}

document.addEventListener('DOMContentLoaded', initializeGame);