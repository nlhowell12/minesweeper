function Board(rows, columns) {
    this.height = rows;
    this.width = columns;
    this.mines = Math.floor((rows * columns) / 6);
}

var boardState = [];
const boardSize = 8;
const board = new Board(boardSize, boardSize);
bombs = 0;

function drawBoard() {
    for (let y = 0; y < board.height; y++) {
        var row = document.createElement('tr');
        row.id = "row" + [y];
        row.className = "row"
        var gameArea = document.getElementById('gameArea');
        gameArea.appendChild(row);
        boardState.push([]);
        for (let x = 0; x < board.width; x++) {
            var cell = document.createElement('td');
            let row = document.getElementById("row" + [y]);
            row.appendChild(cell);

            var randoBomb = Math.floor((Math.random() * 10) + 1);

            if (randoBomb < 3 && bombs < board.mines) {
                cell.className = "bomb";
                bombs += 1;
                boardState[y].push("bomb");

            } else {
                cell.className = "cell"
                
                boardState[y].push(" ");
            }
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.style = "background-color: grey;"
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

    checkCells(Number(cell.dataset.y), Number(cell.dataset.x))

    // if (cell.className === "cell") {
    //     cell.style = "background-color: white;"

    // }

    if (cell.className === "bomb") {
        cell.style = "background-color: red;"
    }
}

function checkCells(y, x) {
    let cells = [
        {
            x: x,
            y: y,
        },
        {
            x: x - 1,
            y: y,
        },
        {
            x: x + 1,
            y: y,
        },
        {
            x: x,
            y: y - 1,
        },
        {
            x: x,
            y: y + 1,
        },
        {
            x: x - 1,
            y: y - 1,
        },
        {
            x: x + 1,
            y: y - 1,
        },
        {
            x: x - 1,
            y: y + 1
        },
        {
            x: x + 1,
            y: y + 1,
        }
    ]
    cells.forEach(checkType);
}

function checkType(cell) {
    console.log (cell.y + "," + cell.x);
    let getCells = document.getElementsByClassName('cell');
    for (let i = 0; i < getCells.length; i++) {
        if (getCells[i].dataset.y == cell.y && getCells[i].dataset.x == cell.x) {
            getCells[i].style = "background-color: white";
            console.log ("This is a cell");
        }
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