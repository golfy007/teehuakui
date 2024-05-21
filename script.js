document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');
    let score = 0;
    let gameActive = false;
    let activeHole = null;
    let gameInterval;
    let timer;

    startButton.addEventListener('click', startGame);

    function startGame() {
        if (gameActive) return;
        gameActive = true;
        score = 0;
        scoreDisplay.textContent = score;
        gameInterval = setInterval(() => {
            if (activeHole) {
                activeHole.classList.remove('active');
                clearTimeout(timer);
            }
            const randomIndex = Math.floor(Math.random() * holes.length);
            activeHole = holes[randomIndex];
            activeHole.classList.add('active');

            timer = setTimeout(() => {
                endGame();
            }, 1000);
        }, 1000);
    }

    function endGame() {
        gameActive = false;
        clearInterval(gameInterval);
        clearTimeout(timer);
        alert('กุ๊ยรักคุณ! คะแนนของคุณคือ ' + score);
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
            }
        });
    });

    // Stop game after 30 seconds
    setTimeout(() => {
        if (gameActive) {
            endGame();
        }
    }, 30000);
});
