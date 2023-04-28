class Game {
    constructor(tickRate) {
        this.tickRate = tickRate || 1000;
        this.gold = 0;
        this.goldPerSecond = 1;
        this.upgradeMultiplier = 2;
        this.upgradeCost = 10;
        this.stats = {
            "Gold per second": () => this.goldPerSecond,
            "Gold earned": () => this.gold,
        };
        this.goldObj = new Gold(this);
        this.statScreenObj = new StatScreen(this);
        setInterval(this.tick.bind(this), this.tickRate);
    }

    tick() {
        this.gold += this.goldPerSecond / (1000 / this.tickRate);
        this.goldObj.updateDisplay();
        this.statScreenObj.updateDisplay();
    }

    upgradeGoldPerSecond() {
        if (this.gold >= this.upgradeCost) {
            this.gold -= this.upgradeCost;
            this.goldPerSecond *= this.upgradeMultiplier;
            this.upgradeCost *= this.upgradeMultiplier;
            this.stats[`Gold per second (after upgrade)`] = () => this.goldPerSecond;
        }
    }
}
