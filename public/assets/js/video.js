class Video {
    /**
     * Constructor del elemendo de video, ten en cuenta que se debe crear un elemento
     * videoDefault también.
     * @param {string} selector Selector del elemendo video.
     */
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.lotteryIndex = 0;
        this.numberIndex = 0;
        this.results = [];
        this.randomIndex = 0;
        this.randoms = [];
    }

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
     * Establece las rutas de las loterías disponibles.
     * @returns Verdadero si aún hay loterías, y falso si ya no quedan más loterías.
     */
    srcLottery() {
        if (this.results.length > 0) {
            if (this.lotteryIndex < this.results.length) {
                var lottery = encodeURI(this.results[this.lotteryIndex].name);
                this.lotteryIndex++;
                this.element.setAttribute('src', '/assets/vids/resultado/' + lottery + '.mp4');
                return true;
            } else {
                this.lotteryIndex = 0;
            }
        }
        return false;
    }

    /**
     * Establecer ruta de video al elemento.
     * @param {string} lottery Lotería seleccionada.
     * @returns Verdadero si aún hay números, y falso si ya no quedan más números.
     */
    srcNumber(lottery) {
        var lotteryNumbers = this.results.find((l) => l.name === lottery).number;
        if (lotteryNumbers) {
            if (this.numberIndex < lotteryNumbers.length) {
                var number = lotteryNumbers[this.numberIndex];
                this.numberIndex++;
                this.element.setAttribute('src', '/assets/vids/numero/' + number + '.mp4');
                return true;
            } else {
                this.numberIndex = 0;
            }
        }
        return false;
    }

    /**
     * Establecer ruta de video al elemento.
     * @returns Verdadero si aún hay números, y falso si ya no quedan más números.
     */
    srcRandom() {
        if (this.randoms.length > 0) {
            var number = this.randoms[this.randomIndex];
            this.randomIndex++;
            if (this.randomIndex <= this.randoms.length) {
                this.element.setAttribute('src', '/assets/vids/numero/' + number + '.mp4');
                return true;
            } else {
                this.randomIndex = 0;
                this.randoms = [];
            }
        }
        return false;
    }

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
    async play() { try { await this.element.play() } catch (error) { throw error } }

    /**
     * Obtiene la lista de resultados del API y las guarda en el atributo lotteries.
     */
    async fetchResults() {
        try {
            const response = await fetch('http://localhost:3000/api/resultado');
            const data = await response.json();
            if (!response.ok) throw new Error('Error en la consulta');
            data.results.length > 0 && (this.results = data.results);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Valida si una lotería existe.
     * @param {string} lottery Lotería a consultar.
     * @returns Verdadero si existe, falso sino.
     */
    existLottery(lottery) { return this.results.find((l) => l.name === lottery) ? true : false }

    generateRandoms(transcript) {
        const numbers = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        let number = 2;
        numbers.forEach((n, i) => {
            transcript.toLowerCase().includes(n) && (number = i);
        });
        for (let i = 0; i < number; i++) {
            this.randoms.push(Math.floor(Math.random() * 10));
        }
    }

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
}
export default Video;
