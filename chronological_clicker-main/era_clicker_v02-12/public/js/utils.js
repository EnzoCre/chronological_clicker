export function formatNumber(num) {
    if (!num && num !== 0) return "0"; 

    if (num >= 1000000) {
        let formatted = num.toExponential(2);
        return formatted.replace('+', ''); 
    }

   return Math.floor(num).toLocaleString('fr-FR');
}
export function calculateCost(upgrade) {
    return Math.ceil(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.owned));
}