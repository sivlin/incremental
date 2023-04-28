class Gold {
    constructor(game) {
        this.game = game;
        this.goldDisplay = document.getElementById("gold-display");
        this.upgradeButton = document.getElementById("upgrade-button");
        this.upgradeButton.addEventListener("click", this.upgrade.bind(this));
        this.updateDisplay();
    }

    upgrade() {
        this.game.upgradeGoldPerSecond();
        this.updateDisplay();
    }

    updateDisplay() {
        this.goldDisplay.textContent = `Gold: ${this.game.gold}`;
        this.upgradeButton.textContent = `Upgrade Gold Per Second (Cost: ${this.game.upgradeCost}, Current GPS: ${this.game.goldPerSecond}, Next GPS: ${this.game.goldPerSecond * this.game.upgradeMultiplier})`;
        this.upgradeButton.disabled = this.game.gold < this.game.upgradeCost;
    }
}
