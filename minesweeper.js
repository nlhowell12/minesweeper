var gameArea = document.getElementById('gameArea');
var timeStart = 0;
gameArea.addEventListener('contextmenu', event => event.preventDefault());
const boardSize = randomBoard(10, 20);
const board = new Board(boardSize, boardSize);
let getCells = document.getElementsByClassName('cell');

let bombs = [];
let bombCount = 0;
firstClick = true;


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
            cell.style = "background-color: grey;"
            cell.addEventListener('click', revealCells);
            cell.addEventListener('contextmenu', addFlag);
        }
    }

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
    bombCounter.innerHTML = bombs.length;

}

function revealCells(event) {
    let cell = event.target;

    if (firstClick) {
        var timeElapsed = setInterval(countTime, 1000);
        firstClick = false;
    }
    
    else if (cell.className.includes("bomb")) {
        for (let i = 0; i < bombs.length; i++) {
            bombs[i].style = "background-color: red";
        }
        cell.style = "background-color: red;"
        alert("You done fucked up A-A-Ron!");
        return;
    }

    let nearbyCells = getCellCoords(Number(cell.dataset.y), Number(cell.dataset.x));
    
    nearbyCells.forEach(markNotBomb);

}

function addFlag(event) {
    let cell = event.target;
    let flag = document.createElement('img');
    flag.src = "./images/flag.png";
    flag.className = "flag";
    cell.appendChild(flag);
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

function markNotBomb(cell) {
    for (let i = 0; i < getCells.length; i++) {
        if (getCells[i].dataset.y == cell.y && getCells[i].dataset.x == cell.x) {
            getCells[i].style = "background-color: white";
            if (getCells[i].dataset.nearbyBombs > 0 && getCells[i].dataset.state != "bomb") {
                getCells[i].innerHTML = getCells[i].dataset.nearbyBombs;
            }
        }
    }
}

function checkAdjacentBombs(bucket, nearbyCellCoords) {
    let nearbyRow = gameArea.childNodes[nearbyCellCoords.y]
    if (nearbyRow) {
        let nearbyCell = nearbyRow.childNodes[nearbyCellCoords.x];
        if (nearbyCell) {
            if (nearbyCell.dataset.state === "bomb" ) {
                return bucket + 1;
            }   
        } 
    }
    return bucket;
}

function reset() {
    timeStart = 0;
}



function countTime() {
    document.getElementById("timePassed").innerHTML = timeStart += 1;
}


countBombs();