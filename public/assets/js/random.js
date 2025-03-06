class Random {
    /**
     * Constructor de las bolas de lotería
     * @param {number} figures Cantidad de cifras
     */
    constructor(figures = 1) {
        let section = document.querySelector('section');
        if (section) {
            section.remove();
        }
        section = document.createElement('section');
        section.classList.add('flex');
        this.generateBalls(section, figures);
        document.getElementById('container').appendChild(section);
        for (let i = 0; i < figures; i++) {
            let num = i + 1;
            let milliseconds = num * 1000;
            this.generateRandom('#ball-' + num, milliseconds);
        }
    }
    generateNumber() {
        return Math.floor(Math.random() * 10);
    }
    /**
     * Genera la cantidad de bolas y las guarda en su contenedor
     * @param {HTMLElement} section Contenedor
     * @param {number} figures Cantidad de bolas
     */
    generateBalls(section, figures) {
        for (let i = 0; i < figures; i++) {
            let num = i + 1;
            let div = document.createElement('div');
            let img = document.createElement('img');
            let span = document.createElement('span');
            div.classList.add('relative');
            img.classList.add('ball');
            img.src = '/assets/img/ball.png';
            span.classList.add('ball-number');
            span.id = 'ball-' + num;
            span.innerHTML = num;
            div.append(img, span);
            section.appendChild(div);
        }
    }
    /**
     * Generar animación de numeros aleatorios
     * @param {string} selector Selector del elemento
     * @param {number} miliseconds Tiempo en milisegundos de la animación
     */
    generateRandom(selector, milliseconds = 1000) {
        let video = document.getElementById('video');
        let number = 0;
        let intervalId = setInterval(() => {
            number = randomNumber();
            document.querySelector(selector).innerHTML = number;
        }, 20);
        let timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            video.src = '/assets/vid/number/' + number + '.mp4';
            video.preload = 'metadata';
            video.play();
        }, milliseconds);
    }
}
export default Balls;
