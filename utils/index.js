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