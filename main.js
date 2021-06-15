import {player1, player2, generateLogs, getCurrentTime, enemyAttack, playerAttack, moveToObj, $formFight, determineResult, createElement, $arenas} from './player.js';



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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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



generateLogs('start', player2, player1, getCurrentTime());