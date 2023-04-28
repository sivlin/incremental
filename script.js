let gold = 0;
let goldPerSecond = 1;
let goldDisplay = document.getElementById("gold-display");
let gpsDisplay = document.getElementById("gps-display");

class StatTracker {
  constructor(id, initialValue) {
    this.id = id;
    this.value = initialValue;
    this.element = document.getElementById(id);
    this.updateDisplay();
  }

  increment(value) {
    this.value += value;
    this.updateDisplay();
  }

  updateDisplay() {
    this.element.textContent = `${this.id}: ${this.value}`;
  }
}

class Button {
  constructor(id, cost, gps) {
    this.id = id;
    this.cost = cost;
    this.gps = gps;
    this.level = 0;
    this.element = document.getElementById(id);
    this.element.addEventListener("click", () => {
      if (this.canAfford()) {
        this.payCost();
        this.levelUp();
      }
    });
    this.updateButtonText();
  }

  canAfford() {
    return gold >= this.cost;
  }

  payCost() {
    gold -= this.cost;
    goldDisplay.textContent = `Gold: ${gold}`;
  }

  levelUp() {
    this.level++;
    goldPerSecond += this.gps;
    this.cost = Math.floor(this.cost * 1.2);
    this.updateButtonText();
  }

  updateButtonText() {
    this.element.textContent = `${this.id} (Level ${this.level})\nCost: ${this.cost} Gold\n+${this.gps} GPS`;
  }
}

class UpgradeButton {
  constructor(id, baseCost, baseGPS, upgradeGPS) {
    this.id = id;
    this.cost = baseCost;
    this.baseGPS = baseGPS;
    this.upgradeGPS = upgradeGPS;
    this.level = 0;
    this.element = document.getElementById(id);
    this.element.addEventListener("click", () => {
      if (this.canAfford()) {
        this.payCost();
        this.upgrade();
        this.updateButtonText();
      }
    });
    this.element.addEventListener("mouseover", () => {
      const currentGPS = this.baseGPS + this.level * this.upgradeGPS;
      const nextGPS = this.baseGPS + (this.level + 1) * this.upgradeGPS;
      const tooltip = `Current GPS: ${currentGPS}\nNext GPS: ${nextGPS}`;
      this.element.setAttribute("title", tooltip);
    });
    this.updateButtonText();
  }

  canAfford() {
    return gold >= this.cost;
  }

  payCost() {
    gold -= this.cost;
  }

  upgrade() {
    this.level++;
    goldPerSecond += this.upgradeGPS;
    this.cost = Math.ceil(this.cost * 1.2);
  }

  updateButtonText() {
    const currentGPS = this.baseGPS + this.level * this.upgradeGPS;
    const nextGPS = this.baseGPS + (this.level + 1) * this.upgradeGPS;
    this.element.textContent = `Upgrade\n${this.cost} gold\nCurrent GPS: ${currentGPS}\nNext GPS: ${nextGPS}`;
  }
}

// initialize stats
let gpsTracker = new StatTracker("GPS", goldPerSecond);

// initialize buttons
let goldButton = new Button("gold-button", 10, 1);
let upgradeButton = new UpgradeButton("upgrade-button", 100, 1, 1);

// main game loop
setInterval(() => {
  gold += goldPerSecond;
  goldDisplay.textContent = `Gold: ${gold}`;
  gpsTracker.updateDisplay();
}, 1000);
