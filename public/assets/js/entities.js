class Entities {
    /**
     * Constructor del flujo de conversación.
     */
    constructor() {
        this.entities = {
            saludo: ['hola', 'saludo', 'buenas', 'buenos días'],
            estado: ['cómo está', 'cómo va', 'cómo sigue'],
            despedida: ['chao', 'adiós', 'hasta luego'],
            nombre: ['tu nombre', 'te llamas'],
            opcion: ['servicio', 'juego', 'resultado', 'horario', 'modalidad', 'premio'],
            servicio: ['servicio', 'giros', 'recaudos', 'paquetes', 'subsidio'],
            juego: ['juego', 'modalidad', 'premio', 'raspa', 'betplay', 'chance', 'súper chance', 'doble chance', 'chance millonario', 'chance tradicional', 'lotería'],
            resultado: [
                'antioqueñita festivo mañana',
                'antioqueñita festivo tarde',
                'antioqueñita mañana',
                'antioqueñita tarde',
                'astro luna',
                'astro sol',
                'bogota',
                'boyaca',
                'cafeterito día',
                'cafeterito noche festivo',
                'cafeterito noche',
                'caribeña día',
                'caribeña festiva día',
                'caribeña festiva noche',
                'caribeña noche',
                'cauca',
                'chontico día festivo',
                'chontico noche jueves',
                'chontico noche',
                'chontico',
                'chonto festivo',
                'cruz roja',
                'culona festivo día',
                'culona festivo',
                'culona noche',
                'culona',
                'cundinamarca',
                'dorado festivo',
                'dorado mañana',
                'dorado noche',
                'dorado tarde',
                'extra de colombia',
                'huila',
                'la fantastica día',
                'la fantastica festivo',
                'la fantastica noche',
                'lotería extra de nariño',
                'manizales',
                'medellín',
                'meta',
                'motilon día',
                'motilon noche',
                'paisita festivo noche',
                'paisita 3 sabados',
                'paisita día',
                'paisita festivo día',
                'pijao festivo',
                'pijao',
                'quindio',
                'risaralda',
                'samán festivo',
                'samán',
                'santander',
                'sinuano día',
                'sinuano festivo día',
                'sinuano festivo noche',
                'sinuano noche',
                'tolima',
                'valle',
            ],
            horario: ['horario', 'atencion', 'sorteo'],
            sorteo: ['tolima', 'cundinamarca', 'huila', 'cruz roja', 'meta', 'manizales', 'valle', 'chonto noche', 'bogota', 'quindio', 'santander', 'medellin', 'risaralda', 'extra de colombia', 'paisita 3', 'cauca', 'boyaca'],
            semana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'],
            aleatorio: ['número', 'aleatorio', 'random'],
        };
    }

    /**
     * Buscar llave dentro de las entidades usando de referencia una transcripción.
     * @param {string} transcript Transcripción.
     * @returns Llave.
     */
    findKey(transcript) {
        let key = '';
        for (const entity in this.entities) {
            this.entities[entity].forEach((val) => {
                transcript.toLowerCase().includes(val) && (key = entity);
            });
        }
        return key;
    }

    /**
     * Buscar el valor dentro del arreglo de una entidad usando de referencia una transcripción.
     * @param {string} key Llave de la entidad.
     * @param {string} transcript Transcripción.
     * @returns Valor.
     */
    findValue(key, transcript) {
        let value = '';
        this.entities[key].forEach((val) => {
            transcript.toLowerCase().includes(val) && (value = val);
        });
        return value;
    }
}
export default Entities;
