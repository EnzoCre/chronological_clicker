import React from 'react'

function App() {
  return (
    <div>
      {/* Titre du jeu */}
      <h1 className="game-title">Era Clicker</h1>

      {/* Conteneur principal en 3 colonnes */}
      <div className="game-container">
        {/* Colonne gauche : stats + clicker */}
        <div className="column-left">
          {/* Panneau stats */}
          <div className="game-panel stats-section">
            <div>
              <span id="knowledge-display" className="stat-value">0</span>
              <span className="stat-label">Connaissance</span>
            </div>
            <div>
              <span id="kps-display" className="stat-value">0</span>
              <span className="stat-label">par sec.</span>
            </div>
          </div>

          {/* Panneau clicker */}
          <div className="game-panel clicker-section">
            {/* Contrôles d’ère */}
            <div className="era-controls">
              <button id="advance-era-button" disabled>
                Passer à l'ère suivante
              </button>
              <span id="era-display" className="current-era-label">
                Âge de Pierre
              </span>
              <button
                id="next-era-button"
                className="era-nav-button"
                style={{ display: 'none' }}
              >
                ▶
              </button>
            </div>

            {/* Bouton principal (image via CSS) */}
            <button id="main-click-button"></button>

            {/* Texte sous le bouton */}
            <p id="action-label" className="action-text">
              Rassembler des pierres
            </p>
            <p>
              Connaissance/clic :{' '}
              <span id="click-value-display">1</span>
            </p>
          </div>
        </div>

        {/* Colonne centrale : territoire */}
        <div className="column-middle">
          <div className="game-panel visual-canvas-section">
            <h2>Mon Territoire</h2>
            <div id="visual-canvas"></div>
          </div>
        </div>

        {/* Colonne droite : améliorations + évolution */}
        <div className="column-right">
          {/* Améliorations */}
          <div className="game-panel upgrade-section">
            <h2>Améliorations</h2>
            <div id="upgrades-container"></div>
          </div>

          {/* Évolution + reset */}
          <div className="game-panel era-section">
            <h2>Évolution</h2>
            <button id="advance-era-button" disabled>
              Passer à l&apos;ère suivante
            </button>
            <button
              id="reset-game-button"
              style={{
                marginTop: '10px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Recommencer à zéro
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

