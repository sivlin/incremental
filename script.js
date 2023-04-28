class Game {
  constructor() {
    this.stats = new Stats();
    this.buttons = new ButtonCollection();
    this.updateInterval = null;
  }

  start() {
    this.updateInterval = setInterval(() => {
      this.stats.update();
      this.updateStats();
    }, 1000);
  }

  stop() {
    clearInterval(this.updateInterval);
  }

  updateStats() {
    this.stats.updateDOM();
    this.buttons.updateDOM();
  }
}

class Stats {
  constructor() {
    this.gold = new Stat('Gold', 0, 1);
    this.customStat = new Stat('Custom', 0, 0.1); // Example custom stat
  }

  update() {
    this.gold.increment();
    this.customStat.increment(); // Example custom stat
  }

  updateDOM() {
    this.gold.updateDOM();
    this.customStat.updateDOM(); // Example custom stat
  }
}

class Stat {
  constructor(name, value, increment) {
    this.name = name;
    this.value = value;
    this.increment = increment;
    this.element = null;
  }

  increment() {
    this.value += this.increment;
  }

  updateDOM() {
    if (!this.element) {
      this.element = document.createElement('span');
      this.element.textContent = `${this.name}: ${this.value.toFixed(1)}`;
      document.body.appendChild(this.element);
    } else {
      this.element.textContent = `${this.name}: ${this.value.toFixed(1)}`;
    }
  }
}

class ButtonCollection {
  constructor() {
    this.buttons = [];
  }

  add(button) {
    this.buttons.push(button);
  }

  updateDOM() {
    this.buttons.forEach(button => button.updateDOM());
  }
}

class Button {
  constructor(name, cost, effect) {
    this.name = name;
    this.cost = cost;
    this.effect = effect;
    this.element = null;
  }

  buy() {
    if (game.stats.gold.value >= this.cost) {
      game.stats.gold.value -= this.cost;
      this.cost *= 2;
      this.effect();
      this.updateDOM();
    }
  }

  updateDOM() {
    if (!this.element) {
      this.element = document.createElement('button');
      this.element.textContent = `${this.name} (Cost: ${this.cost})`;
      document.body.appendChild(this.element);
      this.element.addEventListener('click', () => this.buy());
    } else {
      this.element.textContent = `${this.name} (Cost: ${this.cost})`;
    }
  }
}

// Initialize game
const game = new Game();

// Add stats
game.stats.gold.element = document.getElementById('gold-counter'); // Gold is a special case
game.stats.customStat.element = document.createElement('span'); // Example custom stat
document.body.appendChild(game.stats.customStat.element); // Example custom stat

// Add buttons
const upgradeButton = new Button('Upgrade', 10, () => {
  game.stats.gold.increment += 1;
});
game.buttons.add(upgradeButton);

// Start game loop
game.start();
