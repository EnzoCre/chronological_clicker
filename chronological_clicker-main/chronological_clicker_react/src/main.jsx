import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

import {
  handleMainClick,
  handleBuyUpgrade,
  handleAdvanceEra,
  handlePrevEra,
  handleNextEra,
  gameLoop,
  saveGame,
  loadGame,
} from './legacy/game.js'

import { mountReactUpgrades } from './legacy/ReactUpgrades.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// On attend que la page soit complètement chargée
window.addEventListener('load', () => {
  console.log('window load → mountReactUpgrades')
  mountReactUpgrades()
})

window.addEventListener('DOMContentLoaded', initLegacyGame)

// Après que React ait rendu l'UI, on accroche les listeners legacy
function initLegacyGame() {
  console.log('initLegacyGame appelé')

  window.gameBridge = {
    buyUpgrade(id) {
      const mockEvent = {
        target: {
          closest: () => ({ dataset: { id } }),
        },
      }
      handleBuyUpgrade(mockEvent)
    },
  }

  const mainClickButton = document.getElementById('main-click-button')
  const advanceEraButton = document.getElementById('advance-era-button')
  const prevEraButton = document.getElementById('prev-era-button')
  const nextEraButton = document.getElementById('next-era-button')
  const upgradesContainer = document.getElementById('upgrades-container')

  console.log('upgradesContainer dans initLegacyGame =', upgradesContainer)

  if (!mainClickButton) {
    console.warn('main-click-button introuvable')
    return
  }

  mainClickButton.addEventListener('click', handleMainClick)

  if (advanceEraButton) {
    advanceEraButton.addEventListener('click', handleAdvanceEra)
  }
  if (prevEraButton) {
    prevEraButton.addEventListener('click', handlePrevEra)
  }
  if (nextEraButton) {
    nextEraButton.addEventListener('click', handleNextEra)
  }

  if (upgradesContainer) {
    upgradesContainer.addEventListener('click', (event) => {
      handleBuyUpgrade(event)
    })
  }

  loadGame()
  setInterval(gameLoop, 1000)
  setInterval(saveGame, 10000)
  window.addEventListener('beforeunload', saveGame)
}

// On attend que le DOM React soit prêt
window.addEventListener('DOMContentLoaded', initLegacyGame)