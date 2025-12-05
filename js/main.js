import { updateUI, renderVisualCanvas } from './ui.js';
import { handleMainClick, handleBuyUpgrade, handleAdvanceEra, handlePrevEra, handleNextEra, gameLoop, saveGame, loadGame } from './game.js';

// --- NOUVEAU : Le Pont pour React ---
// On attache la fonction d'achat à la fenêtre (window) pour que React puisse l'appeler
window.gameBridge = {
    buyUpgrade: (id) => {
        // On simule un événement comme si on avait cliqué sur un bouton HTML standard
        // pour réutiliser ta logique existante dans handleBuyUpgrade
        const mockEvent = {
            target: {
                closest: () => ({ dataset: { id: id } }) // On crée un faux élément HTML avec l'ID
            }
        };
        handleBuyUpgrade(mockEvent);
    }
};

function initializeGame() {
    // Note: On enlève l'écouteur sur 'upgrades-container' car c'est React qui gère les clics maintenant !
    // document.getElementById('upgrades-container').addEventListener('click', handleBuyUpgrade); <-- SUPPRIMER CELLE LIGNE

    document.getElementById('main-click-button').addEventListener('click', handleMainClick);
    document.getElementById('advance-era-button').addEventListener('click', handleAdvanceEra);
    document.getElementById('prev-era-button').addEventListener('click', handlePrevEra);
    document.getElementById('next-era-button').addEventListener('click', handleNextEra);

    // populateUpgrades(); <-- SUPPRIMER CETTE LIGNE (React s'en charge)
    loadGame();

    updateUI();

    renderVisualCanvas();

    setInterval(gameLoop, 1000);

    setInterval(() => { // Sauvegarde automatique toutes les 10 secondes (10000 ms)
        saveGame();
    }, 10000);

    window.addEventListener('beforeunload', () => { // Sauvegarder aussi quand on quitte la page (pas 100% garanti mais utile)
        saveGame();
    });
}

document.addEventListener('DOMContentLoaded', initializeGame);