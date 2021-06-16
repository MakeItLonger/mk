import {start, end, hit, defence, draw} from './logs.js';

export const player1 = {
    number: 1,
    name: 'Sonya Blade',
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

export const player2 = {
    number: 2,
    name: 'Liu Kang',
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

export const $arenas = document.querySelector('.arenas');

const $submitButton = document.querySelector('.buttonWrap .button');

const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

export const $formFight = document.querySelector('.control');

function changeHP(damage) {
    if (damage) {
        this.hp -= damage;
        
        if (this.hp < 0) {
        this.hp = 0;
        }

        generateLogs('hit', this.enemy, this);
    } else {
        generateLogs('defence', this.enemy, this);
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

function getDamage() {
    if (this.data.hit !== this.dataEnemy.defence) {
        return this.data.value;
    } else {
        return 0;
    }
}

export function generateLogs(type, player1, player2, time) {
    let text;

    switch (type) {
        case 'start':
            text = start.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', time);
            break;
        case 'hit':
            text = `${getCurrentTime()} - ${hit[getRandom(hit.length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} [-${player2.data.value}] ${player2.hp}/100`;
            break;
        case 'defence':
            text = `${getCurrentTime()} - ${defence[getRandom(defence.length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)}`;
            break;
        case 'draw':
            text = draw.replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
        case 'end':
            text = end[getRandom(end.length)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break;
        default:
            console.log('no argument "type"');
            break;
    }

    const el = `<p>${text}</p>`;
    
    $chat.insertAdjacentHTML('afterbegin', el);
}

export function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
}



export function getRandom(max) {
    return Math.ceil(Math.random() * max);
}

export function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}



 export function playerAttack() {
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

export function moveToObj (obj, enemyObj, attack, attackEnemy) {
    obj.data = attack;
    obj.dataEnemy = attackEnemy;
    obj.enemy = enemyObj;
}

export function createElement(tag, className) {
    const $element = document.createElement(tag);

    if (className) {
        $element.classList.add(className);
    }

    return $element;
}

const gameIsOver = () => {
    stopSubmitButton();
    blockInputs();
    createReloadButton();
}

export function showResult(playerObj) {
    let $resultTitle = createElement('div', 'resultTitle');
    
    if (playerObj) {
        $resultTitle.innerText = playerObj.name + ' wins';
    } else {
        $resultTitle.innerText = 'draw';
    }

    $arenas.appendChild($resultTitle);

    gameIsOver();
}

function blockInputs() {
    for(let i = 0; i < $formFight.length; i++) {
        $formFight[i].disabled = true;
    }
}

function stopSubmitButton() {
    $submitButton.disabled = true;
}


export function determineResult () {
    if (player1.hp <= 0 && player2.hp > 0) {
        showResult(player2);
        generateLogs('end', player2, player1);
    } else if (player2.hp <= 0 && player1.hp > 0) {
        showResult(player1);
        generateLogs('end', player1, player2); 
    } else if (player1.hp <= 0 && player2.hp <= 0) {
        showResult();
        generateLogs('draw', player2, player1);
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

