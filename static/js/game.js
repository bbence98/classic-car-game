function main() {
    const menu = document.querySelector('#main-menu');
    const gameBoard = document.querySelector('.game-board');
    gameBoard.style.display = 'none';
    const img = document.querySelector('#main-menu img');
    menu.addEventListener('click', function () {
        showHide(img, gameBoard)
    });


    }


function showHide(firstElement, secondElement) {
    if (firstElement.style.display === 'block') {
        firstElement.style.display = 'none';
        secondElement.style.display = 'block'
    } else {
        firstElement.style.display = 'none';
        secondElement.style.display = 'block'
    }
}


main();