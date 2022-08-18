

document.addEventListener('DOMContentLoaded', function() {
    const difficultySelect = document.getElementById("difficulty-select");

    const filterableByDifficulty = document.getElementsByClassName("filter-difficulty");
    const constructionCosts = document.getElementsByClassName("cost-construction");
    const relicTimes = document.getElementsByClassName("relic-time");

    function setDifficulty(difficulty) {
        window.sessionStorage.setItem("difficulty", difficulty);
        const clazz = `difficulty-${difficulty}`;

        for (let el of filterableByDifficulty) {
            if (el.classList.contains(clazz))
                el.classList.remove(`hidden`);
            else
                el.classList.add(`hidden`);
        }

        const constructionMultiplier = 1 / (1.0 + (constructionRates.get(difficulty) ?? 0.0));
        for (let c of constructionCosts) {
            c.innerText = Math.round(parseFloat(c.getAttribute("data-base-cost")) * constructionMultiplier);
        }

        const relicMultiplier = 1 / (1.0 + (relicWorkRates.get(difficulty) ?? 0.0));
        for (let c of relicTimes) {
            const totalSeconds = Math.round(parseFloat(c.getAttribute("data-base-time")) * relicMultiplier);
            const inMins = Math.floor(totalSeconds / 60);
            const inSecs = Math.floor(totalSeconds % 60);
            c.innerText = inMins.toString().padStart(2, "0") + ":" + inSecs.toString().padStart(2, "0");
        }
    }


    if (difficultySelect !== null) {
        const currentDifficulty = window.sessionStorage.getItem("difficulty") ?? "0_Normal";
        difficultySelect.value = currentDifficulty;
        setDifficulty(currentDifficulty);

        difficultySelect.addEventListener('change', function() {
            setDifficulty(difficultySelect.value);
        }, false);
    }

    const infoPanel = document.getElementById("upgrade-panel");
    const upgradeName = document.getElementById("upgrade-name");
    const upgradeCost = document.getElementById("upgrade-cost");
    const upgradeRewards = document.getElementById("upgrade-rewards");

    let selectedUpgrade = null;

    for (const upgrade of document.getElementsByClassName("reward-provider")) {
        upgrade.addEventListener('click', function() {
            infoPanel.style.display = 'initial';
            const info = JSON.parse(upgrade.getAttribute("data-rewards"));
            upgradeName.innerText = info.name;
            upgradeCost.innerHTML = '';
            if ('cost' in info) {
                for (const cost of info.cost) {
                    var span = document.createElement('span');
                    span.innerText = cost;
                    upgradeCost.appendChild(span);
                }
            }

            upgradeRewards.innerHTML = '';
            for (const reward of info.rewards) {
                var div = document.createElement('div');
                var nom = document.createElement('h5');
                nom.innerText = reward.name;
                var desc = document.createElement('p');
                desc.innerText = reward.description.replace(/\<.*?\>/gm, '');

                div.appendChild(nom);
                div.appendChild(desc);

                upgradeRewards.appendChild(div);
            }

            infoPanel.scrollTop = 0;

            if (selectedUpgrade != null)
                selectedUpgrade.classList.remove('selected');
            selectedUpgrade = upgrade;
            selectedUpgrade.classList.add('selected');

        });
        upgrade.addEventListener('mouseleave', function() {
            // infoPanel.style.display = 'none';
        });
    }
}, false);