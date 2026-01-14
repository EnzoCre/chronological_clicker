function UpgradeItem({ id, upgrade, money, onBuy }) {
    const currentCost = Math.ceil(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.owned));
    const canBuy = money >= currentCost;

    return (
        <button 
            className="upgrade-button" 
            disabled={!canBuy} 
            onClick={() => onBuy(id)} 
        >
            <div className="details">
                <span className="upgrade-name">{upgrade.icon} {upgrade.name}</span>
                <span className="upgrade-cost">{Math.floor(currentCost).toLocaleString('fr-FR')}</span>
            </div>
            <div className="details">
                <span className="upgrade-info">{upgrade.description}</span>
                <span className="upgrade-owned">Possédés : {upgrade.owned}</span>
            </div>
        </button>
    );
}

function UpgradeList({ upgradesData, currentEra, money }) {
    const upgradesToDisplay = Object.entries(upgradesData)
        .filter(([id, upgrade]) => upgrade.requiredEra === currentEra);

    const handleBuy = (id) => {
        if (window.gameBridge && window.gameBridge.buyUpgrade) {
            window.gameBridge.buyUpgrade(id);
        }
    };

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
            {upgradesToDisplay.length === 0 && <p style={{opacity: 0.5, padding: '10px'}}>Aucune amélioration pour cette ère.</p>}
        </div>
    );
}

const rootElement = document.getElementById('upgrades-container');
let root = null;

if (rootElement) {
    root = ReactDOM.createRoot(rootElement);
} else {
    console.error("Erreur critique : L'élément #upgrades-container est introuvable !");
}

window.renderReactApp = (upgrades, currentEra, money) => {
    if (root) {
        root.render(
            <UpgradeList 
                upgradesData={upgrades} 
                currentEra={currentEra} 
                money={money} 
            />
        );
    }
};