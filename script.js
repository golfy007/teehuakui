document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const moles = document.querySelectorAll('.mole');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');
    let score = 0;
    let gameActive = false;
    let activeHole = null;
    let gameInterval;

    startButton.addEventListener('click', startGame);

    function startGame() {
        if (gameActive) return;
        gameActive = true;
        score = 0;
        scoreDisplay.textContent = score;
        gameInterval = setInterval(() => {
            if (activeHole) {
                activeHole.classList.remove('active');
            }
            const randomIndex = Math.floor(Math.random() * holes.length);
            activeHole = holes[randomIndex];
            activeHole.classList.add('active');
        }, 1000);
    }

    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            if (hole === activeHole && gameActive) {
                score++;
                scoreDisplay.textContent = score;
                hole.classList.remove('active');
                activeHole = null;
            }
        });
    });

    // Stop game after 30 seconds
    setTimeout(() => {
        gameActive = false;
        clearInterval(gameInterval);
        alert('คุณแพ้กุ๊ย! คะแนนของคุณคือ ' + score);
    }, 30000);
});
