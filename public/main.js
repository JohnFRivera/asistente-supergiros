import SpeechRecognition from "./assets/js/speechRecognition.js";
import Entities from "./assets/js/entities.js";
import Video from "./assets/js/video.js";
import Toast from "./assets/js/toast.js";
import { generateRandom, removeAccent } from "./assets/js/utils.js";

const recognition = new SpeechRecognition();
const entities = new Entities();
const video = new Video('#video');
const toast = new Toast();

let prevKey = '', prevValue = '';
let key = '', value = '';
let speechRestart = true;

document.addEventListener('DOMContentLoaded', () => {
    //recognition.start();
});

recognition.onStart(() => {
    //
});
recognition.onEnd(() => {
    if (speechRestart) {
        recognition.start()
    }
});
// recognition.onResult();
const test = async (transcript) => {
    try {
        if (transcript) {
            let src = '';
            key = entities.findKey(removeAccent(transcript));
            key && (value = entities.findValue(key, removeAccent(transcript)));
            speechRestart = false;
            recognition.abort();
            switch (key) {
                case 'saludo':
                    var hour = new Date().getHours(); //? Hora actual
                    var horary = hour < 12 ? 'dia' : hour < 18 ? 'tarde' : 'noche';
                    var toggle = generateRandom(3) - 1;
                    src = toggle ? generateRandom(3) : horary;
                    break;
                case 'estado':
                    src = generateRandom(3);
                    break;
                case 'despedida':
                    src = generateRandom(3);
                    break;
                case 'nombre':
                    src = generateRandom(3);
                    break;
                case 'opcion':
                    src = value + '-' + generateRandom(3);
                    if (value === 'resultado') {
                        await video.fetchResults(); //? Hace fetch al API de los resultados.
                        video.results.length === 0 && (src = 'resultado-no');
                    }
                    break;
                case 'servicio':
                    src = value;
                    break;
                case 'juego':
                    src = value.split(' ').join('-');
                    break;
                case 'resultado':
                    await video.fetchResults();
                    value = removeAccent(value.split(' ').join('-')); //? Extrae nombre de la lotería.
                    src = video.existLottery(value) ? 'resultado-es' : 'loteria-no'; //? Valida si esa misma lotería tiene algún resultado.
                    break;
                case 'horario':
                    src = value;
                    break;
                case 'sorteo':
                    if (prevKey === 'horario' || transcript.includes('horario')) {
                        key = 'horario';
                        src = value;
                    }
                    break;
                case 'semana':
                    if (prevKey === 'horario' || transcript.includes('horario')) {
                        key = 'horario';
                        src = value;
                    }
                    break;
                case 'aleatorio':
                    video.generateRandoms(transcript);
                    toast.setBalls(video.randoms);
                    src = generateRandom(3);
                    break;
                default:
                    key = 'inentendible';
                    src = generateRandom(3);
                    break;
            }
            video.src(key + '/' + src);
            video.load();
            video.play();
        }
    } catch (error) {
        console.error(error);
    }
};

video.onPlay(() => {
    video.show();
    key === 'aleatorio' ? toast.showBalls() : toast.showMessage('Espera...');
});
video.onEnded(() => {
    var ended = true;
    if (value === 'resultado') {
        video.srcLottery() && (ended = false);
    } else if (key === 'resultado') {
        video.srcNumber(value) && (ended = false);
    } else if (key === 'aleatorio') {
        video.srcRandom() && (ended = false);
    }
    if (!ended) {
        video.load();
        video.play();
    } else {
        video.hidden();
        key === 'aleatorio' ? toast.hiddenBalls() : toast.hiddenMessage();
        recognition.start();
        speechRestart = true;
        prevKey = key;
        prevValue = value;
    }
});

document.getElementById('ipTxt').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        test(document.getElementById('ipTxt').value);
        document.getElementById('ipTxt').value = '';
    }
});
