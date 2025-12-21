import React from 'react'
import ReactDOM from 'react-dom/client'
import { upgrades } from './state.js'

function UpgradeItem({ id, upgrade, money, onBuy }) {
  const currentCost = Math.ceil(
    upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.owned),
  )
  const canBuy = money >= currentCost

  return (
    <button
      className="upgrade-button"
      disabled={!canBuy}
      onClick={() => onBuy(id)}
    >
      <div className="details">
        <span className="upgrade-name">
          {upgrade.icon} {upgrade.name}
        </span>
        <span className="upgrade-cost">
          {Math.floor(currentCost).toLocaleString('fr-FR')}
        </span>
      </div>
      <div className="details">
        <span className="upgrade-info">{upgrade.description}</span>
        <span className="upgrade-owned">Possédés : {upgrade.owned}</span>
      </div>
    </button>
  )
}

function UpgradeList({ upgradesData, currentEra, money }) {
  const upgradesToDisplay = Object.entries(upgradesData).filter(
    ([, upgrade]) => upgrade.requiredEra === currentEra,
  )

  const handleBuy = (id) => {
    if (window.gameBridge && window.gameBridge.buyUpgrade) {
      window.gameBridge.buyUpgrade(id)
    }
  }

  if (upgradesToDisplay.length === 0) {
    return (
      <p style={{ opacity: 0.5, padding: '10px' }}>
        Aucune amélioration pour cette ère.
      </p>
    )
  }

  return (
    <div>
      {upgradesToDisplay.map(([id, upgrade]) => (
        <UpgradeItem
          key={id}
          id={id}
          upgrade={upgrade}
          money={money}
          onBuy={handleBuy}
        />
      ))}
    </div>
  )
}

// NE crée plus le root ici, on exporte juste une fonction
export function mountReactUpgrades() {
  console.log('mountReactUpgrades appelé')
  const rootElement = document.getElementById('upgrades-container')
  console.log('rootElement upgrades-container =', rootElement)

  if (!rootElement) {
    console.error("Erreur critique : l'élément upgrades-container est introuvable !")
    return
  }

  const root = ReactDOM.createRoot(rootElement)

  window.renderReactApp = (upgradesData, currentEra, money) => {
    root.render(
      <UpgradeList
        upgradesData={upgradesData}
        currentEra={currentEra}
        money={money}
      />,
    )
  }
}


