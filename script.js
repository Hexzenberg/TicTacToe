document.addEventListener("DOMContentLoaded", function () {
    const cricleClass = 'circle';
    const xClass = 'x';
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('board');
    const winElement = document.getElementById('win');
    const winningMessage = document.querySelector('[winningmessage]');
    const button = document.getElementById('restart');
    const winCond = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let circleTurn;

    startGame();

    function startGame() {
        cellElements.forEach(cell => {
            cell.classList.remove(xClass);
            cell.classList.remove(cricleClass);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        })
        setBoardHoverClass();
        winElement.classList.remove('show');
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = circleTurn ? cricleClass : xClass;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }

    function endGame(draw) {
        if (draw) {
            winningMessage.innerText = `Draw!`;
        } else {
            winningMessage.innerText = `${circleTurn ? "O" : "X"} Wins!`;
        }
        winElement.classList.add('show');
    }

    function isDraw() {
        return [...cellElements].every(cell => {//because cellElements is not actually an array we deconstruct it to an array to use every function
            return cell.classList.contains(xClass) ||
                cell.classList.contains(cricleClass);
        })
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        circleTurn = !circleTurn;
    }

    function setBoardHoverClass() {
        board.classList.remove(xClass);
        board.classList.remove(cricleClass);
        circleTurn ? board.classList.add(cricleClass) : board.classList.add(xClass);
    }

    function checkWin(currentClass) {
        return winCond.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            })
        })
    }

    button.addEventListener('click', startGame);

});