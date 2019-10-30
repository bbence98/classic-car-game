const create_nested_object = function (obj_num, element_num) {
  let nested_obj = {};
  for(let i = 0; i < obj_num; i++)  {
      let temp_obj = {};
      for (let j = 0; j < element_num; j++) {
          temp_obj[j] = null
      }
      nested_obj[i] = temp_obj
    }
  return nested_obj
};

const get_local_Json = function(json_name) {
    return JSON.parse(localStorage.getItem(json_name))
};

const set_local_Json = function(json_name, item) {
    localStorage.setItem(json_name,JSON.stringify(item))
};

const get_session_Json = function(json_name) {
    return JSON.parse(sessionStorage.getItem(json_name))
};

const set_session_Json = function(json_name, item) {
    sessionStorage.setItem(json_name,JSON.stringify(item))
};

function showHide(firstElement, secondElement) {
    if (firstElement.style.display === 'block') {
        firstElement.style.display = 'none';
        secondElement.style.display = 'block'
    } else {
        firstElement.style.display = 'none';
        secondElement.style.display = 'block'
    }
}


function putPlayer(coordinateX, coordinateY) {
    const cell = document.querySelector(`[data-coordinate-x="${coordinateX}"] ~ [data-coordinate-y="${coordinateY}"]`);
    const node = document.createElement("img" );
    node.setAttribute("src", 'static/images/car.svg');
    node.setAttribute('id', 'main_car');
    cell.appendChild(node);
}


function putEnemies(coordinateX, coordinateY) {
    const enemy = document.querySelector(`.game-cell[data-coordinate-x="${coordinateX}"][data-coordinate-y="${coordinateY}"]`);
    const node = document.createElement("img");
    node.setAttribute("src", 'static/images/enemy.svg');
    node.setAttribute('id', 'enemy');
    enemy.appendChild(node);
}


function putFence(coordinateX, coordinateY) {
    const cell = document.querySelector(`.game-cell[data-coordinate-x="${coordinateX}"][data-coordinate-y="${coordinateY}"]`);
    const node = document.createElement("img");
    node.setAttribute("src", 'static/images/fence.svg');
    node.setAttribute('id', 'fence');
    cell.appendChild(node);
}


function putAllFences() {
    for (let x = 1; x < 18; x++) {
        for (let y = 0; y < 26; y++) {
            if (y % 4 === 0 && x === 1 || x === 17 && y % 4 === 0) {
                putFence(x, y)
            }
        }
    }
}


function main() {
    const menu = document.querySelector('#main-menu');
    const gameBoard = document.querySelector('.game-board');
    gameBoard.style.display = 'none';
    const img = document.querySelector('#main-menu img');
    menu.addEventListener('click', function () {
        showHide(img, gameBoard);
        putPlayer(6, 21);
        putAllFences();
        putEnemies(6, 0);
    });
}


main();