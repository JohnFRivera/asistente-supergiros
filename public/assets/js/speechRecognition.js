class SpeechRecognition {
    /**
     * Constructor del reconocedor de voz.
     */
    constructor() {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.recognition.lang = 'es-CO';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
    }

    /**
     * Impide que el servicio de reconocimiento de voz escuche el audio entrante
     * y no intenta devolver un SpeechRecognitionResult.
     */
    abort() { this.recognition.abort() }

    /**
     * Inicia el servicio de reconocimiento de voz escuchando el audio entrante.
     */
    start() { this.recognition.start() }

    /**
     * Impide que el servicio de reconocimiento de voz escuche el audio entrante
     * e intenta devolver un SpeechRecognitionResult utilizando el audio capturado
     * hasta el momento.
     */
    stop() { this.recognition.stop() }

    /**
     * El evento de finalización de audio se activa cuando el agente de usuario
     * ha terminado de capturar audio para el reconocimiento de voz.
     * @param {() => {}} callback Función a ejecutar
     */
    onAudioEnd(callback) { this.recognition.onaudioend = (e) => callback(e) }

    /**
     * El evento de inicio de audio se activa cuando el agente de usuario comienza
     * a capturar audio para el reconocimiento de voz.
     * @param {() => {}} callback Función a ejecutar
     */
    onAudioStart(callback) { this.recognition.onaudiostart = (e) => callback(e) }

    /**
     * El evento de finalización se activa cuando el servicio de reconocimiento de voz
     * se desconecta.
     * @param {() => {}} callback Función a ejecutar
     */
    onEnd(callback) { this.recognition.onend = (e) => callback(e) }

    /**
     * El evento de error se activa cuando se produce un error de reconocimiento de voz.
     * @param {() => {}} callback Función a ejecutar
     */
    onError(callback) { this.recognition.onerror = (e) => callback(e.error) }

    /**
     * El evento de no coincidencias se activa cuando el servicio de reconocimiento de voz
     * devuelve un resultado final sin reconocimiento significativo.
     * Esto puede implicar cierto grado de reconocimiento, que no alcanza o supera el umbral
     * de confianza.
     * @param {() => {}} callback Función a ejecutar
     */
    onNoMatch(callback) { this.recognition.onnomatch = (e) => callback(e) }

    /**
     * El evento de resultado se activa cuando el servicio de reconocimiento de voz
     * devuelve un resultado: una palabra o frase ha sido reconocida positivamente y
     * esto se ha comunicado a la aplicación.
     * @param {(transcript: string) => {}} callback Función a ejecutar
     */
    onResult(callback) { this.recognition.onresult = (e) => callback(e.results[0][0].transcript.trim().toLowerCase()) }

    /**
     * El evento de inicio se activa cuando el servicio de reconocimiento de voz ha
     * comenzado a escuchar el audio entrante con la intención de reconocer las
     * gramáticas asociadas.
     * @param {() => {}} callback Función a ejecutar
     */
    onStart(callback) { this.recognition.onstart = (e) => callback(e) }
}
export default SpeechRecognition;
