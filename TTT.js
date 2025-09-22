const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const boardEl = document.getElementById('board');
const currentPlayerEl = document.getElementById('currentPlayer');
const newBtn = document.getElementById('newBtn');
const resetScoreBtn = document.getElementById('resetScore');
const lastResultEl = document.getElementById('lastResult');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDEl = document.getElementById('scoreD');

let cells = [];
let board = Array(9).fill('');
let current = 'X';
let running = true;
let scores = {X:0,O:0,D:0};

function buildBoard(){
  boardEl.innerHTML = '';
  cells = [];
  for(let i=0;i<9;i++){
    const btn = document.createElement('button');
    btn.className = 'cell';
    btn.setAttribute('data-i',i);
    btn.setAttribute('aria-label','cell '+(i+1));
    btn.addEventListener('click', onCellClick);
    btn.addEventListener('keydown', onCellKeydown);
    cells.push(btn);
    boardEl.appendChild(btn);
  }
}

function onCellKeydown(e){
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    e.target.click();
  }
  const idx = Number(e.target.dataset.i);
  let row = Math.floor(idx/3), col = idx%3;
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
    e.preventDefault();
    if(e.key === 'ArrowLeft') col = (col + 2) % 3;
    if(e.key === 'ArrowRight') col = (col + 1) % 3;
    if(e.key === 'ArrowUp') row = (row + 2) % 3;
    if(e.key === 'ArrowDown') row = (row + 1) % 3;
    const next = row*3 + col;
    cells[next].focus();
  }
}

function render(){
  cells.forEach((c,i)=>{
    c.textContent = board[i];
    c.classList.toggle('x', board[i]==='X');
    c.classList.toggle('o', board[i]==='O');
    c.disabled = !running || board[i] !== '';
    c.classList.toggle('disabled', c.disabled);
  });
  currentPlayerEl.textContent = current;
}

function onCellClick(e){
  const idx = Number(e.currentTarget.dataset.i);
  if(!running || board[idx] !== '') return;
  makeMove(idx, current);
}

function makeMove(idx, player){
  board[idx] = player;
  const result = checkWinner();
  if(result.winner){
    running = false;
    highlight(result.combo);
    lastResultEl.textContent = (result.winner === 'Draw') ? 'Draw' : `Winner: ${result.winner}`;
    if(result.winner !== 'Draw') scores[result.winner]++;
    else scores.D++;
    updateScores();
  } else {
    current = (current === 'X') ? 'O' : 'X';
  }
  render();
}

function checkWinner(){
  for(const combo of winPatterns){
    const [a,b,c] = combo;
    if(board[a] && board[a] === board[b] && board[b] === board[c]){
      return {winner: board[a], combo};
    }
  }
  if(board.every(v=>v!=='')) return {winner: 'Draw', combo: []};
  return {winner: null};
}

function highlight(combo){
  combo.forEach(i=>cells[i]?.classList.add('winning'));
}

function updateScores(){
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDEl.textContent = scores.D;
}

function resetBoard(){
  board = Array(9).fill('');
  current = 'X';
  running = true;
  cells.forEach(c=>c.classList.remove('winning'));
  lastResultEl.textContent = '-';
  render();
}

function newGame(){
  resetBoard();
}

newBtn.addEventListener('click', newGame);
resetScoreBtn.addEventListener('click', ()=>{
  scores = {X:0,O:0,D:0};
  updateScores();
});

// allow N key to reset game
document.addEventListener('keydown', (e)=>{
  if(e.key.toLowerCase() === 'n') newGame();
});

buildBoard();
render();
