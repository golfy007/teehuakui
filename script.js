document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('highScore');
    const highScoreNameDisplay = document.getElementById('highScoreName');
    const startButton = document.getElementById('startButton');
    let score = 0;
    let highScore = 0;
    let highScoreName = 'N/A';
    let gameActive = false;
    let activeHoles = [];
    let gameInterval;
    let timer;
    let intervalTime = 1500;
    let playerName = '';

    startButton.addEventListener('click', startGame);

    function startGame() {
        if (gameActive) return;
        gameActive = true;
        score = 0;
        intervalTime = 1500;
        activeHoles = [];
        scoreDisplay.textContent = score;
        gameInterval = setInterval(() => {
            clearHoles();
            for (let i = 0; i < Math.floor(score / 10) + 1; i++) {
                const randomIndex = Math.floor(Math.random() * holes.length);
                if (!activeHoles.includes(randomIndex)) {
                    activeHoles.push(randomIndex);
                    holes[randomIndex].classList.add('active');
                }
            }
            timer = setTimeout(() => {
                if (gameActive) {
                    endGame('กุ๊ยรักคุณ! คะแนนของคุณคือ ' + score);
                }
            }, intervalTime);
            intervalTime = Math.max(300, intervalTime - 50); // Decrease the interval time but not below 300ms
        }, intervalTime);
    }

    function clearHoles() {
        activeHoles.forEach(index => {
            holes[index].classList.remove('active');
            holes[index].classList.remove('hit');
        });
        activeHoles = [];
        clearTimeout(timer);
    }

    function endGame(message) {
        gameActive = false;
        clearInterval(gameInterval);
        clearTimeout(timer);
        clearHoles();
        alert(message);
        playerName = prompt("Please enter your name:");
        if (score > highScore) {
            highScore = score;
            highScoreName = playerName;
            highScoreDisplay.textContent = highScore;
            highScoreNameDisplay.textContent = highScoreName;
        }
    }

    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            if (activeHoles.includes(Array.from(holes).indexOf(hole)) && gameActive) {
                score++;
                scoreDisplay.textContent = score;
                hole.classList.add('show-ouch');
                hole.classList.add('hit');
                setTimeout(() => {
                    hole.classList.remove('show-ouch');
                }, 500);
                setTimeout(() => {
                    hole.classList.remove('hit');
                }, 500);
                hole.classList.remove('active');
                clearTimeout(timer);
                activeHoles.splice(activeHoles.indexOf(Array.from(holes).indexOf(hole)), 1);
            }
        });
    });
});
