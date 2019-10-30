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


function main() {  // 4 x 21
    const menu = document.querySelector('#main-menu');
    const gameBoard = document.querySelector('.game-board');
    gameBoard.style.display = 'none';
    const img = document.querySelector('#main-menu img');
    menu.addEventListener('click', function () {
        showHide(img, gameBoard)
    });


    const cell = document.querySelector('[data-coordinate-y="21"] ~ [data-coordinate-x="4"]');
    const node = document.createElement("img" );
    node.setAttribute("src", 'static/images/car.svg');
    node.setAttribute('id', 'car');
    cell.appendChild(node);

}



main();