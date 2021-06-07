const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    number: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['leg grab'],
    attack: function () {
        console.log(player1.name + ' ' + 'fight...');
    }
};

const player2 = {
    number: 2,
    name: 'Liu',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['dragon fire'],
    attack: function () {
        console.log(player2.name + ' ' + 'fight...');
    }
};

function createElement(tag, className) {
    const $element = document.createElement(tag);

    if (className) {
        $element.classList.add(className);
    }

    return $element;
}

function createPlayer(playerObj) {
    const $player = createElement('div', `player${playerObj.number}`);

    const $progressBar = createElement('div', 'progressbar');
    
    const $character = createElement('div', 'character');

    $player.appendChild($progressBar);
    $player.appendChild($character);

    const $life = createElement('div', 'life');
    $life.style.width = `${playerObj.hp}%`;

    const $name = createElement('div', 'name');
    $name.innerText = playerObj.name;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);

    const $img = createElement('img');
    $img.src = playerObj.img;

    $character.appendChild($img);

    return $player;
}

function randomDamage() {
    return Math.ceil(Math.random() * 20);
}

function showResult(playerObj) {
    stopRandom();
    $resultTitle = createElement('div', 'resultTitle');
    if (playerObj) {
        $resultTitle.innerText = playerObj.name + ' wins';
    } else {
        $resultTitle.innerText = 'draw';
    }
    $arenas.appendChild($resultTitle);
}

function stopRandom() {
    $randomButton.disabled = true;
}

function changeHP(playerObj) {
    $playerLife = document.querySelector(`.player${playerObj.number} .life`);
    playerObj.hp -= randomDamage();

    if (playerObj.hp < 0) {
        playerObj.hp = 0;
    }

    $playerLife.style.width = playerObj.hp + '%';
}

function determineResult () {
    if (player1.hp <= 0 && player2.hp > 0) {
        showResult(player2);
    } else if (player2.hp <= 0 && player1.hp > 0) {
        showResult(player1);
    } else if (player1.hp <= 0 && player2.hp <= 0) {
        showResult();
    }
}

addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);
    
    determineResult();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));