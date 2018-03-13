function Board(rows, columns) {
    this.height = rows;
    this.width = columns;
    this.mines = Math.floor((rows * columns) / 6);
}

const boardSize = 8;
const board = new Board(boardSize, boardSize);
bombs = 0;

function drawBoard() {
    for (let i = 0; i < board.height; i++) {
        var row = document.createElement('tr');
        row.id = "row" + [i];
        row.className = "row"
        var gameArea = document.getElementById('gameArea');
        gameArea.appendChild(row);
        for (let x = 0; x < board.width; x++) {
            var cell = document.createElement('td');
            let row = document.getElementById("row" + [i]);
            row.appendChild(cell);

            var randoBomb = Math.floor((Math.random() * 15) + 1);
            
            if (randoBomb < 3 && bombs < board.mines) {
                cell.className = "bomb";
                bombs += 1;
            } else {
                cell.className = "cell"
            }
            cell.id = "cell" + (x + 1);
            cell.addEventListener('click', cellClick);
        }
    }
}

function countBombs() {
    let bombs = document.getElementsByClassName("bomb");
    let bombCounter = document.getElementById("minesRemaining");
    bombCounter.innerHTML = bombs.length;
    
}

function cellClick() {
    let cell = event.target;
    if (cell.className === "bomb") {
        cell.style = "background-color: grey;"
    }
}

function reset() {
    timeStart = 0;
}

var timeStart = 0;
function countTime() {
    
    document.getElementById("timePassed").innerHTML = timeStart += 1;

}
var timeElapsed = setInterval(countTime, 1000);
drawBoard();
countBombs();