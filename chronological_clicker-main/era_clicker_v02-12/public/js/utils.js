export function formatNumber(num) {
    return Math.floor(num).toLocaleString('fr-FR');
}

export function calculateCost(upgrade) {
    return Math.ceil(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.owned));
}