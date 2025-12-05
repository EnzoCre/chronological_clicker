import { gameState, upgrades } from './state.js';
import { ERAS } from './constants.js';
import { formatNumber, calculateCost } from './utils.js';

// Références DOM
const knowledgeDisplay = document.getElementById('knowledge-display');
const kpsDisplay = document.getElementById('kps-display');
const eraDisplay = document.getElementById('era-display');
const clickValueDisplay = document.getElementById('click-value-display');
const mainClickButton = document.getElementById('main-click-button');
const upgradesContainer = document.getElementById('upgrades-container');
const advanceEraButton = document.getElementById('advance-era-button');
const visualCanvas = document.getElementById('visual-canvas');
const prevEraButton = document.getElementById('prev-era-button'); 
const nextEraButton = document.getElementById('next-era-button');

export function renderVisualCanvas() {
    visualCanvas.innerHTML = '';
    const eraVisuals = gameState.visualState[gameState.currentEra];
    
    eraVisuals.forEach(visual => {
        let element;

        // Si c'est une image (Pierre, Mammouth, etc.)
        if (visual.isImage) {
            element = document.createElement('img');
            element.src = visual.icon; // Ici 'icon' contient le chemin de l'image (ex: images/...png)
            element.className = 'visual-upgrade-icon visual-image';
        } 
        // Si c'est un vieil émoji (pour les futures ères ou compatibilité)
        else {
            element = document.createElement('span');
            element.innerText = visual.icon;
            element.className = 'visual-upgrade-icon';
        }

        element.title = visual.name;
        element.style.left = `${visual.x}%`;
        element.style.top = `${visual.y}%`;
        element.style.transform = `rotate(${visual.rotation}deg)`;
        
        visualCanvas.appendChild(element);
    });
}

// On modifie la signature pour accepter visualSource et isImage
export function addVisualToCanvas(upgrade, visualSource, isImage) {
    // Si aucun visualSource n'est fourni, on garde l'icône par défaut
    const finalIcon = visualSource || upgrade.icon;
    
    // Si isImage n'est pas défini, on considère que c'est false
    const finalIsImage = isImage || false;

    if (!finalIcon) return;

    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    const rotation = Math.random() * 40 - 20;

    gameState.visualState[gameState.currentEra].push({
        icon: finalIcon, // On sauvegarde le chemin de l'image OU l'émoji
        name: upgrade.name,
        x: x,
        y: y,
        rotation: rotation,
        isImage: finalIsImage // IMPORTANT : On sauvegarde si c'est une image ou non pour le rechargement
    });
    
    renderVisualCanvas();
}



export function updateUI() {
    knowledgeDisplay.innerText = formatNumber(gameState.knowledge);
    kpsDisplay.innerText = formatNumber(gameState.kps);
    clickValueDisplay.innerText = formatNumber(gameState.clickValue);

    const currentEraData = ERAS[gameState.currentEra];
    eraDisplay.innerText = currentEraData.name;
    mainClickButton.innerText = currentEraData.clickerText;
    document.body.className = `era-${gameState.currentEra}`;

    // Bouton avancer
    if (gameState.currentEra === gameState.maxEraReached && currentEraData.nextEra) {
        advanceEraButton.style.display = 'block';
        const cost = currentEraData.nextEraCost;
        advanceEraButton.innerText = `Passer à l'Ère : ${ERAS[currentEraData.nextEra].name} (${formatNumber(cost)})`;
        advanceEraButton.disabled = gameState.knowledge < cost;
    } else {
        advanceEraButton.style.display = 'none';
    }

    // Boutons navigation
    prevEraButton.style.display = currentEraData.previousEra ? 'inline-block' : 'none';
    prevEraButton.innerText = `⬅️`;
    nextEraButton.style.display = (currentEraData.nextEra && gameState.currentEra !== gameState.maxEraReached) ? 'inline-block' : 'none';
    nextEraButton.innerText = `➡️`;
    
    // --- NOUVEAU : Appel à React ---
    // Si la fonction React est prête (chargée), on lui envoie les données
    if (window.renderReactApp) {
        // On passe l'état complet des améliorations, l'ère actuelle, et l'argent du joueur
        window.renderReactApp(upgrades, gameState.currentEra, gameState.knowledge);
    }
    
    // Boutons upgrade
    /*
    document.querySelectorAll('.upgrade-button').forEach(button => {
        const upgrade = upgrades[button.dataset.id];
        const cost = calculateCost(upgrade);
        button.querySelector('.upgrade-cost').innerText = formatNumber(cost);
        button.querySelector('.upgrade-owned').innerText = `Possédés : ${upgrade.owned}`;
        button.disabled = gameState.knowledge < cost;
    });
    */
}