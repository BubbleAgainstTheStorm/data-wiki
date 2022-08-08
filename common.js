

document.addEventListener('DOMContentLoaded', function() {
    let difficultySelect = document.getElementById("difficulty-select");
    let currentDifficulty = window.sessionStorage.getItem("difficulty");

    if (difficultySelect !== null) {
        if (currentDifficulty !== null) {
            difficultySelect.value = currentDifficulty;
        }
        difficultySelect.addEventListener('change', function() {
            window.sessionStorage.setItem("difficulty", difficultySelect.value);
        }, false);
    }
}, false);