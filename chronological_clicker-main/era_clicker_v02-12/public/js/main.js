import { updateUI, renderVisualCanvas } from './ui.js';
import { handleMainClick, handleBuyUpgrade, handleAdvanceEra, handlePrevEra, handleNextEra, gameLoop, saveGame, loadGame, register } from './game.js';

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

// Variable pour savoir si on est en train de réinitialiser le jeu
let isResetting = false;

function initializeGame() {
    
    //J'ai modifié la fonction pour lancer les listeners que si on les trouve sur la page, sinon ça fait planter le programme avec les différentes pages
    const btnMainClick = document.getElementById('main-click-button');
    if (btnMainClick) btnMainClick.addEventListener('click', handleMainClick);

    const btnAdvance = document.getElementById('advance-era-button');
    if (btnAdvance) btnAdvance.addEventListener('click', handleAdvanceEra);

    const btnPrev = document.getElementById('prev-era-button');
    if (btnPrev) btnPrev.addEventListener('click', handlePrevEra);

    const btnNext = document.getElementById('next-era-button');
    if (btnNext) btnNext.addEventListener('click', handleNextEra);

    const btnSave = document.getElementById('save-button');
    if (btnSave) btnSave.addEventListener('click', saveGame);

    const btnLoad = document.getElementById('load-button');
    if (btnLoad) btnLoad.addEventListener('click', loadGame);

    const btnReset = document.getElementById('reset-game-button');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            const confirmReset = confirm("Es-tu sûr de vouloir TOUT effacer ?");
            if (confirmReset) {
                isResetting = true; 
                localStorage.removeItem('eraClickerSave_v1');
                location.reload();
            }
        });
    }

    
    const btnRegister = document.getElementById('register-button');
    if (btnRegister) {
        
        btnRegister.addEventListener('click', register);
    }

    
    if (document.getElementById('game-container') || document.getElementById('main-click-button')) {
        updateUI();
        renderVisualCanvas();
        setInterval(gameLoop, 1000);
    }

    
}

document.addEventListener('DOMContentLoaded', initializeGame);