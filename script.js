let gold = 0;
let goldPerSecond = 1;
let upgradeCost = 10;

// Get HTML elements
const goldCounter = document.getElementById('gold-counter');
const upgradeButton = document.getElementById('upgrade-button');
const upgradeCostSpan = document.getElementById('upgrade-cost');

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
}

// Upgrade gold per second and increase cost
function upgrade() {
	gold -= upgradeCost;
	goldPerSecond = 2;
	upgradeCost *= 2;
	upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost} gold)`;
	upgradeCostSpan.textContent = upgradeCost;
}

// Update gold counter every second
setInterval(updateGoldCounter, 1000);

// Add click event listener to upgrade button
upgradeButton.addEventListener('click', upgrade);
