class Game {
  constructor() {
    this.gold = new Gold(0);
    this.statScreen = new StatScreen();
    this.tickRate = 1000;
    this.lastTick = Date.now();
  }

  update() {
    const now = Date.now();
    const elapsed = now - this.lastTick;
    if (elapsed >= this.tickRate) {
      this.lastTick = now;
      this.gold.addGold(this.gold.perSecond() * elapsed / 1000);
      this.statScreen.updateStats(this.gold);
    }
  }

  start() {
    setInterval(() => {
      this.update();
    }, 16);
  }
}

class Gold {
  constructor(amount, perSecond = 1, upgradeCost = 10, upgradeMultiplier = 2) {
    this.amount = amount;
    this.perSecondValue = perSecond;
    this.upgradeCost = upgradeCost;
    this.upgradeMultiplier = upgradeMultiplier;
  }

  addGold(amount) {
    this.amount += amount;
  }

  removeGold(amount) {
    if (this.amount >= amount) {
      this.amount -= amount;
      return true;
    } else {
      return false;
    }
  }

  perSecond() {
    return this.perSecondValue;
  }

  upgrade() {
    if (this.removeGold(this.upgradeCost)) {
      this.perSecondValue *= this.upgradeMultiplier;
      this.upgradeCost = Math.ceil(this.upgradeCost * this.upgradeMultiplier);
      return true;
    } else {
      return false;
    }
  }
}

class StatScreen {
  constructor() {
    this.goldPerSecond = document.getElementById("gold-per-second");
  }

  updateStats(gold) {
    this.goldPerSecond.textContent = `Gold Per Second: ${gold.perSecond().toFixed(2)}`;
  }
}

const game = new Game();
game.start();

const upgradeButton = document.getElementById("upgrade-button");
upgradeButton.addEventListener("click", () => {
  if (game.gold.upgrade()) {
    upgradeButton.textContent = `Upgrade Gold Production (${game.gold.perSecond().toFixed(2)} -> ${(game.gold.perSecond() * game.gold.upgradeMultiplier).toFixed(2)}) - Cost: ${game.gold.upgradeCost} Gold`;
  }
});

const purchaseButton = document.getElementById("purchase-button");
purchaseButton.addEventListener("click", () => {
  game.gold.addGold(10);
});
