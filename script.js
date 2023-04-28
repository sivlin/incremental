let gold = 0;

function incrementGold() {
	gold += 1;
	document.getElementById("gold").innerText = gold;
}

const nightModeToggle = document.getElementById("night-mode-toggle");
const body = document.body;

nightModeToggle.addEventListener("change", function() {
	if (this.checked) {
		body.classList.add("night-mode");
	} else {
		body.classList.remove("night-mode");
	}
});

const settingsButton = document.querySelector('nav a[href="#"]');
const settingsMenu = document.createElement("div");
settingsMenu.className = "settings";
settingsMenu.innerHTML = `
	<label>
		<input type="checkbox" id="night-mode-toggle">
		Night mode
	</label>
`;

settingsButton.addEventListener("click", function(e) {
	e.preventDefault();
	document.body.appendChild(settingsMenu);
});

document.addEventListener("click", function(e) {
	if (e.target.closest(".settings") !== settingsMenu && e.target !== settingsButton) {
		settingsMenu.remove();
	}
});
