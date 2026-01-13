import { gameState, upgrades } from './state.js';
import { ERAS } from './constants.js';
import { formatNumber } from './utils.js';

// Références DOM
const knowledgeDisplay = document.getElementById('knowledge-display');
const kpsDisplay = document.getElementById('kps-display');
const eraDisplay = document.getElementById('era-display');
const clickValueDisplay = document.getElementById('click-value-display');
const visualCanvas = document.getElementById('visual-canvas');
const prevEraButton = document.getElementById('prev-era-button'); 
const nextEraButton = document.getElementById('next-era-button');
const advanceEraButton = document.getElementById('advance-era-button');
const saveButton = document.getElementById("save-button");

export function renderVisualCanvas() {
    visualCanvas.innerHTML = '';
    const eraVisuals = gameState.visualState[gameState.currentEra];
    
    if (!eraVisuals) return;

    eraVisuals.forEach(visual => {
        let element;

        if (visual.isImage) {
            element = document.createElement('img');
            element.src = visual.icon; 
            element.className = 'visual-upgrade-icon visual-image';
            
            // --- AJOUT : Appliquer la taille personnalisée si elle existe ---
            if (visual.size) {
                element.style.width = `${visual.size}px`;
                element.style.height = `${visual.size}px`;
            }
            // ---------------------------------------------------------------

        } else {
            element = document.createElement('div');
            element.innerText = visual.icon;
            element.className = 'visual-upgrade-icon';
            // Pour les émojis, c'est le font-size qu'on change
            if (visual.size) {
                element.style.fontSize = `${visual.size / 2}px`; 
            }
        }

        element.title = visual.name;
        element.style.left = `${visual.x}%`;
        element.style.top = `${visual.y}%`;
        
        visualCanvas.appendChild(element);
    });
}

export function addVisualToCanvas(upgrade, visualSource, isImage = false) {
    const finalIcon = visualSource || upgrade.icon;
    if (!finalIcon) return;

    // Zones définies uniquement pour Pierre et Moyen Âge
    const zones = {
        stone_age: { 
            'Pierre taillée': [3, 30, 15, 40], 
            'Mammouth': [60, 85, 15, 50], 
            'Cueilleur': [5, 85, 60, 80], 
            def: [20, 80, 20, 80]
        },
        medieval_age: { 
            'Parchemin': [3, 30, 15, 40, 60], 
            'Pain': [60, 85, 15, 30, 40],
            'Eglise': [15, 75, 60, 80, 150], 
            def: [10, 90, 20, 80, 90]
        },
        modern_age: {
        // [minX, maxX, minY, maxY, SIZE]
        'Baril de pétrole': [5, 90, 70, 90, 50],   // En bas, taille moyenne
        'Ordinateur':       [5, 90, 50, 80, 40],   // Au milieu, petit
        'Gratte-ciel':      [5, 90, 10, 50, 150],  // En haut (fond), TRÈS grand
        def:                [10, 90, 20, 80, 60]
        }
    };

    const [minX, maxX, minY, maxY, size] = zones[gameState.currentEra]?.[upgrade.name] || zones[gameState.currentEra]?.def || [10, 90, 10, 90, 90];

    gameState.visualState[gameState.currentEra].push({
        icon: finalIcon, 
        name: upgrade.name, 
        isImage,
        x: Math.random() * (maxX - minX) + minX,
        y: Math.random() * (maxY - minY) + minY,
        size: size // <--- On sauvegarde la taille ici
    });

    renderVisualCanvas();
}

export function updateUI() {
    knowledgeDisplay.innerText = formatNumber(gameState.knowledge);
    kpsDisplay.innerText = formatNumber(gameState.kps);
    clickValueDisplay.innerText = formatNumber(gameState.clickValue);

    const currentEraData = ERAS[gameState.currentEra];
    
    // Sécurité au cas où currentEraData serait undefined (bug de sauvegarde)
    if (!currentEraData) {
        console.error("Erreur critique : L'ère actuelle n'existe pas dans les constantes.", gameState.currentEra);
        return;
    }

    eraDisplay.innerText = currentEraData.name;
    
    const actionLabel = document.getElementById('action-label');
    if (actionLabel) {
        actionLabel.innerText = currentEraData.clickerText;
    }
    
    document.body.className = `era-${gameState.currentEra}`;

    // Logique du bouton "Passer à l'ère suivante"
    if (gameState.currentEra === gameState.maxEraReached && currentEraData.nextEra) {
        advanceEraButton.style.display = 'block';
        const cost = currentEraData.nextEraCost;
        const nextEraName = ERAS[currentEraData.nextEra].name;
        advanceEraButton.innerText = `Passer à l'Ère : ${nextEraName} (${formatNumber(cost)})`;
        advanceEraButton.disabled = gameState.knowledge < cost;
    } else {
        advanceEraButton.style.display = 'none';
    }

    // Boutons de navigation (précédent / suivant)
    prevEraButton.style.display = currentEraData.previousEra ? 'inline-block' : 'none';
    prevEraButton.innerText = `⬅️`;
    
    nextEraButton.style.display = (currentEraData.nextEra && gameState.currentEra !== gameState.maxEraReached) ? 'inline-block' : 'none';
    nextEraButton.innerText = `➡️`;
    
    // Appel à React
    if (window.renderReactApp) {
        window.renderReactApp(upgrades, gameState.currentEra, gameState.knowledge);
    }
}