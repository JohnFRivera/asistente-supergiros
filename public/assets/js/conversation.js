class Conversation {
    /**
     * Constructor de conversación.
     */
    constructor() {
        this.transcript = '';
        this.memory = null;
        this.decision = '';
        this.fact = 1;
        this.simple = {
            saludo: ['hola', 'saludo', 'buenas', 'ey', 'dia', 'tarde', 'noche', 'ayuda', 'angie'],
            estado: ['como esta', 'como va', 'encuentra'],
            gratitud: ['gracias'],
            despedida: ['chao', 'adios', 'hasta luego', 'hasta pronto'],
            dato: ['dato', 'super servicios del valle'],
            aleatorio: ['numero', 'aleatorio', 'random', 'cifra'],
        };
        this.complex = {
            servicio: ['servicio'],
            juego: ['juego', 'modalidad', 'plan', 'premio', 'precio', 'cuanto'],
            apps: ['apps', 'aplicacion'],
            resultado: ['resultado'],
            horario: ['horario'],
        };
        this.option = {
            servicio: ['giros', 'recaudos', 'paquetes', 'subsidio'],
            juego: ['raspa', 'chance', 'super chance', 'doble chance', 'chance millonario', 'chance tradicional', 'loteria', 'paga mas', 'baloto', 'mi loto', 'color loto'],
            apps: ['movil', 'betplay'],
            resultado: ['tolima', 'cundinamarca', 'huila', 'cruz roja', 'meta', 'manizales', 'valle', 'chonto noche', 'bogota', 'quindio', 'santander', 'medellin', 'risaralda', 'extra de colombia', 'cauca', 'boyaca', 'antioquenita festivo manana', 'antioquenita festivo tarde', 'antioquenita manana', 'antioquenita tarde', 'astro luna', 'astro sol', 'bogota', 'boyaca', 'cafeterito dia', 'cafeterito noche festivo', 'cafeterito noche', 'caribena dia', 'caribena festiva dia', 'caribena festiva noche', 'caribena noche', 'chontico dia festivo', 'chontico noche jueves', 'chontico noche', 'chontico', 'chonto festivo', 'culona festivo dia', 'culona festivo', 'culona noche', 'culona', 'dorado festivo', 'dorado manana', 'dorado noche', 'dorado tarde', 'fantastica dia', 'fantastica festivo', 'fantastica noche', 'loteria extra de narino', 'motilon dia', 'motilon noche', 'paisita festivo noche', 'paisita 3 sabados', 'paisita dia', 'paisita noche', 'paisita festivo dia', 'pijao festivo', 'pijao', 'saman festivo', 'saman', 'sinuano dia', 'sinuano festivo dia', 'sinuano festivo noche', 'sinuano noche',],
            horario: ['atencion', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],
        };
        this.iteration = 0;
        this.results = [];
        this.randoms = '';
    }

    /**
     * Establecer transcripción en la clase.
     * @param {string} transcript Transcripción.
     */
    setTranscript(transcript) { this.transcript = transcript.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") }

    /**
     * Establecer complejo en la memoría.
     * @param {string} obj complex a guardar.
     */
    setMemory(obj) { this.memory = obj }

    /**
     * Vaciar memoria.
     */
    clearMemory() { this.memory = null }

    /**
     * Obtener la llave y el valor de la transcripción simple.
     * @returns Un objeto si es simple, nulo sino.
     */
    getSimple() {
        let res = null;
        for (const key in this.simple) {
            this.simple[key].forEach(value => {
                this.transcript.includes(value) && (res = { key, value });
            });
        }
        return res;
    }

    /**
     * Obtener la llave y el valor de la transcripción compleja.
     * @returns Un objeto si es compleja, nulo sino.
     */
    getComplex() {
        let res = null;
        for (const key in this.complex) {
            this.complex[key].forEach(value => {
                this.transcript.includes(value) && (res = { key, value });
            });
        }
        return res;
    }

    /**
     * Obtener la llave y el valor de la transcripción si nombre una opción.
     * @returns Un objeto si nombre opción, nulo sino.
     */
    getOption() {
        let res = null;
        for (const key in this.option) {
            this.option[key].forEach(value => {
                this.transcript.includes(value) && (res = { key, value: value.split(' ').join('-') });
            });
        }
        return res;
    }

    /**
     * Genera los números aleatorios.
     */
    getRandoms() {
        var numbers = ['tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        var digits = 2;
        numbers.forEach((n, i) => this.transcript.includes(n) && (digits = i + 3));
        var min = Math.pow(10, digits - 1);
        var max = Math.pow(10, digits) - 1;
        this.randoms = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }

    /**
     * Obtener los resultados desde el API.
     */
    async getResults() {
        try {
            let response = await fetch('https://10.25.6.180:3000/api/resultado');
            if (!response.ok) throw new Error('Error en el fetch');
            let data = await response.json();
            this.results = data.results;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Valida si hay un siguiente digito en los numeros aleatorios, y devuelve dicho número aleatorio.
     * @returns Digito aleatorio si hay, sino devuelve falso.
     */
    nextRandom() {
        if (this.randoms) {
            if (this.iteration < this.randoms.length) {
                var digit = this.randoms[this.iteration];
                this.iteration++;
                return digit;
            } else {
                this.iteration = 0;
            }
        }
        return false;
    }

    /**
     * Valida si hay una siguiente lotería, y devuelve dicha lotería.
     * @returns La lotería si hay, sino devuelve falso.
     */
    nextLottery() {
        if (this.results.length > 0) {
            if (this.iteration < this.results.length) {
                var lottery = this.results[this.iteration].name;
                this.iteration++;
                return lottery;
            } else {
                this.iteration = 0;
            }
        }
        return false;
    }

    /**
     * Valida si la lotería tiene un resultado.
     * @param {*} lottery Lotería.
     * @returns La lotería si existe, sino devuelve undefined.
     */
    existLottery(lottery) { return this.results.find(l => l.name === lottery.split(' ').join('-')) }

    /**
     * Valida si hay un siguiente número en el resultado de una lotería, y devuelve el digito.
     * @param {string} lottery Lotería.
     * @returns El digito si hay, sino devuelve falso.
     */
    nextNumber(lottery) {
        var numbers = this.results.find((l) => l.name === lottery).number;
        if (numbers) {
            if (this.iteration < numbers.length) {
                var digit = numbers[this.iteration];
                this.iteration++;
                return digit;
            } else {
                this.iteration = 0;
            }
        }
        return false;
    }

    /**
     * Obtener el número del resultado de una lotería.
     * @param {string} lottery Lotería.
     * @returns Número del resultado.
     */
    getNumber(lottery) { return this.results.find((l) => l.name === lottery).number }

    /**
     * Generar un número aleatorio entre 0 a un número especifico.
     * @param {number} limit Limite.
     * @returns Número aleatorio.
     */
    random(limit) { return Math.floor(Math.random() * (limit + 1)) }
}
export default Conversation;
