import SpeechRecognition from "./assets/js/speechRecognition.js";
import Conversation from "./assets/js/conversation.js";
import Video from "./assets/js/video.js";

const recognition = new SpeechRecognition();
const conversation = new Conversation();
const video = new Video();
const defaultVideo = document.querySelector('#defaultVideo');
let speechRestart = true;

document.addEventListener('DOMContentLoaded', () => {
    recognition.start();
});

recognition.onStart(() => {
    //
});
recognition.onEnd(() => {
    recognition.start();
});
const handleResult = async (transcript) => {
    try {
        if (transcript) {
            console.log(transcript);
            conversation.setTranscript(transcript);
            const simple = conversation.getSimple();
            const complex = conversation.getComplex();
            const option = conversation.getOption();
            if (simple || complex || option) {
                let folder = 'inentendible';
                let vid = conversation.random(2) + 1;
                if (simple) {
                    folder = simple.key;
                    if (simple.key === 'saludo') {
                        var hour = new Date().getHours();
                        var horary = hour < 12 ? 'dia' : hour < 18 ? 'tarde' : 'noche';
                        vid = conversation.random(5) + 1;
                        !conversation.random(3) && (vid = horary);
                    }
                    if (simple.key === 'aleatorio') {
                        conversation.getRandoms();
                        conversation.decision = simple.key;
                        video.setBalls(conversation.randoms);
                    }
                }
                if (complex) {
                    folder = 'informacion';
                    vid = complex.key;
                    if (conversation.memory) {
                        switch (conversation.memory.key) {
                            case 'juego':
                                if (complex.value !== 'juego') {
                                    folder = 'juego';
                                    vid = conversation.memory.value + (complex.value === 'como' || complex.value === 'modalidad' ? '-modalidad' : '-premio');
                                }
                                break;
                        }
                    }
                    if (complex.key === 'resultado') {
                        await conversation.getResults()
                        vid = 'resultado-no';
                        if (conversation.results.length > 0) {
                            conversation.decision = 'loterias';
                            vid = 'resultado';
                        }
                    };
                }
                if (option) {
                    folder = option.key;
                    vid = option.value;
                    conversation.setMemory(option);
                    if (complex) {
                        switch (complex.key) {
                            case 'juego':
                                if (complex.value !== 'juego') {
                                    vid += (complex.value === 'modalidad' ? '-modalidad' : '-premio');
                                }
                                break;
                        }
                    }
                    if (option.key === 'resultado') {
                        await conversation.getResults();
                        folder = 'informacion';
                        vid = 'loteria-no';
                        if (conversation.existLottery(option.value)) {
                            conversation.decision = option.key;
                            video.setResult(conversation.getNumber(option.value));
                            vid = 'resultado-es';
                        }
                    }
                }
                video.src(folder + '/' + vid);
                video.load();
                video.play();
            }
        }
    } catch (error) {
        console.error(error);
    }
};
//recognition.onResult(handleResult);

video.onLoadedMetaData(() => {
    video.duration() < defaultVideo.duration && (defaultVideo.currentTime = video.duration(), defaultVideo.pause());
});
video.onPlay(() => {
    video.show();
    conversation.decision === 'aleatorio' || conversation.decision === 'resultado' ? video.showBalls() : video.showMessage('Espera...');
});
video.onEnded(() => {
    var ended = true;
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
    if (!ended) {
        video.load();
        video.play();
    } else {
        defaultVideo.play();
        video.hidden();
        conversation.decision === 'aleatorio' || conversation.decision === 'resultado' ? video.hiddenBalls() : video.hiddenMessage();
        conversation.decision = '';
        speechRestart = true;
    }
});
