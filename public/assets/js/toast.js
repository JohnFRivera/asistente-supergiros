class Toast {
    /**
     * Contructor del mensaje.
     * @param {string} selector Selector del elemento.
     */
    constructor(selector) {
        this.messageElement = document.querySelector('#message');
        this.ballsElement = document.querySelector('#balls');
        this.intervalIds = [];
    }

    /**
     * Mostrar mensaje en el DOM
     * @param {string} text Mensaje
     */
    showMessage(text) {
        this.messageElement.children.item(0).innerHTML = text;
        this.messageElement.classList.remove('hidden');
    }

    /**
     * Ocultar mensaje del DOM
     */
    hiddenMessage() {
        this.messageElement.classList.add('hidden');
    }

    /**
     * Mostrar las bolas de lotería en el DOM
     * @param {string} text Mensaje
     */
    showBalls() {
        this.ballsElement.classList.remove('hidden');
    }

    /**
     * Ocultar bolas de lotería del DOM
     */
    hiddenBalls() {
        this.ballsElement.classList.add('hidden');
        this.intervalIds = [];
    }

    /**
     * Establecer la cantidad de bolas.
     * @param {string[]} randoms Cantidad de números aleatorios.
     */
    setBalls(randoms) {
        this.ballsElement.innerHTML = '';
        for (let i = 0; i < randoms.length; i++) {
            var num = i + 1;
            this.ballsElement.innerHTML += `<div class="ball"><p id="ball-${num}"></p></div>`;
            this.generateInterval('#ball-' + num);
            this.generateTimeout(i, '#ball-' + num, randoms[i]);
        }
    }

    generateInterval(selector) {
        let iteracion = 0;
        const id = setInterval(() => {
            document.querySelector(selector).innerText = iteracion;
            iteracion < 9 ? iteracion++ : (iteracion = 0);
        }, 50);
        this.intervalIds.push(id);
    }

    generateTimeout(index, selector, random) {
        setTimeout(() => {
            clearInterval(this.intervalIds[index]);
            document.querySelector(selector).innerText = random;
        }, ((index + 1) * 960));
    }
}
export default Toast;
