const btnNewGame = document.querySelector('.new-game');
const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');

const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');
const score1 = document.querySelector('.score-0');
const score2 = document.querySelector('.score-1');
const current1 = document.querySelector('.currentScore0');
const current2 = document.querySelector('.currentScore1');
const dice = document.querySelector('.dice');
const active = document.querySelector('.active');

// starting conditions
const scores = [0, 0];
let score = 0;
let activePlayer = 0;
// player changing
const changePlayer = function () {
  player1.classList.toggle('active');
  player2.classList.toggle('active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Roll btn
btnRoll.addEventListener('click', function () {
  const img = Math.trunc(Math.random() * 6 + 1);
  dice.setAttribute('src', `dice-${img}.png`);
  dice.classList.remove('hidden');
  score += img;
  const currentPlayer = document.querySelector(`.currentScore${activePlayer}`);

  if (img != 1) {
    currentPlayer.textContent = score;
  } else {
    score = 0;
    currentPlayer.textContent = 0;
    changePlayer();
  }
});

// Hold btn
btnHold.addEventListener('click', function () {
  const currentPlayer = document.querySelector(`.currentScore${activePlayer}`);
  const scoreTotal = document.querySelector(`.score-${activePlayer}`);
  scores[activePlayer] += score;
  scoreTotal.textContent = `${scores[activePlayer]}`;
  score = 0;
  currentPlayer.textContent = score;
  if (scores[activePlayer] >= 100) {
    document.querySelector(`.player-${activePlayer}`).classList.add('winner');
    document
      .querySelector(`.player-${activePlayer === 0 ? 1 : 0}`)
      .classList.remove('active');
    btnHold.classList.add(`shutdown`);
    btnRoll.classList.add(`shutdown`);
    dice.classList.remove('hidden');
  } else {
    changePlayer();
  }
});

// New btn
btnNewGame.addEventListener('click', function () {
  score = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.querySelector(`.player`).classList.remove('winner');
  activePlayer = 0;
  document.querySelector(`.player-${activePlayer}`).classList.add('active');
  btnHold.classList.remove(`shutdown`);
  btnRoll.classList.remove(`shutdown`);
});
