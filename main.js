const $arenas = document.querySelector('.arenas');

const $submitButton = document.querySelector('.buttonWrap .button');

const $formFight = document.querySelector('.control');

const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
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

const player2 = {
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

function changeHP(damage) {
    if (damage) {
        this.hp -= damage;
        
        if (this.hp < 0) {
        this.hp = 0;
        }

        generateLogs('hit', this.enemy, this, this.data.value);
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

function moveToObj (obj, enemyObj, attack, attackEnemy) {
    obj.data = attack;
    obj.dataEnemy = attackEnemy;
    obj.enemy = enemyObj;
}

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

function generateLogs(type, player1 = {}, player2 = {}, valueAttack) {
    let text = getTextLog(type, player1.name, player2.name);
    
    switch (type) {
        case 'hit':
            text = `${getCurrentTime()} - ${text} [-${valueAttack}] ${player2.hp}/100`;
        break;
        case 'defence':
        case 'draw':
        case 'end':
            text = `${getCurrentTime()} - ${text}`;
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

    moveToObj(player1, player2, player, enemy);
    moveToObj(player2, player1, enemy, player);
    
    player1.changeHP(player1.getDamage());
    player2.changeHP(player2.getDamage());
    
    player1.renderHP();
    player2.renderHP();

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
    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
    generateLogs('start', player2, player1);
}

init();