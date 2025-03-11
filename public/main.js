import SpeechRecognition from "./assets/js/speechRecognition.js";
import Conversation from "./assets/js/conversation.js";
import Video from "./assets/js/video.js";

/**
 * Instancias.
 */
const recognition = new SpeechRecognition();
const conversation = new Conversation();
const video = new Video();
const defaultVideo = document.querySelector('#defaultVideo');

/**
 * Eventos.
 */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        video.showShining();
        setTimeout(() => video.hiddenShining(), 2400);
    }, 30000);
    // Inicia reconocimiento de voz.
    recognition.start();
});

recognition.onEnd(() => {
    // Reiniciar reconocimiento de voz.
    recognition.start();
});
const handleResult = async (transcript) => {
    try {
        console.log(transcript);
        if (transcript) {
            // Establecer transcripción y obtener entidades.
            conversation.setTranscript(transcript);
            const simple = conversation.getSimple();
            const complex = conversation.getComplex();
            const option = conversation.getOption();
            // Valida si existe alguna entidad
            if (simple || complex || option) {
                conversation.decision = '';
                video.showShining();
                setTimeout(() => video.hiddenShining(), 2400);
                // Instanciar por defecto video de no entender.
                let folder = 'inentendible';
                let vid = conversation.random(2) + 1;
                // Validar entidad simple.
                if (simple) {
                    folder = simple.key;
                    // Si es saludo, validar si es de día, tarde o noche y elegir respuesta aleatoriamente.
                    if (simple.key === 'saludo') {
                        var hour = new Date().getHours();
                        var horary = hour < 12 ? 'dia' : hour < 18 ? 'tarde' : 'noche';
                        vid = conversation.random(5) + 1;
                        !conversation.random(3) && (vid = horary);
                    }
                    // Si es dato, que asigne el dato y vaya de uno en uno para así no perderse ningún dato.
                    if (simple.key === 'dato') {
                        vid = conversation.fact;
                        conversation.fact === 5 ? (conversation.fact = 1) : conversation.fact++;
                    }
                    // Si es aleatorio, generar número aleatorio y establecer números en aviso en pantalla.
                    if (simple.key === 'aleatorio') {
                        conversation.getRandoms();
                        conversation.decision = 'aleatorio';
                        video.setBalls(conversation.randoms);
                    }
                }
                // Validar entidad compleja.
                if (complex) {
                    folder = 'informacion';
                    vid = complex.key;
                    // Validar si ya ha sido escogido una opción anteriormente.
                    if (conversation.memory) {
                        switch (conversation.memory.key) {
                            case 'juego':
                                // Si es juego, validad si solicita la modalidad o planes de premios.
                                if (complex.key === 'juego' && complex.value !== 'juego') {
                                    folder = 'juego';
                                    vid = conversation.memory.value;
                                    if (complex.value === 'modalidad') { vid += '-modalidad' }
                                    if (complex.value === 'plan' || complex.value === 'premio') { vid += '-premio' }
                                    if (complex.value === 'precio' || complex.value === 'cuanto') { vid += '-valor' }
                                }
                                break;
                        }
                    }
                    // Si es resultado, hacer fetch a los resultados y validar si hay resultados.
                    if (complex.key === 'resultado') {
                        await conversation.getResults();
                        vid = 'resultado-no';
                        if (conversation.results.length > 0) {
                            conversation.decision = 'loterias';
                            conversation.iteration = 0;
                            vid = 'resultado';
                        }
                    };
                }
                // Validar entidad opción.
                if (option) {
                    folder = option.key;
                    vid = option.value;
                    conversation.setMemory(option); // Guardar opción en memoría.
                    if (complex) {
                        switch (complex.key) {
                            case 'juego':
                                // Si la transcripción pide la modalidad o premio también.
                                if (complex.value !== 'juego') {
                                    if (complex.value === 'modalidad') { vid += '-modalidad' }
                                    if (complex.value === 'plan' || complex.value === 'premio') { vid += '-premio' }
                                    if (complex.value === 'precio' || complex.value === 'cuanto') { vid += '-valor' }
                                }
                                break;
                        }
                    }
                    // Si se pide el resultado de una lotería en específico, hace fetch a los resultados y establece los resultados en aviso en pantalla.
                    var complexKey = complex && (complex.key === 'resultado');
                    if (option.key === 'resultado' || complexKey) {
                        await conversation.getResults();
                        folder = 'informacion';
                        vid = 'loteria-no';
                        if (conversation.existLottery(option.value)) {
                            conversation.decision = 'resultado';
                            conversation.iteration = 0;
                            video.setResult(conversation.getNumber(option.value));
                            vid = 'resultado-es';
                        }
                    }
                }
                // Establece la ruta del video en el source, lo carga e inicia video.
                video.src(folder + '/' + vid);
                video.load();
                video.play();
            }
        }
    } catch (error) {
        // Si ocurre un error lo muestra en la consola.
        console.error(error);
        window.location.reload();
    }
};
recognition.onResult(handleResult);

video.onLoadedMetaData(() => {
    // Validar duración del video y establecer el tiempo del video por defecto.
    video.duration() < defaultVideo.duration && (defaultVideo.currentTime = video.duration(), defaultVideo.pause());
});
video.onPlay(() => {
    // Mostrar video y validar la decision para saber que mensaje mostrar.
    video.show();
    if (conversation.decision === 'aleatorio' || conversation.decision === 'resultado') {
        video.showBalls();
        video.hiddenMessage();
    } else {
        video.showMessage('Hablando');
        video.hiddenBalls();
    }
});
video.onEnded(() => {
    try {
        var ended = true;
        // Valida la decision tomada en la conversación.
        switch (conversation.decision) {
            case 'aleatorio':
                var random = conversation.nextRandom();
                random && (video.src('numero/' + random), (ended = false), (defaultVideo.currentTime = 0.80));
                break;
            case 'loterias':
                var lottery = conversation.nextLottery();
                lottery && (video.src('loteria/' + lottery), (ended = false), (defaultVideo.currentTime = 1.50));
                break;
            case 'resultado':
                var number = conversation.nextNumber(conversation.memory.value);
                number && (video.src('numero/' + number), (ended = false), (defaultVideo.currentTime = 0.80));
                break;
        }
        // Si no ha finalizado la reproducción de video.
        if (!ended) {
            video.load();
            video.play();
        } else {
            defaultVideo.play();
            video.hidden();
            conversation.decision === 'aleatorio' || conversation.decision === 'resultado' ? video.hiddenBalls() : video.hiddenMessage();
            conversation.decision = '';
        }
    } catch (error) {
        console.error(error);
        location.reload();
    }
});
