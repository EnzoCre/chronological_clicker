import { updateUI, renderVisualCanvas } from './ui.js';
import { handleMainClick, handleBuyUpgrade, handleAdvanceEra, handlePrevEra, handleNextEra, gameLoop, saveGame, loadGame } from './game.js';

window.gameBridge = {
    buyUpgrade: (id) => {
        const mockEvent = {
            target: {
                closest: () => ({ dataset: { id: id } })
            }
        };
        handleBuyUpgrade(mockEvent);
    }
};

// 🚩 Variable pour savoir si on est en train de réinitialiser le jeu
let isResetting = false;

function initializeGame() {
    // Écouteurs d'événements
    document.getElementById('main-click-button').addEventListener('click', handleMainClick);
    document.getElementById('advance-era-button').addEventListener('click', handleAdvanceEra);
    document.getElementById('prev-era-button').addEventListener('click', handlePrevEra);
    document.getElementById('next-era-button').addEventListener('click', handleNextEra);

    // --- LOGIQUE DU BOUTON RESET CORRIGÉE ---
    const resetButton = document.getElementById('reset-game-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            const confirmReset = confirm("Es-tu sûr de vouloir TOUT effacer et recommencer à zéro ?");
            if (confirmReset) {
                // 1. On lève le drapeau : "Interdit de sauvegarder !"
                isResetting = true; 
                
                // 2. On supprime la sauvegarde
                localStorage.removeItem('eraClickerSave_v1');
                
                // 3. On recharge la page
                location.reload();
            }
        });
    }

    loadGame();
    updateUI();
    renderVisualCanvas();

    setInterval(gameLoop, 1000);

    // Sauvegarde auto périodique (toutes les 10s)
    setInterval(() => { 
        if (!isResetting) { // On ne sauvegarde que si on n'est pas en train de reset
            saveGame();
        }
    }, 10000);

    // Sauvegarde en quittant la page
    window.addEventListener('beforeunload', () => { 
        if (!isResetting) { // 👈 C'est ce IF qui corrige ton bug !
            saveGame();
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeGame);