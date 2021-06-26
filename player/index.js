import {createElement } from '../utils/index.js';

class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.number = props.number;
        this.selector = `player${this.number}`;
        this.rootSelector = props.rootSelector;
        this.id = props.id;
        this.finishIMG = props.finishIMG;
    }

    changeHP = (damage) => {
        this.hp -= damage;
        
        if (this.hp < 0) {
        this.hp = 0;
        }
    }

    elHP = () => {
        const $playerLife = document.querySelector(`.${this.selector} .life`);
        
        return $playerLife;
    }
    
    renderHP = () => {
        const lifebar = this.elHP();
        lifebar.style.width = this.hp + '%';
    }

    createPlayer = () => {
        const $player = createElement('div', this.selector);
    
        const $progressBar = createElement('div', 'progressbar');
        
        const $character = createElement('div', 'character');
    
        $player.appendChild($progressBar);
        $player.appendChild($character);
    
        const $life = createElement('div', 'life');
        $life.style.width = `${this.hp}%`;
    
        const $name = createElement('div', 'name');
        $name.innerText = this.name;
    
        $progressBar.appendChild($life);
        $progressBar.appendChild($name);
    
        const $img = createElement('img');
        $img.src = this.img;
    
        $character.appendChild($img);

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);
    
        return $player;
    }
}

export default Player;