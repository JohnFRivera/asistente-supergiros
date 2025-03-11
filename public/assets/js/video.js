class Video {
    /**
     * Constructor del elemendo de video, ten en cuenta que se debe crear un elemento
     * videoDefault también.
     */
    constructor() {
        this.element = document.querySelector('#video');
        this.shining = document.querySelector('#shining');
        this.message = document.querySelector('#message');
        this.balls = document.querySelector('#balls');
        this.intervalIds = [];
    }

    /**
     * Obtener la duración del video.
     * @returns Flotante con la duración del video en segundos.
     */
    duration() { return this.element.duration }

    /**
     * Hacer visible el elemento de video.
     */
    show() { this.element.classList.remove('hidden') }

    /**
     * Ocultar el elemento de video en el documento.
     */
    hidden() { this.element.classList.add('hidden') }

    /**
     * Establecer ruta de video al elemento.
     * @param {string} path Ruta.
     */
    src(src) { this.element.setAttribute('src', '/assets/vids/' + src + '.mp4') }

    /**
     * Restablecer video por defecto desde el principio.
     */
    restartTime() { this.element.currentTime = 0 }

    /**
     * El método restablece el elemento multimedia a su estado inicial y comienza el
     * proceso de selección de una fuente multimedia y carga de los medios en preparación
     * para que la reproducción comience desde el principio.
     */
    load() { this.element.load() }

    /**
     * El método pausará la reproducción del medio; si el medio ya está en estado de
     * pausa, este método no tendrá efecto.
     */
    pause() { this.element.pause() }

    /**
     * El método intenta iniciar la reproducción del contenido multimedia. Devuelve
     * una Promesa que se resuelve cuando la reproducción se ha iniciado correctamente.
     * Si no se inicia la reproducción por cualquier motivo, como problemas de permisos,
     * la promesa se rechaza.
     */
    async play() { try { await this.element.play() } catch (error) { window.location.reload() } }

    /**
     * El evento finalizado se activa cuando la reproducción o la transmisión se detiene
     * porque se llegó al final del contenido multimedia o porque no hay más datos
     * disponibles.
     * @param {(e: Event) => {}} callback Función a ejecutar
     */
    onEnded(callback) { this.element.onended = (e) => callback(e) }

    /**
     * El evento de error se activa cuando no se pudo cargar el recurso debido a un error
     * (por ejemplo, un problema de conectividad de red).
     * @param {(e: Event) => {}} callback Función a ejecutar
     */
    onError(callback) { this.element.onerror = (e) => callback(e) }

    /**
     * El evento de metadatos cargados se activa cuando se han cargado los metadatos.
     * @param {(e: Event) => {}} callback Función a ejecutar
     */
    onLoadedMetaData(callback) { this.element.onloadedmetadata = (e) => callback(e) }

    /**
     * El evento de reproducción se activa cuando la propiedad pausada cambia de
     * verdadera a falsa, como resultado del método de reproducción o del atributo de
     * reproducción automática.
     * @param {(e: Event) => {}} callback Función a ejecutar
     */
    onPlay(callback) { this.element.onplay = (e) => callback(e) }

    /**
     * Mostrar resplandor en el DOM
     */
    showShining() { this.shining.classList.add('shining') }

    /**
     * Ocultar resplandor del DOM
     */
    hiddenShining() { this.shining.classList.remove('shining') }

    /**
     * Mostrar mensaje en el DOM
     * @param {string} text Mensaje
     */
    showMessage(text) {
        this.message.children.item(0).innerHTML = text;
        this.message.classList.remove('hidden');
    }

    /**
     * Ocultar mensaje del DOM
     */
    hiddenMessage() { this.message.classList.add('hidden') }

    /**
     * Mostrar las bolas de lotería en el DOM
     * @param {string} text Mensaje
     */
    showBalls() { this.balls.classList.remove('hidden') }

    /**
     * Ocultar bolas de lotería del DOM
     */
    hiddenBalls() {
        this.balls.classList.add('hidden');
        this.intervalIds = [];
    }

    /**
     * Establecer los resultados sin animación de números aleatorios.
     * @param {*} number Resultado.
     */
    setResult(number) {
        this.balls.innerHTML = '';
        for (let i = 0; i < number.length; i++) {
            this.balls.innerHTML += `<div class="ball"><p>${number[i]}</p></div>`;
        }
    }

    /**
     * Establecer la cantidad de bolas.
     * @param {string} randoms Cantidad de números aleatorios.
     */
    setBalls(randoms) {
        this.balls.innerHTML = '';
        for (let i = 0; i < randoms.length; i++) {
            var num = i + 1;
            this.balls.innerHTML += `<div class="ball"><p id="ball-${num}"></p></div>`;
            this.generateInterval('#ball-' + num);
            this.generateTimeout(i, '#ball-' + num, randoms[i]);
        }
    }

    /**
     * Generar intervalos para cada bola.
     * @param {string} selector Selector de la bola.
     */
    generateInterval(selector) {
        let iteracion = 0;
        const id = setInterval(() => {
            document.querySelector(selector).innerText = iteracion;
            iteracion < 9 ? iteracion++ : (iteracion = 0);
        }, 40);
        this.intervalIds.push(id);
    }

    /**
     * Generar timeout que para los intervalos.
     * @param {number} index Iteración.
     * @param {string} selector Selector.
     * @param {number} random Número aleatorio.
     */
    generateTimeout(index, selector, random) {
        setTimeout(() => {
            clearInterval(this.intervalIds[index]);
            document.querySelector(selector).innerText = random;
        }, ((index + 1) * 960));
    }
}
export default Video;
