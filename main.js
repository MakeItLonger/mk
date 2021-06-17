import { getRandom, createElement } from './utils/index.js';
import { HIT, ATTACK, LOGS } from './constants/index.js';
import Player from './player/index.js';

const $arenas = document.querySelector('.arenas');

const $submitButton = document.querySelector('.buttonWrap .button');

const $formFight = document.querySelector('.control');

const $chat = document.querySelector('.chat');

const player1 = new Player({
    number: 1,
    name: 'Sonya Blade',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    rootSelector: 'arenas',
});

const player2 = new Player({
    number: 2,
    name: 'Liu Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    rootSelector: 'arenas',
});

// const player1 = {
//     number: 1,
//     name: 'Sonya Blade',
//     hp: 100,
//     img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
//     weapon: ['leg grab'],
//     attack: function () {
//         console.log(this.name + ' ' + 'fight...');
//     },
//     changeHP,
//     elHP,
//     renderHP,
//     getDamage
// };

// const player2 = {
//     number: 2,
//     name: 'Liu Kang',
//     hp: 100,
//     img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
//     weapon: ['dragon fire'],
//     attack: function () {
//         console.log(this.name + ' ' + 'fight...');
//     },
//     changeHP,
//     elHP,
//     renderHP,
//     getDamage
// };


// function createPlayer({number, hp, name, img}) {
//     const $player = createElement('div', `player${number}`);

//     const $progressBar = createElement('div', 'progressbar');
    
//     const $character = createElement('div', 'character');

//     $player.appendChild($progressBar);
//     $player.appendChild($character);

//     const $life = createElement('div', 'life');
//     $life.style.width = `${hp}%`;

//     const $name = createElement('div', 'name');
//     $name.innerText = name;

//     $progressBar.appendChild($life);
//     $progressBar.appendChild($name);

//     const $img = createElement('img');
//     $img.src = img;

//     $character.appendChild($img);

//     return $player;
// }

function showResult(playerObj) {
    const $resultTitle = createElement('div', 'resultTitle');
    
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

// function changeHP(damage) {
//     if (damage) {
//         this.hp -= damage;
        
//         if (this.hp < 0) {
//         this.hp = 0;
//         }

//         generateLogs('hit', this.enemy, this, this.data.value);
//     } else {
//         generateLogs('defence', this.enemy, this);
//     }
// }

// function elHP() {
//     const $playerLife = document.querySelector(`.player${this.number} .life`);
    
//     return $playerLife;
// }

// function renderHP() {
//     const lifebar = this.elHP();
//     lifebar.style.width = this.hp + '%';
// }

function determineResult () {
    if (player1.hp <= 0 && player2.hp > 0) {
        showResult(player2);
        generateLogs('end', player2, player1);
    } else if (player2.hp <= 0 && player1.hp > 0) {
        showResult(player1);
        generateLogs('end', player1, player2); 
    } else if (player1.hp <= 0 && player2.hp <= 0) {
        showResult();
        generateLogs('draw');
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



function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

// function getDamage() {
//     if (this.data.hit !== this.dataEnemy.defence) {
//         return this.data.value;
//     } else {
//         return 0;
//     }
// }

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

// function moveToObj (obj, enemyObj, attack, attackEnemy) {
//     obj.data = attack;
//     obj.dataEnemy = attackEnemy;
//     obj.enemy = enemyObj;
// }

function getTextLog(type, playerName1, playerName2) {
    switch (type) {
        case 'start':
            return LOGS[type].replace('[player1]', playerName1)
            .replace('[player2]', playerName2)
            .replace('[time]', getCurrentTime());
            break;
        case 'hit':
            return `${LOGS[type][getRandom(LOGS[type].length - 1) - 1]
            .replace('[playerKick]', playerName1)
            .replace('[playerDefence]', playerName2)}`;
            break;
        case 'defence':
            return `${LOGS[type][getRandom(LOGS[type].length - 1) - 1]
            .replace('[playerKick]', playerName1)
            .replace('[playerDefence]', playerName2)}`;
            break;
        case 'draw':
            return LOGS[type]
            .replace('[player1]', playerName1)
            .replace('[player2]', playerName2);
            break;
        case 'end':
            return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
            .replace('[playerWins]', playerName1)
            .replace('[playerLose]', playerName2);
            break;
        default:
            console.log('no argument "type"');
            break;
    }
}

function generateLogs(type, { name } = {}, { name: playerName2, hp } = {}, valueAttack) {
    let text = getTextLog(type, name, playerName2);
    
    switch (type) {
        case 'hit':
            text = `${getCurrentTime()} - ${text} [-${valueAttack}] ${hp}/100`;
        break;
        case 'defence':
        case 'draw':
        case 'end':
            text = `${getCurrentTime()} - ${text}`;
            break;
        case 'start':
            console.log('START!');
            break;
        default:
            console.log('no argument "type"');
            break;
    }

    const el = `<p>${text}</p>`;
    
    $chat.insertAdjacentHTML('afterbegin', el);
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    // moveToObj(player1, player2, player, enemy);
    // moveToObj(player2, player1, enemy, player);
    
    // player1.changeHP(player1.getDamage());
    // player2.changeHP(player2.getDamage());
    // player1.renderHP();
    // player2.renderHP();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
        console.log('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    } else {
        generateLogs('defence', player1, player2);
    }

    determineResult();
});

function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
}

function init() {
    // $arenas.appendChild(createPlayer(player1));
    // $arenas.appendChild(createPlayer(player2));
    player1.createPlayer();
    player2.createPlayer();
    generateLogs('start', player2, player1);
}

init();