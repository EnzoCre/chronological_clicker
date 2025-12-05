import { gameState, upgrades } from './state.js';
import { ERAS } from './constants.js';
// 👇 AJOUTE formatNumber ICI
import { calculateCost, formatNumber } from './utils.js';
import { updateUI, addVisualToCanvas, renderVisualCanvas } from './ui.js';

/**
 * NOUVELLE FONCTION : Ajoute de la connaissance proprement
 * Cette fonction peut être utilisée par le clic, mais aussi par des bonus, etc.
 */
export function addKnowledge(amount) {
    // S'assurer que 'amount' est un nombre positif
    if (typeof amount === 'number') {
        gameState.knowledge += amount;
        // On affiche un log pour le debug (tu pourras l'enlever plus tard si ça pollue)
        console.log(`Ajouté ${formatNumber(amount)} connaissance(s). Total: ${formatNumber(gameState.knowledge)}`);
        updateUI(); 
    } else {
        console.warn("Erreur : addKnowledge a reçu une valeur invalide", amount);
    }
}
window.addKnowledge = addKnowledge;

/**
 * Gestionnaire du Clic Principal
 * C'est lui qui fait le lien entre le BOUTON et ta fonction addKnowledge
 */
export function handleMainClick() {
    // Le bouton utilise la valeur actuelle du clic définie dans le gameState
    addKnowledge(gameState.clickValue);
    
    // (Optionnel) Tu peux ajouter des effets visuels de clic ici plus tard
}

// ... Le reste de ton fichier (handleBuyUpgrade, navigateToEra, etc.) ne change pas ...
// COPIE-COLLE TA FONCTION handleBuyUpgrade (celle avec les Shiny) ICI
export function handleBuyUpgrade(event) {
    const upgradeButton = event.target.closest('.upgrade-button');
    if (!upgradeButton) return; 

    const upgradeId = upgradeButton.dataset.id;
    const upgrade = upgrades[upgradeId];
    const currentCost = calculateCost(upgrade);

    if (gameState.knowledge >= currentCost) {
        gameState.knowledge -= currentCost;
        upgrade.owned++;
        
        // --- LOGIQUE SHINY & VALEUR ---
        let valueToAdd = upgrade.value;
        let visualSource = upgrade.icon;
        let isImage = false; 

        if (upgradeId === 'sharp_stone') {
            isImage = true;
            const luck = Math.floor(Math.random() * 5);
            if (luck === 0) { 
                console.log("✨ PIERRE SHINY DÉCOUVERT ! ✨");
                valueToAdd = upgrade.value * 10; 
                visualSource = 'images/era_stone/Pierre/Pierre_Shiny.png';
            } else {
                visualSource = 'images/era_stone/Pierre/Pierre.png';
            }
        }

        if (upgradeId === 'mammouth') {
            isImage = true;
            const luck = Math.floor(Math.random() * 5);
            if (luck === 0) { 
                console.log("✨ MAMMOUTH SHINY DÉCOUVERT ! ✨");
                valueToAdd = upgrade.value * 10; 
                visualSource = 'images/era_stone/Mamouth/Mamouth_Shiny.png';
            } else {
                visualSource = 'images/era_stone/Mamouth/Mamouth.png';
            }
        }

        if (upgradeId === 'forager') {
            isImage = true;
            const luck = Math.floor(Math.random() * 5);
            if (luck === 0) { 
                console.log("✨ CUEILLEUR SHINY DÉCOUVERT ! ✨");
                valueToAdd = upgrade.value * 10; 
                visualSource = 'images/era_stone/Ceuilleur/Ceuilleur_Shiny.png';
            } else {
                visualSource = 'images/era_stone/Ceuilleur/Ceuilleur.png';
            }
        }

        if (upgrade.type === 'click') {
            gameState.clickValue += valueToAdd;
        } else if (upgrade.type === 'auto') {
            gameState.kps += valueToAdd;
        }

        addVisualToCanvas(upgrade, visualSource, isImage);
        updateUI();
    } else {
        upgradeButton.classList.add('shake');
        setTimeout(() => upgradeButton.classList.remove('shake'), 500);
    }
}

// ... Les autres fonctions (navigateToEra, gameLoop, saveGame, loadGame) restent identiques ...
export function navigateToEra(eraId) {
    if (!ERAS[eraId]) return;
    gameState.currentEra = eraId;
    updateUI();
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
    }
}

export function gameLoop() {
    // Pour le KPS (automatique), on peut aussi utiliser addKnowledge !
    if (gameState.kps > 0) {
        // Note: Ici on n'appelle pas addKnowledge pour éviter de spammer la console chaque seconde
        // Mais on pourrait le faire si on enlève le console.log
        gameState.knowledge += gameState.kps;
        updateUI();
    }
}

export function saveGame() {
    const dataToSave = {
        gameState: gameState,
        upgradesOwned: {}
    };
    for (const [id, upgrade] of Object.entries(upgrades)) {
        dataToSave.upgradesOwned[id] = upgrade.owned;
    }
    localStorage.setItem('eraClickerSave_v1', JSON.stringify(dataToSave));
    console.log("💾 Jeu sauvegardé auto.");
}

export function loadGame() {
    const savedString = localStorage.getItem('eraClickerSave_v1');
    if (savedString) {
        const savedData = JSON.parse(savedString);
        Object.assign(gameState, savedData.gameState);
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