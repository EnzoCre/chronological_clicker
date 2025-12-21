import { gameState, upgrades } from './state.js'
import { ERAS } from './constants.js'
import { formatNumber } from './utils.js'

// Récupère les éléments du DOM à la demande
function getDomRefs() {
  return {
    knowledgeDisplay: document.getElementById('knowledge-display'),
    kpsDisplay: document.getElementById('kps-display'),
    eraDisplay: document.getElementById('era-display'),
    clickValueDisplay: document.getElementById('click-value-display'),
    mainClickButton: document.getElementById('main-click-button'),
    upgradesContainer: document.getElementById('upgrades-container'),
    advanceEraButton: document.getElementById('advance-era-button'),
    visualCanvas: document.getElementById('visual-canvas'),
    prevEraButton: document.getElementById('prev-era-button'),
    nextEraButton: document.getElementById('next-era-button'),
  }
}

// Dessine les visuels sur la carte
export function renderVisualCanvas() {
  const { visualCanvas } = getDomRefs()
  if (!visualCanvas) return

  visualCanvas.innerHTML = ''
  const eraVisuals = gameState.visualState[gameState.currentEra]

  eraVisuals.forEach((visual) => {
    let element

    if (visual.isImage) {
      element = document.createElement('img')
      element.src = visual.icon
      element.className = 'visual-upgrade-icon visual-image'
    } else {
      element = document.createElement('div')
      element.className = 'visual-upgrade-icon'
      element.textContent = visual.icon
    }

    element.title = visual.name
    element.style.left = visual.x + '%'
    element.style.top = visual.y + '%'
    element.style.transform = `rotate(${visual.rotation || 0}deg)`
    visualCanvas.appendChild(element)
  })
}

// Ajoute un visuel pour un upgrade
export function addVisualToCanvas(upgrade, visualSource, isImage) {
  const finalIcon = visualSource || upgrade.icon
  const finalIsImage = isImage ?? false

  if (!finalIcon) return

  let minX = 10,
    maxX = 90
  let minY = 10,
    maxY = 90

  if (gameState.currentEra === 'stoneage') {
    if (upgrade.name === 'Pierre taillée') {
      minX = 3
      maxX = 30
      minY = 15
      maxY = 40
    } else if (upgrade.name === 'Mammouth') {
      minX = 60
      maxX = 85
      minY = 15
      maxY = 50
    } else if (upgrade.name === 'Cueilleur') {
      minX = 5
      maxX = 85
      minY = 60
      maxY = 80
    } else {
      minX = 20
      maxX = 80
      minY = 20
      maxY = 80
    }
  }

  const x = Math.random() * (maxX - minX) + minX
  const y = Math.random() * (maxY - minY) + minY

  gameState.visualState[gameState.currentEra].push({
    icon: finalIcon,
    name: upgrade.name,
    x,
    y,
    isImage: finalIsImage,
  })

  renderVisualCanvas()
}

// Met à jour les chiffres et les boutons
export function updateUI() {
  const {
    knowledgeDisplay,
    kpsDisplay,
    eraDisplay,
    clickValueDisplay,
    advanceEraButton,
    prevEraButton,
    nextEraButton,
  } = getDomRefs()

  if (!knowledgeDisplay) return

  knowledgeDisplay.innerText = formatNumber(gameState.knowledge)
  kpsDisplay.innerText = formatNumber(gameState.kps)
  clickValueDisplay.innerText = formatNumber(gameState.clickValue)

  const currentEraData = ERAS[gameState.currentEra]
  eraDisplay.innerText = currentEraData.name

  const actionLabel = document.getElementById('action-label')
  if (actionLabel) {
    actionLabel.innerText = currentEraData.clickerText
  }

  document.body.className = 'era-' + gameState.currentEra

  if (
    gameState.currentEra !== gameState.maxEraReached &&
    currentEraData.nextEra
  ) {
    if (advanceEraButton) {
      advanceEraButton.style.display = 'block'
      const cost = currentEraData.nextEraCost
      advanceEraButton.innerText = `Passer à l'ère ${ERAS[currentEraData.nextEra].name} (${formatNumber(
        cost,
      )})`
      advanceEraButton.disabled = gameState.knowledge < cost
    }
  } else if (advanceEraButton) {
    advanceEraButton.style.display = 'none'
  }

  if (prevEraButton) {
    prevEraButton.style.display = currentEraData.previousEra ? 'inline-block' : 'none'
  }
  if (nextEraButton) {
    nextEraButton.style.display =
      currentEraData.nextEra && gameState.currentEra !== gameState.maxEraReached
        ? 'inline-block'
        : 'none'
  }

  if (window.renderReactApp) {
    window.renderReactApp(upgrades, gameState.currentEra, gameState.knowledge)
  }
}
