var gameArea = document.getElementById('gameArea');
var timeStart = 0;
const boardSize = randomBoard(10, 20);
const board = new Board(boardSize, boardSize);
let getCells = document.getElementsByClassName('cell');
let bombs = [];
let bombCount = 0;
firstClick = true;
var originalHTML = document.body.innerHTML;
let resetButton = document.getElementById("resetButton");

// turns off the context menu in the game area
gameArea.addEventListener('contextmenu', event => event.preventDefault());

function Board(rows, columns) {
    this.height = rows;
    this.width = columns;
    this.mines = Math.floor((rows * columns) / 4);
}

function randomBoard(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function drawBoard() {
    for (let y = 0; y < board.height; y++) {
        var row = document.createElement('div');
        row.id = "row" + y;
        row.className = "row"
        gameArea.appendChild(row);

        for (let x = 0; x < board.width; x++) {
            var cell = document.createElement('div');
            row.appendChild(cell);

            var randoBomb = Math.floor((Math.random() * 10) + 1);

            if (randoBomb < 3 && bombCount < board.mines) {
                cell.dataset.state = "bomb";
                cell.className = "bomb";
                bombCount += 1;
            } else {
                cell.dataset.state = "empty";
                cell.className = "cell";
            }
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.style = "background-image: url(./images/closed.png); background-size: cover";
            cell.addEventListener('click', revealCells);
            cell.addEventListener('contextmenu', addFlag);
        }
    }
    resetButton.style = "background-image: url('./images/mineSmile.png'); background-size:cover;"
    bombs = document.getElementsByClassName('bomb');
}
drawBoard();
addNearbyBombCount();

function addNearbyBombCount() {
    for (let i = 0; i < getCells.length; i++) {
        let nearbyCells = getCellCoords(Number(getCells[i].dataset.y), Number(getCells[i].dataset.x));
        getCells[i].dataset.nearbyBombs = nearbyCells.reduce(checkAdjacentBombs, 0);
    };
}

function countBombs() {
    let bombCounter = document.getElementById("minesRemaining");
    let findFlags = document.getElementsByClassName('flag');
    bombCounter.innerHTML = bombs.length - findFlags.length;
}

function revealCells(event) {
    let cell = event.target;

    if (firstClick) {
        if (cell.className.includes("bomb")) {
            cell.className = "cell";
            cell.dataset.state = "empty";
            addNearbyBombCount();
        }
        timeElapsed = setInterval(countTime, 1000);
        firstClick = false;
    } else if (cell.className.includes("bomb")) {
        cell.style = "background-color: red"
        for (let i = 0; i < bombs.length; i++) {
            bombs[i].style = "background-image: url('./images/mine.png'); background-size: cover"
            bombs[i].removeEventListener('click', revealCells);
        }
        for (let i = 0; i < getCells.length; i++) {
            getCells[i].removeEventListener('click', revealCells);
        }
        clearInterval(timeElapsed);
        resetButton.style = "background-image: url('./images/mineDead.jpg'); background-size:cover;"
        alert("Boom!");
        return;
    }

    let nearbyCells = getCellCoords(Number(cell.dataset.y), Number(cell.dataset.x));

    if (cell.dataset.state === "empty" && cell.dataset.nearbyBombs == 0) {
        cell.style = "backgound-image: none"
        nearbyCells.forEach(function (coord) {
            const newCell = getElemByCoords(coord);
            if (newCell && newCell.dataset.nearbyBombs == 0) {
                newCell.click();
            }
        })
        nearbyCells.forEach(markNotBomb);
    } else if (cell.dataset.nearbyBombs > 0) {
        cell.style = "backgound-image: none";
        cell.innerHTML = cell.dataset.nearbyBombs;
        cell.dataset.state = "clicked";
    }
    setTimeout(checkWin, 500);
}

function getElemByCoords(coords) {
    return document.querySelector(`[data-x="${coords.x}"][data-y="${coords.y}"]`)
}

function addFlag(event) {
    let cell = event.target;
    let flag = document.createElement('img');
    if (cell.className.includes("flag")) {
        cell.parentNode.removeChild(cell);
    } else {
        flag.src = "./images/flag.png";
        flag.className = "flag";
        cell.appendChild(flag);
    }
    countBombs();
}

function getCellCoords(y, x) {
    return [{
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
            y: y + 1,
        },
        {
            x: x + 1,
            y: y + 1,
        }
    ]
}

function markNotBomb(coords) {
    const cell = getElemByCoords(coords);
    if (!cell) return;

    cell.style = "background-color: white";
    cell.dataset.state = "clicked";

    if (Number(cell.dataset.nearbyBombs) > 0 && cell.dataset.state != "bomb") {
        cell.innerHTML = cell.dataset.nearbyBombs;
    }

}

function checkAdjacentBombs(bucket, nearbyCellCoords) {
    let nearbyRow = gameArea.childNodes[nearbyCellCoords.y]
    if (nearbyRow) {
        let nearbyCell = nearbyRow.childNodes[nearbyCellCoords.x];
        if (nearbyCell) {
            if (nearbyCell.dataset.state === "bomb") {
                return bucket + 1;
            }
        }
    }
    return bucket;
}

function checkWin() {
    let emptyCells = document.querySelectorAll('[data-state="empty"]')
    if (!emptyCells.length)  alert("You Win!");
}

function countTime() {
    document.getElementById("timePassed").innerHTML = timeStart += 1;
}


countBombs();