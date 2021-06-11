const $arenas = document.querySelector('.arenas');

const $submitButton = document.querySelector('.buttonWrap .button');

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

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
    renderHP,
    getDamage
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
    renderHP,
    getDamage
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

function getRandom(max) {
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
    stopSubmitButton();
    blockInputs();
    createReloadButton();
}

function blockInputs() {
    for(let i = 0; i < $formFight.length; i++) {
        $formFight[i].disabled = true;
    }
}

function stopSubmitButton() {
    $submitButton.disabled = true;
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function getDamage() {
    if (this.data.hit !== this.dataEnemy.defence) {
        return this.data.value;
    } else {
        return 0;
    }
}

function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
}

function moveToObj (obj, attack, attackEnemy) {
    obj.data = attack;
    obj.dataEnemy = attackEnemy;
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    moveToObj(player1, player, enemy);
    moveToObj(player2, enemy, player);
    
    player1.changeHP(player1.getDamage());
    player2.changeHP(player2.getDamage());
    
    player1.renderHP();
    player2.renderHP();
    
    determineResult();
});