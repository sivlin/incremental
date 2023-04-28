let gold = 0;
let goldPerSecond = 1;
let upgradeCost = 10;

// Get HTML elements
const goldCounter = document.getElementById('gold-counter');
const upgradeButton = document.getElementById('upgrade-button');
const upgradeCostSpan = document.getElementById('upgrade-cost');
const goldPerSecondSpan = document.getElementById('gold-per-second');

// Update gold counter and stats
function updateGoldCounter() {
  gold += goldPerSecond;
  goldCounter.textContent = gold;

  // Update gold per second
  goldPerSecondSpan.textContent = goldPerSecond.toFixed(1);

  // Enable/disable upgrade button and update cost
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

// Upgrade gold per second and increase cost dynamically
function upgrade() {
  if (gold >= upgradeCost) {
    gold -= upgradeCost;
    goldPerSecond *= 2;
    upgradeCost *= 1.5;
    upgradeCost = Math.round(upgradeCost);
    updateGoldCounter();
  }
}

// Start game loop
updateGoldCounter();
setInterval(updateGoldCounter, 1000);

// Event listeners
upgradeButton.addEventListener('click', upgrade);
