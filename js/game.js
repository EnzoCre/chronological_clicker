import { gameState, upgrades } from './state.js';
import { ERAS } from './constants.js';
import { calculateCost } from './utils.js';
// CORRECTION : On ne demande plus "populateUpgrades" ici
import { updateUI, addVisualToCanvas, renderVisualCanvas } from './ui.js';

export function handleMainClick() {
    gameState.knowledge += gameState.clickValue;
    updateUI(); 
}

export function handleBuyUpgrade(event) {
    const upgradeButton = event.target.closest('.upgrade-button');
    if (!upgradeButton) return; 

    const upgradeId = upgradeButton.dataset.id;
    const upgrade = upgrades[upgradeId];
    const currentCost = calculateCost(upgrade);

    if (gameState.knowledge >= currentCost) {
        gameState.knowledge -= currentCost;
        upgrade.owned++;
        
        if (upgrade.type === 'click') gameState.clickValue += upgrade.value;
        else if (upgrade.type === 'auto') gameState.kps += upgrade.value;

        addVisualToCanvas(upgrade);
        updateUI();
    } else {
        upgradeButton.classList.add('shake');
        setTimeout(() => upgradeButton.classList.remove('shake'), 500);
    }
}

export function navigateToEra(eraId) {
    if (!ERAS[eraId]) return;
    gameState.currentEra = eraId;
    updateUI();
    // populateUpgrades(); <--- SUPPRIMÉ (C'est React qui gère ça via updateUI)
    renderVisualCanvas();
}

export function handlePrevEra() {
    const currentEra = ERAS[gameState.currentEra];
    if (currentEra.previousEra) navigateToEra(currentEra.previousEra);
}

export function handleNextEra() {
    const currentEra = ERAS[gameState.currentEra];
    if (currentEra.nextEra && gameState.currentEra !== gameState.maxEraReached) {
        navigateToEra(currentEra.nextEra);
    }
}

export function handleAdvanceEra() {
    const currentEraData = ERAS[gameState.currentEra];
    if (gameState.currentEra === gameState.maxEraReached && currentEraData.nextEra && gameState.knowledge >= currentEraData.nextEraCost) {
        gameState.knowledge -= currentEraData.nextEraCost;
        gameState.currentEra = currentEraData.nextEra;
        gameState.maxEraReached = currentEraData.nextEra;
        renderVisualCanvas(); 
        updateUI();
        // populateUpgrades(); <--- SUPPRIMÉ
    }
}

export function gameLoop() {
    gameState.knowledge += gameState.kps;
    updateUI();
}


/**
 * Sauvegarde le jeu dans le navigateur
 */
export function saveGame() {
    // 1. On prépare un objet propre à sauvegarder
    const dataToSave = {
        gameState: gameState,
        upgradesOwned: {} // On va lister juste combien on a de chaque amélioration
    };

    // 2. On sauvegarde le nombre d'objets possédés pour chaque upgrade
    for (const [id, upgrade] of Object.entries(upgrades)) {
        dataToSave.upgradesOwned[id] = upgrade.owned;
    }

    // 3. On écrit le tout dans le "localStorage" (converti en texte)
    localStorage.setItem('eraClickerSave_v1', JSON.stringify(dataToSave));
    console.log("💾 Jeu sauvegardé auto.");
}

/**
 * Charge le jeu depuis le navigateur
 */
export function loadGame() {
    const savedString = localStorage.getItem('eraClickerSave_v1');
    
    if (savedString) {
        const savedData = JSON.parse(savedString);

        // 1. Restaurer le gameState (Score, Ère, KPS, Visuels...)
        // On utilise Object.assign pour copier les valeurs sauvegardées DANS l'objet existant
        Object.assign(gameState, savedData.gameState);

        // 2. Restaurer les améliorations
        // On remet le bon nombre "owned" pour chaque amélioration
        if (savedData.upgradesOwned) {
            for (const [id, count] of Object.entries(savedData.upgradesOwned)) {
                if (upgrades[id]) {
                    upgrades[id].owned = count;
                }
            }
        }
        
        console.log("📂 Sauvegarde chargée !");
    }
}