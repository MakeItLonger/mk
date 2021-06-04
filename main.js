const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['leg grab'],
    attack: function () {
        console.log(player1.name + ' ' + 'fight...');
    }
};

const player2 = {
    player: 2,
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
    const $player = createElement('div', `player${playerObj.player}`);

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

function playerWins(name) {
    $winTitle = createElement('div', 'winTitle');
    $winTitle.innerText = name + ' wins';
    
    return $winTitle;
}

function changeHP(player) {
    $playerLife = document.querySelector(`.player${player.player} .life`);
    player.hp -= randomDamage();

    $playerLife.style.width = player.hp >= 0 ? player.hp + '%' : 0;
    
    if (player.hp <= 0 && player.player === 1) {
        $arenas.appendChild(playerWins(player2.name));
        $randomButton.disabled = true;
    } else if (player.hp <= 0 && player.player === 2) {
        $arenas.appendChild(playerWins(player1.name));
        $randomButton.disabled = true;
    }
}

addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));