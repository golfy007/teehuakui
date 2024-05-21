document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');
    let score = 0;
    let gameActive = false;
    let activeHole = null;
    let gameInterval;
    let timer;
    let missCount = 0;
    let intervalTime = 1000;

    startButton.addEventListener('click', startGame);

    function startGame() {
        if (gameActive) return;
        gameActive = true;
        score = 0;
        missCount = 0;
        intervalTime = 1000;
        scoreDisplay.textContent = score;
        gameInterval = setInterval(() => {
            if (activeHole) {
                activeHole.classList.remove('active');
                clearTimeout(timer);
                missCount++;
                if (missCount > 3) {
                    endGame('กุ๊ยรักคุณ! คะแนนของคุณคือ ' + score);
                    return;
                }
            }
            const randomIndex = Math.floor(Math.random() * holes.length);
            activeHole = holes[randomIndex];
            activeHole.classList.add('active');

            timer = setTimeout(() => {
                activeHole.classList.remove('active');
                missCount++;
                if (missCount > 3) {
                    endGame('กุ๊ยรักคุณ! คะแนนของคุณคือ ' + score);
                }
            }, intervalTime);

            intervalTime = Math.max(300, intervalTime - 50); // Decrease the interval time but not below 300ms
        }, intervalTime);
    }

    function endGame(message) {
        gameActive = false;
        clearInterval(gameInterval);
        clearTimeout(timer);
        alert(message);
    }

    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            if (hole === activeHole && gameActive) {
                score++;
                scoreDisplay.textContent = score;
                hole.classList.add('show-ouch');
                setTimeout(() => {
                    hole.classList.remove('show-ouch');
                }, 500);
                hole.classList.remove('active');
                clearTimeout(timer);
                activeHole = null;
                missCount = 0; // Reset miss count if player hits the mole
            }
        });
    });

    // Stop game after 30 seconds
    setTimeout(() => {
        if (gameActive) {
            endGame('กุ๊ยรักคุณ! คะแนนของคุณคือ ' + score);
        }
    }, 30000);
});
