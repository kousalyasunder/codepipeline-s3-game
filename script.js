document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
     const timerDisplay = document.getElementById('time-left');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
     let timeleft = 60;
    let countdown;

    const cardArray = [
        { name: 'card1', img: 'images/Aurora.png' },
        { name: 'card1', img: 'images/Aurora.png' },
        { name: 'card2', img: 'images/8.jpeg' },
        { name: 'card2', img: 'images/8.jpeg' },
        { name: 'card3', img: 'images/2.png' },
        { name: 'card3', img: 'images/2.png' },
        { name: 'card4', img: 'images/3.jpeg' },
        { name: 'card4', img: 'images/3.jpeg' },
        { name: 'card5', img: 'images/5.jpeg' },
        { name: 'card5', img: 'images/5.jpeg' },
        { name: 'card6', img: 'images/7.png' },
        { name: 'card6', img: 'images/7.png' },
        { name: 'card7', img: 'images/9.jpeg' },
        { name: 'card7', img: 'images/9.jpeg' },
        { name: 'card8', img: 'images/redshift.png' },
        { name: 'card8', img: 'images/redshift.png' },
        { name: 'card9', img: 'images/cloudfront.jpeg' },
        { name: 'card9', img: 'images/cloudfront.jpeg' },
        { name: 'card10', img: 'images/codedeploy.png' },
        { name: 'card10', img: 'images/codedeploy.png' },
        // ...add more pairs as needed
    ];
     function startTimer() {
        const countdown = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                alert('Time is up! Game over!');
            }
        }, 1000); // Update timer every second
    }
startButton.addEventListener('click', () => {
        if (countdown) {
            clearInterval(countdown); // Reset the timer if it's already running
        }
        timeLeft = 60; // Reset the time when the game starts
        timerDisplay.textContent = timeLeft; // Update the display
        createBoard(); // Start the game
    });
});

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        startTimer();
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});
