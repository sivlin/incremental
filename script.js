class StatTracker {
  constructor() {
    this.stats = {};
  }
  
  getStat(statName) {
    if (!this.stats.hasOwnProperty(statName)) {
      this.stats[statName] = 0;
    }
    
    return this.stats[statName];
  }
  
  setStat(statName, value) {
    this.stats[statName] = value;
  }
  
  incrementStat(statName, value) {
    if (!this.stats.hasOwnProperty(statName)) {
      this.stats[statName] = 0;
    }
    
    this.stats[statName] += value;
  }
}

class Button {
  constructor(cost, multiplier, elementId, statTracker, upgradeButtonId) {
    this.cost = cost;
    this.multiplier = multiplier;
    this.element = document.getElementById(elementId);
    this.statTracker = statTracker;
    this.upgradeButton = document.getElementById(upgradeButtonId);
    
    this.updateButtonText();
    this.addClickHandler();
  }
  
  addClickHandler() {
    this.element.addEventListener("click", () => {
      if (this.statTracker.getStat("gold") >= this.cost) {
        this.statTracker.incrementStat("gold", -this.cost);
        this.statTracker.incrementStat("goldPerSecond", this.multiplier);
        this.cost *= 2;
        this.updateButtonText();
        this.upgradeButton.innerHTML = `Upgrade (Cost: ${this.cost} Gold, Increase: ${this.multiplier} Gold/s -> ${this.multiplier * 2} Gold/s)`;
      }
    });
  }
  
  updateButtonText() {
    this.element.innerHTML = `Generate Gold (Currently producing ${this.multiplier} Gold/s, Cost: ${this.cost} Gold)`;
  }
}

let statTracker = new StatTracker();
statTracker.setStat("gold", 0);
statTracker.setStat("goldPerSecond", 1);

let goldPerSecondElement = document.getElementById("gold-per-second");

setInterval(() => {
  let goldPerSecond = statTracker.getStat("goldPerSecond");
  statTracker.incrementStat("gold", goldPerSecond);
  goldPerSecondElement.innerHTML = `Gold/s: ${goldPerSecond}`;
}, 1000);

let button = new Button(10, 1, "gold-button", statTracker, "upgrade-button");

let upgradeButton = document.getElementById("upgrade-button");
upgradeButton.addEventListener("click", () => {
  let currentCost = button.cost;
  let currentMultiplier = button.multiplier;
  if (statTracker.getStat("gold") >= currentCost) {
    statTracker.incrementStat("gold", -currentCost);
    statTracker.incrementStat("goldPerSecond", currentMultiplier);
    button.cost *= 2;
    button.multiplier *= 2;
    button.updateButtonText();
    upgradeButton.innerHTML = `Upgrade (Cost: ${button.cost} Gold, Increase: ${button.multiplier/2} Gold/s -> ${button.multiplier} Gold/s)`;
  }
});
