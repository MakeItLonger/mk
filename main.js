let player1 = {
    name: 'Sonya',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['leg grab'],
    attack: function () {
        console.log(player1.name + ' ' + 'fight...');
    }
};

let player2 = {
    name: 'Liu',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['dragon fire'],
    attack: function () {
        console.log(player2.name + ' ' + 'fight...');
    }
};

function createPlayer(playerStr, playerObj) {
    const $arenas = document.querySelector('.arenas');
    
    const $player = document.createElement('div');
    $player.classList.add(playerStr);

    $arenas.appendChild($player);

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');
    
    const $character = document.createElement('div');
    $character.classList.add('character');

    $player.appendChild($progressBar);
    $player.appendChild($character);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = `${playerObj.hp}%`;

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = playerObj.name;

    $progressBar.appendChild($life);
    $progressBar.appendChild($name);


    const $img = document.createElement('img');
    $img.src = playerObj.img;

    $character.appendChild($img);
}

createPlayer('player1', player1);
createPlayer('player2', player2);