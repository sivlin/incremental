const game = new Game(1000);
game.goldObj.init();
game.statScreenObj.init();
const upgradeButton = document.getElementById("upgrade-button");
upgradeButton.addEventListener("click", () => {
    game.upgradeGoldPerSecond();
    upgradeButton.innerHTML = `Upgrade Gold per Second (Cost: ${game.upgradeCost}, +${game.goldPerSecond} GPS)`;
});
upgradeButton.innerHTML = `Upgrade Gold per Second (Cost: ${game.upgradeCost}, +${game.goldPerSecond} GPS)`;
