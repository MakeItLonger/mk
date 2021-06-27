import { getRandom, createElement, getCurrentTime } from '../utils/index.js';
import { ARENAS, LOGS, POSES } from '../constants/index.js';
import Player from '../player/index.js';

class Game {
    constructor(props) {
        this.arenas = document.querySelector('.arenas');
        this.submitButton = document.querySelector('.buttonWrap .button');
        this.formFight = document.querySelector('.control');
        this.chat = document.querySelector('.chat');
        this.audioStart = document.querySelector('.audio1');
        this.audioEnd = document.querySelector('.audio5');
        this.vs = document.querySelector('.vs_gif');
    }

    showResult = (playerObj) => {
        const $resultTitle = createElement('div', 'resultTitle');
        
        if (playerObj) {
            $resultTitle.innerText = playerObj.name + ' wins';
        } else {
            $resultTitle.innerText = 'draw';
        }

        this.arenas.appendChild($resultTitle);

        this.gameIsOver();
    }

    
    gameIsOver = () => {
        this.stopSubmitButton();
        this.blockInputs();
        this.createReloadButton();
    }

    blockInputs = () => {
        for(let i = 0; i < this.formFight.length; i++) {
            this.formFight[i].disabled = true;
        }
    }

    stopSubmitButton = () => {
        this.submitButton.disabled = true;
    }

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');

        const $reloadWrapButton = createElement('button', 'button');
        $reloadWrapButton.innerText = 'Restart';

        $reloadWrap.appendChild($reloadWrapButton);
        this.arenas.appendChild($reloadWrap);

        $reloadWrapButton.addEventListener('click', function() {
            // window.location.reload();
            window.location.pathname = './index.html';
        });
    }

    determineResult = (player1, player2) => {
        if (player1.hp <= 0 && player2.hp > 0) {
            const $img1 = document.querySelector('.player1 img');

            $img1.src = player1.finishIMG.defeatPose;

            $img1.style.height = player1.finishIMG.scaleDefeatHeight;

            const $img2 = document.querySelector('.player2 img');

            $img2.src = player2.finishIMG.victoryPose;

            $img2.style.height = player2.finishIMG.scaleVictoryHeight;

            if (player2.finishIMG.scaleVictoryWidth) {
                $img2.style.width = player2.finishIMG.scaleVictoryWidth;
            }

            if (player2.id == '17') {
                $img2.style.transform = 'scaleX(-1) translateX(90%)';
            }

            if (player1.id == '24') {
                $img2.style.transform = 'scaleX(-1) translateX(60%)';
            }

            this.audioStart.pause();
            const audioLose = document.querySelector('.audio3');
            audioLose.play();
            setTimeout(() => {
                this.audioEnd.play();
            }, 2000);

            this.showResult(player2);
            this.generateLogs('end', player2, player1);
        } else if (player2.hp <= 0 && player1.hp > 0) {
            const $img1 = document.querySelector('.player1 img');
            $img1.src = player1.finishIMG.victoryPose;

            $img1.style.height = player1.finishIMG.scaleVictoryHeight;
            $img1.style.width = player1.finishIMG.scaleVictoryWidth;

            if (player1.finishIMG.scaleVictoryWidth) {
                $img1.style.width = player2.finishIMG.scaleVictoryWidth;
            }

            if (player1.id == '17') {
                $img1.style.transform = 'translateX(-14%)';
            }

            if (player1.id == '24') {
                $img1.style.transform = 'translateX(-37%)';
            }
            const $img2 = document.querySelector('.player2 img');

            $img2.src = player2.finishIMG.defeatPose;

            $img2.style.height = player2.finishIMG.scaleDefeatHeight;

            this.audioStart.pause();
            const audioLose = document.querySelector('.audio2');
            audioLose.play();
            setTimeout(() => {
                this.audioEnd.play();
            }, 2000);

            this.showResult(player1);
            this.generateLogs('end', player1, player2); 
        } else if (player1.hp <= 0 && player2.hp <= 0) {
            this.audioStart.pause();
            const audioLose = document.querySelector('.audio4');
            audioLose.play();
            setTimeout(() => {
                this.audioEnd.play();
            }, 2000);
            this.showResult();
            this.generateLogs('draw');
        }
    }

    // enemyAttack = () => {
    //     const hit = ATTACK[getRandom(3) - 1];
    //     const defence = ATTACK[getRandom(3) - 1];

    //     return {
    //         value: getRandom(HIT[hit]),
    //         hit,
    //         defence,
    //     }
    // }


    playerAttack = () => {
        const attack = {};

        for (let item of this.formFight) {
            if (item.checked && item.name === 'hit') {
                // attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        }

        return attack;
    }

    getTextLog = (type, playerName1, playerName2) => {
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

    generateLogs = (type, { name } = {}, { name: playerName2, hp } = {}, valueAttack) => {
        let text = this.getTextLog(type, name, playerName2);
        
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
        
        this.chat.insertAdjacentHTML('afterbegin', el);
    }

    getPlayer = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return body;    
    }

    getValue = async (obj) => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify(obj),
        }).then(res => res.json());
        return body;
    }

    letsFight = async (player1, player2) => {
        const pl = this.playerAttack();

        const {player1: player, player2: enemy} = await this.getValue(pl);

        if (player.defence !== enemy.hit) {
            player1.changeHP(enemy.value);
            player1.renderHP();
            this.generateLogs('hit', player2, player1, enemy.value);
        } else {
            this.generateLogs('defence', player2, player1);
        }

        if (enemy.defence !== player.hit) {
            player2.changeHP(player.value);
            player2.renderHP();
            this.generateLogs('hit', player1, player2, player.value);
        } else {
            this.generateLogs('defence', player1, player2);
        }

        this.determineResult(player1, player2);
    }

    start = async () => {
        this.arenas.style.cssText = `background-image: url(${ARENAS[getRandom(ARENAS.length) - 1]})`;
        
        setTimeout(() => {
            this.vs.style.display = 'none';
        }, 1700);

        let player1;
        let player2;

        this.audioStart.play();

        const p1 = JSON.parse(localStorage.getItem('player1'));

        const p2 = await this.getPlayer();

        player1 = new Player({
            ...p1,
            finishIMG: POSES[p1.id],
            number: 1,
            rootSelector: 'arenas',
        });

        console.log(player1);

        player2 = new Player({
            ...p2,
            finishIMG: POSES[p2.id],
            number: 2,
            rootSelector: 'arenas',
        });

        player1.createPlayer();
        player2.createPlayer();

        this.formFight.addEventListener('submit', (e) => {
            e.preventDefault();

            this.letsFight(player1, player2);


        });

        this.generateLogs('start', player2, player1);
    }
}

export default Game;