const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.control .button');

const player1 = {
    number: 1,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['leg grab'],
    attack: function () {
        console.log(this.name + ' ' + 'fight...');
    },
    changeHP,
    elHP,
    renderHP
};

const player2 = {
    number: 2,
    name: 'Liu',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['dragon fire'],
    attack: function () {
        console.log(this.name + ' ' + 'fight...');
    },
    changeHP,
    elHP,
    renderHP
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

function getRandomDamage(max) {
    return Math.ceil(Math.random() * max);
}

function showResult(playerObj) {
    $resultTitle = createElement('div', 'resultTitle');
    
    if (playerObj) {
        $resultTitle.innerText = playerObj.name + ' wins';
    } else {
        $resultTitle.innerText = 'draw';
    }

    $arenas.appendChild($resultTitle);

    gameIsOver();
}

function gameIsOver() {
    stopRandomButton();
    createReloadButton();
}

function stopRandomButton() {
    $randomButton.disabled = true;
}

function changeHP(damage) {
    this.hp -= damage;

    if (this.hp < 0) {
        this.hp = 0;
    }
}

function elHP() {
    const $playerLife = document.querySelector(`.player${this.number} .life`);
    
    return $playerLife;
}

function renderHP() {
    const lifebar = this.elHP();
    lifebar.style.width = this.hp + '%';
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

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');

    const $reloadWrapButton = createElement('button', 'button');
    $reloadWrapButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadWrapButton);
    $arenas.appendChild($reloadWrap);

    $reloadWrapButton.addEventListener('click', function() {
        window.location.reload();
    });
}

$randomButton.addEventListener('click', function() {
    player1.changeHP(getRandomDamage(20));
    player2.changeHP(getRandomDamage(20));
    player1.renderHP();
    player2.renderHP();
    determineResult();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));