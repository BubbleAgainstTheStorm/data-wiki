

document.addEventListener('DOMContentLoaded', function() {
    const difficultySelect = document.getElementById("difficulty-select");

    const filterableByDifficulty = document.getElementsByClassName("filter-difficulty");

    if (difficultySelect !== null) {
        const currentDifficulty = window.sessionStorage.getItem("difficulty");
        if (currentDifficulty !== null) {
            difficultySelect.value = currentDifficulty;
        }

        difficultySelect.addEventListener('change', function() {
            window.sessionStorage.setItem("difficulty", difficultySelect.value);
            const clazz = `difficulty-${difficultySelect.value}`;

            for (let el of filterableByDifficulty) {
                if (el.classList.contains(clazz))
                    el.classList.remove(`hidden`);
                else
                    el.classList.add(`hidden`);
            }
        }, false);
    }

    const infoPanel = document.getElementById("upgrade-panel");
    const upgradeName = document.getElementById("upgrade-name");
    const upgradeCost = document.getElementById("upgrade-cost");
    const upgradeRewards = document.getElementById("upgrade-rewards");

    for (const upgrade of document.getElementsByClassName("hex-frame")) {
        upgrade.addEventListener('mouseenter', function() {
            infoPanel.style.display = 'initial';
            const info = JSON.parse(upgrade.getAttribute("data-upgrade"));
            upgradeName.innerText = info.name;
            upgradeCost.innerHTML = '';
            for (const cost of info.cost) {
                var span = document.createElement('span');
                span.innerText = cost;
                upgradeCost.appendChild(span);
            }

            upgradeRewards.innerHTML = '';
            for (const reward of info.rewards) {
                var div = document.createElement('div');
                var nom = document.createElement('h5');
                nom.innerText = reward.name;
                var desc = document.createElement('p');
                desc.innerText = reward.description;

                div.appendChild(nom);
                div.appendChild(desc);

                upgradeRewards.appendChild(div);
            }


        });
        upgrade.addEventListener('mouseleave', function() {
            infoPanel.style.display = 'none';
        });
    }
}, false);