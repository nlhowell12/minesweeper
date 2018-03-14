function Board(rows, columns) {
    this.height = rows;
    this.width = columns;
    this.mines = Math.floor((rows * columns) / 6);
}

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

        for (let x = 0; x < board.width; x++) {
            var cell = document.createElement('td');
            let row = document.getElementById("row" + [y]);
            row.appendChild(cell);

            var randoBomb = Math.floor((Math.random() * 10) + 1);

            if (randoBomb < 3 && bombs < board.mines) {
                cell.className = "bomb";
                bombs += 1;

            } else {
                cell.className = "cell"
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
    
    if (cell.className === "bomb") {
        cell.style = "background-color: red;"
        alert("You done fucked up A-A-Ron!")
        return;
    }

    getCellCoords(Number(cell.dataset.y), Number(cell.dataset.x))

    
}

function getCellCoords(y, x) {
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
    let getCells = document.getElementsByClassName('cell');
    let adjacentBombs = 0;

    for (let i = 0; i < getCells.length; i++) {
        if (getCells[i].dataset.y == cell.y && getCells[i].dataset.x == cell.x) {
            getCells[i].style = "background-color: white";
            // getCells[i].innerHTML = bombCount;
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