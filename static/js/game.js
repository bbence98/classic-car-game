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




function put(tag, coordinateX, coordinateY) {
    const element = document.querySelector(
        `#${tag}_hidden[data-coordinate-x="${coordinateX}"][data-coordinate-y="${coordinateY}"]`
    );
    element.setAttribute('id', `${tag}`)
}
function hide(tag, coordinateX, coordinateY) {
    const player = document.querySelector(
        `#${tag}[data-coordinate-x="${coordinateX}"][data-coordinate-y="${coordinateY}"]`
    );
    player.setAttribute('id', `${tag}_hidden`)}

function hide_player(tag) {
    const player = document.querySelector(`#${tag}`);
    player.setAttribute('id', 'main_car_hidden')
}

function getAllFences() {
    let store = [];
    for (let x = 1; x < 19; x++) {
        for (let y = 0; y < 28; y++) {
            if (y % 4 === 0 && x === 1 || x === 17 && y % 4 === 0) {
                store.push([x,y])
            }
        }
    }
    return store;
}

function create_matrix(nested_items) {
    let matrix = create_nested_object(28,19);
    const fences =getAllFences();
    for (let fence of fences){
        matrix[fence[1]][fence[0]] = 'fence';
    }
    matrix[nested_items.main_car[1]][nested_items.main_car[0]] = 'main_car';
    matrix[nested_items.enemy[1]][nested_items.enemy[0]] = 'enemy';
    return matrix
}

function draw_matrix(matrix) {
    for (let [key, value] of Object.entries(matrix)) {
        for (let [key2, value2] of Object.entries(value)) {
            if (value2 !== null) {
                put(`${value2}`, `${key2}`, `${key}`)
            }
        }
    }
}

function move_car() { // -3 place
    document.addEventListener('keyup', function (event) {
        let pos = get_session_Json('car_pos');
        let matrix = get_session_Json('matrix');
        const a = event.keyCode;
        const d = event.keyCode;
        if (a === 65 && 3 < pos[0] ) {
            hide('main_car', pos[0], pos[1]);
            matrix[pos[1]][pos[0]] = null;
            pos[0] -= 1;
            put('main_car', pos[0], pos[1]);
            matrix[pos[1]][pos[0]] = 'main_car';
        } else if (d === 68 && pos[0] < 15) {
            hide('main_car', pos[0], pos[1]);
            matrix[pos[1]][pos[0]] = null;
            pos[0] += 1;
            put('main_car', pos[0], pos[1]);
            matrix[pos[1]][pos[0]] = 'main_car';
        }
        set_session_Json('car_pos', pos);
        set_session_Json('matrix', matrix);

    })
}

function move(item,matrix) {
    let matrix2 = create_nested_object(28,19);
    for (let [key, value] of Object.entries(matrix)) {
        for (let [key2, value2] of Object.entries(value)) {
            if (value2 === item) {
                if (key < parseInt('27')) {
                    hide(item,key2,key);
                    matrix2[parseInt(key) + 1][key2] = item;
                } else {
                    hide(item,key2,key);
                    matrix2[0][key2] = item
                }
            }
        }
    }
    return matrix2
}

function main() {
    let properties = {
        'main_car' : [9, 21],
        'enemy' : [6,0]
    };


    const menu = document.querySelector('#main-menu');
    const gameBoard = document.querySelector('.game-board');
    gameBoard.style.display = 'none';
    const img = document.querySelector('#main-menu img');
    menu.addEventListener('click', function () {
        showHide(img, gameBoard);
        let matrix = create_matrix(properties);
        draw_matrix(matrix);
        move_car(properties.main_car);
        set_session_Json('matrix', matrix);
        set_session_Json('car_pos', properties.main_car);
        move_car();
        setInterval(function () {
            let matrix = get_session_Json('matrix');
            matrix = move('fence', matrix);
            draw_matrix(matrix);
            set_session_Json('matrix', matrix)
        }, 500)
    });
}


main();
