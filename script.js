let gold = 0;
let goldPerSecond = 1;
let upgradeCost = 10;

// Get HTML elements
const goldCounter = document.getElementById('gold-counter');
const upgradeButton = document.getElementById('upgrade-button');
const upgradeCostSpan = document.getElementById('upgrade-cost');
const goldPerSecondSpan = document.getElementById('gold-per-second');

// Update gold counter
function updateGoldCounter() {
	gold += goldPerSecond;
	goldCounter.textContent = gold;
	
	if (gold >= upgradeCost) {
		upgradeButton.disabled = false;
		upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost} gold)`;
		upgradeButton.classList.add('clickable');
	} else {
		upgradeButton.disabled = true;
		upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost} gold)`;
		upgradeButton.classList.remove('clickable');
	}
	
	// Update gold per second and upgrade cost based on purchase
	if (gold >= upgradeCost) {
		goldPerSecond *= 1.5;
		goldPerSecond = Math.round(goldPerSecond * 100) / 100;
		goldPerSecondSpan.textContent = goldPerSecond;
		upgradeCost *= 1.2;
		upgradeCost = Math.round(upgradeCost);
		upgradeCostSpan.textContent = upgradeCost;
	}
}

// Upgrade gold per second and increase cost dynamically
function upgrade() {
	gold -= upgradeCost;
	goldPerSecond *= 1.5;
	goldPerSecond = Math.round(goldPerSecond * 100) / 100;
	
	upgradeCost *= 1.2;
	upgradeCost = Math.round(upgradeCost);
	
	updateGoldCounter();
}

// Start game loop
setInterval(updateGoldCounter, 1000);

// Event listeners
upgradeButton.addEventListener('click', upgrade);
