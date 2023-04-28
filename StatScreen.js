class StatScreen {
    constructor(game) {
        this.game = game;
        this.statDisplay = document.getElementById("stat-display");
        this.updateDisplay();
    }

    updateDisplay() {
        let html = "";
        for (const [name, value] of Object.entries(this.game.stats)) {
            html += `${name}: ${value}<br>`;
        }
        this.statDisplay.innerHTML = html;
    }
}
