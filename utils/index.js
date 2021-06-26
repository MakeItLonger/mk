export const getRandom = (max) => {
    return Math.ceil(Math.random() * max);
}

export const createElement = (tag, className) => {
    const $element = document.createElement(tag);

    if (className) {
        $element.classList.add(className);
    }

    return $element;
}

export const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
}